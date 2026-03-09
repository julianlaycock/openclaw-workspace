# Competitive Intelligence: anevis solutions GmbH

**Last Updated:** 2026-02-27
**Source:** Public website (anevis-solutions.com), careers page, customer references

---

## Company Overview

- **Full Name:** anevis solutions GmbH
- **HQ:** Würzburg, Germany (Friedrich-Bergius-Ring 15, 97076 Würzburg)
- **Founded:** ~2014 (moved to first office at Eichendorffstraße 14b with 10 employees)
- **Current Size:** ~20+ employees (had 20 by August 2018, likely grown since)
- **CEO/Founder:** Johannes Hauptmann
- **Structure:** Bootstrapped / angel-backed (Business Angel listed on About page, no known VC rounds)
- **Parent/Affiliate:** "Anecon" listed as related entity on website

---

## Product Suite

anevis is a **full-service financial reporting SaaS** — much broader than just AIFMD. Their suites:

### Marketing Suite
- Fund Factsheets
- Website Widgets
- Institutional Reportings
- Sales Presentations
- ESG Reporting
- Live Hosting for Documents
- AI Video (newer addition)

### Regulatory Suite
- **KIDs for PRIIPs** (MiFID II)
- FIDLEG BIB (Swiss regulation)
- EPT, CEPT & EMT
- SFDR Reporting
- PAI and EET Reporting
- **AIFMD / Annex IV Reporting** ← direct competitor feature
- Solvency II / TPT

### Risk & Compliance Suite
- Transaction Cost Calculation
- Market Conformity Check & Best Execution
- Valuation Pricing Service
- Risk Management Service

### Data Management Suite
- Data Warehouse
- Data Validation on Demand
- Interface Services
- AI-driven Data Applications

**Key Takeaway:** AIFMD Annex IV is ONE of ~15+ report types they offer. It's not their core focus — it's a feature within a broad reporting platform. Their AIFMD page describes it as a "managed service" — they handle data ingestion and transformation for you.

---

## AIFMD / Annex IV Positioning

From their AIFMD page:
- Positioned as a **managed service** with integrated risk calculations
- Emphasizes complexity of Annex IV (fragmented data, specialist expertise needed)
- "Takes this complexity off your shoulders" — service-oriented, not self-serve
- **No mention of API access or self-service tooling**
- **No mention of AIFMD II specifically** (may not have updated for new directive yet — worth verifying)

---

## Known Customers (from References page)

All large, established financial institutions:

1. **Quintet Private Bank** (Luxembourg) — private & institutional clients, owned by Precision Capital, formerly KBL European Private Bankers
2. **DJE Kapital AG** (Germany) — €13B+ AUM, 45+ years history, one of the leading independent financial service providers in DACH
3. **Bantleon Bank AG** (Germany/Switzerland) — asset management and banking

**Pattern:** Their ICP is large banks and asset managers with significant AUM. Not small/mid-size AIFMs.

---

## Pricing

- **No public pricing on website** — enterprise/custom pricing model
- Likely high-touch sales process given their managed service positioning
- Estimated: €20,000–100,000+ annually based on scope (industry standard for comparable managed reporting services)
- **No free tier, no freemium, no self-serve signup**

---

## Hiring Activity

- Careers page exists but content was not fully loadable
- Company grew from 10 to 20 employees between 2014-2018
- Active careers page suggests continued hiring
- **Limitation:** Couldn't access specific job listings without Brave Search API; recommend checking LinkedIn directly

---

## Strengths (What They Do Well)

1. **Breadth:** Covers nearly every EU regulatory reporting requirement in one platform
2. **Track Record:** 10+ years in market, established client base with major banks
3. **Full Service:** Managed service model means clients can fully outsource
4. **Domain Expertise:** Deep in financial reporting — factsheets, PRIIPs, SFDR, ESG
5. **Data Infrastructure:** Built-in data warehouse and validation capabilities

---

## Weaknesses & Caelith's Advantages

| Weakness | Caelith Advantage |
|----------|-------------------|
| **No public API** — managed service, not self-serve | API-first architecture, full REST API, OpenAPI spec |
| **No open-source presence** — closed ecosystem | open-annex-iv on npm, MIT licensed |
| **Enterprise-only ICP** — not accessible to small AIFMs | Starts at €990/mo, self-serve onboarding |
| **Generalist** — AIFMD is 1 of 15 products | Specialist — deep on AIFMD II end-to-end |
| **No AIFMD II specific messaging** (as of Feb 2026) | Built specifically for AIFMD II from day one |
| **Managed service = slow onboarding** (likely weeks/months) | Self-serve, operational in days |
| **No developer ecosystem** | SDKs, API docs, open-source community |
| **Legacy architecture** (document engine, data warehouse) | Modern stack (Next.js, REST API, cloud-native) |
| **No sanctions screening integration** visible | Built-in fuzzy-match sanctions screening |
| **German-centric** — website primarily DE/EN, HQ Würzburg | Pan-European positioning from day one |

---

## Strategic Implications for Finch Demo

1. **Don't trash anevis** — Finch may have portfolio companies using them. Position as "different segment, different architecture."
2. **Emphasize API-first** — Finch is a fintech VC. They understand the value of APIs vs. managed services. This is your biggest differentiator.
3. **Highlight AIFMD II specificity** — anevis hasn't visibly updated for AIFMD II. You're purpose-built for it.
4. **Open-source = developer moat** — This resonates with fintech VCs. Anevis has zero open-source presence.
5. **Speed to value** — anevis onboarding takes weeks/months. Caelith: sign up → first Annex IV in minutes.
6. **Market validation** — anevis existing with 20+ employees and major bank clients *validates the market*. You're not creating demand; you're modernizing supply.

---

## Research Limitations

- Brave Search API not configured, so couldn't search for:
  - LinkedIn activity / recent posts
  - Review sites (G2, Capterra)
  - Press releases
  - Forum discussions
- Recommend Julian manually check:
  - [anevis LinkedIn](https://www.linkedin.com/company/anevis-solutions/) for recent posts and employee count
  - G2/Capterra for any reviews
  - XING (German market) for hiring signals
