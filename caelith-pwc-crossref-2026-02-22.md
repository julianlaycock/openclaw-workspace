# Caelith × PwC AIFMD II Cross-Reference Audit

**Date:** 2026-02-22  
**Source:** PwC — "AIFMD II: Was jetzt auf KVGs zukommt"  
**Assessed against:** Caelith codebase (`caelith-project/src/backend/`)  
**Deadline:** 16 April 2026 (FoMaStG national transposition)  
**Days remaining:** ~53

---

## Executive Summary

| PwC Topic | Status | Coverage |
|---|---|---|
| 1. Cross-border Depositary | ⚠️ Partial | No depositary model; delegation has jurisdiction tracking |
| 2. Delegation & Transparency | ⚠️ Partial | Good foundation, missing AIFMD II substance requirements |
| 3. Liquidity Management Tools | ✅ Strong | Full LMT lifecycle + enforcement at transfer level |
| 4. Loan-Originating AIFs | ❌ Not implemented | Only readiness questions exist |
| 5. Reporting & Transparency | ⚠️ Partial | Annex IV strong; disclosure module missing |
| 6. Implementation Steps | ✅ Implemented | Readiness assessment covers PwC's recommended steps |
| 7. Timeline | ✅ Implemented | Readiness service computes `daysUntilDeadline` from 2026-04-16 |

**Overall readiness: ~60%** — strong on LMTs and reporting, gaps in depositary, loan origination, and enhanced disclosures.

---

## 1. Grenzüberschreitende Verwahrung (Cross-border Depositary)

### Status: ⚠️ Partially implemented

**What exists:**
- `delegation-service.ts` → `FundDelegation` model tracks delegates with `jurisdiction`, `delegate_lei`, and `function_delegated`
- `addThirdCountryWarnings()` flags non-EEA jurisdictions with Art. 20 warnings
- Third-country delegation detection via `isEEADomicile()` utility

**What's missing:**
- ❌ No dedicated **depositary/custodian entity model** — depositary is not a first-class concept
- ❌ No "Depositary Passport light" workflow (NCA approval, cross-border depositary eligibility check)
- ❌ No validation that a domestic custodian is unavailable (AIFMD II precondition for cross-border depositary)
- ❌ No depositary fields on `fund_structures` table (depositary_name, depositary_lei, depositary_jurisdiction, depositary_type)

**Files involved:**
- `src/backend/services/delegation-service.ts` — could be extended but wrong abstraction (depositary ≠ delegation)

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Add depositary fields to fund_structures | P0 | Required for German KVG pilot — BaFin expects depositary data |
| Depositary entity model + CRUD | P1 | Full model with NCA approval workflow |
| Cross-border depositary eligibility check | P2 | Only needed if KVG clients use cross-border depositary |

---

## 2. Delegation — More Responsibility & Transparency

### Status: ⚠️ Partially implemented

**What exists:**
- `delegation-service.ts` → Full CRUD for `FundDelegation` records
  - `delegate_name`, `delegate_lei`, `function_delegated`, `jurisdiction`
  - `oversight_frequency`, `last_review_date`, `next_review_date` — review cycles ✅
  - `letterbox_risk` assessment field ✅
  - `termination_clause` tracking ✅
  - Third-country warnings with Art. 20 reference ✅
- `readiness-service.ts` → Delegation questions cover:
  - `del_register` — outsourcing register (Art. 20(1) AIFMD II)
  - `del_due_diligence` — due diligence processes (Art. 20(2))
  - `del_eu_substance` — 2 senior EU-resident persons (Art. 8(1)(e))
  - `del_subdelegation` — sub-delegation transparency (Art. 20(4)-(6))
  - `del_review_cycle` — review cycles (Art. 20(3))

**What's missing:**
- ❌ No **sub-delegation chain model** — `fund_delegations` is flat, no parent-child relationship for sub-delegations
- ❌ No **senior persons tracking** — the "minimum 2 EU-resident senior persons" requirement has a readiness question but no data model to store/validate this
- ❌ No **due diligence documentation** attachment/evidence model (selection criteria, evaluation records)
- ❌ No **NCA reporting export** for delegation registers
- ⚠️ `oversight_frequency` and `next_review_date` exist but no **automated review reminders** or overdue alerts

**Files involved:**
- `src/backend/services/delegation-service.ts` — `FundDelegation` interface, CRUD functions
- `src/backend/services/readiness-service.ts` — `READINESS_QUESTIONS` delegation category

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Sub-delegation chain (parent_delegation_id) | P0 | NCA can demand sub-delegation insight anytime |
| Senior persons model (min 2 EU-resident) | P0 | Art. 8(1)(e) substance requirement — hard enforcement |
| Review overdue alerts/notifications | P1 | Operational quality for production |
| Due diligence evidence attachments | P1 | Audit trail for delegation partner selection |
| NCA delegation register export | P2 | On-demand NCA reporting |

---

## 3. Liquidity Management Tools (LMTs)

### Status: ✅ Strongly implemented

**What exists:**
- `lmt-service.ts` → Full LMT lifecycle:
  - `createLmt()`, `updateLmt()`, `deleteLmt()` — CRUD per fund ✅
  - `activateLmt()`, `deactivateLmt()` — status management ✅
  - `nca_notified`, `nca_notified_at` fields — NCA notification tracking ✅
  - `activation_threshold`, `activation_policy` — when/how to activate ✅
- `transfer-service.ts` → `runLmtValidation()` **enforces LMTs at transfer time**:
  - Lockup period enforcement (checks holding `acquired_at` vs threshold) ✅
  - Notice period enforcement (days before execution date) ✅
  - Redemption gate enforcement (aggregate redemptions vs gate threshold %) ✅
  - Settlement cycle tracking ✅
- `fund-structure-routes.ts` → **Blocks fund activation without 2 LMTs** for open-ended funds (Art. 16(2b)) ✅
- `readiness-service.ts` → LMT questions:
  - `lmt_selected` — auto-checks LMT count ✅
  - `lmt_activation_rules` — activation thresholds
  - `lmt_investor_communication` — investor/NCA communication
  - `lmt_stress_testing` — stress testing
- `annex-iv-service.ts` → LMTs included in Annex IV XML export ✅

**What's missing:**
- ⚠️ No **swing pricing** or **anti-dilution levy** calculation engine — these LMT types can be configured but the system doesn't compute adjusted NAV/price
- ⚠️ No **side pocket** mechanism — no ability to segregate illiquid assets into a separate vehicle
- ⚠️ `nca_notified` field exists but no **automated NCA notification workflow** (email/API to BaFin)
- ⚠️ No **investor notification system** when LMTs are activated
- ⚠️ No formal **Liquiditätskonzept** document generation (stress scenario modeling)

**Files involved:**
- `src/backend/services/lmt-service.ts` — `FundLmt` model, CRUD + activate/deactivate
- `src/backend/services/transfer-service.ts` — `runLmtValidation()` (lines ~350-450)
- `src/backend/routes/fund-structure-routes.ts` — 2-LMT activation gate
- `src/backend/services/readiness-service.ts` — liquidity category questions
- `src/backend/services/annex-iv-service.ts` — LMT reporting in Annex IV

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Investor notification on LMT activation | P0 | Art. 16(2c) — mandatory communication |
| NCA notification workflow (not just flag) | P1 | BaFin expects structured notification |
| Swing pricing / anti-dilution calculation | P1 | Common LMT for German open-ended AIFs |
| Side pocket mechanism | P2 | Complex; rare for German KVGs at pilot |
| Stress test / Liquiditätskonzept generator | P2 | Important but can start with manual process |

---

## 4. Kreditvergebende AIFs (Loan-Originating AIFs)

### Status: ❌ Not implemented (readiness questions only)

**What exists:**
- `readiness-service.ts` → Loan origination questions:
  - `loan_applicable` — "Do your AIFs originate loans?" (with N/A skip logic) ✅
  - `loan_retention` — 5% skin-in-the-game (Art. 15b(1)) ✅
  - `loan_concentration` — 20% single borrower limit (Art. 15d) ✅
  - `dependsOn` logic skips loan questions if not applicable ✅

**What's missing:**
- ❌ No **loan entity model** (borrower, loan amount, term, repayment schedule)
- ❌ No **concentration limit enforcement** (20% per borrower computed against fund NAV)
- ❌ No **retention requirement tracking** (5% of each loan retained in fund)
- ❌ No **repayment-during-term enforcement**
- ❌ No loan-originating AIF fund type classification

**Files involved:**
- `src/backend/services/readiness-service.ts` — `loan_origination` category (questions only)

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Loan entity model + CRUD | P1 | Only if pilot KVGs originate loans |
| 20% concentration limit engine | P1 | Hard regulatory limit |
| 5% retention tracking | P1 | Mandatory for loan-originating AIFs |
| Fund type: loan-originating classification | P1 | Needed before any loan features |
| Repayment schedule tracking | P2 | Operational detail |

> **Note:** If no pilot KVG originates loans, this entire block is P2. The readiness assessment correctly handles this via the `loan_applicable` → N/A skip pattern. Confirm with pilot clients.

---

## 5. Reporting & Transparency

### Status: ⚠️ Partially implemented

**What exists:**
- `annex-iv-service.ts` → **Comprehensive Annex IV report generator**:
  - AIF identification with reporting obligation determination (Art. 24(1)/(2)/(4)) ✅
  - Investor concentration (by type, domicile, top-5 beneficial owners) ✅
  - Principal exposures / asset breakdown ✅
  - Leverage (commitment + gross method with compliance check) ✅
  - Risk profile (liquidity buckets, LMTs, operational risk flags) ✅
  - Geographic focus + counterparty risk ✅
  - Compliance status (KYC coverage, eligible investor %, violations) ✅
  - AUM-based threshold determination for reporting frequency ✅
- `annex-iv-routes.ts` → **ESMA-aligned XML export**:
  - Full XML serializer following ESMA AIFMD Reporting Technical Standards structure ✅
  - Proper ESMA element naming (`AIFReportingInfo` → `AIFMRecordInfo` → `AIFRecordInfo`) ✅
  - EEA flag, member state mapping, ESMA asset type codes ✅
  - Downloadable XML with proper filename/headers ✅
- `readiness-service.ts` → Reporting + disclosure questions:
  - `rep_annex_iv` — auto-checked against fund data ✅
  - `rep_data_quality` — data responsibilities
  - `rep_esma_readiness` — new ESMA ITS/RTS preparation
  - `dis_cost_transparency` — fee/cost disclosure (Art. 23(1)(a)-(b))
  - `dis_precontractual` — pre-contractual information
  - `dis_lmt_info` — LMT disclosure to investors
  - `dis_fund_structure` — full fund structure disclosure

**What's missing:**
- ❌ No **cost/fee disclosure module** — no data model for management fees, performance fees, transaction costs broken down by recipient
- ❌ No **pre-contractual document generation** — readiness question exists but no document template/export
- ❌ No **investor-facing LMT disclosure** — LMTs are tracked internally but no investor portal/report
- ❌ No **fund structure diagram/disclosure** for complex vehicles (master-feeder, SPVs)
- ⚠️ Annex IV XML not yet validated against official ESMA XSD — structure is aligned but needs formal validation
- ⚠️ No **ESMA new RTS/ITS format** support (expected April 2027 — future concern)
- ⚠️ `fund-structure-routes.ts` has full CRUD but no **public disclosure endpoint** for fund structure transparency

**Files involved:**
- `src/backend/services/annex-iv-service.ts` — `generateAnnexIVReport()` (305 lines)
- `src/backend/routes/annex-iv-routes.ts` — JSON + XML endpoints, `serializeAnnexIVToXml()`
- `src/backend/routes/fund-structure-routes.ts` — CRUD only, no disclosure
- `src/backend/services/readiness-service.ts` — reporting + disclosure categories

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Cost/fee disclosure data model | P0 | Art. 23(1)(a)-(b) — mandatory enhanced disclosure |
| Investor-facing LMT disclosure report | P0 | Art. 23(1)(a) new — investors must know available LMTs |
| Pre-contractual document template | P1 | Required but can start with manual process |
| ESMA XSD validation for Annex IV XML | P1 | Needed before first BaFin submission |
| Fund structure public disclosure endpoint | P1 | Complex vehicle transparency |
| New ESMA RTS/ITS format | P2 | Not finalized until April 2027 |

---

## 6. PwC's Recommended Steps for KVGs

### Status: ✅ Implemented via Readiness Assessment

**What exists:**
- `readiness-service.ts` → Complete readiness assessment framework:
  - **Step 1 (Gap analysis):** `gov_gap_analysis` question with auto-check ✅
  - **Step 2 (Project plan):** `gov_project_team` question ✅
  - **Step 3 (Implementation):** Delegation, LMT, and reporting categories map to implementation areas ✅
  - **Step 4 (Monitor):** `gov_regulatory_monitoring` with auto-check for Caelith Calendar ✅
  - **Score computation:** Weighted scoring by category with `daysUntilDeadline` countdown ✅
  - **Auto-population:** Platform data auto-fills answers (LMT count, KYC status, fund presence) ✅
  - **N/A handling:** Loan origination questions auto-skip if not applicable ✅
  - **Bilingual:** All questions in DE + EN ✅
  - **Legal references:** Every question cites specific AIFMD II article ✅

**What's missing:**
- ⚠️ No **project management features** (task assignment, Gantt chart, milestone tracking)
- ⚠️ No **progress notification system** (alerts when readiness score drops or deadline approaches)

### Gap Priority

| Gap | Priority | Rationale |
|---|---|---|
| Deadline approach notifications | P1 | Proactive alerting for KVG compliance teams |
| Project tracking integration | P2 | KVGs have their own PM tools |

---

## 7. Timeline

### Status: ✅ Implemented

- `readiness-service.ts` → `computeScore()` calculates `daysUntilDeadline` from hardcoded `2026-04-16` ✅
- All readiness questions reference correct legal sources and deadlines ✅
- `rep_esma_readiness` question notes April 2027 RTS/ITS timeline ✅

---

## Implementation Plan

### P0 — Required for Pilot (before April 2026)

| # | Item | Effort | Files to Change |
|---|---|---|---|
| P0-1 | **Depositary fields on fund_structures** — add `depositary_name`, `depositary_lei`, `depositary_jurisdiction` columns | 1 day | DB migration, `fund-structure-routes.ts`, fund-structure-repository |
| P0-2 | **Sub-delegation chain** — add `parent_delegation_id` to `fund_delegations`, update service | 1 day | DB migration, `delegation-service.ts` |
| P0-3 | **Senior persons model** — new `fund_senior_persons` table (name, role, eu_resident, start_date) with min-2 validation | 2 days | New migration, new service, new route |
| P0-4 | **Investor LMT activation notification** — event-driven notification when LMT status changes | 2 days | `lmt-service.ts` (emit event), new notification service |
| P0-5 | **Cost/fee disclosure model** — `fund_fee_schedules` table (fee_type, recipient, rate, description) | 2 days | New migration, new service + routes |
| P0-6 | **Investor LMT disclosure endpoint** — public-facing API returning LMT config per fund | 1 day | New route under `/api/disclosure/` |

**Total P0: ~9 days**

### P1 — Required for Production

| # | Item | Effort |
|---|---|---|
| P1-1 | NCA notification workflow for LMT activations | 3 days |
| P1-2 | Swing pricing / anti-dilution levy calculation | 5 days |
| P1-3 | ESMA XSD validation for Annex IV XML | 2 days |
| P1-4 | Pre-contractual document template generation | 3 days |
| P1-5 | Fund structure public disclosure endpoint | 1 day |
| P1-6 | Due diligence evidence attachments for delegations | 2 days |
| P1-7 | Review overdue alerts for delegation agreements | 1 day |
| P1-8 | Loan-originating AIF module (if needed by clients) | 5-8 days |
| P1-9 | Deadline approach notifications in readiness service | 1 day |

**Total P1: ~21-24 days**

### P2 — Future / Nice-to-Have

| # | Item | Effort |
|---|---|---|
| P2-1 | Cross-border depositary eligibility workflow | 3 days |
| P2-2 | Side pocket mechanism | 5 days |
| P2-3 | Liquiditätskonzept / stress test generator | 5 days |
| P2-4 | New ESMA RTS/ITS format (April 2027) | TBD |
| P2-5 | NCA delegation register export | 2 days |
| P2-6 | Project management / milestone tracking | 5 days |

---

## Conclusion

Caelith has **strong foundations** in the three most critical AIFMD II areas for German KVGs:
1. **LMT enforcement** is production-ready with transfer-level validation
2. **Annex IV reporting** is comprehensive with ESMA-aligned XML export  
3. **Readiness assessment** covers all PwC-identified topics with auto-population

The **9-day P0 sprint** should close the most critical gaps before the April 2026 deadline. The loan origination module can be deferred if pilot KVGs don't originate loans (confirm with clients).

**Recommendation:** Start P0 sprint immediately. Schedule P1 items for March 2026.
