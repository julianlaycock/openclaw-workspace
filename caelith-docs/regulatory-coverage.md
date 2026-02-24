# Caelith Regulatory Coverage Matrix

*Last updated: 2026-02-22T18:55 CET (Legal Audit — 4 iterations — Grade A-)*

## AIFMD II Coverage

| Article | Requirement | Status | Notes |
|---------|------------|--------|-------|
| Art. 4 | Investor classification | ✅ Implemented | KAGB: institutional, professional, semi-professional, retail |
| Art. 8(1)(e) | EU substance (2 senior persons) | ✅ Implemented | Checked on fund activation |
| Art. 15a-d | Loan-originating AIFs | ❌ Not implemented | — |
| Art. 16(2b) | LMT minimum (2 tools, open-ended) | ✅ Implemented | Hard block on activation, soft warn on creation |
| Art. 16(2d) | LMT NCA notification | ⚠️ Partial | Flag exists, no actual notification workflow |
| Art. 20 | Delegation oversight | ✅ Implemented | Third-country flagging, letterbox risk, sub-delegation tracking |
| Art. 21(5) | Depositary passport | ⚠️ Partial | Depositary info in Annex IV XML; no cross-border validation |
| Art. 24 | Annex IV reporting | ✅ | EUR AUM (€150M/€280M/€75M), ESMA XSD structure, depositary (name+LEI+jurisdiction), SubAssetType codes, Art. 24(1)/(2)/(4) EUR thresholds |
| Art. 36a | ELTIF requirements | ⚠️ Partial | Basic framework, no retail exemption calculator |

## KAGB Coverage

| Section | Requirement | Status |
|---------|------------|--------|
| §1 Abs. 6 | Institutional investor definition | ✅ |
| §1 Abs. 19 Nr. 32 | Professional investor (MiFID II) | ✅ |
| §1 Abs. 19 Nr. 33 | Semi-professional investor (€200K min) | ✅ Fixed |
| §36 | Delegation register | ✅ |
| §98 | Fund suspension rules | ⚠️ LMT type available |

## ESMA Technical Standards

| Standard | Status | Notes |
|----------|--------|-------|
| Annex IV XML Schema | ✅ Mostly compliant | AIFReportingInfo→AIFMRecordInfo→AIFRecordInfo hierarchy; SubAssetType fixed |
| Frequency codes (Q/H/Y) | ✅ | Mapped from reporting obligation |
| PredominantAIFType | ✅ | Strategy-based mapping (PEQF/HFND/REST/OTHR) |
| Geographic ISO codes | ✅ | toISOCountryCode() mapping in XML export |
| LEI validation | ⚠️ | Stored but not validated against GLEIF |

## Audit & Compliance Infrastructure

| Feature | Status |
|---------|--------|
| SHA-256 hash chain | ✅ Verified (23 records, valid=true) |
| Decision record immutability | ✅ |
| Audit trail with user/IP/timestamp | ✅ |
| Evidence bundle generation | ✅ |
| Compliance report generation | ✅ |
| Sanctions screening | ⚠️ Mock only |

## Known Gaps

1. **Loan-originating AIF rules** (Art. 15a-d) — not implemented
2. **Depositary passport** (Art. 21(5)) — not implemented
3. **NAV/GAV EUR scaling** — fixed: asset breakdown now scaled when total_aum_eur is set (pending restart)
4. **ESMA SubAssetType classification** — fixed: Fund share classes map to SEC_LEQ_IFIN (pending restart); fund-level codes set (PEQF_VENT, INFR_INFR, REST_COMM)
5. **NCA notification workflow** — flag exists but no transmission
6. **SFDR PAI indicators** — classification stored, no taxonomy checks
7. **Cross-border marketing passport** — not implemented
8. **Four-eyes principle** — not enforced on decisions
9. **Real sanctions screening** — requires OpenSanctions API key
10. **GLEIF LEI validation** — LEIs stored but not verified
