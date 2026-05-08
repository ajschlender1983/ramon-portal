/**
 * Ramon Resolver — Cloudflare Worker
 *
 * Two endpoints:
 *   POST /reflect  — single Claude call producing one per-session reflection
 *   POST /deepen   — chains 4 Claude calls (1 strategic-resolve + 3 EBI passes)
 *                    and returns the final synthesized text
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
    if (request.method !== 'POST') {
      return json({ error: 'method not allowed' }, 405, cors);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'ANTHROPIC_API_KEY not configured on the worker' }, 500, cors);
    }

    let payload;
    try { payload = await request.json(); }
    catch { return json({ error: 'invalid json body' }, 400, cors); }

    try {
      if (url.pathname === '/reflect') {
        const text = await reflectOne(env, payload);
        return json({ reflection: text }, 200, cors);
      }
      if (url.pathname === '/deepen') {
        const passes = await deepenChain(env, payload);
        return json({ deepReflection: passes[3], passes }, 200, cors);
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
    'access-control-allow-methods': 'POST, OPTIONS',
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
      return text;
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

const REFLECT_SYSTEM = `You are reflecting one SoundBed session for Ramon. You see his Biofield reading, this session's metadata (heading, subtitle, intention, why-this-for-you), where in the 30-day arc this falls, and his Before + After notes for THIS session.

Write a single short reflection (90 to 140 words). Mirror what he wrote. Notice what shifted between Before and After. Honor the session's intention as the frame he was holding. Reference the Biofield reading only when his After note speaks to something the reading flagged.

NEVER conclude. NEVER diagnose. NEVER claim energetic or medical insight. Don't repeat his words verbatim, refract them.

Voice: warm, specific, grounded. OPUS tone. No AI phrases ("I notice", "It sounds like", "Remember that"). No headers, no bullets.

Format: two short paragraphs. End with one open question, not a directive.

Principle, non-negotiable: we reflect, we never conclude.`;

const DEEPEN_RESOLVE_SYSTEM = `You are deepening a per-session reflection for Ramon, a SoundBed user.

You will speak as TWO voices in turn:
- Voice A — Senior Somatic Experience Designer. The body is the source of truth. You see what the original reflection didn't quite touch in the body.
- Voice B — Senior Reflective Writer. You know when a sentence is doing the work and when it's hiding.

For each voice, write a short note (no more than 80 words) on what the prior reflection misses. Then together draft a single deeper reflection (180 to 240 words) that lands what the original gestured at.

Same constraints as the original: warm, specific, NEVER conclude, NEVER diagnose, no AI phrases, no headers, no bullets. End with one open question.

Return strictly this JSON shape, with no surrounding prose:
{ "voiceA": "<= 80 words", "voiceB": "<= 80 words", "draft": "180-240 words" }`;

const DEEPEN_EBI_STRUCTURE_SYSTEM = `Run one EBI (Even Better If) pass on a deepening reflection draft for Ramon. Focus: structure, length, voice. What's working stays. What would be even better if structure were tightened, length right-sized to 180-240 words, and voice held warm and specific?

Apply the highest-impact edits directly. Return ONLY the improved draft text. No preamble. No JSON. Same constraints (never conclude, never diagnose, no AI phrases, ends with one open question).`;

const DEEPEN_EBI_RESONANCE_SYSTEM = `Run a second EBI pass on this deepening reflection. Focus: emotional resonance. Would Ramon's body recognize the words back? Does the reflection sound like something a thoughtful friend would say, not an algorithm?

Apply edits directly. Return ONLY the improved draft. Same constraints. Same length range. Ends with one open question.`;

const DEEPEN_EBI_HONESTY_SYSTEM = `Run a final EBI pass on this deepening reflection. Focus: the reflective contract. Cut anything that drifts toward conclusion, diagnosis, claim, or interpretation. If a sentence even gestures at "you are X" or "this means Y", rewrite it as a mirror or an open question.

Return ONLY the final text. No preamble. Same constraints. 180-240 words. Ends with one open question.`;

/* ============================================================ Reflect — single call */

function buildReflectUser(payload) {
  const s = payload.session || {};
  const j = payload.journey || {};
  const parsed = payload.biofieldParsed || {};
  const frames = parsed.frames || {};
  const frameLines = Object.keys(frames).map(k => '— ' + frames[k].label + ': ' + frames[k].body).join('\n');

  return [
`SESSION
- Heading: ${s.heading || ''}
- Subtitle: ${s.subtitle || ''}
- Category: ${s.category || ''}
- Artist: ${s.artist || ''}
- Intention Ramon was holding: "${s.intention || ''}"
- Why we picked this for him: ${s.why || ''}
- Lede: ${s.lede || ''}`,

`JOURNEY POSITION
- Week ${j.week || '?'} of 4
- Weeks completed so far: ${j.weeksCompleted ?? 0}
- Sessions with at least one note: ${j.sessionsWithNoteCount ?? 0}/16`,

`HIS BIOFIELD READING (frames mirrored from his practitioner)
${frameLines || '(not parsed)'}`,

`HIS NOTES FOR THIS SESSION
Before: ${payload.before || '(empty)'}
After:  ${payload.after  || '(empty)'}`,

`Now write the per-session reflection.`
  ].join('\n\n');
}

async function reflectOne(env, payload) {
  return await callClaude(env, {
    system: REFLECT_SYSTEM,
    max_tokens: 700,
    temperature: 0.7,
    messages: [{ role: 'user', content: buildReflectUser(payload) }]
  });
}

/* ============================================================ Deepen — chained 4-pass */

async function deepenChain(env, payload) {
  const baseUser = buildReflectUser(payload) + '\n\nPRIOR REFLECTION (the one we are deepening):\n' + (payload.priorReflection || '');

  // Pass 1 — Strategic-resolve (two voices + initial deeper draft)
  const pass1Raw = await callClaude(env, {
    system: DEEPEN_RESOLVE_SYSTEM,
    max_tokens: 1400,
    temperature: 0.75,
    messages: [{ role: 'user', content: baseUser }]
  });
  const pass1Draft = extractDeepenDraft(pass1Raw);

  // Pass 2 — EBI structure
  const pass2 = await callClaude(env, {
    system: DEEPEN_EBI_STRUCTURE_SYSTEM,
    max_tokens: 900,
    temperature: 0.6,
    messages: [{ role: 'user', content: 'Current draft:\n\n' + pass1Draft }]
  });

  // Pass 3 — EBI resonance
  const pass3 = await callClaude(env, {
    system: DEEPEN_EBI_RESONANCE_SYSTEM,
    max_tokens: 900,
    temperature: 0.6,
    messages: [{ role: 'user', content: 'Current draft:\n\n' + pass2 }]
  });

  // Pass 4 — EBI honesty (final)
  const pass4 = await callClaude(env, {
    system: DEEPEN_EBI_HONESTY_SYSTEM,
    max_tokens: 900,
    temperature: 0.55,
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
