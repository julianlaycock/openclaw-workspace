# Infrastructure-First Business Models in Regulated Industries
## Research for Caelith — Feb 2025

---

## 1. API-First Compliance Companies

### The Spectrum: Infrastructure ↔ Application

| Company | Model | Infra or App? | Revenue Model |
|---------|-------|---------------|---------------|
| **Onfido** | Identity verification API | **Infrastructure** — pure API, no end-user UI | Per-verification pricing (~$1-5/check) |
| **Jumio** | Identity verification + orchestration | **Hybrid** — API + dashboard | Per-verification + platform fee |
| **Sumsub** | Full KYC/AML platform | **More app** — heavy dashboard, workflow builder | Tiered SaaS + per-check |
| **Persona** | Identity infrastructure | **Infrastructure** — API-first, embeddable | Per-verification, volume tiers |
| **Alloy** | Identity decisioning | **Infrastructure** — orchestration layer | Platform fee + usage |
| **ComplyAdvantage** | AML data + screening API | **Infrastructure** — data feeds + API | Per-entity screening, data subscriptions |
| **Chainalysis** | Blockchain compliance data | **Infrastructure** — data layer | Enterprise licenses, per-query |

**Key insight:** The most defensible positions are held by companies that own the **data layer** (ComplyAdvantage, Chainalysis) or the **orchestration layer** (Alloy), not those doing single-point verification.

### Moody's / Bureau van Dijk (Orbis)
- **Model:** Entity data as infrastructure. Orbis contains 400M+ company records globally.
- **Monetization:** Annual enterprise licenses ($50K-$500K+), priced by number of users, data coverage, and API call volume.
- **Key moat:** Data completeness + historical depth. Once integrated into compliance workflows, switching cost is enormous.
- **Lesson for Caelith:** Entity data (fund structures, beneficial ownership, regulatory status) becomes infrastructure when it's the authoritative source others build on.

### GLEIF & the LEI System
- **Structure:** Global Legal Entity Identifier Foundation — nonprofit that manages the LEI (Legal Entity Identifier) system.
- **How it works:** LEIs are issued by accredited Local Operating Units (LOUs) like Bloomberg, GMEI Utility. Each LEI costs ~$70-150/year for registration + renewal.
- **Revenue flows:** LOUs charge for issuance/maintenance; GLEIF charges LOUs operational fees. The data itself is **free and open** (golden copy).
- **Infrastructure lesson:** GLEIF doesn't monetize the data — it monetizes the **trust/validation layer**. The data is free; the guarantee that it's accurate is what costs money.
- **Caelith parallel:** Could Caelith's regulatory data (AIFMD classifications, reporting templates) be free, while the validation/filing/compliance guarantee is paid?

### Regulatory Reporting APIs
- **Regnology** (formerly BearingPoint RegTech): Sells regulatory reporting infrastructure to banks. Enterprise license model.
- **Vizor Software:** Regulatory reporting platform for central banks/supervisors. Per-deployment licensing.
- **XBRL/iXBRL service providers** (CoreFiling, Workiva): Filing format infrastructure. Per-report + platform fees.
- **Key gap:** No one has built a true "Stripe for regulatory reporting" — most are enterprise sales, not self-serve API.

---

## 2. Data-as-Infrastructure in Finance

### Bloomberg: Terminal vs Data API

| | Bloomberg Terminal | Bloomberg Data (B-PIPE, BVAL, etc.) |
|---|---|---|
| **Revenue** | ~$24K/user/year | Enterprise contracts, often $100K-$1M+ |
| **Moat** | Network effects, muscle memory, chat | Data exclusivity, integration depth |
| **Defensibility** | HIGH but threatened by cheaper alternatives | VERY HIGH — data is the real asset |
| **Margin** | High but requires hardware/support | Extremely high — pure data licensing |

**Verdict:** The data business is more defensible. Terminals can be replaced; exclusive data feeds cannot. Bloomberg's real moat is being the source of record for bond pricing (BVAL), corporate actions, and reference data.

### Refinitiv / LSEG
- Acquired by LSEG for $27B (2021) — the price tag tells you data infrastructure's value.
- **Eikon** (terminal) = application. **Elektron/RTDS** (data feeds) = infrastructure.
- Pricing: Real-time data feeds priced per-instrument, per-exchange, per-user. Reference data priced per-entity.
- **Infrastructure play:** Refinitiv Datascope and World-Check (PEP/sanctions screening database) — pure infrastructure others build on.

### S&P Global Market Intelligence
- **Capital IQ** = application (terminal/dashboard)
- **Xpressfeed / S&P data feeds** = infrastructure
- **Compustat** = foundational data infrastructure (been running since 1962!)
- Pricing: Annual enterprise licenses, segmented by use case (research vs. trading vs. compliance). Data redistribution rights cost extra.
- **Key model:** "Use-case pricing" — same data costs different amounts depending on what you do with it. Compliance use cases often premium-priced.

### Pricing Models Comparison

| Provider | App Pricing | Data/API Pricing |
|----------|------------|-----------------|
| Bloomberg | Per-seat ($24K/yr) | Per-feed + per-instrument |
| Refinitiv | Per-seat (~$12-22K/yr) | Per-instrument + exchange fees |
| S&P Global | Per-seat + modules | Per-entity + use-case |
| ICE (Intercontinental Exchange) | Per-seat | Per-security + redistribution |

**Lesson for Caelith:** Data infrastructure in finance is priced by: (1) what data, (2) how much, (3) what for, and (4) whether you redistribute it. The "what for" dimension is unique to regulated industries and creates natural price discrimination.

---

## 3. Open-Source-to-Infrastructure Playbooks

### The OSS → Commercial Infrastructure Path

| Company | OSS Project | Commercial Product | Revenue Model | Revenue (approx) |
|---------|------------|-------------------|---------------|-------------------|
| **HashiCorp** | Terraform, Vault, Consul | HCP (HashiCorp Cloud Platform) | Cloud-hosted + enterprise features | ~$600M ARR (2024) |
| **Elastic** | Elasticsearch | Elastic Cloud | Cloud-hosted + security/ML features | ~$1.3B ARR |
| **MongoDB** | MongoDB CE | Atlas (cloud) + Enterprise | Cloud DBaaS + enterprise license | ~$1.8B ARR |
| **Confluent** | Apache Kafka | Confluent Cloud | Cloud-hosted + connectors, governance | ~$800M ARR |
| **Databricks** | Apache Spark | Databricks Platform | Cloud platform + enterprise | ~$1.6B ARR |

### Open Core Model: How It Works

```
┌─────────────────────────────────────┐
│       COMMERCIAL (Paid)             │
│  • Cloud hosting (managed service)  │
│  • Enterprise security (SSO, RBAC)  │
│  • Governance & audit trails        │  ← Compliance features = natural paywall
│  • SLA, support, indemnification    │
│  • Advanced connectors/integrations │
├─────────────────────────────────────┤
│       OPEN SOURCE (Free)            │
│  • Core engine/runtime              │
│  • Basic functionality              │
│  • Community plugins                │
│  • Self-hosted option               │
└─────────────────────────────────────┘
```

### Does Open Core Work?

**Yes, with caveats:**
- Works best when the **managed service** is the real product (Atlas, Elastic Cloud, Confluent Cloud)
- Pure "feature gating" (free vs enterprise features) creates tension with community
- HashiCorp's BSL license switch (2023) shows the model's fragility — OpenTofu fork emerged immediately
- **Best approach:** OSS core creates adoption → cloud service captures revenue → enterprise features for large accounts

### Open Core in RegTech — Does It Exist?

**Barely.** Notable examples:
- **OpenSanctions** — open dataset of sanctions/PEP lists. No commercial layer yet (donation-funded).
- **OCCRP Aleph** — open-source investigative data platform. No commercial version.
- **Sumsub** open-sourced some SDKs but core is proprietary.
- **No major open-core regtech company exists** — this is a whitespace opportunity.

**Why the gap?**
1. Regulatory data is expensive to maintain (requires legal expertise, not just engineering)
2. Compliance buyers are risk-averse — "free" = "unsupported" = "risky"
3. Switching costs in compliance are high, reducing the need for OSS adoption funnels

**Caelith opportunity:** An open-core approach in AIFMD/regulatory reporting could work if:
- Open: Data schemas, taxonomy definitions, validation rules, basic reporting templates
- Paid: Managed filing service, regulatory change monitoring, audit trails, multi-jurisdiction support

---

## 4. Embeddable Compliance

### The "Stripe for X" in Compliance

| Company | What They Embed | Target Customer | Pricing |
|---------|----------------|-----------------|---------|
| **Persona** | Identity verification | Fintechs, marketplaces | Per-verification |
| **Alloy** | KYC/AML decisioning | Banks, fintechs | Platform + usage |
| **Unit21** | Transaction monitoring | Fintechs | Per-transaction |
| **Sardine** | Fraud + compliance | Fintechs, crypto | Per-transaction |
| **Passfort** | KYC orchestration | Banks, wealth mgmt | Per-entity |
| **Flagright** | AML compliance | Fintechs | Per-transaction |
| **Sumsub** | Full KYC suite | Global platforms | Per-verification |

### What "Embedded AIFMD Compliance" Would Look Like

```
Fund Admin / PMS System
    │
    ├── API call: POST /classify-fund
    │   → Returns: AIFMD classification, reporting obligations
    │
    ├── API call: POST /generate-annex-iv
    │   → Body: fund data payload
    │   → Returns: Completed Annex IV XML
    │
    ├── API call: POST /validate-report
    │   → Returns: Validation errors, warnings, regulatory references
    │
    ├── API call: POST /file-report
    │   → Handles: NCA submission, acknowledgment tracking
    │   → Returns: Filing receipt, status webhook
    │
    └── Webhook: regulatory-change
        → Notifies: Template changes, deadline shifts, new requirements
```

**The key insight:** Fund administrators, PMS vendors (SimCorp, Allvue, eFront), and prime brokers would embed this rather than build it. They need compliance **handled**, not a compliance **dashboard**.

### Who Could Caelith Serve as Embedded Infrastructure?

1. **Fund administrators** (Citco, SS&C, Apex) — they do AIFMD reporting for clients but use manual/legacy tools
2. **Portfolio management systems** (SimCorp, Allvue, eFront, Limber) — want to offer compliance as a feature
3. **Prime brokers** — need to support client reporting
4. **Law firms** specializing in fund formation — need to advise on regulatory classification
5. **RegTech aggregators** — platforms that bundle multiple compliance services

---

## 5. Pricing Models for Compliance Infrastructure

### Model Comparison

| Model | Example | Pros | Cons | Best For |
|-------|---------|------|------|----------|
| **Per API call** | Stripe ($0.30 + 2.9%) | Simple, scales with usage | Revenue unpredictable; low-volume clients = low revenue | High-frequency, transactional compliance (KYC checks) |
| **Per entity/record** | Orbis, ComplyAdvantage | Predictable, scales with AUM | Requires maintaining entity data | Entity screening, ongoing monitoring |
| **Per filing/report** | XBRL services ($500-5K/filing) | High per-unit value, clear ROI | Lumpy revenue (quarterly/annual filings) | **Regulatory reporting (AIFMD!)** |
| **Platform + usage** | Twilio, Alloy | Baseline revenue + upside | Complex pricing, harder to sell | Multi-service platforms |
| **Per-seat SaaS** | Bloomberg Terminal | Predictable, high margins | Doesn't scale with value delivered | Dashboard/UI products |
| **Data subscription** | S&P, Refinitiv | Very predictable, high margins | Requires unique data moat | Reference data, regulatory intelligence |

### Recommended Model for Caelith (AIFMD Infrastructure)

**Hybrid: Per-fund base + Per-filing transaction + Regulatory intelligence subscription**

```
┌─────────────────────────────────────────────┐
│  TIER 1: Data & Validation (free/freemium)  │
│  • AIFMD taxonomy/schema access             │
│  • Basic report validation                  │
│  • Regulatory reference data                │
│  → Purpose: adoption, trust, ecosystem      │
├─────────────────────────────────────────────┤
│  TIER 2: Filing Infrastructure ($X/fund/yr) │
│  • Annex IV generation via API              │
│  • NCA submission & tracking                │
│  • Audit trail & compliance records         │
│  • Multi-jurisdiction routing               │
│  → Pricing: €500-2,000 per fund per year    │
├─────────────────────────────────────────────┤
│  TIER 3: Intelligence & Monitoring          │
│  • Regulatory change alerts                 │
│  • Pre-filing risk analysis                 │
│  • Cross-fund analytics                     │
│  • Custom jurisdiction packages             │
│  → Pricing: €10K-50K/year enterprise        │
└─────────────────────────────────────────────┘
```

**Why this works:**
- Per-fund pricing aligns with how asset managers think (cost per fund is a natural unit)
- Filing is the transaction moment — clear value delivery
- Intelligence tier captures the "Moody's model" — ongoing data value
- Free tier creates the adoption funnel (open-core-lite)

---

## 6. Actionable Takeaways for Caelith

### What to copy:

1. **From Stripe:** Developer-first API docs, self-serve onboarding, "start free, pay as you grow"
2. **From Alloy:** Orchestration positioning — don't do one thing, be the layer that connects things
3. **From GLEIF:** Free data, paid trust/validation — open schemas create ecosystem lock-in
4. **From Bloomberg:** "Use-case pricing" — compliance use cases command premium pricing
5. **From Confluent/MongoDB:** Cloud-managed service is the real product, not the software

### What to avoid:

1. **Sumsub's trap:** Building too much UI/dashboard makes you an app, not infrastructure
2. **HashiCorp's trap:** Licensing games that alienate the community (if going open core)
3. **Enterprise-only trap:** If you can only sell via enterprise sales, you'll grow slowly and burn cash

### The Caelith positioning statement:

> **"Caelith is the compliance data layer for alternative investment funds — open schemas, API-first filing infrastructure, and regulatory intelligence that embeds into any fund admin or PMS workflow."**

### Priority moves:

1. **Open the data layer** — publish AIFMD Annex IV schemas, validation rules, NCA endpoint mappings as open source
2. **Build the API** — filing generation and submission as clean REST endpoints
3. **Price per fund** — natural unit for the industry, predictable for buyers
4. **Target fund admins first** — they aggregate demand (one fund admin = hundreds of funds)
5. **Add intelligence later** — regulatory change monitoring becomes the high-margin subscription layer

---

*Research produced Feb 2025. No live web search available — based on domain knowledge. Recommend validating specific pricing figures and checking for new entrants in embedded compliance space.*
