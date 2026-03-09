# Caelith Master Plan: Infrastructure Pivot

**Date:** 2026-02-25
**Status:** APPROVED — Execution started
**Author:** Julian Laycock + Mate

---

## Executive Summary

Caelith pivots from a compliance SaaS dashboard to an **open-core regulatory infrastructure company** for European alternative investment funds. The dashboard remains as a reference implementation and near-term revenue source, while the core value shifts to APIs, data services, and open standards that any system — dashboards, AI agents, fund admin platforms — can build on.

**One-liner:** *Caelith is the compliance infrastructure layer for European alternative investment funds — open schemas, validated filing pipelines, and regulatory data APIs.*

---

## Part 1: Strategic Foundation

### Why Now

1. **AI commoditizes application layers.** We built Caelith's dashboard in 10 days. Anyone with Claude can replicate a compliance UI. The dashboard is not the moat.

2. **AI agents increase infrastructure demand.** An agent doing compliance work needs APIs to validate LEIs, screen sanctions, generate XML, submit filings. Agents replace dashboard users, not the infrastructure dashboards call.

3. **No open-core RegTech exists.** HashiCorp did it for infrastructure, Supabase for databases, PostHog for analytics. Nobody has done it for regulatory compliance. First-mover advantage is real.

4. **Regulatory compliance is uniquely defensible.** Unlike generic SaaS, compliance infrastructure requires:
   - Domain expertise that's hard to encode (29 XSD validation errors we fixed today)
   - Ongoing curation (sanctions lists change daily, regulations quarterly)
   - Regulatory trust (you can't tell BaFin "our AI built it")
   - Standards adoption (network effects once people build on your schemas)

### The Open-Core Model (Clarification: Caelith is NOT a fully open-source company)

**What's open:** Small, focused libraries that drive adoption and credibility. Think Stripe's client SDKs — they're open, but Stripe's infrastructure is proprietary. The open parts are marketing, not the product.

**What's proprietary (and always will be):** The Caelith platform, APIs, dashboard, rule engine, filing pipeline, audit trail, screening service, template generators. This is what we sell.

| Layer | Open Source (adoption funnel) | Proprietary (revenue) |
|---|---|---|
| **Libraries** | open-annex-iv (XML serializer only) | XSD validation engine, filing pipeline, format translation |
| **Schemas** | Annex IV type definitions, basic rule schemas | Rule engine, versioned rule evaluation, audit logging |
| **Data** | — | Managed sanctions screening, regulatory intelligence, LEI enrichment |
| **Filing** | — | BaFin submission pipeline, pre-flight validation, XML generation from fund data |
| **Templates** | — | EMT/EET/EPT generation, auto-fill, CSV/XLSX export |
| **Dashboard** | — | Full SaaS product, all UI, copilot, workflow |
| **APIs** | — | All API endpoints (free tier rate-limited, paid tiers for production) |

**Rule of thumb:** If it helps people *discover* Caelith → open-source it. If it *is* Caelith → keep it proprietary.

### Target Customer Segments

**Segment 1: Small/Mid German KVGs (near-term, dashboard)**
- 3-15 funds, 2-5 person compliance team
- Want a tool they log into
- Buy the dashboard: €990-1,990/mo
- Estimated TAM: ~200 KVGs in Germany

**Segment 2: Fund Administrators (mid-term, APIs)**
- HANSAINVEST, Hauck Aufhäuser, IntReal, etc.
- Serve 50-200 funds each
- Want APIs they embed into existing workflows
- Buy infrastructure: €500-2,000/fund/year
- One deal = €50-200K ARR

**Segment 3: AI Agent Builders / FinTech Developers (long-term, APIs)**
- Building compliance automation tools
- Need reliable compliance APIs
- Buy API access: per-call or monthly subscription
- Network effect: more builders = more adoption = more defensibility

---

## Part 2: Product Architecture (API-First)

### Design Principle
Every feature is an API endpoint first, UI second. The dashboard is a consumer of our own APIs — same as how Stripe's dashboard is a consumer of Stripe's API.

### API Surface (v1)

```
Authentication & Tenant Management
  POST /api/v1/auth/token              → API key authentication
  GET  /api/v1/tenant/info             → Tenant details & usage

LEI Services
  GET  /api/v1/lei/validate/:code      → Validate LEI against GLEIF
  GET  /api/v1/lei/search?q=name       → Search entities by name
  POST /api/v1/lei/bulk-validate       → Batch validation

Sanctions Screening
  POST /api/v1/screening/check         → Screen single entity
  POST /api/v1/screening/bulk          → Screen multiple entities
  GET  /api/v1/screening/sources       → List data sources & freshness

Regulatory Filing
  POST /api/v1/filing/annex-iv/generate      → Generate Annex IV XML from data
  POST /api/v1/filing/annex-iv/validate      → Validate XML against ESMA XSD
  GET  /api/v1/filing/annex-iv/preflight/:id → Pre-check fund data completeness

Regulatory Templates
  GET  /api/v1/templates/emt/:fundId   → Generate EMT
  GET  /api/v1/templates/eet/:fundId   → Generate EET
  GET  /api/v1/templates/ept/:fundId   → Generate EPT

Eligibility Engine
  POST /api/v1/eligibility/check       → Check investor eligibility
  GET  /api/v1/eligibility/rules       → List available rules & frameworks

Audit Trail
  POST /api/v1/audit/record            → Record a compliance decision
  GET  /api/v1/audit/verify/:hash      → Verify audit chain integrity
  GET  /api/v1/audit/export            → Export audit trail

Regulatory Intelligence
  GET  /api/v1/regulatory/feed         → Curated regulatory updates
  GET  /api/v1/regulatory/deadlines    → Upcoming regulatory deadlines
  GET  /api/v1/regulatory/frameworks   → Supported frameworks & versions
```

### Pricing Tiers

**Community (Free)**
- Open-source libraries (npm, pip)
- API: 100 calls/day
- LEI validation, basic screening
- Single fund
- No SLA

**Professional (€990/mo)**
- API: 10,000 calls/day
- Full screening (EU + UN)
- Up to 15 funds
- EMT/EET/EPT generation
- Annex IV filing
- Email support
- 99.5% uptime SLA

**Enterprise (from €3,500/mo)**
- Unlimited API calls
- Custom rule development
- On-premise deployment option
- SSO, audit export
- Dedicated support
- 99.9% uptime SLA
- Priority filing support

**Embedded (custom pricing)**
- For fund admins embedding Caelith APIs
- Per-fund or per-API-call pricing
- White-label option
- Revenue share model available

---

## Part 3: Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2, Feb 25 - Mar 7)
*Build the three core infrastructure features*

| Task | Owner | Status | ETA |
|---|---|---|---|
| GLEIF LEI auto-lookup & validation | Sub-agent | 🔄 Building | Feb 26 |
| EU sanctions screening (free tier) | Sub-agent | 🔄 Building | Feb 28 |
| EMT/EET/EPT template generation | Sub-agent | 🔄 Building | Mar 3 |
| Open-core marketing strategy | Sub-agent | 🔄 Researching | Feb 26 |
| API documentation (Swagger/OpenAPI) | Pending | ⬜ | Mar 5 |
| Landing page update (infrastructure messaging) | Pending | ⬜ | Mar 5 |

### Phase 2: API Layer (Weeks 3-4, Mar 7-21)
*Extract features into clean API endpoints*

| Task | ETA |
|---|---|
| API key authentication system | Mar 10 |
| Rate limiting per tier | Mar 10 |
| Versioned API routes (/api/v1/) | Mar 12 |
| OpenAPI/Swagger documentation | Mar 14 |
| API developer portal (public docs) | Mar 17 |
| Usage metering & dashboard | Mar 19 |
| FundsXML import/export | Mar 21 |

### Phase 3: Go-to-Market (Weeks 5-8, Mar 21 - Apr 18)
*Launch the open-core positioning*

| Task | ETA |
|---|---|
| Publish open-annex-iv v1.0 (not 0.1.0) | Mar 21 |
| GitHub org migration (caelith-tech) | Mar 21 |
| Developer documentation site | Mar 25 |
| Blog: "Why we open-sourced our Annex IV engine" | Mar 25 |
| LinkedIn content series (4 posts) | Mar 25 - Apr 8 |
| Pricing page redesign (free/pro/enterprise/embedded) | Mar 28 |
| Outreach to fund admins (API pitch) | Apr 1 |
| BVI / fund industry event presence | Apr (TBD) |
| API beta launch | Apr 7 |
| AIFMD II enforcement deadline | Apr 16 ← KEY DATE |

### Phase 4: Scale (Weeks 9-12, Apr 18 - May 16)
*Iterate based on feedback, expand data layer*

| Task | ETA |
|---|---|
| XBRL support (Arelle integration) | Apr 25 |
| Self-hosted RAG for regulatory knowledge API | May 1 |
| Regulatory change detection feed | May 8 |
| Fund admin partnership pilot | May 15 |
| Open-source rule definitions | May 15 |

---

## Part 4: Marketing Strategy (Summary)

### Positioning
**Before:** "Caelith — Compliance Platform for EU Fund Managers" (dashboard-first)
**After:** "Caelith — Compliance Infrastructure for European Investment Funds" (infrastructure-first)

The dashboard is still there — it's just not the headline.

### Key Messages
1. **For KVG compliance officers:** "Stop filling EMT templates in Excel. Caelith auto-generates them."
2. **For fund admin CTOs:** "Embed compliance checks into your existing workflow via API."
3. **For developers/AI builders:** "The open-source standard for AIFMD Annex IV reporting."

### Channel Priority
1. **GitHub** — open-source repos as top-of-funnel (developers find you, tell their compliance team)
2. **LinkedIn** — thought leadership for compliance officers and fund industry
3. **Direct outreach** — fund admins (high-value, low-volume)
4. **Content/SEO** — blog posts on AIFMD II, compliance automation, open standards
5. **Industry events** — BVI conferences, Fund Forum, RegTech meetups

### Content Calendar (First 30 Days)
| Date | Content | Channel |
|---|---|---|
| Feb 26 | "ESMA XSD-validated Annex IV XML — now open source" | LinkedIn |
| Mar 3 | "Why we're open-sourcing our compliance engine" (blog) | Blog + LinkedIn |
| Mar 10 | "EMT/EET/EPT: The templates every fund hates filling" | LinkedIn |
| Mar 17 | Developer docs launch | GitHub + LinkedIn |
| Mar 24 | "The case for compliance infrastructure vs. compliance SaaS" | Blog + LinkedIn |

---

## Part 5: Network Effects Strategy

Most compliance tools have zero network effects — you use anevis, I use Excel, neither benefits from the other's choice. That's a problem: no moat beyond switching costs. Here's how Caelith builds real network effects.

### Network Effect 1: Data Network (Strongest — Build When We Have 10+ Customers)

**The more funds on the platform, the better the data gets for everyone.**

- **Anonymized benchmarking:** "Your fund's leverage ratio is in the 72nd percentile among German real estate AIFs." No single KVG can generate this — they need peers on the platform.
- **Regulatory interpretation consensus:** When BaFin publishes a vague circular, the first KVG to interpret it in Caelith creates a template others benefit from.
- **Sanctions signal aggregation:** "This entity has been flagged by 3 other Caelith users" — a signal no individual screening can produce.
- **Template sharing:** One KVG builds a custom compliance rule → others can adopt it.

This is the **Glassdoor model:** Each user contributes data that makes the platform more valuable for all.

**Trigger point:** 10-20 funds on platform. Build aggregation layer + "Your fund vs. market" dashboard widget.

### Network Effect 2: Standard Adoption (Medium-Term — Execute Now)

**If `open-annex-iv` becomes the default Annex IV library, Caelith defines the standard.**

- Push npm adoption: every download is a potential lead
- Fund admins who adopt it create pressure on their KVG clients to use compatible tools
- When ESMA updates the schema, Caelith updates the library first — everyone depends on us
- FundsXML integration creates a two-sided chain: fund admins export → Caelith imports → Caelith exports Annex IV → BaFin accepts. More participants at each end = more valuable chain.

This is the **Linux/Kubernetes model:** Own the standard, monetize the managed service.

**Execute now:** Promote open-annex-iv, publish to npm, write tutorials, present at conferences.

### Network Effect 3: Data Exchange Marketplace (Long-Term)

**Caelith as the connective tissue between fund industry participants.**

- KVGs upload fund data → Caelith generates templates → Distributors consume EMT/EET/EPT
- Currently this exchange happens via email + Excel. If Caelith becomes the pipe:
  - KVGs want to be on Caelith because distributors pull templates from it
  - Distributors want to pull from Caelith because KVGs publish there
  - Two-sided marketplace dynamics

This is the **Plaid model:** Connect financial institutions to each other, charge for the pipe.

**Trigger point:** 3+ KVGs actively generating EMT/EET/EPT. Approach their distributors: "Your fund managers already publish templates through us — want direct access?"

### Network Effect 4: Community Knowledge (Starts Now, Compounds Over Time)

- Copilot learns from anonymized queries: "80% of users asked about Art. 16 LMT requirements this month"
- Regulatory interpretation library: community-validated answers to common compliance questions
- GitHub community: contributors improve open-annex-iv → better product → more users → more contributors

**Execute now:** Engage with every GitHub issue, respond to every question, build relationships.

### Network Effect Priority & Sequencing

| Phase | Network Effect | Prerequisite | Action |
|---|---|---|---|
| Now | Standard adoption | open-annex-iv published | Promote, write content, present |
| Now | Community knowledge | GitHub repos exist | Engage, respond, build relationships |
| Month 3-6 | Data network | 10+ funds on platform | Build benchmarking dashboard |
| Month 6-12 | Data exchange | 3+ KVGs generating templates | Approach distributors |

### The Flywheel

```
Open-source adoption → Developers find us → Tell their compliance team →
KVG signs up for dashboard → Fund data enters platform →
Benchmarking data improves → More KVGs want benchmarks →
Fund admins see adoption → Embed our APIs → More funds on platform →
Distributors want template access → Two-sided marketplace →
(repeat)
```

The open-source libraries are the top of the funnel. The data network is the lock-in. The marketplace is the endgame.

---

## Part 6: Financial Model Impact

### Near-term (Months 1-3): Same revenue, stronger positioning
- Dashboard sales to KVGs continue (€990-1,990/mo)
- Open-source repos drive inbound leads
- LEI/sanctions/templates features increase product value → higher conversion

### Mid-term (Months 4-8): API revenue begins
- First fund admin API customer: €50-200K ARR
- 5-10 KVG dashboard customers: €60-120K ARR
- Grant funding: NGI Zero (€50K) + EXIST (€12-30K) = €62-80K

### Long-term (Months 9-18): Infrastructure economics
- Per-filing revenue: scalable, usage-based
- Data feed subscriptions: recurring, sticky
- Embedded compliance: revenue share with fund admins
- Target: €500K ARR at 18 months

---

## Part 7: Risk Mitigation

| Risk | Probability | Mitigation |
|---|---|---|
| Open-sourcing too much → competitor forks | Medium | Open schemas + rules, keep engine + filing pipeline proprietary |
| Fund admins build in-house after seeing our API | Low | Move fast, build trust, regulatory curation is ongoing work |
| No one uses the open-source repos | Medium | Active promotion, npm publish, conference talks, content marketing |
| AIFMD II deadline slips | 30% | Current Annex IV (Rev 6) is valuable regardless |
| Cash runway runs out before revenue | 35% | EXIST + Gründungszuschuss + NGI grants bridge 12+ months |

---

## Part 8: Success Metrics

### 30-day checkpoints
- [ ] 3 features shipped (LEI, sanctions, EMT/EET/EPT)
- [ ] API documentation published
- [ ] open-annex-iv npm downloads > 100
- [ ] 2+ LinkedIn posts published
- [ ] Landing page updated with infrastructure messaging

### 90-day checkpoints
- [ ] 1+ fund admin in API pilot
- [ ] 3+ KVG dashboard customers
- [ ] 500+ npm downloads for open-annex-iv
- [ ] 10+ GitHub stars across repos
- [ ] API beta with external users
- [ ] Blog with 3+ articles on compliance infrastructure

### 180-day checkpoints
- [ ] 1+ paying API customer
- [ ] €50K+ in committed ARR (dashboard + API)
- [ ] NGI Zero grant approved
- [ ] EXIST Gründungsstipendium active
- [ ] 5+ community contributors to open-source repos

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-02-25 | Pivot to open-core infrastructure | AI commoditizes dashboards; infrastructure retains value |
| 2026-02-25 | Keep dashboard as reference implementation | Near-term revenue from KVGs while building API customer base |
| 2026-02-25 | Open schemas, keep engine proprietary | Adoption without giving away competitive advantage |
| 2026-02-25 | Target fund admins for API sales | 1 customer = 50-200 funds, better unit economics than individual KVGs |
| 2026-02-24 | XSD validation as proprietary moat | Revisit Mar 10 — may open-source validation but keep filing pipeline |

---

*This is a living document. Update as we learn from customer conversations and market feedback.*
