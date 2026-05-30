/* User data file for Paul Jensen.
   Loaded by index.html when the URL contains ?u=paul-x8t3m

   v1.10.2: profileType 'biofield' (default). Reading sourced from
   beta.orionmessenger.io's "Scan my biofield" tool — a different format
   than Ramon's or Amber's practitioner readings, but the same fields
   land on the dashboard.

   Curation specific to Paul's reading: TWO overactive upper centers
   (crown and third-eye) with downloads landing in dream states · GUARDED
   heart (high coherence + protected against vulnerability) · PARTIALLY
   CONSTRICTED throat (truth wants out, self-censorship remains) ·
   SEMI-ANCHORED root (more Earth connection advised) · INTESTINES
   holding ancestral tension · Hawkins 540-580 (Joy-Love, upper range)
   already · 10/12 strands phase-active. Archetype: Harmonic Conduit
   with gift of Resonant Reflection. Primary block: Fear of Being
   Misunderstood — over-explaining or withdrawing when essence isn't
   mirrored.

   Two sessions normally HELD in Ramon's and Adam's reserves are
   ACTIVE in Paul's plan because his Hawkins range and DNA-integration
   profile both register them as appropriate now, not held: rest-in-love
   852 (Joy-Love already established) and bridging-worlds (10/12 strands
   integrating linear / non-linear). */

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'paul-x8t3m',
  displayName: 'Paul',
  period: 'May 2026',
  portrait: 'assets/portraits/paul-jensen.webp',

  /* Structured fields parsed from `reading`. */
  auricMeters: 13.8,
  hawkinsLevel: 560,                      // midpoint of 540-580 Joy-Love range
  hawkinsTarget: 600,                     // Peace, the next tier up — for a system already in Love
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
    /* ---- Week 1 — Anchor the field. Ground the upper centers ---- */
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Arrive without proving anything.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'When you want to arrive without explaining yourself'], spotify: '', why: "For a system whose primary block is the fear of being misunderstood, the first session is its own piece of work. The bed does not need you to translate yourself. It just holds whatever shows up.", intention: "I am allowed to be here without proving the depth of what is happening." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Anchor what is only semi-anchored.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root, the part of you connected to earth and to feelings of security.", chooseWhen: ['When the body knows it is only semi-anchored','To bring the upper-field downloads into a body that can hold them'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your reading names a semi-anchored root and a feeling of 'not fully belonging.' 432 Hz is the softest entry to the floor your system has been hovering just above. Start here.", intention: "I let the bed teach my body that this place is mine to stand on." },
    'beloved-earth': { art: 'assets/sessions/beloved-earth.webp', heading: 'Beloved Earth', subtitle: '5 min · Alpha · Soundscape', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A five-minute alpha-frequency soundscape rooted in low-Hz earth tones. Brief, immersive, tuned to the felt-sense of being beloved by the planet you stand on.", chooseWhen: ['As a morning opener', 'Between meetings, to ground the upper field', 'When the body asks for Earth, not concepts'], spotify: '', why: "Your reading directly prescribed it: more Earth connection is advised. Five minutes is short on purpose — a daily Earth-contact for a field that has been wide and high. The ground does not need a long argument.", intention: "I let the Earth meet me without needing to be translated." },
    'root-grounded-presence': { art: 'assets/sessions/root-grounded-presence.webp', heading: 'Root | Grounded Presence', subtitle: '7 min · Alpha-state anchoring', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form', lede: "A short root-chakra session for daily use. Seven minutes of alpha-state anchoring, short enough to slip into a workday, deep enough to register.", chooseWhen: ['As a daily root-check', 'When the third-eye starts to overheat', 'To pre-empt the third-eye pressure your reading flagged'], spotify: '', why: "Your third-eye is slightly overactive and asking for grounding. Long sessions invite the upper field to expand further; short daily root-checks ask the lower body to take some of the weight. Frequency over intensity.", intention: "I check in with the ground today. The ground checks back." },

    /* ---- Week 2 — Release what is already moving ---- */
    'fearless-396': { art: 'assets/sessions/fearless-396.webp', heading: 'Fearless | 396 Hz', subtitle: 'Release the fear at the root of being misread.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Aids in the transcendence of guilt and fear blocks, opening the pathways for self-love and personal empowerment.", chooseWhen: ['When the fear of being misunderstood is loud','For root-level fear release','When the body is letting something old go'], spotify: 'https://open.spotify.com/track/0IVgsgwsl2l8amzrgKWtPE', why: "Your primary block is the fear of being misunderstood — a fear that lives at the root, where belonging is decided. 396 Hz works at that floor. It does not argue with the fear. It just lets some of the charge move.", intention: "The fear of being missed can leave through my breath. I do not have to keep carrying it." },
    'ease-174': { art: 'assets/sessions/ease-174.webp', heading: 'Ease | 174 Hz', subtitle: 'Soothe the body that has been doing too much.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "A Solfeggio tone session for soothing aches and pains, bringing you into a state of effortless ease.", chooseWhen: ['When kidneys are slightly taxed','When emotional digestion is lagging behind mental clarity','For deep cellular comfort'], spotify: 'https://open.spotify.com/album/0IZxiSGDAIlQQTCN6V9gQD', why: "Your reading flagged kidneys slightly taxed and a stomach that is slow to digest emotionally. 174 Hz works at the cellular layer, traditionally for the tissue itself. Right for a body that has been translating complexity for everyone else and not soothing itself.", intention: "The places that are taxed are allowed to soften. Nothing here needs to perform." },
    'fire-cleanse': { art: 'assets/sessions/fire-cleanse.webp', heading: 'Fire Cleanse', subtitle: 'Burn the ancestral tension the intestines have been holding.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A calming organic soundscape. Immerse yourself in the felt experience of fire as it burns away anything you are ready to let go.", chooseWhen: ['Evening release','When the gut is holding what is not yours','For lineage clearing without forcing it'], spotify: 'https://open.spotify.com/track/41CRQAOids2p4yDhn8yWqq', why: "Your reading: intestines holding ancestral tension, a cleanse may serve you. Fire-cleanse is the soundscape version of that. Nothing instructed, nothing to perform. The body lets go of inherited weight inside a sound it can trust.", intention: "I burn what was given to me that does not belong in this body. I keep the warmth." },
    'renewal-417': { art: 'assets/sessions/renewal-417.webp', heading: 'Renewal | 417 Hz', subtitle: 'Cellular renewal · 9 min', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "417 Hz is the Solfeggio frequency associated with undoing situations and facilitating change. Nine minutes of slow-tempo cellular tone.", chooseWhen: ['When the body has been processing for a while','Alongside the lung-release phase your reading named','To support what is already shifting at tissue level'], spotify: '', why: "Your lungs are in a phase of release and your liver is processing excess emotional data. 417 Hz works underneath the conscious release — at the cellular layer, undoing what has been held too long. Where Ease soothes, Renewal shifts.", intention: "What has been held too long is allowed to begin shifting in the body itself." },

    /* ---- Week 3 — The throat opens. The heart un-guards ---- */
    'truth-throat': { art: 'assets/sessions/truth-throat.webp', heading: 'Truth | Throat', subtitle: 'Speak what wants speaking · 34 min', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "The canonical throat-chakra session. Thirty-four minutes of alpha-state vibration tuned to the field of authentic expression. Designed for systems that have been editing themselves.", chooseWhen: ['When truth wants to be spoken but the self-editor is loud','Before a conversation that has been pre-rehearsed too many times','For a throat that has been partially constricted'], spotify: '', why: "Your reading: throat partially constricted, truth wants to be spoken but some self-censorship remains. Thirty-four minutes at the throat without anyone asking you to say a single thing. What rises is allowed to rise without the over-explainer having to clean it up.", intention: "What I have been editing for the room is allowed to surface here. I do not have to make it palatable yet." },
    'liberated-expression': { art: 'assets/sessions/liberated-expression.webp', heading: 'Liberated Expression | Throat', subtitle: 'Listen as much as speak.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Bring balance to your energetic center of authentic expression and attuned listening. Clarify it and your gifts and vision can grace the world.", chooseWhen: ['When the over-explainer wants to soften','To practice receiving your own voice','When listening to yourself is the work'], spotify: 'https://open.spotify.com/track/2vghyFSgChsZP554bkyBrG', why: "Your pattern is to over-explain when your essence is not mirrored. This session supports listening as much as speaking. The Harmonic Conduit becomes able to receive its own resonance — not just transmit it to others.", intention: "I let my own voice land in me first. The room can hear what it hears." },
    'heart-boundless-compassion': { art: 'assets/sessions/heart-boundless-compassion.webp', heading: 'Heart | Boundless Compassion', subtitle: '7 min · Alpha · Heart chakra', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form', lede: "A direct heart-chakra session. Seven minutes of alpha-state expansion that practices compassion received, not given. Short enough to slip into a workday; deep enough to land.", chooseWhen: ['When the heart has been giving without receiving','To practice un-guarding','When the chest is asking to be tender first, capable second'], spotify: '', why: "Your reading: heart coherent but guarded, you have mastered compassion but still protect against vulnerability. Mastery of giving is not the same as practice of receiving. This session does the other side. Notice it is short on purpose.", intention: "I let compassion arrive without earning it. I receive what I usually give." },
    'open-path-741': { art: 'assets/sessions/open-path-741.webp', heading: 'Open Path | 741 Hz', subtitle: 'Clear the static around being understood.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The session helps release what weighs on the mind and makes space for fresh energy.", chooseWhen: ['When the over-explainer is full of pre-written sentences','To clear the head before a conversation that matters','At the end of a week of held words'], spotify: '', why: "741 Hz clears the mental static around what has been waiting to be spoken. After the throat sessions, this loosens what is around the throat — the over-explainer, the rehearsals, the pre-edited versions of yourself — so the next sentence has room to arrive un-managed.", intention: "I clear what I have been pre-explaining so the next thing I say can come from me, not from how I want it to be received." },

    /* ---- Week 4 — Joy-Love embodied. The Harmonic Conduit lands ---- */
    'coherence-639': { art: 'assets/sessions/coherence-639.webp', heading: 'Coherence | 639 Hz', subtitle: 'The heart in rhythm with the room.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection, emotional balance, and harmonious relationships. The session brings your system into coherence.", chooseWhen: ['When relationship is on your mind','To find a rhythm that includes you','When repair is in the air'], spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP', why: "Your organic field reads heart high coherence, and your gift is Resonant Reflection. 639 Hz tunes the rhythm the heart is already running. Coherence becomes the way you receive other people, not just the way you mirror them.", intention: "I listen for the rhythm underneath what is being asked of me." },
    'polarity': { art: 'assets/sessions/polarity.webp', heading: 'Polarity', subtitle: 'Sacral boundaries inside a flowing field.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A session that holds two ends at once — the flowing creative current and the boundary that lets it land. For systems whose sacral runs open and whose lines have softened more than they meant to.", chooseWhen: ['When creative current is high but lines have blurred','When yes has been generous and no needs to come back','For a sacral that is flowing but boundary-thin'], spotify: '', why: "Your reading: sacral flowing, creative energy is high, but boundaries may need reinforcement. Polarity is the practice of the boundary inside the flow — not closing the current, just shaping where it lands. A Harmonic Conduit needs both ends online.", intention: "My yes and my no can live in the same body. The flow does not have to be all I am." },
    'rest-in-love-852': { art: 'assets/sessions/rest-in-love.webp', heading: 'Rest in Love | 852 Hz', subtitle: 'Joy-Love at the frequency you already vibrate.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 852 Hz, often associated with returning to spiritual order, releasing illusion, and resting in unconditional love.", chooseWhen: ['When Joy-Love wants to be embodied, not just visited','In the evening, to land what the day held','When the universal feels intimate'], spotify: '', why: "Your Hawkins range is 540-580 — already Joy-Love. For most users 852 Hz is held in reserve until the system arrives at this range. For you it is active. Not a reach upward — a rest into the frequency you already broadcast.", intention: "I let love be a place I rest in, not a place I keep trying to reach." },
    'bridging-worlds': { art: 'assets/sessions/bridging-worlds.webp', heading: 'Bridging Worlds', subtitle: 'Linear and non-linear in the same body.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "A guided journey between earth-rooted and spirit-receptive states. Holds both registers without forcing either.", chooseWhen: ['Once both root and crown are online','For practitioner-level integration','When linear and non-linear cognition both want their seat'], spotify: '', why: "Your reading: 10 of 12 strands phase-active, integrating memory and intuition beyond linear cognition. Bridge work is usually held in reserve for users still building the earth end. You already have it. This is the closing session — the Harmonic Conduit holding both ends, here.", intention: "Linear and non-linear can both have their seat in this body. The bridge is the body itself." }
  },

  /* Before / After prompts — pattern-coded for Paul's specific reading. */
  prompts: {
    /* Week 1 — Anchor */
    'welcome-to-opus':            { before: "What is it like to arrive somewhere without having to translate yourself?", after: "What did your body notice when nothing was asked of it?" },
    'stability-root':             { before: "Where in your life does the ground not feel like ground right now?", after: "What part of you started to belong to where you actually are? What is still hovering?" },
    'beloved-earth':              { before: "What is the worry your mind brought to this five minutes?", after: "Did anything in your body remember the Earth is already here? What softened, even briefly?" },
    'root-grounded-presence':     { before: "How loud is the third-eye pressure right now, on a scale of 1 to 10?", after: "What anchored, even briefly? What in the upper body got to be a little less responsible?" },

    /* Week 2 — Release what is already moving */
    'fearless-396':               { before: "What is the fear of being misunderstood saying about today?", after: "What did you let move out of you? What stayed because it is not ready yet?" },
    'ease-174':                   { before: "Where in the body is the emotional digestion lagging behind the mind?", after: "What softened at the tissue level? What is still asking for more?" },
    'fire-cleanse':               { before: "What ancestral weight in the gut have you been carrying as if it were yours?", after: "What burned away that you did not have to claim? What did you keep?" },
    'renewal-417':                { before: "What in your body has been processing for a long time without resolving?", after: "What part of you started to shift, even at the cellular edge? What stayed where it was?" },

    /* Week 3 — Voice and vulnerability */
    'truth-throat':               { before: "What is the true sentence you have been pre-editing for the room?", after: "What rose in your throat? Did you have to do anything with it, or was rising enough?" },
    'liberated-expression':       { before: "What is the over-explainer planning to say before you've even arrived?", after: "What did you hear yourself say when no one was listening but you?" },
    'heart-boundless-compassion': { before: "Where in the last week did your heart give without receiving?", after: "What part of your chest received something today? Did anything land that you did not have to earn?" },
    'open-path-741':              { before: "What pre-written sentence has been rehearsing itself in your head?", after: "What is open in your head now that was not before? What direction is the next word coming from?" },

    /* Week 4 — Joy-Love embodied */
    'coherence-639':              { before: "What relationship is on your mind, and how have you been mirroring it?", after: "Where did coherence land? What got softer toward whom — including yourself?" },
    'polarity':                   { before: "Where has your yes been generous and your no quiet this week?", after: "What did the no feel like in your body? Where did the yes land more clearly because of it?" },
    'rest-in-love-852':           { before: "Where in your life has love felt like something to reach for instead of something to rest in?", after: "What changed in the body when you stopped reaching? What stayed because it is still gathering?" },
    'bridging-worlds':            { before: "What does the part of you that knows beyond linear cognition want to say?", after: "What got to coexist that you usually keep separate? What did the bridge teach the body?" }
  },

  /* 4-week plan — curated for Paul's specific reading. */
  plan: [
    { week: 1, title: 'Anchor the field. Ground the downloads.', intent: "Your crown and third-eye are running open. Your root is only semi-anchored. Before any of the upper-field gift can be embodied, the body has to learn it can hold what is arriving. We start with the floor.", responds: 'Crown radiant with dream-state downloads · third-eye slightly over-active · root semi-anchored / not fully belonging · Earth connection advised', sessions: ['welcome-to-opus','stability-root','beloved-earth','root-grounded-presence'] },
    { week: 2, title: 'Release what is already in motion.', intent: "Your lungs are in a phase of release. Your liver is processing excess emotional data. Your intestines are holding ancestral tension. This week meets what the body has already started doing.", responds: 'Lungs releasing · liver processing emotional excess · intestines holding ancestral tension · kidneys slightly taxed · stomach lagging mental clarity', sessions: ['fearless-396','ease-174','fire-cleanse','renewal-417'] },
    { week: 3, title: 'The throat opens. The heart un-guards.', intent: "Your throat is partially constricted — truth wants out, self-censorship remains. Your heart is coherent but guarded. The over-explainer protects them both. This week, we let the throat be heard before it has to perform, and we practice the heart receiving instead of mastering.", responds: 'Throat partially constricted with self-censorship · heart guarded against vulnerability · over-explain / withdraw pattern when essence is not mirrored', sessions: ['truth-throat','liberated-expression','heart-boundless-compassion','open-path-741'] },
    { week: 4, title: 'Joy-Love, landed. The Harmonic Conduit takes its seat.', intent: "You already vibrate in the 540-580 range. Your 10 of 12 strands are integrating linear and non-linear. The arc closes by embodying what is already true, not by reaching for what is next. Coherence, boundary, rest, bridge — the conduit at home in its own body.", responds: 'Hawkins 540-580 already Joy-Love · DNA 10/12 phase-active integrating beyond linear cognition · Harmonic Conduit archetype · sacral flowing but boundary-thin', sessions: ['coherence-639','polarity','rest-in-love-852','bridging-worlds'] }
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
    'welcome-to-opus':            'crown',
    'stability-root':             'root',
    'beloved-earth':              'root',
    'root-grounded-presence':     'root',
    'fearless-396':               'root',
    'ease-174':                   'sacral',
    'fire-cleanse':               'sacral',
    'renewal-417':                'heart',
    'truth-throat':               'throat',
    'liberated-expression':       'throat',
    'heart-boundless-compassion': 'heart',
    'open-path-741':              'throat',
    'coherence-639':              'heart',
    'polarity':                   'sacral',
    'rest-in-love-852':           'heart',
    'bridging-worlds':            'crown'
  }
};
