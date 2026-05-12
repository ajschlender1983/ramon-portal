/* ============================================================
   OPUS Web App — Intake (choose-your-own-adventure)
   4 paths, all converging on the same USER_DATA shape via /expand.
   - Survey:    3 fields (intention, energy, state word)
   - Biometric: 3 paste fields (HRV, RHR, sleep)
   - Reading:   paste a free-form biofield reading
   - Empty:     skip, accept defaults
   ============================================================ */

(function () {
  const el = window.OPUS.el;
  const reducedMotion = window.OPUS.reducedMotion;

  const INTENTIONS = [
    { id: 'ground',    label: 'Ground' },
    { id: 'release',   label: 'Release' },
    { id: 'express',   label: 'Express' },
    { id: 'connect',   label: 'Connect' },
    { id: 'create',    label: 'Create' },
    { id: 'integrate', label: 'Integrate' }
  ];

  function render(mount, opts) {
    opts = opts || {};
    const onComplete = opts.onComplete || (() => {});
    const wrap = el('div', { class: 'intake-wrap' });

    wrap.appendChild(el('div', { class: 'intake-eyebrow', text: 'Welcome' }));
    wrap.appendChild(el('h1', { class: 'intake-title', text: 'How shall we ' }, [
      el('em', { text: 'begin' }),
      document.createTextNode('?')
    ]));
    wrap.appendChild(el('p', {
      class: 'intake-sub',
      text: 'Four ways in. Pick the one that fits this moment. Each takes a minute or less.'
    }));

    const tiles = el('div', { class: 'intake-tiles' });

    tiles.appendChild(makeTile({
      glyph: '○',
      label: 'Quick check-in',
      meta: 'Recommended',
      metaIsRec: true,
      timing: '~35 s',
      onClick: () => renderSurveyStep(wrap, onComplete)
    }));

    tiles.appendChild(makeTile({
      glyph: '⬡',
      label: 'Use my biometrics',
      timing: '~30 s',
      onClick: () => renderBiometricStep(wrap, onComplete)
    }));

    tiles.appendChild(makeTile({
      glyph: '✦',
      label: 'Paste a reading',
      timing: '~2 min',
      onClick: () => renderReadingStep(wrap, onComplete)
    }));

    tiles.appendChild(makeTile({
      glyph: '•',
      label: 'Just begin',
      timing: 'no questions',
      onClick: () => renderEmptyStep(wrap, onComplete)
    }));

    wrap.appendChild(tiles);
    mount.appendChild(wrap);
  }

  function makeTile({ glyph, label, meta, metaIsRec, timing, onClick }) {
    const t = el('button', {
      class: 'intake-tile',
      type: 'button',
      dataset: metaIsRec ? { recommended: '1' } : null,
      onclick: onClick
    });
    t.appendChild(el('span', { class: 'intake-tile-glyph', text: glyph }));
    const body = el('div', { class: 'intake-tile-body' }, [
      el('div', { class: 'intake-tile-label', text: label }),
      el('div', { class: 'intake-tile-meta' }, [
        metaIsRec ? el('span', { class: 'rec', text: meta }) : null,
        metaIsRec ? document.createTextNode(' · ') : null,
        document.createTextNode(timing || '')
      ])
    ]);
    t.appendChild(body);
    t.appendChild(el('span', { class: 'intake-tile-arrow', text: '→' }));
    return t;
  }

  /* ---------- Survey path ---------- */

  function renderSurveyStep(wrap, onComplete) {
    window.OPUS.clearChildren(wrap);
    wrap.appendChild(el('div', { class: 'intake-eyebrow', text: 'Quick check-in' }));
    wrap.appendChild(el('h1', { class: 'intake-title', text: 'Three small things.' }));

    const state = { intention: null, energy: 5, word: '' };

    // Q1 intention
    const q1 = el('div', { class: 'intake-step' });
    q1.appendChild(el('h3', { text: "What's the felt intention today?" }));
    q1.appendChild(el('p', { class: 'step-help', text: 'Pick one. There are no wrong answers.' }));
    const pipRow = el('div', { class: 'intake-pip-row' });
    INTENTIONS.forEach(i => {
      const p = el('button', { class: 'intake-pip', type: 'button', text: i.label });
      p.addEventListener('click', () => {
        state.intention = i.id;
        pipRow.querySelectorAll('.intake-pip').forEach(x => x.removeAttribute('data-selected'));
        p.dataset.selected = '1';
        updateBtn();
      });
      pipRow.appendChild(p);
    });
    q1.appendChild(pipRow);
    wrap.appendChild(q1);

    // Q2 energy
    const q2 = el('div', { class: 'intake-step' });
    q2.appendChild(el('h3', { text: 'Energy right now, 1 to 10?' }));
    const slider = el('div', { class: 'intake-slider' });
    const r = el('input', { type: 'range', min: '1', max: '10', step: '1', value: '5' });
    const v = el('span', { class: 'val', text: '5' });
    r.addEventListener('input', () => {
      state.energy = parseInt(r.value, 10);
      v.textContent = String(state.energy);
    });
    slider.appendChild(r); slider.appendChild(v);
    q2.appendChild(slider);
    wrap.appendChild(q2);

    // Q3 word
    const q3 = el('div', { class: 'intake-step' });
    q3.appendChild(el('h3', { text: 'One word for your state.' }));
    const input = el('input', { class: 'intake-text', type: 'text', placeholder: 'scattered · settled · open · tight · …' });
    input.addEventListener('input', () => { state.word = input.value; updateBtn(); });
    q3.appendChild(input);
    wrap.appendChild(q3);

    // Actions
    const actions = el('div', { class: 'intake-actions' });
    const back = el('button', { class: 'btn-secondary', type: 'button', text: 'Back' });
    back.addEventListener('click', () => {
      window.OPUS.clearChildren(wrap);
      render(wrap.parentNode, { onComplete });
    });
    actions.appendChild(back);
    const next = el('button', { class: 'btn-primary', type: 'button', text: 'Send →', disabled: true });
    actions.appendChild(next);
    const status = el('span', { class: 'intake-status' });
    actions.appendChild(status);

    function updateBtn() {
      next.disabled = !(state.intention && state.word.trim().length > 0);
    }

    next.addEventListener('click', async () => {
      next.disabled = true;
      status.textContent = 'Synthesizing your starting point…';
      try {
        const userData = await window.OPUS.callExpand({
          mode: 'survey',
          userName: (window.OPUS.USER && window.OPUS.USER.displayName) || '',
          slug: window.OPUS.slug,
          fields: {
            intention: state.intention,
            energy: state.energy,
            state: state.word.trim()
          }
        });
        onComplete({ choice: 'survey', userData });
      } catch (err) {
        status.textContent = 'Could not expand — ' + (err.message || err);
        next.disabled = false;
      }
    });

    wrap.appendChild(actions);
  }

  /* ---------- Biometric path ---------- */

  function renderBiometricStep(wrap, onComplete) {
    window.OPUS.clearChildren(wrap);
    wrap.appendChild(el('div', { class: 'intake-eyebrow', text: 'Biometrics' }));
    wrap.appendChild(el('h1', { class: 'intake-title', text: 'Tell us what your body is showing.' }));
    wrap.appendChild(el('p', { class: 'intake-sub', text: 'From Oura, Whoop, Apple Health — or your morning vitals. All optional.' }));

    const state = { hrv: null, rhr: null, sleep: null };

    function field(labelText, key, ph) {
      const w = el('div', { class: 'intake-step' });
      w.appendChild(el('h3', { text: labelText }));
      const input = el('input', { class: 'intake-text', type: 'number', placeholder: ph });
      input.addEventListener('input', () => {
        const n = parseFloat(input.value);
        state[key] = isFinite(n) ? n : null;
      });
      w.appendChild(input);
      return w;
    }

    wrap.appendChild(field('HRV (ms) — optional', 'hrv', 'e.g. 42'));
    wrap.appendChild(field('Resting heart rate (bpm) — optional', 'rhr', 'e.g. 58'));
    wrap.appendChild(field('Sleep score (0–100) — optional', 'sleep', 'e.g. 84'));

    const actions = el('div', { class: 'intake-actions' });
    const back = el('button', { class: 'btn-secondary', type: 'button', text: 'Back' });
    back.addEventListener('click', () => {
      window.OPUS.clearChildren(wrap);
      render(wrap.parentNode, { onComplete });
    });
    actions.appendChild(back);
    const next = el('button', { class: 'btn-primary', type: 'button', text: 'Send →' });
    const status = el('span', { class: 'intake-status' });
    actions.appendChild(next);
    actions.appendChild(status);

    next.addEventListener('click', async () => {
      next.disabled = true;
      status.textContent = 'Synthesizing your starting point…';
      try {
        const userData = await window.OPUS.callExpand({
          mode: 'biometric',
          userName: (window.OPUS.USER && window.OPUS.USER.displayName) || '',
          slug: window.OPUS.slug,
          fields: {
            hrv: state.hrv,
            restingHR: state.rhr,
            sleepScore: state.sleep
          }
        });
        onComplete({ choice: 'biometric', userData });
      } catch (err) {
        status.textContent = 'Could not expand — ' + (err.message || err);
        next.disabled = false;
      }
    });

    wrap.appendChild(actions);
  }

  /* ---------- Reading paste path ---------- */

  function renderReadingStep(wrap, onComplete) {
    window.OPUS.clearChildren(wrap);
    wrap.appendChild(el('div', { class: 'intake-eyebrow', text: 'Paste a reading' }));
    wrap.appendChild(el('h1', { class: 'intake-title', text: 'Bring what you already have.' }));
    wrap.appendChild(el('p', { class: 'intake-sub', text: 'A biofield reading, a journaled scan, or a practitioner note. Paste it whole.' }));

    const ta = el('textarea', { class: 'intake-text intake-textarea', placeholder: 'Paste the reading…' });
    wrap.appendChild(ta);

    const actions = el('div', { class: 'intake-actions' });
    const back = el('button', { class: 'btn-secondary', type: 'button', text: 'Back' });
    back.addEventListener('click', () => {
      window.OPUS.clearChildren(wrap);
      render(wrap.parentNode, { onComplete });
    });
    actions.appendChild(back);
    const next = el('button', { class: 'btn-primary', type: 'button', text: 'Send →', disabled: true });
    const status = el('span', { class: 'intake-status' });
    actions.appendChild(next);
    actions.appendChild(status);

    ta.addEventListener('input', () => {
      next.disabled = ta.value.trim().length < 40;
    });

    next.addEventListener('click', async () => {
      next.disabled = true;
      status.textContent = 'Parsing your reading…';
      try {
        const userData = await window.OPUS.callExpand({
          mode: 'reading',
          userName: (window.OPUS.USER && window.OPUS.USER.displayName) || '',
          slug: window.OPUS.slug,
          fields: { rawReading: ta.value.trim() }
        });
        onComplete({ choice: 'reading', userData });
      } catch (err) {
        status.textContent = 'Could not parse — ' + (err.message || err);
        next.disabled = false;
      }
    });

    wrap.appendChild(actions);
  }

  /* ---------- Empty-slate path ---------- */

  function renderEmptyStep(wrap, onComplete) {
    window.OPUS.clearChildren(wrap);
    wrap.appendChild(el('div', { class: 'intake-eyebrow', text: 'Just begin' }));
    wrap.appendChild(el('h1', { class: 'intake-title', text: 'Step in. The Quest will meet you.' }));
    wrap.appendChild(el('p', { class: 'intake-sub', text: "We'll start with a gentle, neutral field. Anything you do from here personalizes the rest." }));

    const actions = el('div', { class: 'intake-actions' });
    const back = el('button', { class: 'btn-secondary', type: 'button', text: 'Back' });
    back.addEventListener('click', () => {
      window.OPUS.clearChildren(wrap);
      render(wrap.parentNode, { onComplete });
    });
    actions.appendChild(back);
    const go = el('button', { class: 'btn-primary', type: 'button', text: 'Begin →' });
    const status = el('span', { class: 'intake-status' });
    actions.appendChild(go);
    actions.appendChild(status);

    go.addEventListener('click', async () => {
      go.disabled = true;
      status.textContent = 'Preparing a neutral starting field…';
      try {
        const userData = await window.OPUS.callExpand({
          mode: 'empty',
          userName: (window.OPUS.USER && window.OPUS.USER.displayName) || '',
          slug: window.OPUS.slug,
          fields: {}
        });
        onComplete({ choice: 'empty', userData });
      } catch (err) {
        status.textContent = 'Could not start — ' + (err.message || err);
        go.disabled = false;
      }
    });

    wrap.appendChild(actions);
  }

  window.OPUS_INTAKE = { render };
})();
