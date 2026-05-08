# Ramon Portal

A private 30-day SoundBed map for one user, drawn from a personal Biofield reading. Self-contained static page + a Cloudflare Worker that proxies the Anthropic API for per-session reflections.

> Personal experiment. Not OPUS-affiliated. Contains hardcoded personal data — keep this repo **private**.

## Layout

```
ramon-portal/
├── public/          static site (deploy to Cloudflare Pages)
│   ├── index.html
│   └── assets/      session art, artist portraits, logos, Ramon's portrait
└── worker/          Cloudflare Worker (Anthropic proxy)
    ├── worker.js
    ├── wrangler.toml
    └── README.md    Worker-specific deploy notes
```

The static page calls two endpoints on the Worker:
- `POST /reflect` — single Anthropic call returning a per-session reflection
- `POST /deepen` — server-side chain of one strategic-resolve voice pair + three EBI passes

The Anthropic API key lives only as a Cloudflare Worker secret. The static page never sees it.

---

## Local development

### Static page

```bash
cd public
python3 -m http.server 8201
# open http://localhost:8201/
```

Until the Worker is reachable, calls to `/reflect` and `/deepen` will fail. The page falls back to showing the would-be payload in a debug panel — useful for iterating on UI without the Worker live.

### Worker

```bash
cd worker
npm i -g wrangler                                  # if you don't have it
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .dev.vars   # local key, gitignored
wrangler dev
# serves on http://127.0.0.1:8787
```

In `public/index.html`, set:
```js
const RESOLVE_BASE = 'http://127.0.0.1:8787';
```

Then reload the page. Resolves and deepens now hit the local Worker, which calls Anthropic with the dev key.

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
  -d '{"slug":"welcome-to-opus","biofield":"Root undercharged","biofieldParsed":{"frames":{}},"session":{"heading":"Welcome to Opus","subtitle":"Discover SoundBed.","intention":"Let me arrive without needing to do anything yet.","why":"First-session orientation.","lede":"Your first session.","artist":"OPUS","category":"Welcome"},"before":"A bit anxious arriving.","after":"My breath got slower around the third minute.","journey":{"week":1,"weeksCompleted":0,"sessionsWithNoteCount":1}}'
```

Expect a JSON response with a `reflection` field of two short paragraphs.

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

2. **Update `RESOLVE_BASE` in the static page.** Edit `public/index.html`, find:
   ```js
   const RESOLVE_BASE = 'http://127.0.0.1:8787';
   ```
   and change it to the live Worker URL:
   ```js
   const RESOLVE_BASE = 'https://ramon-resolver.<subdomain>.workers.dev';
   ```
   Commit and push. Cloudflare Pages auto-deploys.

3. **Smoke test in a fresh browser.** Visit the Pages URL → dismiss the gate → fill Before + After on a session card → click **See the reflection** → confirm a real Anthropic-generated reflection comes back.

---

## What's hardcoded

- `RAMON_INPUT` in `public/index.html` — the practitioner's Biofield reading, rendered into the dashboard
- `SESSIONS` — 16 SoundBed sessions selected for Ramon's 30-day arc, each with album art and an authored "why this for you" line
- `PROMPTS` — 32 session-specific Before/After prompts written for Ramon's journey
- `CHAKRA_STATES` — 7 chakra states from the reading

To re-target this portal for a different user, swap these data blocks.

---

## Privacy

- All notes, reflections, and the optional pre-dashboard "what you already know" line live in the user's `localStorage`. Nothing is persisted server-side.
- The Worker forwards the user's text to Anthropic only when the user clicks **See the reflection** or **Go deeper**. No background calls.
- The Anthropic API key is never exposed to the browser.
- Set the GitHub repo to **private** — `RAMON_INPUT` contains personal Biofield content.
