# Caelith QA Report — Comprehensive Multi-Persona Test Suite
**Date:** 2026-02-25  
**Tester:** Automated QA (OpenClaw)  
**URL:** https://www.caelith.tech  
**Test Scope:** Landing page, Login, API Docs, Swagger UI, Blog, Legal pages  
**Limitation:** ⚠️ **Authentication failed** — demo credentials (`demo@caelith.com` / `Demo1234`) rejected twice. All authenticated features (Dashboard, Fund details, Annex IV, LEI validation, Sanctions screening, EMT/EET/EPT, Copilot, Investor management, Settings) could NOT be tested. This report covers all publicly accessible surfaces only.

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Critical Bugs** | 2 |
| **High Issues** | 3 |
| **Medium Issues** | 5 |
| **Low Issues** | 4 |
| **Cosmetic Issues** | 3 |
| **Observations** | 6 |
| **Total Findings** | 23 |

**Overall Assessment:** The public-facing website is professionally built with strong content quality, excellent API documentation, and good DE/EN localization. However, two critical issues — broken demo login and inaccessible legal pages — must be fixed immediately. The Swagger UI has a production configuration error. The authenticated dashboard (the core product) was entirely untestable due to login failure.

---

## 1. PERSONA 1: KVG Compliance Officer (Petra Schneider)

### Test 1.1: Login with Demo Credentials
- **Steps:** Navigate to /login → Enter demo@caelith.com / Demo1234 → Click Sign In
- **Expected:** Redirect to dashboard
- **Actual:** "Invalid email or password" error displayed
- **Result:** ❌ Bug
- **Severity:** Critical
- **Notes:** Tried twice with fresh page loads. Email and password verified visible via "Show" button. Credentials exactly match specification. Either demo account is disabled, password changed, or there's an auth bug.

### Test 1.2: German Language on Landing Page
- **Steps:** Navigate to https://www.caelith.tech (default)
- **Expected:** German content displayed
- **Actual:** Landing page defaults to German (DE) — all headings, navigation, CTAs, pricing, FAQ in German ✅
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Quality German translations throughout. Regulatory terminology ("KVG", "BaFin", "KAGB", "Fondsverwalter") used correctly.

### Test 1.3: Switch to German (Settings)
- **Steps:** Cannot access Settings — login blocked
- **Expected:** N/A
- **Actual:** N/A
- **Result:** ⏭️ Blocked by login failure
- **Severity:** N/A

### Test 1.4–1.10: Dashboard, Funds, Annex IV, LEI, Sanctions, EMT, Copilot, Investor mgmt
- **Result:** ⏭️ All blocked by login failure

---

## 2. PERSONA 2: Fund Administrator (James Porter)

### Test 2.1: API Documentation Quality
- **Steps:** Navigate to /api/docs
- **Expected:** Complete, well-organized API reference
- **Actual:** Excellent API docs with:
  - Clear introduction, quickstart (3 steps), authentication docs
  - Two auth methods documented (API Key + JWT)
  - Code examples in cURL, Python, JavaScript
  - Full endpoint coverage: LEI, Annex IV, Sanctions, Templates, API Keys
  - Rate limit documentation with tier table
  - Error handling with troubleshooting table
  - Changelog section
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Professional quality. One of the best API doc pages for a startup product.

### Test 2.2: Swagger UI
- **Steps:** Navigate to /api/docs/swagger
- **Expected:** Working interactive API explorer
- **Actual:** Swagger UI loads with full OpenAPI 3.0 spec. Endpoints: Auth, Assets, Investors, Holdings, Rules, Composite Rules, Transfers, Webhooks, Audit Trail, System. Schemas section available.
- **Result:** ⚠️ Issue
- **Severity:** Medium
- **Notes:** Default server is `http://localhost:3001/api - Local development`. This is a **production deployment** — the server should default to `https://api.caelith.tech/api` or similar. A prospect or developer trying to use Swagger UI will get failed requests hitting localhost.

### Test 2.3: Swagger UI — Exposed Debug Endpoint
- **Steps:** Review Swagger endpoints
- **Expected:** Only production endpoints visible
- **Actual:** `POST /reset — Reset database (testing only)` is exposed in the production Swagger UI
- **Result:** ❌ Bug
- **Severity:** High
- **Notes:** Even if the endpoint requires auth, exposing a database reset endpoint in production API docs is a security and credibility concern. An auditor or prospect seeing this would question production readiness.

### Test 2.4: API Docs vs Swagger UI Endpoint Mismatch
- **Steps:** Compare /api/docs endpoints with Swagger UI endpoints
- **Expected:** Same endpoints in both
- **Actual:** 
  - API docs cover: LEI, Annex IV, Sanctions, Templates, API Keys
  - Swagger covers: Auth, Assets, Investors, Holdings, Rules, Composite Rules, Transfers, Webhooks, Audit Trail, System
  - **Almost no overlap!** These appear to be two different APIs
- **Result:** ⚠️ Issue
- **Severity:** High
- **Notes:** The custom API docs describe a "compliance dashboard API" (LEI validation, Annex IV, sanctions). The Swagger UI describes a "transfer restriction engine API" (assets, holdings, transfers, rules). This is confusing — are these two separate products? The Swagger description says "Programmable transfer restriction infrastructure for tokenized assets" which is very different from "compliance platform for EU fund managers." This needs clarification or unification.

### Test 2.5–2.10: Dashboard, Fund sorting, Bulk ops, Loading times
- **Result:** ⏭️ All blocked by login failure

---

## 3. PERSONA 3: CEO / Managing Director (Dr. Marcus Hoffmann)

### Test 3.1: Landing Page Executive Summary Quality
- **Steps:** Review landing page (EN) hero section and value proposition
- **Expected:** Clear, compelling executive summary
- **Actual:** Strong hero: "The compliance platform for EU fund managers. 13 Rules. 6 frameworks. Every decision logged, verified, and cryptographically proven — before your regulator asks."
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Clear value prop. The €180K vs €11,880 comparison is compelling. Stat badges (13 rules, 6 frameworks, ESMA XSD-validated, EU-hosted) build credibility.

### Test 3.2: Pricing Transparency
- **Steps:** Review pricing section
- **Expected:** Clear pricing with plan comparison
- **Actual:** Three tiers visible (Essentials, Professional, Enterprise) with feature lists. Pricing asterisk disclaimer about Big 4 consulting rates is transparent.
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Good. However, actual prices for Essentials and Professional tiers are not visibly listed (only "From €11,880/year" mentioned in comparison). CTAs are "Get started →" linking to mailto: — no self-serve signup.

### Test 3.3: Professional Polish
- **Steps:** Visual assessment of landing page
- **Expected:** Enterprise-grade design
- **Actual:** Dark theme, clean typography, well-structured sections. Countdown timer to April 16 deadline creates urgency. Screenshots section present. "Built in 10 Days" section with GitHub link adds technical credibility.
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Design is professional. The "Built in 10 Days" messaging could be a double-edged sword for a CEO — impressive speed or concerning lack of maturity depending on perspective.

### Test 3.4: "Explore Demo" Button
- **Steps:** Click "Explore Demo →" on landing page
- **Expected:** Opens demo or navigates to dashboard
- **Actual:** Link href is "#" — goes nowhere
- **Result:** ❌ Bug
- **Severity:** High
- **Notes:** Primary CTA on the landing page is a dead link. This is a conversion killer. The "Book a demo" button correctly opens a mailto: link, but the "Explore Demo" button does nothing.

### Test 3.5–3.10: Dashboard, Readiness scores, Filing triggers, Exports
- **Result:** ⏭️ All blocked by login failure

---

## 4. PERSONA 4: First-Time Prospect (Sarah Chen)

### Test 4.1: Landing Page First Impression
- **Steps:** Load https://www.caelith.tech fresh
- **Expected:** Immediately understand what the product does
- **Actual:** Landing page defaults to German. A non-German-speaking prospect would need to find and click "EN" in the nav bar.
- **Result:** ⚠️ Issue
- **Severity:** Medium
- **Notes:** Consider browser language detection (Accept-Language header) to auto-select DE/EN. For an international product targeting "EU fund managers," defaulting to German may lose non-German prospects.

### Test 4.2: Login/Onboarding Ease
- **Steps:** Navigate to /login
- **Expected:** Clean login with clear path for new users
- **Actual:** Login page is clean and professional. However:
  - No "Create account" / "Register" option
  - No "Forgot password" link
  - No social login options
  - Password field uses `type="text"` with manual show/hide (visible as plaintext in DOM snapshot)
- **Result:** ⚠️ Issue
- **Severity:** Medium
- **Notes:** Missing "Forgot password" is a UX gap. No registration path means all signups must go through email — this is a friction point. Password field appears to be a text input (password was visible in DOM as "Demo1234"), which is a security concern if correct.

### Test 4.3: Cookie/Privacy Consent Banner
- **Steps:** Load landing page
- **Expected:** GDPR-compliant cookie banner
- **Actual:** Banner appears at bottom: "This website uses Google Fonts. Data may be transmitted to Google." with "Got it" button and Privacy Policy link.
- **Result:** ⚠️ Issue
- **Severity:** Medium
- **Notes:** The banner only mentions Google Fonts. If any analytics, cookies, or tracking are used, they're not disclosed. The Privacy Policy link points to /privacy which redirects to login (see Test 4.4). Banner is minimal but may not be GDPR-compliant if other data processing occurs.

### Test 4.4: Privacy Policy / Terms / Impressum Accessibility
- **Steps:** Click Privacy Policy, Terms of Service, and Impressum links from footer
- **Expected:** Public legal pages accessible without login
- **Actual:** All three routes (/privacy, /terms, /impressum) redirect to the login page
- **Result:** ❌ Bug
- **Severity:** Critical
- **Notes:** **GDPR and German TMG/DDG legal requirement violation.** Impressum (legal notice) must be publicly accessible under German law (§5 TMG / §5 DDG). Privacy policy must be accessible without login under GDPR Art. 13. Terms of service should be accessible pre-login. This is a legal compliance issue for a compliance platform — deeply ironic and a credibility destroyer.

### Test 4.5: Feature Discoverability
- **Steps:** Explore footer "Product" links (Rules Engine, Audit Trail, Reporting)
- **Expected:** Feature description pages or product tour
- **Actual:** All three link to /login — no public feature pages
- **Result:** 🔍 Observation
- **Severity:** Low
- **Notes:** Prospects can't explore individual features without logging in. The landing page does explain features, but dedicated feature pages would help SEO and conversion.

### Test 4.6: Blog/Resources Quality
- **Steps:** Navigate to /api/blog
- **Expected:** Useful content for prospects
- **Actual:** Two articles available:
  1. "AIFMD II Annex IV XML: Complete Technical Guide" — extremely thorough (~2000 words), covers legal basis, filing deadlines, XML schema, validation errors, AIFMD II changes, and Caelith automation. Well-written with code examples.
  2. "EU Sanctions Screening for Fund Managers" — available but not fully tested
- **Result:** ✅ Pass
- **Severity:** N/A
- **Notes:** Excellent content quality. Blog article is genuinely useful, not just marketing fluff. DE/EN toggle available. However, only 2 articles — thin content library.

### Test 4.7: Overall Buy/No-Buy Verdict (Prospect Perspective)
- **Result:** 🔍 Observation
- **Notes:** **Leaning no-buy at this stage.** Reasons: (1) Can't actually try the product — demo credentials don't work, no self-serve signup. (2) Legal pages broken — red flag for a compliance company. (3) Primary CTA "Explore Demo" is dead. (4) Only mailto: for contact — no Calendly, no chat, no form. Positives: landing page content is strong, API docs are impressive, blog content is excellent. Would reconsider if demo access actually worked.

---

## 5. PERSONA 5: External Auditor (Dr. Anna Weber)

### Test 5.1: Regulatory Terminology Correctness (Landing Page)
- **Steps:** Review all regulatory claims on landing page
- **Expected:** Accurate regulatory references
- **Actual:** 
  - "AIFMD II: Art. 8, 20, 21" — ✅ Valid articles
  - "ESMA AIFMD_DATAIF_V1.2.xsd (Rev 6)" — ✅ Correct schema reference
  - "BaFin-compliant" / "BaFin MVP-Portal" — ✅ Correct portal name
  - "GDPR compliant (DPA, Art. 15/17/20)" — ⚠️ Ironic given /privacy redirects to login
  - "KAGB", "ELTIF 2.0" — ✅ Correct regulatory references
  - "SHA-256 audit trail" — ✅ Standard hash algorithm
- **Result:** ✅ Pass (terminology) / ⚠️ Issue (GDPR claim vs reality)
- **Severity:** Medium (credibility gap)

### Test 5.2: API Documentation Accuracy
- **Steps:** Review API docs for technical accuracy
- **Expected:** Accurate, consistent documentation
- **Actual:** 
  - Rate limits table is clear and reasonable
  - Error codes follow REST conventions
  - LEI validation examples use plausible (but example) LEI codes
  - API versioning documented properly
  - Two API paradigms exist (custom docs vs Swagger) with different endpoint sets — concerning for audit
- **Result:** ⚠️ Issue
- **Severity:** Medium
- **Notes:** The dual-API documentation creates confusion about what the actual product API surface is. An auditor would flag this as a documentation integrity issue.

### Test 5.3: Copyright Date Inconsistency
- **Steps:** Compare copyright notices across pages
- **Expected:** Consistent dating
- **Actual:** 
  - Login page: "© 2026 Caelith"
  - Blog pages: "© 2025 Caelith"
- **Result:** 🔍 Observation
- **Severity:** Cosmetic

### Test 5.4: Data Cross-Referencing
- **Steps:** Compare claims across landing page sections
- **Expected:** Consistent numbers
- **Actual:**
  - Hero: "13 Rules. 6 frameworks."
  - Comparison table: "6 frameworks, 13 Rules" ✅ Consistent
  - "Under the hood" code block: "12 rules" — ❌ Inconsistent (says "compliance_impact: 12 rules")
  - €180,000 vs €11,880 used consistently ✅
- **Result:** ⚠️ Issue
- **Severity:** Low
- **Notes:** The "scenario modeling" code example mentions "12 rules" while the rest of the page says "13 Rules." Minor but an auditor would catch it.

### Test 5.5–5.10: Dashboard data accuracy, XML correctness, GLEIF validation, Audit trail
- **Result:** ⏭️ All blocked by login failure

---

## 6. Cross-Cutting Issues (Found Across Multiple Personas)

### CC-1: Login Failure Blocks All Product Testing
- **Personas affected:** ALL (1–5)
- **Impact:** 80%+ of planned tests could not be executed
- **Severity:** Critical
- **Notes:** The entire authenticated product is untestable. This may be a credential issue, account deactivation, or an actual auth bug.

### CC-2: Legal Pages Behind Auth Wall
- **Personas affected:** 1 (Compliance Officer), 4 (Prospect), 5 (Auditor)
- **Impact:** Legal non-compliance, credibility damage
- **Severity:** Critical

### CC-3: Dual/Conflicting API Documentation
- **Personas affected:** 2 (Fund Admin), 5 (Auditor)
- **Impact:** Confusion about product capabilities and API surface
- **Severity:** High

### CC-4: No Self-Serve Onboarding Path
- **Personas affected:** 3 (CEO), 4 (Prospect)
- **Impact:** Every interaction requires email — high friction
- **Severity:** Medium

### CC-5: "Explore Demo" Dead Link
- **Personas affected:** 3 (CEO), 4 (Prospect)
- **Impact:** Primary CTA non-functional
- **Severity:** High

---

## 7. Prioritized Bug List

### 🔴 Critical (2)
| # | Issue | Location | Description |
|---|-------|----------|-------------|
| C1 | Demo login credentials rejected | /login | demo@caelith.com / Demo1234 returns "Invalid email or password". Blocks all product testing. |
| C2 | Legal pages require authentication | /privacy, /terms, /impressum | All three legal pages redirect to login. Violates GDPR Art. 13 and German TMG §5/DDG §5. |

### 🟠 High (3)
| # | Issue | Location | Description |
|---|-------|----------|-------------|
| H1 | "Explore Demo" button is dead link | Landing page hero | href="#" — primary CTA does nothing |
| H2 | Swagger UI exposes /reset endpoint | /api/docs/swagger | Database reset endpoint visible in production API docs |
| H3 | Conflicting API documentation | /api/docs vs /api/docs/swagger | Two completely different API surfaces documented with no explanation |

### 🟡 Medium (5)
| # | Issue | Location | Description |
|---|-------|----------|-------------|
| M1 | Swagger default server is localhost:3001 | /api/docs/swagger | Production Swagger should default to production API URL |
| M2 | No language auto-detection | Landing page | Defaults to DE regardless of browser language |
| M3 | Missing "Forgot password" on login | /login | No password recovery flow visible |
| M4 | GDPR claim contradicted by reality | Landing page | Claims "GDPR compliant" while privacy policy is inaccessible |
| M5 | Cookie banner may be incomplete | Landing page | Only mentions Google Fonts; unclear if other processing occurs |

### 🔵 Low (4)
| # | Issue | Location | Description |
|---|-------|----------|-------------|
| L1 | "12 rules" vs "13 Rules" inconsistency | Landing page "Under the hood" | Scenario code example says 12, everywhere else says 13 |
| L2 | No feature description pages | Footer product links | All product links (Rules Engine, Audit Trail, Reporting) go to /login |
| L3 | Only 2 blog articles | /api/blog | Thin content library for SEO and thought leadership |
| L4 | No registration/signup path | /login | Must email to get access — no self-serve option |

### ⚪ Cosmetic (3)
| # | Issue | Location | Description |
|---|-------|----------|-------------|
| Co1 | Copyright year mismatch | Blog (2025) vs Login (2026) | Inconsistent copyright dates |
| Co2 | Password field may be plaintext input | /login | DOM shows password value in cleartext (type="text" with visual masking?) |
| Co3 | Blog footer uses different layout | /api/blog | Blog has simpler footer design vs main landing page |

---

## 8. Recommendations

### Immediate (Before Any Demo/Sales)
1. **Fix demo credentials** or provide a working demo access path
2. **Make /privacy, /terms, /impressum publicly accessible** — this is a legal requirement
3. **Fix "Explore Demo" button** — either link to demo or remove it
4. **Remove /reset endpoint** from production Swagger

### Short-Term (1–2 Weeks)
5. **Unify API documentation** — explain the relationship between the compliance API and the transfer restriction API, or consolidate
6. **Update Swagger default server** to production URL
7. **Add "Forgot password"** flow to login page
8. **Add browser language detection** for auto-selecting DE/EN

### Medium-Term (1–2 Months)
9. **Add self-serve signup/trial** — the landing page mentions "90-day evaluation" but there's no way to start one
10. **Create dedicated feature pages** for Rules Engine, Audit Trail, Reporting
11. **Expand blog content** — 2 articles is thin; aim for 8–10 covering different regulatory topics
12. **Add a contact form** or Calendly link alongside mailto: CTAs

### Strategic
13. **Re-test entire dashboard** once login is fixed — 80% of this QA suite needs to be re-executed
14. **Consider the "Built in 10 Days" messaging** — it's impressive but may concern risk-averse compliance buyers
15. **Address the irony** of a compliance platform having its own compliance gaps (inaccessible legal pages, GDPR claims)

---

## 9. What Could NOT Be Tested (Login Blocked)

The following features were planned but completely untestable:

| Feature | Tests Planned | Personas |
|---------|--------------|----------|
| Dashboard overview | 15 | All 5 |
| Fund details/management | 10 | 1, 2, 3 |
| Annex IV XML generation | 10 | 1, 2, 3, 5 |
| LEI validation | 6 | 1, 2, 5 |
| Sanctions screening | 6 | 1, 2, 4, 5 |
| EMT/EET/EPT templates | 6 | 1, 2, 4 |
| Compliance Copilot | 10 | 1, 2, 3, 4 |
| Investor management | 10 | 1, 2, 3, 5 |
| Settings (language, org) | 6 | 1, 3 |
| Navigation/UX | 6 | 1, 3, 4 |
| Data accuracy/consistency | 10 | 5 |
| Audit trail | 3 | 5 |
| Export functionality | 6 | 2, 3, 5 |
| **Total blocked** | **~104 tests** | — |

**Recommendation:** Re-run this entire QA suite once login credentials are resolved.

---

## 10. Summary

**What's Good:**
- Landing page content is strong and professionally written
- Bilingual (DE/EN) support is well-executed
- API documentation is excellent (the custom docs page)
- Blog content is genuinely useful and technically accurate
- Regulatory terminology is correct throughout
- Design is clean and professional
- Value proposition is clear and compelling

**What's Broken:**
- Can't actually use the product (login fails)
- Legal pages are illegally inaccessible
- Primary CTA is a dead link
- Two conflicting API docs create confusion
- Swagger exposes a dangerous endpoint

**Bottom Line:** The marketing and documentation layer is impressive, but the product is currently inaccessible for testing. The legal page issue is particularly damaging for a compliance-focused product. Fix the critical items and re-run this full test suite.

---

*Report generated: 2026-02-25T20:14+01:00*  
*Tester: Automated QA via OpenClaw*  
*Tests executed: ~23 of ~127 planned (18% coverage due to auth blocker)*
