/* ============================================================
   OPUS Web App — Field Digest
   Lightweight biofield view. Chip-style stats + chakra list +
   collapsible full reading. Replaces the legacy full-page body-aurora.
   ============================================================ */

(function () {
  const el = window.OPUS.el;

  function render(mount) {
    const U = window.OPUS.USER;

    // Stat tiles
    const stats = el('div', { class: 'field-stats' });

    stats.appendChild(buildStat(
      U.auricMeters != null ? Number(U.auricMeters).toFixed(1) : '—',
      U.auricMeters != null ? 'm' : '',
      'Field extent',
      'auric reach'
    ));

    stats.appendChild(buildStat(
      U.hawkinsLevel != null ? String(U.hawkinsLevel) : '—',
      U.hawkinsTarget ? ('→ ' + U.hawkinsTarget) : '',
      'Hawkins',
      hawkinsLabel(U.hawkinsLevel)
    ));

    const dna = U.dna || {};
    stats.appendChild(buildStat(
      dna.phaseLocked != null ? (dna.phaseLocked + '/' + (dna.of || 12)) : '—',
      '',
      'DNA strands',
      'phase-locked'
    ));

    mount.appendChild(stats);

    // Block quote
    if (U.primaryBlockQuote) {
      mount.appendChild(el('div', {
        class: 'reflection-block',
        style: { borderLeftColor: 'var(--magenta)' }
      }, [
        el('div', { class: 'reflection-eyebrow', text: 'Pattern' }),
        el('div', { class: 'reflection-text', style: { fontStyle: 'italic' }, text: '"' + U.primaryBlockQuote + '"' })
      ]));
    }

    // Archetype
    if (U.archetype) {
      mount.appendChild(el('div', {
        class: 'reflection-block',
        style: { borderLeftColor: 'var(--gold)' }
      }, [
        el('div', { class: 'reflection-eyebrow', text: 'Archetype' }),
        el('div', { class: 'reflection-text', text: U.archetype })
      ]));
    }

    // Chakra list
    if (Array.isArray(U.chakraStates) && U.chakraStates.length) {
      mount.appendChild(el('h3', {
        style: { fontFamily: 'var(--serif)', fontWeight: '300', fontSize: '22px', color: 'var(--light)', marginTop: '14px' },
        text: 'Chakra scan'
      }));
      const list = el('div', { class: 'field-chakra-list' });
      U.chakraStates.forEach(c => {
        const row = el('div', { class: 'field-chakra-row' });
        row.appendChild(el('span', { class: 'field-chakra-dot', dataset: { chakra: c.id } }));
        row.appendChild(el('span', { class: 'field-chakra-name', text: c.label }));
        row.appendChild(el('span', { class: 'field-chakra-state', text: (c.state || '').replace(/-/g, ' ') }));
        row.appendChild(el('span', { class: 'field-chakra-note', text: c.note || '' }));
        list.appendChild(row);
      });
      mount.appendChild(list);
    }

    // Full reading collapsible
    if (U.reading) {
      const toggle = el('button', { class: 'field-reading-toggle', type: 'button' }, [
        el('span', { text: 'Read the full reading' }),
        el('span', { text: '↓' })
      ]);
      const body = el('div', { class: 'field-reading-body', text: U.reading });
      toggle.addEventListener('click', () => {
        const open = body.dataset.open === '1';
        body.dataset.open = open ? '0' : '1';
      });
      mount.appendChild(toggle);
      mount.appendChild(body);
    }
  }

  function buildStat(num, sub, label, ctx) {
    return el('div', { class: 'field-stat' }, [
      el('div', null, [
        el('span', { class: 'field-stat-num', text: num }),
        sub ? el('span', { class: 'field-stat-num-sub', text: sub }) : null
      ]),
      el('div', { class: 'field-stat-label', text: label }),
      ctx ? el('div', { class: 'field-stat-context', text: ctx }) : null
    ]);
  }

  function hawkinsLabel(level) {
    if (level == null) return '';
    if (level >= 700) return 'enlightenment';
    if (level >= 600) return 'peace';
    if (level >= 540) return 'joy';
    if (level >= 500) return 'love';
    if (level >= 400) return 'reason';
    if (level >= 350) return 'acceptance';
    if (level >= 310) return 'willingness';
    if (level >= 250) return 'neutrality';
    if (level >= 200) return 'courage';
    return '';
  }

  window.OPUS_FIELD = { render };
})();
