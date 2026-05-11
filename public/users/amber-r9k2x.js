/* User data file for Amber Schacter.
   Loaded by index.html when the URL contains ?u=amber-r9k2x

   Mirrors the shape of ramon-r9k2x.js. The HTML, CSS, and behavior
   are shared; only this file (+ the portrait asset) changes per user.
*/

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'amber-r9k2x',
  displayName: 'Amber',
  period: 'May 2026',
  portrait: 'assets/portraits/amber-r9k2x.webp',

  /* Structured fields parsed from `reading` for the dashboard visuals. */
  auricMeters: 9.3,                       // ORIC FIELD diameter
  hawkinsLevel: 440,                      // current vibrational calibration (Reason)
  hawkinsTarget: 528,                     // 528 Hz Miracles — the resonant target
  // "12 strands partially phase-locked … integration between the third and fourth harmonic layers."
  //   layers 1–3 stable = 6 strands phase-locked, layer 4 actively integrating = 3, remaining = 3.
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


  /* The 16 sessions on Amber's map, plus 5 held in reserve. Each entry is a
     real OPUS catalog session. The `why` and `intention` strings are
     personalized to Amber's reading — they reference her throat compression,
     crown over-saturation, root instability, and heart's uneven inflow. */
  sessions: {
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Discover SoundBed.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'To set the somatic baseline'], spotify: '', why: "First-session orientation. Sets the somatic baseline before we ask anything of the body. Especially useful because your reading shows the root pulsing but unstable — we want a clean read of what 'arriving' feels like before week one's grounding work.", intention: "I let myself arrive without performing anything yet." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Feel Grounded', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root chakra, associated with the earth element and linked to feelings of security and stability.", chooseWhen: ['When you feel airy or ungrounded','To reconnect with safety','To feel anchored to the earth'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your Input flagged the root as *pulsing but unstable* — wanting more safety in the body. 432 Hz is the softest entry to that floor. Start here, before any throat or crown work.", intention: "I let the bed hold the weight my body has been carrying alone." },
    'earth-awareness': { art: 'assets/sessions/earth-awareness.webp', heading: 'Earth Awareness | Alpha Waves', subtitle: 'Ground Your Energy and Attune to Nature', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural I', lede: "An Alpha brainwave session that invites you into meditative receptivity. Plant your roots into Earth's heartbeat, the Schumann resonance.", chooseWhen: ['As part of your morning routine','Prior to meditation','To connect with nature'], spotify: 'https://open.spotify.com/album/1V1NjXA4HN8WqFfJhPYl9a', why: "Your crown is open but *receiving more than grounding*. Alpha state pulls the field downward — into the body, into the earth — without flooding the upper centers further. The corrective to crown over-saturation is earth, not more crown.", intention: "I bring my attention down. The ground is the listener now." },
    'ease-174': { art: 'assets/sessions/ease-174.webp', heading: 'Ease | 174 Hz', subtitle: 'Invite Comfort and Relief to Your Body', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "A Solfeggio tone session for soothing aches and pains, bringing you into a state of effortless ease.", chooseWhen: ['When physical discomfort arises','For supporting injury recovery','To clarify what you want'], spotify: 'https://open.spotify.com/album/0IZxiSGDAIlQQTCN6V9gQD', why: "Your stomach reads as tense (*holding unspoken worries*) and intestines stagnant. 174 Hz is the lowest Solfeggio tone, traditionally used for body comfort. Closes week one with the body softening on its own terms.", intention: "The places that hurt are allowed to soften. Nothing is being asked to perform." },

    'body-scan': { art: 'assets/sessions/body-scan.webp', heading: 'Body Scan | NSDR', subtitle: 'Non-Sleep Deep Rest', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Replenish energy by entering low-frequency brain waves. Move attention through the body, using the breath to relax. NSDR slows the spinning thoughts and opens a state of deep rest.", chooseWhen: ['In the morning to start calmly','Before bed for deeper sleep','To ease an overstimulated nervous system'], spotify: '', why: "Your reading: *the heart gives more than it receives*. NSDR asks NOTHING of you — it is forty minutes of pure receiving. The exact medicine for an over-giving heart. Don't try to do this well.", intention: "I let myself be taken care of without needing to give anything back." },
    'heart-focus': { art: 'assets/sessions/heart-focus.webp', heading: 'Heart Focus', subtitle: 'Foster a Deeper Heart Connection', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "A short breathwork session bringing focus to your heart. Coherent breathing connects you with the intuitive knowledge in your chest, releases physical and emotional stressors, and shifts your state from stress to peace in 4 deep breaths.", chooseWhen: ['To re-center during the work day','When feeling confused','To relieve stress'], spotify: 'https://open.spotify.com/track/6g5a5V8apyHEJY2j9QqYum', why: "Your heart is fully expanded but its inflow and outflow are uneven. Coherent breathing equalizes the two. Notice especially the *in* breath — that's the part of you that hasn't been getting equal practice.", intention: "I let the breath come in as fully as it goes out." },
    'heart-hara': { art: 'assets/sessions/heart-hara.webp', heading: 'Heart-Hara Harmony', subtitle: 'Balance Love and Vitality', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "An invitation to balance your heart and hara centers, uniting the emotional depth of love with the vibrant energy of creativity and life force. Feel the heart's compassion flow as the hara anchors you with vitality.", chooseWhen: ['To harmonize emotion with creative energy','When you seek balance and grounding','To cultivate alignment and vitality'], spotify: 'https://open.spotify.com/track/5NNprGnrnUrWpxcIkxitcD', why: "Your sacral is warm and creatively alive — but your solar plexus is *distorted, identity-conflicted*. This session lets the open sacral feed the solar through the heart. It re-routes power through the place that's already healthy.", intention: "My belly and my heart can talk to each other without me arranging the conversation." },
    'sending-mark-home': { art: 'assets/sessions/sending-mark-home.webp', heading: 'Sending Mark Home', subtitle: 'Reflect, Feel, and Let Go.', artist: 'The Human Experience', portrait: 'assets/artists/the-human-experience.jpg', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "Introspective and emotionally direct, this session is an invitation to feel. Let yourself soften and surrender into your heart with \"Sending Mark Home.\"", chooseWhen: ['To process and feel through memories','To feel your present emotion deeply',"When seeking clarity about what's next"], spotify: 'https://open.spotify.com/track/2QEBaJSZmBHtJ4XQr9zLRs', why: "Closes the *receive, don't pour* week. One of the most direct soften-and-surrender pieces in the catalog. The instruction here is just to feel what arrives — including the parts that haven't been allowed in.", intention: "I let myself feel what's been waiting at the edges of my chest." },

    'liberated-expression': { art: 'assets/sessions/liberated-expression.webp', heading: 'Liberated Expression | Throat', subtitle: 'Deepen Communication and Listening', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Bring balance to your energetic center of authentic expression and attuned listening. This chakra is connected to your physical vocal cords, ears, and thyroid gland. Clarify it and your gifts and vision can grace the world.", chooseWhen: ['To free self-expression','For landing in the present moment','Prior to a significant conversation'], spotify: 'https://open.spotify.com/track/2vghyFSgChsZP554bkyBrG', why: "This is the direct answer to your Primary Block. Your throat is *compressed* — held back by fear of consequence. This session opens it through listening as much as speaking. What hasn't been said is allowed to surface; you don't have to do anything with it yet.", intention: "What I've been holding back is allowed to rise. I don't need to act on it yet." },
    'toning-with-ancestors': { art: 'assets/sessions/toning-with-ancestors.webp', heading: 'Toning with the Ancestors', subtitle: 'A Conversation Beyond Words', artist: 'Jade Fusco', portrait: 'assets/artists/jade-fusco.jpg', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Guided by Jade Fusco, this session invites you to connect with your lineage through the power of your voice. By humming, toning, and singing, you offer what your ancestors may need, and open yourself to receive their wisdom and strength. Vibration becomes the bridge.", chooseWhen: ['To explore your voice as healing','When honoring your ancestry','To open the heart before creative or vocal practice'], spotify: '', why: "Your throat opens through *use*, not through thinking about it. Humming and toning bypass the editor — the part of you that decides what's safe to say. The Spiral Navigator's *Embodied Expression* challenge starts here, in the voice itself.", intention: "I let my own sound be the bridge between what I know and what I say." },
    'coherence-639': { art: 'assets/sessions/coherence-639.webp', heading: 'Coherence | 639 Hz', subtitle: 'Tune Into Harmony Within and Around You', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection, emotional balance, and harmonious relationships. The session brings your system into coherence, syncing mind and body with a deeper rhythm of ease.", chooseWhen: ['To calm emotional tension','When you want to feel more connected','To restore internal balance'], spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP', why: "639 Hz brings the heart and the voice into the same rhythm. Your reading shows them out of phase — the heart fully expanded, the throat compressed. This is the harmonizer that helps you mean what you say with your chest.", intention: "What I say can land in the same place my heart already speaks from." },
    'fire-cleanse': { art: 'assets/sessions/fire-cleanse.webp', heading: 'Fire Cleanse', subtitle: 'Release What No Longer Serves', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A calming organic soundscape. Immerse yourself in the felt experience of fire as it burns away any dead wood you're ready to let go.", chooseWhen: ['For evening relaxation','During significant life changes','To focus your intention'], spotify: 'https://open.spotify.com/track/41CRQAOids2p4yDhn8yWqq', why: "Your liver carries *unprocessed anger or empathy*; your throat carries words that haven't been allowed to leave. Sometimes those need release without an instruction — just a soundscape and a body willing to let go. Closes week three.", intention: "I burn what I've been keeping quiet about. I keep the warmth." },

    'open-path-741': { art: 'assets/sessions/open-path-741.webp', heading: 'Open Path | 741 Hz', subtitle: 'Let Go of the Static. Step Into Clear Air', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The session helps release what weighs on the mind and makes space for fresh energy. The vibrations move through you like a breeze clearing the inner landscape.", chooseWhen: ['To clear mental clutter','When starting a new project','To create space for new intentions'], spotify: '', why: "Your crown's *receiving more than grounding* — and 741 Hz clears the mental field of what isn't yours. Opens week four with a wind through the head, so the integration that follows has empty space to land in.", intention: "I let what isn't mine pass through me. I keep only what wants to stay." },
    'fearless-396': { art: 'assets/sessions/fearless-396.webp', heading: 'Fearless | 396 Hz', subtitle: 'Release Heaviness and Stagnation.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Aids in the transcendence of guilt and fear blocks, opening the pathways for self-love and personal empowerment. 396 Hz can also help when moving through grief.", chooseWhen: ['During significant life changes','To calm your nervous system','For processing and releasing sadness'], spotify: 'https://open.spotify.com/track/0IVgsgwsl2l8amzrgKWtPE', why: "Your Primary Block is named: *I fear the consequence of speaking it*. 396 Hz works on root-level fear directly, so the fear can stop running the throat. This is the integration that closes the throat–solar work of week three.", intention: "The fear I've been carrying is allowed to leave through my breath." },
    'flow-sacral': { art: 'assets/sessions/flow-sacral.webp', heading: 'Flow | Sacral', subtitle: 'Unlock Your Creative Flow', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Dedicated to the sacral chakra, also known as the lower dan tian, linked to sensuality, creative energy, and the transition from survival mode to creation consciousness.", chooseWhen: ['To awaken creative inspiration','When transitioning from survival to creation','To connect with your deepest desires'], spotify: 'https://open.spotify.com/track/7aasWE5DWAENpEczNufTrN', why: "Your sacral is already *warm, fluid, creative* — this session doesn't fix anything, it feeds what is already working. The Spiral Navigator's gift, *Visionary Resonance*, lives partly here. Lean into it.", intention: "Something wants to be made through me. I make space without naming what it is yet." },
    'sunmerge-174': { art: 'assets/sessions/sunmerge-174.webp', heading: 'Sunmerge | 174 Hz', subtitle: 'Dissolve Tension, Absorb the Light', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Designed to soothe body and mind at a cellular level. Bathed in glowing ambient soundscapes, you'll feel the grounding properties of the 174 Hz Solfeggio frequency.", chooseWhen: ['To unwind after exertion','When you need to release tension','To prepare for restful sleep'], spotify: 'https://open.spotify.com/track/6MKA9DsEtfyxbxv4lyaw8d', why: "Closes the 30 days the way it opened: at the cellular floor. Re-reads your body after a month of throat opening, heart receiving, root steadying. The final integration check-in.", intention: "I let the past month settle into the deepest layer of the body." }
  },

  prompts: {
    'welcome-to-opus':       { before: "Before you've done anything yet, what does your body feel like in this moment?", after: "What did you notice as the bed met you for the first time?" },
    'stability-root':        { before: "Where in your body do you feel airy, unsafe, or restless right now?", after: "Where did weight settle? What does the floor underneath you feel like now?" },
    'earth-awareness':       { before: "What's still pulling your attention upward — into thought, into the head?", after: "What got quieter when you tuned to the earth? What's still humming?" },
    'ease-174':              { before: "Where in your body is tension or worry sitting today?", after: "What softened? What place is still asking for more?" },

    'body-scan':             { before: "What part of you came in needing to give to someone or something?", after: "Where did your body rest the deepest? Did anything stay locked?" },
    'heart-focus':           { before: "On a 1-10 scale, how present is your heart to you right now: feeling it, or thinking about it?", after: "What changed in your chest? Did the in-breath get easier?" },
    'heart-hara':            { before: "Where does your creative energy live in your body today?", after: "What conversation happened between your heart and your belly?" },
    'sending-mark-home':     { before: "What feeling has been waiting at the edges of your week?", after: "What did you feel without trying? What surprised you about it?" },

    'liberated-expression':  { before: "What is something true you haven't said aloud lately?", after: "What part of you feels heard now? What still needs space?" },
    'toning-with-ancestors': { before: "What sound or word has been wanting to come out, but hasn't?", after: "What did your own voice teach you? What stayed unspoken?" },
    'coherence-639':         { before: "Where is your heart saying one thing and your voice saying another?", after: "Where did coherence land? What got easier to mean?" },
    'fire-cleanse':          { before: "What are you ready to be done holding silent?", after: "What burned away? What did you keep, that you didn't expect to?" },

    'open-path-741':         { before: "What thought-loops have been crowding your head this week?", after: "What's open now that wasn't before? What direction is calling?" },
    'fearless-396':          { before: "What's the fear underneath your hesitation to speak?", after: "What did you let go of? What's still here that didn't move?" },
    'flow-sacral':           { before: "What wants to be made or moved through you, even if you can't name it?", after: "What started moving? What was already moving but you hadn't noticed?" },
    'sunmerge-174':          { before: "What tension has been with you across all four weeks?", after: "What dissolved? What stayed because it isn't ready to leave yet?" }
  },

  plan: [
    { week: 1, title: 'Land in Safety', intent: "Ground the unstable root, build felt safety in the body before any voice or expression work.", responds: 'Root pulsing but unstable · crown open but receiving more than grounding · stomach tense holding worries', sessions: ['welcome-to-opus','stability-root','earth-awareness','ease-174'] },
    { week: 2, title: "Receive, Don't Pour", intent: "Heart inflow practice. The heart needs to learn to take in, not just give. NSDR + breathwork that emphasizes receiving.", responds: 'Heart fully expanded but uneven inflow/outflow — you give more than you receive · kidneys low resonance / fatigue · spleen neutral', sessions: ['body-scan','heart-focus','heart-hara','sending-mark-home'] },
    { week: 3, title: 'Voice the Held', intent: 'Directly address the Primary Block — Throat-Solar Plexus axis. Open the throat through use, not effort.', responds: 'Throat compressed · solar plexus distorted (identity conflict / power inversion) · liver overload (unprocessed anger or empathy) · "I know what I must express, but I fear the consequence of speaking it"', sessions: ['liberated-expression','toning-with-ancestors','coherence-639','fire-cleanse'] },
    { week: 4, title: 'Spiral Home', intent: "Integration of the Spiral Navigator archetype. Bring the crown's knowing down into embodied expression.", responds: 'Sacral warm/fluid (creative reservoir) · Hawkins 440 → 500 (Reason → Love transition) · Greatest gift: Visionary Resonance · Greatest challenge: Embodied Expression', sessions: ['open-path-741','fearless-396','flow-sacral','sunmerge-174'] }
  ],

  /* Chakra states parsed from Amber's reading. Order = energetic ascent (crown
     → root by yPct ascending). Each state maps to a defined visual signature
     in index.html (see .bf-chakra-glow-pt[data-state="..."] CSS).
     Mapping logic in the plan file: "compressed" → undercharged, "distorted"
     → consolidating, "pulsing but unstable" → stabilizing, etc. */
  chakraStates: [
    { id: 'crown',     label: 'Crown',        state: 'carrying-a-lot', yPct: 7,  note: 'Open but overactive — receiving more than grounding' },
    { id: 'third-eye', label: 'Third Eye',    state: 'clear',          yPct: 14, note: 'Clear, slightly shielded — protecting vision' },
    { id: 'throat',    label: 'Throat',       state: 'undercharged',   yPct: 22, note: 'Compressed — truth held under self-editing' },
    { id: 'heart',     label: 'Heart',        state: 'radiant',        yPct: 36, note: 'Fully expanded — but inflow uneven; over-gives' },
    { id: 'solar',     label: 'Solar Plexus', state: 'consolidating',  yPct: 48, note: 'Distorted resonance — identity in active reorganization' },
    { id: 'sacral',    label: 'Sacral',       state: 'clear',          yPct: 60, note: 'Warm, fluid, creative — strong subconscious movement' },
    { id: 'root',      label: 'Root',         state: 'stabilizing',    yPct: 76, note: 'Pulsing but unstable — seeking full safety' }
  ],

  /* Sessions intentionally NOT in Week 1-4. Same shape as `sessions` so they
     render as identical session cards (art-at-top, expandable). The `held`
     reason is personalized to Amber's reading — these are all crown-direct
     sessions held back because the crown is already over-saturated. */
  heldInReserve: [
    {
      slug: 'rest-in-love-852',
      name: 'Rest in Love · 852 Hz',
      heading: 'Rest in Love',
      subtitle: '852 Hz · Universal Love',
      artist: 'Sam Bottner',
      portrait: 'assets/artists/sam-bottner.jpg',
      category: 'Frequency',
      catClass: 'cat-frequency',
      collection: 'Solfeggio II',
      chakra: 'third-eye',
      art: 'assets/sessions/rest-in-love.webp',
      lede: "Tuned to 852 Hz, often associated with returning to spiritual order, releasing illusion, and resting in unconditional love.",
      chooseWhen: ['When the head is loud', 'To soften strain on the third-eye', 'For evening contemplation'],
      note: 'third-eye, universal love',
      held: "Your third-eye is already shielded and your crown is already overactive. Adding 852 Hz here would feed the upper-field saturation we're trying to balance. Useful later, once the root is steadier."
    },
    {
      slug: 'pure-awareness-crown',
      name: 'Pure Awareness · Crown',
      heading: 'Pure Awareness',
      subtitle: 'Direct Crown Work',
      artist: 'Sam Bottner',
      portrait: 'assets/artists/sam-bottner.jpg',
      category: 'Chakras',
      catClass: 'cat-chakras',
      collection: 'Chakra Awakening',
      chakra: 'crown',
      art: 'assets/sessions/pure-awareness.webp',
      lede: "Direct, unmediated crown work. The session asks the system to receive without the mind organizing what's happening.",
      chooseWhen: ['When ready for direct crown work', 'After the lower chakras have charge', 'For deep stillness'],
      note: 'direct crown work',
      held: "Your crown is the over-saturated center. Direct crown work right now would be more of the same imbalance. Re-evaluate after the throat-solar axis opens in week three."
    },
    {
      slug: 'pineal-aperture',
      name: 'Pineal Aperture',
      heading: 'Pineal Aperture',
      subtitle: 'Third-eye attunement',
      artist: 'Sam Bottner',
      portrait: 'assets/artists/sam-bottner.jpg',
      category: 'Guided',
      catClass: 'cat-guided',
      collection: '',
      chakra: 'third-eye',
      art: 'assets/sessions/pineal-aperture.webp',
      lede: "An attunement to the pineal — the third-eye gateway. Subtle, slow, and best done after the body is grounded.",
      chooseWhen: ['Once the root is steadier', 'For inner-vision practice', 'When seeking clarity through stillness'],
      note: 'third-eye attunement',
      held: "Your third-eye is *clear but shielded*. Opening the aperture before the shielding is understood would push past the protection rather than work with it."
    },
    {
      slug: 'aum-136',
      name: 'AUM · 136 Hz',
      heading: 'AUM · 136 Hz',
      subtitle: 'Cosmic attune',
      artist: 'Sam Bottner',
      portrait: 'assets/artists/sam-bottner.jpg',
      category: 'Frequency',
      catClass: 'cat-frequency',
      collection: 'Solfeggio II',
      chakra: 'crown',
      art: 'assets/sessions/aum-136.webp',
      lede: "The Om frequency. 136 Hz is the resonance often associated with the Earth's natural year, used as a tuning anchor for cosmic alignment.",
      chooseWhen: ['As an evening tune-in', 'Before contemplative practice', 'When seeking the largest frame'],
      note: 'cosmic attune',
      held: "AUM lands in the crown, which you don't need more of right now. The Spiral Navigator archetype lives in the cosmic frame — but the work this month is bringing that frame *down* into the body, not expanding it further."
    },
    {
      slug: 'bridging-worlds',
      name: 'Bridging Worlds',
      heading: 'Bridging Worlds',
      subtitle: 'Earth / Spirit bridge',
      artist: 'Sam Bottner',
      portrait: 'assets/artists/sam-bottner.jpg',
      category: 'Guided',
      catClass: 'cat-guided',
      collection: '',
      chakra: 'crown',
      art: 'assets/sessions/bridging-worlds.webp',
      lede: "A guided journey between earth-rooted and spirit-receptive states. Holds both registers without forcing either.",
      chooseWhen: ['When the root + crown both have charge', 'For practitioner-level integration', 'In moments of liminality'],
      note: 'Earth / Spirit bridge',
      held: "Bridge work asks for both poles to be online. Your root is pulsing but not yet stable; come back to this when both ends of your field have charge."
    }
  ],

  /* Map session slugs to chakras for the delight-pulse on resolve */
  slugToChakra: {
    'welcome-to-opus':        'crown',
    'stability-root':         'root',
    'earth-awareness':        'root',
    'ease-174':               'root',
    'body-scan':              'heart',
    'heart-focus':            'heart',
    'heart-hara':             'heart',
    'sending-mark-home':      'heart',
    'liberated-expression':   'throat',
    'toning-with-ancestors':  'throat',
    'coherence-639':          'heart',
    'fire-cleanse':           'sacral',
    'open-path-741':          'crown',
    'fearless-396':           'root',
    'flow-sacral':            'sacral',
    'sunmerge-174':           'sacral'
  }
};
