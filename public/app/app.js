/* ============================================================
   OPUS Web App — orchestrator
   - Hash router across views
   - Slug parse + smart-skip intake
   - Master breath clock (matches /index.html, 10.91 s / 5.5 BPM)
   - Worker call helpers + payload builders
   - localStorage scoping per slug
   - Mode dispatcher (Quest default; Studio + Daily Path are Phase B/C)
   ============================================================ */

window.OPUS = window.OPUS || {};

const VERSION = '2.0.0-alpha.5';

const RESOLVE_BASE = 'https://ramon-resolver.ajschlender.workers.dev';
const RESOLVE_REFLECT = RESOLVE_BASE + '/reflect';
const RESOLVE_DEEPEN  = RESOLVE_BASE + '/deepen';
const RESOLVE_EXPAND  = RESOLVE_BASE + '/expand';
const RESOLVE_STATE   = RESOLVE_BASE + '/state';   // v1.11.0: per-slug state blob

/* ---------- v1.11.0: Cloud storage layer (mirror of legacy index.html) ----------
   Per-slug state persists across devices via Cloudflare KV. On page load we
   GET the blob and rehydrate localStorage from it (server wins). Every
   subsequent setItem on a synced key is debounce-pushed back to the server.
   Same wire format as the legacy portal so the two surfaces stay in sync. */

const CloudSync = (function () {
  const SYNC_DEBOUNCE_MS = 1200;
  const SYNCED_LS_SUFFIXES = [
    /* shared with legacy portal */
    '.notes.v1', '.wow.v1', '.field.v1', '.field.history.v1',
    '.reflections.v1', '.state.v1', '.sessionReflections.v1',
    '.weekFields.v1', '.sessionFields.v1', '.expanded.v1',
    '.activeSnapshot.v1', '.snapshots.v1', '.dashOpen.v1', '.examples.v1',
    /* web-app specific */
    '.app.userData.v1', '.app.intakeChoice.v1', '.app.mode.v1',
    '.app.prefs.v1', '.quest.moduleCompletions.v1',
    '.quest.celebrationSeen.v1', '.quest.streak.v1'
  ];

  let slug = null;
  let active = false;
  let pushTimer = null;
  let lastPushedJSON = '';

  function isSyncedKey(key) {
    if (!slug) return false;
    if (!key.startsWith(slug + '.')) return false;
    return SYNCED_LS_SUFFIXES.some(suf => key.endsWith(suf));
  }

  function snapshotStateFromLS() {
    const state = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (isSyncedKey(k)) state[k] = localStorage.getItem(k);
    }
    return state;
  }

  // v1.15.1 (alpha.5): deep merge — see public/index.html for rationale.
  // JSON objects merge by sub-key (server wins conflicts, local-only
  // sub-keys survive); arrays union; plain strings keep server-wins.
  function mergeStateValues(localVal, serverVal) {
    try {
      const l = JSON.parse(localVal);
      const sv = JSON.parse(serverVal);
      if (Array.isArray(l) && Array.isArray(sv)) {
        const seen = new Set(sv.map(x => JSON.stringify(x)));
        return JSON.stringify(sv.concat(l.filter(x => !seen.has(JSON.stringify(x)))));
      }
      if (l && sv && typeof l === 'object' && typeof sv === 'object'
          && !Array.isArray(l) && !Array.isArray(sv)) {
        return JSON.stringify(Object.assign({}, l, sv));
      }
    } catch { /* one side is not JSON */ }
    return serverVal;
  }

  function applyServerStateToLS(state) {
    if (!state || typeof state !== 'object') return 0;
    let n = 0;
    // v1.11.5: ADDITIVE merge — local-only keys survive a rehydrate.
    // v1.15.1: DEEP merge — local-only sub-keys inside JSON blobs
    // survive too (the recovery path for pre-v1.11.6 stranded writes).
    for (const k in state) {
      if (typeof state[k] !== 'string') continue;
      const localVal = localStorage.getItem(k);
      const merged = (localVal && localVal !== state[k])
        ? mergeStateValues(localVal, state[k])
        : state[k];
      localStorage.setItem(k, merged);
      n++;
    }
    return n;
  }

  async function rehydrate(slugIn) {
    slug = slugIn;
    try {
      const resp = await fetch(RESOLVE_STATE + '?slug=' + encodeURIComponent(slug), { method: 'GET' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (data && data.state && Object.keys(data.state).length > 0) {
        applyServerStateToLS(data.state);
        lastPushedJSON = JSON.stringify(data.state);
      } else {
        lastPushedJSON = '';
      }
      active = true;
      // v1.11.7 (alpha.4): see public/index.html. After additive merge,
      // immediately push the full merged snapshot so local-only keys
      // (writes that never reached KV) land on the next page open.
      const merged = snapshotStateFromLS();
      if (Object.keys(merged).length > 0) {
        const mergedJSON = JSON.stringify(merged);
        if (mergedJSON !== lastPushedJSON) await pushNow(merged);
      }
    } catch (err) { /* local-only fallback */ }
  }

  async function pushNow(state) {
    if (!slug) return;
    const body = JSON.stringify(state || snapshotStateFromLS());
    if (body === lastPushedJSON) return;
    try {
      const resp = await fetch(RESOLVE_STATE, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, state: JSON.parse(body) })
      });
      if (resp.ok) lastPushedJSON = body;
    } catch (err) { /* swallow */ }
  }

  function schedulePush() {
    if (!active) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => { pushTimer = null; pushNow(); }, SYNC_DEBOUNCE_MS);
  }

  (function wrap() {
    const origSet = Storage.prototype.setItem;
    const origRemove = Storage.prototype.removeItem;
    Storage.prototype.setItem = function (k, v) {
      const ret = origSet.call(this, k, v);
      if (this === localStorage && isSyncedKey(k)) schedulePush();
      return ret;
    };
    Storage.prototype.removeItem = function (k) {
      const isSynced = (this === localStorage) && isSyncedKey(k);
      const ret = origRemove.call(this, k);
      if (isSynced) schedulePush();
      return ret;
    };
  })();

  // v1.11.6: see public/index.html for the matching fix and rationale.
  // Beacon-flush whenever snapshot ≠ lastPushedJSON, not only when
  // pushTimer is pending — handles in-flight-fetch + tab-hide race
  // (mobile Safari aborts; sendBeacon survives).
  function flushOnHide() {
    if (!active || !slug) return;
    if (pushTimer) {
      clearTimeout(pushTimer);
      pushTimer = null;
    }
    const snap = snapshotStateFromLS();
    const snapJSON = JSON.stringify(snap);
    if (snapJSON === lastPushedJSON) return;
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob(
          [JSON.stringify({ slug, state: snap })],
          { type: 'application/json' }
        );
        const ok = navigator.sendBeacon(RESOLVE_STATE, blob);
        if (ok) lastPushedJSON = snapJSON;
      }
    } catch {}
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flushOnHide();
  });
  window.addEventListener('pagehide', flushOnHide);

  return { rehydrate, pushNow };
})();
window.OPUS = window.OPUS || {};
window.OPUS.CloudSync = CloudSync;

/* ---------- localStorage keys (mirror legacy + add app-specific) ---------- */

function makeLS(slug) {
  return {
    /* shared with legacy /?u=<slug> portal — write/read identically */
    notes:              slug + '.notes.v1',
    wow:                slug + '.wow.v1',
    field:              slug + '.field.v1',
    reflections:        slug + '.reflections.v1',
    state:              slug + '.state.v1',
    sessionFields:      slug + '.sessionFields.v1',
    /* new for the web app */
    userDataOverride:   slug + '.app.userData.v1',     // synthesized USER_DATA from /expand
    intakeChoice:       slug + '.app.intakeChoice.v1', // 'survey'|'biometric'|'reading'|'empty'
    currentMode:        slug + '.app.mode.v1',         // 'quest'|'studio'|'daily'
    appPrefs:           slug + '.app.prefs.v1',
    questCompletions:   slug + '.quest.moduleCompletions.v1',
    questCelebration:   slug + '.quest.celebrationSeen.v1',
    questStreak:        slug + '.quest.streak.v1',
  };
}

let LS = makeLS('__pending__');

/* ---------- DOM helpers ---------- */

function el(tag, attrs, kids) {
  const n = document.createElement(tag);
  if (attrs) {
    for (const k in attrs) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'dataset' && typeof v === 'object') {
        for (const dk in v) n.dataset[dk] = v[dk];
      }
      else if (k === 'style' && typeof v === 'object') {
        for (const sk in v) n.style[sk] = v[sk];
      }
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
  }
  if (kids) {
    (Array.isArray(kids) ? kids : [kids]).forEach(c => {
      if (c == null) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }
  return n;
}
window.OPUS.el = el;

function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
window.OPUS.$ = $; window.OPUS.$$ = $$;

function clearChildren(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }
window.OPUS.clearChildren = clearChildren;

function reducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
window.OPUS.reducedMotion = reducedMotion;

/* humanize: client-side mirror of the Worker's same-named function in
   worker/worker.js. The Worker humanizes every Claude response on the
   way out — this is the belt-and-suspenders pass so:
   - any stale data in localStorage from older deploys gets cleaned on render
   - any future bypass path still produces clean text
   - hand-written copy (seeded reflections, fallback strings) follows the
     same language rules as live worker output
   Logic mirrors the worker exactly so output is identical regardless of
   which side ran the pass. Strips em dashes, normalizes en dashes between
   words, collapses double commas, drops line-leading commas. */
function humanize(text) {
  if (!text) return text;
  let s = String(text);
  s = s.replace(/\s*—\s*/g, ', ');
  s = s.replace(/(\w)\s*--\s*(\w)/g, '$1, $2');
  s = s.replace(/(\w)\s*–\s*(\w)/g, function (m, a, b) {
    return (/\d/.test(a) && /\d/.test(b)) ? a + '-' + b : a + ', ' + b;
  });
  s = s.replace(/,\s*,/g, ',');
  s = s.replace(/,\s*\./g, '.');
  s = s.replace(/\s{2,}/g, ' ');
  s = s.replace(/^\s*[,]+\s*/gm, '');
  return s.trim();
}
window.OPUS.humanize = humanize;

/* ---------- WOW labels (canonical, mirrored from legacy index.html) ---------- */

const WOW_LABELS = {
  1: { short: "Didn't land",  long: "Didn't land. Distracted or uncomfortable." },
  2: { short: 'Mild',         long: 'Mild. Noticed something but stayed in my head.' },
  3: { short: 'Good',         long: 'Good. Relaxed, felt some real benefit.' },
  4: { short: 'Deep',         long: 'Deep. Went somewhere. Real shift in how I feel.' },
  5: { short: 'Profound',     long: 'Profound. Significant release, emotion, or insight.' },
  6: { short: '✨ WOW',       long: 'Beyond words. An expansive experience of ineffable emotion. The feeling exceeds language.' }
};
window.OPUS.WOW_LABELS = WOW_LABELS;

/* ---------- Master breath clock (10.91 s / 5.5 BPM) ---------- */

const BREATH_CYCLE_MS = 10910;
function startBreathClock() {
  let rafId = 0;
  let paused = false;
  const root = document.documentElement;
  function tick(now) {
    if (!paused) {
      const t = (now % BREATH_CYCLE_MS) / BREATH_CYCLE_MS; // 0..1
      const phase = t < 0.5 ? (t * 2) : (1 - (t - 0.5) * 2); // 0..1..0
      root.style.setProperty('--breath-phase', String(t.toFixed(3)));
      root.style.setProperty('--breath-pulse', String(phase.toFixed(3)));
    }
    rafId = requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
  });
  rafId = requestAnimationFrame(tick);
}

/* ---------- View management ---------- */

const VIEWS = ['loading', 'no-link', 'intake', 'dashboard', 'module', 'session', 'archive', 'field', 'settings', 'celebrate'];

function showView(name) {
  VIEWS.forEach(v => {
    const node = document.querySelector('[data-view="' + v + '"]');
    if (node) node.dataset.active = (v === name) ? '1' : '0';
  });
  $$('.botnav-item').forEach(b => {
    b.dataset.active = (b.dataset.nav === name) ? '1' : '0';
  });
  const showNav = !['intake', 'loading', 'no-link', 'celebrate'].includes(name);
  const nav = document.getElementById('botnav');
  if (nav) nav.hidden = !showNav;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.OPUS.showView = showView;

/* ---------- Hash router ---------- */

function readRoute() {
  const raw = (location.hash || '').replace(/^#\//, '#');
  if (!raw) return { name: 'dashboard' };
  if (raw === '#dashboard') return { name: 'dashboard' };
  if (raw === '#archive') return { name: 'archive' };
  if (raw === '#field') return { name: 'field' };
  if (raw === '#settings') return { name: 'settings' };
  if (raw === '#intake') return { name: 'intake' };
  if (raw === '#celebrate') return { name: 'celebrate' };
  const m = raw.match(/^#m\/(\d+)/);
  if (m) return { name: 'module', n: parseInt(m[1], 10) };
  const s = raw.match(/^#s\/([\w-]+)/);
  if (s) return { name: 'session', slug: s[1] };
  return { name: 'dashboard' };
}
window.OPUS.readRoute = readRoute;

function setHash(h) {
  if (location.hash === h) {
    routeChanged();
  } else {
    location.hash = h;
  }
}
window.OPUS.setHash = setHash;

function routeChanged() {
  if (!window.OPUS.USER) return;
  const r = readRoute();
  switch (r.name) {
    case 'dashboard': renderDashboard(); break;
    case 'module':    renderModule(r.n); break;
    case 'session':   renderSession(r.slug); break;
    case 'archive':   renderArchive(); break;
    case 'field':     renderField(); break;
    case 'settings':  renderSettings(); break;
    case 'intake':    renderIntake({ force: true }); break;
    case 'celebrate': renderCelebrate(); break;
    default:          renderDashboard();
  }
}

/* ---------- Per-view renderers (delegate to mode + components) ---------- */

function renderDashboard() {
  const mount = document.getElementById('dashboard-mount');
  clearChildren(mount);
  if (window.OPUS_MODE_QUEST && typeof window.OPUS_MODE_QUEST.render === 'function') {
    window.OPUS_MODE_QUEST.render(mount);
  }
  showView('dashboard');
}

function renderModule(n) {
  const mount = document.getElementById('module-mount');
  clearChildren(mount);
  if (window.OPUS_MODE_QUEST && typeof window.OPUS_MODE_QUEST.renderModule === 'function') {
    window.OPUS_MODE_QUEST.renderModule(mount, n);
  }
  showView('module');
}

function renderSession(slug) {
  const mount = document.getElementById('session-mount');
  clearChildren(mount);
  if (window.OPUS_SESSION_CARD && typeof window.OPUS_SESSION_CARD.render === 'function') {
    window.OPUS_SESSION_CARD.render(mount, slug);
  }
  showView('session');
}

function renderArchive() {
  const mount = document.getElementById('archive-mount');
  clearChildren(mount);
  if (window.OPUS_REFLECTIONS && typeof window.OPUS_REFLECTIONS.render === 'function') {
    window.OPUS_REFLECTIONS.render(mount);
  }
  showView('archive');
}

function renderField() {
  const mount = document.getElementById('field-mount');
  clearChildren(mount);
  if (window.OPUS_FIELD && typeof window.OPUS_FIELD.render === 'function') {
    window.OPUS_FIELD.render(mount);
  }
  showView('field');
}

function renderCelebrate() {
  const mount = document.getElementById('celebrate-mount');
  clearChildren(mount);
  if (window.OPUS_MODE_QUEST && typeof window.OPUS_MODE_QUEST.renderCelebrate === 'function') {
    window.OPUS_MODE_QUEST.renderCelebrate(mount);
  }
  showView('celebrate');
}

function renderSettings() {
  const mount = document.getElementById('settings-mount');
  clearChildren(mount);
  const wrap = el('div');

  const sec1 = el('div', { class: 'settings-section' }, [
    el('h3', { text: 'You' }),
    el('div', { class: 'settings-row' }, [
      el('span', { class: 'settings-row-label', text: window.OPUS.USER.displayName || window.OPUS.slug })
    ]),
    el('div', { class: 'settings-row' }, [
      el('span', { class: 'settings-row-label', text: 'Single-page version' }),
      el('a', { class: 'settings-row-link', href: '../?u=' + window.OPUS.slug, text: 'open →' })
    ]),
  ]);
  wrap.appendChild(sec1);

  const sec2 = el('div', { class: 'settings-section' }, [
    el('h3', { text: 'Intake' }),
    el('p', { text: 'Want a different starting point? Re-run the intake flow.' }),
    el('button', { class: 'btn-secondary', type: 'button', text: 'Run intake again', onclick: () => setHash('#intake') })
  ]);
  wrap.appendChild(sec2);

  const sec3 = el('div', { class: 'settings-section' }, [
    el('h3', { text: 'About' }),
    el('p', { text: 'OPUS · SoundBed web app v' + VERSION + '. Your notes and reflections sync with the single-page version automatically.' })
  ]);
  wrap.appendChild(sec3);

  mount.appendChild(wrap);
  showView('settings');
}

/* ---------- Intake flow ---------- */

function renderIntake(opts) {
  const force = opts && opts.force;
  const mount = document.getElementById('intake-mount');
  clearChildren(mount);
  if (window.OPUS_INTAKE && typeof window.OPUS_INTAKE.render === 'function') {
    window.OPUS_INTAKE.render(mount, {
      force,
      onComplete: (result) => {
        if (result && result.userData) {
          localStorage.setItem(LS.userDataOverride, JSON.stringify(result.userData));
          window.OPUS.USER = mergeUserData(window.OPUS.USER, result.userData);
        }
        if (result && result.choice) {
          localStorage.setItem(LS.intakeChoice, result.choice);
        }
        location.hash = '#dashboard';
        if (!location.hash || location.hash === '#dashboard') routeChanged();
      }
    });
  }
  showView('intake');
}

function mergeUserData(base, override) {
  const merged = Object.assign({}, base || {});
  ['auricMeters', 'hawkinsLevel', 'hawkinsTarget', 'dna', 'primaryBlockQuote', 'archetype', 'reading'].forEach(k => {
    if (override[k] !== undefined) merged[k] = override[k];
  });
  if (Array.isArray(override.chakraStates) && override.chakraStates.length === 7) {
    merged.chakraStates = override.chakraStates;
  }
  return merged;
}
window.OPUS.mergeUserData = mergeUserData;

/* ---------- Worker call helpers ---------- */

window.OPUS.callReflect = async function callReflect(payload) {
  const resp = await fetch(RESOLVE_REFLECT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    let msg = 'HTTP ' + resp.status;
    try { const j = await resp.json(); if (j && j.error) msg = j.error; } catch {}
    throw new Error(msg);
  }
  const j = await resp.json();
  // Defensive humanize on the way in. Worker already humanizes its output;
  // this catches any path that doesn't (older worker version, edge cases).
  return humanize(j.reflection || '');
};

window.OPUS.callExpand = async function callExpand(payload) {
  const resp = await fetch(RESOLVE_EXPAND, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    let msg = 'HTTP ' + resp.status;
    try { const j = await resp.json(); if (j && j.error) msg = j.error; } catch {}
    throw new Error(msg);
  }
  const j = await resp.json();
  return j.userData;
};

window.OPUS.buildReflectPayload = function buildReflectPayload(slug) {
  const U = window.OPUS.USER;
  const sess = (U.sessions && U.sessions[slug]) || null;
  if (!sess) return null;
  const sf = getSessionFields()[slug] || {};
  const wow = getWow()[slug] || null;
  const wowLabel = wow && WOW_LABELS[wow] ? WOW_LABELS[wow].long : null;
  const planEntry = (U.plan || []).find(p => (p.sessions || []).includes(slug));
  const weekN = planEntry ? planEntry.week : 1;
  const parsed = parseBiofieldFrames(U.reading || '');
  return {
    userName: U.displayName || '',
    userSlug: U.slug || '',
    version: VERSION,
    slug,
    biofield: U.reading || '',
    biofieldParsed: parsed,
    session: {
      heading: sess.heading,
      subtitle: sess.subtitle,
      lede: sess.lede,
      why: (sess.why || '').replace(/\*([^*]+)\*/g, '$1'),
      intention: sess.intention,
      artist: sess.artist,
      category: sess.category,
      collection: sess.collection
    },
    before: (sf.before || '').trim(),
    after: (sf.after || '').trim(),
    wow,
    wowLabel,
    journey: {
      week: weekN,
      weeksCompleted: Math.max(0, weekN - 1),
      sessionsWithNoteCount: sessionsWithNoteCount()
    }
  };
};

function parseBiofieldFrames(text) {
  if (!text) return { frames: {} };
  const FRAMES = [
    { key: 'oric',     label: 'Oric Field',          marker: 'ORIC FIELD' },
    { key: 'dna',      label: 'DNA Strand Activation', marker: 'DNA STRAND' },
    { key: 'chakras',  label: 'Chakra Scan',         marker: 'CHAKRA SCAN' },
    { key: 'organs',   label: 'Organic Field',       marker: 'ORGANIC FIELD' },
    { key: 'hawkins',  label: 'Vibrational Level',   marker: 'VIBRATIONAL LEVEL' },
    { key: 'block',    label: 'Primary Block',       marker: 'PRIMARY BLOCK' },
    { key: 'archetype',label: 'Archetype',           marker: 'ARCHETYPE' }
  ];
  const frames = {};
  for (let i = 0; i < FRAMES.length; i++) {
    const f = FRAMES[i];
    const start = text.indexOf(f.marker);
    if (start < 0) continue;
    let end = text.length;
    for (let j = i + 1; j < FRAMES.length; j++) {
      const e = text.indexOf(FRAMES[j].marker);
      if (e > start) { end = e; break; }
    }
    const body = text.slice(start + f.marker.length, end).replace(/^\s*\n/, '').trim();
    frames[f.key] = { label: f.label, body };
  }
  return { frames };
}

/* ---------- localStorage accessors ---------- */

function getJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : (fallback === undefined ? null : fallback); }
  catch { return fallback === undefined ? null : fallback; }
}
function setJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

window.OPUS.getJSON = getJSON;
window.OPUS.setJSON = setJSON;

function getSessionFields() { return getJSON(LS.sessionFields, {}) || {}; }
function setSessionFields(m) { setJSON(LS.sessionFields, m); }
window.OPUS.getSessionFields = getSessionFields;
window.OPUS.setSessionFields = setSessionFields;

function getNotes() { return getJSON(LS.notes, {}) || {}; }
function setNotes(m) { setJSON(LS.notes, m); }
window.OPUS.getNotes = getNotes;
window.OPUS.setNotes = setNotes;

function getWow() { return getJSON(LS.wow, {}) || {}; }
function setWow(m) { setJSON(LS.wow, m); }
window.OPUS.getWow = getWow;
window.OPUS.setWow = setWow;

function getReflections() { return getJSON(LS.reflections, {}) || {}; }
function setReflections(m) { setJSON(LS.reflections, m); }
window.OPUS.getReflections = getReflections;
window.OPUS.setReflections = setReflections;

function getQuestCompletions() {
  return getJSON(LS.questCompletions, { 1: [], 2: [], 3: [], 4: [] }) || { 1: [], 2: [], 3: [], 4: [] };
}
function setQuestCompletions(m) { setJSON(LS.questCompletions, m); }
window.OPUS.getQuestCompletions = getQuestCompletions;
window.OPUS.setQuestCompletions = setQuestCompletions;

function sessionsWithNoteCount() {
  const sf = getSessionFields();
  let c = 0;
  for (const k in sf) {
    if ((sf[k].after && sf[k].after.length > 0) || (sf[k].before && sf[k].before.length > 0)) c++;
  }
  return c;
}
window.OPUS.sessionsWithNoteCount = sessionsWithNoteCount;

window.OPUS.isSessionComplete = function isSessionComplete(slug) {
  const sf = getSessionFields()[slug] || {};
  const w = getWow()[slug];
  return !!(sf.after && sf.after.trim().length >= 20 && w && w >= 1 && w <= 6);
};

window.OPUS.recomputeQuestCompletions = function recomputeQuestCompletions() {
  const U = window.OPUS.USER;
  if (!U || !Array.isArray(U.plan)) return;
  const out = { 1: [], 2: [], 3: [], 4: [] };
  U.plan.forEach(p => {
    (p.sessions || []).forEach(slug => {
      if (window.OPUS.isSessionComplete(slug)) {
        out[p.week].push(slug);
      }
    });
  });
  setQuestCompletions(out);
  return out;
};

/* ---------- Init ---------- */

async function init() {
  const result = await window.__userDataPromise;
  const slug = result.slug || '';

  if (!slug) {
    showView('no-link');
    return;
  }

  LS = makeLS(slug);
  window.OPUS.LS = LS;
  window.OPUS.slug = slug;

  // v1.11.0: pull cloud state and rehydrate localStorage before any UI
  // reads it. This is the multi-device-sync hook: notes written on Paul's
  // phone show up when Paul opens the same link on his laptop.
  await CloudSync.rehydrate(slug);

  const fv = document.getElementById('footer-version');
  if (fv) fv.textContent = 'v' + VERSION;

  if (result.status !== 'ok' || !window.USER_DATA) {
    const stored = getJSON(LS.userDataOverride, null);
    if (stored) {
      window.OPUS.USER = synthesizeFromOverride(stored, slug);
    } else {
      bindNav();
      bindTopBar();
      startBreathClock();
      window.addEventListener('hashchange', routeChanged);
      renderIntake({ force: true });
      return;
    }
  } else {
    window.OPUS.USER = window.USER_DATA;
    const stored = getJSON(LS.userDataOverride, null);
    if (stored) {
      window.OPUS.USER = mergeUserData(window.OPUS.USER, stored);
    }
  }

  hydrateTopBarPortrait();
  bindNav();
  bindTopBar();
  startBreathClock();
  window.OPUS.recomputeQuestCompletions();

  window.addEventListener('hashchange', routeChanged);
  routeChanged();
}

function synthesizeFromOverride(override, slug) {
  return Object.assign({
    slug,
    displayName: override.displayName || 'Friend',
    period: '',
    portrait: '',
    sessions: {},
    prompts: {},
    plan: [],
    chakraStates: [],
    heldInReserve: [],
    slugToChakra: {}
  }, override);
}

function hydrateTopBarPortrait() {
  const img = document.querySelector('.topbar-portrait .portrait-img');
  if (!img) return;
  const U = window.OPUS.USER;
  if (U && U.portrait) {
    let src = U.portrait;
    if (!/^(https?:)?\/\//.test(src) && !src.startsWith('../') && !src.startsWith('/')) {
      src = '../' + src;
    }
    img.src = src;
    img.alt = U.displayName || 'portrait';
  }
}

function bindTopBar() {
  const portrait = document.getElementById('topbar-portrait');
  if (portrait) portrait.addEventListener('click', () => setHash('#settings'));
  const brand = document.querySelector('.topbar-brand');
  if (brand) {
    brand.style.cursor = 'pointer';
    brand.addEventListener('click', () => setHash('#dashboard'));
  }
}

function bindNav() {
  $$('.botnav-item').forEach(b => {
    b.addEventListener('click', () => {
      const target = b.dataset.nav;
      if (target === 'dashboard') setHash('#dashboard');
      else if (target === 'archive') setHash('#archive');
      else if (target === 'field') setHash('#field');
    });
  });
  $$('[data-back]').forEach(b => {
    b.addEventListener('click', () => setHash('#dashboard'));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
