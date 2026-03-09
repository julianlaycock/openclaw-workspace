# Strategic Vision: Proprietary XSD Validation Toolkit

**Date:** 2026-02-24
**Status:** Planned — revisit March 10, 2026
**Decision:** Build as proprietary Caelith infrastructure. Do NOT open-source.

## The Thesis

A generic toolkit for validating ANY ESMA/EBA/EIOPA XML reporting format against XSD schemas. This is Caelith's competitive moat.

## Why Proprietary (Not Open-Source / Not Grant-Funded)

1. **The validator itself is commodity** — checking XML against XSD is technically straightforward
2. **The value is the layer on top:**
   - Knowing WHICH schemas matter and keeping them updated across 27 NCAs
   - Mapping business logic of what each field means
   - Pre-filling from Caelith's data model
   - Human-readable error messages (not raw XSD validation errors)
   - Auto-remediation suggestions
   - Multi-NCA format support (BaFin, CSSF, AMF, CNMV, etc.)
3. **If open-sourced, someone forks it and adds the same business logic layer → funded our own competitor**
4. **€50K grant wouldn't cover the full build anyway**

## Competitive Positioning

- anevis (main competitor) charges €15-50K/yr as managed service
- Caelith can offer self-service XSD validation + filing at €990-2,500/filing
- No open-source alternative exists for EU regulatory XML validation
- This is the "last mile" that makes Caelith indispensable

## Scope (When We Build It)

- Generic XSD validation engine (any ESMA schema)
- AIFMD Annex IV (Rev 6 v1.2) — first target
- AIFMD II extensions (when ESMA publishes ITS)
- UCITS reporting schemas
- SFDR/taxonomy reporting schemas
- EBA COREP/FINREP (stretch — different market)

## Revenue Model

- Per-filing validation: €250-500/filing
- Bundled with Caelith dashboard subscription
- API access for fund admins: usage-based pricing

## Timeline

- Revisit: March 10, 2026
- ESMA ITS for AIFMD II expected: H2 2026
- New Annex IV reporting effective: April 2027
- Build window: Q3-Q4 2026

## Related

- Open-source open-annex-iv (npm) = the FREE wedge that drives inbound
- Proprietary XSD validation = the PAID moat that retains customers
- NGI Zero proposal #1 (open-annex-iv) funds the wedge
- NGI Zero proposal #2 (Open ESMA Register API) builds credibility + data layer
