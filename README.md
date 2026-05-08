# Ramon Portal

A private 30-day SoundBed map drawn from a personal Biofield reading. Self-contained static page + a Cloudflare Worker that proxies the Anthropic API for per-session reflections. Multi-user since v1.1.0: the same site serves any number of users via per-user data files and a slug-based URL.

> Personal experiment. Not OPUS-affiliated. Contains personal data — keep this repo **private**.

## Layout

```
ramon-portal/
├── public/                       static site (deploy to Cloudflare Pages)
│   ├── index.html                generic shell, no per-user data
│   ├── users/                    one file per user, selected by ?u=<slug>
│   │   └── ramon-r9k2x.js        Ramon's reading + 16-session map + 32 prompts
│   └── assets/                   session art, artist portraits, logos, user portraits
└── worker/                       Cloudflare Worker (Anthropic proxy)
    ├── worker.js
    ├── wrangler.toml
    └── README.md                 Worker-specific deploy notes
```

The static page calls two endpoints on the Worker:
- `POST /reflect` — single Anthropic call returning a per-session reflection
- `POST /deepen` — server-side chain of one strategic-resolve voice pair + three EBI passes

The Anthropic API key lives only as a Cloudflare Worker secret. The static page never sees it.

---

## URL shape and the slug system

Each user gets their own private link:

```
https://<your-pages-domain>/?u=<slug>
```

The slug names a file under `public/users/<slug>.js`. That file sets `window.USER_DATA` with the user's reading, 16-session map, 32 prompts, plan, and chakra states. The same `index.html` serves every user; only the data file changes.

If `?u=...` is missing or the slug doesn't match a file, the page renders an "this link is no longer active" gate. The main UI never paints.

**Pick obscure slugs.** URLs leak via referer headers, browser history, copy-paste. Use something like `firstname-r9k2x` (random suffix), not `firstname`. Anyone with the URL can read the entire user data file.

---

## Adding a new user

1. Pick a slug. Format: lowercase letters, digits, hyphens. Add a random suffix.
2. Copy `public/users/ramon-r9k2x.js` to `public/users/<new-slug>.js`.
3. Replace the values:
   - `slug`: must match the filename
   - `displayName`: the user's first name as it appears in the hero ("Designed for X")
   - `period`: e.g. "April 2026"
   - `reading`: the practitioner's Biofield reading text (template literal, multi-line)
   - `sessions`: 16 SoundBed sessions you've selected for them, with each session's `why` and `intention` written for them
   - `prompts`: 32 Before/After prompts (one pair per session)
   - `plan`: the 4-week structure (intent + responds line per week + which sessions go where)
   - `chakraStates`: 7 chakra entries parsed from their reading
   - `slugToChakra`: which chakra each session maps to (used for the on-resolve pulse animation)
4. Optional: add a portrait at `public/assets/portraits/<simple-name>.jpg` and reference it via `portrait: 'assets/portraits/<simple-name>.jpg'` in the user file. If absent, the dashboard falls back to `assets/portraits/<slug>.jpg`.
5. Commit and push. Cloudflare Pages auto-deploys.
6. Send the user their link: `https://<your-pages-domain>/?u=<new-slug>`.

Each user's notes, reflections, and pre-dashboard line live in their browser's `localStorage`, keyed by slug — so no collisions even if two users open the same browser.

---

## Versioning and rolling updates

The current version is in `public/index.html`:

```js
const VERSION = '1.1.0';
```

Bump it when you ship a meaningful change. The version is shown subtly in the footer.

For rolling updates: every `git push` to `main` triggers an automatic Cloudflare Pages deploy (about 30 seconds). User notes survive across deploys because:
- localStorage keys are stable (`<slug>.notes.v1`, `<slug>.field.v1`, etc.).
- Per-user data file shape changes are additive: you can add new fields, and old user files keep working as long as the existing fields are still read.
- If you ever need to break the data shape, bump the version (e.g. `2.0.0`) and either migrate existing user files or write a one-time `localStorage` migration block.

---

## Local development

### Static page

```bash
cd public
python3 -m http.server 8201
# open http://localhost:8201/?u=ramon-r9k2x
```

Until the Worker is reachable, calls to `/reflect` and `/deepen` will fail. The page falls back to showing the would-be payload in a debug panel.

### Worker

```bash
cd worker
npm i -g wrangler                                  # if you don't have it
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars   # local key, gitignored
wrangler dev
# serves on http://127.0.0.1:8787
```

In `public/index.html`, temporarily set:
```js
const RESOLVE_BASE = 'http://127.0.0.1:8787';
```

Then reload `?u=ramon-r9k2x`. Resolves and deepens now hit the local Worker, which calls Anthropic with the dev key.

---

## Production deploy

Two pieces, two deploys.

### A. Worker → Cloudflare

```bash
cd worker
wrangler login
wrangler secret put ANTHROPIC_API_KEY    # paste production key
wrangler deploy
```

Wrangler prints `https://ramon-resolver.<subdomain>.workers.dev`. Save that URL.

Smoke test:
```bash
curl -s -X POST https://ramon-resolver.<subdomain>.workers.dev/reflect \
  -H 'content-type: application/json' \
  -d '{"userName":"Ramon","slug":"welcome-to-opus","biofield":"Root undercharged","biofieldParsed":{"frames":{}},"session":{"heading":"Welcome to Opus","subtitle":"Discover SoundBed.","intention":"Let me arrive without needing to do anything yet.","why":"First-session orientation.","lede":"Your first session.","artist":"OPUS","category":"Welcome"},"before":"A bit anxious arriving.","after":"My breath got slower around the third minute.","journey":{"week":1,"weeksCompleted":0,"sessionsWithNoteCount":1}}'
```

Expect a JSON response with a `reflection` field of two short paragraphs that addresses the user by name.

### B. Static page → Cloudflare Pages

1. Push this repo to your private GitHub.
2. Cloudflare dashboard → **Pages** → **Connect to Git** → select the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: **`public`**
   - Root directory: **`/`**
4. Deploy. Cloudflare returns a URL like `https://ramon-portal.pages.dev`.

### C. Wire the two together

1. **Update Worker CORS.** Edit `worker/wrangler.toml`, add the Pages domain to `ALLOWED_ORIGINS`:
   ```toml
   ALLOWED_ORIGINS = "https://ramon-portal.pages.dev,http://localhost:8201,http://127.0.0.1:8201"
   ```
   Redeploy: `cd worker && wrangler deploy`.

2. **Set `RESOLVE_BASE` in the static page.** Already pointing at the live Worker URL since v1.1.0:
   ```js
   const RESOLVE_BASE = 'https://ramon-resolver.<subdomain>.workers.dev';
   ```
   If you change the Worker URL, update this and push.

3. **Smoke test in a fresh browser.** Visit `https://<pages-domain>/?u=ramon-r9k2x` → dismiss the gate → fill Before + After on a session card → click **See the reflection** → confirm a real Anthropic-generated reflection comes back addressing the user by name.

---

## Privacy

- All notes, reflections, and the optional pre-dashboard "what you already know" line live in the user's `localStorage`. Nothing is persisted server-side.
- The Worker forwards the user's text to Anthropic only when the user clicks **See the reflection** or **Go deeper**. No background calls.
- The Anthropic API key is never exposed to the browser.
- Each user's data file (`users/<slug>.js`) is publicly fetchable by anyone who knows the slug. Use random-suffixed slugs and treat the URL as a private credential.
- Set the GitHub repo to **private** — user data files contain personal Biofield content.
