# NGI Zero Commons Fund — eu-reg-feed

**Code:**

**Requestor:** Julian Laycock

**Email:** julian.laycock@caelith.tech

**Phone:** +34627714130

**Organization:** Caelith

**Country:** Germany

**Consent:** You may keep my data on record

**Call:** Commons_Fund

**Project:** eu-reg-feed

**Website:** https://github.com/julianlaycock/eu-reg-feed

**Abstract:**

EU regulators publish consultations, rules, and deadlines across dozens of websites with no machine-readable feeds. ESMA has no RSS or API. BaFin's RSS URLs return 404. Only CSSF Luxembourg provides a working feed. Programmatic access requires commercial vendors at €25K-500K/year.

eu-reg-feed is an open standard (RegEvent JSON Schema) and reference implementation that aggregates publications from ESMA, EBA, EIOPA, EUR-Lex, and five NCAs into a unified format. A working prototype exists: ESMA and CSSF aggregators fetch 30 live events today. Funding extends this to all nine sources, adds feed publishing (Atom, JSON Feed, iCal, REST API), and builds a plugin architecture for community NCA contributions. Complement to open-annex-iv (2026-04-087): data OUT to regulators; eu-reg-feed handles data IN.

**Experience:**

From 2020 to 2022, I worked at Capgemini on BaFin's MVP Portal — the platform through which German financial institutions submit regulatory reports. My role focused on the data ingestion and normalization layer. I built connectors that pulled data from multiple upstream sources — institutional reference data, transaction records, position files — each with different formats, update frequencies, and quality levels. The core challenge was normalization: mapping heterogeneous source formats into a canonical staging model, then applying data quality rules (completeness checks, validation against regulatory code lists, cross-field consistency) before the data could flow into report-specific pipelines.

This is directly relevant to eu-reg-feed. The problem is structurally identical: multiple sources (regulators instead of institutions), each publishing in their own format (HTML pages, broken RSS, PDF attachments), with no shared schema. The work is ingestion, normalization, and quality assurance — exactly what I spent two years building at scale for BaFin.

Specific technical experience: I implemented ETL pipelines handling staging → canonical model → output mapping. I built validation rules that checked field completeness, value ranges, code list membership, and temporal consistency. I worked directly with BaFin's data formats and publication patterns — I know how German regulatory data is structured, when it updates, and where it breaks.

I am currently building Caelith, a compliance platform for EU fund managers. As part of this, I have already built working integrations with BaFin, ESMA, and ECB RSS/publication feeds for a compliance calendar feature. I discovered firsthand that ESMA has no functional RSS feed (returns 404), BaFin's RSS URLs listed in their footer are broken (404), and CSSF Luxembourg is the only NCA with a properly functioning RSS feed (RSS 2.0, hourly updates). This hands-on experience with the broken state of EU regulatory data publishing is what motivated eu-reg-feed. I have also submitted open-annex-iv (code 2026-04-087) to this same call — eu-reg-feed is its natural complement.

**Amount:** € 35000

**Use:**

Budget: €35,000 at €100/hour = 350 hours total, split across 7 milestones:

1. RegEvent JSON Schema specification — €5,000 / 50h
   Define the open standard for regulatory change events. Event types: consultation, final_rule, guidance, transposition, deadline, warning. Fields: jurisdiction, regulator, publication date, effective date, response deadline, affected legislation, classification taxonomy. Published as JSON Schema with full documentation and examples. Versioning strategy (semver). Submit to relevant standards bodies for review.

2. EU-level aggregators (ESMA + EBA + EIOPA) — €7,000 / 70h
   Scrapers and parsers for the three European Supervisory Authorities. Cover consultations, final rules, guidelines, Q&As, and opinions. ESMA: parse HTML consultation pages (no API exists). EBA: parse publications listing. EIOPA: parse consultations and guidelines pages. Each normalizes output to RegEvent schema. Incremental polling with change detection.

3. EUR-Lex integration — €4,000 / 40h
   Integration with EUR-Lex via CELLAR/SPARQL API for EU-level legislation changes: new directives, regulations, delegated acts, implementing technical standards. Map CELEX metadata to RegEvent fields. Track amendment chains and consolidation status. This is the most structured source — EUR-Lex actually has a proper API.

4. NCA aggregators (BaFin, CSSF, AMF, CNMV, FMA Austria) — €8,000 / 80h
   Per-NCA scrapers with normalization to RegEvent schema. CSSF via its native RSS feed (the only one that works). BaFin, AMF, CNMV, FMA via HTML parsing of publication pages. Handle multilingual content (German, French, Spanish). Per-NCA test suites with snapshot testing for regression detection when page layouts change.

5. Feed publishing + API — €5,000 / 50h
   Atom and JSON Feed endpoints for feed reader compatibility. iCal calendar feed for regulatory deadlines (consultation responses, transposition dates). REST API with filtering by regulator, jurisdiction, event type, date range. Webhook notification support for real-time consumers. OpenAPI specification.

6. Plugin architecture + documentation — €4,000 / 40h
   Extensible scraper framework so the community can add new NCAs without touching core code. BaseAggregator interface, configuration-driven scraper registration. Comprehensive contributor documentation: adding-a-new-nca guide with step-by-step walkthrough. User documentation for feed consumers.

7. Security review + accessibility — €2,000 / 20h
   Dependency audit and supply chain security review. Rate limiting for API endpoints. Respectful scraping: configurable delays, robots.txt compliance. WCAG 2.1 AA compliance for documentation site. Final integration testing across all sources.

**Comparison:**

The commercial market for regulatory change monitoring is dominated by three players: CUBE (€50-200K/year), Thomson Reuters Regulatory Intelligence (€25-100K/year), and Wolters Kluwer OneSumX (€100-500K/year). All are enterprise-only, closed-source, and primarily serve large banks. A mid-size fund manager or fintech startup has no affordable way to programmatically track EU regulatory changes.

On the open-source side, nothing exists. A GitHub search for "EU regulatory feed," "regulatory change monitoring," and related terms returns six results, none of which provide structured regulatory change data. ESMA publishes esma_data_py, a Python package for accessing MiFID reference data (FIRDS), short selling data (SSR), and similar datasets — but it covers none of ESMA's own consultations, final rules, or guidelines. It is market data infrastructure, not regulatory change infrastructure.

The regulators themselves do not solve this problem. ESMA has no RSS feed and no API for its consultations page. BaFin lists RSS feed URLs in its website footer, but they return HTTP 404. AMF, CNMV, and FMA Austria have no discoverable structured feeds at all. CSSF Luxembourg is the sole exception — it publishes a working RSS 2.0 feed with hourly updates. EUR-Lex has a proper SPARQL/CELLAR API, but it covers legislation only, not the supervisory authority publications that precede and follow legislation.

eu-reg-feed differs from all of the above in three ways. First, it is an open standard — the RegEvent JSON Schema — not just an implementation. Anyone can build on the schema without using our code. Second, it aggregates across jurisdictional boundaries: EU-level authorities, EUR-Lex, and national regulators in a single normalized format. Commercial tools do this but charge six figures for it. Third, it is infrastructure, not a product. No dashboard, no SaaS, no login wall — just feeds, an API, and a schema that anyone can consume.

**Challenges:**

The primary technical challenge is source fragility. EU regulators redesign their websites without notice, break their own feeds (BaFin's 404 RSS is a live example), and publish in inconsistent formats. Scrapers that work today may break tomorrow. The mitigation strategy has three layers: snapshot-based regression testing (store known-good page structures, alert on structural changes), graceful degradation (if a scraper fails, the feed continues with data from working sources plus a status indicator), and a plugin architecture that makes fixing a broken scraper a small, isolated change rather than a system-wide problem.

Multilingual content is a real challenge. BaFin publishes in German, AMF in French, CNMV in Spanish, while ESMA and EBA publish in English. The RegEvent schema must handle multilingual titles and descriptions without requiring translation. The approach is to preserve original language content and tag it with ISO 639-1 codes, allowing consumers to filter by language. Translation is explicitly out of scope — it adds complexity and error without proportional value for the target users, who are compliance professionals reading in their jurisdiction's language.

Rate limiting and respectful scraping is both a technical and ethical challenge. These are public-interest regulatory websites, not commercial APIs. Aggressive polling could degrade them. The implementation will use configurable per-source polling intervals (hourly minimum), conditional HTTP requests (If-Modified-Since / ETag), and strict robots.txt compliance. For sources like CSSF that provide native RSS, we use the feed directly with no scraping overhead.

Schema evolution is a long-term challenge. Regulators create new publication types, new jurisdictions join (EU candidate countries), and existing categories shift. The RegEvent schema needs a versioning strategy from day one — semver for the schema, with backwards-compatible additions as minor versions and breaking changes gated behind major versions. The schema specification (milestone 1) will include an explicit extension mechanism for community-contributed fields.

Finally, EUR-Lex's CELLAR/SPARQL endpoint, while the most structured source, has its own challenges: complex metadata models (CELEX numbering, ELI identifiers), large result sets for broad queries, and occasionally stale data. The implementation will cache SPARQL results and use incremental date-range queries to stay within performance limits.

**Ecosystem:**

The direct users are EU compliance teams — at fund managers, banks, fintechs, and law firms — who currently track regulatory changes manually or pay six-figure sums to commercial vendors. A JSON feed of regulatory changes that any developer can integrate into their existing tools eliminates a bottleneck that affects thousands of small and mid-size financial firms across Europe.

The secondary audience is the civic tech and transparency community. Regulatory change data is public information — consultations, rules, deadlines — but it is currently inaccessible in any structured form. eu-reg-feed makes it available as open data, enabling journalists, researchers, and civil society organizations to monitor regulatory activity programmatically.

For engagement, the strategy is: publish early and iterate. The RegEvent schema draft will be published for community review before implementation begins, via GitHub Discussions and outreach to OpenRegTech (an existing open-source regulatory technology community). Each NCA aggregator ships independently as soon as it works, so users get value incrementally rather than waiting for a complete system.

The plugin architecture (milestone 6) is critical for sustainability. The EU has 27 member states, each with one or more NCAs. Covering five is a start. The adding-a-new-nca guide and BaseAggregator interface are designed so that a developer familiar with their local NCA can contribute a scraper without understanding the full system. This is how the project scales beyond the funded work.

eu-reg-feed is complementary to open-annex-iv (code 2026-04-087): together, they form a complete open-source regulatory data layer for EU financial services — monitoring IN from regulators and reporting OUT to regulators. Both projects share infrastructure patterns and will cross-reference each other's documentation.

**Attachments:**

