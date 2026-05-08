/* User data file for Ramon.
   Loaded by index.html when the URL contains ?u=ramon-r9k2x

   To add another user:
     1. Copy this file: public/users/<their-slug>.js
     2. Replace the values below with their reading + 16-session map + 32 prompts.
     3. The user's link is: https://<your-pages-domain>/?u=<their-slug>
        Pick an obscure slug (e.g. firstname-r9k2x). URLs leak via referer / history,
        so don't use predictable slugs in production.
   The HTML, CSS, and behavior are shared. Only this file changes per user.
*/

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'ramon-r9k2x',
  displayName: 'Ramon',
  period: 'April 2026',
  portrait: 'assets/portraits/ramon.jpg',

  /* Structured fields parsed from `reading` for the dashboard visuals.
     If absent, the dashboard falls back to defaults / parses the raw text. */
  auricMeters: 13.4,                      // ORIC FIELD extent
  hawkinsLevel: 525,                      // current vibrational calibration
  hawkinsTarget: 528,                     // 528 Hz Miracles, the resonant target
  dna: { phaseLocked: 9, consolidating: 3, of: 12 },
  primaryBlockQuote: 'Hesitation in finalizing commitments.',
  archetype: 'Harmonic Guardian of the Inner Return',


  reading: `🜂 ORIC FIELD
Your auric field extends 13.4 meters, a perfect Fibonacci harmonic. This suggests you are in a phase of coherence expansion, likely due to recent integrations (perhaps related to your medallion work).
Field Status: Symmetrical but pulsating in triadic waves.
Notable Observation: A subtle golden spiral is emerging from the top of your field, indicative of higher integration.

🜁 DNA STRAND ACTIVATION
12 strands are partially online, with 9 fully phase-locked. This means you are operating with multidimensional awareness, but not all timelines are fully collapsed into coherence yet.
Suggested Integration: Breathwork with 3-6-9 pattern to stabilize remaining strands.

🜃 CHAKRA SCAN
Crown (Sahasrara): Open, receiving high-frequency codes, slight oversaturation.
Third Eye (Ajna): Clear, but filtering more data than usual, recommend grounding.
Throat (Vishuddha): Expanding, finally releasing old constraints around truth-speaking.
Heart (Anahata): Radiant, emitting green-gold harmonic, primary coherence source.
Solar Plexus (Manipura): Stabilizing, recent spikes in willpower integration.
Sacral (Svadhisthana): Holding space for creative rebirth, linked to harmonic feminine.
Root (Muladhara): Undercharged, requires more earth resonance.

🜄 ORGANIC FIELD
Liver: Detox wave detected, processing emotional overload.
Lungs: Clear, but rapid breathing patterns noted, may indicate integration stress.
Heart: Strong, overcompensating for lower chakra instability.
Kidneys: Recovering, fear-based residue still present.

🜅 VIBRATIONAL LEVEL (Hawkins Scale)
You are currently vibrating at 525, Love and Integration. This is a transition point between personal transcendence and universal service.

🜆 PRIMARY BLOCK TO AUTHENTICITY
Residual fear of timeline collapse, specifically a subconscious resistance to fully embodying the role you've already accepted. This manifests as: hesitation in finalizing commitments, micro-doubt in the midst of immense clarity, and a minor echo of "unworthiness" still embedded in the lower chakras.

🜇 ARCHETYPE
You are functioning as a Harmonic Guardian of the Inner Return. Your greatest gift is the ability to hold a mirror of coherence so precise that others cannot remain fragmented in your presence. Your greatest challenge: to believe you are already what you seek to become.`,

  sessions: {
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.jpg', heading: 'Welcome to Opus', subtitle: 'Discover SoundBed.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'To set the somatic baseline'], spotify: '', why: "First-session orientation. Sets the somatic baseline before we ask anything of the body.", intention: "Let me arrive without needing to do anything yet." },
    'stability-root': { art: 'assets/sessions/stability-root.jpg', heading: 'Stability | Root', subtitle: 'Feel Grounded', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root chakra, associated with the earth element and linked to feelings of security and stability.", chooseWhen: ['When you feel airy or ungrounded','To reconnect with safety','To feel anchored to the earth'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your Input flagged the root as undercharged. Start here. 432 Hz is a softer entry than the Solfeggio set.", intention: "I let the bed hold the weight my body has been carrying." },
    'earth-awareness': { art: 'assets/sessions/earth-awareness.jpg', heading: 'Earth Awareness | Alpha Waves', subtitle: 'Ground Your Energy and Attune to Nature', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural I', lede: "An Alpha brainwave session that invites you into meditative receptivity. Plant your roots into Earth's heartbeat, the Schumann resonance.", chooseWhen: ['As part of your morning routine','Prior to meditation','To connect with nature'], spotify: 'https://open.spotify.com/album/1V1NjXA4HN8WqFfJhPYl9a', why: "Alpha state lets you settle without flooding the upper chakras. Your Input asked for *more earth resonance*, and this is the simplest way in.", intention: "I plant down. Whatever is restless can rest on the ground." },
    'body-scan': { art: 'assets/sessions/body-scan.jpg', heading: 'Body Scan | NSDR', subtitle: 'Non-Sleep Deep Rest', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Replenish energy by entering low-frequency brain waves. Move attention through the body, using the breath to relax. NSDR slows the spinning thoughts and opens a state of deep rest.", chooseWhen: ['In the morning to start calmly','Before bed for deeper sleep','To ease an overstimulated nervous system'], spotify: '', why: "Body awareness without symbolic content. NSDR is a reliable nervous-system reset, which speaks to the breath notes in your Input.", intention: "I listen to my body the way I'd listen to a friend who hasn't been heard." },
    'fearless-396': { art: 'assets/sessions/fearless-396.jpg', heading: 'Fearless | 396 Hz', subtitle: 'Release Heaviness and Stagnation.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Aids in the transcendence of guilt and fear blocks, opening the pathways for self-love and personal empowerment. 396 Hz can also help when moving through grief.", chooseWhen: ['During significant life changes','To calm your nervous system','For processing and releasing sadness'], spotify: 'https://open.spotify.com/track/0IVgsgwsl2l8amzrgKWtPE', why: "396 Hz is the frequency most associated with releasing fear at the root. It matches the kidney-residue and timeline-collapse threads in your Input.", intention: "I let the old fear leave through my breath. It doesn't have to come with me." },
    'ease-174': { art: 'assets/sessions/ease-174.jpg', heading: 'Ease | 174 Hz', subtitle: 'Invite Comfort and Relief to Your Body', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "A Solfeggio tone session for soothing aches and pains, bringing you into a state of effortless ease.", chooseWhen: ['When physical discomfort arises','For supporting injury recovery','To clarify what you want'], spotify: 'https://open.spotify.com/album/0IZxiSGDAIlQQTCN6V9gQD', why: "174 Hz is the lowest Solfeggio tone, traditionally used for body comfort. A good companion to the *liver detox* thread.", intention: "The places that hurt are allowed to soften. Nothing is being asked to perform." },
    'fire-cleanse': { art: 'assets/sessions/fire-cleanse.jpg', heading: 'Fire Cleanse', subtitle: 'Release What No Longer Serves', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A calming organic soundscape. Immerse yourself in the felt experience of fire as it burns away any dead wood you're ready to let go.", chooseWhen: ['For evening relaxation','During significant life changes','To focus your intention'], spotify: 'https://open.spotify.com/track/41CRQAOids2p4yDhn8yWqq', why: "A second pass at release, without frequency or guidance. Sometimes the body lets go more inside a soundscape than inside an instruction.", intention: "I burn what I'm done carrying. I keep the warmth." },
    'sending-mark-home': { art: 'assets/sessions/sending-mark-home.jpg', heading: 'Sending Mark Home', subtitle: 'Reflect, Feel, and Let Go.', artist: 'The Human Experience', portrait: 'assets/artists/the-human-experience.jpg', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "Introspective and emotionally direct, this session is an invitation to feel. Let yourself soften and surrender into your heart with \"Sending Mark Home.\"", chooseWhen: ['To process and feel through memories','To feel your present emotion deeply',"When seeking clarity about what's next"], spotify: 'https://open.spotify.com/track/2QEBaJSZmBHtJ4XQr9zLRs', why: "One of the most direct *let-go* pieces in the catalog. A softer close to the release week.", intention: "I let myself feel what's been waiting at the edges." },
    'heart-focus': { art: 'assets/sessions/heart-focus.jpg', heading: 'Heart Focus', subtitle: 'Foster a Deeper Heart Connection', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "A short breathwork session bringing focus to your heart. Coherent breathing connects you with the intuitive knowledge in your chest, releases physical and emotional stressors, and shifts your state from stress to peace in 4 deep breaths.", chooseWhen: ['To re-center during the work day','When feeling confused','To relieve stress'], spotify: 'https://open.spotify.com/track/6g5a5V8apyHEJY2j9QqYum', why: "Direct heart practice. Your Input called this your strongest center. Feed it instead of fixing it.", intention: "I bring my attention home to my chest and stay a few breaths longer than usual." },
    'coherence-639': { art: 'assets/sessions/coherence-639.jpg', heading: 'Coherence | 639 Hz', subtitle: 'Tune Into Harmony Within and Around You', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection, emotional balance, and harmonious relationships. The session brings your system into coherence, syncing mind and body with a deeper rhythm of ease.", chooseWhen: ['To calm emotional tension','When you want to feel more connected','To restore internal balance'], spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP', why: "639 Hz is the Solfeggio tone associated with heart coherence. It lands close to the *525 / Love & Integration* note in your Input.", intention: "I listen for the rhythm underneath everything I'm trying to manage." },
    'liberated-expression': { art: 'assets/sessions/liberated-expression.jpg', heading: 'Liberated Expression | Throat', subtitle: 'Deepen Communication and Listening', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Bring balance to your energetic center of authentic expression and attuned listening. This chakra is connected to your physical vocal cords, ears, and thyroid gland. Clarify it and your gifts and vision can grace the world.", chooseWhen: ['To free self-expression','For landing in the present moment','Prior to a significant conversation'], spotify: 'https://open.spotify.com/track/2vghyFSgChsZP554bkyBrG', why: "A throat session that doesn't push. It supports listening as much as speaking, which fits the throat-opening thread in your Input.", intention: "What I haven't said is allowed to come up here. I don't need to do anything with it yet." },
    'toning-with-ancestors': { art: 'assets/sessions/toning-with-ancestors.jpg', heading: 'Toning with the Ancestors', subtitle: 'A Conversation Beyond Words', artist: 'Jade Fusco', portrait: 'assets/artists/jade-fusco.jpg', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Guided by Jade Fusco, this session invites you to connect with your lineage through the power of your voice. By humming, toning, and singing, you offer what your ancestors may need, and open yourself to receive their wisdom and strength. Vibration becomes the bridge.", chooseWhen: ['To explore your voice as healing','When honoring your ancestry','To open the heart before creative or vocal practice'], spotify: '', why: "Vocal toning. The throat opens through *use*, not only through frequency. Optional but worth trying once.", intention: "I let my own voice be the bridge." },
    'heart-hara': { art: 'assets/sessions/heart-hara.jpg', heading: 'Heart-Hara Harmony', subtitle: 'Balance Love and Vitality', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "An invitation to balance your heart and hara centers, uniting the emotional depth of love with the vibrant energy of creativity and life force. Feel the heart's compassion flow as the hara anchors you with vitality.", chooseWhen: ['To harmonize emotion with creative energy','When you seek balance and grounding','To cultivate alignment and vitality'], spotify: 'https://open.spotify.com/track/5NNprGnrnUrWpxcIkxitcD', why: "Bridges the heart and the hara (sacral and solar region). A direct answer to the feminine-meets-willpower thread in your Input.", intention: "My heart and my belly can talk to each other without me arranging it." },
    'flow-sacral': { art: 'assets/sessions/flow-sacral.jpg', heading: 'Flow | Sacral', subtitle: 'Unlock Your Creative Flow', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Dedicated to the sacral chakra, also known as the lower dan tian, linked to sensuality, creative energy, and the transition from survival mode to creation consciousness.", chooseWhen: ['To awaken creative inspiration','When transitioning from survival to creation','To connect with your deepest desires'], spotify: 'https://open.spotify.com/track/7aasWE5DWAENpEczNufTrN', why: "The *creative rebirth* note from your Input made this one obvious.", intention: "Something wants to be made through me. I make space for it without naming it." },
    'sunmerge-174': { art: 'assets/sessions/sunmerge-174.jpg', heading: 'Sunmerge | 174 Hz', subtitle: 'Dissolve Tension, Absorb the Light', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Designed to soothe body and mind at a cellular level. Bathed in glowing ambient soundscapes, you'll feel the grounding properties of the 174 Hz Solfeggio frequency.", chooseWhen: ['To unwind after exertion','When you need to release tension','To prepare for restful sleep'], spotify: 'https://open.spotify.com/track/6MKA9DsEtfyxbxv4lyaw8d', why: "Closes the loop on body comfort while reaching toward integration.", intention: "I let the day's tension dissolve. I don't have to track where it goes." },
    'open-path-741': { art: 'assets/sessions/open-path-741.jpg', heading: 'Open Path | 741 Hz', subtitle: 'Let Go of the Static. Step Into Clear Air', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The session helps release what weighs on the mind and makes space for fresh energy. The vibrations move through you like a breeze clearing the inner landscape.", chooseWhen: ['To clear mental clutter','When starting a new project','To create space for new intentions'], spotify: '', why: "The lede line, *let go of the static, step into clear air*, lands close to the \"hesitation in finalizing commitments\" line in your Input. A clean closing session.", intention: "I clear what I've been holding so the next step has room to arrive." }
  },

  prompts: {
    'welcome-to-opus':       { before: "Before you've done anything yet, what does your body feel like in this moment?", after: "What did you notice as the bed met you for the first time?" },
    'stability-root':        { before: "Where in your body do you feel airy or untethered right now?", after: "Where did weight settle? What does the ground underneath you feel like?" },
    'earth-awareness':       { before: "What's still loud in your body or your mind as you arrive?", after: "What got quieter when you tuned to Earth? What's still humming?" },
    'body-scan':             { before: "Where is your attention right now: on your body, or somewhere else?", after: "What part of you got the most rest? Anywhere stay locked?" },
    'fearless-396':          { before: "What fear or hesitation has been the loudest in you this week?", after: "What did you let go of? What's still here that didn't move?" },
    'ease-174':              { before: "Where does your body hurt or ache today?", after: "What softened? What place is still asking for more?" },
    'fire-cleanse':          { before: "What are you ready to be done carrying?", after: "What burned away? What did you keep, that you didn't expect to?" },
    'sending-mark-home':     { before: "What feeling has been waiting at the edges of your week?", after: "What did you feel without trying? What surprised you about it?" },
    'heart-focus':           { before: "How present is your heart to you right now: feeling it, or thinking about it?", after: "What changed in your chest? What did your heart say without words?" },
    'coherence-639':         { before: "What relationship is on your mind today, with yourself or someone else?", after: "Where did coherence land? What got softer toward whom?" },
    'liberated-expression':  { before: "What is something you haven't said aloud lately?", after: "What part of you feels heard now? What still needs space?" },
    'toning-with-ancestors': { before: "Whose voice or lineage are you carrying that you haven't named?", after: "What did your own voice teach you? What stayed unspoken?" },
    'heart-hara':            { before: "Where does your creative energy live in your body right now?", after: "What conversation happened between your heart and your belly?" },
    'flow-sacral':           { before: "What wants to be made or moved through you, even if you can't name it?", after: "What started moving? What was already moving but you hadn't noticed?" },
    'sunmerge-174':          { before: "What tension has been with you across all four weeks?", after: "What dissolved? What stayed because it isn't ready to leave yet?" },
    'open-path-741':         { before: "What are you ready to clear so the next 30 days have room?", after: "What is open now that wasn't before? What direction is calling?" }
  },

  plan: [
    { week: 1, title: 'Land the Body', intent: "Ground first. Don't pile crown content on a system already oversaturated.", responds: 'Root undercharged · third-eye filtering more data than usual · "minor echo of unworthiness in lower chakras" · new to SoundBed', sessions: ['welcome-to-opus','stability-root','earth-awareness','body-scan'] },
    { week: 2, title: 'Release the Residue', intent: "Make room. Let the body unload what it's already finished with.", responds: 'Liver detox wave · kidneys recovering / fear-based residue · "fear of timeline collapse" as primary block', sessions: ['fearless-396','ease-174','fire-cleanse','sending-mark-home'] },
    { week: 3, title: 'Heart Coherent, Voice Open', intent: 'Feed what is already strong. Support what is already opening.', responds: 'Heart radiant emitting green-gold (primary coherence source) · throat finally releasing constraints around truth-speaking · Hawkins 525 = Love & Integration', sessions: ['heart-focus','coherence-639','liberated-expression','toning-with-ancestors'] },
    { week: 4, title: 'Integration & Creative Flow', intent: "Let the loop close. Move toward what's next.", responds: 'Sacral holding space for creative rebirth · solar plexus stabilizing · "hesitation in finalizing commitments" · golden spiral integration signature', sessions: ['heart-hara','flow-sacral','sunmerge-174','open-path-741'] }
  ],

  /* Chakra states parsed from this user's reading. Order = energetic ascent.
     States renamed in felt-sense language:
       oversaturated → carrying-a-lot
       expanding → consolidating
     Each chakra hot-spot is positioned on the silhouette's body anatomy as { yPct } of body height. */
  chakraStates: [
    { id: 'crown',     label: 'Crown',        state: 'carrying-a-lot', yPct: 7,  note: 'Open, carrying a lot' },
    { id: 'third-eye', label: 'Third Eye',    state: 'clear',          yPct: 14, note: 'Clear, filtering more data than usual' },
    { id: 'throat',    label: 'Throat',       state: 'consolidating',  yPct: 22, note: 'Releasing old constraints' },
    { id: 'heart',     label: 'Heart',        state: 'radiant',        yPct: 36, note: 'Radiant green-gold, primary coherence source' },
    { id: 'solar',     label: 'Solar Plexus', state: 'stabilizing',    yPct: 48, note: 'Recent willpower spikes settling' },
    { id: 'sacral',    label: 'Sacral',       state: 'holding',        yPct: 60, note: 'Holding space for creative rebirth' },
    { id: 'root',      label: 'Root',         state: 'undercharged',   yPct: 76, note: 'Quiet, wants more earth resonance' }
  ],

  /* Sessions intentionally not in Week 1-4. Each entry needs a name, artist,
     and a chakra (used to tint the placeholder art tile). The OPUS catalog
     entries here aren't part of Ramon's 30-day arc, so there's no album-art
     asset for them in the repo; we render a chakra-tinted gradient tile. */
  heldInReserve: [
    { name: 'Rest in Love · 852 Hz', artist: 'Sam Bottner', chakra: 'third-eye', note: 'third-eye, universal love' },
    { name: 'Pure Awareness · Crown', artist: 'Sam Bottner', chakra: 'crown',     note: 'direct crown work' },
    { name: 'Pineal Aperture',        artist: 'Sam Bottner', chakra: 'third-eye', note: 'third-eye attunement' },
    { name: 'AUM · 136 Hz',           artist: 'Sam Bottner', chakra: 'crown',     note: 'cosmic attune' },
    { name: 'Bridging Worlds',        artist: 'Sam Bottner', chakra: 'crown',     note: 'Earth / Spirit bridge' }
  ],

  /* Map session slugs to chakras for the delight-pulse on resolve */
  slugToChakra: {
    'stability-root':         'root',
    'earth-awareness':        'root',
    'fearless-396':           'root',
    'ease-174':               'root',
    'fire-cleanse':           'sacral',
    'flow-sacral':            'sacral',
    'sunmerge-174':           'sacral',
    'sending-mark-home':      'heart',
    'heart-focus':            'heart',
    'coherence-639':          'heart',
    'heart-hara':             'heart',
    'liberated-expression':   'throat',
    'toning-with-ancestors':  'throat',
    'open-path-741':          'throat',
    'body-scan':              'crown',
    'welcome-to-opus':        'crown'
  }
};
