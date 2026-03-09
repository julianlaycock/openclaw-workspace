# Open-Core Marketing Strategy: Caelith

**Regulatory Infrastructure for EU Alternative Investment Funds**
*Created: 2026-02-25*

---

## 1. Positioning Statement

> **Caelith is the open-source regulatory infrastructure layer for EU alternative investment funds.** We give fund managers, administrators, and compliance teams the building blocks to automate AIFMD reporting — starting with free, battle-tested open-source libraries and scaling to a managed compliance platform.

**Tagline options:**
- "Regulatory infrastructure, not another dashboard"
- "The open-source backbone for EU fund compliance"
- "From XML to oversight — regulatory tooling that developers trust and compliance officers rely on"

**Key differentiators:**
1. **Open source first** — `open-annex-iv` and `eu-reg-feed` are Apache 2.0. No vendor lock-in, full auditability (critical in regulated industries)
2. **Developer-native** — npm install, not a sales call. Built by developers for developers
3. **ESMA XSD-validated** — Not a wrapper, not a template. Produces spec-compliant XML that NCAs accept
4. **EU-specialist** — Purpose-built for AIFMD, not a generic compliance tool adapted to Europe

---

## 2. Target Personas

### Persona 1: The Fund Tech Developer
- **Title:** Software engineer / IT lead at a KVG or fund administrator
- **Pain:** Manually building Annex IV XML, maintaining fragile scripts, dealing with ESMA schema changes
- **Discovery:** npm search, GitHub, Stack Overflow, dev blogs
- **Buys:** Doesn't buy — influences. Downloads the OSS, integrates it, then tells their boss about Caelith
- **Content that works:** README quality, tutorials, API docs, "How to generate AIFMD Annex IV XML in 10 minutes"

### Persona 2: The Compliance Officer / Head of Regulatory Reporting
- **Title:** Compliance Manager, Head of Regulatory Reporting at a KVG
- **Pain:** Manual reporting processes, fear of NCA rejections, tracking regulatory changes, audit trails
- **Discovery:** LinkedIn, industry conferences (BVI), peer recommendations, trade publications
- **Buys:** The dashboard/platform. Needs SOC 2, data residency, SLAs, support
- **Content that works:** Case studies, regulatory change summaries, "How KVG X reduced reporting time by 80%"

### Persona 3: The Fund Admin CTO / COO
- **Title:** CTO, COO, or Head of Operations at a fund administrator
- **Pain:** Scaling reporting across 50+ funds, reducing manual effort, client retention through better service
- **Discovery:** Industry events, peer networks, LinkedIn, RFP processes
- **Buys:** Enterprise platform with multi-tenant, white-label, API access
- **Content that works:** ROI calculators, architecture diagrams, security documentation

---

## 3. Marketing Channels Ranked by Expected ROI

| Rank | Channel | Target Persona | Cost | Expected Impact | Timeline |
|------|---------|---------------|------|-----------------|----------|
| 1 | **GitHub + npm** (OSS presence) | Developer | Free | Foundation of everything | Immediate |
| 2 | **LinkedIn** (organic + targeted) | Compliance, CTO | Low | Primary B2B channel for EU finance | 1-3 months |
| 3 | **Technical blog / docs site** | Developer, Compliance | Free | SEO + credibility | 2-6 months |
| 4 | **Cold outreach** (refined) | Compliance, CTO | Low | Direct pipeline | Ongoing |
| 5 | **Industry events** (BVI, RegTech) | All | Medium | Relationship building | 3-6 months |
| 6 | **LinkedIn Ads** (targeted) | Compliance, CTO | Medium | Accelerant once messaging works | 3+ months |
| 7 | **Partnerships** (law firms, auditors) | Compliance, CTO | Free | Warm referrals | 6+ months |
| 8 | **Developer communities** (Reddit, HN) | Developer | Free | Awareness, credibility | Ongoing |

### Channel Details

**GitHub as a marketing channel:**
- README is your landing page. Make it excellent: badges, GIF/video demo, clear install instructions, architecture diagram
- Use GitHub Discussions for community Q&A (creates indexable content)
- GitHub Actions CI badge, npm version badge, download count badge = social proof
- Release notes as content (every release is a marketing moment)
- Star count matters for credibility — ask early users to star

**LinkedIn strategy:**
- This is where German KVG decision-makers live
- Post 2-3x/week: regulatory updates, technical deep-dives, industry commentary
- Julian's personal profile > company page (people follow people in B2B)
- Comment on posts by BVI, BaFin, ESMA accounts
- Connect with compliance officers at every German KVG (there are ~150 relevant ones)

**npm as social proof:**
- Weekly download count displayed on README and website
- Even 50-100 weekly downloads signals "people use this"
- Dependabot/Snyk mentions create passive discovery

---

## 4. Content Strategy

### Content Pillars

1. **Regulatory explainers** — Make AIFMD understandable
   - "AIFMD Annex IV Reporting: The Complete Developer Guide"
   - "What Changes in AIFMD II for Fund Reporting"
   - "Understanding ESMA's Annex IV XML Schema"

2. **Technical tutorials** — Show how to use the tools
   - "Generate AIFMD Annex IV XML with Node.js in 10 Minutes"
   - "Automating Regulatory Reporting with open-annex-iv"
   - "Building a Compliance Pipeline with eu-reg-feed"

3. **Industry commentary** — Position as thought leader
   - "Why Fund Compliance Needs Open Source"
   - "The Hidden Cost of Manual Regulatory Reporting"
   - "Open Source in Regulated Industries: Trust Through Transparency"

4. **Regulatory change alerts** — Recurring, high-value content
   - Quick posts when ESMA updates schemas, BaFin issues guidance, etc.
   - This is where `eu-reg-feed` becomes content marketing itself

### Content Calendar

| Frequency | Type | Platform | Example |
|-----------|------|----------|---------|
| Weekly | Regulatory update / commentary | LinkedIn | "ESMA just updated X — here's what it means" |
| Biweekly | Technical blog post | Blog + dev.to + LinkedIn | Tutorial or deep-dive |
| Monthly | Long-form guide | Blog | Comprehensive regulatory guide |
| Per release | Release announcement | GitHub + LinkedIn + npm | Changelog + impact summary |
| Quarterly | Industry analysis | Blog + LinkedIn | "State of AIFMD Reporting" |

### Where to Publish

- **Primary blog:** On caelith.tech/blog (SEO value, owned platform)
- **Syndicate to:** dev.to (developer reach), LinkedIn articles (B2B reach)
- **Documentation:** Separate docs site or excellent README (this IS the product for developers)

### The "Boring Topic" Advantage

Regulatory compliance is boring — that's your moat. Competition for "AIFMD Annex IV tutorial" is near zero. You can own this search space with 5-10 good articles. In developer marketing for fintech, Stripe proved that making boring infrastructure feel elegant wins. Apply the same principle: make compliance tooling feel modern, well-documented, and developer-friendly.

---

## 5. Community Building Plan

### Reality Check
You're not building the next Kubernetes community. This is niche B2B — the "community" will be small (50-200 people) but incredibly high-value. Each member is a potential $10K-$100K contract.

### Community Architecture

```
Layer 1: GitHub (open to all)
├── Issues & PRs (bug reports, feature requests)
├── Discussions (Q&A, RFC proposals)
└── Contributing guide + good first issues

Layer 2: LinkedIn Group or Newsletter (opt-in)
├── "EU Fund Compliance Engineering" group
├── Regulatory change alerts
└── Industry discussion

Layer 3: Direct relationships (high-touch)
├── Slack/Discord for active contributors
├── Regular calls with power users
└── Advisory board of compliance professionals
```

### Community Tactics

1. **Make contributing easy** — Good first issues, clear CONTRIBUTING.md, fast PR reviews
2. **Celebrate contributors** — Shout out on LinkedIn, contributor page on website
3. **Regulatory office hours** — Monthly LinkedIn Live or Zoom: "Ask us anything about AIFMD reporting"
4. **Open roadmap** — Public GitHub project board. Let users vote on features
5. **Newsletter** — Monthly "EU Regulatory Radar" email. Mix of: regulatory changes, product updates, community highlights

### Metrics for Community Health
- GitHub stars (vanity but signals awareness)
- npm weekly downloads (real usage)
- GitHub issues opened (engagement)
- Newsletter subscribers
- LinkedIn post impressions / engagement rate

---

## 6. Event & Conference Strategy

### Tier 1: Must-Attend (2026)

| Event | Relevance | Action |
|-------|-----------|--------|
| **BVI Annual Conference** (Frankfurt) | Core target audience of German KVGs | Attend, network, consider sponsoring a side event |
| **RegTech Summit** (London/Frankfurt) | RegTech buyers and investors | Attend, aim for a speaking slot on open-source in compliance |
| **Fund Forum International** | Fund admins, service providers | Attend if budget allows |

### Tier 2: Developer Events

| Event | Relevance | Action |
|-------|-----------|--------|
| **Node.js / JS conferences** (EU) | Developer audience | Lightning talk: "Building regulatory infrastructure in TypeScript" |
| **FOSDEM** (Brussels) | Open-source community | Talk in Legal/Policy devroom about open source in regulation |
| **local meetups** (Frankfurt, Munich, Luxembourg) | Developer + finance crossover | Host or speak at fintech/regtech meetups |

### Tier 3: Online Events
- **LinkedIn Live** — Monthly regulatory updates (free, builds audience)
- **Webinars** — "Automating AIFMD Reporting" — co-host with a law firm or auditor
- **Podcast guest appearances** — Target EU fintech/regtech podcasts

### Conference Talk Topics
- "Open Source as a Trust Signal in Regulated Industries"
- "How We Automated AIFMD Annex IV Reporting with 200 Lines of TypeScript"
- "Why Regulatory Infrastructure Should Be Open Source"

---

## 7. Pricing Page Recommendations

### Structure: Three Tiers (following GitLab/Supabase/PostHog patterns)

```
┌─────────────────┬──────────────────┬──────────────────┐
│   OPEN SOURCE    │    PROFESSIONAL   │    ENTERPRISE     │
│     Free         │   €X/fund/month  │   Custom          │
│                  │                  │                   │
│ • open-annex-iv  │ Everything in    │ Everything in     │
│ • eu-reg-feed    │ Free, plus:      │ Pro, plus:        │
│ • Self-hosted    │                  │                   │
│ • Community      │ • Hosted dash-   │ • Multi-tenant    │
│   support        │   board          │ • White-label     │
│ • Apache 2.0     │ • Validation     │ • Custom inte-    │
│                  │   engine         │   grations        │
│                  │ • NCA submission │ • On-premise       │
│                  │   tracking       │   deployment      │
│                  │ • Regulatory     │ • SLA + dedicated  │
│                  │   change alerts  │   support         │
│                  │ • Email support  │ • SOC 2 report    │
│                  │                  │ • Data residency   │
│  [Get Started]   │ [Start Trial]    │ [Contact Sales]   │
└─────────────────┴──────────────────┴──────────────────┘
```

### Pricing Page Best Practices (from PostHog, GitLab, Supabase)

1. **Lead with Free/Open Source** — It's your differentiator. Don't hide it
2. **Per-fund pricing** — Aligns with how KVGs think about costs. Predictable for buyers
3. **Transparent pricing** — Show actual numbers for Professional. "Contact Sales" only for Enterprise
4. **Feature comparison table** — Below the tiers, detailed feature-by-feature comparison
5. **Trust signals on the page:**
   - "Apache 2.0 licensed — audit our code on GitHub"
   - "ESMA XSD-validated"
   - "EU-hosted (Frankfurt)" 
   - Logos of any early customers/users
6. **FAQ section** — Address: "Can I self-host everything?" (Yes, the OSS parts), "What happens if I stop paying?" (You keep the OSS, always), "Where is data stored?" (EU only)

### Open Source as Trust Signal
In regulated industries, open source is a **major advantage**:
- Auditors can inspect the code that generates their XML
- No vendor lock-in = easier procurement approval
- Transparency = trust (critical when submissions go to NCAs)
- Position this prominently: "The engine is open source. Inspect every line that touches your regulatory data."

---

## 8. 90-Day Marketing Roadmap

### Days 1-30: Foundation

| Week | Action | Owner |
|------|--------|-------|
| 1 | Polish `open-annex-iv` README: badges, demo GIF, quick-start, architecture diagram | Julian |
| 1 | Publish package to npm with proper keywords (aifmd, annex-iv, esma, regulatory) | Julian |
| 1 | Set up caelith.tech/blog (can be simple: MDX or Ghost) | Julian |
| 2 | Write + publish: "Generate AIFMD Annex IV XML in 10 Minutes" (blog + dev.to) | Julian |
| 2 | LinkedIn personal profile optimization: headline = "Building open-source regulatory infrastructure for EU funds" | Julian |
| 2 | Connect with 50 compliance/IT people at German KVGs on LinkedIn | Julian |
| 3 | Write + publish: "Why Fund Compliance Tooling Should Be Open Source" (LinkedIn article) | Julian |
| 3 | Set up GitHub Discussions on both repos | Julian |
| 3 | Create a simple pricing page on caelith.tech | Julian |
| 4 | Refine cold email based on responses to first 10. Send next batch of 20 | Julian |
| 4 | Post first "regulatory update" on LinkedIn (find a recent ESMA/BaFin update) | Julian |
| 4 | Submit `open-annex-iv` to relevant awesome-lists, npm collections | Julian |

### Days 31-60: Content + Outreach

| Week | Action |
|------|--------|
| 5 | Publish: "Understanding ESMA's Annex IV XML Schema" (technical deep-dive) |
| 5 | Start weekly LinkedIn posting cadence (2-3x/week) |
| 6 | Reach out to 3 RegTech/fintech podcasts for guest spots |
| 6 | Identify and register for BVI conference / RegTech Summit |
| 7 | Publish: "The Hidden Cost of Manual Regulatory Reporting" (targeting compliance officers) |
| 7 | Launch monthly "EU Regulatory Radar" newsletter (Buttondown or similar) |
| 8 | Cold outreach batch 3 (30 more KVGs/fund admins), now with blog links as social proof |
| 8 | Explore partnership with 1-2 fund law firms (Dentons, Linklaters Frankfurt) — offer to co-author content |

### Days 61-90: Amplify + Convert

| Week | Action |
|------|--------|
| 9 | First LinkedIn Live: "AIFMD Reporting Q&A" (invite connections) |
| 9 | Publish case study if any early user exists (even a "how we built this" post) |
| 10 | Apply to speak at upcoming conferences (FOSDEM, RegTech Summit, Node.js EU) |
| 10 | Launch `eu-reg-feed` publicly (coordinate with NGI Zero grant if approved) |
| 11 | Evaluate: which content performed best? Double down on that format |
| 11 | If any warm leads from cold outreach: schedule demos, begin pilot discussions |
| 12 | 90-day retrospective: review all metrics, adjust strategy |
| 12 | Plan Q2: paid LinkedIn ads if organic is working, first event attendance |

---

## 9. Metrics to Track

### North Star Metrics
| Metric | Tool | Target (90 days) |
|--------|------|-------------------|
| npm weekly downloads (`open-annex-iv`) | npm stats | 100+ |
| GitHub stars (both repos) | GitHub | 50+ |
| Qualified sales conversations | CRM/spreadsheet | 5+ |

### Leading Indicators
| Metric | Tool | Cadence |
|--------|------|---------|
| LinkedIn post impressions | LinkedIn Analytics | Weekly |
| LinkedIn connection acceptance rate | LinkedIn | Weekly |
| Blog page views | Analytics (Plausible/Umami) | Weekly |
| Newsletter subscribers | Email platform | Monthly |
| GitHub issues/discussions opened | GitHub | Monthly |
| Cold email reply rate | Email tracking | Per batch |
| Conference CFP acceptances | Manual | Per submission |

### Conversion Funnel
```
npm install / GitHub clone  →  Blog reader  →  Newsletter subscriber  →  Demo request  →  Pilot  →  Customer
     (developer)               (mixed)          (qualified)             (sales)        (revenue)
```

Track each transition. The open-source funnel is long (3-12 months) — patience is required.

### Benchmarks
- Cold email reply rate: 5-15% is good for B2B
- LinkedIn connection acceptance: 30-50% with personalized notes
- OSS → commercial conversion: 1-5% of active users (industry standard)
- Blog → newsletter: 2-5% conversion rate

---

## Appendix: Lessons from Open-Core Leaders

### HashiCorp
- Built developer love through excellent docs and tooling (Vagrant, Terraform)
- Free tools became industry standard → enterprise features (governance, SSO, audit) drive revenue
- **Lesson for Caelith:** Make the OSS genuinely useful standalone. Enterprise features = governance, collaboration, audit trails

### GitLab
- Radical transparency (public handbook, open roadmap, public metrics)
- Clear Free → Premium → Ultimate tier structure
- **Lesson:** Transparent pricing + public roadmap builds trust in regulated industries

### Supabase
- "Firebase alternative" positioning (defined by what they replace)
- Developer experience is the product
- **Lesson:** Consider "X but open source" positioning: "Regulatory reporting, but open source"

### PostHog
- Generous free tier (90%+ users are free) — builds massive community
- Usage-based pricing aligns cost with value
- Transparent about everything (public metrics, open source)
- **Lesson:** Per-fund pricing = usage-based for fund world. Don't fear free users — they're your marketing team

### Stripe
- Documentation as product. Stripe's docs are famously the best in fintech
- "Increase the GDP of the internet" — mission-driven positioning
- **Lesson:** "Reduce the compliance burden of EU fund management" — your mission. And make your docs Stripe-quality.

---

## Key Strategic Insight

**Your biggest advantage is that no one else is doing this.**

There is no open-source AIFMD Annex IV library. There is no developer-friendly regulatory tooling for EU funds. The competition is enterprise vendors (expensive, closed, slow) and manual Excel processes. You're not competing with another open-source project — you're competing with the status quo.

This means:
1. **SEO is easy** — "AIFMD Annex IV npm" has zero competition
2. **Conference talks are novel** — "Open source meets fund regulation" is a fresh angle
3. **First-mover advantage** — Whoever builds the community owns the space
4. **But the market is small** — ~500 KVGs in Germany, ~3000 in EU. Every relationship matters. This is a high-touch, not high-volume, business.

**Act accordingly:** Quality over quantity. Relationships over reach. Trust over hype.
