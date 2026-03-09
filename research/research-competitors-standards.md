# Research: Competitor Tech Stacks, Fund Manager Pain Points & Open Data Standards

*Compiled 2026-02-25 for Caelith*

---

## Part 1: Competitor Tech Stack Analysis

### anevis solutions (Germany)
- **Focus:** Full-service reporting for asset managers, KVGs, AIFMs, banks
- **Product suites:**
  - Marketing Suite (factsheets, widgets, ESG reporting, AI video)
  - Regulatory Suite (KIDs for PRIIPs, EPT/CEPT/EMT, SFDR, EET/PAI, **AIFMD Annex IV**, Solvency II/TPT, FIDLEG BIB)
  - Risk & Compliance Suite (transaction cost calc, best execution, valuation, risk management)
  - Data Management Suite (data warehouse, validation on demand, **interface services**, AI-driven data apps)
- **Tech clues:** No open-source presence. Enterprise Java/.NET likely based on German RegTech norms. Key insight: they offer **data warehouse + interface services** — the plumbing that KVGs desperately need.
- **Competitive takeaway for Caelith:** anevis is the main German competitor for Annex IV. They're comprehensive but expensive/enterprise. Caelith can undercut on price and developer experience.

### Suade Labs (London)
- **Open source:** **FIRE (Financial Regulatory Data Standard)** — Apache 2.0, 79 stars, actively maintained (updated Feb 2026)
  - Defines common data schemas for regulatory data transmission
  - Backed by EU Commission, Open Data Institute, Horizon 2020
  - Python-based with JSON schemas
- **Tech stack clues from GitHub:**
  - **Python** (primary), JavaScript
  - **ClickHouse** (forked clickhouse_orm — they use columnar DB for regulatory analytics!)
  - Vue.js 3 frontend (vue3-multiselect fork)
  - JSON Schema validation (jsonscreamer)
  - dc.js for data visualization
  - js-xlsx for Excel processing
- **Competitive takeaway:** FIRE is interesting but banking-focused (loans, collateral). Not fund-management-specific. Caelith could adopt FIRE schemas where they overlap (entity data) but needs fund-specific schemas (FundsXML).

### Regnology (formerly BearingPoint RegTech)
- **Focus:** Regulatory reporting for banks, insurers, regulators themselves
- **Products:** Regnology Reporting Hub, Transaction Reporting, Tax Hub, Insurance Hub, Risk Hub, Finance Hub
- **Platform:** Rcloud (cloud), Rconnect (connectivity), RGD (Granular Data Model), chatbot
- **For regulators:** Supervisory Hub, AEOI, Fusion Statistics
- **Tech clues:** Java/enterprise stack. Their "Regnology Granular Data Model" is proprietary but aligns with ECB/EBA integrated reporting framework (IReF/BIRD).
- **Competitive takeaway:** Too big/bank-focused. Not a direct Caelith competitor for fund managers, but their reporting format knowledge is relevant.

### Workiva
- US-focused, SEC/XBRL heavy. Not directly relevant for German KVGs. Cloud platform, proprietary.

### Confluence Technologies
- US fund admin tech, StatPro acquisition. Performance attribution, GIPS compliance. Not EU regulatory focused.

### Other notable players:
- **Kneip** (Luxembourg) — fund distribution support, regulatory reporting, document production
- **FE fundinfo** — EMT/EPT/EET data distribution platform, huge in European fund data exchange
- **Fundsquare** (Luxembourg Stock Exchange subsidiary) — fund order routing, reporting

---

## Part 2: Fund Manager Pain Points & Workflows

### Data Formats KVGs Deal With Daily

| Source | Format | Pain Level |
|--------|--------|------------|
| Custodian banks (Depositary) | SWIFT MT messages (MT535 holdings, MT536 transactions, MT940/942 cash), proprietary CSV | 🔴 High — different custodian = different format |
| Bloomberg/Reuters | Bloomberg BPIPE/SFTP feeds, Reuters Datascope | 🟡 Medium — standardized but expensive |
| Fund administrators | CSV, Excel, sometimes FundsXML | 🔴 High — manual reconciliation |
| BaFin (outbound) | XML via MVP Portal (Melde- und Veröffentlichungsplattform) | 🔴 High — complex XML schemas |
| ESMA/NCAs | AIFMD Annex IV XML (ESMA technical standards) | 🔴 High — the core Caelith use case |
| Distributors | EMT/EPT/EET Excel templates | 🟡 Medium — tedious but structured |
| Investors (inbound) | PDF, email, paper (!) for KYC/AML | 🔴 High — manual processes |
| Transfer agents | SWIFT ISO 15022/20022 for fund orders | 🟡 Medium |

### BaFin Reporting Workflow
1. **MVP Portal** (Melde- und Veröffentlichungsplattform) — BaFin's primary electronic reporting interface
2. Reports submitted as **XML files** conforming to BaFin's technical specifications
3. Key reports: Annex IV (AIFMD), risk reporting, leverage calculations, liquidity profiles
4. Most small KVGs still assemble these **manually in Excel** then convert to XML or use anevis/similar

### Investor Onboarding Pain Points (KYC/AML for funds)
- German GwG (Geldwäschegesetz) requirements
- Beneficial ownership identification (Transparenzregister)
- PEP screening, sanctions screening
- Document collection still largely manual (PDF/email)
- **VideoIdent** services (IDnow, WebID) increasingly used
- No standardized digital KYC format across KVGs

### Custodian/Depositary Data Aggregation
- Small KVGs may use 2-5 different custodians
- Each sends holdings/transactions in different formats
- **Reconciliation** between fund accounting and custodian records is a massive pain point
- SWIFT MT535 (Statement of Holdings) and MT536 (Statement of Transactions) are the closest to standard
- Some custodians offer API access (newer) but most still use SFTP/file drops

---

## Part 3: Open Data Standards — Assessment for Caelith

### 🏆 Tier 1: Must-Have (Immediate Competitive Advantage)

#### FundsXML 4.2.10
- **Maturity:** ⭐⭐⭐⭐⭐ Very mature — 15+ years, 107 associate members, v4.2.10
- **What it covers:** Fund master data, NAV, portfolio holdings (15+ asset classes), share class data, transactions, **AND regulatory templates** (EMT, EET, PRIIPs, Solvency II/TPT, KIID, EMIR)
- **Germany-specific:** Has `FundsXML4_CountrySpecificData_DE.xsd` module (BVI, real estate reporting)
- **Open source:** MIT licensed, XSD schemas on GitHub (`fundsxml/schema`, 9 stars)
  - Also: `fundsxml/examples` with XSLT examples
  - `karlkauc/FundsXML-EMT-Converter` (Groovy, converts EMT CSV → FundsXML)
- **Integration difficulty:** Medium. XSD 1.1 required (not standard xmllint — need Saxon-EE or similar). Schema is 2.5MB flattened. Would need to build XML parser/generator in Node.js.
- **Competitive advantage:** 🔴 **HUGE.** If Caelith can import/export FundsXML natively, every KVG that already uses it for data exchange can plug right in. This is the de facto European fund data interchange format.
- **Recommendation:** Build a FundsXML import/export module. Start with fund master data + portfolio holdings + EMT/EET sections. This alone would make Caelith credible to any German KVG.

#### EMT/EPT/EET Templates (FinDatEx)
- **Maturity:** ⭐⭐⭐⭐⭐ Industry standard, mandatory for fund distribution in EU
  - EMT V4.3 (Jan 2026) — MiFID II target market + cost data
  - EPT V2.x — PRIIPs KID data
  - EET V1.1.3 (Dec 2024) — ESG/SFDR sustainability data
- **Format:** Excel/CSV templates with defined field numbers (e.g., field 05105 = sustainability preferences)
- **Open source implementations:** None dedicated. But format is just structured CSV/Excel — straightforward to parse.
- **Integration difficulty:** Low-Medium. Parse CSV/Excel, map to internal data model. Well-documented field definitions.
- **Competitive advantage:** 🔴 **Critical.** Every fund distributor needs these. Being able to auto-generate EMT/EPT/EET from fund data = massive time saver.
- **Recommendation:** Build CSV/Excel import/export for all three. Auto-populate from fund master data. Include German-specific codification (field 00090).

### 🥈 Tier 2: High Value (Build in Year 1)

#### AIFMD Annex IV XML (ESMA Technical Standards)
- **Maturity:** ⭐⭐⭐⭐ Mature — defined by ESMA, submitted via national regulators
- **What it covers:** The core AIFMD reporting — fund characteristics, leverage, liquidity, risk, counterparties
- **Format:** XML conforming to ESMA's published XSD schemas
- **Open source:** ESMA publishes XSD schemas freely. No known open-source generators.
- **Integration difficulty:** Medium. Complex XML with many enumerated values and cross-validations.
- **Competitive advantage:** 🔴 **This IS Caelith's core product.** First-class Annex IV generation is table stakes.
- **Recommendation:** Already planned. Ensure validation against ESMA XSD before submission.

#### ISO 20022 / SWIFT Messages
- **Maturity:** ⭐⭐⭐⭐⭐ Global standard, mandatory migration happening 2023-2025
- **What it covers:** Financial messaging — payments, securities, trade finance. Fund-relevant: sese (settlement), seev (corporate actions), reda (reference data)
- **Open source:**
  - ISO 20022 message schemas freely available from iso20022.org
  - `moov-io/iso20022` (Go, 100+ stars)
  - Various Python/Java parsers exist
  - No mature **JavaScript/Node.js** library found — opportunity!
- **Integration difficulty:** High. Massive standard (800+ message types). Focus on fund-relevant subset.
- **Competitive advantage:** 🟡 **Moderate but growing.** Being able to ingest SWIFT MT535/MT536 and ISO 20022 equivalents (semt.002, semt.003) would solve the custodian data aggregation problem.
- **Recommendation:** Start with parsing MT535 (holdings) and MT536 (transactions) — these are what custodians send. Later add ISO 20022 equivalents as industry migrates.

#### LEI (Legal Entity Identifier) Resolution
- **Maturity:** ⭐⭐⭐⭐⭐ Global, mandatory for AIFMD/EMIR/MiFIR
- **GLEIF API:** Free, RESTful API at `api.gleif.org/api/v1/lei-records`
- **Open source:** GLEIF publishes full LEI database as CSV/JSON. Several client libraries exist.
- **Integration difficulty:** Low. REST API call, cache results.
- **Competitive advantage:** 🟡 **Expected feature** — auto-resolve LEIs, validate against GLEIF, auto-populate entity data.
- **Recommendation:** Integrate GLEIF API for entity lookup. Auto-validate LEIs in fund/investor data. Pre-populate legal name, jurisdiction, parent entities from LEI.

### 🥉 Tier 3: Differentiators (Build in Year 2+)

#### Solvency II TPT (Tripartite Template)
- **Maturity:** ⭐⭐⭐⭐ Required for funds sold to insurance companies
- **Format:** CSV/Excel template, look-through reporting
- **Integration difficulty:** Medium. Complex look-through calculations for multi-layer fund structures.
- **Competitive advantage:** 🟡 Nice-to-have. Insurance company investors will ask for it.

#### SWIFT Fund Messages (ISO 15022 MT messages for funds)
- MT502 (order), MT509 (status), MT513 (confirmation), MT515 (confirmation)
- Being replaced by ISO 20022 `setr` messages
- **Recommendation:** Low priority unless Caelith becomes a transfer agent connector.

#### XBRL/iXBRL (for any future BaFin digital reporting)
- **Maturity:** ⭐⭐⭐⭐ Mature globally, growing in EU
- **Open source:** Arelle (Python XBRL processor), open source
- **Recommendation:** Watch brief. ESMA pushing towards XBRL for more reporting. Not urgent for fund managers yet.

#### FIRE Data Standard (Suade Labs)
- **Maturity:** ⭐⭐⭐ Active but banking-focused
- **Recommendation:** Reference for data modeling patterns but don't adopt directly — too banking-specific.

---

## 🎯 Priority Integration Roadmap for Caelith

### Phase 1 (MVP — Now)
1. **AIFMD Annex IV XML generation** — core product, validate against ESMA XSD
2. **EMT/EET/EPT import/export** — CSV/Excel, auto-generate from fund data
3. **LEI lookup** — GLEIF API integration for entity resolution
4. **Basic FundsXML import** — parse fund master data + holdings

### Phase 2 (6 months)
5. **Full FundsXML 4.x support** — import/export including regulatory modules
6. **SWIFT MT535/MT536 parser** — ingest custodian holding/transaction statements
7. **BaFin MVP Portal XML** — direct XML export matching BaFin submission format
8. **Investor KYC workflow** — structured digital onboarding with GwG compliance

### Phase 3 (12+ months)
9. **ISO 20022 fund messages** — modern replacement for SWIFT MT
10. **Solvency II TPT generation** — for insurance company investors
11. **XBRL capability** — future-proofing for evolving EU digital reporting
12. **Multi-custodian reconciliation engine** — automated matching across data sources

---

## 💡 "Oh, Caelith supports THAT?" Killer Features

These are the features that would make a German KVG immediately interested:

1. **"Paste your custodian's MT535 and we auto-reconcile with your fund accounting"** — solves the #1 daily pain point
2. **"Auto-generate EMT/EET/EPT from your fund data"** — saves hours of manual Excel work per fund
3. **"FundsXML native — import from your existing systems, export to distributors"** — speaks the industry language
4. **"One-click Annex IV XML with ESMA schema validation"** — the whole reason they'd buy Caelith
5. **"LEI auto-lookup and validation"** — small thing but screams "these people know the domain"
6. **"German BVI codification built-in"** — shows Caelith understands the German market specifically
7. **"EET V1.1.3 ready"** — current version, ESG compliance is hot right now

---

## Key Open Source Components to Build On

| Need | OSS Option | Language | Notes |
|------|-----------|----------|-------|
| XML Schema validation (XSD 1.1) | Saxon-JS or libxmljs2 | JS | XSD 1.1 needed for FundsXML — tricky in Node |
| Excel parsing (EMT/EPT/EET) | SheetJS (xlsx) | JS | Already well-known, Suade uses it too |
| SWIFT MT parsing | `pofider/swift-mt-parser` or custom | JS | Few good Node.js options |
| ISO 20022 XML | Custom + published XSDs | JS | No mature JS library — build custom |
| LEI resolution | GLEIF REST API | Any | Simple HTTP client |
| PDF generation (reports) | Puppeteer or PDFKit | JS | For factsheets, KID documents |
| XML generation | `xmlbuilder2` | JS | For Annex IV, FundsXML output |
| CSV parsing | PapaParse | JS | For EMT/EET flat files |
| XBRL (future) | Arelle | Python | Microservice if needed |
| FundsXML schemas | `fundsxml/schema` (GitHub) | XSD | MIT licensed, official |
