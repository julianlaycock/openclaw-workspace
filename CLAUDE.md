# CLAUDE.md — Caelith Project Intelligence

Every session starts here. Read this before touching anything.

---

## Project Overview

**Caelith** — Compliance infrastructure platform for European alternative investment fund managers.
- **Frontend:** Next.js (App Router) on `localhost:3000`
- **Backend:** Express on `localhost:3001`
- **Production:** `https://www.caelith.tech` (Railway, EU West)
- **Repo:** `C:\Users\julia\projects\private-asset-registry_Caelith_v2`
- **Workspace:** `C:\Users\julia\openclaw-workspace`

## Architecture — Critical Paths

### Landing Page
- **NOT in a React component.** Landing is raw HTML served via API route.
- EN: `src/frontend/public/static/landing-en.html`
- DE: `src/frontend/public/static/landing-de.html`
- Route handler: `src/frontend/src/app/api/landing/route.ts` (reads HTML with `readFileSync`)
- **NEVER put large HTML into TS string exports** — causes SWC/miette Rust panic at ~70KB+
- Use `.mjs` scripts with `writeFileSync` to edit landing files (PowerShell `Set-Content` writes UTF-16/BOM, breaks SWC)
- EN and DE must mirror each other perfectly — same structure, same sections, same order
- Mobile landing: `landing-mobile-en.html` / `landing-mobile-de.html` — served via UA detection in `route.ts`
- **⚠️ NEVER overwrite `landing-en.html` or `landing-de.html` from a file named `*mobile*`, `*preview*`, or `*concept*`**
- **⚠️ NEVER run a gen script that touches `public/static/landing-{en,de}.html` without explicit approval from Julian**
- Desktop landing is ~57KB. If output drops below 48KB, abort — wrong source file
- Source for mobile gen: `_PREVIEW_DO_NOT_DEPLOY_mobile-v2.html` (named to prevent accidental use)
- Gen script: `gen-landing-mobile.mjs` — requires `--production` flag to copy to project; dry-run by default

### Login Page
- `src/frontend/src/app/login/page.tsx` — Split panel design (Option B)
- Left: brand hero + stats. Right: login form + demo CTA.

### 404 Page
- `src/frontend/src/app/not-found.tsx` — Branded gradient dark theme

### Auth
- `src/frontend/src/app/auth-layout.tsx` — public routes: `/blog`, `/api/blog`, `/static`, `/readiness-check`
- Auth cookies: `SameSite=Lax` (not Strict — breaks tablet/mobile)
- Rate limit: 100/15min (was 20, too aggressive)

### Database
- PostgreSQL with Row-Level Security via `SET LOCAL app.tenant_id`
- **Bug fixed:** Can't use parameterized `SET LOCAL` — uses UUID-validated string interpolation in `withTenantContext()` (`db.ts:143`)
- Migrations in `scripts/migrate.ts` — run manually on Railway, auto on localhost

### API
- 60+ endpoints, versioned `/api/v1/*`
- OpenAPI/Swagger at `/api/docs`
- API key auth (`ck_live_` prefix, bcrypt)

## Design System

### Colors
```
--bg: #1a1f1f        --bg2: #2D3333
--accent: #8EC5E0     --accent-sat: #6BB8D9
--warm: #E8A87C
--light-bg: #F8F9FA   --light-card: #FFFFFF
--glass-bg: rgba(255,255,255,0.03)
--glass-border: rgba(255,255,255,0.10)
--radius: 14px
--grad: linear-gradient(135deg, #8EC5E0, #E8A87C)
```

### Fonts
- **Sora** — headings (700, 800)
- **Inter** — body text (400, 500, 600)
- **JetBrains Mono** — code, labels, monospace elements

### Landing Page Structure (v2 — 9 sections)
1. Hero (dark) — terminal animation, dual CTAs
2. Features (light) — 6 cards + readiness banner with countdown
3. Platform (dark) — dashboard mockup + copilot chat side-by-side
4. Comparison (light) — €180K vs €11,880 table
5. API + Open Source (dark) — code block + npm inline
6. Pricing (light) — 3 tiers, gradient border on featured
7. Trust + Resources (dark) — 5 pills + 2 blog cards
8. CTA + FAQ (dark) — countdown pill + 7 FAQ items
9. Footer (dark) — 5 columns + social icons

### Key UI Patterns
- Navbar morph: floating pill at scrollY > 80px (1.1s spring, 24px radius, frosted glass)
- Reveal animations: IntersectionObserver, threshold 0.01, rootMargin '50px 0px -20px 0px', double rAF wrapper
- Button glow: radial gradient follows mouse via CSS custom properties
- FAQ: one-at-a-time accordion, left border highlight, aria-expanded

## Railway Deployment

### Critical Rules
- **Use `npx tsx src/backend/server.ts`** — NOT compiled `dist/` (paths differ)
- **No healthcheck** — tsx startup too slow for Railway timeout
- **No `file:` deps** in package.json — inline or npm publish first
- `PG_SSL_REJECT_UNAUTHORIZED=false` required for Railway internal Postgres
- `ADMIN_PASSWORD` env var must be set (non-fatal if missing now)
- Build takes 3-5 min, don't investigate "bugs" until deploy is actually live
- **"Completed" ≠ "Online"** — "Completed" means process exited. Server must keep running.
- Max restart retries: 3 (was 10, burned credits)
- Backend API is private (internal-only via `caelith-api.railway.internal`)
- Postgres public proxy removed

### Deploy Verification
```bash
# Check if deploy landed before investigating bugs
curl -s -o /dev/null -w "%{http_code}" https://www.caelith.tech/api/landing
```

## Git Workflow

### Mandatory Checkpoint
Before ANY code changes:
```bash
git add -A && git commit -m "checkpoint: before <description>"
```

### Commit Convention
- `feat:` new features
- `fix:` bug fixes
- `chore:` maintenance, deps
- `docs:` documentation
- Never force-push without Julian's explicit approval

## PowerShell Gotchas
- `&&` doesn't work — use `;` or separate commands
- `Set-Content` writes UTF-16/BOM — use Node.js `writeFileSync` for source files
- Use `.mjs` scripts for file manipulation, not PowerShell

## Common Mistakes (Don't Repeat These)

1. **Testing on wrong environment** — Always ask: localhost or Railway?
2. **fix-all-landing.mjs nuked scripts** — IntersectionObserver regex was too broad, wiped terminal typing, navbar, FAQ toggle. Never use broad regex on HTML files.
3. **CSS `\u2713` vs `\2713`** — JS unicode escape ≠ CSS unicode escape in `content` properties
4. **SameSite=Strict broke mobile** — Changed to Lax
5. **`npm ci` + optionalDependencies** — Breaks Railway. Don't put Sentry there.
6. **rate limit 20/15min** — Way too aggressive during testing. Now 100/15min.
7. **Large TS string exports** — SWC Rust panic. Keep HTML in static files.
8. **Double checkmarks** — CSS `::before` content + hardcoded ✓ in HTML = shows twice
9. **screening/page.tsx UTF-16 encoding** — File had invalid UTF-8 (likely PowerShell Set-Content), broke Railway build. Fix: `[System.IO.File]::WriteAllText(path, content, [System.Text.UTF8Encoding]::new($false))`

## Pricing
| Tier | Price | Funds | Investors |
|------|-------|-------|-----------|
| Essentials | €990/mo | 3 | 200 |
| Professional | €1,990/mo | 15 | Unlimited |
| Enterprise | From €3,500/mo | Unlimited | Unlimited |

## Key URLs
- Production: `https://www.caelith.tech`
- Landing EN: `/api/landing`
- Landing DE: `/api/landing?lang=de`
- API Docs: `/api/docs`
- Blog: `/blog`
- Readiness: `/readiness-check`
- Copilot Demo: `/api/copilot-demo`
- Demo Dashboard: `/demo-dashboard` (redirects to landing on prod — known issue)

## Business Context
- **CEO:** Julian Laycock
- **Stage:** Pre-revenue, Campus Founders Batch 4 accelerator
- **Deadline:** AIFMD II enforcement April 16, 2026
- **Key investor call:** Finch Capital, Mon Mar 2, 10:30 CET
- **Positioning:** "Sphinx for EU Fund Compliance" (Sphinx raised $7.1M for US fintech compliance agents)
- **Open-core model:** Open schemas/libraries, paid managed platform
- **Target:** German KVGs first, then fund admins, then AI agent builders

## QA Checklist
Full 67-check QA at: `C:\Users\julia\openclaw-workspace\LANDING-QA-CHECKLIST.md`
Interactive HTML version: `C:\Users\julia\openclaw-workspace\landing-qa-checklist.html`

## CRITICAL: File Encoding Rules
- NEVER use PowerShell Set-Content or Get-Content | Set-Content for HTML/TS files with non-ASCII chars
- ALWAYS use Node.js writeFileSync(path, content, 'utf8') for the readiness-check route.ts
- ALWAYS use [System.IO.File]::WriteAllText(path, content, UTF8NoBOM) when PowerShell write is unavoidable
- Run pre-flight mojibake check before writing: if content.includes('\u00e2\u20ac') abort

