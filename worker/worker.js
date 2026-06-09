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
  async fetch(request, env, ctx) {
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

    /* v1.12.1: GET /state/all — admin-guarded dump of every user's
       state blob. Returns {users:[{slug, state, ts}], count}. Used by
       scripts/sync-users.sh to mirror KV → local repo for inspection
       and durable backup. Caller must present x-admin-token header
       matching env.ADMIN_TOKEN. */
    if (request.method === 'GET' && url.pathname === '/state/all') {
      const tok = request.headers.get('x-admin-token') || url.searchParams.get('key') || '';
      if (!env.ADMIN_TOKEN || tok !== env.ADMIN_TOKEN) {
        return json({ error: 'unauthorized' }, 401, cors);
      }
      try {
        const users = await readAllUserStates(env);
        return json({ users, count: users.length }, 200, cors);
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 502, cors);
      }
    }

    /* v1.14.0: GET /userdata?slug=<slug> — public read of a generated
       user's USER_DATA (self-serve signups). The page bootstrap calls
       this when /users/<slug>.js 404s. 404 here -> "link no longer
       active" gate. Edge-cacheable; regeneration is rare. */
    if (request.method === 'GET' && url.pathname === '/userdata') {
      try {
        const slug = validateSlug(url.searchParams.get('slug') || '');
        const raw = await env.STATE_KV.get('userdata:' + slug);
        if (!raw) return json({ error: 'not found' }, 404, cors);
        return new Response(JSON.stringify({ userData: JSON.parse(raw) }), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'public, max-age=300',
            ...cors
          }
        });
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 400, cors);
      }
    }

    /* v1.14.0: GET /signup-status?slug=<slug> — public polling endpoint
       for the /begin waiting screen. Reports stuck generation so the
       client can re-kick /generate. */
    if (request.method === 'GET' && url.pathname === '/signup-status') {
      try {
        const slug = validateSlug(url.searchParams.get('slug') || '');
        const rec = await readSignup(env, slug);
        if (!rec) return json({ error: 'not found' }, 404, cors);
        const out = { slug, status: rec.status, attempts: rec.attempts || 0 };
        if (rec.status === 'generating' && rec.lockTs && (Date.now() - rec.lockTs) > 150000) {
          out.status = 'stuck'; // client may re-POST /generate
        }
        if (rec.status === 'ready') out.portalUrl = portalUrlFor(slug, env);
        return json(out, 200, cors);
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 400, cors);
      }
    }

    /* v1.14.0: GET /signups — admin list of all signup records for the
       users-admin dashboard. Same token gate as /state/all. */
    if (request.method === 'GET' && url.pathname === '/signups') {
      const tok = request.headers.get('x-admin-token') || url.searchParams.get('key') || '';
      if (!env.ADMIN_TOKEN || tok !== env.ADMIN_TOKEN) {
        return json({ error: 'unauthorized' }, 401, cors);
      }
      try {
        const signups = await readAllSignups(env);
        return json({ signups, count: signups.length }, 200, cors);
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

    /* v1.13.0: POST /mirror handled before JSON parse because the manual
       trigger has no body. Same admin-token gate as /state/all. Returns
       the same {total, changed, failed} summary the hourly cron produces.
       Lets Adam test the mirror end-to-end without waiting for the next
       cron tick. */
    if (url.pathname === '/mirror') {
      const tok = request.headers.get('x-admin-token') || url.searchParams.get('key') || '';
      if (!env.ADMIN_TOKEN || tok !== env.ADMIN_TOKEN) {
        return json({ error: 'unauthorized' }, 401, cors);
      }
      try {
        const summary = await mirrorAllToGitHub(env);
        return json(summary, 200, cors);
      } catch (err) {
        return json({ error: String(err && err.message || err) }, 502, cors);
      }
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
      /* v1.14.0: POST /signup — public self-serve signup. Validates,
         rate-limits per IP, dedupes by email, stores signup:<slug>,
         sends the "received" email via waitUntil, returns fast. No
         Claude call here. */
      if (url.pathname === '/signup') {
        const r = await handleSignup(env, payload, request, ctx);
        return json(r.body, r.status, cors);
      }
      /* v1.14.0: POST /generate {slug} — client-held generation request
         (the proven /deepen pattern: in-request Claude calls, browser
         holds the fetch 60-120s). Idempotent via lock semantics; the
         cron sweep is the backstop for disconnects. */
      if (url.pathname === '/generate') {
        if (!env.ANTHROPIC_API_KEY) {
          return json({ error: 'ANTHROPIC_API_KEY not configured on the worker' }, 500, cors);
        }
        const r = await handleGenerate(env, payload, ctx);
        return json(r.body, r.status, cors);
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
  },

  /* v1.13.0: hourly cron trigger. Pushes every KV user state that has
     changed since the last mirror to a private GitHub repo, one JSON
     file per slug at users-data/<slug>.json. waitUntil keeps the worker
     alive past the controller-return so the API calls finish even when
     the cron envelope is short. */
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(Promise.allSettled([
      mirrorAllToGitHub(env)
        .then(summary => console.log('cron mirror complete:', JSON.stringify(summary)))
        .catch(err => console.log('cron mirror failed:', String(err && err.message || err))),
      // v1.14.0: sweep stuck/pending signups (regenerate server-side) and
      // send day-3 check-in emails. Cron handlers get a 15-min budget, so
      // long Claude calls are safe here.
      sweepSignups(env)
        .then(summary => console.log('cron signup sweep:', JSON.stringify(summary)))
        .catch(err => console.log('cron signup sweep failed:', String(err && err.message || err)))
    ]));
  }
};

/* ============================================================ CORS */

function corsHeaders(request, env) {
  // v1.12.1: relaxed CORS. Reflect/state endpoints carry no cookies and
  // no PII beyond the user's own (intentionally obscure) slug, so the
  // wildcard origin is safe AND fixes a class of "Failed to fetch"
  // errors users hit when they reach the page via a deploy-preview URL
  // (`abc123.ramon-portal.pages.dev`), a future custom domain, or a
  // stale DNS binding. The prior strict allowlist forced the wrong
  // ACAO header on non-canonical origins and browsers blocked the
  // request before the worker ever ran.
  const origin = request.headers.get('origin') || '*';
  const allowedPatterns = [
    /^https:\/\/([a-z0-9-]+\.)*ramon-portal\.pages\.dev$/,
    /^https:\/\/([a-z0-9-]+\.)*feelopus\.com$/,
    /^https:\/\/ramon-portal\.pages\.dev$/
  ];
  // v1.14.1: the custom domain (PORTAL_BASE var) is always allowed,
  // including its subdomains, so the domain swap needs no code change.
  let isAllowed = allowedPatterns.some(p => p.test(origin));
  if (!isAllowed && env && env.PORTAL_BASE) {
    try {
      const host = new URL(env.PORTAL_BASE).hostname.replace(/\./g, '\\.');
      isAllowed = new RegExp('^https://([a-z0-9-]+\\.)*' + host + '$').test(origin);
    } catch { /* malformed PORTAL_BASE: ignore */ }
  }
  const allow = isAllowed ? origin : '*';
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-admin-token',
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

async function callClaude(env, { system, messages, max_tokens = 1024, timeoutMs = 30000 }) {
  const body = {
    model: env.MODEL || 'claude-sonnet-4-5',
    max_tokens,
    system,
    messages
  };
  const attempt = async () => {
    const ctrl = new AbortController();
    // v1.14.0: parameterized timeout. Signup generation calls produce
    // 2-4k output tokens and run 45-90s on Sonnet; the old hard 30s
    // abort would kill every one of them.
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
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

/* v1.12.1: dump every state:<slug> KV record for repo-side mirroring.
   Returns array of {slug, state, ts} sorted by ts desc. */
async function readAllUserStates(env) {
  if (!env.STATE_KV) {
    const err = new Error('STATE_KV not bound on the worker');
    err.status = 500;
    throw err;
  }
  const out = [];
  let cursor = undefined;
  for (let i = 0; i < 10; i++) {
    const list = await env.STATE_KV.list({ prefix: 'state:', cursor });
    for (const k of list.keys) {
      const v = await env.STATE_KV.get(k.name);
      if (!v) continue;
      const slug = k.name.replace(/^state:/, '');
      try {
        const parsed = JSON.parse(v);
        out.push({ slug, state: parsed.state || {}, ts: parsed.ts || null });
      } catch {
        out.push({ slug, state: {}, ts: null });
      }
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }
  out.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  return out;
}

/* ============================================================ v1.13.0: GitHub mirror (Tier 2 backup)

   Hourly cron pushes every changed KV user state to a private GitHub repo
   as users-data/<slug>.json. Same file shape scripts/sync-users.sh writes:
     {"slug": "...", "ts": <number>, "state": {...}}

   Skips unchanged users via a SHA-256 fingerprint stored in KV under
   mirror:sha:<slug>. One user's failure is isolated. Capped at 30 mirrors
   per run to stay well below GitHub's 5000 req/hr authed budget.

   Required secrets (set via `wrangler secret put <NAME>`):
     GITHUB_TOKEN   fine-grained PAT, Contents:Write on the target repo only
     GITHUB_OWNER   GitHub user or org, e.g. ajschlender1983
     GITHUB_REPO    repo name, e.g. ramon-portal-users-data
     GITHUB_BRANCH  optional, defaults to "main"

   Without GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO the cron silently
   no-ops and returns {error: 'mirror not configured'}. This lets the cron
   trigger be deployed before secrets are wired up. */

const MIRROR_MAX_PER_RUN = 30;
const GITHUB_API = 'https://api.github.com';

async function mirrorAllToGitHub(env) {
  if (!env.GITHUB_TOKEN || !env.GITHUB_OWNER || !env.GITHUB_REPO) {
    console.log('mirror not configured: missing GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO');
    return { error: 'mirror not configured' };
  }
  if (!env.STATE_KV) {
    console.log('mirror skipped: STATE_KV not bound');
    return { error: 'STATE_KV not bound' };
  }

  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH || 'main';

  const users = await readAllUserStates(env);
  const summary = { total: users.length, changed: 0, skipped: 0, failed: 0, capped: false };

  let processed = 0;
  for (const user of users) {
    if (processed >= MIRROR_MAX_PER_RUN) {
      summary.capped = true;
      console.log('mirror cap reached at ' + MIRROR_MAX_PER_RUN + ', remaining users will retry next cron');
      break;
    }
    processed++;
    try {
      const fileBody = { slug: user.slug, ts: user.ts, state: user.state };
      const bodyJson = JSON.stringify(fileBody, null, 2) + '\n';
      const contentSha = await sha256Hex(bodyJson);

      // Compare against last mirrored SHA. Skip if unchanged to avoid noise commits.
      const lastSha = await env.STATE_KV.get('mirror:sha:' + user.slug);
      if (lastSha === contentSha) {
        summary.skipped++;
        continue;
      }

      const path = 'users-data/' + user.slug + '.json';
      const ok = await putGitHubFile({
        owner, repo, branch, path,
        token: env.GITHUB_TOKEN,
        contentBase64: base64EncodeUtf8(bodyJson),
        commitMessage: 'mirror ' + user.slug + ' @ ' + new Date(user.ts || Date.now()).toISOString()
      });

      if (ok) {
        await env.STATE_KV.put('mirror:sha:' + user.slug, contentSha);
        summary.changed++;
      } else {
        summary.failed++;
      }
    } catch (err) {
      summary.failed++;
      console.log('mirror error for slug=' + user.slug + ': ' + String(err && err.message || err));
    }
  }

  console.log('mirror summary: ' + JSON.stringify(summary));
  return summary;
}

/* PUT (or create) a file via GitHub Contents API. Returns true on success,
   false on benign failure (422 race, persistent 4xx). Throws only on
   unexpected shapes. The caller catches per-user. */
async function putGitHubFile({ owner, repo, branch, path, token, contentBase64, commitMessage }) {
  const baseUrl = GITHUB_API + '/repos/' + owner + '/' + repo + '/contents/' + path;
  const headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'ramon-portal-mirror',
    'Content-Type': 'application/json'
  };

  // First, GET the existing file to read its sha. 404 means create, 200 means update.
  let existingSha = null;
  const getResp = await fetch(baseUrl + '?ref=' + encodeURIComponent(branch), { headers });
  if (getResp.status === 200) {
    const data = await getResp.json();
    if (data && typeof data.sha === 'string') existingSha = data.sha;
  } else if (getResp.status === 404) {
    existingSha = null;
  } else if (getResp.status === 401 || getResp.status === 403) {
    const text = await safeText(getResp);
    console.log('github auth failure (' + getResp.status + ') on GET ' + path + ': ' + text);
    return false;
  } else {
    const text = await safeText(getResp);
    console.log('github GET ' + path + ' returned ' + getResp.status + ': ' + text);
    // Continue as if create; PUT will fail loudly if something is truly wrong.
  }

  const putBody = {
    message: commitMessage,
    content: contentBase64,
    branch
  };
  if (existingSha) putBody.sha = existingSha;

  const putResp = await fetch(baseUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody)
  });

  if (putResp.status === 200 || putResp.status === 201) return true;

  if (putResp.status === 422) {
    // Most likely a sha mismatch race. Will retry next cron with fresh sha.
    const text = await safeText(putResp);
    console.log('github 422 for ' + path + ' (likely sha race), will retry next cron: ' + text);
    return false;
  }

  const text = await safeText(putResp);
  console.log('github PUT ' + path + ' failed ' + putResp.status + ': ' + text);
  return false;
}

async function safeText(resp) {
  try { return (await resp.text()).slice(0, 400); }
  catch { return '(unreadable body)'; }
}

/* Workers runtime: btoa exists, but it only handles latin1. UTF-8 safe encode
   via TextEncoder + chunked btoa. */
function base64EncodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function sha256Hex(str) {
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  const view = new Uint8Array(digest);
  let hex = '';
  for (let i = 0; i < view.length; i++) {
    hex += view[i].toString(16).padStart(2, '0');
  }
  return hex;
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

/* ============================================================
   v1.14.0: Self-serve signup + portal generation
   ============================================================
   Flow:
     POST /signup {name, email, reading, website?}  -> {slug, status:'pending'}
       (website is a hidden honeypot field; non-empty -> fake success)
     POST /generate {slug}                          -> held by client 60-120s
       runs two chained Claude calls in-request (the proven /deepen
       pattern), merges with the canonical catalog template, stores
       userdata:<slug>, emails the portal link.
     GET /signup-status?slug    -> {status, portalUrl?}  (poll backup)
     GET /userdata?slug         -> {userData}            (page bootstrap)
     GET /signups               -> admin list

   KV keys:
     signup:<slug>     {slug,name,email,readingRaw,status,attempts,lockTs,
                        createdTs,readyTs,error,ip,emails[],day3Sent,failNotified}
     userdata:<slug>   full merged USER_DATA JSON
     idx:email:<sha>   slug   (dedupe, sha256 of lowercased email)
     rl:signup:<ip>    counter, TTL 1h
     template:catalog-v1  cached catalog template JSON (TTL 1h)

   Secrets (set via wrangler secret put):
     RESEND_API_KEY  - optional; emails no-op without it
   Vars (optional):
     EMAIL_FROM      - default 'OPUS SoundBed <portal@feelopus.com>'
     ADMIN_EMAIL     - default 'adam@feelopus.com'
     PORTAL_BASE     - default 'https://ramon-portal.pages.dev'
   ============================================================ */

const SIGNUP_MAX_READING = 8000;
const SIGNUP_MAX_NAME = 80;
const SIGNUP_RATE_LIMIT = 5;            // signups per IP per hour
const GENERATE_LOCK_MS = 120000;        // lock considered live for 2 min
const SWEEP_STUCK_MS = 600000;          // cron resets locks older than 10 min
const MAX_GENERATION_ATTEMPTS = 3;
const TEMPLATE_URL = 'https://ramon-portal.pages.dev/templates/catalog-v1.json';

/* v1.14.1: PORTAL_BASE env var drives every user-facing link (status
   responses, emails, admin alerts). Set it in wrangler.toml [vars] when
   the custom domain lands; the pages.dev origin keeps working alongside
   it for anyone holding an old link. */
function portalBase(env) {
  return (env && env.PORTAL_BASE) || 'https://ramon-portal.pages.dev';
}
function portalUrlFor(slug, env) {
  return portalBase(env) + '/?u=' + encodeURIComponent(slug);
}

function makeSlug(name) {
  const head = String(name || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 12) || 'guest';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const buf = new Uint8Array(8);
  crypto.getRandomValues(buf);
  let suffix = '';
  for (let i = 0; i < 8; i++) suffix += chars[buf[i] % 36];
  return head + '-' + suffix;
}

async function readSignup(env, slug) {
  const raw = await env.STATE_KV.get('signup:' + slug);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

async function writeSignup(env, rec) {
  await env.STATE_KV.put('signup:' + rec.slug, JSON.stringify(rec));
}

async function readAllSignups(env) {
  const out = [];
  let cursor = undefined;
  for (let i = 0; i < 10; i++) {
    const list = await env.STATE_KV.list({ prefix: 'signup:', cursor });
    for (const k of list.keys) {
      const v = await env.STATE_KV.get(k.name);
      if (!v) continue;
      try {
        const rec = JSON.parse(v);
        // Never ship the full reading text in the list payload; admin
        // can see it per user. Keep the list light.
        out.push({
          slug: rec.slug, name: rec.name, email: rec.email,
          status: rec.status, attempts: rec.attempts || 0,
          createdTs: rec.createdTs, readyTs: rec.readyTs || null,
          error: rec.error || null, emails: rec.emails || [],
          readingChars: (rec.readingRaw || '').length
        });
      } catch {}
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }
  out.sort((a, b) => (b.createdTs || 0) - (a.createdTs || 0));
  return out;
}

async function handleSignup(env, payload, request, ctx) {
  // Honeypot: bots fill every field. Return a fake success, do nothing.
  if (payload && typeof payload.website === 'string' && payload.website.trim()) {
    return { status: 201, body: { slug: 'ok', status: 'pending' } };
  }

  const name = (payload && typeof payload.name === 'string' ? payload.name : '').trim().slice(0, SIGNUP_MAX_NAME);
  const email = (payload && typeof payload.email === 'string' ? payload.email : '').trim().toLowerCase().slice(0, 254);
  const reading = (payload && typeof payload.reading === 'string' ? payload.reading : '').trim().slice(0, SIGNUP_MAX_READING);

  if (!name) return { status: 400, body: { error: 'name required' } };
  if (!/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { status: 400, body: { error: 'a real email is required, that is where we send the door' } };
  }
  if (!reading || reading.length < 3) {
    return { status: 400, body: { error: 'reading required' } };
  }

  // Rate limit per IP: KV counter, racy but a fine deterrent.
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const rlKey = 'rl:signup:' + ip;
  const count = parseInt(await env.STATE_KV.get(rlKey) || '0', 10);
  if (count >= SIGNUP_RATE_LIMIT) {
    return { status: 429, body: { error: 'too many signups from this connection, try again in an hour' } };
  }
  await env.STATE_KV.put(rlKey, String(count + 1), { expirationTtl: 3600 });

  // Email dedupe: same email -> same portal. Re-send the link, don't
  // create a duplicate. Don't leak the slug in the response body.
  const emailSha = await sha256Hex(email);
  const existingSlug = await env.STATE_KV.get('idx:email:' + emailSha);
  if (existingSlug) {
    const existing = await readSignup(env, existingSlug);
    if (existing && existing.status === 'ready') {
      if (ctx) ctx.waitUntil(sendLifecycleEmail(env, existing, 'ready'));
      return { status: 200, body: { status: 'existing', message: 'we already hold a portal for this email, the door has been re-sent' } };
    }
    if (existing) {
      // Pending/failed prior signup for this email: resume it.
      return { status: 200, body: { slug: existing.slug, status: existing.status } };
    }
  }

  let slug = makeSlug(name);
  for (let i = 0; i < 3; i++) {
    if (!(await env.STATE_KV.get('signup:' + slug))) break;
    slug = makeSlug(name);
  }

  const rec = {
    slug, name, email, readingRaw: reading,
    status: 'pending', attempts: 0, lockTs: null,
    createdTs: Date.now(), readyTs: null, error: null, ip,
    emails: [], day3Sent: false, failNotified: false
  };
  await writeSignup(env, rec);
  await env.STATE_KV.put('idx:email:' + emailSha, slug);

  if (ctx) ctx.waitUntil(sendLifecycleEmail(env, rec, 'received'));
  return { status: 201, body: { slug, status: 'pending' } };
}

async function handleGenerate(env, payload, ctx) {
  let slug;
  try { slug = validateSlug(payload && payload.slug); }
  catch { return { status: 400, body: { error: 'invalid slug' } }; }

  const rec = await readSignup(env, slug);
  if (!rec) return { status: 404, body: { error: 'not found' } };

  if (rec.status === 'ready') {
    return { status: 200, body: { slug, status: 'ready', portalUrl: portalUrlFor(slug, env) } };
  }
  if (rec.status === 'generating' && rec.lockTs && (Date.now() - rec.lockTs) < GENERATE_LOCK_MS) {
    return { status: 409, body: { slug, status: 'generating', retryAfter: 15 } };
  }
  if ((rec.attempts || 0) >= MAX_GENERATION_ATTEMPTS) {
    return { status: 410, body: { slug, status: 'failed' } };
  }

  rec.status = 'generating';
  rec.lockTs = Date.now();
  rec.attempts = (rec.attempts || 0) + 1;
  await writeSignup(env, rec);

  try {
    await runGeneration(env, rec);
    rec.status = 'ready';
    rec.readyTs = Date.now();
    rec.error = null;
    await writeSignup(env, rec);
    if (ctx) ctx.waitUntil(sendLifecycleEmail(env, rec, 'ready'));
    return { status: 200, body: { slug, status: 'ready', portalUrl: portalUrlFor(slug, env) } };
  } catch (err) {
    rec.status = rec.attempts >= MAX_GENERATION_ATTEMPTS ? 'failed' : 'pending';
    rec.error = String(err && err.message || err).slice(0, 400);
    await writeSignup(env, rec);
    if (rec.status === 'failed' && !rec.failNotified && ctx) {
      ctx.waitUntil(sendLifecycleEmail(env, rec, 'failed-admin'));
    }
    return { status: 502, body: { slug, status: rec.status, error: rec.error } };
  }
}

/* Two chained Claude calls + template merge. Throws on hard failure;
   degrades to canonical plan ordering on soft (parse) failure. */
async function runGeneration(env, rec) {
  const template = await getCatalogTemplate(env);

  // Call 1: the existing expand pipeline. Normalized + clamped already.
  const expand = await expandIntakeWithTimeout(env, {
    mode: 'reading',
    userName: rec.name,
    fields: { rawReading: rec.readingRaw }
  });

  // Call 2: session layer (week plan + per-session why/intention).
  let sessionLayer = null;
  try {
    const raw = await callClaude(env, {
      system: SESSION_LAYER_SYSTEM(rec.name),
      max_tokens: 4000,
      timeoutMs: 90000,
      messages: [{ role: 'user', content: buildSessionLayerUser(rec, expand, template) }]
    });
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) sessionLayer = JSON.parse(m[0]);
  } catch (err) {
    // Soft failure: portal ships with canonical plan ordering.
    console.log('session layer generation failed for ' + rec.slug + ': ' + String(err && err.message || err));
  }

  const userData = mergePortal(template, expand, sessionLayer, rec);
  await env.STATE_KV.put('userdata:' + rec.slug, JSON.stringify(userData));
}

async function expandIntakeWithTimeout(env, payload) {
  // expandIntake calls callClaude with default 30s; for signup we route
  // through a longer-budget variant of the same prompt contract.
  const raw = await callClaude(env, {
    system: EXPAND_SYSTEM(payload.userName),
    max_tokens: 1800,
    timeoutMs: 90000,
    messages: [{ role: 'user', content: buildExpandUser(payload) }]
  });
  let parsed = null;
  try {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) parsed = JSON.parse(m[0]);
  } catch { /* fall through */ }
  if (!parsed || typeof parsed !== 'object') parsed = expandFallback(payload.userName);
  return normalizeExpandResult(parsed, payload.userName);
}

function SESSION_LAYER_SYSTEM(userName) {
  const name = nameOrFallback(userName);
  return `You are curating a 4-week SoundBed session plan for ${name} from their biofield reading.

You have a FIXED catalog of 16 sessions (slugs provided in the user message). Your job: assign all 16 sessions across 4 weeks (4 per week, each used exactly once), give each week a title + intent + responds line, and write a personalized "why" and "intention" for every session.

Return ONLY this JSON, no prose, no fences:

{
  "weeks": [
    { "week": 1, "title": "<2-5 words>", "intent": "<one sentence>", "responds": "<short clause list citing their reading>", "sessions": ["<slug>","<slug>","<slug>","<slug>"] },
    { "week": 2, ... }, { "week": 3, ... }, { "week": 4, ... }
  ],
  "sessionNotes": {
    "<slug>": { "why": "<max 40 words, references THEIR reading specifically>", "intention": "<max 25 words, first person, present tense>" },
    ... all 16 slugs ...
  }
}

Rules:
- 'welcome-to-opus' is ALWAYS the first session of week 1.
- Week 1 grounds. Build intensity gradually; never put throat/expression work before the body has a settling week.
- Honor what the reading says is strong (feed it) vs depleted (meet it gently).
- "why" strings speak directly to ${name} in second person and cite their reading by paraphrase.
- "intention" strings are in ${name}'s first-person voice.
- Mirror, never conclude. No medical or psychological claims.

${HUMANIZER_RULES}`;
}

function buildSessionLayerUser(rec, expand, template) {
  const sessionLines = Object.entries(template.sessions).map(([slug, s]) =>
    `- ${slug}: ${s.heading} (${s.category}) - ${s.subtitle}`
  ).join('\n');
  const chakraLines = (expand.chakraStates || []).map(c => `- ${c.label}: ${c.state} (${c.note})`).join('\n');
  return [
    `THE READING (source of truth):`,
    rec.readingRaw,
    ``,
    `PARSED CHAKRA STATES:`,
    chakraLines,
    ``,
    `PRIMARY BLOCK: ${expand.primaryBlockQuote}`,
    `ARCHETYPE: ${expand.archetype}`,
    ``,
    `THE 16 SESSIONS (use each slug exactly once):`,
    sessionLines,
    ``,
    `Now produce the JSON. Return ONLY the JSON.`
  ].join('\n');
}

function mergePortal(template, expand, sessionLayer, rec) {
  const sessions = {};
  for (const [slug, s] of Object.entries(template.sessions)) {
    sessions[slug] = { ...s };
  }

  // Overlay per-session why/intention when valid.
  const notes = (sessionLayer && sessionLayer.sessionNotes && typeof sessionLayer.sessionNotes === 'object')
    ? sessionLayer.sessionNotes : {};
  for (const [slug, n] of Object.entries(notes)) {
    if (!sessions[slug] || !n || typeof n !== 'object') continue;
    if (typeof n.why === 'string' && n.why.trim() && n.why.length <= 600) {
      sessions[slug].why = n.why.trim();
    }
    if (typeof n.intention === 'string' && n.intention.trim() && n.intention.length <= 400) {
      sessions[slug].intention = n.intention.trim();
    }
  }

  // Validate the generated week plan; fall back to canonical ordering.
  let plan = template.defaultPlan.map(p => ({ ...p, sessions: [...p.sessions] }));
  const weeks = sessionLayer && Array.isArray(sessionLayer.weeks) ? sessionLayer.weeks : null;
  if (weeks && weeks.length === 4) {
    const allSlugs = [];
    let valid = true;
    for (const w of weeks) {
      if (!w || !Array.isArray(w.sessions) || w.sessions.length !== 4) { valid = false; break; }
      for (const s of w.sessions) {
        if (!sessions[s]) { valid = false; break; }
        allSlugs.push(s);
      }
      if (!valid) break;
    }
    if (valid && new Set(allSlugs).size === 16 && weeks[0].sessions[0] === 'welcome-to-opus') {
      plan = weeks.map((w, i) => ({
        week: i + 1,
        title: (typeof w.title === 'string' && w.title.trim()) ? w.title.trim().slice(0, 60) : template.defaultPlan[i].title,
        intent: (typeof w.intent === 'string' && w.intent.trim()) ? w.intent.trim().slice(0, 300) : template.defaultPlan[i].intent,
        responds: (typeof w.responds === 'string' && w.responds.trim()) ? w.responds.trim().slice(0, 400) : template.defaultPlan[i].responds,
        sessions: w.sessions
      }));
    }
  }

  const now = new Date();
  const period = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return {
    slug: rec.slug,
    displayName: rec.name,
    period,
    portrait: '',
    generated: true,
    generatedTs: Date.now(),
    auricMeters: expand.auricMeters,
    hawkinsLevel: expand.hawkinsLevel,
    hawkinsTarget: expand.hawkinsTarget,
    dna: expand.dna,
    primaryBlockQuote: expand.primaryBlockQuote,
    archetype: expand.archetype,
    chakraStates: expand.chakraStates,
    reading: rec.readingRaw,
    sessions,
    prompts: template.prompts,
    plan,
    heldInReserve: template.heldInReserve,
    slugToChakra: template.slugToChakra
  };
}

async function getCatalogTemplate(env) {
  const cached = await env.STATE_KV.get('template:catalog-v1');
  if (cached) {
    try { return JSON.parse(cached); } catch { /* refetch */ }
  }
  const resp = await fetch(TEMPLATE_URL, { headers: { 'accept': 'application/json' } });
  if (!resp.ok) throw new Error('catalog template fetch failed: HTTP ' + resp.status);
  const template = await resp.json();
  if (!template || !template.sessions || Object.keys(template.sessions).length !== 16) {
    throw new Error('catalog template malformed');
  }
  await env.STATE_KV.put('template:catalog-v1', JSON.stringify(template), { expirationTtl: 3600 });
  return template;
}

/* ============================================================ Email layer (Resend) */

function EMAIL_COPY(type, rec, env) {
  const name = rec.name || 'Friend';
  const link = portalUrlFor(rec.slug, env);
  if (type === 'received') {
    return {
      subject: 'We have your reading',
      text: `${name},\n\nYour reading arrived a moment ago. It's in good hands.\n\nWe're reading it the way your practitioner wrote it, nothing summarized, nothing graded, and building a private portal around it: your words mirrored back, and four weeks of SoundBed sessions drawn from what the reading says.\n\nOne more email is coming, usually within minutes, with the door. Nothing is asked of you until then.\n\nthe OPUS portal`
    };
  }
  if (type === 'ready') {
    return {
      subject: 'Your portal is open',
      text: `${name},\n\nThe room is ready: ${link}\n\nThat link is yours alone. It's the only key to this room, so keep it the way you'd keep a key. Don't post it anywhere public. If you lose it, reply here and we'll send it again.\n\nInside: the reading you shared, held as the starting frame. A four-week map built from it. A place to leave a note after each session. Go when you're ready. It isn't going anywhere.\n\nthe OPUS portal`
    };
  }
  if (type === 'day3') {
    return {
      subject: 'Still here',
      text: `${name},\n\nNo task in this email. The portal is still holding your reading, whether you've been once, daily, or not yet at all. All three are fine.\n\nOne ask, only if it's easy: if anything in your map reads wrong, a word, a session, a week that doesn't sound like you, reply and say so. We adjust quietly.\n\nthe OPUS portal`
    };
  }
  if (type === 'failed-admin') {
    return {
      subject: '[portal] generation failed 3x: ' + rec.slug,
      text: `Signup ${rec.slug} (${rec.name}, ${rec.email}) failed generation ${rec.attempts} times.\nLast error: ${rec.error || 'unknown'}\nCreated: ${new Date(rec.createdTs).toISOString()}\n\nCheck: ${portalBase(env)}/users-admin\nRetry: POST /generate {"slug":"${rec.slug}"}`
    };
  }
  return null;
}

async function sendLifecycleEmail(env, rec, type) {
  const copy = EMAIL_COPY(type, rec, env);
  if (!copy) return;
  const to = type === 'failed-admin' ? (env.ADMIN_EMAIL || 'adam@feelopus.com') : rec.email;
  const result = { type, ts: Date.now(), ok: false };

  if (!env.RESEND_API_KEY) {
    result.error = 'no-key';
    console.log('email skipped (no RESEND_API_KEY): ' + type + ' -> ' + to);
  } else {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 10000);
      try {
        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'authorization': 'Bearer ' + env.RESEND_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            from: env.EMAIL_FROM || 'OPUS SoundBed <portal@feelopus.com>',
            to: [to],
            subject: copy.subject,
            text: copy.text
          }),
          signal: ctrl.signal
        });
        const data = await resp.json().catch(() => ({}));
        if (resp.ok) {
          result.ok = true;
          result.providerId = data.id || null;
        } else {
          result.error = (data && data.message) || ('HTTP ' + resp.status);
        }
      } finally {
        clearTimeout(t);
      }
    } catch (err) {
      result.error = String(err && err.message || err).slice(0, 200);
    }
  }

  // Record the send attempt on the signup record. Never throw.
  try {
    const fresh = await readSignup(env, rec.slug);
    if (fresh) {
      fresh.emails = fresh.emails || [];
      fresh.emails.push(result);
      if (type === 'day3' && result.ok) fresh.day3Sent = true;
      if (type === 'failed-admin' && result.ok) fresh.failNotified = true;
      await writeSignup(env, fresh);
    }
  } catch {}
}

/* ============================================================ Cron sweep */

async function sweepSignups(env) {
  if (!env.STATE_KV) return { error: 'STATE_KV not bound' };
  const summary = { scanned: 0, regenerated: 0, day3Sent: 0, failed: 0 };
  const records = [];
  let cursor = undefined;
  for (let i = 0; i < 10; i++) {
    const list = await env.STATE_KV.list({ prefix: 'signup:', cursor });
    for (const k of list.keys) {
      const v = await env.STATE_KV.get(k.name);
      if (!v) continue;
      try { records.push(JSON.parse(v)); } catch {}
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }
  summary.scanned = records.length;

  const now = Date.now();
  let regenBudget = 3; // max regenerations per sweep; cron runs hourly

  for (const rec of records) {
    try {
      // Stale generating lock -> reset to pending.
      if (rec.status === 'generating' && rec.lockTs && (now - rec.lockTs) > SWEEP_STUCK_MS) {
        rec.status = 'pending';
        rec.lockTs = null;
        await writeSignup(env, rec);
      }
      // Pending with attempts left -> regenerate here in the cron.
      if (rec.status === 'pending' && (rec.attempts || 0) < MAX_GENERATION_ATTEMPTS
          && (now - rec.createdTs) > 120000 && regenBudget > 0 && env.ANTHROPIC_API_KEY) {
        regenBudget--;
        rec.status = 'generating';
        rec.lockTs = Date.now();
        rec.attempts = (rec.attempts || 0) + 1;
        await writeSignup(env, rec);
        try {
          await runGeneration(env, rec);
          rec.status = 'ready';
          rec.readyTs = Date.now();
          rec.error = null;
          await writeSignup(env, rec);
          await sendLifecycleEmail(env, rec, 'ready');
          summary.regenerated++;
        } catch (err) {
          rec.status = rec.attempts >= MAX_GENERATION_ATTEMPTS ? 'failed' : 'pending';
          rec.error = String(err && err.message || err).slice(0, 400);
          await writeSignup(env, rec);
          if (rec.status === 'failed' && !rec.failNotified) {
            await sendLifecycleEmail(env, rec, 'failed-admin');
            summary.failed++;
          }
        }
      }
      // Ready 3+ days, no day-3 email yet -> send it once.
      if (rec.status === 'ready' && rec.readyTs && !rec.day3Sent
          && (now - rec.readyTs) > 3 * 86400000 && (now - rec.readyTs) < 14 * 86400000) {
        await sendLifecycleEmail(env, rec, 'day3');
        summary.day3Sent++;
      }
    } catch (err) {
      console.log('sweep error for ' + rec.slug + ': ' + String(err && err.message || err));
    }
  }
  return summary;
}
