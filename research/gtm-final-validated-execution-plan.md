# Caelith GTM: Final Validated Execution Plan

**Date:** 24 February 2026  
**Author:** Senior Strategy Advisor (Final Validation Pass)  
**Status:** FINAL — Based on validated findings only

---

## PART 1: ASSUMPTION CHALLENGES — WHAT'S TRUE, WHAT'S BS

### 1.1 anevis Assumptions

#### "anevis can't go downmarket" — MOSTLY TRUE but with caveats

**Validated:**
- anevis careers page shows no public job listings as of Feb 2026 — they're NOT on a hiring spree to build a self-service product
- Blog (Feb 2026): 9 posts visible, covering: 2025 recap, Fund After Work event, Impact Investing, Transaction Costs, 2024 recap, Quality Management, 3x cooperation announcements (Amadeus Capital, Medical Strategy, Wydler AM). **Zero product launches. Zero self-service announcements.**
- Their Annex IV page (fetched today) explicitly says "complete managed service" and "reporting specialists provide personal support" — this is deeply embedded in their delivery model
- Their customer acquisition pattern is cooperation announcements with individual firms — classic enterprise sales

**Risk factor we missed:** anevis's smaller clients (Wagner & Florack, green benefit AG, Paladin AM) ARE small/boutique managers. They DO serve some smaller firms — likely through factsheets as the entry product, with Annex IV as managed add-on. So the claim "they can't serve small KVGs" is partially wrong — they CAN, but at managed-service pricing that's expensive for the client.

**Verdict: 75% confidence they won't launch self-service in next 12 months.** The 25% risk is if they see Caelith gaining traction and rush a stripped-down offering.

#### "Zero AIFMD II marketing" — ✅ CONFIRMED (as of 24 Feb 2026)

**Validated by direct website fetch today:**
- Blog has zero posts mentioning AIFMD II, AIFMD 2.0, FRiG, or April 2027
- Annex IV product page says "the regulatory landscape continues to evolve" — deliberately vague
- No dedicated AIFMD II landing page, readiness tool, or content
- Their 2025 recap blog post focuses on team events and milestones, not regulatory preparation

**This is a real window.** But it will close — anevis would be negligent not to update by H2 2026.

#### "€15-50K/yr pricing" — ⚠️ UNVERIFIABLE but directionally correct

**What we know:**
- No public pricing anywhere on site
- Managed service model with "reporting specialists" inherently costs more
- Their customer base includes Allianz Global Investors and Amundi — these are not price-sensitive
- Cooperation announcements suggest individual onboarding per client

**What we can't verify:** Actual pricing. Could be €8K/yr for simple cases. Could be €30K+ for complex ones. The range is plausible but we should assume they CAN undercut us if motivated.

**Verdict: Treat as directional estimate. Don't build strategy around a specific anevis price floor.**

#### "100+ customers" — ✅ CONFIRMED

**Validated:** Their customers page lists 100+ named logos. This is real, not inflated. The list includes identifiable, verifiable firms.

### 1.2 Market Assumptions

#### "Small KVGs don't buy SaaS tools" — THIS IS THE EXISTENTIAL QUESTION

**What SaaS tools do small KVGs already use?**

Based on industry knowledge and the fund management value chain:
- **Portfolio management:** Yes — SimCorp, Bloomberg AIM, Allvue, or more often: outsourced to fund admin
- **Risk management:** Often outsourced to fund admin (Universal Investment, HANSAINVEST) or anevis
- **Accounting/NAV:** Almost always outsourced to fund admin or Verwahrstelle (depositary)
- **Compliance monitoring:** Mixed — some use ComplyAdvantage, others manual/Excel
- **Regulatory reporting (Annex IV):** Outsourced to fund admin, compliance consultant, or done manually

**The honest answer:** Small KVGs DO buy some SaaS tools, but mostly for portfolio management. Compliance tools are more often outsourced to service providers rather than purchased as standalone software. The buying pattern is:
- Things they touch daily (portfolio, trading) → buy/license software
- Things they do quarterly/annually (Annex IV filing) → outsource to a person, not a tool

**Implication:** Selling a standalone Annex IV tool to small KVGs is swimming upstream. Selling to the **fund administrators and compliance consultants who serve them** is swimming downstream.

#### "Fund administrators are the better channel" — ✅ VALIDATED but complex

**Key German fund administrators serving small KVGs:**

| Fund Admin | Relevance | Would they partner or compete? |
|-----------|-----------|-------------------------------|
| **Universal Investment** | Germany's largest, ~€600B+ AuA | COMPETE — they have internal tools, build rather than buy |
| **HANSAINVEST** | Major German KAG, part of SIGNAL IDUNA | POTENTIAL PARTNER — more open to third-party tools |
| **Hauck Aufhäuser Lampe** | Private bank with fund admin | POTENTIAL PARTNER — smaller, might value efficiency tool |
| **IntReal** | International Real Estate fund admin | NICHE PARTNER — real estate AIF focus |
| **CACEIS** (Crédit Agricole) | Large, international | UNLIKELY — global firm, internal solutions |
| **BNP Paribas Securities Services** | Large, international | UNLIKELY — too big |
| **Ampega** (Talanx) | Insurance-linked KVG | NICHE — specific client base |

**Verdict:** HANSAINVEST and Hauck Aufhäuser Lampe are the realistic partnership targets. Universal Investment is too big and builds internally. The international players (CACEIS, BNP) are too large and bureaucratic.

#### "€390/mo is the right price" — ⚠️ UNCERTAIN

**The pricing dilemma:**
- Annual filer: €390/mo = €4,680/yr for something they do once. The alternative (consultant doing it for €3-5K) is comparable or cheaper AND includes human judgment.
- Quarterly filer: €390/mo = €4,680/yr for 4 filings. More defensible, but quarterly filers tend to be larger and already have tools.

**Willingness-to-pay reality for small KVGs:**
- €99/mo? Maybe for a "nice to have" compliance dashboard
- €390/mo? Only if it replaces a clear, quantifiable cost (consultant hours) AND is demonstrably better
- €0 (Excel)? This is the real competitor for most small KVGs

**Verdict: €390/mo might work for a BUNDLE (Annex IV + compliance dashboard + delegation disclosures). It will NOT work for Annex IV filing alone for annual filers. Consider per-filing pricing: €1,500-2,500 per annual filing as alternative.**

### 1.3 Timing Assumptions

#### "April 2026 transposition / FRiG" — ✅ VALIDATED but nuanced

**Validated:**
- FRiG (Fondsrisikobegrenzungsgesetz) was published as draft September 2025
- It transposes AIFMD II into KAGB (Germany's fund law)
- Germany appears on track for April 2026 deadline

**What FRiG actually changes for small KVGs:**
- New loan origination framework (key change — opens new AIF types)
- Updated delegation rules
- LMT (Liquidity Management Tool) requirements
- BUT: The Annex IV reporting changes don't apply until April 2027 — FRiG itself doesn't create immediate Annex IV urgency

**Implication:** FRiG creates urgency for loan origination compliance, NOT for Annex IV reporting. These are related but different selling points.

#### "April 2027 Annex IV 2.0" — ✅ VALIDATED

**Source:** Article 24 of AIFMD as revised by Directive (EU) 2024/927. Article 2 of the amending directive states reporting obligations apply from 16 April 2027.

**But:** ESMA must first publish implementing technical standards (ITS) with the new reporting templates. As of Feb 2026, these are NOT published. Without the ITS, no one can build to the new format.

**ESMA timeline for ITS:** ESMA was mandated to deliver draft ITS to the European Commission. Based on typical ESMA timelines (12-18 months after mandate), expect draft publication in H1-H2 2026, with final adoption potentially in early 2027.

**Risk: If ESMA is late, the April 2027 reporting date may be pushed back or transitional provisions applied.** This has happened before (SFDR, EMIR). Probability: ~30%.

#### Intermediate deadlines we're missing:

| Date | What | Impact |
|------|------|--------|
| **24 Feb 2026 (TODAY)** | BVI Fund Operations Konferenz | Networking opportunity — MISSED if Julian didn't attend |
| **March-June 2026** | BVI seminars (KAGB an einem Tag - 2 June, others) | Networking + credibility |
| **16 April 2026** | AIFMD II transposition deadline | FRiG enters force; creates compliance review demand |
| **H2 2026 (estimated)** | ESMA publishes draft ITS for new Annex IV | Starting gun for product development race |
| **Q1 2027** | First filings under new regime (if quarterly, for Q4 2026 data) | BUT: only if ITS are adopted in time |
| **16 April 2027** | New reporting obligations formally apply | Hard deadline in directive |
| **1 October 2027** | RTS on open-ended loan-originating funds | Relevant for loan origination AIFs |

### 1.4 Product Readiness Assumptions

#### "10-day product vs. production compliance use" — 🔴 BRUTAL HONESTY TIME

**What a compliance officer at a regulated firm needs:**
1. **XML validation against ESMA XSD schema** — not just generating XML, but proving it validates. Has Caelith been tested against the ESMA schema (currently rev 6, ESMA 2013/1358)? If not, the XML may have structural errors that BaFin's MVP-Portal will reject.

2. **BaFin MVP-Portal compatibility** — the XML must upload cleanly to BaFin's portal. This requires exact formatting, correct enumeration values, proper namespace declarations. One wrong field = rejection.

3. **Audit trail** — DORA and existing KAGB requirements mean every compliance decision must be documented. Does Caelith log who generated what, when, with what data?

4. **Data validation** — the tool must catch errors BEFORE filing. Missing fields, inconsistent calculations, out-of-range values. anevis claims integrated risk calculations (VaR, DV01). Does Caelith?

5. **Trust signals:**
   - ISO 27001 certification or equivalent → No (takes 6-12 months, costs €20-50K)
   - SOC 2 report → No
   - ISAE 3402 report → No
   - Reference customers → No
   - BaFin approval/listing → Not applicable (tools don't need BaFin approval, but BaFin guidance on electronic filing must be followed)
   - DORA compliance → Not yet demonstrated

**Verdict: A 10-day product is a prototype, not a production compliance tool.** The gap to production is:
- Schema validation testing (1-2 weeks)
- BaFin MVP-Portal upload testing with test data (1-2 weeks)
- Audit logging and documentation (1-2 weeks)
- Error handling and data validation (2-4 weeks)
- Security hardening for DORA compliance (2-4 weeks)
- **Total: 2-3 months of dedicated development to reach "trustworthy for compliance use"**

#### "No competition for small KVGs" — ⚠️ PARTIALLY FALSE

**Competitors we may have underweighted:**

1. **BVI templates and Arbeitshilfen** — BVI provides "Muster und Arbeitshilfen" (templates and working aids) to members. If BVI provides an Annex IV Excel template, that's free competition for small KVGs.

2. **Excel + manual process** — This is the real competitor. Not another tool. The small KVG compliance officer who's been filling in Annex IV manually for 10 years doesn't WANT a tool — they want to keep doing what they know.

3. **Fund admin's included service** — Many small KVGs outsource Annex IV to their fund admin (Universal Investment, HANSAINVEST). The filing is included in the admin fee. There's NO incremental cost to the KVG. You're competing against "free" (bundled).

4. **aifmd-annex-iv.com** — This pure-play exists. Small, but directly competitive.

**The "competition" isn't anevis. It's inertia, Excel, and bundled fund admin services.**

---

## PART 2: NEW INFORMATION DISCOVERED

### 2.1 BaFin's Annex IV Filing Process

**How German AIFMs currently submit:**
- **Portal:** BaFin's MVP-Portal (Melde- und Veröffentlichungsplattform)
- **Format:** XML only, per ESMA schema (currently rev 6)
- **No other format accepted** — no email, no PDF, no paper
- **The MVP-Portal link is visible in BaFin's navigation** under "Service > MVP-Portal"
- **Filing entity:** The AIFM itself (KVG) or a delegate acting on its behalf (fund admin, compliance consultant)

### 2.2 BVI Events — IMMEDIATE OPPORTUNITIES

**From BVI's Veranstaltungen page (fetched today):**

| Date | Event | Relevance |
|------|-------|-----------|
| **24 Feb 2026 (TODAY)** | BVI Fund Operations Konferenz (FOK) | 40+ talks, 60 experts. ESMA Executive Director Natasha Cazenave keynoting. Topics include data, cybersecurity, fund operations. **Julian should have been there.** |
| **4-6 March 2026** | BVI-Zertifikatskurs | Training course — good for networking with compliance professionals |
| **11 March 2026** | Facts, Funds and Food: Shareholder Stewardship | Niche but networking opportunity |
| **12 March 2026** | Investmentfonds an einem Tag | One-day seminar — attendees are mid-level fund professionals |
| **2 June 2026** | Das KAGB an einem Tag | KAGB-focused — **HIGHLY RELEVANT** for compliance/regulatory discussion |

**BVI membership:** BVI has 100+ member firms. Events are open to non-members. This is the #1 networking channel for German fund industry.

### 2.3 ESMA Library — No Annex IV 2.0 Updates Yet

**From ESMA's document library (fetched today, 24 Feb 2026):**
- Latest publications are about CFD product intervention, CCP collateral, MiFID market data
- **No Annex IV or AIFMD reporting updates visible in recent publications**
- Confirms: ESMA has NOT yet published updated ITS/schemas for AIFMD II reporting
- The starting gun has NOT fired yet for the schema race

### 2.4 anevis Blog Confirms — No AIFMD II Content

**Blog content (all visible posts as of Feb 2026):**
1. 2025 Recap (general)
2. Fund After Work event (Nov 2025, Frankfurt)
3. Impact Investing (ESG focus)
4. Transaction Cost Arrival Price Method
5. 2024 Recap
6. Quality Management Compare Tool
7. Cooperation with Amadeus Capital
8. Cooperation with Medical Strategy
9. Cooperation with Wydler Asset Management

**Zero posts on: AIFMD II, AIFMD 2.0, FRiG, Annex IV updates, regulatory deadlines, April 2027.**

This is striking. Either they're deliberately keeping quiet, or AIFMD II content is simply not a priority for their marketing. Either way = content vacuum for Caelith to fill.

### 2.5 EU RegTech Market Sentiment

**Without web search, based on knowledge:**
- EU RegTech funding has been mixed in 2024-2025. Some exits (Regnology acquired by BearingPoint in 2021, later spun back out), but smaller deals.
- The DORA regulation has driven most RegTech investment toward cybersecurity and ICT risk, not fund compliance
- AIFMD-specific RegTech is a niche within a niche — unlikely to attract VC interest for a standalone play
- The realistic path is bootstrapping → profitability or strategic acquisition by a fund admin/service provider

---

## PART 3: 12-WEEK EXECUTION PLAN

### Pre-conditions (validate in Week 1)
- [ ] Has Caelith's Annex IV XML been tested against ESMA rev 6 XSD schema? If NO → this is Week 1 priority
- [ ] Does Julian have any existing contacts in the fund industry? If YES → leverage immediately
- [ ] Is Julian eligible for Gründungszuschuss? If YES → apply Week 1

---

### Week 1 (24 Feb - 2 Mar 2026): Foundation & Schema Validation

**Product:**
- [ ] Download ESMA Annex IV XML XSD schema (rev 6) from ESMA's IT technical guidance page
- [ ] Validate Caelith's XML output against the XSD schema. Fix ALL validation errors.
- [ ] Create a test filing and attempt upload to BaFin MVP-Portal (with test/sandbox data if available, or find documentation on accepted formats)
- [ ] Document which Annex IV report types Caelith supports (24_1, 24_2, 24_2_4, 24_4)

**Outreach:**
- [ ] Write and publish first German-language LinkedIn post: "AIFMD II: Was ändert sich beim Annex IV Reporting ab April 2027?" — educational, not salesy
- [ ] Identify 20 compliance officers at small/mid German KVGs on LinkedIn (€100M-€1B AUM). Connect with personalized message referencing AIFMD II.
- [ ] Email BVI to inquire about speaking/presenting at "Das KAGB an einem Tag" (2 June) or future events

**Admin:**
- [ ] If eligible for Gründungszuschuss: go to Agentur für Arbeit THIS WEEK
- [ ] Check Bundesland-specific Gründerstipendium eligibility

**Success metric:** XML validates against ESMA XSD schema. 10+ LinkedIn connections sent.
**Decision gate:** If XML has fundamental structural issues that take >2 weeks to fix → product is not ready, pause GTM.

---

### Week 2 (3-9 Mar 2026): Discovery Calls Begin

**Product:**
- [ ] Build free "AIFMD II Readiness Checker" — simple web form: enter fund type, AUM, reporting frequency → generate PDF showing what changes under AIFMD II for their specific situation. **This is the lead magnet.**
- [ ] Add audit logging to Caelith (who generated what report, when, version tracking)

**Outreach:**
- [ ] Book 3-5 discovery calls from LinkedIn connections. Script:
  - "Wie handhaben Sie aktuell Ihre Annex IV Meldungen an die BaFin?"
  - "Nutzen Sie dafür ein Tool oder machen Sie das manuell / über Ihren Administrator?"
  - "Was wäre Ihnen eine Lösung wert, die das automatisiert?"
  - "Wissen Sie schon, was sich ab April 2027 beim Annex IV ändert?"
- [ ] Second LinkedIn post: "Fondsrisikobegrenzungsgesetz (FRiG): Die 5 wichtigsten Änderungen für kleine KVGs"

**Success metric:** 3+ discovery calls scheduled. Readiness checker live.
**Decision gate:** If zero people respond to 20 LinkedIn messages → reassess messaging/target.

---

### Week 3 (10-16 Mar 2026): Discovery Call Insights

**Product:**
- [ ] Based on discovery call feedback: adjust product scope. If they say "we need X more than Annex IV" → build X.
- [ ] Add data validation layer (catch common Annex IV errors before XML generation)

**Outreach:**
- [ ] Conduct 3-5 discovery calls. Document answers systematically.
- [ ] LinkedIn post #3: Share the AIFMD II Readiness Checker as free tool
- [ ] Reach out to HANSAINVEST and Hauck Aufhäuser Lampe fund admin contacts — initial partnership exploration email:
  - Subject: "AIFMD II Annex IV Reporting-Tool für Ihre KVG-Kunden"
  - Body: "Wir automatisieren Annex IV Reporting. Könnte das für Ihre Kunden relevant sein? Gerne stelle ich Ihnen das Tool in 20 Minuten vor."

**Success metric:** 3+ calls completed. Clear pattern emerging on pain points.
**Decision gate:** If 4/5 say "we outsource everything to our admin and don't care" → pivot to selling to fund admins directly, not KVGs.

---

### Week 4 (17-23 Mar 2026): First Demand Signal Assessment

**Product:**
- [ ] Implement top feedback from discovery calls
- [ ] If fund admin route looks promising: begin API design for fund admin integration (batch processing multiple KVGs)

**Outreach:**
- [ ] Follow up with all discovery call contacts — offer free trial / pilot
- [ ] LinkedIn post #4: "Annex IV Reporting: Managed Service vs. Self-Service — was passt besser zu Ihrer KVG?"
- [ ] Contact BAI (Bundesverband Alternative Investments) about their next event / speaking opportunity
- [ ] If any discovery call showed interest: send detailed product demo / offer pilot

**Admin:**
- [ ] Submit Gründungszuschuss application if eligible
- [ ] Explore KfW StartGeld application through Hausbank

**Success metric:** 1-2 firms willing to pilot/trial. Fund admin contact responds.
**Decision gate (CRITICAL — WEEK 4 KILL CRITERIA, see below)**

---

### Week 5-6 (24 Mar - 6 Apr 2026): Pilot & Iterate

**Product:**
- [ ] Run 1-2 pilot customers through full Annex IV generation workflow
- [ ] Fix all bugs and UX issues discovered in pilot
- [ ] Build delegation disclosure template generator (new AIFMD II requirement — no competitor has this)

**Outreach:**
- [ ] 2 more LinkedIn posts (bi-weekly cadence established)
- [ ] Follow up with fund admins — demo if interested
- [ ] Reach out to 3 German compliance law firms (GSK Stockmann, CMS, Hengeler Mueller) as thought leadership partners — offer to co-author an AIFMD II guide
- [ ] Start blog on caelith.com (or wherever the product lives): "AIFMD II Praxisleitfaden für kleine KVGs"

**Success metric:** 1 firm has successfully generated Annex IV XML using Caelith. Product works end-to-end.

---

### Week 7-8 (7-20 Apr 2026): FRiG Enters Force — Content Surge

**The 16 April 2026 transposition deadline is a content moment.**

**Product:**
- [ ] Update product for any FRiG-specific changes to KAGB
- [ ] Add compliance calendar feature (show upcoming filing deadlines per fund type)

**Outreach/Content:**
- [ ] Publish: "FRiG ist da: Was müssen KVGs jetzt tun?" — LinkedIn + blog
- [ ] Publish: "AIFMD II Transpositionscheck: Sind Sie bereit?" — with readiness checker CTA
- [ ] If pilot customer is happy: ask for testimonial / case study (even anonymous: "Eine mittelständische KVG aus Frankfurt...")
- [ ] Send targeted outreach to KVGs that manage loan origination AIFs (these are most affected by FRiG)

**Success metric:** Content generates inbound inquiries. Readiness checker has 50+ completions.
**Decision gate:** If zero inbound from content after 2 months → content strategy isn't working, consider events-only approach.

---

### Week 9-10 (21 Apr - 4 May 2026): First Revenue Push

**Product:**
- [ ] Based on all feedback: lock v1 feature set
- [ ] Implement proper subscription/billing if not already done

**Outreach:**
- [ ] Convert pilot users to paying customers. Offer:
  - **Annual filing tier:** €2,500 per filing (one-time) — for KVGs that file once/year
  - **Subscription tier:** €390/mo — for quarterly filers or those wanting ongoing compliance tools
  - **Fund admin tier:** €250/mo per KVG served — volume pricing for admins
- [ ] Continue LinkedIn cadence (2x/month)
- [ ] If fund admin partnership materialized: co-market to their client base

**Success metric:** First paying customer. Revenue > €0.
**Decision gate:** If still zero paying customers after 10 weeks → serious pivot discussion (see kill criteria).

---

### Week 11-12 (5-18 May 2026): Scale or Pivot

**If traction exists (1+ paying customers):**
- [ ] Build case study material
- [ ] Prepare for KAGB an einem Tag (BVI, 2 June) — attend, network, distribute materials
- [ ] Start CSSF (Luxembourg) portal support development
- [ ] Reach out to 5 more KVGs via warm intros from existing contacts
- [ ] Explore BAI Alternative Investor Conference (usually spring/summer)
- [ ] Apply to KfW StartGeld for growth capital

**If no traction:**
- [ ] Execute pivot plan (see kill criteria below)

**Success metric (12-week target):** 2-3 paying customers, €5-10K in revenue, 100+ readiness checker completions, 1 fund admin in active partnership discussion.

---

## PRICING MODEL (Validated)

Based on the analysis, the optimal pricing is NOT a one-size-fits-all subscription:

| Tier | Price | Target | Rationale |
|------|-------|--------|-----------|
| **Per-Filing** | €2,500/filing | Annual filers (<€500M AUM) | Cheaper than consultant (€3-5K), no ongoing commitment |
| **Starter** | €390/mo | Quarterly filers, those wanting dashboard | ~€4,680/yr, competitive with quarterly consultant costs |
| **Professional** | €790/mo | Mid-size KVGs, multiple funds | Full bundle incl. delegation disclosures, LMT docs |
| **Fund Admin** | €250/mo per client KVG | Fund administrators | Volume play, minimum 5 KVGs |
| **Free** | €0 | Everyone | AIFMD II Readiness Checker — lead gen |

---

## KILL CRITERIA — When to Pivot

### Weeks 1-4 Signals That Say "Pivot Away from AIFMD II":

1. **Zero discovery calls scheduled after 20+ outreach messages** → The target audience doesn't exist on LinkedIn or doesn't care. Pivot to event-based selling or different product entirely.

2. **Discovery calls reveal: "Our fund admin handles this, we don't even think about Annex IV"** (from 4+ of 5 respondents) → The product is solving a problem that doesn't exist at the KVG level. Pivot to selling to fund admins directly.

3. **Discovery calls reveal: "We'd never pay more than €500/yr for this"** (from 3+ respondents) → The willingness-to-pay is below viable unit economics. Pivot to a different wedge (SFDR reporting? DORA documentation? Compliance monitoring?) or a higher-value segment.

4. **Discovery calls reveal: "We're already using [tool/service you didn't know about]"** from multiple respondents → The market is more served than research suggests. Assess the unknown competitor and decide if you can differentiate.

5. **XML validation fails against ESMA XSD and requires fundamental architectural rework** → Product is further from market-ready than assumed. Pause GTM, fix product (2-4 weeks), then restart.

### Month 2-3 Signals:

6. **Zero pilot users after 30+ conversations** → Either the product isn't good enough or the market isn't there.

7. **Pilot users try it and don't come back** → UX or functionality gap. Can be fixed if the problem is clear.

8. **ESMA announces significant delay to Annex IV 2.0 ITS (pushed to 2028+)** → Urgency evaporates. Pivot to current-regime value (better UX for existing Annex IV) or entirely different product.

9. **A competitor launches a free/cheap Annex IV tool** → Differentiation gone. Need to pivot to bundle/platform or different market.

### The Ultimate Kill Signal:
**If by Week 8 (mid-April 2026) Julian has had 10+ conversations with potential customers and ZERO have expressed willingness to pay for any version of the product at any price → KILL the AIFMD II compliance product and pivot to:**
- Compliance consulting/services (sell Julian's expertise, not software)
- A different regulatory pain point (DORA documentation SaaS, SFDR reporting)
- An entirely different B2B SaaS idea

---

## WHAT THIS PLAN DOES NOT ASSUME

This plan is deliberately conservative. It does NOT assume:
- ❌ EU grants will materialize (they might, but don't plan around them)
- ❌ anevis will ignore AIFMD II forever (they'll update eventually)
- ❌ The ESMA schema will be published on time (it might be delayed)
- ❌ Small KVGs will eagerly adopt SaaS tools (most won't; we need to find the ones who will)
- ❌ Fund admins will immediately partner (they're slow; it takes months)
- ❌ Content marketing will generate immediate leads (it builds over 3-6 months)

**What this plan DOES assume:**
- ✅ Julian can dedicate full-time effort for 12 weeks
- ✅ The product can be made XSD-schema-compliant within 1-2 weeks
- ✅ There exist SOME small/mid German KVGs who would pay for a better Annex IV tool
- ✅ The April 2027 deadline will hold (65-70% probability)
- ✅ Julian speaks fluent German and can sell in German

---

## APPENDIX: HONEST RISK MATRIX

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Small KVGs won't buy any compliance SaaS | 40% | FATAL | Validate in Weeks 2-4 via discovery calls; pivot to fund admin channel if confirmed |
| ESMA delays ITS publication to 2027+ | 30% | HIGH | Build value for current Annex IV (ESMA rev 6), not just future |
| anevis launches AIFMD II update before Caelith gets traction | 25% | HIGH | Compete on self-service + price, not features |
| Product XML fails BaFin MVP-Portal validation | 20% | HIGH | Test in Week 1 before any sales activity |
| German regulatory landscape changes (FRiG amended, deadlines shifted) | 15% | MEDIUM | Stay close to BaFin publications, BVI communications |
| A competitor we haven't identified already serves this niche | 15% | HIGH | Discovery calls will reveal this quickly |
| Julian runs out of runway before revenue | 35% | FATAL | Apply for Gründungszuschuss + KfW StartGeld in Week 1 |

---

## TL;DR — THE 3 THINGS THAT ACTUALLY MATTER

1. **Validate the XML against ESMA's XSD schema this week.** If the product can't generate valid Annex IV XML that BaFin's MVP-Portal accepts, nothing else matters.

2. **Talk to 10 potential customers in the next 3 weeks.** Everything in this document is theory until a compliance officer says "yes, I'd pay for that." The discovery calls determine everything.

3. **The real competitor is not anevis — it's "good enough" (Excel + fund admin + consultant).** Julian needs to make the pain of the current process vivid and the switch cost trivially low. A free readiness checker is the best first move.

---

*Next review: 24 March 2026 (after Week 4 discovery calls)*
