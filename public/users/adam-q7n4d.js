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

  /* The 16 active sessions — v1.10.1: re-curated from the 128-session OPUS
     library (opus-voice/src/lib/data/library.json) rather than inherited
     wholesale from Ramon's pool. Eight sessions are NEW pattern-specific
     picks; eight are shared with Ramon because those tools are genuinely
     the right ones for both a root-undercharged biofield user AND an
     avoidance-pattern user (the body, the breath, the simple frequencies
     don't care which framing you arrive with). Differentiation lives in:
     the 8 new picks, the arc sequence, the per-session `why` and
     `intention` strings, all pattern-coded. */
  sessions: {
    /* ---- Week 1 — The ground learns to hold you ---- */
    'welcome-to-opus': { art: 'assets/sessions/welcome-to-opus.webp', heading: 'Welcome to Opus', subtitle: 'Arrive without doing.', artist: 'OPUS', portrait: '', category: 'Welcome', catClass: 'cat-welcome', collection: 'Orientation', lede: "Your first session on SoundBed. A short orientation that lets your nervous system meet the bed before you bring intention to it.", chooseWhen: ['First time on SoundBed', 'To learn the floor before asking anything of it'], spotify: '', why: "For a system whose first move is to leave when seen, the first session is its own piece of work. Nothing is asked of you here. The bed holds you because you're on it, not because you're earning it.", intention: "I am allowed to be here without having to be useful." },
    'stability-root': { art: 'assets/sessions/stability-root.webp', heading: 'Stability | Root', subtitle: 'Feel Grounded.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "Designed to help you connect deeply with a sense of safety and home, this session focuses on the root, the part of you connected to earth and to feelings of security.", chooseWhen: ['When the ground does not feel like ground','To meet your body where it learned to brace'], spotify: 'https://open.spotify.com/track/23F7Ue858vQVWosvdlWkGV', why: "Your pattern was built when safety was not a given. The root is where the body learned to keep watch. 432 Hz is the softest entry to that floor. Start here.", intention: "I let the bed hold the weight my body has been carrying since I was small." },
    'beloved-earth': { art: 'assets/sessions/beloved-earth.webp', heading: 'Beloved Earth', subtitle: '5 min · Alpha · Soundscape', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Natural Soundscapes', catClass: 'cat-natural', collection: '', lede: "A five-minute alpha-frequency soundscape rooted in low-Hz earth tones. Brief, immersive, and tuned to the felt-sense of being beloved by the planet you stand on.", chooseWhen: ['As a morning opener', 'Between meetings, when the body is bracing', 'To remember the earth is here'], spotify: '', why: "Five minutes is short on purpose. Your system has spent decades learning to hide; long sessions can read as demands at first. This is small enough to actually do, and exactly what a body fighting an illness needs as a daily reminder that the ground is still here.", intention: "I let the earth hold the part of me that has been holding itself alone." },
    'root-grounded-presence': { art: 'assets/sessions/root-grounded-presence.webp', heading: 'Root | Grounded Presence', subtitle: '7 min · Alpha-state anchoring', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form', lede: "A short root-chakra session for daily use. Seven minutes of alpha-state anchoring, short enough to do mid-day, deep enough to register.", chooseWhen: ['As a daily root-check', 'Before a difficult conversation you have been postponing', 'When the urge to vanish rises'], spotify: '', why: "Your root learned to keep watch when you were small. It needs repetition, not depth. Seven minutes most days teaches the system the floor is here, again, today. The short form is the medicine for a pattern that responds to long demands by leaving.", intention: "I check in with the ground. The ground checks back." },

    /* ---- Week 2 — What you have been carrying alone ---- */
    'ease-174': { art: 'assets/sessions/ease-174.webp', heading: 'Ease | 174 Hz', subtitle: 'Soothe the Body That Has Been Carrying a Lot.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "A Solfeggio tone session for soothing aches and pains, bringing you into a state of effortless ease.", chooseWhen: ['When physical discomfort arises','When the upper body is bracing','When the body is fighting something'], spotify: 'https://open.spotify.com/album/0IZxiSGDAIlQQTCN6V9gQD', why: "174 Hz is the lowest Solfeggio tone, traditionally used for the tissue itself. Right for an upper body that has held tension for decades, and right for a system currently fighting an illness alongside the work.", intention: "The places that hurt are allowed to soften. I am not asking them to perform." },
    'fearless-396': { art: 'assets/sessions/fearless-396.webp', heading: 'Fearless | 396 Hz', subtitle: 'Release the Old Bracing.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "Aids in the transcendence of guilt and fear blocks, opening the pathways for self-love and personal empowerment.", chooseWhen: ['When the old fear is loud','For grief at the root','When the body is asking to put something down'], spotify: 'https://open.spotify.com/track/0IVgsgwsl2l8amzrgKWtPE', why: "396 Hz lands at the root, where your body first learned that letting someone down meant rage. The fear was real then. The session does not argue with it. It just lets some of it move.", intention: "I let the old fear leave through my breath. It does not have to come with me." },
    'renewal-417': { art: 'assets/sessions/renewal-417.webp', heading: 'Renewal | 417 Hz', subtitle: 'Cellular Renewal · 9 min', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio I', lede: "417 Hz is the Solfeggio frequency associated with undoing situations and facilitating change. Nine minutes of slow-tempo cellular tone.", chooseWhen: ['When something old is asking to shift', 'Alongside any healing process the body is doing', 'To dissolve a held pattern at tissue level'], spotify: '', why: "Your body is fighting an illness while this work is happening. 417 Hz works at the cellular level, traditionally associated with undoing what has been held too long. Where Ease soothes, Renewal shifts. They pair without competing.", intention: "What has been held too long is allowed to begin shifting." },
    'conscious-to-subconscious': { art: 'assets/sessions/conscious-to-subconscious.webp', heading: 'Conscious to Subconscious', subtitle: '7 min · Alpha · Heart', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Seven minutes of alpha-state passage between the daytime mind and the subconscious. A short bridge session.", chooseWhen: ['Before sleep', 'When the deeper layer is ready to speak', 'For a body whose conscious mind has been doing all the work'], spotify: '', why: "The transcript named this directly: the survival strategy was built when you were small enough that your conscious mind had no say. The pattern lives in the subconscious. This session opens a quiet bridge to where the work actually is.", intention: "I let the deeper layer of me show me what it has been carrying." },

    /* ---- Week 3 — The throat that learned to go quiet ---- */
    'truth-throat': { art: 'assets/sessions/truth-throat.webp', heading: 'Truth | Throat', subtitle: 'Speak What Wants Speaking · 34 min', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Awakening · 432 Hz', lede: "The canonical throat-chakra session. Thirty-four minutes of alpha-state vibration tuned to the field of authentic expression. Designed for systems that have been editing themselves.", chooseWhen: ['When something true wants to come out','Before the conversation you have been avoiding','For a throat that has gone quiet for a reason'], spotify: '', why: "This is the direct answer to your pattern's signature move. Your throat goes quiet because saying the hard thing felt dangerous once. Thirty-four minutes at the throat without anyone asking you to speak. Whatever rises is allowed.", intention: "What I have been editing out is allowed to surface. I do not have to say it yet." },
    'toning-with-ancestors': { art: 'assets/sessions/toning-with-ancestors.webp', heading: 'Toning with the Ancestors', subtitle: 'A Conversation Beyond Words.', artist: 'Jade Fusco', portrait: 'assets/artists/jade-fusco.jpg', category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Guided by Jade Fusco, this session invites you to connect with your lineage through the power of your voice. Humming, toning, singing. Vibration as bridge.", chooseWhen: ['When the throat wants use, not performance','When ancestry is in the field','For voice in private'], spotify: '', why: "Throat-as-vibration before throat-as-conversation. The voice gets to move without anyone needing to hear it correctly. A first practice of being heard by yourself.", intention: "I let my own voice be the bridge. No one else needs to receive it." },
    'heart-hara': { art: 'assets/sessions/heart-hara.webp', heading: 'Heart-Hara Harmony', subtitle: 'Heart and Belly Talk Again.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "An invitation to balance your heart and hara centers, uniting the emotional depth of love with the vibrant energy of creativity and life force.", chooseWhen: ['When the heart and belly are out of conversation','When money and avoidance live together','For the bridge between feeling and doing'], spotify: 'https://open.spotify.com/track/5NNprGnrnUrWpxcIkxitcD', why: "The pattern keeps the heart bracing and the belly avoiding. Heart-Hara puts them back in the same room. The avoidance around money lives right where this session works.", intention: "My heart and my belly can talk to each other without me arranging it." },
    'open-path-741': { art: 'assets/sessions/open-path-741.webp', heading: 'Open Path | 741 Hz', subtitle: 'Clear the Static. Make Room for the Next Word.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Tuned to 741 Hz, often associated with mental and energetic cleansing. The session helps release what weighs on the mind and makes space for fresh energy.", chooseWhen: ['When the head is full of things you have not said','To clear mental static before a conversation','At the end of a week of held words'], spotify: '', why: "741 Hz clears the static around what has been waiting to be spoken. After three sessions at the throat, this loosens what is around it so the next sentence has room to arrive.", intention: "I clear what I have been holding so the next thing I say has room." },

    /* ---- Week 4 — Staying present when you fall short ---- */
    'heart-boundless-compassion': { art: 'assets/sessions/heart-boundless-compassion.webp', heading: 'Heart | Boundless Compassion', subtitle: '7 min · Alpha · Heart chakra', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Chakras', catClass: 'cat-chakras', collection: 'Chakra Series · short-form', lede: "A direct heart-chakra session. Seven minutes of alpha-state expansion that practices compassion received, not given. Short enough to slip into a workday; deep enough to land.", chooseWhen: ['When the chest is bracing for the next falling-short', 'After a conversation that did not go cleanly', 'To practice receiving compassion instead of performing it'], spotify: '', why: "The body learned that being seen falling short meant being hit. This session practices the opposite: being seen with compassion, including the parts that fall short. Notice it is short on purpose. Receiving does not need to be earned through length.", intention: "I let compassion arrive without earning it. I receive what I usually give." },
    'acceptance': { art: 'assets/sessions/acceptance.webp', heading: 'Acceptance', subtitle: '16 min · Alpha · Heart', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: '', lede: "Sixteen minutes of alpha-state heart practice tuned to the felt-sense of acceptance, of self, situation, and the in-between place before the next thing.", chooseWhen: ['Mid-transition', 'When you are still arguing with the current situation', 'When the body is asking you to stop performing the resolution'], spotify: '', why: "The pattern's mirror is to fix the falling-short, to make the avoidance into productivity. Acceptance is the practice of staying with what is, without solving. That is the actual re-patterning. Sit in it. Nothing to make better.", intention: "I accept where I actually am, not where I think I should be." },
    'coherence-639': { art: 'assets/sessions/coherence-639.webp', heading: 'Coherence | 639 Hz', subtitle: 'A New Rhythm Around Relationship.', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Frequency', catClass: 'cat-frequency', collection: 'Solfeggio II', lede: "Carrying the resonance of 639 Hz, often linked to heart connection, emotional balance, and harmonious relationships. The session brings your system into coherence.", chooseWhen: ['When relationship feels weighted','To find a new rhythm between heart and others','When repair is in the air'], spotify: 'https://open.spotify.com/track/7AffEf6huXd4w2I9k5bjZP', why: "Your pattern made relationship synonymous with bracing for the other person's reaction. 639 Hz gives the heart a different rhythm to organize around. Coherence, not performance.", intention: "I listen for the rhythm underneath everything I have been managing." },
    'soar-into-aliveness': { art: 'assets/sessions/soar-into-aliveness.webp', heading: 'Soar Into Aliveness', subtitle: '14 min · Alpha · Heart', artist: 'Sam Bottner', portrait: SAM_PORTRAIT, category: 'Guided', catClass: 'cat-guided', collection: 'Breathwork', lede: "Fourteen minutes of alpha-state heart expansion, breath-led, gently energizing. The session invites your aliveness to come back to its own source.", chooseWhen: ['When your spark has been kept at arm’s length', 'After a stretch of avoidance is starting to soften', 'To re-feed your own field before the next chapter'], spotify: '', why: "Your pattern kept the business at arm's length. The body that has been bracing all month does not need a performance session to close. It needs to feel its own aliveness without aiming it at anyone. That is the close.", intention: "My aliveness can land in me before it leaves through me." }
  },

  /* Before / After prompts — pattern-coded for each of the 16 sessions.
     Each prompt invites the felt-sense around the avoidance pattern, the
     bracing, the unsaid, the body. Never clinical. */
  prompts: {
    /* Week 1 — The ground learns to hold you */
    'welcome-to-opus':            { before: "What is it like to arrive somewhere without having to perform?", after: "What did your body notice when nothing was asked of it?" },
    'stability-root':             { before: "Where does the ground not feel like ground today?", after: "What started to feel like floor? What is still bracing?" },
    'beloved-earth':              { before: "What is the worry you arrived with today?", after: "Did anything in your body remember the earth is here? What part of you got smaller?" },
    'root-grounded-presence':     { before: "Where is the urge to vanish today, on a scale of 1 to 10?", after: "What anchored, even briefly? What is still wanting to leave?" },

    /* Week 2 — What you have been carrying alone */
    'ease-174':                   { before: "What in the upper body has been bracing the longest?", after: "What softened? What is still asking?" },
    'fearless-396':               { before: "What is the old fear still saying about being seen falling short?", after: "What did you let go of? What stayed because it is not ready yet?" },
    'renewal-417':                { before: "What pattern in your body has been held too long?", after: "What part of you started to shift, even at the edge of feeling? What stayed where it was?" },
    'conscious-to-subconscious':  { before: "What does the part of you that has not been speaking want to say?", after: "What surfaced from the deeper layer? What did the conscious mind not know was already in motion?" },

    /* Week 3 — The throat that learned to go quiet */
    'truth-throat':               { before: "What is the true sentence you have not said this week?", after: "What rose in your throat? Did you have to do anything with it, or was rising enough?" },
    'toning-with-ancestors':      { before: "What is it like to use your voice without an audience?", after: "What did your own voice teach you that nobody else needed to be there for?" },
    'heart-hara':                 { before: "Where is the avoidance around money living in your body right now?", after: "What conversation happened between your heart and your belly? What changed in the room between them?" },
    'open-path-741':               { before: "What sentence has been waiting in your head all week?", after: "What is open in the head now that was not before? What direction is the next word coming from?" },

    /* Week 4 — Staying present when you fall short */
    'heart-boundless-compassion': { before: "Where in the last week did you fall short, and what did your body do in response?", after: "What part of your chest received something today? Did anything land that you did not have to earn?" },
    'acceptance':                 { before: "What current situation are you still trying to fix instead of being in?", after: "What got easier to stay with, without solving? What is still asking for a fight?" },
    'coherence-639':              { before: "What relationship has been waiting on a conversation that you have not started?", after: "Where did coherence land? What got softer toward whom?" },
    'soar-into-aliveness':        { before: "Where is your aliveness pointed right now: outward, or staying with you?", after: "What part of your aliveness came back toward you? Where did it land?" }
  },

  /* 4-week plan — v1.10.1: re-curated from the 128-session OPUS library.
     Eight sessions are NEW pattern-specific picks (beloved-earth,
     root-grounded-presence, renewal-417, conscious-to-subconscious,
     truth-throat, heart-boundless-compassion, acceptance,
     soar-into-aliveness). Eight are shared with Ramon's pool because
     those tools really are the right tools for both users. */
  plan: [
    { week: 1, title: 'The ground learns to hold you', intent: "Before any pattern can be touched, the body needs to learn that this room, this hour, this bed, is not the kitchen. Nothing is asked of you here.", responds: 'Upper-body bracing · illness in the field · a system whose first move is to leave', sessions: ['welcome-to-opus','stability-root','beloved-earth','root-grounded-presence'] },
    { week: 2, title: 'What you have been carrying alone', intent: "The back, the shoulders, the chest tightness. Decades of \"I will handle it quietly.\" The body gets to put some of it down here, and the cellular layer gets to begin renewing.", responds: 'Back and shoulders / the upper-body holding / the survival strategy of carrying it alone / the body fighting an illness alongside the work', sessions: ['ease-174','fearless-396','renewal-417','conscious-to-subconscious'] },
    { week: 3, title: 'The throat that learned to go quiet', intent: "Now, and only now, because the body is regulated enough, the throat. We do not push it open. We let it be heard first. Listening is throat work too.", responds: 'Silence with the business partner / missed conversations with Leah / broken promises / the unsaid', sessions: ['truth-throat','toning-with-ancestors','heart-hara','open-path-741'] },
    { week: 4, title: 'Staying present when you fall short', intent: "The new pattern. Not \"never disappoint anyone,\" that is the old pattern's mirror. The body learning: I can disappoint someone and stay in the room. I can be seen falling short and not vanish.", responds: 'Heart coherence as the integration site / compassion received instead of performed / acceptance instead of repair / aliveness that comes back to you', sessions: ['heart-boundless-compassion','acceptance','coherence-639','soar-into-aliveness'] }
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
    /* Week 1 — grounding pulses the back (where weight is carried) and
       chest (where bracing softens). */
    'welcome-to-opus':            'chest',
    'stability-root':             'back',
    'beloved-earth':              'back',
    'root-grounded-presence':     'back',

    /* Week 2 — putting weight down (back), cellular renewal (chest), the
       subconscious bridge (chest). */
    'ease-174':                   'back',
    'fearless-396':               'chest',
    'renewal-417':                'chest',
    'conscious-to-subconscious':  'chest',

    /* Week 3 — the throat. */
    'truth-throat':               'throat',
    'toning-with-ancestors':      'throat',
    'heart-hara':                 'chest',
    'open-path-741':              'throat',

    /* Week 4 — heart and chest coming back online. */
    'heart-boundless-compassion': 'chest',
    'acceptance':                 'chest',
    'coherence-639':              'chest',
    'soar-into-aliveness':        'chest'
  }
};
