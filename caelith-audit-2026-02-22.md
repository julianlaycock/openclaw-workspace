# Caelith Platform Audit — 2026-02-22

## Perspectives: CTO, CPO, Security, UX, Legal/Compliance, DevOps

---

## 🔴 Critical Issues

### 1. Route Conflict: `/api/reports` mounted twice
**File:** `server.ts` L284, L292-296
```
L284: app.use('/api/reports', authenticate, authorizeWrite('admin'), complianceReportRoutes);
L292: app.use('/api/reports/annex-iv', authenticate, authorizeWrite('admin'), annexIVRoutes);
L293: app.use('/api/reports/evidence-bundle', authenticate, authorizeWrite('admin'), evidenceBundleRoutes);
L296: app.use('/api/reports/audit-package', authenticate, authorizeWrite('admin'), createAuditPackageRoutes());
```
Express mounts are order-dependent. The `/api/reports` catch-all at L284 could intercept requests meant for `/api/reports/annex-iv` etc. **Move L284 AFTER the specific report routes** or use a more specific path like `/api/reports/compliance`.

### 2. Evidence Bundle endpoint is dual-purpose (data + download)
**File:** `evidence-bundle-routes.ts`
The single `GET /:fundStructureId` route serves BOTH the page data fetch AND the JSON download, and it ALWAYS sets `Content-Disposition: attachment`. This means:
- Every page load technically triggers an "attachment" response (browsers ignore this in fetch(), but it's semantically wrong)
- **Fix:** Either add a `?download=true` query param to conditionally set Content-Disposition, or split into two routes (`/` for data, `/download` for attachment).

### 3. X-Frame-Options: DENY blocks PDF preview iframe
**File:** `security.ts` L14
`res.setHeader('X-Frame-Options', 'DENY')` prevents ANY iframe embedding — including your own PDF preview modal which uses an iframe with a blob URL. The blob URL approach (from bugfix-batch) should bypass this since blob URLs are same-origin, but if anyone tries to iframe-embed a backend URL directly, it'll fail. **Verify the blob URL approach works; if so, this is fine. If not, change to `SAMEORIGIN`.**

### 4. SQL injection vector in rate limiter
**File:** `security.ts` L118
```ts
const limitClause = safeLimit ? `LIMIT ${safeLimit}` : '';
```
This is in `integrity-service.ts`, not security.ts — but the pattern of string-interpolating into SQL exists. The `safeLimit` IS validated as a number + floor'd, so it's safe here. However, the `rate_limit_counters` UPSERT uses `?` placeholders instead of `$1` — **this will fail on PostgreSQL** which uses `$1` syntax:
```ts
VALUES (?, 1, ?, now())
```
This is a **bug** — rate limiting in production (DB mode) is broken.

### 5. No CSRF protection
No CSRF tokens on any mutation endpoints. Since auth is Bearer token (not cookie), this is acceptable for API-only architecture. But if cookies are ever added, this becomes critical. **Document this assumption.**

---

## 🟡 Important Issues

### 6. Authorization inconsistency — report routes are admin-only
**File:** `server.ts` L284-296
All report routes use `authorizeWrite('admin')`. But compliance officers should be able to READ reports — that's their job. `authorizeWrite` allows GET for any authenticated user but blocks POST/PUT/DELETE for non-admins. This is correct behavior, but the `authorize('admin')` on some routes (L282 decisions) blocks even GET access for compliance officers. **Review and ensure compliance_officer role can access all report + decision endpoints.**

### 7. No pagination on evidence bundle items
Evidence bundle returns ALL decision records, investor snapshots, and documents in a single JSON response. For funds with thousands of decisions, this will be a multi-MB response causing slow page loads and potential OOM. **Add pagination or limit.**

### 8. Readiness assessment — no multi-tenant isolation
**File:** `readiness-routes.ts`
```ts
const tenantId = DEFAULT_TENANT_ID;
```
Hardcoded to default tenant. If multi-tenancy is ever enabled, all tenants share the same readiness assessment. **Use `req.user?.tenantId`.**

### 9. Missing Content-Disposition on some download routes
The Annex IV XML route and Evidence Bundle route now set Content-Disposition (good). But verify:
- `compliance-report-routes.ts` PDF export — has Content-Disposition? 
- `audit-package-routes.ts` PDF export — has Content-Disposition?
- `readiness-routes.ts` PDF export — has Content-Disposition?
All PDF routes should set `Content-Disposition: attachment; filename="..."`.

### 10. JSZip added to frontend bundle
JSZip is ~43KB gzipped. It's only used on one page (Annex IV cross-fund export). **Consider dynamic import** (`const JSZip = (await import('jszip')).default`) to avoid bloating the initial bundle for every page.

### 11. No loading/error states on Regulatory Identifiers
**File:** `funds/[id]/page.tsx`
The regulatory identifiers section is UI-only with no backend persistence. Users will fill in data, and it disappears on reload. This is a **demo trap** — a prospect might fill in real data during a demo and lose it. **Either add backend persistence or add a clear "Demo only — not saved" badge.**

---

## 🟢 Moderate Issues / Improvements

### 12. Copilot route is only 60 lines — limited tool-use
The copilot has tool-use architecture but the route is minimal. For demos, it should demonstrate at least 3-4 tools convincingly. Verify it actually queries live data (LMTs, delegations, readiness) as documented in MEMORY.md.

### 13. Sidebar — no keyboard navigation
Collapsible sections work by click but lack keyboard accessibility (Enter/Space to toggle, arrow keys). Add `role="button"` and `onKeyDown` handler to section headers. Important for accessibility compliance.

### 14. Date picker format is browser-locale dependent
`input[type=date]` renders as MM/DD/YYYY on US-locale browsers and DD.MM.YYYY on DE-locale. Since the target market is Germany, this is usually fine. But for demos on English-locale machines, dates will look American. **Consider a custom date picker component** or at minimum test on both locales.

### 15. XML serializer doesn't validate against ESMA XSD
The Annex IV XML uses `xmlns="urn:esma:aifmd:reporting"` but the structure is custom, not the actual ESMA Annex IV XSD schema. For a demo this is fine. For production, need to align with the real XSD (`AIFMReporting_ESMA.xsd`). **Track as post-MVP.**

### 16. Hash chain integrity card — should call verifyChain API
The `HashChainIntegrityCard` component currently infers chain status from the evidence bundle data (count > 0 = verified). It should actually call the backend `verifyChain()` function which does proper hash-by-hash verification. **Add a `/api/integrity/verify` endpoint and call it from the card.**

### 17. No error boundary on report pages
If the Annex IV or Evidence Bundle component throws during render, the entire page crashes with a white screen. Wrap in `<ErrorBoundary>` component (already exists in `components/error-boundary.tsx`).

### 18. Screening service — mock mode only
`screening-routes.ts` uses OpenSanctions integration with mock mode. Verify the mock flag is clearly indicated in the UI so demo prospects don't think it's live screening.

### 19. News feed cache — no invalidation
RSS news feed has 30min cache. If the server runs for days without restart, stale news accumulates. Not critical but **add cache size limit** (e.g., max 100 items).

### 20. No request ID correlation
`error-handler.ts` reads `X-Request-Id` but it's never set. Add a middleware that generates a UUID for each request and sets it as `X-Request-Id` response header. Essential for debugging production issues.

---

## 📊 Architecture Assessment

| Area | Grade | Notes |
|------|-------|-------|
| **Security** | B+ | Good auth, rate limiting, CSP, input sanitization. Missing: CSRF docs, request IDs, rate limiter SQL bug |
| **Code Quality** | B | Clean separation, TypeScript throughout, good error handling. Some hardcoded values |
| **UX** | B+ | Polished UI, good i18n, responsive. Missing: keyboard a11y, error boundaries |
| **API Design** | B- | RESTful, consistent. Issues: dual-purpose endpoints, route ordering, auth role gaps |
| **Data Integrity** | A- | SHA-256 hash chain is solid. Missing: frontend should call actual verify endpoint |
| **Demo Readiness** | B+ | Looks great. Traps: regulatory IDs not persisted, mock screening, XML not real XSD |
| **DevOps** | C+ | No healthcheck, no request IDs, no structured logging, manual deploys |
| **Test Coverage** | C | Only 3 test files visible (csv-import, auth, security, transaction-helper). No E2E tests |

---

## 🎯 Priority Fixes (Value-Ordered)

1. **Fix rate limiter SQL** (`?` → `$1`) — production will break (5 min)
2. **Move `/api/reports` mount order** — potential silent routing bug (2 min)  
3. **Split evidence-bundle route** — data vs download (10 min)
4. **Hash chain card → call verifyChain API** — makes the feature real, not cosmetic (20 min)
5. **Dynamic import JSZip** — don't bloat bundle (5 min)
6. **Add "not persisted" badge to Regulatory Identifiers** — prevent demo embarrassment (5 min)
7. **Ensure compliance_officer can read decisions** — role access gap (5 min)
8. **Error boundaries on report pages** — prevent white-screen crashes (10 min)
9. **Add request ID middleware** — production debugging (10 min)
10. **Keyboard accessibility on sidebar** — a11y compliance (15 min)
