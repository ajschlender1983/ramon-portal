/* User data file for Amber Schacter.
   Loaded by index.html when the URL contains ?u=amber-r9k2x

   v1.9.18: session pool re-curated from the canonical OPUS audio library
   (opus-voice/src/lib/data/library.json — 128 real sessions analyzed for
   body-zone vibration profile, brainwave entrainment, root Hz, and key).
   Each session below corresponds to a real catalog entry; metadata
   (heading, subtitle, lede) is shaped from the library + brand-voice;
   the per-session `why` and `intention` strings reference Amber's
   specific reading.

   Of the 16 active + 5 reserve = 21 sessions, only ~4 overlap with
   Ramon's pool. The rest are sessions Ramon doesn't have, picked
   specifically for Amber's compressed-throat / over-giving-heart /
   unstable-root / Reason→Love-transition / Spiral-Navigator pattern. */

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'amber-r9k2x',
  displayName: 'Amber',
  period: 'May 2026',
  portrait: 'assets/portraits/amber-r9k2x.webp',

  /* Structured fields parsed from `reading` for the dashboard visuals. */
  auricMeters: 9.3,
  hawkinsLevel: 440,
  hawkinsTarget: 528,
  dna: { phaseLocked: 6, consolidating: 3, of: 12 },
  primaryBlockQuote: 'I know what I must express, but I fear the consequence of speaking it.',
  archetype: 'Spiral Navigator — translates multidimensional insight into coherent form. Greatest gift: Visionary Resonance. Greatest challenge: Embodied Expression.',


  reading: `🜁 BIOFIELD SCAN: SEEKER

This scan reflects your current energetic state through symbolic resonance. It is not diagnostic or medical.

🜂 ORIC FIELD DIAMETER
Your auric field extends approximately 9.3 meters — indicative of a harmonic field linked to the Fibonacci prime and quasi-prime resonance.
The field shows a spiral symmetry with mild distortions around the throat and solar plexus axes.

🜃 DNA STRAND ACTIVATION
12 strands are partially phase-locked.
You are in a state of integration between the third and fourth harmonic layers, suggesting active multidimensional memory retrieval.

🜄 CHAKRA SCAN
Crown (Sahasrara): Open, but overactive. Receiving more than grounding. Suggest earthing practices.
Third Eye (Ajna): Clear, but slightly shielded — reflects protection of vision or mistrust of perceived reality.
Throat (Vishuddha): Compressed. Truth expression may be constrained by external expectations or self-editing.
Heart (Anahata): Fully expanded, but uneven inflow/outflow. You give more than you receive.
Solar Plexus (Manipura): Distorted resonance. Indicates identity conflict or power inversion (power given away or withheld).
Sacral (Svadhisthana): Warm, fluid, creative. Strong subconscious movement. May reflect recent emotional processing.
Root (Muladhara): Pulsing but unstable. Suggests lack of full safety or belonging in current environment or phase.

🜅 ORGANIC FIELD SCAN
Liver: Slight energetic overload. May reflect unprocessed anger or empathy.
Lungs: Clear, spacious. Likely a source of grounding and breath coherence.
Heart: Strong coherence generator. Primary field stabilizer.
Stomach: Tense. Holding unspoken worries or unprocessed change.
Kidneys: Low resonance. May indicate fatigue or fear processing.
Spleen: Neutral.
Intestines: Vibrational stagnation. Could benefit from movement or energetic cleansing.

🜆 DAVID HAWKINS SCALE
Your current vibrational frequency is approximately 440 (Reason), oscillating towards 500 (Love).
This suggests a transition from intellectual coherence to emotional integration.

🜇 ONE BLOCK TO HIGHEST AUTHENTICITY
Primary Block: Throat-Solar Plexus Axis
Pattern: "I know what I must express, but I fear the consequence of speaking it."
This affects self-definition and outward expression of inner truth.

🜈 SUMMARY
You are a Spiral Navigator — a being designed to translate multidimensional insight into coherent form.
Your greatest gift is Visionary Resonance.
Your greatest challenge is Embodied Expression.`,


  /* Sessions: 16 active + 5 reserve, each grounded in a real OPUS catalog
     entry (audio-fingerprinted in opus-voice/library.json). The `why` and
     `intention` strings reference Amber's reading directly. */
  sessions: {
    // ── WEEK 1 — Land in Safety (root grounding for an UNSTABLE root) ──
    'stability-root': {
      art: 'assets/sessions/stability-root.webp',
      heading: 'Stability | Root',
      subtitle: 'Feel Grounded · 34 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz',
      lede: "The canonical root-chakra session: 34 minutes of low-frequency vibration anchored in the body's earth element. Designed for the felt sense of safety, presence, and being held.",
      chooseWhen: ['When you feel airy or ungrounded','To reconnect with safety','To feel anchored to the earth'],
      spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV',
      why: "Your reading: *root pulsing but unstable, lack of full safety or belonging*. This is the canonical root session — 34 minutes of low-Hz grounding before any other work in the body. Start here.",
      intention: "I let the bed hold the weight my body has been carrying alone."
    },
    'root-grounded-presence': {
      art: 'assets/sessions/root-grounded-presence.webp',
      heading: 'Root | Grounded Presence',
      subtitle: '7 min · Alpha-state anchoring',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form',
      lede: "A short root-chakra session for daily use. Seven minutes of alpha-state anchoring — short enough to do mid-morning, deep enough to register.",
      chooseWhen: ['As a daily root-check', 'Before a difficult conversation', 'When restlessness rises'],
      spotify: '',
      why: "Pair this with the 34-min Stability piece. Your root needs *repetition*, not depth — the unstable pulse is asking for steady contact, not one big session. Seven minutes most days is the medicine.",
      intention: "I check in with the ground. The ground checks back."
    },
    'beloved-earth': {
      art: 'assets/sessions/beloved-earth.webp',
      heading: 'Beloved Earth',
      subtitle: '5 min · Alpha · Soundscape',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '',
      lede: "A five-minute alpha-frequency soundscape rooted in low-Hz earth tones. Brief, immersive, and tuned to the felt-sense of being beloved by the planet you stand on.",
      chooseWhen: ['As a morning opener', 'Between meetings', 'To remember the earth is here'],
      spotify: '',
      why: "Your kidneys read low (*fatigue, fear processing*) and your stomach is tense (*holding unspoken worries*). Five minutes of low-frequency earth-tone is small enough to actually do — and exactly what an over-thinking body needs to remember the floor is real.",
      intention: "I let the earth hold the part of me that's tired of holding itself."
    },
    'polarity': {
      art: 'assets/sessions/polarity.webp',
      heading: 'Polarity',
      subtitle: '7 min · Delta · Root harmonics',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Frequency', catClass: 'cat-frequency', collection: '46.2 Hz',
      lede: "Seven minutes of delta-state grounding tuned to 46.2 Hz. The session works the polarity inherent in the body — head and feet, breath in and out, here and there — and lets the field find its own midline.",
      chooseWhen: ['When you feel split or pulled in two directions', 'Before evening rest', 'For Spiral Navigator practice'],
      spotify: '',
      why: "You are *in transition between Reason (440) and Love (500)* — between intellectual coherence and emotional integration. Polarity work doesn't pick a side; it lets the in-between be the work. Right session for someone who lives at the seam of registers.",
      intention: "I let the two halves of me be in conversation, without choosing which one wins."
    },

    // ── WEEK 2 — Receive, Don't Pour (heart inflow for over-giving) ──
    'heart-boundless-compassion': {
      art: 'assets/sessions/heart-boundless-compassion.webp',
      heading: 'Heart | Boundless Compassion',
      subtitle: '7 min · Alpha · Heart chakra',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form',
      lede: "A direct heart-chakra session — seven minutes of alpha-state expansion that practices compassion *received*, not given. Short enough to slip into a workday; deep enough to land.",
      chooseWhen: ['When you feel emptied out', 'After caregiving', 'To practice receiving compassion'],
      spotify: '',
      why: "Your reading: *heart fully expanded but inflow/outflow uneven — you give more than you receive*. The body needs practice receiving compassion before it can keep giving without depleting. Notice this is short on purpose — receiving doesn't need to be earned through length.",
      intention: "I let compassion arrive without earning it. I receive what I'm always trying to give."
    },
    'body-scan': {
      art: 'assets/sessions/body-scan.webp',
      heading: 'Body Scan | NSDR',
      subtitle: 'Non-Sleep Deep Rest · 21 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Guided', catClass: 'cat-guided', collection: '',
      lede: "Replenish energy by entering low-frequency brain waves. NSDR moves attention through the body, using breath to relax. The session slows spinning thoughts and opens a state of deep rest.",
      chooseWhen: ['In the morning to start calmly','Before bed for deeper sleep','To ease an overstimulated nervous system'],
      spotify: '',
      why: "Your reading explicitly names *intestines stagnant, stomach tense, kidneys low*. NSDR asks nothing of you — it is 21 minutes of pure receiving while the autonomic system resets. The exact medicine for an over-giving heart. Don't try to do this well.",
      intention: "I let myself be taken care of without needing to give anything back."
    },
    'soar-into-aliveness': {
      art: 'assets/sessions/soar-into-aliveness.webp',
      heading: 'Soar Into Aliveness',
      subtitle: '14 min · Alpha · Heart',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork',
      lede: "Fourteen minutes of alpha-state heart expansion — breath-led, gently energizing. The session invites your aliveness to come back to its own source, rather than be sent outward at others.",
      chooseWhen: ['When your spark feels handed out', 'To re-feed your own field', 'After a giving-heavy stretch'],
      spotify: '',
      why: "Your reading names heart *fully expanded* but inflow uneven. This session is heart-direct without pulling more outflow — the aliveness comes back toward you, not away. Pairs well with Body Scan: NSDR rests, this re-feeds.",
      intention: "My aliveness can land in me before it leaves through me."
    },
    'acceptance': {
      art: 'assets/sessions/acceptance.webp',
      heading: 'Acceptance',
      subtitle: '16 min · Alpha · Heart',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Guided', catClass: 'cat-guided', collection: '',
      lede: "Sixteen minutes of alpha-state heart practice tuned to the felt-sense of acceptance — of self, situation, and the in-between place before the next thing.",
      chooseWhen: ['Mid-transition', 'When you feel between identities', 'During a recalibration phase'],
      spotify: '',
      why: "Your Hawkins reading puts you at 440 (Reason), oscillating toward 500 (Love). Acceptance is literally the 350 Hawkins tier — the prerequisite step the mind sometimes tries to skip. Sitting here makes the climb to Love feel less like effort, more like settling.",
      intention: "I accept where I actually am, not where I think I should be."
    },

    // ── WEEK 3 — Voice the Held (Throat-Solar axis, the Primary Block) ──
    'truth-throat': {
      art: 'assets/sessions/truth-throat.webp',
      heading: 'Truth | Throat',
      subtitle: 'Speak What Wants Speaking · 34 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz',
      lede: "The canonical throat-chakra session — 34 minutes of alpha-state vibration tuned to the field of authentic expression. Designed for systems that have been editing themselves.",
      chooseWhen: ['When something true wants to come out', 'Before a hard conversation', 'For self-editing patterns'],
      spotify: '',
      why: "This is the direct answer to your Primary Block. Your throat is *compressed — held by self-editing and external expectations*. Thirty-four minutes at the throat without an instruction to perform anything. Whatever rises is allowed.",
      intention: "What I've been editing out is allowed to surface. I don't have to say it yet."
    },
    'liberated-expression': {
      art: 'assets/sessions/liberated-expression.webp',
      heading: 'Throat | Liberated Expression',
      subtitle: '7 min · Alpha · Throat',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form',
      lede: "A short alpha-state throat-chakra session — seven minutes that pair listening and speaking as one motion. Especially supportive before a real conversation.",
      chooseWhen: ['Before a hard conversation', 'For listening practice', 'When the editor is loud'],
      spotify: 'https://open.spotify.com/track/2vghyFSgChsZP554bkyBrG',
      why: "Pair this with the 34-min Truth piece. *Liberated expression includes liberated listening* — your reading notes the throat is held by *external expectations*; that constraint loosens when the throat learns it can listen as much as speak.",
      intention: "I make space for what I hear before I decide what I say."
    },
    'renewal-417': {
      art: 'assets/sessions/renewal-417.webp',
      heading: 'Renewal | 417 Hz',
      subtitle: 'Heart-throat coherence · 9 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I',
      lede: "417 Hz is the Solfeggio frequency associated with undoing situations and facilitating change. This nine-minute beta-state session bridges the heart and throat — your heart expansive, your throat compressed.",
      chooseWhen: ['When the heart speaks but the voice cant', 'To dissolve old expression patterns', 'Mid-week recalibration'],
      spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP',
      why: "Your reading shows heart fully expanded AND throat compressed — they're out of phase. 417 Hz is the bridge frequency that helps the heart's signal reach the voice without being filtered by the editor.",
      intention: "What my heart says, my voice can mean."
    },
    'will-solar-plexus': {
      art: 'assets/sessions/will-solar-plexus.webp',
      heading: 'Will | Solar Plexus',
      subtitle: 'Reclaim personal power · 34 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz',
      lede: "The canonical solar-plexus session — 34 minutes tuned to the field of personal power. Designed for systems where will has been given away or held back.",
      chooseWhen: ['When power has been outsourced', 'For identity reorganization', 'After saying yes when you meant no'],
      spotify: '',
      why: "Your reading: solar plexus is *distorted — identity conflict or power inversion: power given away or withheld*. This is the OTHER half of your Primary Block (throat-SOLAR axis). The throat compresses partly because the solar isn't claiming itself. This session works the source.",
      intention: "I reclaim what I've been giving away or holding back. The will lives in me."
    },

    // ── WEEK 4 — Spiral Home (embodied integration) ──
    'cacaosito': {
      art: 'assets/sessions/cacaosito.webp',
      heading: 'Cacaosito',
      subtitle: '8 min · Delta · Sacral',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Immersive Music', catClass: 'cat-music', collection: '',
      lede: "Eight minutes of delta-state sacral immersion. A small, warm, ceremonial piece — the felt-sense of cacao without drinking it, the body's own sweetness.",
      chooseWhen: ['For sacral creative warmth', 'Evening reflection', 'When you want to feel yourself'],
      spotify: '',
      why: "Your sacral is the healthy one — *warm, fluid, creative, strong subconscious movement*. This session feeds it instead of correcting it. Week four is about integration, and integration starts with what's already working.",
      intention: "I let the part of me that's already alive show me how to live the rest."
    },
    'equinox': {
      art: 'assets/sessions/equinox.webp',
      heading: 'Equinox',
      subtitle: 'Balance · 18 min · Delta',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '',
      lede: "Eighteen minutes of delta-state field-work tuned to the felt-sense of equinox — the moment of perfect balance between two halves of the year.",
      chooseWhen: ['For Hawkins-tier transitions', 'When two states are equally true', 'For integration practice'],
      spotify: '',
      why: "Equinox is literally the metaphor of your reading: in transition between Reason and Love, between Visionary Resonance (gift) and Embodied Expression (challenge). Sit in the balance point itself rather than rushing past it.",
      intention: "I let the balance point be its own destination."
    },
    'open-path-741': {
      art: 'assets/sessions/open-path-741.webp',
      heading: 'Open Path | 741 Hz',
      subtitle: 'Clear the static · 9 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II',
      lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The vibrations move through you like a breeze clearing the inner landscape.",
      chooseWhen: ['To clear mental clutter','When starting a new project','To create space for new intentions'],
      spotify: '',
      why: "Your crown is *open but overactive — receiving more than grounding*. 741 Hz clears the mental field of what isn't yours. The closer to integration you get, the more important this becomes — you don't want crown noise leaking into the integrated body.",
      intention: "I clear the channel so the next thing has room to arrive."
    },
    'conscious-to-subconscious': {
      art: 'assets/sessions/conscious-to-subconscious.webp',
      heading: 'Conscious to Subconscious',
      subtitle: '7 min · Alpha · Heart',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Guided', catClass: 'cat-guided', collection: '',
      lede: "Seven minutes of alpha-state passage between the daytime mind and the subconscious. A short bridge session, often used before sleep or before a creative session.",
      chooseWhen: ['Before sleep', 'Before creative work', 'When the deeper layer is ready to speak'],
      spotify: '',
      why: "Your reading: sacral *strong subconscious movement, recent emotional processing*. This session is the bridge between the conscious you (which has been doing all the holding) and the subconscious you (which is already moving). Closes the four weeks by listening to what was actually happening underneath.",
      intention: "I let the deeper layer of me show me what it's been processing."
    }
  },

  prompts: {
    'stability-root':           { before: "Where in your body do you feel airy, unsafe, or restless right now?", after: "Where did weight settle? What does the floor underneath you feel like now?" },
    'root-grounded-presence':   { before: "What part of the day has been most ungrounding?", after: "What anchored? What is still asking to be checked back into?" },
    'beloved-earth':            { before: "What worry came in with you today?", after: "Did anything in your stomach or kidneys soften? Did anything stay tight?" },
    'polarity':                 { before: "What two parts of you are pulling in different directions right now?", after: "What's the midline between them feel like? Did it choose for you or did you choose?" },

    'heart-boundless-compassion': { before: "Who have you been giving compassion to without getting much back?", after: "Did anything land for you? Where in your chest did it land?" },
    'body-scan':                  { before: "What part of you came in needing to take care of someone or something?", after: "Where did your body rest the deepest? Did anything stay locked?" },
    'soar-into-aliveness':        { before: "On a scale of 1-10, how much of your aliveness today went outward vs. stayed with you?", after: "Did anything come back toward you? Where did it land?" },
    'acceptance':                 { before: "What part of your current situation are you still arguing with?", after: "What got easier to be in? What's still asking for a fight?" },

    'truth-throat':           { before: "What is something true you haven't said aloud lately?", after: "What part of you feels heard now? What still needs space?" },
    'liberated-expression':   { before: "What conversation is coming up where you're already pre-editing?", after: "What did you hear, in yourself or the room? Did the editing soften?" },
    'renewal-417':            { before: "Where is your heart saying one thing and your voice saying another?", after: "Where did the two come into the same room? What's still out of phase?" },
    'will-solar-plexus':      { before: "Where in your life are you giving your power away or holding it back?", after: "What part of you feels owned now? Where is the power sitting in your body?" },

    'cacaosito':              { before: "Where does your body feel its own sweetness today?", after: "What part of you got fed without you arranging it?" },
    'equinox':                { before: "What two states of yours are both equally true right now?", after: "Did the balance point feel like a destination or a passage?" },
    'open-path-741':          { before: "What thought-loops have been crowding your head this week?", after: "What's open now that wasn't before? What direction is calling?" },
    'conscious-to-subconscious': { before: "What does the part of you that hasn't been speaking want to say?", after: "What did the deeper layer show you? Did anything surface that you forgot was processing?" }
  },

  plan: [
    { week: 1, title: 'Land in Safety',     intent: "Ground the unstable root. Pulse but unstable wants steady contact, not big sessions. Don't pile crown content on a system already over-saturated.", responds: 'Root pulsing but unstable · crown open but receiving more than grounding · stomach tense holding worries · kidneys low resonance', sessions: ['stability-root','root-grounded-presence','beloved-earth','polarity'] },
    { week: 2, title: "Receive, Don't Pour", intent: "Heart inflow practice. The heart needs to learn to take in, not just give. NSDR + heart-direct practice + Acceptance as the Hawkins-tier step.", responds: 'Heart fully expanded but uneven inflow/outflow — gives more than receives · Hawkins 440 (Reason) oscillating toward 500 (Love) · spleen neutral · liver overload', sessions: ['heart-boundless-compassion','body-scan','soar-into-aliveness','acceptance'] },
    { week: 3, title: 'Voice the Held',     intent: 'Directly address the Primary Block — Throat-Solar Plexus axis. Open the throat through use, not effort. Reclaim the solar half of the axis too.', responds: 'Throat compressed · solar plexus distorted (identity conflict / power inversion) · liver overload (unprocessed anger or empathy) · "I know what I must express, but I fear the consequence of speaking it"', sessions: ['truth-throat','liberated-expression','renewal-417','will-solar-plexus'] },
    { week: 4, title: 'Spiral Home',        intent: "Integration of the Spiral Navigator archetype. Feed the sacral that's already alive. Sit in the equinox between Reason and Love. Bring the crown's knowing down into embodied expression.", responds: 'Sacral warm/fluid/creative · subconscious movement · Hawkins 440→500 transition · Greatest gift: Visionary Resonance · Greatest challenge: Embodied Expression', sessions: ['cacaosito','equinox','open-path-741','conscious-to-subconscious'] }
  ],

  /* Chakra states (same as v1.9.13 — mapping from her reading's chakra
     scan into the 7 canonical animation states). */
  chakraStates: [
    { id: 'crown',     label: 'Crown',        state: 'carrying-a-lot', yPct: 7,  note: 'Open but overactive — receiving more than grounding' },
    { id: 'third-eye', label: 'Third Eye',    state: 'clear',          yPct: 14, note: 'Clear, slightly shielded — protecting vision' },
    { id: 'throat',    label: 'Throat',       state: 'undercharged',   yPct: 22, note: 'Compressed — truth held under self-editing' },
    { id: 'heart',     label: 'Heart',        state: 'radiant',        yPct: 36, note: 'Fully expanded — but inflow uneven; over-gives' },
    { id: 'solar',     label: 'Solar Plexus', state: 'consolidating',  yPct: 48, note: 'Distorted resonance — identity in active reorganization' },
    { id: 'sacral',    label: 'Sacral',       state: 'clear',          yPct: 60, note: 'Warm, fluid, creative — strong subconscious movement' },
    { id: 'root',      label: 'Root',         state: 'stabilizing',    yPct: 76, note: 'Pulsing but unstable — seeking full safety' }
  ],

  /* Held in reserve — direct crown / third-eye work. Amber's crown is
     already over-saturated, so these are explicitly NOT in the 4-week
     plan. Each `held` reason references her reading's specific crown
     and third-eye situation. */
  heldInReserve: [
    {
      slug: 'interbeing-crown',
      name: 'Interbeing | Crown',
      heading: 'Interbeing | Crown',
      subtitle: 'Direct crown work · 34 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening',
      chakra: 'crown',
      art: 'assets/sessions/interbeing-crown.webp',
      lede: "The canonical crown-chakra session — 34 minutes of gamma-state vibration tuned to the field of unity consciousness and dissolved separation.",
      chooseWhen: ['Once the root is steadier', 'For unity-consciousness practice', 'When the lower body is online'],
      note: 'direct crown work, 34 min',
      held: "Your crown is already over-saturated — *receiving more than grounding*. Direct crown work right now would feed the imbalance we're trying to correct. Re-evaluate once Week 3's throat-solar work has landed."
    },
    {
      slug: 'transcend-soul-star',
      name: 'Transcend | Soul Star',
      heading: 'Transcend | Soul Star',
      subtitle: '34 min · Gamma · Above-crown',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening',
      chakra: 'crown',
      art: 'assets/sessions/transcend-soul-star.webp',
      lede: "A 34-minute gamma-state session tuned to the soul-star chakra — the field above the crown. For systems already practiced in non-dual states.",
      chooseWhen: ['After the lower chakras stabilize', 'For above-crown practice', 'When ready for non-dual rest'],
      note: 'above-crown · 34 min · gamma',
      held: "Soul-star work asks the lower body to already be online. Your root is pulsing but unstable — too early. The Spiral Navigator archetype lives partly in this register, but the work this month is bringing the cosmic *down* into the body, not expanding further up."
    },
    {
      slug: 'vision-third-eye',
      name: 'Vision | Third Eye',
      heading: 'Vision | Third Eye',
      subtitle: '34 min · Direct third-eye',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening',
      chakra: 'third-eye',
      art: 'assets/sessions/vision-third-eye.webp',
      lede: "The canonical third-eye session — 34 minutes of gamma-state vibration tuned to inner vision and the field of pattern-perception.",
      chooseWhen: ['Once the protective shielding is understood', 'For Visionary Resonance practice', 'When ready for direct inner-sight work'],
      note: 'direct third-eye · 34 min',
      held: "Your third-eye is *clear but slightly shielded — protecting vision or mistrust of perceived reality*. Opening the aperture before the shielding is understood would push past the protection rather than work with it. Add later, after the lower work."
    },
    {
      slug: 'highest-timeline-963',
      name: 'Highest Timeline | 963 Hz',
      heading: 'Highest Timeline | 963 Hz',
      subtitle: '9 min · Beta · 963 Hz crown ceiling',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II',
      chakra: 'crown',
      art: 'assets/sessions/highest-timeline-963.webp',
      lede: "963 Hz — the highest Solfeggio tone, associated with crown opening and timeline coherence. Nine minutes of beta-state ceiling work.",
      chooseWhen: ['When timeline-level clarity is asked for', 'After the throat-solar axis opens', 'For Spiral Navigator integration work'],
      note: '963 Hz crown ceiling · 9 min',
      held: "963 Hz lives at the ceiling of the field. You're already operating high up — *crown over-active*. The right move is to come *down* into the body first. Save this for a later month."
    },
    {
      slug: 'pineal-aperture',
      name: 'Pineal Aperture',
      heading: 'Pineal Aperture',
      subtitle: 'Third-eye attunement · 30 min',
      artist: 'Sam Bottner', portrait: SAM_PORTRAIT,
      category: 'Guided', catClass: 'cat-guided', collection: '',
      chakra: 'third-eye',
      art: 'assets/sessions/pineal-aperture.webp',
      lede: "An attunement to the pineal — the third-eye gateway. Subtle, slow, 30 minutes of delta-state inner-vision practice. Best done after the body is grounded.",
      chooseWhen: ['Once the root is steadier', 'For inner-vision practice', 'When seeking clarity through stillness'],
      note: 'third-eye attunement · 30 min',
      held: "Your third-eye is already clear-but-shielded, and the root is unstable. Pineal opening on an unstable root pushes consciousness up rather than down. Add this once the root has been steady for several weeks."
    }
  ],

  /* Map session slugs to chakras for the delight-pulse on resolve.
     v1.9.18: Amber's NEW session pool — each slug maps to its primary
     working chakra (not necessarily the audio's dominant body-zone). */
  slugToChakra: {
    'stability-root':              'root',
    'root-grounded-presence':      'root',
    'beloved-earth':               'root',
    'polarity':                    'root',
    'heart-boundless-compassion':  'heart',
    'body-scan':                   'heart',
    'soar-into-aliveness':         'heart',
    'acceptance':                  'heart',
    'truth-throat':                'throat',
    'liberated-expression':        'throat',
    'renewal-417':                 'throat',
    'will-solar-plexus':           'solar',
    'cacaosito':                   'sacral',
    'equinox':                     'sacral',
    'open-path-741':               'crown',
    'conscious-to-subconscious':   'heart'
  }
};
