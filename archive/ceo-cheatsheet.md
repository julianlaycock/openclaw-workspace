# 🎯 CEO CHEAT SHEET — Julian Laycock, Caelith

**Two meetings. One mission. Know everything.**
- 📅 **Fri Feb 27** — HTW Berlin (EXIST Gründungsstipendium)
- 📅 **Tue Mar 2, 10:30 CET** — Finch Capital (Eugenie Colonna-Distria)

---

## 1. ELEVATOR PITCH (30 seconds)

Caelith is the compliance infrastructure layer for European alternative investment funds. We turn the manual, error-prone process of AIFMD regulatory reporting — which costs fund managers €150-200K per year — into automated, XSD-validated API calls. With the AIFMD II enforcement deadline hitting April 16, 2026, and 47% of fund managers unprepared, we're building the open-core compliance stack that both human teams and AI agents will rely on to file, screen, validate, and audit.

💬 **Say this:** *"We're doing for EU fund compliance what Stripe did for payments — infrastructure that makes the hard stuff a single API call."*

---

## 2. THE PROBLEM

**What is AIFMD II?** The EU's updated rulebook for anyone managing alternative investment funds (hedge funds, real estate, private equity, infrastructure). It rewrites reporting requirements, adds delegation disclosures, mandates liquidity management tools, and expands Annex IV reporting data points.

**The deadline:** April 16, 2026. Member states must transpose it into national law. Germany's version (FRiG — Fondsrisikobegrenzungsgesetz) amends KAGB. Miss compliance → fines, license risk, investor lawsuits.

**How it's done today:**
- Compliance officers manually fill XML or Excel templates (15-30 hours per filing)
- Consultants charge €3,000-5,000 per filing, or €150-200K/year for ongoing compliance
- Fund admins bundle it into admin fees but with zero transparency
- Errors get rejected by BaFin's MVP-Portal — no pre-validation exists

**The gap:** 47% of fund managers report they are not ready for AIFMD II (industry surveys). The new regime is 3x more complex: more data points, new sections, stricter validation.

💬 **Say this:** *"Right now, a compliance officer at a small German KVG spends two days filling in an XML template by hand. One typo and BaFin rejects the filing. We eliminate that entire process."*

---

## 3. THE PRODUCT — Feature by Feature

### 3.1 Rules Engine
- **What:** 13 compliance rules across 6 regulatory frameworks (KAGB, AIFMD, MiFID II, SFDR, DORA, AML), evaluated in real-time against fund and investor data
- **Why it matters:** Automated eligibility checking replaces manual checklists — catches violations before they happen
- **Under the hood:** Each rule is a typed function evaluating against fund metadata + investor profiles. Results include pass/fail + decision explanation + regulatory citation. Evaluation is deterministic and auditable.
- 💬 *"Our rules engine evaluates 13 compliance rules in real-time — an investor's eligibility is checked against KAGB, AIFMD, MiFID II, and AML simultaneously, with full audit trail."*

### 3.2 Cryptographic Audit Trail
- **What:** Every compliance decision is recorded with a SHA-256 hash chained to the previous entry — creating a tamper-evident log
- **Why it matters:** DORA and KAGB require documented, audit-proof compliance decisions. Regulators can verify no record was altered after the fact.
- **Under the hood:** Each `decision_record` entry hashes the decision payload + previous hash, creating a blockchain-like chain. Any modification breaks the chain. Immutability enforced at DB trigger level.
- 💬 *"Every compliance decision in Caelith is cryptographically hash-chained. If a regulator asks 'show me the decision trail,' we can prove no record was tampered with — mathematically."*

### 3.3 Annex IV XML Reporting
- **What:** Generates fully structured AIFMD Annex IV XML, validated against ESMA's official Rev 6 XSD schema (AIFMD_DATAIF_V1.2.xsd)
- **Why it matters:** This is the actual filing format BaFin's MVP-Portal accepts. Invalid XML = rejected filing.
- **Under the hood:** Serializer maps fund data → 200+ XML fields, handles all report types (24_1, 24_2, 24_2_4, 24_4), applies `noNamespaceSchemaLocation`, validates against downloaded ESMA XSD before export. 29 validation errors found and fixed during development.
- 💬 *"We're one of the only tools that validates Annex IV XML against ESMA's actual XSD schema before you file. We found and fixed 29 schema errors that would have been rejected by BaFin."*

### 3.4 Sanctions Screening
- **What:** Screens entities against 6,863 EU + UN sanctioned persons/organizations using fuzzy name matching
- **Why it matters:** AML screening is mandatory before investor onboarding. Missing a match = regulatory breach + potential criminal liability.
- **Under the hood:** Parses EU consolidated sanctions XML + UN sanctions list into PostgreSQL. Uses `pg_trgm` (trigram matching) for fuzzy name comparison — catches transliteration variants, typos, aliases. Similarity threshold configurable.
- 💬 *"We screen against 6,863 EU and UN sanctioned entities with fuzzy matching — so 'Vladimir' still matches 'Wladimir.' It runs in milliseconds, not days."*

### 3.5 LEI Verification
- **What:** Validates Legal Entity Identifiers in real-time against the GLEIF (Global LEI Foundation) API
- **Why it matters:** Invalid LEIs in Annex IV filings get rejected. LEIs expire, entities merge, statuses change.
- **Under the hood:** Calls GLEIF's free API, caches results, validates format (20-char alphanumeric + checksum), checks entity status (active/inactive/merged). Auto-populates entity name and registration details.
- 💬 *"Every LEI in your filing is validated against the global GLEIF database in real-time. No more rejected filings because an LEI expired three months ago."*

### 3.6 EMT/EET/EPT Template Generation
- **What:** Auto-generates European MiFID Template, ESG Template, and PRIIPs Template with 43+ fields pre-filled from fund data
- **Why it matters:** Distributors require these templates to sell funds. Today, compliance teams fill them manually in Excel — error-prone and time-consuming.
- **Under the hood:** Maps fund metadata (NAV, fees, risk profile, ESG classification) to standardized template fields. Exports as CSV/XLSX. Covers FinDatEx specifications.
- 💬 *"EMT, EET, EPT — the three templates every distributor demands and every compliance officer hates filling. We auto-generate all three from your fund data."*

### 3.7 Compliance Copilot AI
- **What:** AI assistant that answers regulatory questions in context, with locale-aware terminology (80+ terms in EN/DE) and live database access
- **Why it matters:** Compliance officers can ask natural language questions and get answers grounded in their actual fund data — not generic ChatGPT responses.
- **Under the hood:** Tool-use architecture on Claude Haiku. 16-table SQL allowlist prevents data leakage. Prompt injection defense. Queries live fund, investor, LMT, delegation, and readiness data. Context-sanitized — no PII leaves the system. ~€0.02 per question.
- 💬 *"Ask our Copilot 'Are we compliant with Article 16 LMT requirements?' and it checks your actual fund data, counts your liquidity management tools, and tells you exactly what's missing."*

### 3.8 XSD Validation
- **What:** Pre-submission validation of generated XML against ESMA's official XSD schema
- **Why it matters:** Catches structural errors before filing — no more BaFin rejections.
- **Under the hood:** Downloads ESMA Rev 6 schema files, runs full schema validation on generated XML, reports line-level errors with human-readable descriptions. This is the validation layer that took 29 iterations to perfect.
- 💬 *"We validate your XML against the exact same schema BaFin uses. If it passes our check, it passes theirs."*

### 3.9 Developer API
- **What:** Full REST API with OpenAPI/Swagger documentation, versioned routes (/api/v1/*), API key authentication
- **Why it matters:** Fund administrators can embed Caelith's compliance checks into their own workflows — no dashboard needed.
- **Under the hood:** API key auth (`ck_live_` prefix, bcrypt hashed), tiered rate limiting (free/pro/enterprise), backward-compatible versioning. Swagger docs at `/api/docs`. Every dashboard feature is an API endpoint first.
- 💬 *"Fund admins don't want another dashboard — they want APIs. Ours are documented, versioned, and production-ready. One integration serves all their KVG clients."*

### 3.10 AIFMD II Readiness Check
- **What:** Free 24-question assessment tool on the website — enter fund details, get a gap analysis showing exactly where you're not AIFMD II compliant
- **Why it matters:** Lead generation + value-first positioning. Compliance officers share it internally, creating organizational awareness.
- **Under the hood:** 8 categories, scoring algorithm, generates specific recommendations per fund type and size. No signup required — accessible at www.caelith.tech.
- 💬 *"We give away a free readiness check on our website. 24 questions, 5 minutes, and you know exactly where your gaps are. No signup, no sales call."*

### 3.11 Open Source Core (open-annex-iv)
- **What:** Apache 2.0 licensed Annex IV XML serialization library on npm — 179 tests, CI pipeline, XSD-validated
- **Why it matters:** Builds credibility and adoption in the developer community. Developers find us → tell their compliance teams → become customers.
- **Under the hood:** TypeScript library, exports serializer functions for all Annex IV report types. Published as `open-annex-iv` on npm. GitHub Actions CI across Node 18/20/22. The library serializes; the proprietary platform validates, files, and audits.
- 💬 *"We open-sourced the serialization layer — it's on npm with 179 passing tests. The validation engine, filing pipeline, and audit trail are what you pay for."*

### 3.12 Compliance Calendar
- **What:** Tracks all regulatory deadlines — BaFin filing dates, ESMA submissions, AIFMD II milestones
- **Why it matters:** Missing a deadline is the #1 preventable compliance failure.
- **Under the hood:** Curated regulatory deadline database, per-fund-type filtering, notification triggers. Integrated into dashboard sidebar.
- 💬 *"Every deadline that matters to your funds, in one calendar. No more 'we forgot the quarterly filing was due Friday.'"*

---

## 4. COMPETITIVE POSITIONING

| | anevis solutions | Big 4 / Consultants | Fund Admin (bundled) | Excel | **Caelith** |
|---|---|---|---|---|---|
| **Model** | Managed service | Advisory | Included in fees | DIY | Self-service SaaS + API |
| **Price** | €15-50K/yr | €150-200K/yr | "Free" (bundled) | Free | €990-3,500/mo |
| **Self-service** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **AIFMD II ready** | No marketing | Slow | Eventually | Never | ✅ Purpose-built |
| **Small KVG fit** | ❌ Too expensive | ❌ Too expensive | ⚠️ No control | ⚠️ Error-prone | ✅ |
| **API for fund admins** | ❌ | ❌ | N/A | ❌ | ✅ |

**Our moat:**
1. **XSD validation pipeline** — 29 errors found and fixed; hard to replicate without deep schema expertise
2. **Open-core model** — npm adoption drives awareness; proprietary engine drives revenue
3. **API-first architecture** — every feature is an API endpoint; fund admins embed us, not use us
4. **Speed** — solo founder ships in weeks what enterprises ship in quarters

💬 **Say this:** *"anevis is a great managed service for enterprise. We're the self-service infrastructure play for everyone else — and for the fund admins who serve them."*

---

## 5. BUSINESS MODEL & PRICING

| Tier | Price | For Whom | Includes |
|---|---|---|---|
| **Professional** | €990/mo | Small KVGs (≤3 funds) | Dashboard, Annex IV, screening, templates |
| **Business** | €1,990/mo | Mid KVGs (≤15 funds) | + API access, priority support |
| **Enterprise** | From €3,500/mo | Fund admins, large KVGs | Unlimited, custom rules, SSO, SLA |

**Open-core economics:** Open schemas + libraries (adoption funnel) → Paid managed pipeline + APIs + audit trail + SLA (revenue)

**Segments:**
- **Near-term:** German KVGs (dashboard buyers, €990-1,990/mo)
- **Mid-term:** Fund administrators via API (1 deal = €50-200K ARR — they serve 50-200 funds each)
- **Long-term:** AI agent builders consuming compliance APIs

**Frame:** *"93% cheaper than Big 4 consultants. And it works at 3am on filing deadline day."*

---

## 6. TRACTION & PROOF POINTS

- ✅ **Live product** at www.caelith.tech — no signup needed for demo
- ✅ **12 production features** deployed and working
- ✅ **open-annex-iv** on npm — 179 tests, CI, XSD-validated, Apache 2.0
- ✅ **AIFMD II Readiness Check** live as lead gen tool
- ✅ **HWR Berlin Startup Incubator** — accepted
- ✅ **Lanzadera Accelerator** (Valencia) — supported, positive feedback
- ✅ **Security audit grade: A-** — bcrypt, httpOnly, CSP, parameterized SQL, PII stripping
- ✅ **GDPR grade: A** — Art. 15/17/20 endpoints, AVV, TOM, breach procedure
- ✅ **5 KVG outreach emails sent** — pipeline building
- ✅ **Railway EU deployment** (Amsterdam) — GDPR-compliant hosting
- ✅ **Pitch deck v2** ready, financial model built

---

## 7. MARKET OPPORTUNITY

- **€1.8T** in EU alternative investment fund assets under management
- **~200 KVGs** in Germany alone (BaFin-registered)
- **47%** of fund managers report being unprepared for AIFMD II
- **April 16, 2026** — enforcement deadline = forcing function
- **EU transposition fragmented** — Germany (FRiG), Luxembourg, Spain, etc. each create entry windows
- **Germany-first strategy** — KAGB, BaFin, FoMaStG → expand to CSSF Luxembourg → Southern EU via Lanzadera

**Market sizing:**
- 200 KVGs × €15K avg annual spend = **€3M German TAM** (dashboard)
- Top 10 fund admins × €100K avg API deal = **€1M near-term** (API)
- EU-wide (3,500+ AIFMs) = **€50M+ TAM**

---

## 8. THE ASK

### 🏫 For HTW Berlin — EXIST Gründungsstipendium (Feb 27)

**What EXIST provides:**
- €1,000-2,500/mo personal stipend for 12 months
- €10,000 for materials/equipment
- €5,000 for coaching
- University infrastructure + credibility

**What Julian needs from HTW:**
- Academic mentor/supervisor willing to support the application
- Formal enrollment path for SS2026 (summer semester)
- Letter of support from the university

**Why Caelith qualifies:**
- ✅ Innovative technology product (open-core compliance infrastructure — novel in RegTech)
- ✅ Clear market need (AIFMD II deadline, 47% unprepared)
- ✅ Solo founder with domain expertise (fintech, regulatory, full-stack engineering)
- ✅ Working prototype with production features live
- ✅ Already supported by HWR Berlin + Lanzadera

💬 **Say this:** *"I have a live product, a validated market, and a clear revenue model. What I need from HTW is academic grounding and the structured support EXIST provides to turn this into a sustainable company."*

**Tone:** Humble but prepared. Show the product is real, not just an idea. Emphasize academic relevance (RegTech, financial regulation, software engineering).

---

### 💰 For Finch Capital (Mar 2, 10:30 CET)

**Context:** They said "too early" but want to learn about the product. Eugenie Colonna-Distria — investment team.

**Goal:** Build relationship. Demonstrate depth. Get feedback + intros. Do NOT ask for money.

**Finch invests in:** Fintech, financial infrastructure, B2B software. Caelith = compliance infrastructure → perfect thesis fit.

**Strategy:**
1. Walk through the product (live demo at www.caelith.tech)
2. Explain the infrastructure pivot — APIs for fund admins, not just a dashboard
3. Ask: *"What milestones would make Caelith interesting for Finch?"*
4. Ask: *"Who in your network should I be talking to?"*

💬 **Say this:** *"I know we're early for a Finch investment. I'm here because you understand financial infrastructure deeply, and I'd love your honest feedback on our positioning. And if you know fund admins or compliance teams who'd benefit from what we're building, I'd value those introductions."*

**Tone:** Confident but not arrogant. Technically credible. Show you understand you're pre-revenue and own it.

---

## 9. OBJECTION HANDLING

| Objection | Response |
|---|---|
| **"Isn't this just a dashboard?"** | "The dashboard is a reference implementation. The core product is the API infrastructure — filing pipelines, validation engines, screening services. Fund admins don't want dashboards; they want APIs they embed. That's where the real value and scale lives." |
| **"How is this different from anevis?"** | "anevis is a managed service for enterprises — you email them, they do the work, you pay €15-50K. We're self-service infrastructure at 10x lower cost. Different customers, different model. They're Accenture, we're AWS." |
| **"Do KVGs even buy software?"** | "The real competitor isn't another tool — it's Excel and inertia. But AIFMD II changes the math: 3x more data points, stricter validation, new sections. Excel doesn't scale. And the April 2026 deadline forces action." |
| **"Solo founder risk"** | "Valid concern. That's why I'm pursuing EXIST for structured support, HWR for academic backing, and building open-core — the community becomes the team. Plus, Lanzadera is behind us." |
| **"Too early for us" (VC)** | "Completely understand. What specific milestones — revenue, customers, product — would make us interesting for a future conversation?" |
| **"What about risk calculations?"** | "anevis integrates VaR/DV01 — we don't yet. But AIFMD II's new requirements are delegation disclosures, LMT documentation, and loan origination reporting. Those are our focus. Risk calc is Phase 2." |
| **"Will ESMA delay the deadline?"** | "~30% chance of delay. But even current Annex IV (Rev 6) is manual and painful. We solve today's problem AND tomorrow's. No wasted investment either way." |

---

## 10. KEY DATES & DEADLINES

| Date | Event | Action |
|---|---|---|
| **Feb 27 (Fri)** | 🏫 HTW Berlin — EXIST call | Ask for mentor + enrollment path |
| **Mar 2 (Tue) 10:30** | 💰 Finch Capital — Eugenie | Demo + relationship + ask for intros |
| **Mar 5 (Wed)** | 📋 BAfA Gründungszuschuss meeting | DO NOT register Freiberufler before this |
| **Apr 16, 2026** | ⚖️ AIFMD II enforcement deadline | FRiG enters force in Germany |
| **H2 2026** | 📄 ESMA publishes new Annex IV ITS | Starting gun for schema race |
| **Apr 16, 2027** | 📊 New reporting obligations apply | Hard deadline for updated filings |

---

## 11. THE INFRASTRUCTURE PIVOT — APIs for Fund Admins

### The Shift: Dashboard SaaS → Compliance Infrastructure

Every AI company can build a dashboard. Infrastructure retains value. Think Stripe: merchants never see Stripe's dashboard — they use the API. The dashboard is a demo. The API is the business.

Caelith's pivot: stop selling a compliance dashboard and start selling **compliance infrastructure** that fund admins embed into their own systems.

### What Goes Through the API

Four real endpoints, each replacing weeks of manual work:

```
POST /api/v1/annex-iv/generate
→ Send fund data, get XSD-validated Annex IV XML back.
  What took 2 weeks of manual work now takes 2 seconds.

POST /api/v1/sanctions/screen
→ Send a name, get fuzzy match results against 6,863 EU + UN entities.
  Milliseconds, not days.

GET /api/v1/lei/validate/{LEI}
→ Validate any LEI's status against GLEIF in real-time.
  No more rejected filings from expired identifiers.

POST /api/v1/templates/emt
→ Send fund metadata, get a fully filled European MiFID Template.
  Covers EMT, EET, and EPT.
```

### Why Fund Admins Care

Fund administrators manage **50-200 fund clients** each. They do the same compliance work 200 times. One API integration serves all their clients instantly.

- What took a compliance team **2 weeks** per fund now takes **2 minutes**
- One fund admin deal = **€50-200K ARR**
- They already have the client relationships — they just need the engine

### What They Have vs What We Provide

| What Fund Admins Have | What Caelith Provides |
|---|---|
| Excel templates, manual XML editing | Validated XML generation via API |
| Outsourced sanctions checks (slow, expensive) | Real-time fuzzy screening endpoint |
| Manual LEI lookups on GLEIF website | Programmatic LEI validation |
| Compliance officers filling EMT/EET/EPT by hand | Auto-generated templates from fund data |
| No audit trail across clients | Cryptographic audit log per API call |
| Each client handled individually | One integration, all clients served |

### Why Defensible

1. **Schema expertise** — 29 XSD errors found and fixed. This knowledge is hard-won and hard to replicate.
2. **Open-core flywheel** — open-annex-iv on npm drives developer adoption → developers become API customers → API revenue funds more open-source work.
3. **Switching cost** — Once a fund admin integrates our API into their pipeline, ripping it out means re-engineering their entire compliance workflow.

💬 **Say this:** *"The dashboard is our reference implementation — it proves the engine works. The real business is the API layer. A fund admin integrates once and serves all their clients through us."*

---

## QUICK REFERENCE CARD

```
COMPANY:    Caelith — compliance infrastructure for EU fund managers
PRODUCT:    Open-core platform: APIs + dashboard for AIFMD II compliance
PRICING:    €990 / €1,990 / €3,500+ per month (93% cheaper than consultants)
MARKET:     €1.8T EU AIF AUM, 200+ German KVGs, 47% unprepared
MOAT:       XSD validation pipeline, open-core adoption, API-first
STAGE:      Pre-revenue, live product, production features deployed
URL:        www.caelith.tech
OPEN SOURCE: open-annex-iv on npm (Apache 2.0, 179 tests)
SUPPORT:    HWR Berlin Incubator + Lanzadera Accelerator
```

---

*Last updated: Feb 26, 2026. Designed to be read on your phone before walking into the room.*
