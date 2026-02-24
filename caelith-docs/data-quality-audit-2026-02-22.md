# Data Quality Audit Report — Caelith Platform

**Date:** 2026-02-22  
**Grade: A-**

---

## Summary

Audited 11 fund structures, 26 investors, and all holdings/assets relationships.

## Checks Performed

### 1. Fund Domicile / Legal Form Consistency ✅ PASS
All fund domicile–legal form combinations are valid:
- Luxembourg: SIF, RAIF, ELTIF ✅
- Ireland: QIAIF ✅
- Germany: Spezial_AIF ✅
- Templates correctly match their domiciles ✅

### 2. AIFM LEI Format ✅ PASS
All AIFM LEIs are correctly 20 characters. Retail investors without LEIs correctly have null.

### 3. Investor LEI Format ✅ PASS
All 11 institutional/professional investors with LEIs have exactly 20-character LEIs. Retail and semi-professional investors correctly have no LEI.

### 4. KYC Expiry Dates ✅ PASS
All 26 verified investors have future KYC expiry dates. No inconsistencies found.

### 5. Date Consistency ✅ PASS
No investor was onboarded before their fund's inception date.

### 6. Holdings vs AUM ⚠️ FIXED
| Fund | Holdings | Target | Ratio | Status |
|---|---|---|---|---|
| Meridian SIF Alpha | €308M | ~~€50M~~ → €350M | 88% | **Fixed** |
| Evergreen RAIF Beta | €90M | €100M | 90% | ✅ OK |
| Atlantic QIAIF Gamma | €155M | ~~€75M~~ → €175M | 89% | **Fixed** |
| Horizon ELTIF 2.0 Delta | €105M | €200M | 53% | ✅ OK (still fundraising) |
| Berlin Immobilien Spezial-AIF I | €0M | €75M | 0% | ✅ OK (newly launched, no assets seeded) |

**Fix:** Updated `target_size` for Meridian SIF Alpha (€50M→€350M) and Atlantic QIAIF Gamma (€75M→€175M) to reflect realistic AUM ratios. Updated both in DB and seed script.

### 7. Investor Classification Consistency ✅ PASS
- Institutional investors (CalPERS, Allianz, Norges Bank, etc.) all have LEIs ✅
- Retail investors have no LEIs ✅
- Semi-professional investors correctly classified ✅

### 8. Investor Jurisdiction Diversity ✅ PASS
26 investors across 14 jurisdictions (DE, FR, LU, IE, US, GB, CH, JP, SG, NO, HK, NL, PL, CN, IT, SE, GR) — realistic international fund structure.

## Remaining Notes
- Berlin Immobilien fund has no assets or holdings. This is intentional — it's a newly created German KVG fund template that hasn't been populated with seed holdings yet.
- Template funds (6 total) correctly have no target_size or inception_date.
