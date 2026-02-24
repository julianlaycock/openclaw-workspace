# Caelith — YC Board Assessment
**Date:** February 22, 2026
**Perspectives:** Finance, Law, Product, UX/UI, Software Engineering, Business, Entrepreneurship, RegTech

---

## Executive Verdict

**Would we fund this? Conditional yes.**

The domain expertise is real — AIFMD II readiness scoring, SHA-256 hash-chain evidence bundles, and compliance decision provenance are genuinely differentiated. Architecture is sound. But the product has credibility-killing gaps (date formatting, broken audit trail, incomplete i18n) that would make a German compliance officer dismiss it in the first 5 minutes.

**Fix those, and this is a very compelling demo.**

---

## Scores

| Perspective | UX Audit | Eng Audit | Combined | Notes |
|-------------|----------|-----------|----------|-------|
| **UX/UI** | 72 | — | **72** | Date formats, mixed i18n, broken audit log |
| **Security** | — | C+ (68) | **68** | localStorage tokens, unsafe-inline CSP, open registration |
| **Architecture** | — | B (82) | **82** | Clean separation, mixed placeholder styles, god-file server.ts |
| **Business Logic** | — | B+ (85) | **85** | Scoring sound, eligibility correct, Annex IV not XSD-valid |
| **Product** | 78 | — | **78** | Strong core, audit trail broken, orphaned pages |
| **RegTech Credibility** | — | — | **65** | Date format alone kills it for EU; AUM thresholds use unit counts |
| **GTM Readiness** | — | — | **70** | No self-serve, but landing page is solid |
| **Overall** | | | **74** | |

---

## CRITICAL FINDINGS (Fix Before Any Demo)

### 🔴 P0 — Dealbreakers

**1. Date format is MM/DD/YYYY (American) on Annex IV + Audit Log**
A German compliance officer sees "02/22/2026" and immediately questions whether this product was built for their market. EU standard is DD.MM.YYYY or ISO 8601. This single issue undermines the entire "Built for German KVGs" positioning.

**2. Audit Log is broken**
- Only 1 entry visible
- User column shows raw UUID ("82a36af2") not name
- Entity ID shows truncated meaningless string
- Changes column shows "—" (empty)
- Date picker uses MM/DD/YYYY

The audit trail is THE core deliverable for a compliance platform. If it doesn't work, the product's value proposition collapses.

**3. Two duplicate "Audit Log" sidebar entries**
`/audit` and `/audit-log` are different pages. A prospect clicking between them thinks the product is broken.

**4. JWT tokens stored in localStorage**
Any XSS vulnerability → full account takeover including refresh tokens. Combined with `unsafe-inline` CSP, this is a compounding critical risk. A financial compliance platform storing auth in localStorage would fail any security review.

**5. Annex IV uses unit counts for reporting thresholds, not AUM**
AIFMD Article 24(1)/24(2)/24(4) thresholds are based on AUM in euros. Using unit counts means a fund with 1M units at €0.01 (€10K AUM) gets classified as Article 24(2). This is factually wrong and directly undermines the core value proposition.

### 🟠 P1 — Must Fix Before Paid Pilot

**6. Incomplete German i18n**
"Transfers", "Screening", "PORTFOLIO", "COMPLIANCE", "MONITORING", "Score" — all untranslated in DE mode. Mixed EN/DE is worse than all-English. A compliance officer notices instantly.

**7. Number formatting not locale-aware**
1,000 (English) vs 1.000 (German) — financial professionals deal with numbers all day. Wrong format = wrong product.

**8. Open registration grants read access**
Anyone can register as `viewer` and read all fund/investor/compliance data. No invite flow, no domain restriction, no admin approval.

**9. SSL certificate validation disabled in production**
`rejectUnauthorized: false` on the database connection carrying investor PII. Unacceptable for any financial product.

**10. Public integrity endpoint with no rate limit**
`/api/public/integrity/verify` is unauthenticated and loads ALL decision records into memory. DoS vector.

### 🟡 P2 — Fix Before Scale

**11. Retail ELTIF suitability always passes** — auto-approves investors who may not qualify
**12. Lockup period uses `now` not `executionDate`** — future-dated transfers incorrectly rejected
**13. RLS is disabled on startup** — tenant isolation is decorative only
**14. Holdings page not in sidebar** — orphaned, only reachable from fund detail
**15. Activity page (/audit) defaults limit to 1** — appears empty
**16. Rules page: asset selector below AI builder** but error says "select asset below first"
**17. `verifyChain` loads ALL records into memory** — OOM risk at scale
**18. 70KB landing page HTML inline in TypeScript** — maintenance nightmare

---

## WHAT'S ACTUALLY GOOD (Would Make Us Write a Check)

1. **Hash-chain evidence bundles** — genuinely differentiated. Cryptographically provable compliance decisions with genesis block, SHA-256 chain, 232 verified records. This is real IP.

2. **AIFMD II Readiness Assessment** — 24 questions, 8 categories, auto-scoring from live data. No competitor has this specific feature for the April 2026 deadline.

3. **Compliance Copilot with tool-use** — queries live DB, legal disclaimer, domain-aware prompts. Smart architecture (claude-haiku at ~$0.02/question).

4. **Domain modeling depth** — LMTs, delegations, Art. 16 compliance, KAGB investor classification, concentration limits, redemption gates. This wasn't built by generic SaaS developers.

5. **Engineering discipline** — 39 iterative migrations, bcrypt (12 rounds), JWT validation, refresh token rotation, PII stripping before AI calls, request ID propagation, structured logging, RBAC with authorizeWrite pattern.

6. **Market timing** — AIFMD II deadline is April 16, 2026. 52 days away. Every German KVG compliance officer is feeling the pressure right now.

---

## STRATEGIC ASSESSMENT

### As a RegTech Product
The compliance logic is ~85% correct. The remaining 15% matters enormously because compliance is binary — you're either compliant or you're not. The Annex IV AUM vs unit count issue (B8) and the retail suitability auto-pass (B3) are the kind of bugs that could result in regulatory action against a customer. These must be fixed before any customer uses this in production.

### As a Business
- **TAM is real**: 632 small/mid KVGs in Germany alone, expanding to EU
- **Pain is acute**: AIFMD II deadline in 52 days
- **Pricing is sensible**: €990-€3,500/mo is 93% cheaper than Big 4 consulting
- **GTM gap**: No self-serve, no case studies, no comparison page. The product is further along than the go-to-market.

### As Engineering
- **Architecture**: B — clean service/route separation, proper middleware pipeline, good error handling
- **Security**: C+ — adequate for demo, needs significant hardening for production (localStorage tokens, CSP, SSL, open registration)
- **Code quality**: B+ — consistent patterns, TypeScript throughout, proper typing
- **Technical debt**: Manageable — mixed placeholder styles and the landing page inline HTML are the biggest items

---

## "8 HOURS BEFORE DEMO" PRIORITY LIST

| # | Task | Time | Impact |
|---|------|------|--------|
| 1 | Fix ALL date formats to DD.MM.YYYY / ISO 8601 | 1h | 🔴 Dealbreaker |
| 2 | Merge audit pages → single working audit trail (resolve UUIDs to names, show changes, fix limit) | 1.5h | 🔴 Core feature broken |
| 3 | Complete DE translations (Transfers, Screening, section headers, Score) | 30m | 🟠 Credibility |
| 4 | Fix number formatting for DE locale (1.000,00) | 30m | 🟠 Credibility |
| 5 | Add Holdings to sidebar | 15m | 🟡 Navigation |
| 6 | Fix Rules page asset selector position | 30m | 🟡 UX flow |
| 7 | Fix Annex IV AUM thresholds (use real AUM not units) | 1h | 🔴 Regulatory correctness |
| 8 | Rate-limit public integrity endpoint + add default limit to verifyChain | 30m | 🟠 Security |
| 9 | Disable open registration (require invite or admin approval) | 30m | 🟠 Security |
| 10 | Make investor rows clickable in table | 30m | 🟡 UX polish |
| | **Total** | **~7h** | |

---

## LONGER-TERM ROADMAP (Post-Demo)

### Week 1: Security Hardening
- Move tokens to httpOnly cookies
- Remove `unsafe-inline` from CSP
- Fix SSL certificate validation
- Implement proper tenant isolation or document single-tenant commitment

### Week 2: Regulatory Correctness
- Fix retail ELTIF suitability (don't auto-pass)
- Fix lockup period date comparison
- Align Annex IV closer to actual ESMA XSD
- Add GDPR right-to-erasure documentation for hash chain

### Week 3: GTM
- Self-serve demo flow (pre-seeded, sandboxed)
- Case study from first pilot customer
- Comparison page (Caelith vs manual, vs Big 4, vs competitors)
- Product screenshots updated with polished state

### Week 4: Scale Prep
- Paginate verifyChain (don't load all records)
- Move file storage from DB to S3
- Connection pool tuning
- Automated test suite

---

## FINAL WORD

This product has real substance. The hash-chain evidence bundle and AIFMD II readiness assessment are genuinely differentiated features that solve a real, time-sensitive problem. The engineering is solid. The domain expertise is evident.

But right now, a German compliance officer would open the Annex IV page, see "02/22/2026", and close the tab. That's the gap between "impressive demo" and "I'd stake my career on this." Close that gap, and you have something fundable.

**Score: 74/100 → addressable to 90+ in one focused week.**
