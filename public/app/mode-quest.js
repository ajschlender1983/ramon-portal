/* ============================================================
   OPUS Web App — The Quest mode
   - Dashboard: 4-module vertical map with progress rings
   - Module view: 4 session cards in sequence with sequential gating
   - Completion celebration when all 4 modules done
   ============================================================ */

(function () {
  const el = window.OPUS.el;
  const setHash = window.OPUS.setHash;

  /* ---------- Dashboard ---------- */

  function render(mount) {
    const U = window.OPUS.USER;
    if (!U || !Array.isArray(U.plan) || U.plan.length === 0) {
      mount.appendChild(el('div', { class: 'archive-empty', text: 'No plan loaded for this user yet.' }));
      return;
    }
    const completions = window.OPUS.getQuestCompletions();
    const wrap = el('div', { class: 'quest-wrap' });

    // Masthead
    const m = el('div', { class: 'quest-masthead' });
    m.appendChild(el('div', { class: 'quest-eyebrow', text: 'OPUS · SoundBed' }));
    m.appendChild(el('h1', { class: 'quest-name' }, [
      document.createTextNode((U.displayName || 'You') + ' '),
      el('em', { text: 'arrives' }),
      document.createTextNode('.')
    ]));
    if (U.period) m.appendChild(el('div', { class: 'quest-meta', text: 'A 30-day map · ' + U.period }));
    wrap.appendChild(m);

    // Today's invitation
    const invite = findInvitation(U, completions);
    if (invite) {
      const inviteCard = el('button', { class: 'quest-invite', type: 'button' });
      const art = el('div', { class: 'quest-invite-art' });
      if (invite.sess.art) {
        const img = document.createElement('img');
        img.src = '../' + invite.sess.art;
        img.alt = invite.sess.heading || '';
        img.addEventListener('error', () => {
          art.style.background = 'linear-gradient(135deg, rgba(123,111,168,0.35), rgba(86,76,112,0.18))';
          if (art.contains(img)) art.removeChild(img);
        });
        art.appendChild(img);
      }
      inviteCard.appendChild(art);
      const body = el('div', { class: 'quest-invite-body' }, [
        el('div', { class: 'quest-invite-eyebrow', text: "Today's invitation" }),
        el('div', { class: 'quest-invite-title', text: invite.sess.heading || invite.slug })
      ]);
      inviteCard.appendChild(body);
      inviteCard.appendChild(el('span', { class: 'quest-invite-arrow', text: '→' }));
      inviteCard.addEventListener('click', () => setHash('#s/' + invite.slug));
      wrap.appendChild(inviteCard);
    }

    // Map of modules
    const map = el('div', { class: 'quest-map' });
    U.plan.forEach((p, idx) => {
      const state = moduleState(U, completions, idx);
      const card = buildModuleCard(p, state, idx + 1);
      map.appendChild(card);
      if (idx < U.plan.length - 1) {
        map.appendChild(el('div', { class: 'module-spine' }));
      }
    });
    wrap.appendChild(map);

    mount.appendChild(wrap);

    maybeRouteToCelebration(completions);
  }

  function maybeRouteToCelebration(completions) {
    const seen = localStorage.getItem(window.OPUS.LS.questCelebration);
    if (seen === '1') return;
    const all = (completions[1].length >= 4) && (completions[2].length >= 4) &&
                (completions[3].length >= 4) && (completions[4].length >= 4);
    if (all) {
      localStorage.setItem(window.OPUS.LS.questCelebration, '1');
      setHash('#celebrate');
    }
  }

  /* states: 'open' | 'complete' | 'locked' | 'ghost' | 'silhouette' */
  function moduleState(U, completions, idx) {
    const total = (U.plan[idx].sessions || []).length;
    const done = (completions[idx + 1] || []).length;
    if (done >= total && total > 0) return 'complete';
    if (idx === 0) return 'open';
    const prevTotal = (U.plan[idx - 1].sessions || []).length;
    const prevDone = (completions[idx] || []).length;
    if (prevDone >= prevTotal) return 'open';
    if (idx === 1) return 'locked';
    if (idx === 2) return 'ghost';
    return 'silhouette';
  }

  function findInvitation(U, completions) {
    for (let i = 0; i < U.plan.length; i++) {
      const sessions = U.plan[i].sessions || [];
      const done = completions[i + 1] || [];
      const state = moduleState(U, completions, i);
      if (state === 'locked' || state === 'ghost' || state === 'silhouette') break;
      for (const slug of sessions) {
        if (!done.includes(slug)) {
          const sess = (U.sessions && U.sessions[slug]) || null;
          if (sess) return { slug, sess, weekN: i + 1 };
        }
      }
    }
    return null;
  }

  function buildModuleCard(plan, state, n) {
    const total = (plan.sessions || []).length;
    const completions = window.OPUS.getQuestCompletions();
    const done = (completions[n] || []).length;
    const accent = 'var(--quest-w' + n + ')';
    const card = el('div', {
      class: 'module-card',
      dataset: { state, week: String(n) },
      style: { '--mod-accent': accent }
    });
    card.appendChild(buildModuleHead(plan, state, n, done, total, accent));
    if (state === 'open' || state === 'complete') {
      card.appendChild(el('div', { class: 'module-intent', text: plan.intent || '' }));
    } else if (state === 'locked') {
      const lock = el('div', { class: 'module-lock' });
      lock.appendChild(el('span', { class: 'module-lock-glyph', text: '🔒' }));
      lock.appendChild(document.createTextNode('Finish Module ' + (n - 1) + ' to open.'));
      card.appendChild(lock);
    } else if (state === 'ghost') {
      card.appendChild(el('div', { class: 'module-lock', text: 'Will appear after Module ' + (n - 1) + '.' }));
    }
    card.addEventListener('click', () => {
      if (state === 'open' || state === 'complete') {
        setHash('#m/' + n);
      }
    });
    return card;
  }

  function buildModuleHead(plan, state, n, done, total, accent) {
    const head = el('div', { class: 'module-card-head' });
    head.appendChild(buildProgressRing(done, total, accent));
    const meta = el('div', { class: 'module-card-meta' });
    meta.appendChild(el('div', { class: 'module-eyebrow', text: 'Module ' + n }));
    meta.appendChild(el('div', { class: 'module-title', text: plan.title || '' }));
    if (state === 'open' && done > 0) {
      meta.appendChild(el('div', {
        style: { fontSize: '11px', color: 'var(--mid)', marginTop: '8px', letterSpacing: '0.10em' },
        text: done + ' of ' + total + ' done'
      }));
    }
    if (state === 'complete') {
      meta.appendChild(el('div', {
        style: { fontSize: '11px', color: 'var(--gold)', marginTop: '8px', letterSpacing: '0.10em' },
        text: 'COMPLETE'
      }));
    }
    head.appendChild(meta);
    return head;
  }

  function buildProgressRing(done, total, accent) {
    const r = 24; const c = 2 * Math.PI * r;
    const pct = total > 0 ? Math.min(1, done / total) : 0;
    const offset = c * (1 - pct);
    const wrap = el('div', { class: 'module-progress-ring' });
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 56 56');
    const bg = document.createElementNS(svgNS, 'circle');
    bg.setAttribute('class', 'ring-bg');
    bg.setAttribute('cx', '28'); bg.setAttribute('cy', '28'); bg.setAttribute('r', String(r));
    svg.appendChild(bg);
    const fg = document.createElementNS(svgNS, 'circle');
    fg.setAttribute('class', 'ring-fg');
    fg.setAttribute('cx', '28'); fg.setAttribute('cy', '28'); fg.setAttribute('r', String(r));
    fg.setAttribute('stroke-dasharray', String(c));
    fg.setAttribute('stroke-dashoffset', String(offset));
    svg.appendChild(fg);
    wrap.appendChild(svg);
    wrap.appendChild(el('div', { class: 'ring-label', text: done + '/' + total }));
    return wrap;
  }

  /* ---------- Module view ---------- */

  function renderModule(mount, n) {
    const U = window.OPUS.USER;
    const idx = (n || 1) - 1;
    if (!U || !Array.isArray(U.plan) || !U.plan[idx]) {
      mount.appendChild(el('div', { class: 'gate' }, [
        el('h2', { class: 'gate-title', text: 'Module not found.' })
      ]));
      return;
    }
    const completions = window.OPUS.getQuestCompletions();
    const state = moduleState(U, completions, idx);
    if (state === 'locked' || state === 'ghost' || state === 'silhouette') {
      mount.appendChild(el('div', { class: 'gate' }, [
        el('h2', { class: 'gate-title', text: 'This module is not open yet.' }),
        el('p', { class: 'gate-body', text: 'Finish the previous module first.' })
      ]));
      return;
    }
    const plan = U.plan[idx];
    const accent = 'var(--quest-w' + n + ')';
    const wrap = el('div', null);
    wrap.style.setProperty('--mod-accent', accent);

    const head = el('header', { class: 'module-view-head' });
    head.appendChild(el('button', { class: 'back', type: 'button', text: '← back to map', onclick: () => setHash('#dashboard') }));
    head.appendChild(el('div', { class: 'module-view-eyebrow', text: 'Module ' + n }));
    head.appendChild(el('h2', { class: 'module-view-title', text: plan.title || '' }));
    if (plan.intent) head.appendChild(el('div', { class: 'module-view-intent', text: plan.intent }));
    wrap.appendChild(head);

    const list = el('div', { class: 'module-session-list' });
    const sessions = plan.sessions || [];
    let unlockUpTo = 0;
    for (let i = 0; i < sessions.length; i++) {
      if (window.OPUS.isSessionComplete(sessions[i])) {
        unlockUpTo = i + 1;
      } else {
        break;
      }
    }
    sessions.forEach((slug, i) => {
      const sess = (U.sessions && U.sessions[slug]) || {};
      const locked = (i > unlockUpTo);
      const complete = window.OPUS.isSessionComplete(slug);
      const prevHeading = sessions[i - 1] ? (U.sessions[sessions[i - 1]] || {}).heading : null;
      list.appendChild(buildSessionTile(slug, sess, locked, complete, prevHeading));
    });
    wrap.appendChild(list);

    mount.appendChild(wrap);
  }

  function buildSessionTile(slug, sess, locked, complete, prevHeading) {
    const tile = el('div', {
      class: 'session-tile',
      dataset: locked ? { locked: '1' } : (complete ? { complete: '1' } : null)
    });
    const art = el('div', { class: 'session-art' });
    if (sess.art) {
      const img = document.createElement('img');
      img.src = '../' + sess.art;
      img.alt = sess.heading || '';
      img.addEventListener('error', () => {
        if (art.contains(img)) art.removeChild(img);
        art.appendChild(el('div', { class: 'session-art-fallback', text: sess.heading || '' }));
      });
      art.appendChild(img);
    } else {
      art.appendChild(el('div', { class: 'session-art-fallback', text: sess.heading || '' }));
    }
    tile.appendChild(art);

    const body = el('div', { class: 'session-tile-body' });
    body.appendChild(el('div', { class: 'session-tile-eyebrow', text: sess.category || '' }));
    body.appendChild(el('div', { class: 'session-tile-title', text: sess.heading || slug }));
    if (sess.subtitle) body.appendChild(el('div', { class: 'session-tile-sub', text: sess.subtitle }));
    const meta = el('div', { class: 'session-tile-meta' });
    if (locked) {
      meta.appendChild(el('span', { text: prevHeading ? ('Complete "' + prevHeading + '" to open') : 'Locked' }));
    } else if (complete) {
      meta.appendChild(el('span', { class: 'session-tile-complete-chip', text: '✓ COMPLETE' }));
    } else if (sess.artist) {
      meta.appendChild(el('span', { text: sess.artist }));
    }
    body.appendChild(meta);
    tile.appendChild(body);

    if (!locked) {
      tile.addEventListener('click', () => setHash('#s/' + slug));
    }
    return tile;
  }

  /* ---------- Celebration ---------- */

  function renderCelebrate(mount) {
    const U = window.OPUS.USER;
    const wrap = el('div', { class: 'celebrate-wrap' });
    wrap.appendChild(el('div', { class: 'celebrate-eyebrow', text: '30 days · complete' }));
    wrap.appendChild(el('h1', { class: 'celebrate-title' }, [
      document.createTextNode('You walked it, '),
      el('em', { text: U.displayName || 'friend' }),
      document.createTextNode('.')
    ]));
    wrap.appendChild(el('p', { class: 'celebrate-body', text: 'Sixteen sessions, four modules, your own pace. Whatever shifted is yours. Whatever stayed is yours too.' }));
    wrap.appendChild(el('button', { class: 'btn-primary', type: 'button', text: 'Back to the map →', onclick: () => setHash('#dashboard') }));

    if (Array.isArray(U.heldInReserve) && U.heldInReserve.length) {
      const bonus = el('div', { class: 'celebrate-bonus' });
      bonus.appendChild(el('div', { class: 'celebrate-bonus-title', text: 'Bonus collection unlocked' }));
      const list = el('div', { class: 'module-session-list', style: { maxWidth: '520px', margin: '0 auto' } });
      U.heldInReserve.forEach(r => {
        const tile = el('div', { class: 'session-tile' });
        const art = el('div', { class: 'session-art' });
        if (r.art) {
          const img = document.createElement('img');
          img.src = '../' + r.art;
          img.addEventListener('error', () => { if (art.contains(img)) art.removeChild(img); art.appendChild(el('div', { class: 'session-art-fallback', text: r.heading || '' })); });
          art.appendChild(img);
        } else {
          art.appendChild(el('div', { class: 'session-art-fallback', text: r.heading || '' }));
        }
        tile.appendChild(art);
        const body = el('div', { class: 'session-tile-body' });
        body.appendChild(el('div', { class: 'session-tile-eyebrow', text: r.category || '' }));
        body.appendChild(el('div', { class: 'session-tile-title', text: r.heading || r.slug }));
        if (r.subtitle) body.appendChild(el('div', { class: 'session-tile-sub', text: r.subtitle }));
        tile.appendChild(body);
        list.appendChild(tile);
      });
      bonus.appendChild(list);
      wrap.appendChild(bonus);
    }

    mount.appendChild(wrap);
  }

  window.OPUS_MODE_QUEST = { render, renderModule, renderCelebrate };
})();
