# NGI Zero Commons Fund — Proposal Analysis & Strategy

## Key Facts (Verified 24 Feb 2026)

- **Deadline:** April 1, 2026 12:00 CEST (noon) — 36 days
- **Amount:** €5,000 - €50,000 (first proposal max €50K; can scale to €500K lifetime)
- **Payment:** Milestone-based (NOT upfront). You define milestones, get paid when you deliver.
- **Duration:** Flexible, but must fit within programme end (June 2027)
- **Apply at:** https://nlnet.nl/propose/
- **Application:** Lightweight web form — NOT a 50-page document
- **Review:** 3-5 months from deadline, two-stage (score-based then strategic)
- **Who can apply:** Anyone. No company needed. No university needed. Individuals OK.
- **GenAI disclosure:** Must log all AI-assisted writing (prompts, dates, unedited output)
- **WCAG compliance:** Required for all software deliverables (accessibility)

## The Critical Open Source Requirement

**"All scientific outcomes must be published as open access, and any software and hardware must be published under a recognised open source license in its entirety."**

BUT — from the FAQ:
> "If the part you want to develop and release as free and open source is relevant and is not itself dependent on your (or other) proprietary technology, sure. We look at what you research and develop inside the project you propose, not to anything else."

**Translation:** You can keep Caelith's dashboard proprietary. The project you propose must be a STANDALONE open-source component that works independently.

## Open-Core Strategy: What to Open Source

### The Component: `annex-iv-tools` (working name)

An open-source library/toolkit for ESMA Annex IV regulatory reporting:

1. **Annex IV XML Generator** — TypeScript/Node.js library that takes structured fund data and produces valid ESMA Annex IV XML
2. **Annex IV XML Validator** — Validates XML against ESMA XSD schema (rev 6 + future rev 7)
3. **ESMA XSD Schema Tooling** — Parsers, documentation, human-readable field descriptions
4. **Multi-NCA Filing Documentation** — How to file with BaFin, CSSF, CNMV, AMF, CBI etc.
5. **Annex IV Data Models** — TypeScript types/interfaces for all Annex IV report types (24_1, 24_2, 24_2_4, 24_4)

### Why This Works as Open Source

- **Standalone:** Library with its own npm package, no dependency on Caelith dashboard
- **Public benefit:** Any fund manager, consultant, or tool can use it
- **Standards-based:** Implements ESMA's public XML schema
- **European dimension:** Serves EU regulatory infrastructure
- **Commons model:** Regulatory reporting schemas are public goods that shouldn't be locked in proprietary tools

### What Stays Proprietary (Caelith Dashboard)

- UI/UX, multi-tenant architecture, user management
- Compliance copilot (AI)
- Fund management, investor tracking, KYC
- AIFMD II readiness assessment
- All business logic beyond Annex IV generation

## Scoring Criteria (30/40/30)

### Technical Excellence (30%)
- Implementing ESMA's complex XSD schema correctly
- Multi-report type support (24_1, 24_2, 24_2_4, 24_4)
- Validation engine with human-readable error messages
- TypeScript for type safety in financial data
- Automated testing against ESMA schemas

### Relevance/Impact/Strategic Potential (40%) — THE BIG ONE
- **EU regulatory compliance** = directly supports European digital sovereignty
- **SME enablement** = small fund managers currently locked out by €15-50K managed services
- **Open standards** = implements and documents ESMA's public reporting schema
- **AIFMD II preparation** = April 2027 deadline creates urgency across 27 EU countries
- **No existing open-source alternative** = genuine gap in the commons
- **Interoperability** = any tool can integrate, not locked to one vendor

### Cost Effectiveness (30%)
- Solo developer, no overhead
- Deliverables are concrete and measurable (validated XML, test suites, documentation)
- €30-40K for 6-8 months of milestone-based work

## Proposed Milestones

| # | Milestone | Deliverable | Amount |
|---|-----------|-------------|--------|
| 1 | Core XML Generator | TypeScript library generating valid Annex IV XML for report type 24_1 | €8,000 |
| 2 | Full Report Coverage | Support for 24_2, 24_2_4, and 24_4 report types | €8,000 |
| 3 | Validation Engine | XSD schema validation with human-readable error messages in EN/DE | €6,000 |
| 4 | Multi-NCA Documentation | Filing guides for BaFin, CSSF, CNMV, AMF, CBI (5 NCAs) | €4,000 |
| 5 | AIFMD II Schema Preparation | Support for new Annex IV 2.0 schema (when ESMA publishes ITS) | €6,000 |
| 6 | Test Suite & CI | Comprehensive test suite, CI pipeline, npm package publishing | €4,000 |
| 7 | Security Audit Prep | Code review, dependency audit, WCAG compliance for any web interfaces | €4,000 |

**Total: €40,000**

## Benefits to Caelith (Why This is High-ROI)

1. **€40K cash** for work you'd do anyway (Annex IV is your core product wedge)
2. **Credibility** — "NGI Zero funded" is a trust signal for KVG prospects
3. **Visibility** — Listed on NLnet's project page, part of NGI ecosystem
4. **Security audit** — NLnet may fund an independent security audit (free!)
5. **Network** — Access to NLnet's community of 300+ funded projects
6. **Open-core moat** — The library draws users → some convert to paid Caelith dashboard
7. **Standards positioning** — Become the reference implementation for Annex IV XML
8. **Scale-up potential** — If successful, can apply for additional €50-450K in future rounds

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Open-sourcing core IP | The XML generator is a commodity — the value is in the dashboard/UX/AI. Open-sourcing it attracts users, doesn't lose competitive advantage. |
| Milestone payment delays | Budget conservatively; milestones should be achievable in 4-6 week chunks |
| ESMA delays new schema | Milestone 5 is contingent; can pivot to deeper documentation or tooling |
| GenAI disclosure required | Must log all AI assistance. Write proposal yourself, use AI only for research/editing. |
| WCAG compliance | Any web interface (docs site, demo) must be accessible. Use semantic HTML. |
