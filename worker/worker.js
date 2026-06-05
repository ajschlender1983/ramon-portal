/**
 * Ramon Resolver — Cloudflare Worker (multi-user since v1.1.0)
 *
 * Two endpoints:
 *   POST /reflect  — single Claude call producing one per-session reflection
 *   POST /deepen   — chains 4 Claude calls (1 strategic-resolve + 3 EBI passes)
 *                    and returns the final synthesized text
 *
 * Each request payload includes `userName` (the user's display name). All
 * system prompts are templated on this name. Falls back to "this user" if
 * userName is missing or blank.
 *
 * Reads ANTHROPIC_API_KEY from a Worker secret (set via `wrangler secret put`).
 * Reads MODEL and ALLOWED_ORIGINS from wrangler.toml [vars].
 */

const ANTHROPIC_VERSION = '2023-06-01';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);

    /* v1.11.0: GET /state?slug=<slug> — read the user's stored blob from KV.
       Returns {} (HTTP 200) if no record exists yet so the client can treat
       "never written" identically to "empty state". */
    if (request.method === 'GET' && url.pathname === '/state') {
      try {
        const result = await readState(env, url.searchParams.get('slug') || '');
        return json(result, 200, cors);
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 502, cors);
      }
    }

    /* v1.12: GET /survey — admin-guarded read of all dashboard-survey
       responses. Caller must present x-admin-token header matching
       env.ADMIN_TOKEN. */
    if (request.method === 'GET' && url.pathname === '/survey') {
      const tok = request.headers.get('x-admin-token') || url.searchParams.get('key') || '';
      if (!env.ADMIN_TOKEN || tok !== env.ADMIN_TOKEN) {
        return json({ error: 'unauthorized' }, 401, cors);
      }
      try {
        const responses = await readAllSurveyResponses(env);
        return json({ responses, count: responses.length }, 200, cors);
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 502, cors);
      }
    }

    if (request.method !== 'POST') {
      return json({ error: 'method not allowed' }, 405, cors);
    }

    let payload;
    try { payload = await request.json(); }
    catch { return json({ error: 'invalid json body' }, 400, cors); }

    try {
      if (url.pathname === '/state') {
        const result = await writeState(env, payload);
        return json(result, 200, cors);
      }
      /* v1.12: POST /survey — public write of a dashboard-survey response.
         No auth needed; rate-limited by the worker invocation envelope. */
      if (url.pathname === '/survey') {
        const result = await writeSurveyResponse(env, payload, request);
        return json(result, 200, cors);
      }
      // All other endpoints require ANTHROPIC_API_KEY (AI calls).
      if (!env.ANTHROPIC_API_KEY) {
        return json({ error: 'ANTHROPIC_API_KEY not configured on the worker' }, 500, cors);
      }
      if (url.pathname === '/reflect') {
        const text = await reflectOne(env, payload);
        return json({ reflection: text }, 200, cors);
      }
      if (url.pathname === '/deepen') {
        const passes = await deepenChain(env, payload);
        return json({ deepReflection: passes[3], passes }, 200, cors);
      }
      if (url.pathname === '/expand') {
        const userData = await expandIntake(env, payload);
        return json({ userData }, 200, cors);
      }
      return json({ error: 'not found' }, 404, cors);
    } catch (err) {
      return json({ error: String(err && err.message || err) }, 502, cors);
    }
  }
};

/* ============================================================ CORS */

function corsHeaders(request, env) {
  const origin = request.headers.get('origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const allow = allowed.includes(origin) ? origin : allowed[0] || '*';
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    'vary': 'Origin'
  };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...(cors || {}) }
  });
}

/* ============================================================ Anthropic call helper */

/* humanize: post-process the model's text to enforce the language rules
   the prompt asks for. Belt-and-suspenders against em dashes and a few
   common AI tells the model still slips through despite the system prompt. */
function humanize(text) {
  if (!text) return text;
  let s = String(text);
  // Em dashes (U+2014) and double-hyphens between letters: replace with a comma+space.
  // If the em dash is between two complete clauses, the comma works fine; if it's a
  // parenthetical, the comma still reads.
  s = s.replace(/\s*—\s*/g, ', ');
  s = s.replace(/(\w)\s*--\s*(\w)/g, '$1, $2');
  // Floating en dash (U+2013) between words: same treatment. Keep en dashes in
  // numeric ranges like "180-240" untouched (en dash there is unusual anyway).
  s = s.replace(/(\w)\s*–\s*(\w)/g, (m, a, b) => /\d/.test(a) && /\d/.test(b) ? a + '-' + b : a + ', ' + b);
  // Collapse any doubled commas / commas before periods that the substitution can create.
  s = s.replace(/,\s*,/g, ',');
  s = s.replace(/,\s*\./g, '.');
  s = s.replace(/\s{2,}/g, ' ');
  // Strip a leading "—" or comma at line start that the substitution could leave.
  s = s.replace(/^\s*[,]+\s*/gm, '');
  return s.trim();
}

async function callClaude(env, { system, messages, max_tokens = 1024 }) {
  const body = {
    model: env.MODEL || 'claude-sonnet-4-5',
    max_tokens,
    system,
    messages
  };
  const attempt = async () => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 30000);
    try {
      const resp = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'anthropic-version': ANTHROPIC_VERSION,
          'x-api-key': env.ANTHROPIC_API_KEY
        },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
      const data = await resp.json();
      if (!resp.ok) {
        const msg = (data && data.error && data.error.message) || ('HTTP ' + resp.status);
        const err = new Error(msg);
        err.status = resp.status;
        throw err;
      }
      const text = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('').trim();
      if (!text) throw new Error('empty response from anthropic');
      return humanize(text);
    } finally {
      clearTimeout(t);
    }
  };
  // Retry once on 5xx or network error
  try {
    return await attempt();
  } catch (err) {
    if (err.status && err.status < 500) throw err;
    return await attempt();
  }
}

/* ============================================================ Prompts */

const HUMANIZER_RULES = `LANGUAGE RULES, NON-NEGOTIABLE. These override any default writing patterns.
- NEVER use em dashes. The em dash character is forbidden. Use commas, periods, or colons. If you reach for an em dash, restructure the sentence.
- NEVER use negative-parallelism patterns: "X, not Y" or "not X, not Y" or "didn't X, it Y" or "isn't just X, it's Y" or "more than X, it is Y". Rewrite affirmatively. Say what IS, never what isn't.
- NEVER use rule-of-three constructions ("clear, grounded, and present"). One descriptor is usually enough. Two if both are doing real work.
- NEVER use AI vocabulary: testament, underscore, highlight (verb), pivotal, intricate, tapestry, landscape (figurative), profound, deeply rooted, navigate, journey (figurative), embrace, embark.
- NEVER use AI conversational openers: "I notice that you", "It sounds like", "It seems you", "Remember that", "It's important to", "It's worth noting".
- NEVER use sycophancy: "Great question", "absolutely right", "you're so".
- NEVER use filler phrases: "In order to" (use "to"), "due to the fact that" (use "because"), "at this point in time" (use "now").
- NEVER hedge in chains: "could potentially possibly". Pick one or none.
- Use plain copulas: "is", "are", "was". Avoid "serves as", "stands as", "represents", "embodies".
- Vary sentence length naturally. Short. Then longer ones that take their time. Do not write three sentences of the same length in a row.`;

/* Prompts are templated on the user's display name. The client passes
   `userName` in the payload; we substitute it into each prompt. Falls back to
   "this user" if the client didn't pass one (older client or missing slug). */
function nameOrFallback(userName) {
  const n = (userName || '').trim();
  return n || 'this user';
}

function REFLECT_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `You are reflecting one SoundBed session for ${name}. You see their Biofield reading, this session's metadata (heading, subtitle, intention, why-this-for-you), where in the 30-day arc this falls, and their Before + After notes for THIS session.

Write a single short reflection (90 to 140 words). Mirror what they wrote. Notice what shifted between Before and After. Honor the session's intention as the frame they were holding. Reference the Biofield reading only when the After note speaks to something the reading flagged.

NEVER conclude. NEVER diagnose. NEVER claim energetic or medical insight. Do not repeat their words verbatim. Refract them.

Voice: warm, specific, grounded. Short sentences mixed with one or two longer ones. No headers, no bullets.

Format: two short paragraphs. End with one open question. The question is open, not a directive.

Principle, non-negotiable: we reflect, we never conclude.

${HUMANIZER_RULES}`;
}

function DEEPEN_RESOLVE_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `You are deepening a per-session reflection for ${name}, a SoundBed user.

You will speak as TWO voices in turn:
Voice A: Senior Somatic Experience Designer. The body is the source of truth. You see what the original reflection did not quite touch in the body.
Voice B: Senior Reflective Writer. You know when a sentence is doing the work and when it is hiding.

For each voice, write a short note (no more than 80 words) on what the prior reflection misses. Then together draft a single deeper reflection (180 to 240 words) that lands what the original gestured at.

Same constraints as the original: warm, specific. NEVER conclude. NEVER diagnose. No headers, no bullets. End with one open question.

Return strictly this JSON shape, with no surrounding prose:
{ "voiceA": "<= 80 words", "voiceB": "<= 80 words", "draft": "180-240 words" }

${HUMANIZER_RULES}`;
}

function DEEPEN_EBI_STRUCTURE_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `Run one EBI (Even Better If) pass on a deepening reflection draft for ${name}. Focus: structure, length, voice. What is working stays. What would be even better if structure were tightened, length right-sized to 180 to 240 words, and voice held warm and specific?

Apply the highest-impact edits directly. Return ONLY the improved draft text. No preamble. No JSON. Same constraints (never conclude, never diagnose, ends with one open question).

${HUMANIZER_RULES}`;
}

function DEEPEN_EBI_RESONANCE_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `Run a second EBI pass on this deepening reflection. Focus: emotional resonance. Would ${name}'s body recognize the words back? Does the reflection sound like something a thoughtful friend would say, not an algorithm?

Apply edits directly. Return ONLY the improved draft. Same constraints. Same length range. Ends with one open question.

${HUMANIZER_RULES}`;
}

function DEEPEN_EBI_HONESTY_SYSTEM(_userName) {
  return `Run a final EBI pass on this deepening reflection. Focus: the reflective contract. Cut anything that drifts toward conclusion, diagnosis, claim, or interpretation. If a sentence even gestures at "you are X" or "this means Y", rewrite it as a mirror or an open question.

Return ONLY the final text. No preamble. Same constraints. 180 to 240 words. Ends with one open question.

${HUMANIZER_RULES}`;
}

/* ============================================================ Reflect — single call */

function buildReflectUser(payload) {
  const s = payload.session || {};
  const j = payload.journey || {};
  const parsed = payload.biofieldParsed || {};
  const frames = parsed.frames || {};
  const frameLines = Object.keys(frames).map(k => '— ' + frames[k].label + ': ' + frames[k].body).join('\n');
  const name = nameOrFallback(payload.userName);

  return [
`SESSION
- Heading: ${s.heading || ''}
- Subtitle: ${s.subtitle || ''}
- Category: ${s.category || ''}
- Artist: ${s.artist || ''}
- Intention ${name} was holding: "${s.intention || ''}"
- Why we picked this for them: ${s.why || ''}
- Lede: ${s.lede || ''}`,

`JOURNEY POSITION
- Week ${j.week || '?'} of 4
- Weeks completed so far: ${j.weeksCompleted ?? 0}
- Sessions with at least one note: ${j.sessionsWithNoteCount ?? 0}/16`,

`THEIR BIOFIELD READING (frames mirrored from their practitioner)
${frameLines || '(not parsed)'}`,

`THEIR NOTES FOR THIS SESSION
Before: ${payload.before || '(empty)'}
After:  ${payload.after  || '(empty)'}`,

// v1.9.13: felt-sense rating on the canonical 1-to-WOW scale (SKILL.md /
// Reflections & Patterns). The model uses this to register magnitude —
// a 1 gets a grounding, gentle reflection; a WOW gets expansive language
// honoring an experience that exceeds words.
`FELT-SENSE RATING (1-to-WOW scale)
${payload.wow
  ? `${name} rated this session ${payload.wow}/6${payload.wow === 6 ? ' (✨ WOW — beyond words)' : ''}${payload.wowLabel ? '\n— ' + payload.wowLabel : ''}`
  : '(not rated)'}`,

`Now write the per-session reflection.`
  ].join('\n\n');
}

async function reflectOne(env, payload) {
  return await callClaude(env, {
    system: REFLECT_SYSTEM(payload.userName),
    max_tokens: 700,
    messages: [{ role: 'user', content: buildReflectUser(payload) }]
  });
}

/* ============================================================ Deepen — chained 4-pass */

async function deepenChain(env, payload) {
  const baseUser = buildReflectUser(payload) + '\n\nPRIOR REFLECTION (the one we are deepening):\n' + (payload.priorReflection || '');

  // Pass 1 — Strategic-resolve (two voices + initial deeper draft)
  const pass1Raw = await callClaude(env, {
    system: DEEPEN_RESOLVE_SYSTEM(payload.userName),
    max_tokens: 1400,
    messages: [{ role: 'user', content: baseUser }]
  });
  const pass1Draft = extractDeepenDraft(pass1Raw);

  // Pass 2 — EBI structure
  const pass2 = await callClaude(env, {
    system: DEEPEN_EBI_STRUCTURE_SYSTEM(payload.userName),
    max_tokens: 900,
    messages: [{ role: 'user', content: 'Current draft:\n\n' + pass1Draft }]
  });

  // Pass 3 — EBI resonance
  const pass3 = await callClaude(env, {
    system: DEEPEN_EBI_RESONANCE_SYSTEM(payload.userName),
    max_tokens: 900,
    messages: [{ role: 'user', content: 'Current draft:\n\n' + pass2 }]
  });

  // Pass 4 — EBI honesty (final)
  const pass4 = await callClaude(env, {
    system: DEEPEN_EBI_HONESTY_SYSTEM(payload.userName),
    max_tokens: 900,
    messages: [{ role: 'user', content: 'Current draft:\n\n' + pass3 }]
  });

  return [pass1Raw, pass2, pass3, pass4];
}

function extractDeepenDraft(raw) {
  // Pass 1 returns JSON with voiceA, voiceB, draft. If parsing fails, use the whole text.
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) {
      const parsed = JSON.parse(m[0]);
      if (parsed && typeof parsed.draft === 'string' && parsed.draft.trim()) return parsed.draft.trim();
    }
  } catch { /* fall through */ }
  return raw;
}

/* ============================================================ Expand — intake → USER_DATA shape

   Powers the new web-app variant at /app/?u=<slug>. Takes a lightweight
   intake (survey, biometric, paste-reading, or empty-slate) and synthesizes
   a coherent reading + the 5 hand-tuned biofield numbers the dashboard
   needs (auricMeters, hawkinsLevel/Target, dna, primaryBlockQuote, archetype,
   chakraStates).

   The 4-week plan + session catalogue is NOT synthesized here — the app
   layers the user's biofield values onto a CANONICAL plan that lives in
   public/app/canonical-plan.js. We keep the plan handcrafted so the
   curriculum coherence Adam built into Ramon's + Amber's files is the
   default for any user. /expand just produces the "reading" part. */

function EXPAND_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `You are synthesizing a "biofield reading" record for ${name} from a lightweight intake.

Your job: produce a JSON record with the following exact shape. No prose, no commentary, no markdown fences. The user is about to enter a 30-day SoundBed wellness program; this record powers their personalized dashboard.

{
  "auricMeters": <number 6.5..15.5, one decimal>,
  "hawkinsLevel": <integer 200..700; map: courage 200, willingness 310, acceptance 350, reason 400, love 500, joy 540, peace 600, enlightenment 700+>,
  "hawkinsTarget": <integer 50..150 above hawkinsLevel; commonly 528 (Miracles) for love-range users>,
  "dna": { "phaseLocked": <int 4..10>, "consolidating": <int 1..4>, "of": 12 },
  "primaryBlockQuote": "<one short sentence, first-person, naming what's in the way>",
  "archetype": "<one short evocative line ending with a felt-sense noun>",
  "chakraStates": [
    { "id": "crown",     "label": "Crown",        "state": "<canonical state>", "yPct": 7,  "note": "<short felt note>" },
    { "id": "third-eye", "label": "Third Eye",    "state": "<canonical state>", "yPct": 14, "note": "..." },
    { "id": "throat",    "label": "Throat",       "state": "<canonical state>", "yPct": 22, "note": "..." },
    { "id": "heart",     "label": "Heart",        "state": "<canonical state>", "yPct": 36, "note": "..." },
    { "id": "solar",     "label": "Solar Plexus", "state": "<canonical state>", "yPct": 48, "note": "..." },
    { "id": "sacral",    "label": "Sacral",       "state": "<canonical state>", "yPct": 60, "note": "..." },
    { "id": "root",      "label": "Root",         "state": "<canonical state>", "yPct": 76, "note": "..." }
  ],
  "reading": "<a 6-section narrative reading body. Sections are: 🜂 ORIC FIELD, 🜁 DNA STRAND ACTIVATION, 🜃 CHAKRA SCAN, 🜄 ORGANIC FIELD, 🜅 VIBRATIONAL LEVEL, 🜆 PRIMARY BLOCK, 🜇 ARCHETYPE. Write as if a thoughtful energetic practitioner wrote it for ${name} based on the intake provided. 350-500 words total. The numbers in the structured fields MUST match what's in the reading text.>"
}

The CANONICAL chakra state words (use ONLY these): undercharged, stabilizing, holding, consolidating, clear, carrying-a-lot, radiant.

Constraints:
- Honor the user's intake. If the intake suggests low energy, lower the auricMeters and hawkinsLevel; if high coherence, raise them.
- The reading text MUST reference the intake's specifics by paraphrase, not verbatim quotes.
- NEVER claim medical, psychological, or diagnostic insight. Stay in felt-sense / energetic language.
- The reading is mirror, not conclusion.

${HUMANIZER_RULES}`;
}

function buildExpandUser(payload) {
  const mode = payload.mode || 'empty';
  const f = payload.fields || {};
  const name = nameOrFallback(payload.userName);
  const lines = [`INTAKE MODE: ${mode}`, `Name: ${name}`];

  if (mode === 'survey') {
    if (f.intention) lines.push(`Today's intention: ${f.intention}`);
    if (typeof f.energy === 'number') lines.push(`Energy 1-10: ${f.energy}`);
    if (f.state) lines.push(`One-word state: ${f.state}`);
    if (f.bodyFocus) lines.push(`Body focus area: ${f.bodyFocus}`);
    if (f.mood) lines.push(`Mood 1-6: ${f.mood}`);
  } else if (mode === 'biometric') {
    if (typeof f.hrv === 'number') lines.push(`HRV (ms): ${f.hrv}`);
    if (typeof f.restingHR === 'number') lines.push(`Resting HR (bpm): ${f.restingHR}`);
    if (typeof f.sleepScore === 'number') lines.push(`Sleep score 0-100: ${f.sleepScore}`);
    if (typeof f.readinessScore === 'number') lines.push(`Readiness score 0-100: ${f.readinessScore}`);
  } else if (mode === 'reading') {
    if (f.rawReading) lines.push(`PASTED READING (parse this as the source of truth):\n${f.rawReading}`);
  } else {
    lines.push(`No structured input provided — synthesize a neutral, welcoming starting point. auricMeters around 8, hawkinsLevel around 440 (Acceptance approaching Reason), 5/12 strands phase-locked, archetype "Seeker", chakra states clustered around "stabilizing" with one "holding" in the sacral.`);
  }

  lines.push('', `Now produce the JSON record. Return ONLY the JSON, no surrounding text.`);
  return lines.join('\n');
}

async function expandIntake(env, payload) {
  const raw = await callClaude(env, {
    system: EXPAND_SYSTEM(payload.userName),
    max_tokens: 1800,
    messages: [{ role: 'user', content: buildExpandUser(payload) }]
  });
  // Extract JSON; tolerant of fences or surrounding text the model slips through.
  let parsed = null;
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]);
  } catch { /* fall through */ }
  if (!parsed || typeof parsed !== 'object') {
    // Fallback to a safe default if the model returns malformed JSON.
    parsed = expandFallback(payload.userName);
  }
  return normalizeExpandResult(parsed, payload.userName);
}

function expandFallback(userName) {
  return {
    auricMeters: 8.0,
    hawkinsLevel: 440,
    hawkinsTarget: 528,
    dna: { phaseLocked: 5, consolidating: 2, of: 12 },
    primaryBlockQuote: 'I am still learning what I want.',
    archetype: 'A Seeker becoming a Witness.',
    chakraStates: [
      { id: 'crown',     label: 'Crown',        state: 'stabilizing',   yPct: 7,  note: 'Open, settling.' },
      { id: 'third-eye', label: 'Third Eye',    state: 'clear',         yPct: 14, note: 'Watching without grasping.' },
      { id: 'throat',    label: 'Throat',       state: 'stabilizing',   yPct: 22, note: 'Words are arriving slowly.' },
      { id: 'heart',     label: 'Heart',        state: 'holding',       yPct: 36, note: 'Tender, present.' },
      { id: 'solar',     label: 'Solar Plexus', state: 'stabilizing',   yPct: 48, note: 'Steady, returning.' },
      { id: 'sacral',    label: 'Sacral',       state: 'holding',       yPct: 60, note: 'Quiet, listening.' },
      { id: 'root',      label: 'Root',         state: 'undercharged',  yPct: 76, note: 'Wants more ground.' }
    ],
    reading: `🜂 ORIC FIELD\nYour field reaches 8 meters. Settled, present.\n\n🜁 DNA STRAND ACTIVATION\n5 of 12 strands phase-locked. The system is gathering itself.\n\n🜃 CHAKRA SCAN\nThe lower body is asking for ground. The upper centers are open and receiving.\n\n🜄 ORGANIC FIELD\nNervous system in early integration. Breath shallow but steady.\n\n🜅 VIBRATIONAL LEVEL\n440 (Acceptance approaching Reason).\n\n🜆 PRIMARY BLOCK\nA quiet uncertainty about what you actually want.\n\n🜇 ARCHETYPE\nA Seeker becoming a Witness.`,
    _fallback: true
  };
}

function normalizeExpandResult(p, userName) {
  // Coerce types + clamp ranges so the front-end never blows up on weird values.
  const out = {};
  out.auricMeters = clampNumber(p.auricMeters, 6.5, 15.5, 8);
  out.hawkinsLevel = Math.round(clampNumber(p.hawkinsLevel, 200, 800, 440));
  out.hawkinsTarget = Math.round(clampNumber(p.hawkinsTarget, out.hawkinsLevel + 1, 1000, 528));
  const dna = p.dna || {};
  out.dna = {
    phaseLocked: clampInt(dna.phaseLocked, 4, 10, 5),
    consolidating: clampInt(dna.consolidating, 1, 4, 2),
    of: 12
  };
  out.primaryBlockQuote = typeof p.primaryBlockQuote === 'string' && p.primaryBlockQuote.trim()
    ? p.primaryBlockQuote.trim().slice(0, 220)
    : 'I am still learning what I want.';
  out.archetype = typeof p.archetype === 'string' && p.archetype.trim()
    ? p.archetype.trim().slice(0, 220)
    : 'A Seeker becoming a Witness.';
  const validStates = new Set(['undercharged','stabilizing','holding','consolidating','clear','carrying-a-lot','radiant']);
  const defaultChakras = [
    { id: 'crown',     label: 'Crown',        yPct: 7  },
    { id: 'third-eye', label: 'Third Eye',    yPct: 14 },
    { id: 'throat',    label: 'Throat',       yPct: 22 },
    { id: 'heart',     label: 'Heart',        yPct: 36 },
    { id: 'solar',     label: 'Solar Plexus', yPct: 48 },
    { id: 'sacral',    label: 'Sacral',       yPct: 60 },
    { id: 'root',      label: 'Root',         yPct: 76 }
  ];
  out.chakraStates = defaultChakras.map((d, i) => {
    const inc = (Array.isArray(p.chakraStates) ? p.chakraStates : [])[i] || {};
    const state = validStates.has(inc.state) ? inc.state : 'stabilizing';
    const note = typeof inc.note === 'string' && inc.note.trim() ? inc.note.trim().slice(0, 140) : '';
    return { id: d.id, label: d.label, state, yPct: d.yPct, note };
  });
  out.reading = typeof p.reading === 'string' && p.reading.length > 80
    ? p.reading
    : expandFallback(userName).reading;
  return out;
}

function clampNumber(v, lo, hi, d) {
  const n = Number(v);
  if (!isFinite(n)) return d;
  return Math.max(lo, Math.min(hi, n));
}
function clampInt(v, lo, hi, d) {
  const n = parseInt(v, 10);
  if (!isFinite(n)) return d;
  return Math.max(lo, Math.min(hi, n));
}

/* ============================================================ State persistence (KV)

   v1.11.0: per-slug state blob. One JSON record per user, keyed by `state:<slug>`.
   Stores the contents of every localStorage key the client uses (notes, wow,
   reflections, sessionFields, examples, expanded, dashOpen, weekFields, plus
   the web-app's quest.* keys). The client treats the server as the source of
   truth on page load (server wins) and pushes every write back (debounced).

   Slug validation: only alphanumerics, dashes, underscores. Bounds the key
   length to prevent abuse. Payload size capped at 256 KB per record (KV's
   limit is 25 MB but a single user's notes record realistically lives under
   a few KB; 256 KB is generous and prevents accidental blow-ups). */

const SLUG_RE = /^[A-Za-z0-9_-]{1,80}$/;
const MAX_STATE_BYTES = 256 * 1024;

function validateSlug(slug) {
  const s = String(slug || '').trim();
  if (!s || !SLUG_RE.test(s)) {
    const err = new Error('invalid slug');
    err.status = 400;
    throw err;
  }
  return s;
}

async function readState(env, slugInput) {
  if (!env.STATE_KV) {
    const err = new Error('STATE_KV not bound on the worker');
    err.status = 500;
    throw err;
  }
  const slug = validateSlug(slugInput);
  const raw = await env.STATE_KV.get('state:' + slug);
  if (!raw) return { slug, state: {}, ts: null };
  try {
    const parsed = JSON.parse(raw);
    return { slug, state: parsed.state || {}, ts: parsed.ts || null };
  } catch {
    return { slug, state: {}, ts: null };
  }
}

async function writeState(env, payload) {
  if (!env.STATE_KV) {
    const err = new Error('STATE_KV not bound on the worker');
    err.status = 500;
    throw err;
  }
  const slug = validateSlug(payload && payload.slug);
  const state = (payload && payload.state && typeof payload.state === 'object') ? payload.state : {};
  const record = { state, ts: Date.now() };
  const serialized = JSON.stringify(record);
  if (serialized.length > MAX_STATE_BYTES) {
    const err = new Error('state payload too large');
    err.status = 413;
    throw err;
  }
  await env.STATE_KV.put('state:' + slug, serialized);
  return { ok: true, slug, ts: record.ts };
}

/* ============================================================ v1.12: Dashboard-style beta survey
   Stores one response per submission at survey:dashboard-style:<id>. Admin GET lists all.

   Response shape (validated server-side, sized + sanitized):
     { id, ts, name, email, primaryPick, secondaryPick, why, missing, anything, ua }
*/

const MAX_SURVEY_BYTES = 8 * 1024;
const VALID_PICKS = ['A', 'B', 'C', 'D', 'E'];

function takeStr(v, max) {
  if (typeof v !== 'string') return '';
  return v.slice(0, max);
}

async function writeSurveyResponse(env, payload, request) {
  if (!env.STATE_KV) {
    const err = new Error('STATE_KV not bound on the worker');
    err.status = 500;
    throw err;
  }
  const primary = (payload && payload.primaryPick || '').toUpperCase();
  if (!VALID_PICKS.includes(primary)) {
    const err = new Error('primaryPick must be one of A,B,C,D,E');
    err.status = 400;
    throw err;
  }
  const secondary = (payload && payload.secondaryPick || '').toUpperCase();
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : ('s_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10));
  const record = {
    id,
    ts: Date.now(),
    name:          takeStr(payload && payload.name, 200),
    email:         takeStr(payload && payload.email, 200),
    primaryPick:   primary,
    secondaryPick: VALID_PICKS.includes(secondary) ? secondary : '',
    why:           takeStr(payload && payload.why, 2000),
    missing:       takeStr(payload && payload.missing, 2000),
    anything:      takeStr(payload && payload.anything, 2000),
    ua:            takeStr(request.headers.get('user-agent') || '', 300)
  };
  const serialized = JSON.stringify(record);
  if (serialized.length > MAX_SURVEY_BYTES) {
    const err = new Error('survey payload too large');
    err.status = 413;
    throw err;
  }
  await env.STATE_KV.put('survey:dashboard-style:' + id, serialized);
  return { ok: true, id, ts: record.ts };
}

async function readAllSurveyResponses(env) {
  if (!env.STATE_KV) {
    const err = new Error('STATE_KV not bound on the worker');
    err.status = 500;
    throw err;
  }
  // Page through every survey:dashboard-style:<id> key. KV list returns up
  // to 1000 keys per page; we paginate until cursor is exhausted.
  const out = [];
  let cursor = undefined;
  // Safety bound: 10 pages = up to 10,000 responses. Plenty.
  for (let i = 0; i < 10; i++) {
    const list = await env.STATE_KV.list({ prefix: 'survey:dashboard-style:', cursor });
    for (const k of list.keys) {
      const v = await env.STATE_KV.get(k.name);
      if (!v) continue;
      try { out.push(JSON.parse(v)); } catch {}
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }
  out.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  return out;
}
