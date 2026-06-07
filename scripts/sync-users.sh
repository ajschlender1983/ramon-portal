#!/usr/bin/env bash
# Mirror every user's KV state into users-data/<slug>.json so it's
# inspectable, version-controlled, and durable in git.
#
# Usage:
#   ADMIN_TOKEN=<token> ./scripts/sync-users.sh
#
# Each run overwrites the current snapshot files and produces a
# commit-ready diff. Treat this as the canonical mirror; KV remains
# the live source of truth that the page reads/writes.

set -euo pipefail

WORKER_URL="${WORKER_URL:-https://ramon-resolver.ajschlender.workers.dev}"
OUT_DIR="${OUT_DIR:-users-data}"

if [ -z "${ADMIN_TOKEN:-}" ]; then
  echo "ERROR: ADMIN_TOKEN env var required" >&2
  echo "  example: ADMIN_TOKEN=<token> $0" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$REPO_ROOT/$OUT_DIR"

echo "Pulling user state from $WORKER_URL …"
TMP_RESP="$(mktemp)"
trap 'rm -f "$TMP_RESP"' EXIT
curl -sf -H "x-admin-token: $ADMIN_TOKEN" "$WORKER_URL/state/all" > "$TMP_RESP"
COUNT=$(python3 -c "import json,sys; print(json.load(open('$TMP_RESP')).get('count',0))")
echo "Server returned $COUNT users."

python3 - "$REPO_ROOT/$OUT_DIR" "$TMP_RESP" <<'PY'
import json, os, sys
out_dir = sys.argv[1]
resp_path = sys.argv[2]
with open(resp_path) as f:
    data = json.load(f)
users = data.get("users", [])
manifest = {"generated_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
            "count": len(users),
            "slugs": []}
for u in users:
    slug = u["slug"]
    record = {
        "slug": slug,
        "ts": u.get("ts"),
        "state": u.get("state", {})
    }
    path = os.path.join(out_dir, f"{slug}.json")
    with open(path, "w") as f:
        json.dump(record, f, indent=2, sort_keys=True)
        f.write("\n")
    manifest["slugs"].append(slug)
    print(f"  wrote {path}")
with open(os.path.join(out_dir, "MANIFEST.json"), "w") as f:
    json.dump(manifest, f, indent=2, sort_keys=True)
    f.write("\n")
PY

echo
echo "Done. Files in $REPO_ROOT/$OUT_DIR/."
echo "Next: git add $OUT_DIR && git commit -m 'mirror users from KV'"
