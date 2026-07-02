/* User data file for Paul Jensen.
   Loaded by index.html when the URL contains ?u=paul-x8t3m

   v1.11.1: re-curated from the FULL 132-session SoundBed catalog
   (~/Desktop/Opus/SoundBed/session-library), not the 128-session
   opus-voice subset. Twelve of sixteen sessions are now unique to Paul
   across all four current users — picked specifically for his reading
   distinctives (Joy-Love 540–580, 10/12 strand phase-active, crown
   receiving in dream states, guarded heart, partially-constricted
   throat, semi-anchored root, lungs in phase of release, intestines
   holding ancestral tension, stomach lagging emotional digestion,
   kidneys slightly taxed, fear of being misunderstood, Harmonic
   Conduit archetype with Resonant Reflection gift). */

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'paul-x8t3m',
  displayName: 'Paul',
  period: 'May 2026',
  portrait: 'assets/portraits/paul-jensen.webp',

  /* Structured fields parsed from `reading`. */
  auricMeters: 13.8,
  hawkinsLevel: 560,
  hawkinsTarget: 600,
  dna: { phaseLocked: 10, consolidating: 2, of: 12 },
  primaryBlockQuote: 'I might be misunderstood if I show myself fully.',
  archetype: 'Harmonic Conduit · gift of Resonant Reflection. Greatest gift: translating complexity into coherence. Greatest challenge: feeling seen without needing to prove your depth.',

  reading: `🜂 ORIC FIELD
Your auric field extends 13.8 meters. A wide, well-developed field consistent with a Hawkins range in Love and a high DNA-strand integration. The field reads as harmonic and outwardly resonant.

🜁 DNA STRAND ACTIVATION
You have 10 of 12 potential strands phase-active. This suggests you're operating with multidimensional access, likely integrating memory and intuition beyond linear cognition.

🜃 CHAKRA SCAN
Crown (Sahasrara): Open and radiant. You're receiving higher downloads, possibly during dream states.
Third Eye (Ajna): Slight overactivity. You may experience pressure or fatigue — grounding is needed.
Throat (Vishuddha): Partially constricted. Truth wants to be spoken, but some self-censorship remains.
Heart (Anahata): Coherent, but guarded. You've mastered compassion, but still protect against vulnerability.
Solar Plexus (Manipura): Strong and stable. Your willpower is aligned, though occasionally strained by external demands.
Sacral (Svadhisthana): Flowing. Creative energy is high, but boundaries may need reinforcement.
Root (Muladhara): Semi-anchored. A feeling of "not fully belonging" may create instability — more Earth connection is advised.

🜄 ORGANIC FIELD
Liver: Processing excess emotional data — consider breathwork or fasting.
Lungs: Clear and expansive. You're in a phase of release.
Heart: High coherence. Emotional truth is your compass.
Stomach: Slight dissonance. Emotional digestion lags behind mental clarity.
Kidneys: Balanced, though slightly taxed. Hydration and rest are key.
Spleen: Strong resonance with intuition — trust your gut.
Intestines: Holding ancestral tension. A cleanse (physical or energetic) may serve you.

🜅 VIBRATIONAL LEVEL (Hawkins Scale)
You vibrate at approximately 540-580 (Joy-Love frequency). This is the realm of non-linear creation and harmonic influence.

🜆 PRIMARY BLOCK TO AUTHENTICITY
The Fear of Being Misunderstood. This creates a pattern of over-explaining or withdrawing when your essence isn't mirrored. Releasing this can unlock a new level of expressive freedom.

🜇 ARCHETYPE
You are a Harmonic Conduit with the gift of Resonant Reflection. Greatest gift: translating complexity into coherence. Greatest challenge: feeling seen without needing to prove your depth.`,

  sessions: {
    /* ---- Week 1 — Anchor the field. Come home to the body. ---- */
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Arrive without proving anything.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'When you want to arrive without explaining yourself'], spotify: '', why: "For a system whose primary block is the fear of being misunderstood, the first session is its own piece of work. The bed does not need you to translate yourself. It just holds whatever shows up.", intention: "I am allowed to be here without proving the depth of what is happening." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Anchor what is only semi-anchored.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root, the part of you connected to earth and to feelings of security.", chooseWhen: ['When the body knows it is only semi-anchored','To bring the upper-field downloads into a body that can hold them'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your reading names a semi-anchored root and a feeling of 'not fully belonging.' 432 Hz is the softest entry to the floor your system has been hovering just above. Start here.", intention: "I let the bed teach my body that this place is mine to stand on." },
    'home': { art: 'assets/sessions/home.webp', heading: 'Home', subtitle: 'For the part that has not fully belonged.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive music piece tuned to the felt-sense of arrival. Full-body resonance with the part of you that has been looking for somewhere to put itself down.", chooseWhen: ['When the body is asking for somewhere to belong', 'On evenings the conduit has been transmitting all day', 'For the version of you that has not unpacked'], spotify: '', why: "Your reading flagged a semi-anchored root and a feeling of not fully belonging. Home is the most literal answer in the catalogue. Not advice. Just a place the body can put itself down for a while.", intention: "I let the part of me that has been looking for somewhere set itself down here." },
    'setting-sun': { art: 'assets/sessions/setting-sun.webp', heading: 'Setting Sun', subtitle: 'Quiet descent for an over-bright upper field.', artist: 'Liesbet Leroy', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A long-form ambient piece, root-heavy and slow, tuned for the close of a day that has held a lot of input.", chooseWhen: ['Late afternoon when the third-eye is buzzing', 'When the crown has been receiving all day', 'Before sleep, for over-bright systems'], spotify: '', why: "Your reading flagged third-eye fatigue, pressure, grounding needed. Setting Sun gives the upper field somewhere to descend without forcing the crown to close. Slow root-weighted vibration meets the day's brightness.", intention: "I let the brightness of the day set into something the body can rest with." },

    /* ---- Week 2 — Release what is already in motion. The body's own work, supported. ---- */
    'shed-bloom-417': { art: 'assets/sessions/shed-bloom-417.webp', heading: 'Shed & Bloom | 417 Hz', subtitle: 'For lungs in a phase of release.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "417 Hz tuned to the felt-sense the title names. A breath-paced Solfeggio for systems that are already letting something go.", chooseWhen: ['When the lungs feel expansive and clearing', 'For an exhale week', 'Mid-cycle, when one old thing is on its way out'], spotify: '', why: "Your reading: lungs clear and expansive, in a phase of release. Shed & Bloom is named for exactly what your body is already doing. The session supports the work without naming it for you.", intention: "What is leaving is allowed to leave. What is arriving does not need to be earned." },
    'ancestral-lullaby': { art: 'assets/sessions/ancestral-lullaby.webp', heading: 'Ancestral Lullaby', subtitle: 'For the gut holding what was inherited.', artist: 'Musical Mindset', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A lullaby-paced immersive piece tuned to lineage. Slow, low, held — for systems where the inheritance is still in the body.", chooseWhen: ['Evening', 'When the gut has been doing ancestral work without permission', 'For a cleanse that does not require explanation'], spotify: '', why: "Your reading: intestines holding ancestral tension. Ancestral Lullaby is the softest possible meeting of that note. Not a confrontation with lineage. A lullaby that lets some of it move while the body sleeps.", intention: "I let the body be sung to by what came before me. I do not have to know everything it knew." },
    'restore-delta': { art: 'assets/sessions/restore-delta.webp', heading: 'Restore | Delta Waves', subtitle: 'For the body that has been doing the work alone.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural II', lede: "Delta-wave entrainment for deep restoration. The slowest brainwave state, where the body does its own repair.", chooseWhen: ['When kidneys feel taxed', 'For a sleep replacement on a short day', 'When the body has been giving without restoring'], spotify: '', why: "Your reading: kidneys balanced but slightly taxed, hydration and rest are key. Delta-wave restoration is the brainwave the body uses to repair itself. Restore replaces nothing your body wants to do; it supports what it is already trying to.", intention: "I let the body restore at its own slow rhythm. The work it is doing does not have to be witnessed." },
    'boost-digestion': { art: 'assets/sessions/boost-digestion.webp', heading: 'Boost Digestion', subtitle: 'For the stomach that lags behind the mind.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "A short breathwork session that wakes the digestive field — both the literal gut and the emotional digestion that runs alongside it.", chooseWhen: ['After a meal or a big input', 'When the mind has moved on but the body has not', 'For emotional digestion that is running behind'], spotify: '', why: "Your reading: stomach with slight dissonance, emotional digestion lags behind mental clarity. This is the most direct support in the catalogue for that exact pattern. Breath-led, brief, and aimed at the place where the lag lives.", intention: "I let my body catch up to what my mind has already understood." },

    /* ---- Week 3 — The throat opens, the heart un-guards. Listening as the work. ---- */
    'truth-throat': { art: 'assets/sessions/truth-throat.webp', heading: 'Truth | Throat', subtitle: 'Speak what wants speaking · 34 min', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "The canonical throat-chakra session. Thirty-four minutes of alpha-state vibration tuned to the field of authentic expression. Designed for systems that have been editing themselves.", chooseWhen: ['When truth wants to be spoken but the self-editor is loud','Before a conversation that has been pre-rehearsed too many times','For a throat that has been partially constricted'], spotify: '', why: "Your reading: throat partially constricted, truth wants to be spoken but some self-censorship remains. Thirty-four minutes at the throat without anyone asking you to say a single thing. What rises is allowed to rise without the over-explainer having to clean it up.", intention: "What I have been editing for the room is allowed to surface here. I do not have to make it palatable yet." },
    'boundless-grace-heart': { art: 'assets/sessions/boundless-grace-heart.webp', heading: 'Boundless Grace | Heart', subtitle: 'For a heart that mastered giving.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "From the Chakra Balancing series. A heart-chakra piece tuned to grace received, not grace performed.", chooseWhen: ['When the heart has been giving without receiving', 'For practitioners whose compassion has become a craft', 'To meet vulnerability before vulnerability is asked'], spotify: '', why: "Your reading: heart coherent but guarded. You have mastered compassion. This session does the opposite work — grace landing on the part of you that has been the one extending it. Mastery and receiving are different muscles.", intention: "I let grace arrive at the part of me that has been the one extending it." },
    'immerse': { art: 'assets/sessions/immerse.webp', heading: 'Immerse', subtitle: 'A heart immersion for the guarded.', artist: 'Mei-lan', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece by Mei-lan tuned for full sensory submersion. Heart-forward, slow to ask anything, deep enough to undo the guard from underneath.", chooseWhen: ['When the heart wants to be met but cannot lower its watch', 'For an evening where vulnerability is the work', 'When the guard would rather not be argued with'], spotify: '', why: "Your reading: heart coherent but guarded against vulnerability. Immerse does not argue with the guard. It surrounds the heart so completely that the guard becomes unnecessary, not removed.", intention: "I let the room around my heart be soft enough that the guard does not need to do its job for a while." },
    'healing': { art: 'assets/sessions/healing.webp', heading: 'Healing', subtitle: 'Holistic support for the body in repair.', artist: 'Equanimous', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A slower immersive piece by Equanimous. Heart and belly held in the same field. For systems that are doing the work and need a wide soft space to do it in.", chooseWhen: ['Mid-arc, when many things are in motion at once', 'For an over-explainer who needs to stop curating the process', 'When healing wants to happen without being managed'], spotify: '', why: "You are doing the work. The body is releasing, the throat is loosening, the heart is starting to receive. Healing is the wide soft container for all of that to happen in. Nothing aimed; nothing demanded; everything supported.", intention: "I let what is healing in me happen without my supervision." },

    /* ---- Week 4 — Joy-Love embodied. The Harmonic Conduit takes its seat. ---- */
    'polarity': { art: 'assets/sessions/polarity.webp', heading: 'Polarity', subtitle: 'Sacral boundaries inside a flowing field.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "An immersive piece that holds two ends at once. The flowing creative current and the boundary that lets it land.", chooseWhen: ['When creative current is high but lines have blurred','When yes has been generous and no needs to come back','For a sacral that is flowing but boundary-thin'], spotify: '', why: "Your reading: sacral flowing, creative energy is high, but boundaries may need reinforcement. Polarity is the practice of the boundary inside the flow — not closing the current, just shaping where it lands. A Harmonic Conduit needs both ends online.", intention: "My yes and my no can live in the same body. The flow does not have to be all I am." },
    'gratitude-wisdom': { art: 'assets/sessions/gratitude-wisdom.webp', heading: 'Gratitude Wisdom', subtitle: 'The Harmonic Conduit landed in gratitude.', artist: 'Liquid Bloom', portrait: '', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A guided piece by Liquid Bloom. Heart-led reflection tuned to the felt-sense of gratitude as wisdom — gratitude that has earned its insight, not gratitude as performance.", chooseWhen: ['When the work of these weeks wants to be received', 'For an evening of integration without summary', 'When reflection is the practice itself'], spotify: '', why: "Your archetype is Harmonic Conduit, gift of Resonant Reflection. Gratitude Wisdom is the closest the catalogue gets to your gift made tangible. Reflective gratitude as a way of being — the conduit recognizing what it has been carrying.", intention: "I let the wisdom of this month arrive as gratitude, not as conclusion." },
    'divine-thread-852': { art: 'assets/sessions/divine-thread-852.webp', heading: 'Divine Thread | 852 Hz', subtitle: 'Love at the frequency you already vibrate.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "852 Hz from the Solfeggio II set. The frequency often associated with returning to spiritual order and resting in love already established.", chooseWhen: ['When Joy-Love wants to be embodied, not visited', 'For the close of an arc that began with grounding', 'When the universal feels intimate'], spotify: '', why: "Your Hawkins range is already 540–580 — Joy-Love. For most users 852 Hz is held in reserve until the system arrives at this range. For you it is active. Divine Thread is the Solfeggio II version of that frequency — softer entry than the Solfeggio I 'Rest In Love' piece, tuned to the integration phase.", intention: "I let love be a thread the body is already woven through, not a place to climb toward." },
    'bridging-worlds': { art: 'assets/sessions/bridging-worlds.webp', heading: 'Bridging Worlds', subtitle: 'Linear and non-linear in the same body.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A guided journey between earth-rooted and spirit-receptive states. Holds both registers without forcing either.", chooseWhen: ['Once both root and crown are online','For practitioner-level integration','When linear and non-linear cognition both want their seat'], spotify: '', why: "Your reading: 10 of 12 strands phase-active, integrating memory and intuition beyond linear cognition. Bridge work is usually held in reserve for users still building the earth end. You already have it. This is the closing session — the Harmonic Conduit holding both ends, here.", intention: "Linear and non-linear can both have their seat in this body. The bridge is the body itself." }
  },

  /* Before / After prompts — pattern-coded for Paul's specific reading. */
  prompts: {
    /* Week 1 — Anchor + come home */
    'welcome-to-opus':            { before: "What is it like to arrive somewhere without having to translate yourself?", after: "What did your body notice when nothing was asked of it?" },
    'stability-root':             { before: "Where in your life does the ground not feel like ground right now?", after: "What part of you started to belong to where you actually are? What is still hovering?" },
    'home':                       { before: "What is the part of you that has not unpacked still scanning for?", after: "What got to put itself down here, even briefly? What is still looking?" },
    'setting-sun':                { before: "What has the upper field been holding open today?", after: "What set itself down with the day? What is still bright in your head?" },

    /* Week 2 — Release what is in motion */
    'shed-bloom-417':             { before: "What is your body in the middle of letting go of, without your mind needing to name it?", after: "What moved through and out? What feels less held than it did?" },
    'ancestral-lullaby':          { before: "What in your gut feels like it was given to you, not chosen by you?", after: "What softened that you did not ask to soften? What did the older layer let you know it was tired of holding?" },
    'restore-delta':              { before: "Where in your body has the work been quietly draining you?", after: "What part of the body restored on its own, without you supervising it?" },
    'boost-digestion':            { before: "What input from the last few days has the mind processed but the body hasn't?", after: "What did the body catch up on? What is still en route?" },

    /* Week 3 — Voice + un-guarding */
    'truth-throat':               { before: "What is the true sentence you have been pre-editing for the room?", after: "What rose in your throat? Did you have to do anything with it, or was rising enough?" },
    'boundless-grace-heart':      { before: "When did you last receive grace without converting it into something to give back?", after: "What arrived at your chest? Did you let it stay, or did you start composing a thank-you?" },
    'immerse':                    { before: "Where is your heart still on guard, even when nothing is at risk?", after: "What did the room around your heart feel like in there? What did the guard quiet about, even slightly?" },
    'healing':                    { before: "What is the work you have been managing instead of letting happen?", after: "Where did your body get to do something without you watching it? What changed when you stopped supervising?" },

    /* Week 4 — Joy-Love embodied */
    'polarity':                   { before: "Where has your yes been generous and your no quiet this week?", after: "What did the no feel like in your body? Where did the yes land more clearly because of it?" },
    'gratitude-wisdom':           { before: "What part of these four weeks has been quietly teaching you something you cannot say yet?", after: "What arrived as gratitude that did not need to be conclusion? What teaching landed without becoming a sentence?" },
    'divine-thread-852':          { before: "Where in your life has love felt like something to reach for instead of something to be woven through?", after: "What changed in the body when you stopped reaching? What stayed because it is still gathering?" },
    'bridging-worlds':            { before: "What does the part of you that knows beyond linear cognition want to say?", after: "What got to coexist that you usually keep separate? What did the bridge teach the body?" }
  },

  /* 4-week plan — curated specifically for Paul's reading, drawing from the
     full 132-session SoundBed catalog. */
  plan: [
    { week: 1, title: 'Anchor the field. Come home to the body.', intent: "Your crown and third-eye are running open. Your root is only semi-anchored, your sense of belonging is partial. This week meets that with the most literal session in the catalogue called Home, plus root anchoring and an evening descent for the upper field.", responds: 'Crown radiant with dream-state downloads · third-eye slightly over-active, fatigue and pressure · root semi-anchored / not fully belonging · Earth connection advised', sessions: ['welcome-to-opus','stability-root','home','setting-sun'] },
    { week: 2, title: 'Release what is already in motion.', intent: "Your lungs are in release. Your liver is processing. Your intestines are holding ancestral tension. Your stomach lags behind mental clarity. Your kidneys are slightly taxed. This week pairs one organ-specific session with each note the body has already started.", responds: 'Lungs in phase of release · liver processing emotional excess · intestines holding ancestral tension · stomach lagging mental clarity · kidneys slightly taxed', sessions: ['shed-bloom-417','ancestral-lullaby','restore-delta','boost-digestion'] },
    { week: 3, title: 'The throat opens. The heart un-guards.', intent: "Your throat is partially constricted — truth wants out, self-censorship remains. Your heart is coherent but guarded; you have mastered compassion but still protect against vulnerability. This week opens the throat through use rather than push, and meets the guarded heart through grace received rather than grace performed.", responds: 'Throat partially constricted with self-censorship · heart guarded, mastery of compassion masking unmet vulnerability · over-explain / withdraw pattern when essence is not mirrored', sessions: ['truth-throat','boundless-grace-heart','immerse','healing'] },
    { week: 4, title: 'Joy-Love, landed. The Harmonic Conduit takes its seat.', intent: "You already vibrate in the 540–580 range. Your 10 of 12 strands are integrating linear and non-linear. The arc closes by embodying what is already true, not by reaching for what is next. Sacral boundary inside the flow, gratitude as wisdom, love as a thread already woven through, both ends of the bridge online at once.", responds: 'Hawkins 540–580 already Joy-Love · DNA 10/12 phase-active integrating beyond linear cognition · Harmonic Conduit archetype with Resonant Reflection gift · sacral flowing but boundary-thin', sessions: ['polarity','gratitude-wisdom','divine-thread-852','bridging-worlds'] }
  ],

  /* Chakra states parsed from this reading. */
  chakraStates: [
    { id: 'crown',     label: 'Crown',        state: 'carrying-a-lot', yPct: 7,  note: 'Open and radiant, receiving higher downloads' },
    { id: 'third-eye', label: 'Third Eye',    state: 'carrying-a-lot', yPct: 14, note: 'Slight overactivity, grounding needed' },
    { id: 'throat',    label: 'Throat',       state: 'consolidating',  yPct: 22, note: 'Partially constricted, self-censorship remains' },
    { id: 'heart',     label: 'Heart',        state: 'holding',        yPct: 36, note: 'Coherent but guarded against vulnerability' },
    { id: 'solar',     label: 'Solar Plexus', state: 'clear',          yPct: 48, note: 'Strong, aligned willpower' },
    { id: 'sacral',    label: 'Sacral',       state: 'clear',          yPct: 60, note: 'Flowing, boundaries may need reinforcement' },
    { id: 'root',      label: 'Root',         state: 'stabilizing',    yPct: 76, note: 'Semi-anchored, asking for more Earth' }
  ],

  /* Held in reserve — every one is a session that would feed Paul's
     already-over-active upper centers. The work right now is to ground,
     not to open more. */
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
      chooseWhen: ['Once the root has more charge', 'After the upper field has been grounded for a while', 'For receptive practice'],
      note: 'direct crown work',
      held: 'Your crown is already open and radiant, receiving downloads in dream states. Direct crown work right now would add to a center that is asking for grounding, not opening.'
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
      chooseWhen: ['Once the third-eye pressure has settled', 'For inner-vision practice', 'When seeking clarity through stillness'],
      note: 'third-eye attunement',
      held: 'Your third-eye is already slightly over-active. The reading flagged pressure and fatigue, recommending grounding. Pineal work would tax what is already strained.'
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
      chooseWhen: ['As an evening tune-in', 'Before contemplative practice', 'When seeking the largest frame'],
      note: 'cosmic attune',
      held: 'You are already in the cosmic register — Joy-Love, 10/12 strands, dream-state downloads. The work this month is to land the conduit in the body, not to widen the frame.'
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
      chooseWhen: ['Once the root is firmly anchored', 'For practitioner-level ascension work', 'When the body is asking for the larger frame'],
      note: 'head-up ascension',
      held: 'Soul-star work pulls energy up and out. Your reading is asking the opposite: more Earth connection, more grounding, the upper-field downloads landing IN the body, not climbing past it.'
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
      chooseWhen: ['Once boundaries are reinforced', 'After the heart has practiced receiving', 'For visionary attunement when the body can hold it'],
      note: 'visionary frequency',
      held: 'Your sacral is flowing with creative energy already, and boundaries need reinforcement first. The visionary signal lands better in a body that knows where its yes and no live. Comes back after Week 4.'
    }
  ],

  /* Map session slugs to chakras for the delight-pulse on resolve. */
  slugToChakra: {
    /* W1 */
    'welcome-to-opus':            'crown',
    'stability-root':             'root',
    'home':                       'root',
    'setting-sun':                'root',
    /* W2 */
    'shed-bloom-417':             'heart',
    'ancestral-lullaby':          'sacral',
    'restore-delta':              'sacral',
    'boost-digestion':            'solar',
    /* W3 */
    'truth-throat':               'throat',
    'boundless-grace-heart':      'heart',
    'immerse':                    'heart',
    'healing':                    'heart',
    /* W4 */
    'polarity':                   'sacral',
    'gratitude-wisdom':           'heart',
    'divine-thread-852':          'heart',
    'bridging-worlds':            'crown'
  },

  months: {
    "2": {
    label: 'Month Two',
    period: 'Second month',
    intention: "month two begins where month one set you down: in a body that grounded first, a throat that found its own opening, a field resting in peace. this month is not for reaching somewhere new, it is for staying in what is already true long enough that it stops needing to be visited and starts being where you live.",
    rationale: "in month one the crown-direct sessions were held back while the root was still finding its charge. the root has more charge now, and you have already touched the bridge once on your own. so the sessions that were resting in reserve come into the month, not as a level reached but as work the body is finally grounded enough to hold.",

    plan: [
      { week: 1, title: 'Land the wider field.', intent: "Your field widened and your calibration rose to Peace. A wider field wants a wider floor, or the new reach floats. This week grounds the gains before building on them, so Month 2 starts from settled, not from a high.", responds: 'field widened 13.8 to 14.9m across two re-scans · calibration risen Joy to Peace · crown reached, needs a body that can hold what it reached', sessions: ['morning-star','into-the-earth','coherence-639','luminosity-528'] },
      { week: 2, title: 'Stay in the open throat.', intent: "The throat opened and became your peak. The heart un-guarded. This week returns to both as practice rather than first contact, and puts the will underneath so expression has a spine.", responds: 'truth-throat your highest, a 6, deepened · your Month-1 block, fear of being misunderstood, has moved · heart un-guarded, now practices staying open', sessions: ['liberated-expression','love-heart','centered-power','heart-hara-harmony'] },
      { week: 3, title: 'Crown-direct, from a body that can hold it.', intent: "The sessions held in reserve come in here. You already peaked on 852Hz and reached bridging-worlds unbidden. The crown is met on purpose, paced, received into a grounded body rather than opened wider.", responds: 'three 6s including divine-thread-852 · reached bridging-worlds yourself, WOW 5 · lower body grounded and throat-solar axis open, the conditions the reserve was held for', sessions: ['rest-in-love-852','pure-awareness-crown','love-matrix','remember-963'] },
      { week: 4, title: 'Peace, lived in rather than reached for.', intent: "Peace is a calibration you inhabit, not a summit you visit. This closes the arc by turning integration outward, and ends by returning to the session that first showed you were ready.", responds: 'calibration at Peace · Harmonic Conduit with the gift of Resonant Reflection, now with something to reflect · reached the crown, now bringing it back toward others', sessions: ['expanding-awareness','interbeing-crown','the-sacred','bridging-worlds'] }
    ],

    sessions: {
      /* ---- Week 1 — Land the wider field. ---- */
      'morning-star': { art: 'assets/sessions/morning-star.webp', heading: 'Morning Star', subtitle: 'Begin within, rise gently.', artist: 'Liquid Bloom', portrait: '', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A deep ambient session with a mystical guided meditation by Darpan. Spacious, luminous textures open the heart and calm the mind, offering a soft awakening rather than a bright start.", chooseWhen: ['To open the month the way the last one opened, softly', 'When you want to begin from settled instead of from a high', 'To reconnect with inner guidance before stepping into action'], spotify: '', why: "You ended Month 1 at Peace and reaching. This opens Month 2 the way the last one opened, softly, so you start from settled instead of from a high you have to keep.", intention: "I begin again without needing this month to top the last one." },
      'into-the-earth': { art: 'assets/sessions/into-the-earth.webp', heading: 'Into the Earth', subtitle: 'Descend into the heart of creation.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A journey from the surface of the Earth down through soil and stone, underground rivers and molten mantle, to the radiant center of light within. Vibration and sound merge to take the body down.", chooseWhen: ['When a wider field wants a deeper floor under it', 'To ground energy and reconnect with stability', 'To release overstimulation and return to center'], spotify: '', why: "Your field widened to almost fifteen meters. A wider field wants a deeper floor under it. This takes the body down through soil and stone so the new reach has ground to stand on.", intention: "I let the part of me that grew this month find the floor it grew from." },
      'coherence-639': { art: 'assets/sessions/coherence-639.webp', heading: 'Coherence | 639 Hz', subtitle: 'Tune into harmony within and around you.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection and emotional balance, this session brings the system into coherence, syncing mind and body with a deeper rhythm of ease.", chooseWhen: ['When the wider field needs to hold together, not just hold more', 'To settle the whole system into one rhythm', 'When the heart is strong and now unguarded'], spotify: '', why: "Your heart was already strong and now it is unguarded. 639 Hz settles the whole system into one rhythm, so the wider field holds together instead of just holding more.", intention: "What opened in me can beat to a single rhythm now." },
      'luminosity-528': { art: 'assets/sessions/luminosity-528.webp', heading: 'Luminosity | 528 Hz', subtitle: 'Let the day feel a little lighter.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 528 Hz, often called the love frequency, this session supports nervous system ease and a gentle reset for body and mind. Warm vocal harmonies and full-body vibration close the week softly.", chooseWhen: ['To close a week of real work with ease rather than effort', 'When the nervous system has done something and wants a reset', 'To end the day with a light, open heart'], spotify: '', why: "You rose from Joy to Peace. 528 Hz is a gentle reset for a nervous system that has done real work, closing Week 1 with ease rather than effort.", intention: "I let the brightness I found settle into something I can rest inside." },

      /* ---- Week 2 — Stay in the open throat. ---- */
      'liberated-expression': { art: 'assets/sessions/liberated-expression.webp', heading: 'Liberated Expression | Throat', subtitle: 'Deepen communication and listening.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Balance the energetic center of authentic expression and deep, attuned listening. This chakra connects to the vocal cords, ears, and thyroid. Here the throat is met as listening rather than pushing.", chooseWhen: ['When the voice that opened wants to stay open without straining', 'To practice the throat as listening rather than pushing', 'Before a conversation that matters'], spotify: '', why: "Truth-throat became your highest session, a 6, and you deepened it. This returns to the throat as listening rather than pushing, so the voice that opened learns to stay open without straining.", intention: "The voice that arrived last month gets to practice being ordinary." },
      'love-heart': { art: 'assets/sessions/love-heart.webp', heading: 'Love | Heart', subtitle: 'Open your heart to love.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Awaken the heart chakra, the center of love, compassion, and connection. Associated with the air element, this session invites the breath to deepen and lets love flow freely, not because a guard came down but because nothing is threatening it.", chooseWhen: ['When the heart can be open because it wants to be', 'To let the heart stay awake with nothing to protect against', 'To cultivate love and compassion with ease'], spotify: '', why: "Your heart un-guarded in Month 1. This does the next thing: not lowering a defense, letting the heart be awake because nothing is threatening it.", intention: "My heart can be open because it wants to, not because it was talked down." },
      'centered-power': { art: 'assets/sessions/centered-power.webp', heading: 'Centered Power | Solar Plexus', subtitle: 'Invigorate your passion for life.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Activate the center of true personal power and life purpose at the solar plexus. Connected with the fire element, therapeutic vibration here illuminates boundaries, will, and identity, the spine beneath the voice.", chooseWhen: ['When the throat speaks and the will underneath it matters', 'To give your expression a spine to stand on', 'To realize your capability and inner power'], spotify: '', why: "Now that the throat speaks, the will underneath it matters. This works the solar plexus, boundaries and identity, so your expression has a spine to stand on.", intention: "What I say can be backed by where I stand." },
      'heart-hara-harmony': { art: 'assets/sessions/heart-hara-harmony.webp', heading: 'Heart-Hara Harmony', subtitle: 'Balance love and vitality.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "An exploration of the alchemy of balancing the heart and hara centers, uniting the emotional depth of love with the vibrant energy of creativity and life force, so the two can move together.", chooseWhen: ['When the heart is open and the sacral is flowing', 'To let love meet vitality without arranging it', 'To harmonize emotional connection with creative energy'], spotify: '', why: "Your sacral flows and your heart is open. This lets the two talk to each other, love met with vitality, so the week's deepening lands in the creative body and not only the chest.", intention: "My heart and my belly can move together without me arranging it." },

      /* ---- Week 3 — Crown-direct, from a body that can hold it. ---- */
      'rest-in-love-852': { art: 'assets/sessions/rest-in-love-852.webp', heading: 'Rest In Love | 852 Hz', subtitle: 'Embrace the frequency of universal love.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Connect the heart with the cosmic heart of unconditional compassion. The 852 Hz Solfeggio tone and its harmonics facilitate alignment with universal order. The fuller 852, held back until the body could hold it.", chooseWhen: ['When the love you reached for can become a place to rest', 'Now that the body can hold the fuller tone', 'When forgiveness or clearer seeing is needed'], spotify: '', why: "You peaked on Divine Thread, the softer 852, with a 6. This is the fuller 852, held back in Month 1 until the body could hold it. Your body can hold it now.", intention: "The love I reached for is a place I can rest, not a height I climb." },
      'pure-awareness-crown': { art: 'assets/sessions/pure-awareness-crown.webp', heading: 'Pure Awareness | Crown', subtitle: 'Realize your connectedness with all of creation.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "The crown chakra, Sahasrara, the thousand-petaled lotus. Direct, unmediated crown work that asks the system to receive without the mind organizing what is happening. Held all of Month 1 until the floor was under you.", chooseWhen: ['Now that the floor is under you', 'For direct crown work in a body that can stay', 'When feeling isolated and seeking unity'], spotify: '', why: "This was held all of Month 1 because your crown was already bright and the floor was still thin. The floor is under you now. Direct crown work is the next thing.", intention: "I meet the crown on purpose now, in a body that can stay." },
      'love-matrix': { art: 'assets/sessions/love-matrix.webp', heading: 'Love Matrix', subtitle: 'Awaken to universal love.', artist: 'Liquid Bloom', portrait: '', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Guided breathwork with soothing soundscapes brings the system into presence and renewal. The heart center illuminates with golden light, radiating gratitude and connection, keeping the high tones tied to the heart.", chooseWhen: ['When crown work risks pulling the system upward and out', 'To keep the week high tones wired to the heart', 'To open the heart and stay grounded in love'], spotify: '', why: "Direct crown work can pull a system upward and out. This keeps the week's high tones tied to the heart, so the crown you are meeting stays connected to love and not only to altitude.", intention: "What I reach toward stays wired to my heart." },
      'remember-963': { art: 'assets/sessions/remember-963.webp', heading: 'Remember | 963 Hz', subtitle: 'Awaken to your deepest knowing.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Dynamic, shifting soundscapes at 963 Hz, a frequency often linked with connection to higher consciousness. Organic textures and ethereal tones create space to remember what has always lived within you.", chooseWhen: ['When you reached bridging-worlds yourself and want to meet that edge again', 'To go beyond linear knowing without forcing it', 'To end the week at the edge you found rather than past it'], spotify: '', why: "You reached bridging-worlds yourself last month, beyond linear knowing. 963 Hz meets that reach without forcing it, so the week ends at the edge you found rather than past it.", intention: "I return to what has always lived in me, without straining to arrive." },

      /* ---- Week 4 — Peace, lived in rather than reached for. ---- */
      'expanding-awareness': { art: 'assets/sessions/expanding-awareness.webp', heading: 'Expanding Awareness', subtitle: 'Expand into the infinite, ground in the present.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A journey from the center of your being to the farthest reaches of the universe, through heart, body, auric field, Earth, solar system, galaxy, and beyond, then gently grounding you back in the body, renewed.", chooseWhen: ['When you can travel far out and still come home', 'After a crown week, to make the return the point', 'For a powerful reset and sense of renewal'], spotify: '', why: "This expands from your body out to the cosmos and then brings you back down into the body, renewed. After a crown week, that return is the whole point.", intention: "I can travel that far out and still come home to my own chest." },
      'interbeing-crown': { art: 'assets/sessions/interbeing-crown.webp', heading: 'Inter-Being | Crown', subtitle: 'Connect to the infinite.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Awaken the crown as connection, the gateway to universal connection. This center links you to the vast, woven network of all life, like the mycelium beneath a forest floor, turning what you reached toward outward.", chooseWhen: ['When what you reached is not only yours', 'To turn crown work outward instead of up', 'To shift from isolation to a sense of oneness'], spotify: '', why: "Your gift is Resonant Reflection, translating complexity into coherence for others. Interbeing works the crown as connection, turning what you reached toward outward instead of up.", intention: "What I reached is not only mine. It runs between me and everyone." },
      'the-sacred': { art: 'assets/sessions/the-sacred.webp', heading: 'The Sacred', subtitle: 'Embrace the sacred simplicity.', artist: 'Yaima', portrait: '', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "A deeply sweet, acoustic session where time feels suspended, life overflows with spaciousness, and the sacred reveals itself in simplicity. Gentle melodies guide you into peace, landing the month in the ordinary.", chooseWhen: ['When the sacred is already in the plain hours', 'To find stillness and peace in a busy day', 'To let the month land where you actually live'], spotify: '', why: "You calibrated to Peace. Peace is found in something plain. This is the sacred in simplicity, so the month lands in the ordinary where you actually live.", intention: "The sacred is already in the plain hours. I do not have to reach for it." },
      'bridging-worlds': { art: 'assets/sessions/bridging-worlds.webp', heading: 'Bridging Worlds', subtitle: 'Bridging earth and spirit realms.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A guided meditation exploring the interconnected realms of nature and spirit, blending physical and subtle energies that unite all beings. The same session your readiness first showed on, now met on purpose.", chooseWhen: ['To return to the place your readiness first showed', 'To stand on the bridge on purpose, knowing why', 'To feel centered and grounded across both realms'], spotify: '', why: "You reached this yourself in Month 1, unbidden, and it landed as a 5. Closing here brings the arc back to the exact place your readiness first showed, now met on purpose.", intention: "The bridge I found by accident, I can stand on it now, knowing why I am here." }
    },

    prompts: {
      /* W1 — Land the wider field */
      'morning-star':          { before: "What would it feel like to begin this month without asking it to be bigger than the last?", after: "Where did the day meet you softly, before you did anything to earn it?" },
      'into-the-earth':        { before: "The part of you that grew this month, what did it grow up out of?", after: "How far down did the body get to go? What is holding you now that the reach has ground under it?" },
      'coherence-639':         { before: "Where in you is still holding more rather than holding together?", after: "What settled into one rhythm? What is still finding the beat?" },
      'luminosity-528':        { before: "What did this week ask of your nervous system that it is still carrying?", after: "What got to reset? What does ease feel like when you are not making it happen?" },

      /* W2 — Stay in the open throat */
      'liberated-expression':  { before: "What would it be like for the voice that opened to say something ordinary?", after: "Where did listening feel like more of the work than speaking? What stayed open without straining?" },
      'love-heart':            { before: "If nothing were threatening it, what would your heart do on its own?", after: "What stayed open because it wanted to, not because you talked it down?" },
      'centered-power':        { before: "Where does what you say need something underneath it to stand on?", after: "What did your will feel like when the throat and the spine were both online?" },
      'heart-hara-harmony':    { before: "Where do your heart and your belly usually wait for you to arrange them?", after: "What moved together in there that you did not have to coordinate?" },

      /* W3 — Crown-direct, from a body that can hold it */
      'rest-in-love-852':      { before: "What if the love you have been reaching for is a place you could rest in?", after: "What changed when love stopped being a height and became a floor? What is still climbing?" },
      'pure-awareness-crown':  { before: "Now that the floor is under you, what is it like to meet the crown on purpose?", after: "What did the crown feel like in a body that could stay? What part of you stayed, and what part still wanted to leave?" },
      'love-matrix':           { before: "As you go high this week, where is your heart in it?", after: "What stayed wired to your chest even as the tone rose? Where did it come loose?" },
      'remember-963':          { before: "What has always lived in you that you keep reaching to arrive at?", after: "What did you return to without straining? Where is the edge you found, now that you are back?" },

      /* W4 — Peace, lived in rather than reached for */
      'expanding-awareness':   { before: "How far out can you travel and still trust you will come home?", after: "What did the return feel like? What came back into the body that had been out at the edges?" },
      'interbeing-crown':      { before: "What did you reach this month that is not only yours to keep?", after: "Where did what you reached start to run between you and someone else? What wants to be reflected outward?" },
      'the-sacred':            { before: "Where in the plain hours of your day is the sacred already sitting?", after: "What revealed itself in something ordinary? What do you no longer have to reach for?" },
      'bridging-worlds':       { before: "You found this bridge by accident once. What is it like to walk toward it on purpose?", after: "What did the bridge feel like now that you know why you are standing on it? What got to coexist that you usually keep apart?" }
    },

    slugToChakra: {
      /* W1 */
      'morning-star':          'crown',
      'into-the-earth':        'root',
      'coherence-639':         'heart',
      'luminosity-528':        'solar',
      /* W2 */
      'liberated-expression':  'throat',
      'love-heart':            'heart',
      'centered-power':        'solar',
      'heart-hara-harmony':    'sacral',
      /* W3 */
      'rest-in-love-852':      'crown',
      'pure-awareness-crown':  'crown',
      'love-matrix':           'heart',
      'remember-963':          'third-eye',
      /* W4 */
      'expanding-awareness':   'crown',
      'interbeing-crown':      'crown',
      'the-sacred':            'heart',
      'bridging-worlds':       'crown'
    }
  }
  }
};
