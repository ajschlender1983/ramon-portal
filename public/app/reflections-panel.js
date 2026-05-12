/* ============================================================
   OPUS Web App — Reflections archive
   Chronological list of every session the user has reflected on.
   ============================================================ */

(function () {
  const el = window.OPUS.el;

  function render(mount) {
    const U = window.OPUS.USER;
    const refls = window.OPUS.getReflections();
    const sf = window.OPUS.getSessionFields();
    const wow = window.OPUS.getWow();

    const slugs = Object.keys(refls).filter(s => refls[s] && refls[s].text);
    slugs.sort((a, b) => (refls[b].ts || 0) - (refls[a].ts || 0));

    if (slugs.length === 0) {
      mount.appendChild(el('div', { class: 'archive-empty', text: 'Nothing reflected yet. Finish a session and ask for the reflection — it lands here.' }));
      return;
    }

    slugs.forEach(slug => {
      const sess = (U.sessions && U.sessions[slug]) || {};
      const entry = refls[slug] || {};
      const card = el('div', { class: 'archive-card' });
      const head = el('div', { class: 'archive-card-head' });
      head.appendChild(el('span', { class: 'archive-card-title', text: sess.heading || slug }));
      const meta = el('span', { class: 'archive-card-meta' });
      if (wow[slug]) {
        const w = wow[slug];
        meta.appendChild(el('span', { class: 'archive-card-wow', text: w === 6 ? '✨ WOW' : (w + '/6') }));
        meta.appendChild(document.createTextNode(' · '));
      }
      meta.appendChild(document.createTextNode(formatDate(entry.ts)));
      head.appendChild(meta);
      card.appendChild(head);

      card.appendChild(el('div', { class: 'archive-card-text', text: entry.text }));
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.OPUS.setHash('#s/' + slug);
      });
      mount.appendChild(card);
    });
  }

  function formatDate(ts) {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  }

  window.OPUS_REFLECTIONS = { render };
})();
