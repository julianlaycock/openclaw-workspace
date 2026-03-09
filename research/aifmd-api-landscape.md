# AIFMD API Landscape — Market Research (March 2026)

## Key Finding: No AIFMD-Focused API Exists in Europe

No public, commercial, or institutional API exists for AIFMD compliance data, regulatory reporting, or Annex IV filing. Caelith is building the first one.

## What ESMA Provides (Free, Public)
- **ESMA Registers Portal** — web-only, CAPTCHA-protected, no AIFMD data
- **esma_data_py** (GitHub) — Python scraping tool for registers, does NOT cover AIFMD
- **FIRDS** — instrument reference data (MiFID II), bulk XML downloads only
- **EU Open Data Portal** — REST + SPARQL, no AIFMD datasets

## Competitors (All Closed Platforms, No APIs)
- **AQMetrics** (Ireland) — full AIFMD reporting platform, enterprise SaaS, no API
- **FundApps** (London) — launched Annex IV reporting Oct 2025, workflow-based, no API
- **Datox.ai** — AI compliance reporting (Form PF + AIFMD), hedge fund focused, no API
- **DataTracks Glacier** — XML conversion tool only, no intelligence
- **anevis solutions** — managed service, enterprise, no self-service API
- **FinregE** — AI regulatory obligations mapping, not filing
- **fund-xp.lu** — content/guides only

## NCA Portals (All Manual Web Upload, Zero APIs)
- BaFin MVP Portal, CSSF eDesk, AFM Portal, FMA, Finanstilsynet (Altinn)

## Free Data Sources We Integrate
- GLEIF (LEI data) ✅ integrated
- OpenSanctions (sanctions + PEP) ✅ integrated
- EU Sanctions XML ✅ integrated
- Transparenzregister API (German UBO) — accreditation submitted Feb 28
- EUR-Lex SPARQL — planned
- BORIS (EU-wide UBO) — launching July 2026

## Strategic Implication
Caelith's 60+ API endpoints = the first AIFMD compliance API in Europe. Competition is locked platforms. ESMA's ITS for standardized AIFMD II templates arriving April 2027 will create new API demand. We're 12 months ahead.

---
*Last updated: March 1, 2026*
