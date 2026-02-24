# Caelith Legal Reference Audit — 2026-02-19

## CRITICAL — Fix Before Any Demo or Outreach

### 1. KAGB §1 Abs. 19 Nr. 33 — Semi-professional minimum is €200,000 NOT €20,000,000
**Files**: `scripts/seed-german-kvg-demo.ts` lines 124-138
**What it says**: `min: 20000000` (€20M) for semi_professional investors
**What it should say**: `min: 200000` (€200,000)
**Why**: KAGB §1 Abs. 19 Nr. 33 defines semi-professional investors as those investing ≥€200,000 (not €20M). €20M is institutional-level. This is a **factor-of-100 error** that would immediately destroy credibility with any German KVG compliance officer.
**Also affects**: Lines 131-132, 136-137 (same file, all three funds)

### 2. KAGB §225 reference in landing page — wrong section
**File**: `src/frontend/src/app/api/landing/route.ts`
**What it says**: "KAGB §225" (appears in both EN and DE landing pages)
**Issue**: KAGB §225 relates to **Bewertung** (valuation of assets in open-ended funds), NOT minimum investment thresholds or investor eligibility. If this is cited in context of investor eligibility rules, it's the wrong section. The correct section for semi-professional investor thresholds is **§1 Abs. 19 Nr. 33 KAGB**. For Spezial-AIF investor requirements, it's **§1 Abs. 6 KAGB**.
**Action**: Verify the exact context in the landing page HTML and correct the reference.

### 3. AMLD "Art 14(5)" — wrong directive reference
**File**: `src/backend/services/decision-explain-service.ts` line 73
**What it says**: `'AMLD Art 14(5) - ongoing monitoring and periodic review'`
**What it should say**: `'AMLD5 Art 14(5) (Directive (EU) 2018/843 amending Directive (EU) 2015/849) - ongoing monitoring'`
**Why**: "AMLD" is ambiguous — there are 6 AML directives. Art 14(5) refers to **Directive (EU) 2015/849** (AMLD4) as amended by AMLD5. The upcoming replacement is **AMLR (Regulation (EU) 2024/1624)** which applies from July 2027. Simply saying "AMLD" doesn't tell a compliance officer which directive you mean.

### 4. "AMLD 4/5/6" grouping is misleading
**Files**: `decision-explain-service.ts` lines 69, 113; `compliance-copilot-service.ts` (copilot system prompt)
**What it says**: `'AMLD 4/5/6'`
**Issue**: AMLD6 (Directive (EU) 2024/1640) hasn't been transposed yet (deadline July 2027). Citing it as current legal basis is premature. The **current** AML framework is AMLD4 (2015/849) as amended by AMLD5 (2018/843). AMLD6 + AMLR replace them from July 2027.
**Should say**: `'AMLD4/5 (Directive 2015/849 as amended by Directive 2018/843)'` — or if you want to be forward-looking, clearly separate current vs upcoming.

### 5. Annex IV — Article 24 reporting thresholds may be inverted
**File**: `src/backend/services/annex-iv-service.ts` lines 296-298
**What it says**:
```
totalUnits > 500000000 ? 'Article 24(2)' :
totalUnits > 100000000 ? 'Article 24(1)' : 'Article 24(4)';
```
**Issue**: The code uses `totalUnits` (unit count) as a proxy for AUM, but AIFMR Article 24 thresholds are about **AUM in euros**, not unit counts. Also:
- Art 24(1): Standard reporting for all AIFMs above threshold
- Art 24(2): Enhanced reporting for AIFs >€500M AUM (leveraged) or >€1.5B (unleveraged)
- Art 24(4): Simplified reporting for smaller AIFs
The logic direction seems correct, but using unit count instead of actual AUM is conceptually wrong and could produce incorrect reporting obligations.

---

## MODERATE — Imprecise but Not Technically Wrong

### 6. AIFMD Art 4(1)(ag-aj) — investor categorization
**File**: `decision-explain-service.ts` lines 57, 109
**What it says**: `'AIFMD Art 4(1)(ag-aj)'`
**Issue**: Art 4(1) of AIFMD contains definitions. The investor categorization definitions are at point (ag) "professional investor" and (aj) is not a standard citation. The exact lettering depends on the consolidated version. This is close enough but should be double-checked against the consolidated AIFMD text. Consider citing the MiFID II definition directly (Annex II of MiFID II, Directive 2014/65/EU) since AIFMD defers to MiFID for professional investor definition.

### 7. AIFMD Art 12(1)(d) and (e) — verify sub-paragraphs
**File**: `decision-explain-service.ts` lines 53, 69
**Issue**: Art 12(1) AIFMD covers general operating conditions. The sub-paragraph lettering (d), (e) should be verified against the consolidated text. These are plausible but the exact content at each letter varies by consolidated version.

### 8. AIFMD II Art 15(4-5) — leverage reporting
**File**: `decision-explain-service.ts` line 125
**What it says**: `'AIFMD II Art 15(4-5), ESMA Leverage Guidelines'`
**Issue**: AIFMD II (Directive 2024/927) amends AIFMD. The new leverage provisions are primarily in amended Articles 15-16. "Art 15(4-5)" is plausible for the new leverage reporting requirements but should be verified against the final published text of 2024/927.

### 9. ESMA Guidelines 2014/937 — risk diversification
**File**: `decision-explain-service.ts` line 121
**What it says**: `'ESMA Guidelines 2014/937'`
**Issue**: The ESMA reference "2014/937" should be verified. ESMA guidelines are typically referenced as ESMA/2014/937 or similar format. This appears to reference ESMA's Guidelines on reporting obligations under AIFMD, not specifically risk diversification. The risk diversification basis for AIFMD is primarily Art 14-15, not a specific ESMA guideline numbered 2014/937.

### 10. SIF Law minimum — €125K vs actual
**File**: `decision-explain-service.ts` line 61
**What it says**: `'LU SIF Law Art 2 (€125K well-informed investor)'`
**Issue**: The Luxembourg SIF Law (13 Feb 2007) Art 2 sets the minimum investment for well-informed investors at **€125,000** (correct). However, this has been a point of discussion and some SIFs have different minimums in their docs. The reference itself is correct.

### 11. CBI SI 257/2013 — Irish qualifying investor
**File**: `decision-explain-service.ts` line 61
**What it says**: `'CBI SI 257/2013 (€100K qualifying investor)'`
**Issue**: The Central Bank of Ireland's qualifying investor threshold is **€100,000** — this is correct. The SI reference should be verified (it may be the AIF Rulebook rather than a specific SI number).

### 12. ELTIF Art 30 vs 30a distinction
**File**: `scripts/seed-demo.ts` lines 292-296
**What it says**: Professional/institutional/semi-pro cite Art 30, retail cites Art 30a
**Issue**: Under ELTIF 2.0 (Regulation 2023/606), Art 30 covers marketing to retail investors and investor protection. Art 30a (new under ELTIF 2.0) covers the suitability assessment. The distinction between Art 30 for non-retail and Art 30a for retail is conceptually close but the exact article scope should be verified.

### 13. MiFID II Art 16(6)-(7) — record-keeping
**File**: `decision-explain-service.ts` line 77
**Issue**: MiFID II Art 16 covers organizational requirements. Paragraphs 6-7 relate to record-keeping. This is broadly correct for record-keeping obligations, though the primary AIFMD record-keeping provision is Art 22 (as also cited). The MiFID II reference is supplementary.

---

## LOW — Style / Naming Convention

### 14. "AIFMD II" naming
**Throughout codebase**
**Issue**: The industry uses both "AIFMD II" and "AIFMD 2" informally. The formal name is **Directive (EU) 2024/927**. "AIFMD II" is widely understood but technically informal. No action needed — this is standard industry shorthand.

### 15. § symbol missing in some KAGB references
**File**: `scripts/seed-german-kvg-demo.ts`
**Issue**: Some lines show `KAGB 1(19)` instead of `§1 Abs. 19 KAGB` or `KAGB §1(19)`. The encoding also breaks the § symbol in some places (shows as garbled text). This is likely a UTF-8 encoding issue in the seed script.
**Action**: Ensure all KAGB references use proper § symbol and standard German legal citation format: `§ 1 Abs. 19 Nr. 33 KAGB`.

### 16. "Loi SIF" vs "SIF Law" — mixed language
**File**: `src/backend/services/compliance-service.ts` line 133
**What it says**: `'Loi SIF Art 2'`
**Issue**: Mixing French ("Loi") with English context. Use either "SIF Law" (English) or "Loi du 13 février 2007" (French formal). Minor.

---

## CORRECT — Verified Clean

- ✅ **AIFMD transposition deadline**: "16. April" (2026) — correct per Directive 2024/927 Art 2(1)
- ✅ **ELTIF 2.0 regulation number**: (EU) 2023/606 amending (EU) 2015/760 — correct
- ✅ **AIFMD original directive**: 2011/61/EU — correct
- ✅ **RAIF Law date**: 23 Jul 2016 — correct (Loi du 23 juillet 2016)
- ✅ **SIF Law date**: 13 Feb 2007 — correct (Loi du 13 février 2007)
- ✅ **KAGB §1 Abs. 6** for institutional investors — correct
- ✅ **KAGB §1 Abs. 19 Nr. 32** for professional investors — correct
- ✅ **AIFMD Art 35-37** for marketing passport — correct
- ✅ **AIFMD Art 22** for record-keeping — correct
- ✅ **AIFMD Art 25** for leverage — correct
- ✅ **SFDR reference** (2019/2088) in copilot — correct
- ✅ **UCITS Directive** (2009/65/EC) — correct
- ✅ **Fund legal forms** (SICAV, SIF, RAIF, SCSp, SCA, ELTIF, Spezial_AIF, etc.) — all valid
- ✅ **Regulatory framework values** (AIFMD, UCITS, ELTIF, national) — appropriate

---

## Priority Actions

1. **IMMEDIATE**: Fix KAGB semi-professional minimum from €20M → €200K in seed-german-kvg-demo.ts (Critical #1)
2. **IMMEDIATE**: Verify and fix KAGB §225 reference in landing page (Critical #2)
3. **BEFORE NEXT DEMO**: Fix "AMLD" references to specify which directive (Critical #3, #4)
4. **BEFORE NEXT DEMO**: Fix Annex IV AUM vs unit count logic (Critical #5)
5. **BEFORE LAUNCH**: Clean up § symbol encoding in seed scripts (Low #15)
6. **NICE TO HAVE**: Verify all sub-article references against consolidated texts (Moderate #6-13)
