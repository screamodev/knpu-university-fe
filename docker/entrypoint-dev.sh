#!/bin/sh
set -e
export CI="${CI:-true}"
cd /opt/app

echo "[entrypoint-dev] pnpm install…"
# CI=true (set in docker-compose for pnpm) defaults to frozen-lockfile; dev must reconcile
# package.json + node_modules (especially with an anonymous node_modules volume).
pnpm install --no-frozen-lockfile

if [ ! -f node_modules/@tiptap/vue-3/package.json ]; then
  echo "[entrypoint-dev] ERROR: @tiptap/vue-3 missing after install. Try: docker compose down -v then up --build" >&2
  ls -la node_modules/@tiptap 2>&1 || echo "(no @tiptap dir)" >&2
  exit 1
fi

if [ ! -f node_modules/@tiptap/extension-text-align/package.json ]; then
  echo "[entrypoint-dev] ERROR: @tiptap/extension-text-align missing after install." >&2
  echo "[entrypoint-dev] Rebuild deps volume: docker compose -f docker-compose.dev.yml down -v && docker compose -f docker-compose.dev.yml up --build" >&2
  exit 1
fi

echo "[entrypoint-dev] starting dev server…"
exec pnpm run dev
