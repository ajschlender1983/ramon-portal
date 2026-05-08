# Ramon Resolver — Cloudflare Worker

Two endpoints that the Ramon portal calls:

- `POST /reflect` — one Claude call. Returns `{ reflection: string }`.
- `POST /deepen` — server-side chain of 4 Claude calls (one strategic-resolve voice pair + three EBI passes). Returns `{ deepReflection: string, passes: [string,string,string,string] }`.

The Worker holds the Anthropic API key as a secret; the static page never sees it.

## One-time setup

```bash
cd projects/ramon-portal/worker
npm i -g wrangler            # if you don't already have it
wrangler login               # browser auth
wrangler secret put ANTHROPIC_API_KEY
# paste your sk-ant-... key when prompted
```

## Local development

Create `projects/ramon-portal/worker/.dev.vars` (gitignored — do not commit):

```
ANTHROPIC_API_KEY=sk-ant-...
```

Then:

```bash
wrangler dev
# serves on http://127.0.0.1:8787 by default
```

In the portal source (`projects/ramon-portal/public/index.html`), set:

```js
const RESOLVE_BASE = 'http://127.0.0.1:8787';
```

…and reload `http://localhost:8201/` in your browser.

## Deploy

```bash
wrangler deploy
```

Wrangler prints a `https://ramon-resolver.<your-subdomain>.workers.dev` URL. Paste it as `RESOLVE_BASE` in `index.html` and ship.

## Configuration

In `wrangler.toml`:

| Var | Purpose |
|---|---|
| `MODEL` | Anthropic model id. Defaults to `claude-opus-4-7`. Override per-environment as needed. |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist. Defaults to `https://pulse.feelopus.com` plus localhost. |
| `ANTHROPIC_API_KEY` | **Set as a secret, NOT a var.** Use `wrangler secret put`. |

## Smoke test

```bash
curl -s -X POST http://127.0.0.1:8787/reflect \
  -H 'content-type: application/json' \
  -d '{
    "slug":"welcome-to-opus",
    "biofield":"Root: undercharged. Crown: oversaturated.",
    "biofieldParsed":{"frames":{}},
    "session":{"heading":"Welcome to Opus","subtitle":"Discover SoundBed.","intention":"Let me arrive without needing to do anything yet.","why":"First-session orientation.","lede":"...","artist":"OPUS","category":"Welcome"},
    "before":"A bit anxious arriving.",
    "after":"My breath got slower around the third minute.",
    "journey":{"week":1,"weeksCompleted":0,"sessionsWithNoteCount":1}
  }'
```

Expect: `{"reflection":"...two short paragraphs..."}`.

## Notes

- No rate limiting, no auth — single-user experiment. Add Cloudflare Access in front of the Worker if it ever needs hardening.
- `/deepen` makes 4 sequential upstream calls. Expect ~15-25s wall-clock under normal Anthropic load.
- All requests log to Cloudflare's tail. Use `wrangler tail` to watch live.
- No persistence on the Worker side. Reflections live only in the user's `localStorage`.
