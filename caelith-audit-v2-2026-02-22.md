# Caelith Platform Re-Audit — 2026-02-22 (Post-Fix)

## Perspectives: UX/UI, Legal/Compliance, Technical, Product, GTM, Security, Accessibility

---

## 📊 Current State

- **Frontend**: 30 pages, Next.js 14, full DE/EN i18n (except Screening)
- **Backend**: 32 route files, Express, PostgreSQL, 15+ services
- **Commits today**: 5 (block1, bugfixes, PDF rebrand, chain fix, cover redesign)
- **PDF exports**: 6 routes, all using A2 Metric Cards brand system
- **Integrity**: 232 decisions, SHA-256 chain verified intact

---

## 🎨 UX/UI Audit

### ✅ Strengths
- Frosted Accent palette is distinctive and professional
- Dashboard is information-dense but scannable (score ring, fund bands, action queue)
- Collapsible sidebar with localStorage persistence
- Dark/light mode fully supported
- Copilot drawer is elegant (frosted glass, disclaimer, quick prompts)
- Fund detail page has well-organized tabs (Overview, LMTs, Delegations, Annex IV, Audit Package)

### 🔴 Issues
1. **Screening page has ZERO i18n** — all strings hardcoded in English. Only page without translations.
2. **Breadcrumb shows "reports / annex-iv"** — the "reports" link goes to `/reports` which redirects back. Should either be non-clickable or show a reports index page.
3. **Date picker shows MM/DD/YYYY on English browsers** — `input[type=date]` is browser-locale dependent. German demos on English machines will look American.
4. **Design-lab pages accessible via URL** — `/design-lab/logos`, `/design-lab/quietude/v1-v4` are reachable even though not in sidebar. Should be gated or removed from production.
5. **No skeleton/loading state for PDF preview modal** — user sees empty modal until blob loads.
6. **Fund selector dropdown doesn't show fund status** — adding "Active/Inactive" badge would help.
7. **Hash chain card shows "—" for first/last hash** — evidence bundle items don't expose hashes; the data extraction logic can't find them. Should use a dedicated API endpoint.
8. **Sidebar COMPLIANCE section auto-collapses when navigating between sub-items** — e.g., going from Annex IV to Evidence Bundle may re-collapse if the section tracking logic fires.
9. **No toast/notification system** — success/error feedback is scattered (badges, alerts, console.error). Need a unified notification layer.
10. **Copy Link button has no tooltip** — clicking shows "Copied!" text but it's a small button, no visual cue before clicking.

### 🟡 Recommendations
- Add a unified `<Toast>` component for all user feedback
- Implement a custom date picker for consistent DD.MM.YYYY across all locales
- Add loading spinner inside PDF preview modal while fetching
- Remove or gate design-lab routes behind an env var

---

## ⚖️ Legal/Compliance Logic Audit

### ✅ Strengths
- Copilot has explicit legal disclaimer ("does not constitute legal advice")
- Readiness assessment has legal disclaimer in PDF and UI
- Annex IV report has proper disclaimer about AIFM responsibility
- Decision records are immutably hashed with SHA-256 chain
- KYC expiry tracking with 90-day warning
- SFDR classification tracked per fund

### 🔴 Issues
1. **Compliance score is computed naively** — `100 - (high * 25 + medium * 10 + low * 5)`. This has no regulatory basis. A single high-severity flag (e.g., sanctions match) should drop score to 0, not 75. Need weighted, context-aware scoring.
2. **Annex IV XML doesn't follow ESMA XSD** — uses custom `xmlns="urn:esma:aifmd:reporting"` with non-standard element names. Will fail any automated ESMA validation. Critical for production; acceptable for demo.
3. **No regulatory framework versioning** — when AIFMD II rules change, old assessments should be snapshotted, not overwritten. Currently the readiness assessment is mutable with no history.
4. **Eligible investor check doesn't validate § 1 Abs. 19 Nr. 32-33 KAGB** properly — the eligibility service checks basic investor types but doesn't distinguish between MiFID II professional and "semi-professional per Anlage" (€200K minimum).
5. **No audit trail for user actions** — who changed a readiness answer? Who approved an onboarding? The event system exists but isn't consistently wired to all mutations.
6. **Transfer validation rules are demo-grade** — they check basic eligibility but don't validate settlement cycles, cut-off times, or gate/notice period compliance.
7. **Sanctions screening is mock-only** — no real OpenSanctions integration. Results say "Demo mode" per-investor but there's no global indicator preventing someone from treating mock results as real.

### 🟡 Recommendations
- Add "FOR DEMONSTRATION PURPOSES" watermark to all PDFs until production-ready
- Implement proper BaFin Annex IV XML schema alignment
- Add mutation audit trail to all write endpoints (who, what, when)
- Document regulatory assumptions explicitly in the UI

---

## 🔧 Technical Audit

### ✅ Strengths
- TypeScript throughout (frontend + backend)
- Clean service/route separation
- PDFKit brand system with shared helpers
- Security middleware: CSP, rate limiting, input sanitization, HSTS
- Async error handling with dedicated error classes
- Clean Express middleware pipeline

### 🔴 Issues
1. **Rate limiter SQL uses `?` placeholders** — PostgreSQL requires `$1`. DB-mode rate limiting in production is broken (falls back to memory, which is fine for single-instance but fails at scale).
2. **Route mount order** — `/api/reports` (compliance reports) is mounted before `/api/reports/annex-iv` etc. Express evaluates in order; the generic route could match before specific ones. Currently works because compliance reports use `/compliance/:fundId` sub-paths, but it's fragile.
3. **Evidence bundle endpoint is dual-purpose** — `GET /api/reports/evidence-bundle/:id` always sets `Content-Disposition: attachment`. The page data fetch and the download use the same URL. Split into data + download endpoints.
4. **No database migrations in start command** — Railway deploy docs say migrations should be manual. This means schema changes require manual intervention on every deploy.
5. **No health check endpoint that tests DB connectivity** — `/health` likely just returns 200. Should check DB + basic service health.
6. **Dynamic import in audit-package-service** — `await import('./integrity-service.js')` for `verifyChain` works but adds latency per request. Should be a static import.
7. **JSZip loaded eagerly** — 43KB gzipped loaded on every page. Should be `await import('jszip')` on demand.
8. **No structured logging format** — logs use JSON but no correlation IDs, no request duration percentiles, no log levels for business events.
9. **No graceful shutdown** — when process receives SIGTERM, in-flight requests may be dropped. Need `server.close()` + drain.
10. **`X-Frame-Options: DENY`** may conflict with blob URL PDF previews in some browsers.

### 🟡 Recommendations
- Fix rate limiter SQL (`?` → `$1/$2`)
- Static import for integrity-service
- Add `?download=true` param to evidence-bundle for explicit download behavior
- Dynamic import JSZip
- Add proper health check with DB ping

---

## 📦 Product Audit

### ✅ Strengths
- Clear product story: AIFMD II readiness → compliance engine → reporting
- Strong feature depth: 24-question readiness assessment, decision hash chain, 6 PDF exports, Annex IV reporting
- Copilot with tool-use architecture (queries live DB)
- German-first but full EN support
- Demo data is realistic (German KVGs, KAGB references, real fund structures)

### 🔴 Issues
1. **Regulatory Identifiers not persisted** — UI-only with no backend. Users fill data → disappears on reload. Demo trap.
2. **No onboarding wizard for first-time users** — setup wizard exists but doesn't guide through fund creation → investor import → rule configuration workflow.
3. **Compliance Calendar has no reminder/notification integration** — shows deadlines but can't send email/push alerts.
4. **Rule Builder page exists but unclear functionality** — `/rules/builder` accessible but relationship to NL rules unclear.
5. **No dashboard-level compliance trend** — only shows current state, no "this quarter vs last" comparison.
6. **Cap Table PDF is a separate feature from fund detail** — users might not find it. Should be linked from fund holdings.
7. **Evidence Bundle items are all JSON** — an auditor expects PDFs, signed certificates. Adding auto-generated summary PDF as an item would increase credibility.

### 🟡 Recommendations
- Add backend persistence for regulatory identifiers (single table, quick win)
- Add "demo" badge to regulatory identifiers until persisted
- Link cap table PDF from fund holdings tab
- Add trend line to compliance score ring (sparkline of last 30 days)

---

## 🚀 GTM Audit

### ✅ Strengths
- Product targets a real pain point (AIFMD II April 16, 2026 deadline)
- German-first positioning differentiates from US tools
- Pricing is value-based (€990/€1,990/€3,500+)
- 10 KVGs already contacted
- Landing page is professional, live at www.caelith.tech

### 🔴 Issues
1. **No trial/self-serve signup** — prospects must go through Julian. Friction.
2. **Demo credentials in memory** — `demo@caelith.tech / Demo1234` but no "Try Demo" button on landing page.
3. **No product tour / interactive walkthrough** — new users see a dense dashboard with no guidance.
4. **Screening shows "Demo mode" prominently** — a prospect demoing themselves would see this and question credibility.
5. **PDF watermark missing** — PDFs look production-ready. If a prospect screenshots one and it goes viral, it looks like Caelith is production-ready when it's not.
6. **No comparison page** — prospects researching alternatives have no "Caelith vs. [competitor]" reference.
7. **Landing page claim "€180,000/year vs €11,880"** — not backed by methodology. Could be challenged.

### 🟡 Recommendations
- Add "Try Demo" button on landing page linking to `/login` with pre-filled demo credentials
- Add first-time product tour (3-5 steps, dismissible)
- Add "PREVIEW" watermark to all PDFs for demo environments
- Document pricing methodology ("based on Big 4 consulting rates")

---

## 🔐 Security Audit

### ✅ Strengths
- JWT Bearer auth, no cookies (no CSRF needed)
- Input sanitization (null bytes, length limits)
- Rate limiting (API, auth, export tiers)
- Security headers (CSP, HSTS, X-Frame-Options, nosniff)
- Role-based access (admin, compliance_officer, viewer)
- SQL parameterized queries throughout

### 🔴 Issues
1. **Rate limiter DB SQL broken** (as noted above)
2. **No request ID middleware** — can't correlate logs to requests
3. **JWT secret likely hardcoded or from env** — not rotating. Should use RS256 with key rotation for production.
4. **No CORS origin allowlist** — check if CORS is restricted to specific origins or `*`
5. **API keys in env vars** — Anthropic API key for copilot, any others? No secrets management.
6. **No session invalidation** — JWT tokens can't be revoked once issued. Need a blocklist or short expiry + refresh tokens.
7. **PII in decision records** — `input_snapshot` contains investor names, jurisdictions, investment amounts. No encryption at rest.

### 🟡 Recommendations
- Add request ID middleware (uuid per request, propagate to logs)
- Short JWT expiry (15min) + refresh token
- Evaluate field-level encryption for PII in decision records
- CORS: lock to specific origins (localhost:3000, caelith.tech)

---

## ♿ Accessibility Audit

### 🔴 Issues
1. **Sidebar section headers are `<button>` but lack `aria-expanded`** — screen readers won't announce collapse state
2. **No skip-to-content link** — keyboard users must tab through entire sidebar
3. **Color contrast** — several muted text colors (`text-ink-muted`, `text-ink-tertiary`) may not meet WCAG AA 4.5:1 ratio against dark backgrounds
4. **No focus visible styles on some custom buttons** — keyboard navigation can't track focus
5. **Charts (donut, bar) have no text alternatives** — screen readers skip them entirely
6. **Modal trap** — PDF preview modal may not trap focus properly (tabbing could go behind modal)

---

## 📋 Priority Action List (Value-Ordered)

| # | Action | Impact | Effort | Category |
|---|--------|--------|--------|----------|
| 1 | Fix rate limiter SQL | Production-breaking bug | 5 min | Technical |
| 2 | i18n for Screening page | Inconsistency, demo-breaking | 30 min | UX |
| 3 | Static import integrity-service | Performance | 2 min | Technical |
| 4 | Dynamic import JSZip | Bundle size | 5 min | Technical |
| 5 | Add "PREVIEW" watermark to demo PDFs | GTM/legal risk | 20 min | Product |
| 6 | Persist regulatory identifiers | Demo trap | 30 min | Product |
| 7 | Hash chain card → real verify API | Feature is cosmetic without it | 20 min | Compliance |
| 8 | Split evidence-bundle endpoint | API design | 15 min | Technical |
| 9 | Request ID middleware | Debugging/ops | 10 min | Technical |
| 10 | Add `aria-expanded` to sidebar | Accessibility | 10 min | A11y |
| 11 | Remove design-lab routes | Security/polish | 5 min | Technical |
| 12 | "Try Demo" button on landing | GTM conversion | 15 min | GTM |
| 13 | Compliance score weighting | Legal accuracy | 1 hr | Compliance |
| 14 | Mutation audit trail | Legal requirement | 2 hr | Compliance |
| 15 | ESMA XSD alignment | Production blocker | 4 hr | Compliance |

---

## Overall Grades (Post-Fix)

| Perspective | Grade | Change | Notes |
|------------|-------|--------|-------|
| **UX/UI** | B+ | — | Polish is good, i18n gap on Screening |
| **Legal/Compliance** | B- | ↑ from C+ | Chain verified, score computed, but naive scoring + no XSD |
| **Technical** | B | ↑ from B- | Chain fix, PDF brand unified, but rate limiter SQL still broken |
| **Product** | B+ | — | Feature-rich for demo stage, some traps remain |
| **GTM** | B | — | Strong positioning, needs self-serve + tour |
| **Security** | B+ | — | Solid for MVP, needs rotation + request IDs |
| **Accessibility** | C | NEW | No ARIA, no skip link, color contrast questionable |
| **Demo Readiness** | A- | ↑ from B+ | PDF chain verified, cover professional, score works |
