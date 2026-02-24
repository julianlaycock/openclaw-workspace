# Caelith Deep Audit — 2026-02-22

## Methodology
Reviewed all 30 frontend pages, 32 backend routes, 15+ services, middleware stack, auth system, copilot, i18n, types, utils, and component library. Each finding tagged with severity, effort, and impact.

---

## 1. UX/UI Deep Dive

### 1.1 Information Architecture
| Finding | Severity | Effort |
|---------|----------|--------|
| **Sidebar groups items illogically** — Annex IV Report and Evidence Bundle are under COMPLIANCE but they're really REPORTING. The Rules Builder (`/rules/builder`) isn't in the sidebar at all. | Medium | 15 min |
| **No reports hub page** — `/reports` redirects to Annex IV. Should be an index with all available reports (Annex IV, Evidence Bundle, Compliance Report PDF, Readiness PDF, Cap Table PDF, Audit Package). A "Reports Center" would be a strong demo feature. | Medium | 1 hr |
| **Breadcrumb "reports / annex-iv" has broken semantics** — "reports" links to `/reports` which redirects back. Should be non-clickable or removed. | Low | 5 min |
| **No global navigation search results** — Cmd+K exists but only opens command palette. Doesn't search across investors, funds, decisions by name. | Medium | 2 hr |
| **Design-lab pages accessible** — `/design-lab/logos`, `/design-lab/quietude/v1-v4` are reachable via URL. Should be behind `NODE_ENV === 'development'` guard or removed from build. | Low | 10 min |

### 1.2 Dashboard
| Finding | Severity | Effort |
|---------|----------|--------|
| **"Fund Structures" header hardcoded in English** — `text-[#C5E0EE]` with literal "Fund Structures" instead of `t('dashboard.fundStructures')`. Same for "STATUS", "RISK", "CALENDAR", "NEWS" tabs. | Medium | 15 min |
| **Compliance score formula differs between dashboard and audit package** — Dashboard: `100 - high*10 - med*4 - expiredKyc*5`. Audit Package: `100 - high*25 - med*10 - low*5`. Two different scores for the same fund creates confusion during demos. | High | 15 min |
| **Action Queue severity ordering** — KYC expiring in 30 days is "high" but medium risk flags are "low". This means a €200K KYC renewal appears more urgent than a concentration limit breach. Questionable. | Medium | 15 min |
| **Dashboard fetches ALL investors and ALL cap tables** — `api.getInvestors()` with no pagination + `api.getCapTable()` for every asset. For a fund with 200 investors × 5 assets = 1,000+ rows loaded at once. Will slow down at scale. | Medium | 1 hr |
| **`events` state is fetched but never displayed** — `const [events, setEvents] = useState<Event[]>([])` — events are loaded (500 limit) but the variable is commented out as unused. Wasted API call. | Low | 2 min |

### 1.3 Fund Detail Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **Regulatory Identifiers are UI-only** — Modal opens, user types data, nothing persists. No warning. A prospect filling this in during a demo will lose data on page refresh. Either add backend or show "Demo Only" label. | High | 30 min |
| **Tab state not persisted in URL** — Switching between Overview/LMTs/Delegations/Annex IV/Audit Package doesn't update the URL. Sharing a link always lands on Overview. | Low | 15 min |
| **LMT count compliance check** — The AIFMD II compliance banner says "Art. 16 requires at least 2 LMTs" but only counts LMTs from the `fund_lmts` table. The `lmt_types` JSONB field on `fund_structures` also contains LMTs. Potential double-count or miss. | Medium | 20 min |

### 1.4 Investors Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **CSV import wizard exists but template download may fail** — `api.downloadTemplate('investors')` calls backend but template generation isn't verified to work for all entity types. | Low | 15 min |
| **No bulk KYC renewal action** — Can view expiring KYC but must open each investor individually to renew. Add "Bulk Renew" or at least "Export Expiring" shortcut. | Medium | 1 hr |
| **Investor detail page is 735 lines** — Very long single component with embedded tabs, modals, eligibility checks. Should be decomposed into sub-components like the fund detail page. | Low | Refactor |

### 1.5 Transfers Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **Kanban + table views** — Good UX. Kanban columns are well-organized. | ✅ | - |
| **Bulk transfer upload exists** — CSV upload with validation preview. Good feature. | ✅ | - |
| **Sort state resets on filter change** — Sorting by date then filtering by status resets sort. Minor UX annoyance. | Low | 15 min |

### 1.6 Screening Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **ZERO i18n** — Only 1 `t()` call. Every string is hardcoded English: "Sanctions & PEP Screening", "Run Full Screening", "Clear", "Flagged", "Results", etc. THE most incomplete page. | High | 30 min |
| **No individual investor screening** — Can only "Run Full Screening" for all investors. No way to screen a single new investor before onboarding. | Medium | 30 min |
| **"View on OpenSanctions" links to `#mock-result`** — In mock mode, the reference URL is `#mock-result`. This renders as a clickable link that does nothing. Should be hidden in mock mode. | Low | 5 min |
| **No screening history** — Results disappear on page reload. No persistence of past screening runs. An auditor would want historical screening records. | Medium | 2 hr |

### 1.7 Readiness Assessment Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **Well-designed** — Category accordion, progress bars, question-level status, notes, legal disclaimer. | ✅ | - |
| **PDF export works** — Now using A2 brand. | ✅ | - |
| **No "completed by" attribution** — Readiness answers don't show who answered them. For audit purposes, need user attribution. | Medium | 20 min |

### 1.8 Calendar Page
| Finding | Severity | Effort |
|---------|----------|--------|
| **No actual calendar visualization** — Shows a filtered list of events, not a calendar grid. Calling it "Calendar" sets wrong expectations. Either add a month/week grid view or rename to "Regulatory Deadlines". | Medium | 2 hr |
| **No iCal/Google Calendar export** — Users want to sync deadlines to their actual calendar. `.ics` export would be a quick win. | Medium | 30 min |

### 1.9 Copilot
| Finding | Severity | Effort |
|---------|----------|--------|
| **Excellent implementation** — Real tool-use with live DB queries, regulatory search, rule drafting. PII stripping. Rate limiting. Context-aware prompts per page. | ✅ | - |
| **SQL injection prevention is solid** — `validateReadOnlySQL` blocks INSERT/UPDATE/DELETE, multiple statements, comments. Good. | ✅ | - |
| **No conversation history persistence** — Chat resets when drawer closes. Users can't refer back to previous answers. | Medium | 1 hr |
| **`search_regulations` returns empty** — RAG service likely has no documents ingested. The copilot falls back to training knowledge (noted in prompt). Should either ingest AIFMD II text or remove the tool. | Medium | 2 hr |
| **Citations always empty** — `citations: []` hardcoded in response. The copilot never extracts citations from tool results. Would add credibility. | Medium | 1 hr |
| **Quick prompt suggestions are hardcoded English** — No i18n for the page-specific prompt suggestions. | Low | 15 min |

---

## 2. Legal / Compliance Logic Deep Dive

### 2.1 Compliance Score
| Finding | Severity |
|---------|----------|
| **Two different formulas in codebase** — Dashboard: `100 - high*10 - med*4 - expiredKyc*5`. Audit Package: `100 - high*25 - med*10 - low*5`. A fund could show 82% on dashboard but 70% in PDF. **Must unify.** | 🔴 Critical |
| **No regulatory basis for scoring** — No citation to AIFMD, KAGB, or any framework. The score is entirely made up. For legal defensibility, either (a) cite the methodology, (b) use industry-standard frameworks (e.g., ISO 19600), or (c) label it explicitly as "Internal Assessment Score — not regulatory compliant". | 🟡 Important |
| **Score doesn't account for positive signals** — Verified KYC, completed onboarding, clean screening all reduce risk but don't improve score. Score can only go down, never up from baseline. | 🟡 Important |

### 2.2 Eligibility Checks
| Finding | Severity |
|---------|----------|
| **Classification evidence check is weak** — If `classification_method` is set, it passes. No validation that the evidence is actually sufficient (e.g., MiFID II Annex II requires two of three quantitative criteria). | 🟡 Important |
| **No semi-professional investor € amount validation** — KAGB § 1 Abs. 19 Nr. 33 requires semi-professional investors to invest minimum €200,000 AND sign a risk acknowledgment. The eligibility check validates amount but not the risk acknowledgment document. | 🟡 Important |
| **Suitability check is a no-op** — Check 4 just logs "suitability assessment required" with `passed: true`. It never actually checks if suitability was assessed. Should verify a suitability document exists in `investor_documents`. | 🟡 Important |
| **No AML/CFT checks in eligibility** — Eligibility only checks investor type, KYC, and investment amount. Under AMLR (effective July 2027), customer due diligence is a prerequisite. Not blocking now but should be on roadmap. | 🟢 Future |

### 2.3 Transfer Validation
| Finding | Severity |
|---------|----------|
| **No holding period / lockup validation** — `rules` table has `lockup_days` but it's never checked during transfer validation. An investor could sell within the lockup period. | 🟡 Important |
| **No gate mechanism enforcement** — Fund structures have `lmt_types` with redemption gates (e.g., "20% of NAV per quarter") but transfers don't check if the gate is breached. | 🟡 Important |
| **No notice period validation** — LMTs include notice periods (e.g., "90 days") but transfers can be executed immediately. | 🟡 Important |

### 2.4 Data Integrity
| Finding | Severity |
|---------|----------|
| **Hash chain is global, not per-fund** — All decision records share one chain. If Fund A's records are corrupted, it breaks the chain for Fund B too. Consider per-fund chains or chain branching. | 🟢 Architecture |
| **No hash chain for transfers** — Only decision records are hashed. Transfer records (executions, rejections) are not in the integrity chain. An auditor might want tamper-proof transfer records too. | 🟡 Important |
| **`input_snapshot` contains PII** — Investor names, jurisdictions, investment amounts stored unencrypted in decision records. GDPR Art. 17 right to erasure conflicts with immutable hash chain. Need a data retention policy. | 🟡 Important |

### 2.5 Regulatory Reporting
| Finding | Severity |
|---------|----------|
| **Annex IV XML uses custom schema** — `xmlns="urn:esma:aifmd:reporting"` is not the real ESMA namespace. Element names don't match the official XSD. Will fail any automated validation. | 🟡 Important (demo OK) |
| **No Annex IV submission tracking** — Generate report but no record of when it was submitted to BaFin/NCA. Need a "Mark as Submitted" + timestamp. | 🟡 Important |
| **Evidence Bundle has no digital signature** — The PDF says "SHA-256 Verified" but there's no actual digital signature (e.g., PDF/A signature, detached PKCS#7). "Verified" means "we computed the hashes" not "a trusted party certified this". | 🟢 Future |

---

## 3. Technical Deep Dive

### 3.1 Database
| Finding | Severity |
|---------|----------|
| **`?` → `$1` conversion in db.ts** — Actually works correctly. `convertPlaceholders()` handles this. Previous audit was WRONG about this being broken. ✅ | Correction |
| **No database indexes visible** — Haven't checked but queries like `WHERE asset_id = $1 AND tenant_id = $2 ORDER BY sequence_number ASC` need composite indexes. Verify with `EXPLAIN ANALYZE`. | 🟡 Important |
| **`refresh_tokens` table uses `?` placeholders** — Works due to conversion layer, but mixed style (`?` in auth, `$1` in other services) hurts readability. Standardize. | 🟢 Style |
| **No connection pooling metrics** — Pool has max 20 connections but no monitoring for pool exhaustion, wait times, or connection errors beyond the generic `pool.on('error')`. | 🟢 Ops |
| **Soft delete inconsistency** — `investors`, `assets`, `fund_structures` have `deleted_at`. `decision_records`, `transfers`, `composite_rules` don't. Inconsistent deletion semantics. | 🟢 Architecture |

### 3.2 API Design
| Finding | Severity |
|---------|----------|
| **Evidence Bundle is dual-purpose** — GET always sets `Content-Disposition: attachment`. Split into data endpoint + download endpoint. | 🟡 Important |
| **Route mount order fragile** — `/api/reports` (compliance) mounted before `/api/reports/annex-iv`. Works because compliance uses `/:fundId` sub-paths, but adding a new `/api/reports/something` could conflict. | 🟡 Important |
| **No API versioning** — All routes under `/api/`. No `/api/v1/`. Breaking changes will impact all clients simultaneously. | 🟢 Architecture |
| **`compliance-report-routes.ts`** imports `PDF_BRAND` helpers but also defines a local `BRAND` alias. Redundant indirection. | 🟢 Style |
| **No OpenAPI spec generation** — Swagger is imported but unclear if it's auto-generated or manual. Auto-generation from TypeScript types would ensure accuracy. | 🟢 DX |

### 3.3 Frontend Architecture
| Finding | Severity |
|---------|----------|
| **JSZip loaded eagerly** — 43KB gzipped imported at module level in Annex IV page. Use `const JSZip = (await import('jszip')).default` inside the handler. | 🟡 Medium |
| **`integrity-service.js` dynamically imported** in audit-package-service. Should be static import at top of file. | 🟢 Low |
| **No React Error Boundaries on report pages** — If `AnnexIVReport` or `EvidenceBundle` component throws, entire page white-screens. `ErrorBoundary` component exists but isn't used on these pages. | 🟡 Medium |
| **Multiple `useAsync` calls per page** — Each with independent loading/error states. No batching. Dashboard makes 5+ parallel API calls which is correct (Promise.allSettled) but report pages make sequential dependent calls. | 🟢 Low |
| **No Suspense boundaries** — Could use React Suspense for data-dependent sections instead of manual loading states. | 🟢 Future |

### 3.4 Performance
| Finding | Severity |
|---------|----------|
| **Dashboard N+1 query pattern** — Fetches all fund structures, then for each: compliance report, then for each asset: cap table. For 3 funds × 2 assets = 9 API calls. Would be 27+ calls for 10 funds. Should batch. | 🟡 Medium |
| **No data caching** — Every page navigation refetches all data. A simple React Query / SWR cache would eliminate redundant fetches during a session. | 🟡 Medium |
| **PDF generation is synchronous** — Large audit packages (13 pages, 100+ decisions) block the Express thread for 1-2 seconds. Should offload to a worker or use streaming. | 🟢 Future |
| **Compliance report service queries are complex** — `generateComplianceReport` runs 6-8 queries per call. Consider caching or materialized views for dashboard. | 🟡 Medium |

---

## 4. Product Deep Dive

### 4.1 Feature Completeness (vs. Market Expectations)
| Feature | Status | Gap |
|---------|--------|-----|
| Fund setup & structure | ✅ Complete | - |
| Investor onboarding (KYC, eligibility) | ✅ Complete | Classification evidence validation is weak |
| Transfer validation | ⚠️ Partial | No lockup, gate, or notice period enforcement |
| Compliance rules engine | ✅ Complete | NL rule compiler + composite rules + severity |
| Decision audit trail | ✅ Complete | SHA-256 hash chain verified |
| AIFMD II readiness assessment | ✅ Complete | 24 questions, 8 categories, PDF export |
| Annex IV reporting | ⚠️ Partial | Custom XML, not real ESMA XSD |
| Sanctions/PEP screening | ⚠️ Mock only | OpenSanctions integration scaffolded but using mock |
| LMT management | ✅ Complete | CRUD, Art. 16 compliance check |
| Delegation oversight | ✅ Complete | Letterbox risk tracking, review dates |
| Regulatory calendar | ⚠️ Partial | List view only, no actual calendar grid, no iCal |
| AI Copilot | ✅ Excellent | Tool-use with live DB, 3 tools, PII stripping |
| PDF exports | ✅ Complete | 6 types, unified A2 brand |
| Multi-language | ⚠️ 95% | Screening page missing, some dashboard strings |
| Dark/light mode | ✅ Complete | Full theme support |
| Mobile responsive | ✅ Complete | 17-fix responsive overhaul |

### 4.2 Missing Features for Demo Impact
| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| **Reports Center page** — Hub showing all available reports with thumbnails, last generated date, download buttons. "One-stop reporting shop" is a strong demo narrative. | High | 2 hr | P1 |
| **Compliance trend sparkline** — Show 30-day score history on dashboard. "Your compliance improved 12% this month" is compelling for prospects. | High | 2 hr | P1 |
| **"Try Demo" on landing page** — Pre-filled credentials, one click to dashboard. Removes friction for self-serve evaluation. | High | 15 min | P1 |
| **First-time product tour** — 5-step overlay: Dashboard → Fund Detail → Rules → Reports → Copilot. Dismissible, never shown again. | Medium | 3 hr | P2 |
| **Regulatory news integration** — RSS feed exists but not surfaced prominently. A "BaFin just published X" notification would show the product is alive and current. | Medium | 1 hr | P2 |
| **Investor risk scoring** — Per-investor risk score based on jurisdiction, type, KYC status, concentration. Enables "show me high-risk investors" queries. | Medium | 2 hr | P2 |

---

## 5. GTM Deep Dive

### 5.1 Landing Page
| Finding | Impact |
|---------|--------|
| **€180,000 vs €11,880 claim** — No methodology documented. If challenged by a prospect or in a pitch: "Based on what?" Risk: credibility damage. Need a footnote: "Based on average Big 4 consulting rates of €X/hr × Y hours for AIFMD II compliance setup." | High |
| **No social proof** — No logos, no testimonials, no "trusted by X KVGs". At this stage, add "Pilotpartner gesucht" badge instead of faking social proof. | Medium |
| **Countdown timer** — Shows days until AIFMD II deadline. Good urgency mechanism. But after April 16, 2026, this becomes a countdown to... the past. Need to handle post-deadline state. | Low |
| **No product screenshots** — "Sehen Sie es in Aktion" section mentions features but shows no actual UI. Add 3-4 product screenshots or a GIF walkthrough. | High |
| **Footer links to DPA, Terms, Privacy, Impressum** — All exist as pages. Good DSGVO compliance. | ✅ |

### 5.2 Demo Strategy
| Finding | Impact |
|---------|--------|
| **Demo data is realistic** — German fund names, KAGB references, real jurisdictions, plausible investor types. Excellent. | ✅ |
| **No "DEMO" or "PREVIEW" watermark on PDFs** — If a prospect screenshots a PDF and shares it, it looks production-ready. This could create false expectations or, worse, someone uses a demo PDF in an actual audit. | High |
| **Mock screening creates false comfort** — A prospect running screening and seeing "Clear" for all investors might think it's real. Need clearer "SIMULATED RESULTS" labeling. | Medium |
| **No demo reset** — If a prospect creates/deletes data during a demo, there's no "Reset to default state" button. Need either a reset script or a read-only demo mode. | Medium |

---

## 6. Security Deep Dive

### 6.1 Authentication
| Finding | Severity |
|---------|----------|
| **JWT 30min + refresh token 7 days** — Good balance. | ✅ |
| **`JWT_SECRET` from env var** — Required, not hardcoded. Good. | ✅ |
| **No token blocklist** — If a JWT is compromised, it's valid for 30min with no way to revoke. Acceptable for MVP, need blocklist for production. | 🟢 Future |
| **Login has no brute-force lockout** — Rate limit is 1000 req/15min in dev, 200 in production. Should be lower for login specifically (e.g., 10 attempts / 15min per IP). | 🟡 Medium |

### 6.2 Authorization
| Finding | Severity |
|---------|----------|
| **Decision records are admin-only** — `authorize('admin')` on line 282. Compliance officers CAN'T view decision records directly. They can see them via compliance reports (which use admin-only `authorizeWrite`), but the direct `/api/decisions` endpoint blocks them. This is likely wrong — compliance officers should be the primary decision consumers. | 🟡 Important |
| **Report routes use `authorizeWrite('admin')`** — `authorizeWrite` allows GET for all authenticated users, so compliance officers CAN read reports. But the mount implies only admins have access, which is misleading. | 🟢 Style |

### 6.3 Data Protection
| Finding | Severity |
|---------|----------|
| **PII in decision `input_snapshot`** — Investor names, jurisdictions, investment amounts in plaintext JSON. Not encrypted at rest. | 🟡 GDPR |
| **Copilot has PII stripping** — `stripPII` service exists. Good. But copilot responses are logged in events table with `message_length` only, not content. | ✅ |
| **No data export (DSAR)** — GDPR Art. 15 requires ability to export all personal data on request. No endpoint exists for this. | 🟡 GDPR |
| **No data deletion mechanism** — GDPR Art. 17. Investors are soft-deleted but PII remains in decision snapshots permanently. Hash chain immutability conflicts with right to erasure. Need a documented legal basis (e.g., regulatory record-keeping obligation under KAGB § 36). | 🟡 GDPR |

### 6.4 Input Validation
| Finding | Severity |
|---------|----------|
| **Copilot SQL validation is solid** — Blocks mutation queries, multi-statements, comments. | ✅ |
| **Input sanitization middleware** — Strips null bytes, trims, limits to 10KB. Applied globally. | ✅ |
| **No file upload validation** — `investor-document-routes.ts` accepts file uploads but MIME type allowlist check should be verified server-side (not just client-side). | 🟡 Medium |

---

## 7. Accessibility Deep Dive

| Finding | WCAG | Effort |
|---------|------|--------|
| **Sidebar collapse buttons lack `aria-expanded`** — Screen readers don't announce section state | 2.1 A | 10 min |
| **No skip-to-content link** — Keyboard users must tab through 15+ sidebar items before reaching main content | 2.4.1 A | 10 min |
| **Color contrast on `text-ink-muted`** — Hex `#9ca3af` on `#2D3333` = ~3.3:1 contrast. WCAG AA requires 4.5:1. Fails for small text. | 1.4.3 AA | 15 min |
| **Color contrast on `text-ink-tertiary`** — `#8B9DA7` on `#2D3333` = ~3.8:1. Also below AA threshold. | 1.4.3 AA | 15 min |
| **Charts have no text alternatives** — Donut charts, bar charts, liquidity profile bars are purely visual. Screen readers skip them. | 1.1.1 A | 1 hr |
| **Modal focus trap** — PDF preview modal may not trap focus; tabbing could escape behind the overlay | 2.4.3 A | 20 min |
| **Date inputs have no visible label association** — `<label>` exists but may not be properly linked via `htmlFor` | 1.3.1 A | 10 min |
| **Badge colors alone convey status** — "green = good, red = bad" with no icon or text alternative for colorblind users. The status badges DO have text, so this is partially addressed. | 1.4.1 A | Partial ✅ |

---

## 8. Prioritized Action Plan

### Tier 1: Do Before Next Demo (< 2 hours total)
1. **Unify compliance score formula** — Pick one formula, extract to shared util, use everywhere (15 min)
2. **i18n Screening page** — 30 hardcoded strings → t() calls (30 min)
3. **Add "PREVIEW" watermark to demo PDFs** — Diagonal gray text on every PDF page (20 min)
4. **"Try Demo" button on landing page** — Link to `/login?email=demo@caelith.tech&password=Demo1234` with auto-fill (15 min)
5. **Dynamic import JSZip** — `await import('jszip')` instead of static import (5 min)
6. **Add "Demo Only" badge to Regulatory Identifiers** — Until backend persistence exists (5 min)
7. **Fix dashboard hardcoded English strings** — "Fund Structures", tab labels (10 min)
8. **Remove design-lab routes from production build** — Add `NODE_ENV` guard (10 min)

### Tier 2: Do This Week (Before KVG Outreach)
9. **Reports Center hub page** with all report types, thumbnails, last-generated dates
10. **Error boundaries on all report pages**
11. **Screening history persistence** — Store results in DB, show past screening runs
12. **Individual investor screening** — "Screen" button on investor detail
13. **Calendar grid view** (even a simple month grid) + iCal export
14. **Copilot conversation persistence** — Save chat history in localStorage
15. **Compliance trend sparkline** on dashboard score ring

### Tier 3: Pre-Production
16. ESMA Annex IV XSD alignment
17. Transfer lockup/gate/notice period enforcement
18. Classification evidence proper validation
19. GDPR DSAR endpoint + data retention policy
20. Accessibility fixes (aria-expanded, skip link, contrast)
21. Database index audit with EXPLAIN ANALYZE
22. Data caching layer (React Query or SWR)

---

## Grade Summary (Post-Deep-Audit)

| Perspective | Grade | Key Issue |
|------------|-------|-----------|
| **UX/UI** | B | Screening i18n, hardcoded strings, no reports hub |
| **Legal/Compliance** | B- | Dual score formula, no lockup enforcement, GDPR gaps |
| **Technical** | B+ | Clean architecture, good security. N+1 queries, no caching |
| **Product** | B+ | Feature-rich. Missing: reports hub, trend, demo watermark |
| **GTM** | B- | No try-demo, no screenshots, unsubstantiated pricing claim |
| **Security** | B+ | JWT+refresh, SQL validation, PII stripping. Need DSAR, login lockout |
| **Accessibility** | C- | Fails WCAG AA on contrast, no ARIA, no skip link |
| **Demo Readiness** | B+ | Great data, great copilot. Score inconsistency and mock screening are traps |
