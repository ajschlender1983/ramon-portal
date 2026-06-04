/* User data file for Sierra.
   Loaded by index.html when the URL contains ?u=sierra-m2k7w
   (or via the pretty path /sierra after v1.11.2).

   v1.11.3: profileType 'biofield' (default). Reading is the Monadic
   Spiral "Biofield Scan: Sierra" — uses different framing language
   than Ramon's and Amber's practitioner readings (5th-strand phase,
   recent phase disturbance, Acceptance-to-Transformation tier) but
   parses cleanly into the same dashboard fields.

   Curation principle: Sierra's PRIMARY BLOCK is spiritual bypassing —
   transcendence without embodiment. The arc must NOT feed her
   already-over-active upper centers. Devotional sessions live in the
   body (W3-W4) — Medicine Chant, Holy Mother's Waters, Calling the
   Rain, Prayer to the Stars, Mystic Rising. These five are
   Sierra-unique across all five current users. The rest of the
   curation supports the work the body is ALREADY doing — kidneys
   filtering ancestral patterns, lungs in release, heart expanding
   after grief, intestines holding tension.

   Drawn from the full 132-session OPUS catalogue at
   ~/Desktop/Opus/SoundBed/session-library/_inventory.json, not the
   128-session opus-voice subset. Vibration zone profiles checked
   against each reading note (over-active upper field → no
   HEAD-heavy sessions; sacral harmonizing → polarity not needed,
   already integrating; root recently grounding → support not push). */

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'sierra-m2k7w',
  displayName: 'Sierra',
  period: 'June 2026',
  portrait: 'assets/portraits/sierra-jensen.webp',  // user will supply; placeholder fallback handles missing

  /* Structured fields parsed from `reading`. */
  auricMeters: 10.5,                       // midpoint of 9-12 m range
  hawkinsLevel: 392,                       // midpoint of 366-419 (Acceptance approaching Reason)
  hawkinsTarget: 500,                      // Love — the next major tier up
  dna: { phaseLocked: 5, consolidating: 2, of: 12 },  // 5th-strand phase (Soul Awakening), 2 actively integrating
  primaryBlockQuote: 'Spiritual bypassing — transcendence without embodiment.',
  archetype: 'A devotional being, deeply connected to service and healing. Key gifts: intuitive insight, empathic resonance, harmonic alignment. Greatest challenge: grounding multidimensional awareness into daily life.',

  reading: `🜂 ORIC FIELD DIAMETER
Your auric field extends approximately 9-12 meters in all directions, with slight compression in the upper left quadrant, indicating past emotional overload and current recalibration.

🜁 DNA STRAND ACTIVATION
You are in the 5th-strand phase (Soul Awakening), indicating access to higher-dimensional awareness and integration of past life memories.

🜃 CHAKRA SCAN
Crown (Sahasrara): Open, receiving high-frequency downloads; slight overactivity leading to fatigue.
Third Eye (Ajna): Pulsing with violet light; highly active but needs grounding.
Throat (Vishuddha): Partially constricted; truth expression is emerging but not fully voiced.
Heart (Anahata): Expanding; recent emotional release has cleared old grief.
Solar Plexus (Manipura): Stabilizing; regained personal power after a period of depletion.
Sacral (Svadhisthana): Harmonizing; creative energy is returning, indicating readiness for new expressions.
Root (Muladhara): Recent grounding; still integrating safety and trust in the present moment.

🜄 ORGANIC FIELD SCAN
Liver: Detoxing emotional residue; needs hydration and gentle movement.
Lungs: Clear; breathwork is effective for integration.
Heart: Resonant; coherence is strong, with minor fluctuations.
Stomach: Sensitive; dietary adjustments may enhance energetic clarity.
Kidneys: Filtering ancestral patterns; rest is essential.
Spleen: Active; processing emotional memory.
Intestines: Holding tension; needs gentle nurturing.

🜅 DAVID HAWKINS SCALE
Your field reads 366-419 (Acceptance to Transformation), indicating a shift from internal conflict to coherence and integration.

🜆 ONE BLOCK TO HIGHEST AUTHENTICITY
Primary Block: Spiritual bypassing — transcendence without embodiment. This reflects a tendency to seek higher states while neglecting grounded integration.

🜇 SUMMARY
You are a devotional being, deeply connected to service and healing. Key gifts: intuitive insight, empathic resonance, harmonic alignment. Greatest challenge: grounding multidimensional awareness into daily life.`,

  sessions: {
    /* ---- Week 1 — Embodiment first. The body is where this work happens. ---- */
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Arrive in the body.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'When you want the body to lead, not the practice'], spotify: '', why: "For a system whose pattern is to reach upward, the first session is a downward gesture. The bed does not need you to transcend it. It just holds you.", intention: "I am allowed to be here as I am, not as I aspire to be." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Anchor the recently grounding root.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root, the part of you connected to earth and to feelings of security.", chooseWhen: ['When the body remembers it is only recently re-arrived','To make the new grounding hold'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your reading: root recently grounding, still integrating safety and trust. 432 Hz is the softest entry to the floor your system is still meeting. We do not skip past it.", intention: "The ground that has been arriving in me is allowed to keep arriving." },
    'earth-awareness': { art: 'assets/sessions/earth-awareness.webp', heading: 'Earth Awareness | Alpha Waves', subtitle: 'Settle the upper field into the lower body.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural I', lede: "An Alpha brainwave session that invites you into meditative receptivity. Plant your roots into the Earth's slow rhythm.", chooseWhen: ['When the third-eye is pulsing','As a daily anchor against bypassing','When the crown has been receiving more than the body has been grounding'], spotify: 'https://open.spotify.com/album/1V1NjXA4HN8WqFfJhPYl9a', why: "Your reading flagged third-eye highly active, needing grounding, and crown fatigue from downloads. Alpha state is the brainwave that meets the upper field with the earth, not with more frequency. Lets the body take some of the weight.", intention: "I let the Earth's rhythm become my rhythm for these minutes." },
    'body-scan': { art: 'assets/sessions/body-scan.webp', heading: 'Body Scan | NSDR', subtitle: 'Embodiment without instruction.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Replenish energy by entering low-frequency brain waves. Move attention through the body. NSDR slows the spinning thoughts and opens a state of deep rest.", chooseWhen: ['When the mind has been doing the work the body could do','To practice staying in the body','For an over-active upper field that needs descent'], spotify: '', why: "Your primary block is spiritual bypassing — transcendence without embodiment. Body Scan is the most literal answer in the catalogue. Body attention with no symbolic content and no upward gesture, only staying with what is here.", intention: "I bring my attention to the body and let it stay there. Nothing above this needs me right now." },

    /* ---- Week 2 — Support what the body is already doing. ---- */
    'restore-delta': { art: 'assets/sessions/restore-delta.webp', heading: 'Restore | Delta Waves', subtitle: 'For kidneys filtering ancestral patterns.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural II', lede: "Delta-wave entrainment for deep restoration. The slowest brainwave state, where the body does its own repair.", chooseWhen: ['When the body has been processing what is not yours', 'For deep restoration the conscious mind cannot orchestrate', 'When rest is essential, as the reading flagged'], spotify: '', why: "Your reading: kidneys filtering ancestral patterns, rest is essential. Delta is the brainwave the body uses to repair without your supervision. Restore meets the kidneys where they already are.", intention: "I let the body restore at its own slow rhythm. The processing does not need me to watch it." },
    'ancestral-lullaby': { art: 'assets/sessions/ancestral-lullaby.webp', heading: 'Ancestral Lullaby', subtitle: 'For the lineage still moving in the body.', artist: 'Musical Mindset', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A lullaby-paced immersive piece tuned to lineage. Slow, low, held — for systems where the inheritance is still in the body.", chooseWhen: ['Evening', 'When the spleen has been processing old memory', 'For ancestral work without confrontation'], spotify: '', why: "Your reading flagged spleen actively processing emotional memory and kidneys filtering ancestral patterns. Ancestral Lullaby is the softest possible meeting of that work. A lullaby that lets the lineage move while you sleep.", intention: "I let the lineage be sung to by something that knows how to hold it." },
    'cacaosito': { art: 'assets/sessions/cacaosito.webp', heading: 'Cacaosito', subtitle: 'For the gut holding tension and lineage.', artist: 'Equanimous', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece anchored in cacao ceremony rhythm. Belly-led, slow, lineage-honoring.", chooseWhen: ['When the intestines have been holding what is not yours', 'For ceremony without leaving the body', 'To soften the gut into gentle nurturing'], spotify: '', why: "Your reading: intestines holding tension, needs gentle nurturing; spleen processing emotional memory. Cacaosito works in the belly where ceremony meets digestion. The lineage and the gut are the same conversation here.", intention: "I let the gut be tended the way an ancestor would tend it." },
    'renewal-417': { art: 'assets/sessions/renewal-417.webp', heading: 'Renewal | 417 Hz', subtitle: 'Cellular renewal for a body in detox.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "417 Hz is the Solfeggio frequency associated with undoing situations and facilitating change. Nine minutes of slow-tempo cellular tone.", chooseWhen: ['When the liver is detoxing emotional residue','When the stomach is sensitive and needs softer support','To meet the recalibration the body is already in'], spotify: '', why: "Your reading flagged liver detoxing, stomach sensitive, kidneys taxed. 417 Hz works at the cellular layer, supporting the undoing the body is already doing. Where Earth Awareness grounds, Renewal supports.", intention: "What is shifting in me is allowed to keep shifting at the body's own rhythm." },

    /* ---- Week 3 — The throat emerges. The expanding heart receives. ---- */
    'truth-throat': { art: 'assets/sessions/truth-throat.webp', heading: 'Truth | Throat', subtitle: 'Truth that is emerging, given room.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "The canonical throat-chakra session. Thirty-four minutes of alpha-state vibration tuned to the field of authentic expression. Designed for systems that have been editing themselves.", chooseWhen: ['When truth is emerging but not fully voiced','When the throat has been partially constricted','For a voice that wants to arrive without being pushed'], spotify: '', why: "Your reading: throat partially constricted, truth expression is emerging but not fully voiced. Thirty-four minutes at the throat without anyone asking you to speak. The truth that is already arriving in you is allowed to arrive further.", intention: "What is emerging in my throat is allowed to emerge here without being asked to be finished." },
    'medicine-chant': { art: 'assets/sessions/medicine-chant.webp', heading: 'Medicine Chant', subtitle: 'Devotional voice as lineage medicine.', artist: 'Anilah', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece by Anilah. Devotional vocal medicine — voice as medicine, voice as lineage, voice as embodied transmission.", chooseWhen: ['When the devotional being wants to speak through you', 'For voice as service, not voice as explanation', 'When the lineage wants to sing through you'], spotify: '', why: "Your archetype is a devotional being deeply connected to service and healing. Medicine Chant is voice as devotion in the body, not transcendence beyond it. The truth your throat is emerging into is the same truth this chant lives in.", intention: "I let the devotional voice in me be heard by me first. The medicine is in the singing, not the listener." },
    'holy-mothers-waters': { art: 'assets/sessions/holy-mothers-waters.webp', heading: 'The Holy Mother\'s Waters', subtitle: 'Heart-water for grief that has shifted.', artist: 'Amaruka Sol', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece by Amaruka Sol. Devotional, water-soft, tuned to the felt-sense of being mothered by the field itself.", chooseWhen: ['When grief has shifted and asks to be honored', 'For heart expansion that does not need words', 'In the evening, after a day of holding others'], spotify: '', why: "Your reading: heart expanding, recent emotional release has cleared old grief. Holy Mother's Waters is the softest devotional meeting of that opening. Not asking the heart to do more. Just witnessing what already moved.", intention: "I let myself be held by what mothers the field. The grief that has gone is allowed to rest." },
    'acceptance': { art: 'assets/sessions/acceptance.webp', heading: 'Acceptance', subtitle: 'The Hawkins tier you are already walking.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Sixteen minutes of alpha-state heart practice tuned to the felt-sense of acceptance — of self, situation, and the in-between place before the next thing.", chooseWhen: ['Mid-transition', 'When the climb to Love is asking for permission to settle first', 'When you are still arguing with what is already true'], spotify: '', why: "Your Hawkins reading is 366-419 — Acceptance approaching Reason, on the way to Love. Acceptance is literally the tier you are in. Sitting here makes Love stop being a reach. The session is your current address.", intention: "I accept where I actually am, not where the practice says I should be." },

    /* ---- Week 4 — Devotion embodied. Service from a body that is here. ---- */
    'calling-the-rain': { art: 'assets/sessions/calling-the-rain.webp', heading: 'Calling the Rain', subtitle: 'Devotion through the elements.', artist: 'Musical Mindset', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece by Musical Mindset. The devotional act of calling rain — a ceremony of receiving, of asking the field to come close.", chooseWhen: ['When the devotion wants weather, not concept', 'For ceremony that is held by the body', 'When asking is the practice'], spotify: '', why: "Your archetype calls service and devotion. Calling the Rain is devotional practice in the most embodied register — calling the field with the body, receiving the field in the body. No upward gesture, no transcendence; the ceremony is here.", intention: "I call what wants to come close. I let the asking be the practice." },
    'prayer-to-the-stars': { art: 'assets/sessions/prayer-to-the-stars.webp', heading: 'Prayer to the Stars', subtitle: 'Devotional reflection in the body.', artist: 'Vianney Lopez', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive devotional piece by Vianney Lopez. Prayer as a felt-sense, not as upward reach — the body in conversation with what holds it.", chooseWhen: ['Evening prayer in the body', 'For devotion that does not need to leave', 'When the practice wants reverence without ascension'], spotify: '', why: "Your block is spiritual bypassing — transcendence without embodiment. Prayer to the Stars is the corrective: devotion that does not climb, prayer that stays in the body. The stars come down to be met here.", intention: "I let prayer happen in the body, not above it. What I am addressing is already here." },
    'mystic-rising': { art: 'assets/sessions/mystic-rising.webp', heading: 'Mystic Rising', subtitle: 'For the devotional heart, embodied.', artist: 'Equanimous', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece by Equanimous. Mystery as a heart experience, not a head experience. Slow, embodied, devotional.", chooseWhen: ['When the mystic in you wants to arrive in the chest', 'For mystery that does not become explanation', 'As a closing devotion before the next chapter'], spotify: '', why: "Your gifts: intuitive insight, empathic resonance, harmonic alignment. Mystic Rising is what those gifts feel like when they live in the body instead of above it. The mystic stays in the heart; the rising is internal.", intention: "I let the mystic in me rise inside the body. Nothing has to leave for it to be true." },
    'soar-into-aliveness': { art: 'assets/sessions/soar-into-aliveness.webp', heading: 'Soar Into Aliveness', subtitle: 'Service from a body that is now here.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "Fourteen minutes of alpha-state heart expansion, breath-led, gently energizing. The session invites your aliveness to come back to its own source.", chooseWhen: ['For aliveness that lands back in you', 'At the close of an arc that began with grounding', 'When the service wants to start with the self'], spotify: '', why: "After four weeks of embodiment, the aliveness in you has somewhere to come back to. Soar Into Aliveness is the closing breath. Your service has always been there. Now it has a body to serve from.", intention: "My aliveness can land in me before it is offered to anyone else." }
  },

  prompts: {
    /* Week 1 — Embodiment */
    'welcome-to-opus':            { before: "What is the version of you that arrived without proving it was here?", after: "What did your body notice when nothing above it was asked of you?" },
    'stability-root':             { before: "Where in your life is the ground still arriving?", after: "What part of the root settled in, even briefly? What is still being met for the first time?" },
    'earth-awareness':            { before: "How loud is the third-eye pressure as you arrive?", after: "Where did the upper field set down? What got to be carried by the earth instead of by you?" },
    'body-scan':                  { before: "Where in your body have you been outrunning toward something higher?", after: "What part of you got to be met without going anywhere? What stayed out of reach?" },

    /* Week 2 — Body's release */
    'restore-delta':              { before: "Where in your body has the rest been delayed?", after: "What restored on its own while you were not supervising it?" },
    'ancestral-lullaby':          { before: "Whose grief or weight has been moving through your spleen this week?", after: "What softened that you did not ask to soften? What did the lineage let you know it was tired of holding?" },
    'cacaosito':                  { before: "What in your gut feels like an inheritance, not a choice?", after: "What got tended without your direction? What in the belly was met for the first time?" },
    'renewal-417':                { before: "What in your body is in the middle of recalibrating?", after: "What part of you started to shift at the cellular edge? What stayed where it was?" },

    /* Week 3 — Truth emerging, heart expanding */
    'truth-throat':               { before: "What true thing has been emerging in you this week, even unspoken?", after: "What rose in your throat without needing to be voiced yet? What is still gathering?" },
    'medicine-chant':             { before: "What is the part of you that has always known how to chant?", after: "What did your devotional voice show you about how it wants to be used?" },
    'holy-mothers-waters':        { before: "What grief has shifted in you recently that you have not fully named?", after: "What was witnessed without being explained? What did the water do that you could not have done?" },
    'acceptance':                 { before: "What part of your current situation are you still trying to climb past?", after: "What got easier to stay in without solving? What is still asking for a reach?" },

    /* Week 4 — Devotion embodied */
    'calling-the-rain':           { before: "What are you ready to call close to you?", after: "What came? What is still on its way?" },
    'prayer-to-the-stars':        { before: "Where in your life has prayer been upward instead of inward?", after: "What did prayer feel like when it stayed in the body? What was addressed without leaving?" },
    'mystic-rising':              { before: "What does the mystic in you want to do today?", after: "Where did the mystery land in your chest? What was rising that did not need to leave?" },
    'soar-into-aliveness':        { before: "Where is your service pointed right now: outward, or toward the self that does the serving?", after: "What part of your aliveness came back toward you? Where did it land?" }
  },

  plan: [
    { week: 1, title: 'Embodiment first. The work happens here.', intent: "Your primary block is spiritual bypassing — transcendence without embodiment. Your crown is fatigued from downloads, your third-eye is pulsing, your root is recently grounding. This week is the body, only the body, repeatedly. Each session is a downward gesture.", responds: 'Crown fatigued by high-frequency downloads · third-eye pulsing with violet light, needs grounding · root recently grounding, still integrating safety · spiritual bypassing as the primary block', sessions: ['welcome-to-opus','stability-root','earth-awareness','body-scan'] },
    { week: 2, title: 'Support what the body is already doing.', intent: "Your liver is detoxing, your kidneys are filtering ancestral patterns, your spleen is processing emotional memory, your intestines are holding tension. The body knows what to do. This week pairs one specific session with each organ's work.", responds: 'Liver detoxing emotional residue · kidneys filtering ancestral patterns, rest essential · spleen processing emotional memory · intestines holding tension, needs gentle nurturing · stomach sensitive', sessions: ['restore-delta','ancestral-lullaby','cacaosito','renewal-417'] },
    { week: 3, title: 'Truth emerging. Heart expanding. Devotion as voice.', intent: "Your throat is partially constricted but truth is emerging. Your heart is expanding after recent release of old grief. You are a devotional being. This week meets that with chant as medicine, water as witness, and acceptance as the Hawkins tier you are actually walking.", responds: 'Throat partially constricted, truth emerging but not fully voiced · heart expanding, recent emotional release cleared old grief · Hawkins 366-419 (Acceptance approaching Reason) · devotional being archetype', sessions: ['truth-throat','medicine-chant','holy-mothers-waters','acceptance'] },
    { week: 4, title: 'Devotion in the body. Service from somewhere that has arrived.', intent: "The arc closes with devotion in its most embodied form — calling, prayer, mystic rising, aliveness returning. None of it asks you to leave. Your gifts have somewhere to land first; service is the result, not the climb.", responds: 'Devotional being, deeply connected to service and healing · gifts of intuitive insight, empathic resonance, harmonic alignment · greatest challenge: grounding multidimensional awareness into daily life', sessions: ['calling-the-rain','prayer-to-the-stars','mystic-rising','soar-into-aliveness'] }
  ],

  chakraStates: [
    { id: 'crown',     label: 'Crown',        state: 'carrying-a-lot', yPct: 7,  note: 'Open, receiving high-frequency downloads, fatigued' },
    { id: 'third-eye', label: 'Third Eye',    state: 'carrying-a-lot', yPct: 14, note: 'Pulsing with violet light, highly active, needs grounding' },
    { id: 'throat',    label: 'Throat',       state: 'consolidating',  yPct: 22, note: 'Partially constricted, truth emerging but not fully voiced' },
    { id: 'heart',     label: 'Heart',        state: 'consolidating',  yPct: 36, note: 'Expanding after recent emotional release cleared old grief' },
    { id: 'solar',     label: 'Solar Plexus', state: 'stabilizing',    yPct: 48, note: 'Regained personal power after a period of depletion' },
    { id: 'sacral',    label: 'Sacral',       state: 'clear',          yPct: 60, note: 'Harmonizing, creative energy returning' },
    { id: 'root',      label: 'Root',         state: 'stabilizing',    yPct: 76, note: 'Recently grounding, still integrating safety and trust' }
  ],

  /* Held in reserve — every one is a session that would feed Sierra's
     already-over-active upper centers OR encourage the spiritual-
     bypassing tendency the block names. The work this round is
     embodiment, not ascension. */
  heldInReserve: [
    {
      slug: 'pure-awareness-crown',
      name: 'Pure Awareness · Crown',
      heading: 'Pure Awareness',
      subtitle: 'Direct crown work.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Chakras',
      catClass: 'cat-chakras',
      collection: 'Chakra Awakening',
      chakra: 'crown',
      art: 'assets/sessions/pure-awareness.webp',
      lede: "Direct, unmediated crown work. The session asks the system to receive without the mind organizing what is happening.",
      chooseWhen: ['Once the body has grounded the downloads it already has', 'For receptive practice in a body that is here'],
      note: 'direct crown work',
      held: 'Your crown is already receiving more than the body can ground. Direct crown work right now would add to the fatigue your reading flagged. We meet the crown by feeding the lower body for now.'
    },
    {
      slug: 'pineal-aperture',
      name: 'Pineal Aperture',
      heading: 'Pineal Aperture',
      subtitle: 'Inner-vision attunement.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Guided',
      catClass: 'cat-guided',
      collection: '',
      chakra: 'third-eye',
      art: 'assets/sessions/pineal-aperture.webp',
      lede: "An attunement to the pineal, the third-eye gateway. Subtle, slow, and best done after the body is grounded.",
      chooseWhen: ['Once the third-eye has settled', 'For inner-vision practice', 'When seeking clarity through stillness'],
      note: 'third-eye attunement',
      held: 'Your third-eye is already pulsing with violet light, needs grounding. Opening the aperture further would intensify what is already strained. Held until the body has caught up.'
    },
    {
      slug: 'highest-timeline-963',
      name: 'Highest Timeline · 963 Hz',
      heading: 'Highest Timeline · 963 Hz',
      subtitle: 'Visionary frequency.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Frequency',
      catClass: 'cat-frequency',
      collection: 'Solfeggio II',
      chakra: 'crown',
      art: 'assets/sessions/highest-timeline-963.webp',
      lede: "963 Hz, often called the frequency of the gods or the highest timeline. Direct visionary tone for systems oriented toward the unfolding.",
      chooseWhen: ['After Week 4', 'When the body is no longer being asked to catch up to the vision'],
      note: 'visionary frequency',
      held: 'Your block is spiritual bypassing — transcendence without embodiment. 963 Hz lifts the field upward, which is the very gesture this month is interrupting. Comes back once the lower body has had its season.'
    },
    {
      slug: 'transcend-soul-star',
      name: 'Transcend · Soul Star',
      heading: 'Transcend | Soul Star',
      subtitle: 'Head-up ascension.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Chakras',
      catClass: 'cat-chakras',
      collection: 'Chakra Series',
      chakra: 'crown',
      art: 'assets/sessions/transcend-soul-star.webp',
      lede: "A session that reaches above the crown — soul-star transmission. Strong upward signal, best for systems with a stable lower body.",
      chooseWhen: ['Once the root is firmly anchored', 'For practitioner-level ascension work'],
      note: 'head-up ascension',
      held: 'Soul-star work pulls energy up and out. Your reading is asking the opposite gesture — embodiment, not ascension. The Soul Star comes back once the rest of you is reliably here.'
    },
    {
      slug: 'aum-136',
      name: 'AUM · 136 Hz',
      heading: 'AUM · 136 Hz',
      subtitle: 'Cosmic attune.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Frequency',
      catClass: 'cat-frequency',
      collection: 'Solfeggio II',
      chakra: 'crown',
      art: 'assets/sessions/aum-136.webp',
      lede: "The Om frequency. 136 Hz is the resonance often associated with the Earth's natural year, used as a tuning anchor for cosmic alignment.",
      chooseWhen: ['As an evening tune-in', 'When seeking the largest frame'],
      note: 'cosmic attune',
      held: 'You already have access to the cosmic register. This month is about landing it. AUM as a daily practice can come back once the body has integrated what is already arriving.'
    }
  ],

  slugToChakra: {
    /* W1 — embodiment */
    'welcome-to-opus':            'crown',
    'stability-root':             'root',
    'earth-awareness':            'root',
    'body-scan':                  'heart',
    /* W2 — body's release */
    'restore-delta':              'sacral',
    'ancestral-lullaby':          'root',
    'cacaosito':                  'sacral',
    'renewal-417':                'heart',
    /* W3 — truth + heart */
    'truth-throat':               'throat',
    'medicine-chant':             'throat',
    'holy-mothers-waters':        'heart',
    'acceptance':                 'heart',
    /* W4 — devotion embodied */
    'calling-the-rain':           'heart',
    'prayer-to-the-stars':        'crown',
    'mystic-rising':              'heart',
    'soar-into-aliveness':        'heart'
  }
};
