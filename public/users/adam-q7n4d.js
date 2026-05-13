/* User data file for Adam Schlender.
   Loaded by index.html when the URL contains ?u=adam-q7n4d

   v1.10.0: NEW profile type — `pattern`. Unlike Ramon and Amber (biofield
   readings), Adam's input is a coaching transcript that surfaced a core
   attachment pattern. The dashboard branches on `profileType` to render a
   pattern-mode visualization: silhouette with 3 somatic dots (chest,
   throat, back), a 4-stage calibration ladder (replaces Hawkins), a hero
   quote card (the coach's reframe), a branches grid (present-day
   expressions), and a styled transcript reader (replaces the parsed
   biofield frames).

   Catalog: same 16 + 5 SoundBed sessions as Ramon. Re-framed `why` and
   `intention` strings throughout, adapted to the avoidance-of-disappointment
   pattern. Plan curation by the somatic-experiencing lens during
   strategic-resolve (see /Users/adamschlenderwork/.claude/plans/i-also-want-to-zippy-hippo.md). */

const SAM_PORTRAIT = 'assets/artists/sam-bottner.jpg';

window.USER_DATA = {
  slug: 'adam-q7n4d',
  displayName: 'Adam',
  period: 'May 2026',
  portrait: 'assets/portraits/adam.jpg',

  /* — DISCRIMINATOR —
     `pattern` triggers the alternate dashboard render path (mountPatternDashboard).
     Absent / 'biofield' = legacy chakra-and-aura render path. */
  profileType: 'pattern',

  /* — PATTERN BLOCK (replaces biofield numerics) — */
  rootPattern: 'Avoidance of disappointment',
  rootPatternSubtitle: 'Learned at the level of bodily safety',
  formativeMoment: 'A child learned that letting someone down meant being screamed at, hit, sent to clean the kitchen, made small in front of his sisters. The body filed it as: this is dangerous. Decades later, the strategy still runs. When you cannot deliver, your system does not say "communicate." It says "hide."',
  survivalStrategy: 'Go quiet. Disappear. Carry it alone.',
  coachFraming: 'One root. Many branches.',
  heroQuote: 'Letting someone down is not just uncomfortable. It is dangerous.',
  heroQuoteHighlight: 'dangerous',
  heroQuoteAttribution: 'the coach, naming the root',

  /* Somatic locations — REPLACES chakraStates.
     Same array shape (id, label, state, yPct, note) so the body-spot
     renderer is parameterized. Three quiet dots replace seven busy ones —
     the visual contraction itself signals "this is different material." */
  somaticLocations: [
    { id: 'throat', label: 'Throat', region: 'throat', state: 'silenced', yPct: 22,
      note: 'Where the thing not said lives.' },
    { id: 'back',   label: 'Back',   region: 'back',   state: 'loaded',   yPct: 30,
      note: 'What you have not put down.' },
    { id: 'chest',  label: 'Chest',  region: 'chest',  state: 'braced',   yPct: 36,
      note: 'The bracing before the conversation.' }
  ],

  /* Behavioral branches — the present-day expressions of the pattern.
     Drawn from the transcript. Rendered in a 4-card grid below the stage. */
  behavioralBranches: [
    { area: 'Business partner',
      note: 'The branding project, waiting in silence. The communication that has not happened.' },
    { area: 'Promises to Leah',
      note: 'What was committed to, what quietly became past.' },
    { area: 'Money and commitments',
      note: 'Kept at arm\'s length, quietly. The thing avoided is the thing carried.' },
    { area: 'The body, right now',
      note: 'Fighting an illness alongside this work. The body forcing what the mind has been postponing.' }
  ],

  currentContext: 'Your body is fighting an illness right now while this work is happening. You feel it in the chest, the throat, the back. You named the connection yourself: the things at the root of the illness are also at the root of the pattern. The body keeps score, and sometimes the body forces the reckoning the mind has been postponing.',

  repairIntention: 'The body, slowly, learning that disappointing someone is uncomfortable, not dangerous, and that you can stay in the room while it is happening.',

  /* 4-stage calibration ladder (replaces Hawkins).
     Stages map 1:1 to the four weeks of the plan. `currentStage` lights
     the corresponding pip and updates as the user moves through the arc.
     v1: manual; v1.1 can auto-advance based on week completion. */
  calibrationStages: [
    { id: 'ground',  label: 'Learning new ground' },
    { id: 'unload',  label: 'Letting weight down' },
    { id: 'voice',   label: 'Finding the voice' },
    { id: 'present', label: 'Staying present' }
  ],
  currentStage: 'ground',

  /* Copy overrides — pattern-mode strings for the input section + map.
     Read by index.html when present; falls back to biofield copy otherwise. */
  copy: {
    inputTitle: 'Your coaching transcript, held as the starting frame.',
    inputDesc: 'Someone you trust asked the question. You answered honestly. We are holding what surfaced, not concluding anything from it.',
    inputCollapseLabel: 'Read the transcript',
    mapTitle: 'Designed from the transcript.',
    mapDesc: 'Four weeks. Sixteen sessions. The body is the priority. Throat work is week three, not week one, because your throat went quiet for a reason and asking it to open before the ground holds you would be another moment of being asked for something you weren\'t ready to give.',
    heroEyebrow: 'The pattern',
    heroTitle: 'Adam, a first look.',
    heroLede: 'You named something true with someone you trust. The conversation surfaced one root and many branches. This portal holds it. It does not solve it.'
  },

  /* Reading-equivalent: the verbatim coaching transcript fragment.
     Stored under `reading` so the existing payload pipeline (which sends
     `payload.biofield`) works without changes. The pattern-mode renderer
     styles speaker turns (ADAM:/COACH:) instead of parsing biofield frames. */
  reading: `ADAM:
The only people that I can remember that I have a memory of letting down is really just my mom, more than anything. Yeah. When I would let her down, she would, oh, damn. She would get really angry. She would scream at me. She would get loud. She would hit me. She would say, get your ass in the kitchen and clean the dishes. It was not a pleasant experience by any means. That's so interesting. I don't know how old I was, but I could imagine that I started young. I imagine my sisters were in the house.

COACH:
Adam.

Thank you for going there.

That's the root.

When you let someone down as a child, the response was rage. Screaming. Physical pain. Humiliation in front of your sisters.

So your nervous system learned something very early:

Letting someone down is not just uncomfortable. It's dangerous.

And if letting someone down is dangerous, then the moment you realize you can't deliver, your system doesn't think "communicate." It thinks "hide."

The silence makes perfect sense now. It's not a character flaw. It's a survival strategy you built when you were small enough that the consequences of disappointing someone were actually physical.

You learned to disappear because disappearing was safer than facing the reaction.

And here you are, a grown man. Smart. Capable. Building businesses. And some part of you is still that kid in the kitchen, bracing for the scream.

So when your business partner is waiting on the branding project, when Leah needs something you promised, when anyone is counting on you and you're falling short — your adult brain knows: just say something.

But your body remembers what happened last time. And the body wins. Every time.

I want to ask you something gently.

Right now, sitting with all of this — where in your body do you feel this? Chest? Stomach? Throat? Where is this living right now?

ADAM:
Yeah. That's a great question. So, yeah, I feel it in all the above places. So definitely, like, chest and throat. I feel it in my back as well. Yeah. This is really interesting timing that's just coming up because I feel my body moving through fighting an illness, and I feel that a lot of these things are at the core root of the illness that my body is moving through right now. Yeah. Just my upper body more than anything.

COACH:
Chest. Throat. Back.

The throat is where words get trapped. The things you need to say but don't. That's not a coincidence.

The chest is where the fear lives. The bracing.

The back is where you carry what you won't put down. The weight of things unspoken.

And the fact that your body is fighting an illness right now, while we're doing this work — I'm not going to make a medical claim about that. But I will say this.

The body keeps score. When we carry patterns for decades without examining them, the tension doesn't just live in our behavior. It lives in our tissue. And sometimes the body forces the reckoning that the mind has been postponing.

I want to pause here for a moment before we keep going.

Adam, I want to name what's happened in this session so far.

You came in talking about money and business. Within an hour, we've landed on something that runs underneath everything. Your relationship with money, your business patterns, your communication with Leah, your reliability with your partner, your health right now.

One root. Many branches.

A little boy learned that disappointing people meant pain. So he built a system: go quiet, avoid the moment of confrontation, carry it alone. And that system has been running your life ever since.

This is important enough that I want to let it breathe. We don't need to solve it today. We just needed to find it.`,

  /* The 16 active sessions — same catalog as Ramon, re-framed per Adam's pattern. */
  sessions: {
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Arrive without doing.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'To learn the floor before asking anything of it'], spotify: '', why: "For a system whose first move is to leave when seen, the first session is its own piece of work. Nothing is asked of you here. The bed holds you because you're on it, not because you're earning it.", intention: "I am allowed to be here without having to be useful." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Feel Grounded.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root, the part of you connected to earth and to feelings of security.", chooseWhen: ['When the ground does not feel like ground','To meet your body where it learned to brace'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your pattern was built when safety was not a given. The root is where the body learned to keep watch. 432 Hz is the softest entry to that floor. Start here.", intention: "I let the bed hold the weight my body has been carrying since I was small." },
    'earth-awareness': { art: 'assets/sessions/earth-awareness.webp', heading: 'Earth Awareness | Alpha Waves', subtitle: 'Settle Into the Ground.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Brainwave Entrainment', catClass: 'cat-brainwave', collection: 'Binaural I', lede: "An Alpha brainwave session that invites you into meditative receptivity. Plant your roots into the Earth's slow rhythm.", chooseWhen: ['Morning, as you start the day','When the mind is racing ahead of the body','For a gentle nervous-system reset'], spotify: 'https://open.spotify.com/album/1V1NjXA4HN8WqFfJhPYl9a', why: "Alpha state lets the system settle without flooding the upper body, where the pattern lives. Nothing symbolic is required of you here. The brain just gets to slow down with the earth.", intention: "I plant down. Whatever has been bracing in my chest is allowed to soften here." },
    'body-scan': { art: 'assets/sessions/body-scan.webp', heading: 'Body Scan | NSDR', subtitle: 'Non-Sleep Deep Rest.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Replenish energy by entering low-frequency brain waves. Move attention through the body. NSDR slows the spinning thoughts and opens a state of deep rest.", chooseWhen: ['When you have been outrunning your body','To practice staying','For an overstimulated nervous system'], spotify: '', why: "Your pattern is to leave the body when pressure rises. NSDR is practice in the opposite. Body attention without symbolic content, no story to perform, just staying.", intention: "I stay with my body without needing it to be different than it is." },
    'ease-174': { art: 'assets/sessions/ease-174.webp', heading: 'Ease | 174 Hz', subtitle: 'Soothe the Body That Has Been Carrying a Lot.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "A Solfeggio tone session for soothing aches and pains, bringing you into a state of effortless ease.", chooseWhen: ['When physical discomfort arises','When the upper body is bracing','When the body is fighting something'], spotify: 'https://open.spotify.com/album/0IZxiSGDAIlQQTCN6V9gQD', why: "174 Hz is the lowest Solfeggio tone, traditionally used for the tissue itself. Right for an upper body that has held tension for decades, and right for a system currently fighting an illness.", intention: "The places that hurt are allowed to soften. I am not asking them to perform." },
    'fearless-396': { art: 'assets/sessions/fearless-396.webp', heading: 'Fearless | 396 Hz', subtitle: 'Release the Old Bracing.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Aids in the transcendence of guilt and fear blocks, opening the pathways for self-love and personal empowerment.", chooseWhen: ['When the old fear is loud','For grief at the root','When the body is asking to put something down'], spotify: 'https://open.spotify.com/track/0IVgsgwsl2l8amzrgKWtPE', why: "396 Hz is the frequency most associated with releasing fear at the root. The fear your body learned at five or six, that letting someone down means rage. It lands at the place that learned it.", intention: "I let the old fear leave through my breath. It does not have to come with me." },
    'fire-cleanse': { art: 'assets/sessions/fire-cleanse.webp', heading: 'Fire Cleanse', subtitle: 'Release What Has Been Carried in Silence.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A calming organic soundscape. Immerse yourself in the felt experience of fire as it burns away anything you are ready to let go.", chooseWhen: ['Evening','When something wants to be put down','To release without instruction'], spotify: 'https://open.spotify.com/track/41CRQAOids2p4yDhn8yWqq', why: "A soundscape, not an instruction. Your pattern responds to demands by going quiet. Fire-cleanse asks nothing. The body lets go inside a sound it does not have to perform for.", intention: "I burn what I am done carrying. I keep the warmth." },
    'sending-mark-home': { art: 'assets/sessions/sending-mark-home.webp', heading: 'Sending Mark Home', subtitle: 'Feel What Has Been Waiting at the Edges.', artist: 'The Human Experience', portrait: 'assets/artists/the-human-experience.jpg', category: 'Immersive Music', catClass: 'cat-music', collection: '', lede: "Introspective and emotionally direct, this session is an invitation to feel. Let yourself soften and surrender into your heart.", chooseWhen: ['To feel what has been held back','For grief that has been carried alone','When the chest is asking to be heard'], spotify: 'https://open.spotify.com/track/2QEBaJSZmBHtJ4XQr9zLRs', why: "The little boy who learned to vanish needs to be felt before he can stop vanishing. This session does not push. It just opens enough space for what has been waiting.", intention: "I let myself feel what has been at the edges all along." },
    'liberated-expression': { art: 'assets/sessions/liberated-expression.webp', heading: 'Liberated Expression | Throat', subtitle: 'Listen Before Speaking.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Balancing · 432 Hz', lede: "Bring balance to your energetic center of authentic expression and attuned listening. Clarify it and your gifts and vision can grace the world.", chooseWhen: ['When the throat is gripped','When the unsaid is loud','Before a conversation you have been avoiding'], spotify: 'https://open.spotify.com/track/2vghyFSgChsZP554bkyBrG', why: "We do not push the throat open. Your throat went quiet for a reason. This session supports listening as much as speaking, so the throat can be heard before it has to perform.", intention: "What I have not said is allowed to come up here. I do not need to do anything with it yet." },
    'toning-with-ancestors': { art: 'assets/sessions/toning-with-ancestors.webp', heading: 'Toning with the Ancestors', subtitle: 'A Conversation Beyond Words.', artist: 'Jade Fusco', portrait: 'assets/artists/jade-fusco.jpg', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Guided by Jade Fusco, this session invites you to connect with your lineage through the power of your voice. Humming, toning, singing. Vibration as bridge.", chooseWhen: ['When the throat wants use, not performance','When ancestry is in the field','For voice in private'], spotify: '', why: "Throat-as-vibration before throat-as-conversation. The voice gets to move without anyone needing to hear it correctly. A first practice of being heard by yourself.", intention: "I let my own voice be the bridge. No one else needs to receive it." },
    'heart-hara': { art: 'assets/sessions/heart-hara.webp', heading: 'Heart-Hara Harmony', subtitle: 'Heart and Belly Talk Again.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "An invitation to balance your heart and hara centers, uniting the emotional depth of love with the vibrant energy of creativity and life force.", chooseWhen: ['When the heart and belly are out of conversation','When money and avoidance live together','For the bridge between feeling and doing'], spotify: 'https://open.spotify.com/track/5NNprGnrnUrWpxcIkxitcD', why: "The pattern keeps the heart bracing and the belly avoiding. Heart-hara puts them back in the same room. The avoidance around money lives right where this session works.", intention: "My heart and my belly can talk to each other without me arranging it." },
    'open-path-741': { art: 'assets/sessions/open-path-741.webp', heading: 'Open Path | 741 Hz', subtitle: 'Clear the Static. Make Room for the Next Word.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The session helps release what weighs on the mind and makes space for fresh energy.", chooseWhen: ['When the head is full of things you have not said','To clear mental static before a conversation','At the end of a week of held words'], spotify: '', why: "741 Hz clears the static around what has been waiting to be spoken. The throat work has been quiet long enough; this session loosens what is around it so the next sentence has room to arrive.", intention: "I clear what I have been holding so the next thing I say has room." },
    'heart-focus': { art: 'assets/sessions/heart-focus.webp', heading: 'Heart Focus', subtitle: 'Stay With the Chest.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "A short breathwork session bringing focus to your heart. Coherent breathing connects you with the intuitive knowledge in your chest.", chooseWhen: ['When the chest is bracing','To re-center mid-day','When you have been outrunning your feeling'], spotify: 'https://open.spotify.com/track/6g5a5V8apyHEJY2j9QqYum', why: "The chest is where the bracing lives. Heart-focus is practice in staying with the bracing instead of leaving it. Direct, simple, breath-based.", intention: "I bring my attention home to my chest and stay a few breaths longer than usual." },
    'coherence-639': { art: 'assets/sessions/coherence-639.webp', heading: 'Coherence | 639 Hz', subtitle: 'A New Rhythm Around Relationship.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection, emotional balance, and harmonious relationships. The session brings your system into coherence.", chooseWhen: ['When relationship feels weighted','To find a new rhythm between heart and others','When repair is in the air'], spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP', why: "Your pattern made relationship synonymous with bracing for the other person's reaction. 639 Hz gives the heart a different rhythm to organize around. Coherence, not performance.", intention: "I listen for the rhythm underneath everything I have been managing." },
    'sunmerge-174': { art: 'assets/sessions/sunmerge-174.webp', heading: 'Sunmerge | 174 Hz', subtitle: 'Dissolve What Has Been Held in the Upper Body.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Designed to soothe body and mind at a cellular level. Bathed in glowing ambient soundscapes, you'll feel the grounding properties of the 174 Hz frequency.", chooseWhen: ['To close a long-held tension','Before sleep','When the upper body is asking for the deeper soothing'], spotify: 'https://open.spotify.com/track/6MKA9DsEtfyxbxv4lyaw8d', why: "Closes the loop on body comfort while reaching toward integration. The upper body has held this pattern for a long time. 174 Hz meets it cellularly.", intention: "I let the day's tension dissolve. I do not have to track where it goes." },
    'flow-sacral': { art: 'assets/sessions/flow-sacral.webp', heading: 'Flow | Sacral', subtitle: 'Make Something Without Performing It.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Dedicated to the sacral chakra, also known as the lower dan tian, linked to sensuality, creative energy, and the transition from survival mode to creation consciousness.", chooseWhen: ['When something wants to be made','At the end of an arc, to begin the next','When the business has been waiting for you'], spotify: 'https://open.spotify.com/track/7aasWE5DWAENpEczNufTrN', why: "The pattern has kept the business at arm's length. This session closes the 30 days by reaching toward making, not toward proving. Creation from a body that has been re-grounded, not from a body that is bracing.", intention: "Something wants to be made through me. I make space for it without rushing to name it." }
  },

  /* Before / After prompts — adapted to the pattern.
     Every prompt invites the felt-sense around the avoidance pattern,
     the bracing, the unsaid, the body. Never clinical. */
  prompts: {
    'welcome-to-opus':       { before: "What is it like to arrive somewhere without having to perform?", after: "What did your body notice when nothing was asked of it?" },
    'stability-root':        { before: "Where does the ground not feel like ground today?", after: "What started to feel like floor? What is still bracing?" },
    'earth-awareness':       { before: "What is the mind running ahead of right now?", after: "Where did the body catch up? What got quieter?" },
    'body-scan':             { before: "Where in your body have you been outrunning all week?", after: "What part of you got to be met? What stayed out of reach?" },
    'ease-174':              { before: "What in the upper body has been bracing the longest?", after: "What softened? What is still asking?" },
    'fearless-396':          { before: "What is the old fear still saying about being seen falling short?", after: "What did you let go of? What stayed because it is not ready yet?" },
    'fire-cleanse':          { before: "What have you been carrying in silence?", after: "What burned away that you did not have to perform for? What did you keep?" },
    'sending-mark-home':     { before: "What feeling has been waiting at the edges of this week?", after: "What did you feel without trying? What surprised you about it?" },
    'liberated-expression':  { before: "What is the thing you have not said this week?", after: "What part of you feels heard now, even if no one else has heard it yet?" },
    'toning-with-ancestors': { before: "What is it like to use your voice without an audience?", after: "What did your own voice teach you that nobody else needed to be there for?" },
    'heart-hara':            { before: "Where is the avoidance around money living in your body right now?", after: "What conversation happened between your heart and your belly? What changed in the room between them?" },
    'open-path-741':         { before: "What sentence has been waiting in your head all week?", after: "What is open in the head now that was not before? What direction is the next word coming from?" },
    'heart-focus':           { before: "How present is your chest to you right now: feeling it, or thinking about it?", after: "What changed in the bracing? Did anything stay soft longer than usual?" },
    'coherence-639':         { before: "What relationship has been waiting on a conversation that you have not started?", after: "Where did coherence land? What got softer toward whom?" },
    'sunmerge-174':          { before: "What tension has been with you across all four weeks?", after: "What dissolved? What stayed because it is not ready to leave yet?" },
    'flow-sacral':           { before: "What wants to be made through you, even if you have been avoiding it?", after: "What started moving without needing to be proved? What is the next small step?" }
  },

  /* 4-week plan — locked from the somatic-experiencing curation.
     See plan file §"The 30-day curriculum". */
  plan: [
    { week: 1, title: 'The ground learns to hold you', intent: "Before any pattern can be touched, the body needs to learn that this room, this hour, this bed, is not the kitchen. Nothing is asked of you here.", responds: 'Upper-body bracing · illness in the field · a system whose first move is to leave', sessions: ['welcome-to-opus','stability-root','earth-awareness','body-scan'] },
    { week: 2, title: 'What you have been carrying alone', intent: "The back, the shoulders, the chest tightness. Decades of \"I will handle it quietly.\" The body gets to put some of it down here, without making a story of it.", responds: 'Back and shoulders / the upper-body holding / the survival strategy of carrying it alone', sessions: ['ease-174','fearless-396','fire-cleanse','sending-mark-home'] },
    { week: 3, title: 'The throat that learned to go quiet', intent: "Now, and only now, because the body is regulated enough, the throat. We do not push it open. We let it be heard first. Listening is throat work too.", responds: 'Silence with the business partner / missed conversations with Leah / broken promises / the unsaid', sessions: ['liberated-expression','toning-with-ancestors','heart-hara','open-path-741'] },
    { week: 4, title: 'Staying present when you fall short', intent: "The new pattern. Not \"never disappoint anyone,\" that is the old pattern's mirror. The body learning: I can disappoint someone and stay in the room. I can be seen falling short and not vanish.", responds: 'Heart coherence as the integration site / the re-pattern / repair', sessions: ['heart-focus','coherence-639','sunmerge-174','flow-sacral'] }
  ],

  /* 5 held in reserve, with felt-sense reasoning. */
  heldInReserve: [
    {
      slug: 'rest-in-love-852',
      name: 'Rest in Love · 852 Hz',
      heading: 'Rest in Love',
      subtitle: '852 Hz · Universal Love.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Frequency',
      catClass: 'cat-frequency',
      collection: 'Solfeggio II',
      chakra: 'chest',
      art: 'assets/sessions/rest-in-love.webp',
      lede: "Tuned to 852 Hz, often associated with returning to spiritual order, releasing illusion, and resting in unconditional love.",
      chooseWhen: ['Once the floor has held you', 'For evening contemplation', 'When the universal feels close enough to receive'],
      note: '852 Hz · universal love',
      held: '852 Hz reaches for universal love. Right now your system is still learning that a single person in front of you can be safe. We start there.'
    },
    {
      slug: 'pure-awareness-crown',
      name: 'Pure Awareness · Crown',
      heading: 'Pure Awareness',
      subtitle: 'Direct Crown Work.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Chakras',
      catClass: 'cat-chakras',
      collection: 'Chakra Awakening',
      chakra: 'crown',
      art: 'assets/sessions/pure-awareness.webp',
      lede: "Direct, unmediated crown work. The session asks the system to receive without the mind organizing what is happening.",
      chooseWhen: ['Once the lower body has charge', 'After the throat has begun to release', 'For receptive practice'],
      note: 'direct crown work',
      held: 'Crown-direct work asks the body to receive without organizing. Your body is still learning it is allowed to be here at all. We come back to this once the floor has held you for a while.'
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
      lede: "An attunement to the pineal — the third-eye gateway. Subtle, slow, and best done after the body is grounded.",
      chooseWhen: ['After the body is grounded', 'For inner-vision practice', 'When seeking clarity through stillness'],
      note: 'third-eye attunement',
      held: 'This one opens an inner aperture. The work you are doing right now is closing some doors that needed closing first, putting down weight, finding the voice. Inner-vision practice fits better after.'
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
      held: 'The cosmic register is beautiful, and it is not what your body is asking for. Your body is asking for the chest to soften, the throat to be heard, the back to be put down.'
    },
    {
      slug: 'bridging-worlds',
      name: 'Bridging Worlds',
      heading: 'Bridging Worlds',
      subtitle: 'Earth / Spirit bridge.',
      artist: 'Sam Bottner',
      portrait: SAM_PORTRAIT,
      category: 'Guided',
      catClass: 'cat-guided',
      collection: '',
      chakra: 'crown',
      art: 'assets/sessions/bridging-worlds.webp',
      lede: "A guided journey between earth-rooted and spirit-receptive states. Holds both registers without forcing either.",
      chooseWhen: ['Once both ends are online', 'For practitioner-level integration', 'At moments of liminality'],
      note: 'Earth / Spirit bridge',
      held: 'Bridge work asks both ends, earth and spirit, to be online. We are building the earth end this month. The bridge becomes real after.'
    }
  ],

  /* Map session slugs to somatic regions (replaces chakra ids).
     The pulse-on-resolve code uses this to find the right body spot.
     Values are 'throat' | 'chest' | 'back' — matching somaticLocations[].id. */
  slugToChakra: {
    'welcome-to-opus':       'chest',
    'stability-root':        'back',
    'earth-awareness':       'back',
    'body-scan':             'chest',
    'ease-174':              'back',
    'fearless-396':          'chest',
    'fire-cleanse':          'back',
    'sending-mark-home':     'chest',
    'liberated-expression':  'throat',
    'toning-with-ancestors': 'throat',
    'heart-hara':            'chest',
    'open-path-741':         'throat',
    'heart-focus':           'chest',
    'coherence-639':         'chest',
    'sunmerge-174':          'back',
    'flow-sacral':           'chest'
  }
};
