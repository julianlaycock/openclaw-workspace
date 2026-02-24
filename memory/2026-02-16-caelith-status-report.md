# Caelith Status Report — 2026-02-16
## Comprehensive UX/Compliance Audit with Persona Simulations

---

## PART 1: CURRENT STATE vs. PRD

### What's Built and Working
| Feature | PRD Status | Actual State |
|---------|-----------|-------------|
| Fund structure modeling | P0 | ✅ Built — 8 funds, SIF/RAIF/QIAIF/ELTIF/Spezial-AIF |
| Investor classification (5-tier) | P0 | ✅ Built — retail through institutional |
| KYC tracking + expiry | P0 | ✅ Built — verified/expired/pending with days-left |
| Transfer simulation + execution | P0 | ✅ Built — with approval workflow |
| Rules engine (deterministic) | P0 | ✅ Built — 7+ rule types, composite AND/OR/NOT |
| Investor type whitelist rules | P0 | ✅ Built |
| Minimum investment rules | P0 | ✅ Built |
| KYC validity rules | P0 | ✅ Built |
| Jurisdiction-specific eligibility | P0 | ✅ Built — eligibility criteria table, 3 jurisdictions |
| Decision provenance records | P0 | ✅ Built — backend routes exist |
| NL rule configuration | P1 | ✅ Built — AI Rule Builder on Rules page |
| Compliance Copilot (RAG) | P1 | ✅ Built — floating panel with context-aware prompts |
| Onboarding workflow | P1 | ⚠️ Partial — page exists, empty, no demo data |
| Compliance dashboard | P2 | ✅ Built — KPIs, action queue, analytics charts |
| Fund detail + compliance report | P2 | ✅ Built — eligibility criteria, PDF export |
| Search (Ctrl+K) | — | ✅ Built — command palette |

### What's Broken or Missing
| Feature | PRD Status | Actual State |
|---------|-----------|-------------|
| Activity/Audit page | P2 | ❌ 404 (nav links to dead page) |
| Alerts page | P2 | ❌ 404 (nav badge draws attention to nothing) |
| Scenario modeling | P1 | ❌ No UI (backend may exist) |
| AIFMD Annex IV export | P1 | ❌ No UI visible |
| Concentration limits | P0 | ⚠️ Backend has field, no UI to configure |
| Max investors rule | P0 | ⚠️ Backend has field, no UI to configure |
| Decision provenance viewer | P0 | ❌ No UI to browse decision records |
| Onboarding demo data | P1 | ❌ Empty — can't validate workflow |

### Test Health
- **112 tests total**: 49 passing, 8 failing
- Failures: multi-tenant isolation, e2e cap table data mismatch
- Rules engine unit tests: all passing ✅
- Composite rules tests: all passing ✅

---

## PART 2: PERSONA SIMULATIONS

### Persona 1: Maria — Compliance Officer at a €200M Luxembourg AIFM
**Profile:** 15 years in fund compliance. Manages 3 SIF/RAIF funds. Reports to CSSF. Non-technical but detail-oriented. Uses Excel today.

**User Story 1.1: "I need to verify a new semi-professional investor is eligible for our SIF fund"**
- **What she'd do:** Go to Investors → find the investor → check their type + KYC → cross-reference with SIF eligibility rules
- **Can Caelith do this?** Partially. She can see investor type and KYC status in the table. But there's no "Check Eligibility" button on an investor record that runs the eligibility check against a specific fund. The backend POST /eligibility/check exists, but there's no UI for it. She'd have to mentally cross-reference or use the Copilot.
- **Gap:** **No one-click eligibility verification from the investor profile. This is the #1 workflow for a compliance officer and it requires mental math instead of automation.**

**User Story 1.2: "CSSF is auditing us — I need to show every compliance decision made on Fund Alpha in the last 6 months"**
- **Can Caelith do this?** The decision_records table exists in the backend. The fund detail page has an "Export PDF" for compliance reports. But there's no decision provenance viewer — she can't browse, filter, or export the decision trail.
- **Gap:** **Decision provenance is the core differentiator in the PRD but has zero UI. This is the feature that justifies Caelith's existence over spreadsheets.**

**User Story 1.3: "KYC for Van der Berg Holding expired — I need to block all their pending transfers and flag them"**
- **Can Caelith do this?** The dashboard shows KYC Status Overview and the investor table shows "expired" + "124d overdue". But there's no action to bulk-block transfers for an expired investor. The rules engine checks KYC on new transfers (if kyc_required=true), but existing pending transfers aren't auto-flagged.
- **Gap:** **No proactive KYC expiry workflow. Caelith shows the problem but doesn't help resolve it.**

---

### Persona 2: Thomas — Fund Administrator at a Luxembourg Fund Admin Company
**Profile:** Services 12 AIFMs. Processes 50+ transfers/week. Needs efficiency and accuracy. Currently uses a combination of Excel + internal tool.

**User Story 2.1: "I need to process a batch of 8 secondary market transfers for RAIF Beta"**
- **Can Caelith do this?** There's a "Bulk Transfer" button on the Transfers page, which is promising. Individual transfers work with approval workflow (PENDING_APPROVAL → EXECUTED/REJECTED). But there's no way to scope the transfer list to a specific fund easily — the asset filter dropdown exists but requires clicking.
- **Gap:** **Bulk transfer UX needs work. No way to see which transfers belong to which fund at a glance — the "ASSET" column shows long names that are hard to scan.**

**User Story 2.2: "A new German Spezial-AIF client wants me to set up their fund with proper eligibility rules"**
- **Can Caelith do this?** Yes — create fund structure (Spezial-AIF, DE, AIFMD), then go to Rules → use templates or AI Rule Builder to configure rules. Eligibility criteria are pre-populated for German Spezial-AIF (€200K semi-professional minimum).
- **Strength:** **This workflow actually works well. Templates + AI Rule Builder is a genuine UX win.**

**User Story 2.3: "I need to generate the quarterly AIFMD Annex IV data for all my clients"**
- **Can Caelith do this?** No. The PRD lists this as P1 but there's no UI or visible endpoint for Annex IV export.
- **Gap:** **Annex IV reporting is a mandatory AIFMD obligation. Without it, Caelith can't claim to be an AIFMD compliance tool — it's a deal-breaker for fund admins.**

---

### Persona 3: Dr. Schneider — COO/CFO at a Small German AIFM (€80M AUM)
**Profile:** Wears many hats. Needs the tool to "just work" without deep configuration. Compliance is one of 10 things on his plate. Currently outsources to a lawyer + Excel.

**User Story 3.1: "I want to understand if my current investor base is compliant with KAGB requirements"**
- **Can Caelith do this?** He'd go to the Dashboard → see investor type allocation chart + KYC status overview. He can see 9 "Actions Required." But there's no "compliance health score" or simple pass/fail per fund. The dashboard shows data but doesn't synthesize it into a verdict.
- **Gap:** **No fund-level compliance status (green/yellow/red). The dashboard shows metrics but doesn't answer "Am I compliant?" which is the only question Dr. Schneider actually cares about.**

**User Story 3.2: "My lawyer says we need to update our minimum investment threshold from €200K to €250K. What's the impact?"**
- **Can Caelith do this?** Scenario modeling is listed as P1 in the PRD. There's no UI for it. The Copilot might be able to answer "What if we changed minimum investment to €250K?" but it would depend on the RAG pipeline having that capability.
- **Gap:** **Scenario modeling has no UI. This is a high-value feature that could be a demo-closer.**

**User Story 3.3: "I need to onboard a new semi-professional investor who wants to invest €250K in our Spezial-AIF"**
- **Can Caelith do this?** The onboarding page exists but is empty. The workflow (apply → eligibility check → approve → allocate) is in the backend but there's no demo data and the UX isn't tested.
- **Gap:** **Onboarding is the primary entry point for new business and it's essentially a skeleton.**

---

### Persona 4: Claire — Legal Counsel at a Pan-European Fund Platform
**Profile:** Reviews transfer restriction logic for LPA compliance. Needs to understand exactly what rules are enforced and why. Advises on regulatory interpretation.

**User Story 4.1: "I need to verify that the transfer restriction rules for this SIF match the LPA terms"**
- **Can Caelith do this?** She can go to Rules → select the SIF asset → see the active rules. The Visual Builder shows rule logic. Each rule has source references (regulatory citations). This is actually decent.
- **Strength:** **Rule transparency with source citations is valuable for legal review.**

**User Story 4.2: "An investor disputes a rejected transfer. Show me the exact regulatory basis for the rejection."**
- **Can Caelith do this?** The transfer shows "PENDING_APPROVAL" or "REJECTED" but there's no way to click into a rejection and see the decision record with per-rule breakdown + regulatory citations. The backend stores this (decision_records), but no UI surfaces it.
- **Gap:** **This is literally the "decision provenance" feature — Caelith's core differentiator — and it has no user interface.**

**User Story 4.3: "The AIFMD 2.0 deadline is April 16, 2026. I need to verify our rules comply with the new directive."**
- **Can Caelith do this?** The Copilot can answer regulatory Q&A with citations to AIFMD text (RAG). But there's no "compliance gap analysis" that compares current rules against AIFMD 2.0 requirements and flags what needs updating.
- **Gap:** **Regulatory change management is missing. With AIFMD 2.0 deadline 2 months away, this is time-sensitive.**

---

### Persona 5: Alex — CTO at a Fund Admin Platform Evaluating Caelith's API
**Profile:** Evaluating whether to embed Caelith's compliance engine into their existing platform via API. Cares about reliability, documentation, and integration ease.

**User Story 5.1: "I need to evaluate the API for programmatic eligibility checks"**
- **Can Caelith do this?** POST /eligibility/check exists and works. Swagger/OpenAPI docs are built. Auth is JWT-based. The API is well-structured.
- **Strength:** **API design is solid. Clean routes, proper error handling, OpenAPI spec.**

**User Story 5.2: "I want to run automated transfer validations for 1000+ transfers per day"**
- **Can Caelith do this?** The rules engine is deterministic and unit-tested. PRD specifies <100ms p99 for validation. But there's no rate limiting configuration visible for API-key-based access (it's JWT only), and API key management is listed as P2/not built.
- **Gap:** **No API key auth for platform integrations. JWT-only is a blocker for server-to-server.**

**User Story 5.3: "I need webhook notifications when transfers are approved/rejected"**
- **Can Caelith do this?** Webhooks are built (migration 005, HMAC-SHA256 signed). Backend has webhook-routes.ts.
- **Strength:** **Webhooks with HMAC signing is production-ready infrastructure.**

---

## PART 3: VERDICT — WHAT'S USEFUL vs. WHAT'S NOT

### ✅ Genuinely Useful (Delivers Real Value Today)
1. **Rules engine** — Deterministic, tested, versioned. The core is solid.
2. **Fund structure modeling** — Correct legal forms, jurisdictions, regulatory frameworks.
3. **Investor registry with AIFMD classification** — 5-tier system matches real-world needs.
4. **AI Rule Builder + templates** — Fastest path to configured compliance rules.
5. **Transfer validation + approval workflow** — Core transaction loop works.
6. **KYC tracking with expiry monitoring** — Dashboard shows the problem clearly.
7. **Compliance Copilot** — Context-aware, RAG-backed, properly disclaimed. Good wedge feature.
8. **PDF compliance reports** — Fund detail page with export.
9. **Webhook infrastructure** — Production-grade event notifications.

### ⚠️ Partially Useful (Built But Incomplete)
1. **Dashboard** — Shows data but doesn't synthesize it into compliance verdicts.
2. **Onboarding** — Skeleton exists, no demo data, workflow untested in UI.
3. **Eligibility criteria** — Pre-populated in DB, shown on fund detail, but no one-click check from investor profile.
4. **Decision records** — Backend stores them, zero UI to view/browse/export.

### ❌ Not Useful Yet (Missing or Broken)
1. **Activity/Audit trail page** — 404.
2. **Alerts page** — 404.
3. **Scenario modeling** — Not built.
4. **Annex IV reporting** — Not built. Regulatory obligation.
5. **Decision provenance viewer** — Core differentiator with no UI.
6. **Regulatory change management** — Not built. AIFMD 2.0 deadline is April 2026.

---

## PART 4: DESIGN THINKING — WHAT TO WORK ON NEXT

### Priority Matrix (Impact × Effort)

**🔴 High Impact, Low-Medium Effort (DO FIRST)**

1. **Decision Provenance Viewer** — Build a page that lets you click any transfer → see the full decision record with per-rule pass/fail, regulatory citations, and rule version snapshot. This is Caelith's entire value proposition. Without it, you're selling a prettier spreadsheet.

2. **One-Click Eligibility Check** — On each investor's profile, add a "Check Eligibility" button that runs the eligibility check against a selected fund. Show pass/fail with specific reasons. The backend endpoint exists (POST /eligibility/check). This is the #1 compliance officer workflow.

3. **Fund Compliance Score** — On each fund card AND the dashboard, show a simple green/yellow/red compliance status. "All investors eligible ✅" or "3 investors have expired KYC ⚠️ | 1 investor below minimum threshold 🔴". Synthesize the data into a verdict.

**🟠 High Impact, Medium Effort (DO SECOND)**

4. **Fix Activity/Audit + Alerts pages** — (Already being tackled by Codex.) Dead nav items destroy trust in demos.

5. **Scenario Modeling UI** — "What if I change minimum investment from €125K to €150K?" → show affected investors, blocked transfers, % impact. The query logic is in the PRD. This is a demo-closer for sales calls.

6. **Onboarding Flow with Demo Data** — Seed 5+ onboarding applications in various states (applied, eligible, approved, allocated). Make the workflow testable.

**🔵 Medium Impact, Higher Effort (DO THIRD)**

7. **Annex IV Data Export** — Generate Article 24 reporting data. This is a regulatory obligation, not a nice-to-have. Start with JSON/CSV; PDF can come later.

8. **KYC Expiry Action Workflow** — When KYC expires: auto-flag investor, block new transfers, notify via webhook, create action item in dashboard queue. Currently Caelith shows the problem but doesn't help solve it.

9. **Regulatory Timeline / AIFMD 2.0 Countdown** — Show upcoming regulatory deadlines. With April 16, 2026 approaching, this is timely and creates urgency for prospects.

### UX Principles Going Forward

1. **Show verdicts, not just data.** Every page should answer a yes/no question. "Is this fund compliant?" "Is this investor eligible?" "Was this transfer legal?" Don't make the user do the synthesis.

2. **Every action should have a trail.** If a compliance officer clicks "Approve," they should immediately see the decision record created with their name, timestamp, and the exact rules that applied. This is the core loop.

3. **Reduce clicks to compliance answers.** The most common question ("Can investor X invest in fund Y?") should be answerable in 2 clicks maximum, not by cross-referencing 3 pages.

4. **Demo-first development.** Every new feature should come with seed data that makes the feature immediately impressive. Empty states kill demos.

---

*Report generated by Mate — 2026-02-16*
