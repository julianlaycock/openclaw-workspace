# Open-Source Regulatory & Financial Libraries for Caelith

Research completed 2026-02-25. For integration into a Next.js/Express/PostgreSQL fund compliance platform targeting German KVGs (AIFMD II, KAGB, ELTIF 2.0).

---

## 1. XBRL / iXBRL Tools

### ⭐ Arelle (RECOMMENDED)
- **URL:** https://github.com/Arelle/Arelle
- **Stars:** ~1,000+ | **Activity:** Very active (commits daily)
- **License:** Apache 2.0 ✅
- **What:** End-to-end XBRL platform. Fully-featured processor with GUI, CLI, Python API, and Web Service API. Certified by XBRL International as a Validating Processor. Supports XBRL v2.1, Dimensions, Formula, Inline XBRL v1.1, xBRL-JSON, xBRL-CSV, Taxonomy Packages. **Has built-in ESEF (EU) validation rules.**
- **Integration:** Run as a Python microservice alongside Express backend. Use its Web Service API to validate/generate XBRL reports for ESMA Annex IV submissions. Handles taxonomy loading, instance validation, and rendering.
- **Maturity:** Production-ready. Used by SEC, ESMA filers, major service providers.

### py-xbrl
- **URL:** https://github.com/manusimidt/py-xbrl
- **Stars:** ~151 | **Activity:** Active (updated recently)
- **License:** MIT ✅
- **What:** Python parser for XBRL and iXBRL files. Lighter weight than Arelle, focused on parsing/extraction rather than full validation.
- **Integration:** Good for ingesting XBRL filings from regulators (BaFin publications, ESMA data). Pair with Arelle for validation.
- **Maturity:** Moderate. Good for parsing, not for generating/validating regulatory filings.

### ixbrl-parse
- **URL:** https://github.com/kanedata/ixbrl-parse
- **Stars:** ~71 | **Activity:** Maintained
- **License:** MIT ✅
- **What:** Python library specifically for extracting data from iXBRL files. Clean API.
- **Integration:** Parse incoming iXBRL reports from counterparties or regulatory publications.
- **Maturity:** Moderate. Focused scope, does it well.

---

## 2. Financial Calculation Libraries

### QuantLib (via QuantLib-Python / QuantLib.js)
- **URL:** https://github.com/lballabio/QuantLib
- **Stars:** ~5,500+ | **Activity:** Very active
- **License:** Modified BSD ✅
- **What:** Industry-standard quantitative finance library. Pricing, risk metrics, yield curves, Monte Carlo, VaR. The gold standard for financial calculations.
- **Integration:** Use QuantLib-Python as a calculation microservice. Expose VaR, leverage ratios, stress test scenarios via REST API to Express backend. Covers AIFMD Annex IV risk reporting requirements (gross/commitment leverage, VaR).
- **Maturity:** Production-ready. Used by banks and fund managers globally.

### Portfolio Analytics (portfolio-analytics.js)
- **URL:** https://github.com/lequant40/portfolio_analytics_js
- **Stars:** ~200+ | **Activity:** Maintained
- **License:** MIT ✅
- **What:** JavaScript library for portfolio analytics: Sharpe ratio, drawdown, returns analysis, risk metrics.
- **Integration:** Direct integration into Express backend or even browser-side calculations. Good for dashboard NAV analytics.
- **Maturity:** Moderate. Good for display-level analytics, not regulatory-grade VaR.

### simple-statistics
- **URL:** https://github.com/simple-statistics/simple-statistics
- **Stars:** ~2,900+ | **Activity:** Stable/maintained
- **License:** ISC (MIT-compatible) ✅
- **What:** JavaScript statistical library. Mean, variance, standard deviation, linear regression, t-tests, etc.
- **Integration:** Use in Express backend for basic risk metric calculations, data analysis, trend detection.
- **Maturity:** Production-ready for statistics. Not finance-specific.

### stdlib-js
- **URL:** https://github.com/stdlib-js/stdlib
- **Stars:** ~4,500+ | **Activity:** Very active
- **License:** Apache 2.0 ✅
- **What:** Comprehensive JavaScript/Node.js standard library with advanced math, statistics, linear algebra, probability distributions. Includes financial math functions.
- **Integration:** Native Node.js — use directly in Express backend for Monte Carlo simulations, statistical distributions for VaR, stress testing calculations.
- **Maturity:** Production-ready. Well-tested, comprehensive.

---

## 3. KYC/AML Sanctions Screening

### ⭐ OpenSanctions + Yente API (RECOMMENDED)
- **URL:** https://github.com/opensanctions/opensanctions (683 stars) + https://github.com/opensanctions/yente
- **Stars:** 683 (opensanctions) + ~200 (yente) | **Activity:** Very active (14,460 commits)
- **License:** MIT (yente) ✅ / Data: CC-BY-NC for non-commercial, paid license for commercial
- **What:** The most comprehensive open sanctions database. Aggregates EU consolidated sanctions, UN, OFAC, plus PEP lists, corporate registries from 100+ sources. **Yente** is the self-hosted matching API (FastAPI/Python) with fuzzy entity matching, bulk screening, and Reconciliation API support.
- **Integration:** Deploy Yente as a Docker container alongside Caelith. Call its REST API from Express backend for investor screening (onboarding KYC), ongoing monitoring. Supports ElasticSearch for fast fuzzy matching.
- **Maturity:** Production-ready. Used by banks, fintechs, compliance teams. **Best-in-class open source sanctions screening.**
- **⚠️ Note:** Commercial use of OpenSanctions data requires a paid data license. The yente software itself is MIT.

### Fuse.js (fuzzy matching)
- **URL:** https://github.com/krisk/Fuse
- **Stars:** ~18,000+ | **Activity:** Stable
- **License:** Apache 2.0 ✅
- **What:** Lightweight fuzzy search/matching library for JavaScript. No dependencies.
- **Integration:** Use for name matching in investor screening, document search, entity resolution. Complement to OpenSanctions for custom watchlists.
- **Maturity:** Production-ready.

### fuzzball.js
- **URL:** https://github.com/nol13/fuzzball.js
- **Stars:** ~300+ | **Activity:** Maintained
- **License:** MIT ✅
- **What:** JavaScript port of Python's fuzzywuzzy. Levenshtein distance, token sort/set ratio matching.
- **Integration:** Use for AML name matching where you need fine-grained control over matching algorithms (transliteration variants of German/Arabic names).
- **Maturity:** Production-ready.

---

## 4. LEI (Legal Entity Identifier) Tools

### GLEIF Public API (no library needed)
- **URL:** https://api.gleif.org/api/v1/ (free, public, no auth needed)
- **What:** Official GLEIF REST API. LEI lookup, search by name/jurisdiction, relationship data, LEI validation.
- **Integration:** Call directly from Express backend. No library needed — simple REST calls. Cache results in PostgreSQL for performance.
- **Maturity:** Production-ready. Official service.

### leipy
- **URL:** https://github.com/emredjan/leipy
- **Stars:** ~2 | **Activity:** Inactive (2018)
- **License:** MIT ✅
- **What:** Python wrapper for GLEIF API.
- **Integration:** Not recommended — too stale. Better to write a thin wrapper around the GLEIF API directly in TypeScript.
- **Maturity:** Experimental/abandoned.

### 💡 Recommendation: Build a thin TypeScript GLEIF client
The GLEIF API is simple enough that a 50-line wrapper handles it. Key endpoints:
- `GET /api/v1/lei-records?filter[lei]=<LEI>` — lookup
- `GET /api/v1/lei-records?filter[entity.legalName]=<name>` — search
- `GET /api/v1/lei-records/<LEI>/ultimate-parent-relationship` — ownership chain

Store LEI data in PostgreSQL for AIFMD Annex IV reporting (requires LEI for each fund/manager).

---

## 5. Document Processing for Compliance

### ⭐ Tesseract OCR
- **URL:** https://github.com/tesseract-ocr/tesseract
- **Stars:** ~63,000+ | **Activity:** Very active
- **License:** Apache 2.0 ✅
- **What:** Industry-standard OCR engine with LSTM neural net. Supports 100+ languages including German.
- **Integration:** Use via `node-tesseract-ocr` or `tesseract.js` (pure JS port, ~35k stars) for browser-side OCR. Process investor ID documents, proof of wealth documents, scanned forms.
- **Maturity:** Production-ready. Google-backed.

### tesseract.js
- **URL:** https://github.com/naptha/tesseract.js
- **Stars:** ~35,000+ | **Activity:** Active
- **License:** Apache 2.0 ✅
- **What:** Pure JavaScript port of Tesseract. Runs in browser and Node.js.
- **Integration:** Use in the Next.js frontend for client-side document scanning, or in Express backend for server-side OCR of uploaded investor documents.
- **Maturity:** Production-ready.

### pdf-parse / pdf.js
- **URL:** https://github.com/nicktacular/pdf-parse (~1.5k stars) / https://github.com/nicktacular/pdf.js (Mozilla, ~50k stars)
- **License:** MIT / Apache 2.0 ✅
- **What:** PDF text extraction for Node.js. Mozilla's pdf.js is the gold standard for PDF rendering/parsing.
- **Integration:** Extract text from uploaded investor documents, prospectuses, regulatory PDFs. Pair with OCR for scanned documents.
- **Maturity:** Production-ready.

### Apache Tika (via tika-server)
- **URL:** https://github.com/apache/tika
- **Stars:** ~2,300+ | **Activity:** Very active
- **License:** Apache 2.0 ✅
- **What:** Content analysis toolkit. Extracts text and metadata from 1000+ file types (PDF, DOCX, images, etc.).
- **Integration:** Run as a Docker sidecar. Send investor documents to Tika via REST API for text extraction + metadata. Handles edge cases (encrypted PDFs, complex layouts) better than simple parsers.
- **Maturity:** Production-ready. Apache foundation project.

---

## 6. Audit & Cryptographic Proof

### merkletreejs
- **URL:** https://github.com/merkletreejs/merkletreejs
- **Stars:** ~800+ | **Activity:** Maintained
- **License:** MIT ✅
- **What:** JavaScript/TypeScript Merkle tree implementation. Supports multiple hash functions, proof generation/verification.
- **Integration:** Build tamper-evident audit logs for compliance actions. Hash each compliance event, build Merkle tree, store root hash. Auditors can verify no records were altered. Use for AIFMD record-keeping requirements.
- **Maturity:** Production-ready. Widely used in Web3 but perfectly applicable to compliance audit trails.

### RFC 3161 Timestamping
- **URL:** https://github.com/nicktacular/rfc3161-client (various implementations)
- **What:** RFC 3161 defines trusted timestamping. FreeTSA.org provides free timestamps.
- **Integration:** Timestamp Merkle roots via FreeTSA or a commercial TSA. Proves compliance records existed at a specific time. Store TSA responses in PostgreSQL.
- **💡 Practical approach:** Use Node.js `crypto` module + HTTP calls to a TSA server. No heavy library needed.

### node-forge
- **URL:** https://github.com/nicktacular/forge
- **Stars:** ~5,000+ | **Activity:** Maintained
- **License:** BSD-3-Clause ✅
- **What:** JavaScript implementation of TLS, PKI, cryptographic utilities. ASN.1 encoding/decoding (needed for RFC 3161).
- **Integration:** Generate/verify digital signatures on compliance documents, handle RFC 3161 timestamp tokens, certificate validation.
- **Maturity:** Production-ready.

---

## 7. Regulatory Data Feeds & Parsers

### rss-parser
- **URL:** https://github.com/rbren/rss-parser
- **Stars:** ~1,500+ | **Activity:** Maintained
- **License:** MIT ✅
- **What:** Robust RSS/Atom feed parser for Node.js and browser.
- **Integration:** Monitor BaFin RSS feeds (https://www.bafin.de/SiteGlobals/Functions/RSSFeed/), ESMA publications, EBA guidelines. Parse into structured alerts in Caelith's regulatory change tracker.
- **Maturity:** Production-ready.

### Cheerio
- **URL:** https://github.com/cheeriojs/cheerio
- **Stars:** ~28,000+ | **Activity:** Very active
- **License:** MIT ✅
- **What:** Fast HTML/XML parser implementing jQuery core. Server-side DOM manipulation.
- **Integration:** Scrape regulatory publications from BaFin, ESMA, and Bundesanzeiger that don't offer clean APIs. Extract structured data from HTML regulatory notices.
- **Maturity:** Production-ready.

### EUR-Lex SPARQL / CELLAR API (EU official)
- **URL:** https://data.europa.eu/sparql (free, no auth)
- **What:** Official EU open data endpoint. Query EU legislation (AIFMD, ELTIF regulation, MiFID) via SPARQL. Get structured legal text, amendment history, cross-references.
- **Integration:** Build a regulatory change monitor: periodically query for amendments to relevant directives (2011/61/EU for AIFMD, 2015/760/EU for ELTIF). Store in PostgreSQL, alert users.
- **Maturity:** Production service run by EU Publications Office.

---

## Summary: Recommended Stack for Caelith

| Category | Primary Choice | Why |
|---|---|---|
| XBRL/iXBRL | **Arelle** (Python sidecar) | Only production-grade ESEF validator, ESMA-certified |
| Risk Calculations | **QuantLib** (Python sidecar) + **stdlib-js** (Node) | QuantLib for regulatory VaR/leverage; stdlib for lighter calcs |
| Sanctions/KYC | **OpenSanctions/Yente** (Docker) + **Fuse.js** | Best open sanctions data + fast JS fuzzy matching |
| LEI | **GLEIF API** (direct REST) | Official, free, simple — no library needed |
| Document OCR | **tesseract.js** + **pdf-parse** | Client/server OCR + PDF extraction |
| Audit Trail | **merkletreejs** + RFC 3161 timestamping | Tamper-evident logs with trusted timestamps |
| Regulatory Feeds | **rss-parser** + **Cheerio** + EUR-Lex SPARQL | Monitor BaFin/ESMA/EU regulatory changes |

### Architecture Notes
- **Python sidecar pattern:** Arelle and QuantLib are Python-only. Run them as a FastAPI microservice behind Express. Docker Compose makes this clean.
- **OpenSanctions data licensing:** The yente API code is MIT, but commercial use of OpenSanctions data requires a paid license (~€500-2000/month depending on volume). Budget for this.
- **GLEIF is free:** No licensing concerns. Rate-limited but generous.
- **Total additional infrastructure:** 2-3 Docker containers (Python sidecar, Yente+ElasticSearch). Manageable for a small team.
