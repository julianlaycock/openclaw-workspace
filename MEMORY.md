# MEMORY.md - Long-Term Memory

## Workspace Structure (IMPORTANT)
All non-core files (HTML previews, scripts, PDFs, CSVs, PS1, MJS, etc.) have been moved to `archive/` subfolder to fix performance issues. Core bootstrap files (MEMORY.md, SOUL.md, USER.md, AGENTS.md, TOOLS.md, HEARTBEAT.md, IDENTITY.md, USER.md) remain in root. **Always read from `archive/filename` for any non-core file.** Nothing was deleted — everything is in `C:\Users\julia\openclaw-workspace\archive\`.

## 2026-03-08 — CSSF LuxTrust Email + Infrastructure Landing Page + Demo Audit

### CSSF LuxTrust Certificate — EMAIL SENT
Julian emailed CSSF (edesk@cssf.lu) regarding LuxTrust certificate for eDesk S3 filing integration. Waiting for response. Blocks CSSF filing agent go-live.

### Infrastructure Built (as of 2026-03-07)
- **BaFin SOAP Client**: Live-verified, 23/23 E2E tests. Blocked on real entity ID (BaFin support emailed).
- **CSSF S3 Client**: Built, blocked on LuxTrust cert (email sent 2026-03-08)
- **Filing Pipeline API**: 7 endpoints at `/api/v1/pipeline/*`
- **Regulatory Feed**: 3 live scrapers (ESMA, BaFin, CSSF), 40 items, topic classification
- **Agent Demo Page**: Live at `/agents` — "Compliance that runs while you sleep"

### Landing Page Infrastructure Section — 3 OPTIONS RENDERED
File: `landing-infra-options.html`
- **Option A**: Visual pipeline flow (Ingest → Validate → Generate → Submit → Track)
- **Option B**: Three pillars product cards (Filing API / Reg Feed / Dashboard) with code
- **Option C**: Infrastructure layers + live terminal demo (best for VCs)

### Demo Critical Audit — 14 Findings
**What works**: Dashboard, funds, investors, rules, screening, decisions, AIFMD II check, Annex IV, calendar, agents, copilot FAB, demo banner, API docs — all functional.
**HIGH issues**: (1) Root URL blank, (2) Copilot rate limit too aggressive, (3) Landing doesn't reflect infra pivot, (4) Blog links broken on landing
**MEDIUM**: (5) Blog German-only, (6) Blog dates say 2025, (7) Readiness check minimal, (8) 3 funds show 0 investors, (9) Screening page empty
**LOW**: (10) Date format inconsistency, (11) Campus Founders pill premature, (12) Countdown stale on initial render

---

## 2026-02-28 — Strategic Pivot: "Sphinx for EU Fund Compliance"

### The Decision
Validated agent thesis through Sphinx ($7.1M seed, Cherry Ventures + YC) deep dive. They automate AML/KYC for US fintechs/banks with browser-native agents. Zero overlap with Caelith (we do AIFMD/regulatory reporting for EU fund managers). Same thesis, different vertical.

**New positioning:** "Compliance intelligence + autonomous agents for European fund managers"
**VC pitch:** "Sphinx raised $7.1M for US fintech compliance agents. We're doing it for EU fund managers. Same thesis, zero overlap."

### Validated Hypotheses
- BaFin MVP Portal is automatable (no CAPTCHA, standard login, XML upload)
- Agent approach validated by $7.1M in VC funding to Sphinx
- Norway mandating XML-only Annex IV from June 2026 (more countries going digital)
- Anevis acquiring IT service providers (competitive pressure increasing)

### Eligibility Updated (Gründungszuschuss Status)
Julian's thesis: Agents are inevitable, build before demand materializes. Sphinx validates assumption.
Mate's pushback: Don't build before first revenue. Pipeline is the bottleneck, not features.
**Compromise:** Sell + build simultaneously. Today = narrative + outreach + research. Next week = BaFin agent PoC with pipeline filling in parallel.

### 3 Killer Agents to Build (prioritized)
1. **BaFin MVP Portal Filing Agent** — auto-submit Annex IV XML (2-3 weeks, biggest demo wow factor)
2. **CSSF eDesk Filing Agent** — Luxembourg market (2 weeks, 70% reusable from BaFin)
3. **Investor Due Diligence Research Agent** — GLEIF + Transparenzregister + sanctions + adverse media (3-4 weeks)

### Today's Sprint (5 high-ROI steps)
1. Finch Capital pitch narrative with Sphinx angle (Mon Mar 2 call)
2. Landing page "Compliance Agents — Coming Soon"
3. Email Sphinx (partnership/intel)
4. Document BaFin MVP Portal workflow
5. Fresh outreach batch (47 days to AIFMD II deadline)

---

## 2026-02-27 — Biggest Build Day (60+ Endpoints, Accelerator Submitted)

### Product Shipped (26 items — highlights)
- Landing page mojibake fixed, demo welcome banner, keep-alive cron (5-min pings)
- Sanctions near-match seed, Swagger 401 errors, readiness check CTA (Calendly, EN/DE)
- Demo auth retry + session guards (DELETE blocked for demo users)
- Blog: /blog/annex-iv-xml-explained + /blog index + /compare/anevis
- Frontend security headers, accessibility improvements, Google Font optimization
- Privacy policy updated (Plausible disclosed), cookie consent link fixed
- Impressum: Mariendorfer Damm 1, 12099 Berlin, +34 627 714 130
- SameSite=Strict → Lax (fixed tablet/mobile demo login)
- Sentry-ready error tracking, pitch deck v3, AVV template (GDPR Art. 28)

### 10 New API Features (32 → 60+ endpoints)
BaFin filing requirements, Annex IV field guidance, AIFMD I→II diff, investor classification, cross-NCA comparison, smart deadline calculator, compliance checklist, enhanced sanctions, LEI enrichment + hierarchy (GLEIF), NCA portals & contacts.

### Business
- **Campus Founders Accelerator Batch 4 SUBMITTED** — €25K loan, KPIs: 3 customers, €3-6K MRR, UG incorporated
- Egor Tarakanov (Montold) responded positively, sent 3 feature links
- UptimeRobot monitoring, email deliverability confirmed (SPF/DKIM/DMARC)
- LinkedIn cron: daily 9 AM outreach, 50 target compliance officers
- Sitemap submitted to Google Search Console
- Finch Capital prep doc updated for Tuesday March 3 (call rescheduled — confirmed 2026-03-02)

### Key Decisions
- SameSite Lax (not Strict) for auth cookies
- No Sentry in optionalDependencies (breaks Railway npm ci)

---

## 2026-02-25 — Infrastructure Pivot + Production Deploy + Phase 2 API

**APPROVED: Open-core infrastructure pivot.** Caelith shifts from SaaS compliance dashboard to open-core regulatory infrastructure company.

**Core thesis:** AI commoditizes dashboards (we built ours in 10 days). Infrastructure (APIs, data, filing pipelines, standards) retains value. AI agents increase infrastructure demand, not decrease it.

**Positioning:** "Caelith is the compliance infrastructure layer for European alternative investment funds — open schemas, validated filing pipelines, and regulatory data APIs."

**Open-core model:**
- Open: schemas, libraries (open-annex-iv), rule definitions, parsers
- Paid: managed filing pipeline, hosted APIs with SLA, audit trail, regulatory intelligence

**Target segments:**
1. KVGs (dashboard, €990-1,990/mo) — near-term
2. Fund admins (APIs, €500-2K/fund/year) — mid-term, 1 deal = €50-200K ARR
3. AI agent builders (API access) — long-term

### Production (live on www.caelith.tech)
- XSD-validated Annex IV XML (ESMA Rev 6), LEI validation (GLEIF), EU/UN sanctions (6,863 entities, fuzzy), EMT/EET/EPT templates, Copilot knowledge base (80+ terms EN/DE), auto-migrations

### Phase 2 API
- API Key auth (`ck_live_` prefix, bcrypt), rate limiting (tiered), versioned routes (`/api/v1/*`), OpenAPI/Swagger at `/api/docs`

### open-annex-iv v1.0
- Ready for npm publish. Blog post written. Needs `npm login` then `npm publish`.

### Railway Deployment Lessons (CRITICAL)
- **Never use `file:` deps** in package.json for Railway — inline or publish to npm first
- **`scripts/start.ts`** runs migrations then imports server — isolates `process.exit()`
- **"Completed" vs "Online"**: "Completed" = process exited. Server must keep running.
- Serializer inlined in `src/backend/services/annex-iv-xml/`

### Content
- LinkedIn post drafted (EN/DE), HTW Berlin EXIST prep doc, product guide (1.7MB HTML)

### Key dates
- Apr 16: AIFMD II enforcement deadline
- Mar 5: BAfA Gründungszuschuss meeting
- Mar 2: Finch Capital intro call (10:30 CET)

---

## 2026-02-24 — Strategy + Research + NGI Zero + Security

**GitHub**: Cleaned — 2 public repos (open-annex-iv + eu-reg-feed), profile audit grade A.

**EXIST Gründungsstipendium**: HTW Berlin call done Feb 27. HWR Startup Incubator contacted. Julian enrolling at HWR Berlin SS2026. €1K-2.5K/mo + €10K materials + €5K coaching for 12 months.

**Gründungszuschuss**: BAfA meeting March 5. DO NOT register Freiberufler before this meeting. Need ≥150 days ALG I remaining.

**eu-reg-feed (NGI Zero proposal #2)**: Built working MVP, repo at github.com/julianlaycock/eu-reg-feed (Apache 2.0). Budget €35K/350h/7 milestones.

**NGI Zero Commons Fund Submitted**: Code `2026-04-087`, €50K, deadline April 1 2026. Project: open-annex-iv. Rate €100/hr, 500 hours. Can resubmit before April 1. npm: `open-annex-iv@0.1.0`. Tests: 179 passing. CI: GitHub Actions Node 18/20/22.

**Strategic decisions:**
- Germany-first, sell through fund admins not consultants
- Annex IV as wedge, not "AIFMD II platform"
- anevis = managed service/enterprise. Caelith = self-service/mid-market
- Real competitor is inertia (Excel + fund admin bundled)
- 35-45% odds of 3 paying customers in 6 months
- XSD validation toolkit = PROPRIETARY moat (do NOT open-source). Revisit Mar 10.
- Grant pipeline: €100-135K realistic over 12 months (NGI ×2 + EXIST + IBB + Prototype Fund)
- Freiberufler warning: don't register while arbeitslos, protect ALG I → Gründungszuschuss sequence
- Kill criteria: If <3/10 discovery calls show interest by Week 4 → pivot or kill thesis

**Lanzadera call**: Liked the project. AIFMD II transposition fragmentation across EU = opportunity.

**Security Hardening (D- → A-):**
- PostgreSQL locked to localhost, Intel AMT + Spotify ports blocked
- Railway: backend API private, Postgres proxy removed, admin password changed, region → EU West (Amsterdam)
- All 54 DB migrations applied, data reset functional

---

## 2026-02-23 — Settings Page + Security Audit (18 commits)

- Full admin settings page (Profile, Appearance, Org, Regulatory, Notifications, Security, Data Mgmt, Danger Zone)
- **Finch Capital**: Eugenie Colonna-Distria intro call Mon Mar 2, 10:30 CET
- **Working Dynamic Retrospective**: 9 improvements in USER.md. Key: clarify environment, propose acceptance criteria, test light+dark, state assumptions.
- Railway Gotcha: DB migrations don't auto-run on deploy
- **Pitch Deck v2**: 14 slides, PDF at `pitch-deck/caelith-pitch-deck-v2.pdf`
- **Security Audit**: 7 CRITICAL + 7 HIGH found and fixed (tenant isolation, copilot SQL, BOLA, CSV injection). Pen test grade "well above average". Security docs: SECURITY.md, THREAT-MODEL.md, COMPLIANCE-MAP.md (70 controls).

---

## 2026-02-22 — Comprehensive Audit & Hardening (20+ commits)

**Final Scorecard:** Legal A+, Security A-, Demo Readiness A-, GDPR A, Data Quality A-, Error Resilience A.
- httpOnly cookies, SQL parameterization, CSP, registration disabled, PII hashing, rate limiting
- Legal QA B- → A+ (63 tests), GDPR C+ → A (Art. 15/17/20 endpoints, AVV, TOM, Art. 30)
- AIFMD II features: depositary tracking, senior persons, sub-delegations, fee disclosure, LMT notifications
- 20+ commits, 12 new migrations (041-052), 12 new docs

---

## 2026-02-21 — AIFMD II Feature Sprint

- AIFMD II Readiness Assessment (24 questions, 8 categories, scoring)
- LMT + Delegation tabs, Copilot AIFMD II context
- Sidebar restructured: PORTFOLIO / COMPLIANCE / MONITORING
- Compliance Calendar, Copilot v2 (tool-use, claude-haiku-4-5, ~$0.02/question)
- **HTGF application submitted**, product roadmap at `caelith-product-roadmap.md`

---

## 2026-02-20 — GTM Day 2 + UI Overhaul

- **10 KVGs contacted total** (5 on Feb 19, 5 today)
- seed+speed warm rejection — "Case spannend, nächste Runde" (Maschmeyer fund)
- LinkedIn company page live + profile updated
- **IHK docs complete**: all 8 PDFs, Lebenslauf signed
- Dashboard redesigned: Frosted Accent theme, live RSS news feed (BaFin, ESMA, ECB, EBA)
- All deployed at www.caelith.tech

---

## 2026-02-19 — GTM Launch Day + Branding

- **5 cold emails sent** to Tier 1 Immobilien-KVGs (Aachener Grund, aik, CONREN Land, Art-Invest, WohnSelect)
- Sent via Gmail "Send as" julian.laycock@caelith.tech
- Outreach tracker at `outreach-tracker.md`, BaFin prospect list: 100 KVGs at `bafin-kvg-prospects.md`
- German landing page deployed (DE default, EN via ?lang=en)
- Demo accounts: demo@caelith.tech / Demo1234, compliance@caelith.tech / Demo1234
- **Logo A approved**: Pure Sora 800 wordmark, no icon.
- SVG logos: `src/frontend/public/logo-caelith.svg` (dark) + `logo-caelith-white.svg` (white)
- **Anti-spam insight**: LinkedIn = credibility + anti-phishing. Two-channel touchpoint proves legitimacy.
- **No login credentials in outreach**: Always do live demos, never unguided access

## Working Dynamic — Lesson Learned (2026-02-19)
- **High-stakes tasks need pre-flight verification before presenting output**
- Cold outreach: sub-agent had wrong domains, guessed addresses, called a non-small company "kleinere KVG"
- Julian's rule: for irreversible, prospect/customer-facing actions, think critically FIRST, verify EVERYTHING, present ONCE correctly
- Does NOT apply to internal/dev tasks — move fast on those

## Railway Deployment (CRITICAL REFERENCE)
- Railway project: sunny-quietude
- Domain: www.caelith.tech (cheerful-solace service, root dir: src/frontend)
- Backend: caelith-api service (root dir: repo root)
- Postgres: private at postgres.railway.internal:5432, DB: railway
- Backend private URL: caelith-api.railway.internal:3001
- **IMPORTANT**: Landing page HTML is INLINE in `src/frontend/src/app/api/landing/route.ts` (67KB on line 3). Edit THAT file.
- Use `npx tsx src/backend/server.ts` NOT compiled dist/
- No healthcheck configured (tsx startup too slow)
- No migrations in start command (run manually)
- `PG_SSL_REJECT_UNAUTHORIZED=false` required for Railway internal Postgres
- `ADMIN_PASSWORD` must be set or server used to exit (now non-fatal)
- Max restart retries: 3
- **ROOT CAUSE of all 500s**: `SET LOCAL app.tenant_id` — PostgreSQL doesn't support parameterized SET LOCAL. Fixed with UUID-validated string interpolation in `withTenantContext()` (db.ts:143)
- Auth rate limit: 100/15min

## Pricing
- Essentials €990/mo (3 funds, 200 investors), Professional €1,990/mo (15 funds, unlimited), Enterprise from €3,500/mo
- Key frame: "93% cheaper than Big 4 consultants"

## Fundraise Collateral
- Pitch deck: `pitch-deck/caelith-pitch-deck.pdf` (v2 at v2.pdf)
- One-pager, financial model, target list (37 investors), demo script — all in `pitch-deck/`

## Copilot & Infrastructure
- Copilot Demo API: 16 intents audited, 8 fixed, 4 new handlers. Live LEI via GLEIF.
- aifmd-toolkit: Open-source CLI at github.com/julianlaycock/aifmd-toolkit (Apache-2.0, 6 commands)
- Crons reduced: 28 → 12. Active: Copilot QA (2x/day), LinkedIn drafts (Tue/Thu), Outreach enforcer (Mon-Fri), Weekly blog (Wed).

## 2026-03-01 — Landing Page v2 Deployed + Mobile Audit

### Landing Page v2 — LIVE on Production
- Commit `ceb3f8be`, then fixed `8c36a9c2` (LF encoding) + old TS files deleted → final commit live
- **Root causes of deploy failures**: (1) `screening/page.tsx` had CRLF line endings → SWC failed on Railway Linux, (2) Old `landing-en.ts` / `landing-de.ts` TS string exports still in repo → ESLint parse error. Both fixed.
- **Build path**: `src/frontend/public/static/landing-{en,de}.html` via `readFileSync` in `route.ts` — confirmed working on Railway
- Script: `C:\Users\julia\openclaw-workspace\deploy-landing-v2.mjs` generates both files
- QA: 63/67 checks pass (4 = responsive/DE visual parity, untested)

### CLAUDE.md Created
- At `C:\Users\julia\openclaw-workspace\CLAUDE.md` — copied to project repo via Julian
- Contains: architecture, design system, Railway rules, 9 common mistakes, PowerShell gotchas
- AGENTS.md updated: CLAUDE.md now mandatory read at session start + update when learning hard lessons
- **Still needed**: verify CLAUDE.md actually in project repo at `C:\Users\julia\projects\private-asset-registry_Caelith_v2\CLAUDE.md`

### Finch Capital Prep — Open-Core Defense Added
- File: `C:\Users\julia\openclaw-workspace\research\finch-capital-prep-2026-03-02.html`
- Added full 3-layer defense: hammer/construction company framing, 3 VC-love reasons, moat argument, 2 pushback handlers
- Call is Monday March 2, 10:30 CET with Eugenie Colonna-Distria (Finch Capital)

### Mobile Landing Page Audit — v3 PENDING (not yet built)
**Issues identified from screenshots Julian sent:**
1. Nav pill morph overlaps H1 on mobile → fixed (bg-only transition)
2. Mobile nav overlay "Try Demo" button bleeds through → fixed (fullscreen overlay)
3. Feature cards too tall → fixed (horizontal compact layout)
4. Dashboard demo on mobile = bad UX → replaced with "Best on desktop" notice card
5. Terminal takes too much space on short phones → hides at <650px height

**Files created:**
- `landing-mobile-v2.html` — v2 mobile preview (47KB, all above fixes applied)
- `landing-mobile-preview.html` — v1 mobile preview (43KB, now superseded by v2)

**v3 improvement plan (APPROVED by Julian, NOT YET BUILT):**
- Hero: replace terminal with stat bar (13 rules | 6 frameworks | April 16 deadline), single primary CTA "Book a 15-Min Demo"
- Add trust bar immediately after hero (above fold)
- Collapse 9→6 sections: remove Comparison (merge into pricing), hide API on mobile, merge Trust+Resources into footer
- Comparison → visual icon grid (🐌 vs ⚡), not table
- Pricing: stronger visual hierarchy (featured card = thick border + scale(1.05))
- Dashboard notice: show dashboard screenshot instead of text + desktop icon
- Add back-to-top FAB after 50% scroll
- Reduce FAQ to 4 questions on mobile
- Primary B2B CTA = "Book Demo" (not Readiness Check spam ×4)
- Font-display:swap for Google Fonts
- `font-display=swap` param added to Google Fonts URL

**Decisions on mobile UX:**
- No popup for dashboard redirect — inline card with positive framing instead
- Dashboard = desktop/tablet only, Readiness Check + Copilot = mobile fine
- Sticky bottom CTA bar: "Readiness Check" + "Book Demo" (slides in after hero, hides near footer)

### Railway Deployment — New Gotchas (add to CLAUDE.md)
- `screening/page.tsx` CRLF line endings broke Railway build — Windows git converts LF→CRLF
- Solution: `[System.IO.File]::WriteAllText(path, content -replace '\r\n','\n', UTF8NoBOM)`
- Old TS string export files (`landing-en.ts`, `landing-de.ts`) were still in repo → ESLint `',' expected` parse error. Delete them.
- **Fix for future**: `.gitattributes` with `* text=auto eol=lf` prevents CRLF commits

## 2026-02-18 — Landing Page + Branding
- **v11 approved as current landing page** — at `redesign-concepts/concept-v11.html`
- Palette: #2D3333 / #C5E0EE / #F8F9FA / #E8A87C warm accent
- Fonts: Sora 800, Instrument Sans 700, JetBrains Mono
- No uppercase, no serif, no parchment, no gold/indigo/orange
- Hero: "The compliance engine for EU fund managers."

## 2026-02-16 — Day One
- Julian and I met. I'm Mate — his board of directors.
- Project: Caelith (Next.js dashboard, Express backend, PostgreSQL)
- Our dynamic: direct, critical, efficient. We challenge each other.
- Julian is CEO. I cover product, strategy, engineering, finance, legal, UX, and everything else needed.
- Login: admin@caelith.com / Admin1234 (capital A)
- Key decision: Keep AIFMD II as credibility anchor, build AML (AMLR, July 2027) as growth engine
- Reposition: "AIFMD II tool" → "EU fund regulatory compliance platform"
- Target persona: Compliance managers / Geschäftsführer at small Immobilien/Spezial-AIF KVGs in Germany
- **Email**: julian.laycock@caelith.tech (IONOS, forwarding to Gmail, SPF/DKIM/DMARC confirmed)