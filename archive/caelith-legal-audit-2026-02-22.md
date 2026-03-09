# Caelith Platform — Comprehensive Legal Compliance Audit

**Date:** 22 February 2026  
**Auditor:** CLO / Chief Legal Officer (Automated Audit)  
**Scope:** All regulatory/legal logic in the Caelith codebase  
**Regulations Covered:** AIFMD II (Directive 2024/927), KAGB, ELTIF 2.0 (Reg 2023/606), ESMA Annex IV, GwG, MiFID II, AMLR

---

## 1. Executive Summary

### Overall Compliance Grade: **B-**

Caelith demonstrates a **solid foundation** with correct implementation of core eligibility checks, investor categorization, LMT enforcement, and Annex IV reporting. However, there are **several legally incorrect thresholds, missing requirements, and gaps** that would cause issues under regulatory scrutiny.

**Strengths:**
- Well-structured decision provenance / audit trail for every validation
- Correct KAGB §1(19)(33) semi-professional threshold (€200,000)
- ELTIF 2.0 retail minimum correctly set to €0 after fix migration
- LMT enforcement with lockup, notice period, redemption gate, settlement cycle
- Annex IV report covers all 5 required sections with correct Article 24 threshold logic
- AIFMD II readiness assessment covers all 6 key areas with correct legal citations
- Immutable decision records (migration 029)

**Critical Issues Found:**
- 3 legally incorrect thresholds/values (P0)
- 5 missing regulatory requirements (P1)
- 7 enhancements recommended (P2)

---

## 2. Rule-by-Rule Audit Table

### 2.1 Rules Engine (`src/rules-engine/validator.ts`)

| # | Rule | Regulation | Implementation | Status | Notes |
|---|------|-----------|----------------|--------|-------|
| 1 | `checkNotSelfTransfer` | General civil law | Transfer to self blocked | ✅ Correct | — |
| 2 | `checkPositiveUnits` | General civil law | Units > 0 required | ✅ Correct | — |
| 3 | `checkSufficientUnits` | General civil law | Sender must have enough units | ✅ Correct | — |
| 4 | `checkQualification` | MiFID II / KAGB | Uses `accredited` boolean field | ⚠️ Incomplete | "Accredited" is a US concept (Reg D). Should be `professional` per MiFID II Annex II. The field name is misleading, though the logic works if `accredited` maps to qualified/professional status. |
| 5 | `checkLockup` | Fund rules / LMT | Days since acquisition vs lockup_days | ✅ Correct | Uses execution_date correctly, not current date |
| 6 | `checkJurisdiction` | AIFMD marketing passport / KAGB §§293-306 | Whitelist-based jurisdiction check | ✅ Correct | — |
| 7 | `checkTransferWhitelist` | Fund rules (PPM) | Investor-specific whitelist | ✅ Correct | — |
| 8 | `checkInvestorTypeWhitelist` | KAGB §1(6), AIFMD Art. 4 | Investor type must be in allowed list | ✅ Correct | — |
| 9 | `checkMinimumInvestment` | Various (per fund) | Compares `transfer.units` to minimum | ❌ **WRONG** | Compares raw **units** (share count) to `minimum_investment`. But in the eligibility helper, `minimum_investment` is stored in **cents**. This rule compares apples to oranges. See P0-1 below. |
| 10 | `checkKycRequired` | GwG §10, AMLD 5/6 | KYC must be 'verified' and not expired | ✅ Correct | — |
| 11 | `checkMaximumInvestors` | Fund rules / KAGB §1(6) | Investor count cap enforced | ✅ Correct | Correctly handles existing investors |
| 12 | `checkConcentrationLimit` | AIFMD risk management / ESMA guidelines | Percentage of total units check | ✅ Correct | — |
| 13 | `checkLeverageCompliance` | AIFMD Art. 25 / AIFMD II Art. 17 | Commitment + gross method checks | ✅ Correct | Checks both methods, fails if either exceeds limit |
| 14 | `checkLmtFundSuspension` | AIFMD II Art. 16(2b) | Blocks all transfers if fund suspended | ✅ Correct | — |
| 15 | `checkLmtRedemptionGate` | AIFMD II Art. 16(2b) | Blocks transfers when gate active | ⚠️ Overly broad | This blocks ALL transfers when gate is active in the JSONB LMT data, but the transfer-service also has a separate % threshold-based gate check. Dual enforcement with different logic. |
| 16 | `checkLmtNoticePeriod` | AIFMD II Art. 16(2b) | Returns null (advisory only) | ✅ Correct | Notice periods are informational, not blocking |
| 17 | Composite rules | Custom | AND/OR/NOT evaluation of conditions | ✅ Correct | Supports nested conditions with field resolution |

### 2.2 Eligibility Check Helper (`src/backend/services/eligibility-check-helper.ts`)

| # | Rule | Regulation | Implementation | Status | Notes |
|---|------|-----------|----------------|--------|-------|
| 1 | Fund status check | General | Fund must be 'active' | ✅ Correct | — |
| 2 | Investor type eligibility | KAGB / AIFMD / ELTIF | Criteria lookup by fund + jurisdiction + type | ✅ Correct | Falls through to 'no criteria found' if not eligible |
| 3 | Minimum investment (cents) | Per criteria | Compares investment amount in cents to stored minimum | ✅ Correct | Correctly converts to cents |
| 4 | Professional suitability | MiFID II Annex II | Checks for classification evidence/method | ⚠️ Weak | Only checks for *presence* of evidence, not the substance. MiFID II Annex II requires: (a) large transactions ≥10/quarter, (b) portfolio > €500K, (c) professional experience. None of these quantitative tests are performed. |
| 5 | Semi-professional suitability | KAGB §1(19)(33) | Checks investment ≥ €200,000 | ✅ Correct | 20000000 cents = €200,000 ✓ |
| 6 | Retail ELTIF suitability | ELTIF 2.0 Art. 30 | Flags for manual review, does not auto-pass | ✅ Correct | Correctly requires manual review for 10% liquid asset allocation check |
| 7 | Risk tolerance check | MiFID II Art. 25 | Always passes with advisory message | ⚠️ Weak | Soft check only — should at minimum compare declared risk tolerance to fund risk profile |
| 8 | Classification evidence | MiFID II Annex II / Loi SIF Art. 2 | Checks for method/evidence/date on non-retail | ✅ Correct | — |
| 9 | KYC verified | GwG §10, AMLD 5/6 | Must be 'verified' | ✅ Correct | — |
| 10 | KYC not expired | GwG §10(1)(3) | Expiry date > now | ✅ Correct | — |

### 2.3 Transfer Service (`src/backend/services/transfer-service.ts`)

| # | Rule | Regulation | Implementation | Status | Notes |
|---|------|-----------|----------------|--------|-------|
| 1 | LMT Lockup Period | AIFMD II Art. 16 | Checks acquired_at + threshold days vs execution_date | ✅ Correct | Correctly uses execution_date, not current date |
| 2 | LMT Notice Period | AIFMD II Art. 16 | Checks days between now and execution_date vs required notice | ✅ Correct | — |
| 3 | LMT Redemption Gate | AIFMD II Art. 16 | 30-day rolling window, % of total units | ⚠️ Issues | (1) Uses `status IN ('pending_approval', 'executed')` — should exclude rejected. (2) 30-day hardcoded window may not match all fund terms. (3) Does not distinguish subscriptions from redemptions properly (only checks `from_investor_id IS NOT NULL`). |
| 4 | LMT Settlement Cycle | Fund rules | Informational only (always passes) | ✅ Correct | Advisory |
| 5 | Approval workflow | Internal governance | Large transfers + expiring KYC trigger approval | ✅ Correct | Default 10,000 units threshold, configurable via env |
| 6 | Atomic execution | Operational integrity | FOR UPDATE row locking, transactional | ✅ Correct | Prevents double-spending |
| 7 | Decision provenance | AIFMD II Art. 24(5) / MaRisk | Every validation creates immutable decision record | ✅ Correct | Excellent audit trail |

### 2.4 Annex IV Service (`src/backend/services/annex-iv-service.ts`)

| # | Section | ESMA Requirement | Implementation | Status | Notes |
|---|---------|-----------------|----------------|--------|-------|
| 1 | AIF Identification | Annex IV Section 1 | Name, national code, type, domicile, AIFM, LEI, currency | ✅ Correct | — |
| 2 | Reporting obligation | Art. 24(1)/(2)/(4) | AUM-based thresholds: <€100M/€100-500M/≥€500M | ⚠️ Partially correct | Thresholds are correct BUT: Art. 24(1) exemption requires *both* AUM <€100M *and* unleveraged + no redemption rights for 5 years. Code only checks AUM, not the closed-ended/unleveraged condition for the exemption. |
| 3 | Investor concentration | Annex IV Section 2 | By type, by domicile, top-5 concentration | ✅ Correct | — |
| 4 | Principal exposures | Annex IV Section 3 | Asset breakdown with % of total | ⚠️ Incomplete | Annex IV requires 5 principal markets + 5 principal instruments. Code reports all assets but doesn't map to ESMA's prescribed categories (e.g., "Securities - Equity", "Real Estate - Commercial"). |
| 5 | Leverage | AIFMD Art. 25 | Commitment + gross methods | ✅ Correct | — |
| 6 | Risk profile / Liquidity | Annex IV Section 4 | Liquidity buckets, LMTs, risk flags | ✅ Correct | Buckets match ESMA format |
| 7 | Geographic focus | Annex IV Section 5 | Array of region/pct | ⚠️ Incomplete | ESMA requires ISO 3166-1 country codes, not free-text region names. "Deutschland" and "Westeuropa (ex DE)" are not valid ESMA codes. |
| 8 | Counterparty risk | Annex IV | Top 5 with LEI and exposure_pct | ✅ Correct | — |
| 9 | Compliance status | Internal / Art. 24(5) | KYC coverage, eligible %, violations | ✅ Correct | Not strictly Annex IV, but valuable |
| 10 | XML output | ESMA technical standard | JSON only | ❌ **MISSING** | ESMA requires Annex IV in **XML format** per the published XSD schema. No XML generation exists. JSON is useful internally but cannot be submitted to NCA. |
| 11 | Reporting frequency | Art. 3(3)(d), 24 | Quarterly for large AIFMs, semi-annual for small | ⚠️ Missing | No scheduling or frequency determination logic |
| 12 | `eligible_investor_pct` | N/A | Counts professional/well_informed/institutional | ⚠️ Incomplete | Missing `semi_professional` from eligible types — semi-professionals ARE eligible investors under KAGB §1(6) |

### 2.5 AIFMD II Readiness Assessment (`src/backend/services/readiness-service.ts`)

| # | Question Key | Source Citation | Correct? | Notes |
|---|-------------|----------------|----------|-------|
| 1 | `del_register` | Art. 20(1) AIFMD II; §36 KAGB | ✅ Correct | — |
| 2 | `del_due_diligence` | Art. 20(2) AIFMD II | ✅ Correct | — |
| 3 | `del_eu_substance` | Art. 8(1)(e) AIFMD II | ✅ Correct | Key new requirement — 2 senior persons in EU |
| 4 | `del_subdelegation` | Art. 20(4)-(6) AIFMD II | ✅ Correct | — |
| 5 | `del_review_cycle` | Art. 20(3) AIFMD II | ✅ Correct | — |
| 6 | `lmt_selected` | Art. 16(2a)-(2d) AIFMD II | ✅ Correct | Minimum 2 LMTs for open-ended AIFs |
| 7 | `lmt_activation_rules` | Art. 16(2b) AIFMD II | ✅ Correct | — |
| 8 | `lmt_investor_communication` | Art. 16(2c) AIFMD II | ✅ Correct | — |
| 9 | `lmt_stress_testing` | Art. 16(1) AIFMD II | ✅ Correct | — |
| 10 | `rep_annex_iv` | Art. 24 AIFMD | ✅ Correct | — |
| 11 | `rep_bafin_annual` | Art. 22 AIFMD; §38 KAGB | ✅ Correct | — |
| 12 | `rep_data_quality` | Art. 24(5) AIFMD II | ✅ Correct | — |
| 13 | `rep_esma_readiness` | Art. 24 AIFMD II | ✅ Correct | RTS/ITS reference |
| 14 | `dis_cost_transparency` | Art. 23(1)(a)-(b) AIFMD II | ✅ Correct | Key new enhanced disclosure |
| 15 | `dis_precontractual` | Art. 23(1) AIFMD II | ✅ Correct | — |
| 16 | `dis_lmt_info` | Art. 23(1)(a) AIFMD II (new) | ✅ Correct | — |
| 17 | `dis_fund_structure` | Art. 23(1)(f) AIFMD II | ✅ Correct | — |
| 18 | `loan_applicable` | Art. 15a-15e AIFMD II (new) | ✅ Correct | — |
| 19 | `loan_retention` | Art. 15b(1) AIFMD II | ✅ Correct | 5% retention requirement |
| 20 | `loan_concentration` | Art. 15d AIFMD II | ✅ Correct | 20% borrower limit |
| 21 | `gov_gap_analysis` | Best Practice | ✅ Correct | — |
| 22 | `gov_project_team` | BaFin MaRisk AT 8.2 | ✅ Correct | — |
| 23 | `gov_regulatory_monitoring` | BaFin MaRisk AT 4.3.2 | ✅ Correct | — |
| 24 | `gov_kyc_current` | Art. 23(4) AIFMD II; §10 GwG | ✅ Correct | — |

**Readiness Assessment Verdict:** All 24 questions have **correct legal citations**. The question set covers the main AIFMD II areas comprehensively. Auto-check functions are appropriately conservative (status 'partial', not 'yes').

### 2.6 Seed Data / Eligibility Criteria Thresholds

| Fund | Investor Type | Stored Minimum | Correct Minimum | Regulation | Status |
|------|--------------|---------------|-----------------|------------|--------|
| LU SIF | institutional | €0 | €0 | CSSF Circular 15/633 | ✅ |
| LU SIF | professional | €0 | €0 | CSSF Circular 15/633 | ✅ |
| LU SIF | semi_professional | €125,000 | €125,000 | CSSF Circular 15/633 §4.2 | ✅ |
| LU SIF | well_informed | €125,000 | €125,000 | Loi SIF Art. 2 | ✅ |
| LU RAIF | semi_professional | €100,000 (post-fix) | €100,000 | Law 23 July 2016, Art. 2(1)(b)(i) | ✅ |
| ELTIF 2.0 | retail | €0 (post-fix) | €0 | Reg 2023/606, Recital 47 | ✅ |
| DE Spezial-AIF | semi_professional | €200,000 | €200,000 | KAGB §1(19)(33) | ✅ |
| DE Spezial-AIF | institutional | €0 | €0 | KAGB §1(6)(1) | ✅ |
| IE QIAIF | professional | €100,000 | €100,000 | CBI AIF Rulebook Ch. 2 | ✅ |
| IE RIAIF | retail | €0 | €0 | CBI AIF Rulebook Ch. 3 | ✅ |

**Seed data verdict:** All thresholds are **correct** after migration 014 fixes.

### 2.7 Delegation Service (`src/backend/services/delegation-service.ts`)

| # | Feature | Regulation | Implementation | Status | Notes |
|---|---------|-----------|----------------|--------|-------|
| 1 | Delegation register | Art. 20(1) AIFMD II | Full CRUD with delegate name, LEI, function, jurisdiction | ✅ Correct | — |
| 2 | Letterbox risk field | AIFMD II Art. 20(6) | `letterbox_risk` enum: low/medium/high | ⚠️ Weak | Stored as free text, no automated assessment logic. No check for: (a) ratio of delegated to retained functions, (b) whether core functions (risk mgmt, portfolio mgmt) are both delegated, (c) substance requirements (min 2 senior persons in EU). |
| 3 | Oversight frequency | Art. 20(3) AIFMD II | Field stored but not enforced | ⚠️ No enforcement | No alert/reminder when next_review_date passes |
| 4 | NCA notification | Art. 20(2) AIFMD II | Not implemented | ❌ Missing | AIFMD II requires NCA notification of delegation arrangements. No notification tracking. |
| 5 | Termination clause | Art. 20(1)(h) AIFMD | Field exists | ✅ Correct | — |

### 2.8 LMT Service (`src/backend/services/lmt-service.ts`)

| # | Feature | Regulation | Implementation | Status | Notes |
|---|---------|-----------|----------------|--------|-------|
| 1 | LMT CRUD | Art. 16(2a) AIFMD II | Full CRUD | ✅ Correct | — |
| 2 | Activate/deactivate | Art. 16(2b) AIFMD II | Status toggle | ✅ Correct | — |
| 3 | NCA notification | Art. 16(2c) AIFMD II | `nca_notified` field exists | ⚠️ No automation | Field tracked but no actual notification mechanism |
| 4 | Minimum 2 LMTs (open-ended) | Art. 16(2a) AIFMD II | Checked in readiness assessment only | ⚠️ Not enforced | Only advisory in readiness checklist. No hard validation preventing a fund from going active with <2 LMTs. |
| 5 | ESMA LMT taxonomy | ESMA RTS (Art. 16(2d)) | Free-text `lmt_type` | ⚠️ No enum | LMT types should be constrained to ESMA's prescribed list once RTS finalized |

---

## 3. Critical Gaps

### P0 — Legally Incorrect (Must Fix Immediately)

#### P0-1: Rules Engine `checkMinimumInvestment` Compares Units to Cents
**File:** `src/rules-engine/validator.ts`, line ~86  
**Issue:** `ctx.transfer.units < ctx.rules.minimum_investment` compares **share units** to what is stored as **cents** in `eligibility_criteria.minimum_investment`. If `minimum_investment` is 20,000,000 (€200K in cents), and a transfer is 500 units, the check would always fail — or if `rules.minimum_investment` is a different field in a different unit, the comparison is meaningless.  
**Impact:** Could incorrectly block or allow transfers.  
**Fix:** Either remove this rule (since eligibility-check-helper already handles minimum investment correctly in cents) or ensure both sides use the same unit (investment value = units × unit_price, in cents).

#### P0-2: ELTIF 2.0 Retail — 10% Liquid Asset Check Hardcoded as Always-Fail
**File:** `src/backend/services/eligibility-check-helper.ts`, line ~79  
**Issue:** The retail ELTIF suitability check (`suitability_retail_eltif`) is hardcoded to `passed: false` with `requiresManualReview: true`. This means **no retail investor can ever pass eligibility automatically**, which effectively blocks ELTIF 2.0 retail distribution entirely.  
**Regulation:** Art. 30(3) ELTIF 2.0 — the 10% limit applies only to investors with <€500K in financial instruments. Investors above €500K have no percentage cap.  
**Impact:** Over-blocking. Retail investors with >€500K liquid assets who should be auto-eligible are blocked.  
**Fix:** Add the €500K threshold logic: if investor's liquid financial assets ≥ €500,000, the 10% cap does not apply (Art. 30(3)(b) Reg 2023/606). Below that threshold, manual review is correct.

#### P0-3: Annex IV Missing XML Output Format
**File:** `src/backend/services/annex-iv-service.ts`  
**Issue:** ESMA requires Annex IV reports in **XML format** conforming to the published XSD schema. The service only generates JSON.  
**Regulation:** ESMA Annex IV Reporting Technical Standards, Art. 24(7) AIFMD  
**Impact:** Report cannot be submitted to any NCA (BaFin, CSSF, CBI) in its current form.  
**Fix:** Implement XML serialization matching the ESMA Annex IV XSD schema (AIFMD_Reporting_DataTypes.xsd).

### P1 — Missing Regulatory Requirements (Build Next)

#### P1-1: No AML/KYC Risk Scoring (GwG §10-15, upcoming AMLR)
**Issue:** KYC checks are binary (verified/not verified). No risk-based approach as required by GwG §10(2): customer risk classification (low/normal/high), PEP screening, sanctions screening, beneficial ownership identification.  
**Impact:** Non-compliant with GwG requirements. AMLR (July 2027) will further tighten these.

#### P1-2: No NCA Notification Mechanism for LMT Activation
**Regulation:** Art. 16(2c) AIFMD II  
**Issue:** When an LMT is activated, the competent authority must be notified "without undue delay." The `nca_notified` flag exists but no notification mechanism is implemented.

#### P1-3: No Minimum 2 LMT Hard Enforcement for Open-Ended AIFs
**Regulation:** Art. 16(2a) AIFMD II  
**Issue:** Open-ended AIFs must have at least 2 LMTs. This is checked in the readiness assessment but NOT enforced when creating/activating a fund structure.

#### P1-4: No Third-Country Delegation Enhanced Scrutiny
**Regulation:** Art. 20(6) AIFMD II  
**Issue:** Delegation to third-country (non-EU) entities requires enhanced oversight, NCA notification, and substance assessment. The delegation service has no logic to differentiate EU vs. third-country delegates.

#### P1-5: No Investor Suitability Data Model for ELTIF Retail
**Regulation:** Art. 30 ELTIF 2.0  
**Issue:** No fields exist to capture investor's total financial instrument portfolio value (needed for the €500K / 10% check). The suitability check requires data that isn't collected.

---

## 4. Recommendations (Prioritized)

| Priority | Item | Effort | Description |
|----------|------|--------|-------------|
| **P0-1** | Fix `checkMinimumInvestment` units mismatch | S | Remove from rules engine (redundant with eligibility helper) or convert to value-based comparison |
| **P0-2** | ELTIF retail suitability: add €500K threshold | M | Add `liquid_assets` field to investor model; implement Art. 30(3) bifurcated logic |
| **P0-3** | Annex IV XML output | L | Implement ESMA XSD-conformant XML serialization; consider using a library like `xmlbuilder2` |
| **P1-1** | AML risk scoring model | L | Add risk_score, pep_status, sanctions_check, beneficial_owner fields to investors |
| **P1-2** | NCA notification for LMT | M | Webhook or email notification when LMT activated; record timestamp |
| **P1-3** | Enforce min 2 LMTs on fund activation | S | Add validation in fund-structure update: if open-ended, require ≥2 active LMTs |
| **P1-4** | Third-country delegation logic | M | Add EU/non-EU flag on jurisdiction; enhanced checks for non-EU delegates |
| **P1-5** | Investor liquid assets field | M | Add `liquid_financial_assets` field for ELTIF Art. 30 suitability |
| **P2-1** | Annex IV asset categorization | M | Map assets to ESMA prescribed categories (equity, FI, RE, etc.) |
| **P2-2** | Annex IV geographic ISO codes | S | Convert free-text regions to ISO 3166-1 alpha-2 codes |
| **P2-3** | Letterbox entity risk calculator | M | Automated scoring based on delegation ratio, functions delegated, substance |
| **P2-4** | Delegation review date alerts | S | Cron job / notification when next_review_date is approaching |
| **P2-5** | Annex IV reporting frequency logic | S | Determine quarterly vs semi-annual based on AUM + Art. 24 thresholds |
| **P2-6** | SFDR classification integration | M | Connect Art. 6/8/9 classification (migration 033 exists) to eligibility and disclosure logic |
| **P2-7** | MiFID II quantitative professional tests | L | Implement the 3 MiFID II Annex II criteria for opt-up professional classification |

---

## 5. Missing Regulations — Not Yet Built

| Regulation | Requirement | Priority | Notes |
|-----------|-------------|----------|-------|
| **DORA** (Reg 2022/2554) | ICT risk management, third-party ICT provider oversight | P2 | Effective Jan 2025. Relevant for cloud/IT outsourcing aspects. |
| **SFDR** (Reg 2019/2088) | Sustainability risk integration, PAI reporting | P2 | Migration 033 adds classification field, but no disclosure/reporting logic |
| **EU Taxonomy** (Reg 2020/852) | Taxonomy alignment disclosure for Art. 8/9 funds | P2 | No implementation |
| **PRIIPs / KID** | Key Information Document for retail-facing products | P1 | Required for ELTIF retail distribution — no KID generation |
| **CRD VI / CRR III** | Capital requirements (if applicable to AIFM) | P2 | Indirect relevance |
| **AMLR** (Reg, July 2027) | Harmonized EU AML regulation replacing directives | P1 | Current KYC binary model insufficient; need risk-based approach, AMLA supervision readiness |
| **eWpG** (DE Electronic Securities Act) | Crypto-securities / tokenized fund units | P2 | No support for on-chain transfer validation |
| **KAGB §293-306** | Marketing passport requirements / Reverse solicitation | P1 | No marketing passport validation in transfer or onboarding |
| **CSRD** | Corporate Sustainability Reporting Directive | P2 | May affect AIFM-level reporting |

---

## 6. Architecture & Design Observations

### Positive
1. **Dual validation layer**: Rules engine (pure, stateless) + eligibility helper (database-backed) = defense in depth
2. **Decision provenance**: Every validation creates an immutable record with full input snapshot — excellent for regulatory audit
3. **Atomic transfers**: FOR UPDATE locking prevents race conditions
4. **Conservative auto-checks**: Readiness assessment auto-population never sets 'yes', always 'partial' with `needsVerification`
5. **Tenant isolation**: RLS policies on all regulatory tables

### Concerns
1. **Dual LMT data models**: LMTs exist both as JSONB in `fund_structures.lmt_types` (used by rules engine) AND as rows in `fund_lmts` table (used by transfer service LMT validation). These can go out of sync.
2. **No versioning on eligibility criteria**: The `superseded_at` field exists but there's no logic to enforce temporal validity or maintain version history.
3. **Hardcoded redemption frequency**: Annex IV reports hardcode `investor_redemption_frequency: 'Quarterly'` — should be per-fund.

---

## 7. Conclusion

Caelith's compliance engine is **substantially correct** in its core regulatory logic and demonstrates strong engineering practices (provenance, atomicity, audit trails). The AIFMD II readiness assessment is particularly well-done with accurate legal citations.

The three P0 issues (units-vs-cents mismatch, ELTIF retail over-blocking, missing XML output) require **immediate remediation** before any production or pilot deployment. The P1 items (AML risk scoring, NCA notifications, marketing passport) should be addressed within the next development cycle.

**Overall: Production-ready for professional/institutional investor flows. NOT production-ready for retail distribution (ELTIF) or regulatory submissions (Annex IV XML) without the P0 fixes.**

---

*This audit was conducted on 22 February 2026 based on source code analysis. It does not constitute legal advice. All findings should be reviewed by qualified legal counsel before implementation decisions are made.*
