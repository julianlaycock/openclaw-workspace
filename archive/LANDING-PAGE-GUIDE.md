# Landing Page — Developer Guide

## Architecture

The landing page HTML lives as **static files**, not TypeScript string exports:

```
src/frontend/public/static/landing-en.html   ← English
src/frontend/public/static/landing-de.html   ← German
src/frontend/src/app/api/landing/route.ts    ← Route handler (reads HTML with fs.readFileSync)
```

### Why static files?

The landing pages are ~76KB of HTML. Previously they were exported as single-line string literals from `.ts` files. This caused the **SWC compiler (Rust) to panic** in dev mode — the `miette` error formatter crashes on lines >50KB.

By moving to static HTML files read at runtime with `fs.readFileSync`, SWC never compiles them.

### ⚠️ NEVER go back to TS string exports for large HTML

Do NOT put large HTML back into `.ts` files as string exports. It will crash the Next.js dev server.

## Local Development

```bash
npm run dev
# Open: http://localhost:3000/api/landing
# German: http://localhost:3000/api/landing?lang=de
```

The HTML files are read fresh on each request in dev mode — just edit and refresh.

## Editing the Landing Page

1. Edit `src/frontend/public/static/landing-en.html` (and/or `-de.html`)
2. Refresh `http://localhost:3000/api/landing`
3. That's it — no restart needed, `readFileSync` picks up changes immediately

## Production (Railway)

The `route.ts` reads from `public/static/` which is available in production.
Ensure the `public/static/` dir is committed to git.

## Legacy Files (can be deleted after confirming prod works)

- `src/frontend/src/app/api/landing/landing-en.ts`
- `src/frontend/src/app/api/landing/landing-de.ts`
