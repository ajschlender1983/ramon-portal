/* ============================================================
   OPUS Web App — Session View
   Renders one session with Before / Play / After / Reflection.
   Writes to LS.sessionFields, LS.wow, LS.reflections shared with the legacy portal.
   ============================================================ */

(function () {
  const el = window.OPUS.el;
  const WOW_LABELS = window.OPUS.WOW_LABELS;

  function render(mount, slug) {
    const U = window.OPUS.USER;
    const sess = (U.sessions && U.sessions[slug]);
    const prompts = (U.prompts && U.prompts[slug]) || {};
    if (!sess) {
      mount.appendChild(el('div', { class: 'gate' }, [
        el('h2', { class: 'gate-title', text: 'Session not found.' }),
        el('p', { class: 'gate-body', text: "Try going back to today's list." })
      ]));
      return;
    }

    const wrap = el('div', { class: 'session-view' });

    // Head — close button + heading
    const head = el('div', { class: 'session-view-head' });
    head.appendChild(el('button', { class: 'close', type: 'button', text: '×', 'aria-label': 'Close',
      onclick: () => window.history.back() }));
    head.appendChild(el('span', { class: 'session-tile-eyebrow', text: sess.category || '' }));
    wrap.appendChild(head);

    // Art (with fallback)
    const art = el('div', { class: 'session-view-art' });
    if (sess.art) {
      const img = document.createElement('img');
      img.src = '../' + sess.art;
      img.alt = sess.heading || '';
      img.addEventListener('error', () => {
        art.removeChild(img);
        art.appendChild(buildArtFallback(sess));
      });
      art.appendChild(img);
    } else {
      art.appendChild(buildArtFallback(sess));
    }
    wrap.appendChild(art);

    // Title + sub + meta
    wrap.appendChild(el('h1', { class: 'session-view-title', text: sess.heading || '' }));
    if (sess.subtitle) wrap.appendChild(el('p', { class: 'session-view-sub', text: sess.subtitle }));
    const meta = el('div', { class: 'session-view-meta' });
    if (sess.artist) meta.appendChild(el('span', { text: sess.artist }));
    if (sess.collection) meta.appendChild(el('span', { text: sess.collection }));
    wrap.appendChild(meta);

    // Intention line
    if (sess.intention) {
      wrap.appendChild(el('div', { class: 'phase-panel' }, [
        el('div', { class: 'phase-prompt', text: '"' + sess.intention + '"' })
      ]));
    }

    // Why for you
    if (sess.why) {
      wrap.appendChild(el('div', { class: 'phase-panel' }, [
        el('div', { class: 'reflection-eyebrow', text: 'Why this for you' }),
        el('div', { style: { fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--mid)', lineHeight: '1.7' }, text: sess.why })
      ]));
    }

    // Before / After block
    const sf = window.OPUS.getSessionFields()[slug] || {};
    const beforePanel = buildPhasePanel({
      label: 'Before',
      prompt: prompts.before || 'What do you arrive with?',
      initial: sf.before || '',
      onSave: (val) => saveBefore(slug, val)
    });
    wrap.appendChild(beforePanel);

    // Optional Spotify link as "Play"
    if (sess.spotify) {
      wrap.appendChild(el('a', {
        class: 'btn-primary',
        href: sess.spotify,
        target: '_blank',
        rel: 'noopener',
        text: 'Play on Spotify ↗',
        style: { display: 'inline-block', marginTop: '18px', textDecoration: 'none' }
      }));
    }

    // After block
    const afterPanel = buildPhasePanel({
      label: 'After',
      prompt: prompts.after || 'What stayed with you?',
      initial: sf.after || '',
      onSave: (val) => saveAfter(slug, val)
    });
    wrap.appendChild(afterPanel);

    // WOW selector
    const wowWrap = buildWowSelector(slug);
    wrap.appendChild(wowWrap);

    // Resolve / reflection block
    const reflWrap = buildReflectionBlock(slug, U);
    wrap.appendChild(reflWrap);

    mount.appendChild(wrap);
  }

  function buildArtFallback(sess) {
    return el('div', { class: 'session-view-art-fallback', text: sess.heading || 'OPUS' });
  }

  function buildPhasePanel({ label, prompt, initial, onSave }) {
    const panel = el('div', { class: 'phase-panel' });
    panel.appendChild(el('div', { class: 'reflection-eyebrow', text: label }));
    panel.appendChild(el('div', { class: 'phase-prompt', text: prompt }));
    const ta = el('textarea', { class: 'phase-textarea', placeholder: 'Write here…' });
    ta.value = initial || '';
    // autosave on blur and on debounced input
    let t = null;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => onSave(ta.value), 800);
    });
    ta.addEventListener('blur', () => onSave(ta.value));
    panel.appendChild(ta);
    return panel;
  }

  function buildWowSelector(slug) {
    const wrap = el('div', { class: 'wow-selector' });
    wrap.appendChild(el('div', { class: 'wow-eyebrow', text: 'How did that land?' }));
    const pips = el('div', { class: 'wow-pips' });
    const stored = window.OPUS.getWow()[slug] || null;
    const descriptor = el('div', { class: 'wow-descriptor' });

    [1, 2, 3, 4, 5, 6].forEach(n => {
      const pip = el('button', {
        class: 'wow-pip',
        type: 'button',
        dataset: { wow: String(n) },
        text: n === 6 ? '✨ WOW' : String(n)
      });
      if (stored === n) {
        pip.dataset.selected = '1';
        descriptor.textContent = WOW_LABELS[n].long;
      }
      pip.addEventListener('click', () => {
        const w = window.OPUS.getWow();
        w[slug] = n;
        window.OPUS.setWow(w);
        pips.querySelectorAll('.wow-pip').forEach(p => p.removeAttribute('data-selected'));
        pip.dataset.selected = '1';
        descriptor.textContent = WOW_LABELS[n].long;
        // recompute completions in case this triggers unlock
        window.OPUS.recomputeQuestCompletions();
      });
      pips.appendChild(pip);
    });

    wrap.appendChild(pips);
    wrap.appendChild(descriptor);
    return wrap;
  }

  function buildReflectionBlock(slug, U) {
    const wrap = el('div', { class: 'reflection-block' });
    wrap.appendChild(el('div', { class: 'reflection-eyebrow', text: 'Reflection' }));

    const refls = window.OPUS.getReflections();
    const existing = refls[slug];
    const textNode = el('div', { class: 'reflection-text' });
    const status = el('div', { class: 'reflection-status' });
    const actions = el('div', { class: 'phase-actions' });

    if (existing && existing.text) {
      textNode.textContent = existing.text;
    } else {
      textNode.textContent = '';
      status.textContent = 'Write your Before + After, pick a felt rating, then ask for the reflection.';
    }

    const ask = el('button', { class: 'btn-primary', type: 'button', text: 'See the reflection' });
    ask.addEventListener('click', async () => {
      const sf = window.OPUS.getSessionFields()[slug] || {};
      const wow = window.OPUS.getWow()[slug];
      if (!sf.before || !sf.after || sf.before.trim().length < 4 || sf.after.trim().length < 4) {
        status.textContent = 'Add a line in Before and After first.';
        return;
      }
      if (!wow) {
        status.textContent = 'Pick a felt rating first.';
        return;
      }
      ask.disabled = true;
      status.textContent = 'Reflecting…';
      try {
        const payload = window.OPUS.buildReflectPayload(slug);
        const text = await window.OPUS.callReflect(payload);
        const refls = window.OPUS.getReflections();
        refls[slug] = { text, ts: Date.now() };
        window.OPUS.setReflections(refls);
        textNode.textContent = text;
        status.textContent = '';
      } catch (err) {
        status.textContent = 'Could not reflect — ' + (err.message || err);
      } finally {
        ask.disabled = false;
      }
    });
    actions.appendChild(ask);

    wrap.appendChild(textNode);
    wrap.appendChild(status);
    wrap.appendChild(actions);
    return wrap;
  }

  function saveBefore(slug, value) {
    const m = window.OPUS.getSessionFields();
    m[slug] = m[slug] || {};
    m[slug].before = value;
    m[slug].ts = Date.now();
    window.OPUS.setSessionFields(m);
    window.OPUS.recomputeQuestCompletions();
  }

  function saveAfter(slug, value) {
    const m = window.OPUS.getSessionFields();
    m[slug] = m[slug] || {};
    m[slug].after = value;
    m[slug].ts = Date.now();
    window.OPUS.setSessionFields(m);
    window.OPUS.recomputeQuestCompletions();
  }

  window.OPUS_SESSION_CARD = { render };
})();
