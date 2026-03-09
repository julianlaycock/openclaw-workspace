# NGI Zero Commons Fund — Proposal Draft v1

**Submit at:** https://nlnet.nl/propose/
**Select:** NGI0 Commons Fund
**Deadline:** April 1, 2026 12:00 CEST

---

## Form Fields

### Thematic call
NGI0 Commons Fund

### Contact information
- **Name:** Julian Laycock
- **Email:** julian.laycock@caelith.tech
- **Phone:** [Julian to fill]
- **Organisation:** Caelith (individual/pre-incorporation)
- **Country:** Germany

---

### Proposal name

**Open Annex IV — Open-source AIFMD regulatory reporting toolkit for EU fund managers**

---

### Website / wiki

https://github.com/caelith-tech/open-annex-iv *(Julian: create this repo)*

---

### Abstract: Can you explain the whole project and its expected outcome(s).

Every alternative investment fund manager (AIFM) in the European Union is required to file Annex IV reports to their national regulator under Article 24 of the Alternative Investment Fund Managers Directive (AIFMD). This affects over 4,000 registered AIFMs across 27 EU member states. The reports contain detailed information about fund structure, investor concentration, leverage, risk profiles, and liquidity — submitted as XML files conforming to ESMA's technical schema.

Today, generating valid Annex IV XML is either done manually (error-prone, hours of work per filing), outsourced to expensive managed services (€15,000-50,000/year), or handled by proprietary enterprise software inaccessible to smaller fund managers. There is no open-source tool that generates, validates, or helps understand ESMA's Annex IV XML schema. The schema itself is publicly available, but the tooling to work with it is entirely proprietary.

This is about to get harder. AIFMD II (Directive 2024/927) introduces significant changes to Annex IV reporting, with new obligations applying from April 2027. ESMA will publish updated technical standards and XML schemas. When that happens, every AIFM in Europe will need to update their reporting — and the current fragmented, proprietary landscape means many small and mid-sized managers will struggle.

**Open Annex IV** is a standalone, open-source TypeScript toolkit that:

1. **Generates** valid ESMA Annex IV XML from structured fund data, covering all report types (Article 24(1), 24(2), and 24(4))
2. **Validates** generated XML against ESMA's XSD schema, producing human-readable error messages in English and German
3. **Documents** the filing process for each national competent authority (BaFin, CSSF, CNMV, AMF, CBI — covering the 5 largest AIFM jurisdictions)
4. **Provides** typed data models (TypeScript interfaces) for all Annex IV fields, making it easy for any developer to build compliant reporting tools
5. **Prepares** for the AIFMD II schema changes by tracking ESMA's updated technical standards and implementing them as soon as they're published

The toolkit will be published as an npm package under the Apache 2.0 license. It will have no dependency on any proprietary software. Any fund manager, compliance consultant, fund administrator, or competing software vendor can use it freely.

**Expected outcomes:**
- A production-quality npm package (`@open-annex-iv/core`) with full test coverage
- XSD schema validation with clear, actionable error messages
- Filing documentation for 5 EU jurisdictions
- Comprehensive developer documentation and integration guides
- A reference implementation that any compliance tool can build upon

This directly serves the NGI vision of a trustworthy, open internet ecosystem: regulatory compliance infrastructure should not be a proprietary gatekeeping mechanism. When the tools to meet regulatory obligations are open and accessible, smaller market participants can compete on equal footing — strengthening the European economy and reducing systemic concentration risk.

---

### Have you been involved with projects or organisations relevant to this project before? And if so, can you tell us a bit about your contributions?

I am the developer of Caelith, an AIFMD II compliance platform for EU fund managers. Over the past three months, I have built a working implementation of Annex IV XML generation, AIFMD II readiness assessment, compliance monitoring, and regulatory reporting. This involved deep engagement with ESMA's technical schemas, the AIFMD directive text, and the practical realities of regulatory filing across multiple EU jurisdictions.

Through this work, I discovered that no open-source Annex IV tooling exists anywhere — not on npm, PyPI, GitHub, or GitLab. Every fund manager or compliance tool developer working with ESMA's XML schema is reinventing the same wheel in isolation. This project extracts and generalises my existing Annex IV implementation into a standalone, vendor-neutral toolkit.

I have professional experience in full-stack software development with TypeScript, Node.js, and PostgreSQL. I am currently enrolling at HWR Berlin (Hochschule für Wirtschaft und Recht) for SS2026, combining regulatory technology research with computer science.

---

### Requested Amount (in Euro)

**40,000**

---

### Explain what the requested budget will be used for? Does the project have other funding sources, both past and present?

**Budget breakdown by milestone:**

| Milestone | Description | Hours | Rate | Amount |
|-----------|-------------|-------|------|--------|
| M1: Core XML Generator | TypeScript library generating valid Annex IV XML for Article 24(1) reports. npm package structure, build pipeline, basic documentation. | 80h | €100/h | €8,000 |
| M2: Full Report Coverage | Support for Article 24(2), 24(2)(4) and 24(4) report types. Complete field coverage per ESMA schema. | 80h | €100/h | €8,000 |
| M3: Validation Engine | XSD schema validation with human-readable error messages in English and German. Covers all ESMA enumeration codes and structural rules. | 60h | €100/h | €6,000 |
| M4: Multi-NCA Filing Documentation | Practical filing guides for BaFin (DE), CSSF (LU), CNMV (ES), AMF (FR), CBI (IE). Portal URLs, format requirements, submission procedures. | 40h | €100/h | €4,000 |
| M5: AIFMD II Schema Preparation | Tracking and implementing ESMA's updated Annex IV 2.0 technical standards (expected H2 2026). Migration guide for existing users. | 60h | €100/h | €6,000 |
| M6: Test Suite & CI | Comprehensive test suite validating XML output against ESMA XSD. GitHub Actions CI. npm package publishing. Integration examples. | 40h | €100/h | €4,000 |
| M7: Security & Accessibility | Dependency audit, code review against OWASP guidelines. WCAG-compliant documentation website. | 40h | €100/h | €4,000 |
| **Total** | | **400h** | | **€40,000** |

**Rate justification:** €100/hour is the rate for a senior TypeScript developer in Germany with domain expertise in financial regulation. This is below typical consultancy rates for financial regulatory technology (€150-300/h) and reflects the specialised nature of the work.

**Other funding:** The project currently has no external funding. I have applied for EXIST Gründungsstipendium through HWR Berlin (pending). The Annex IV toolkit is being developed as a standalone open-source project independent of any commercial funding.

---

### Compare your own project with existing or historical efforts.

**There is no directly comparable open-source project.** This is the core motivation for the proposal.

Existing proprietary solutions include:
- **anevis solutions** (Germany): Managed service for Annex IV reporting. Enterprise-only, estimated €15-50K/year. Closed source.
- **ARKK Solutions** (UK): Regulatory reporting platform. Enterprise pricing, closed source.
- **SS&C Algorithmics**: Enterprise risk and regulatory reporting suite. Large institutional clients only.
- **Matterhorn Reporting Services** (Luxembourg): Managed regulatory reporting. Not self-service.
- **aifmd-annex-iv.com**: Small commercial SaaS for Annex IV generation. Closed source.

All existing solutions are proprietary, expensive, and targeted at large institutions. No open-source library exists that generates or validates ESMA Annex IV XML. The closest parallel in terms of approach (open-source financial regulatory tooling) would be projects like:
- **Open Banking APIs** (various): Open standards for banking data exchange
- **FIX Protocol** tools: Open-source implementations of financial messaging standards
- **XBRL** open tools: For financial statement reporting (different domain but similar pattern)

Open Annex IV follows the same logic: regulatory reporting schemas are public goods, and the tooling to work with them should be openly available.

---

### What are significant technical challenges you expect to solve during the project, if any?

1. **ESMA schema complexity.** The Annex IV XSD schema contains hundreds of fields, nested structures, conditional requirements (different fields for different report types), and strict enumeration codes. Correctly mapping fund data to every required field — including edge cases like multi-currency funds, fund-of-funds, and leveraged AIFs — requires deep domain expertise.

2. **Multi-NCA divergence.** While ESMA provides a standard XML schema, national competent authorities (NCAs) may impose additional requirements or accept submissions through different channels (dedicated portals, email, API). Documenting and handling these differences across 5 jurisdictions is a research-intensive effort.

3. **AIFMD II schema transition.** ESMA is expected to publish updated Annex IV technical standards in H2 2026. The toolkit must be architecturally prepared for a potentially breaking schema change, including backward compatibility with the current schema (rev 6) for the transition period.

4. **Validation beyond XSD.** Valid XML (structurally correct per XSD) is necessary but not sufficient. NCAs may reject filings based on business logic rules (e.g., leverage ratios that are mathematically impossible, reporting frequencies that don't match AIFM size). The validation engine must go beyond structural validation to catch common filing errors.

5. **Internationalisation of error messages.** Compliance officers in different EU countries work in their national language. Error messages and documentation must be clear and actionable in at least English and German, with an architecture that supports additional languages.

---

### Describe the ecosystem of the project, and how you will engage with relevant actors and promote the outcomes?

**Target users:**
- Small and mid-sized AIFMs (fund managers) who currently file Annex IV manually
- Compliance consultants serving multiple fund managers
- Fund administrators who handle reporting for their clients
- Other RegTech developers building compliance tools
- Researchers and journalists analysing EU fund regulatory data

**Ecosystem engagement:**

1. **Industry associations:** I will engage with BVI (Bundesverband Investment und Asset Management) and BAI (Bundesverband Alternative Investments) in Germany — the two main industry bodies whose members are direct users of Annex IV reporting. I am exploring speaking opportunities at BVI's "KAGB an einem Tag" event (2 June 2026).

2. **ESMA consultation process:** When ESMA publishes draft technical standards for AIFMD II reporting, I will participate in the public consultation process, providing feedback from an open-source implementation perspective.

3. **npm/GitHub ecosystem:** The package will be published on npm with clear documentation, TypeScript types, and integration examples. GitHub Issues and Discussions will serve as the community channel.

4. **Content and education:** I will publish technical articles explaining the Annex IV schema, filing process, and AIFMD II changes — in both English and German. This addresses a significant knowledge gap, as most Annex IV documentation is buried in ESMA technical guidance PDFs.

5. **Lanzadera (Spain):** I have an existing relationship with Lanzadera, a major Spanish startup accelerator, who have expressed interest in RegTech solutions for the Spanish market. This provides a channel to promote the toolkit to Spanish fund managers and the CNMV ecosystem.

**Long-term sustainability:** The toolkit will be maintained as part of the broader Caelith ecosystem. The open-source library feeds into a commercial compliance dashboard, creating a sustainable open-core model where the commons tool is maintained because it powers a commercial product. This ensures ongoing maintenance beyond the grant period.

---

## Attachments

*(Julian: Attach the following)*
1. Budget breakdown (PDF version of the table above)
2. GenAI disclosure log (Mate will prepare this)

---

## GenAI Disclosure

**Did you use generative AI in writing this proposal?**

Yes. I used an AI assistant (Claude, by Anthropic) for:
- Research on existing tools, competitive landscape, and ESMA technical schemas (February 2026)
- Brainstorming the project structure and milestone breakdown
- Drafting initial text that I subsequently rewrote in my own words

A full prompt log with dates and unedited outputs is attached.

The technical design, domain expertise, and all claims in this proposal are based on my direct experience building Annex IV reporting software. The AI was used as a research and drafting aid, not as a substitute for domain knowledge.

---

## Notes for Julian

### Before submitting, you need to:
1. **Create the GitHub repo:** `github.com/caelith-tech/open-annex-iv` (or whatever name you choose)
   - Add LICENSE (Apache 2.0)
   - Add a basic README explaining the project vision
   - Can be mostly empty — shows intent

2. **Rewrite this proposal in YOUR voice.** The reviewers want to hear from you. Use this as a starting point but make it yours. They explicitly say they don't care about spelling — they care about good ideas and genuine expertise.

3. **Decide on the project name.** Suggestions:
   - `open-annex-iv` (clear, descriptive)
   - `annex-iv-tools` (technical, accurate)
   - `esma-annex-iv` (references the standard)
   - `eu-fund-reporting` (broader scope)

4. **Fill in your phone number** on the form.

5. **Prepare the GenAI log.** I'll compile the prompts and outputs from our research sessions.

6. **Don't overthink it.** From the FAQ: "It is a light weight procedure, please don't wait until the last hour before the deadline before submitting."

