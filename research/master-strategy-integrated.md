# Caelith Master Strategy — Integrated GTM + NGI Zero Commons Pipeline

**Date:** 24 February 2026
**Status:** ACTIVE — Execute immediately

---

## The Big Picture

Caelith's strategy has two parallel tracks that reinforce each other:

1. **Revenue track** — Sell compliance SaaS to German KVGs (validated GTM plan)
2. **Funding track** — Build open-source commons infrastructure funded by NGI Zero (up to €500K lifetime)

The open-source work DIRECTLY feeds the commercial product. Every NGI-funded component becomes a Caelith feature AND a community trust signal. The funded projects also give Julian 12+ months of paid development time to build the product and find customers.

---

## NGI Zero Commons Fund — 4-Proposal Pipeline

| # | Project | Ask | Submit | Expected Decision | Status |
|---|---------|-----|--------|-------------------|--------|
| 1 | `annex-iv-tools` — Annex IV XML Generator & Validator | €40K | **April 1, 2026** | July-Aug 2026 | 🔴 WRITING NOW |
| 2 | `eu-regulatory-calendar` — EU Fund Regulatory Deadline Tracker | €18K | June 1, 2026 | Sep-Oct 2026 | 🟡 PREP AFTER #1 |
| 3 | `esma-register-api` — ESMA Public Register Client | €18K | Aug 1, 2026 | Nov-Dec 2026 | ⚪ QUEUE |
| 4 | `aifmd-compliance-rules` — Open Compliance Rule Engine | €30K | Oct 1, 2026 | Jan-Feb 2027 | ⚪ QUEUE |

**Pipeline total: €106K** (within €500K lifetime cap)
**NGI Zero calls: every 2 months** (Feb, Apr, Jun, Aug, Oct, Dec)

---

## Integrated 12-Week Timeline

### WEEK 1 (Feb 24 - Mar 2) — Foundation + Proposal Start

**GTM:**
- [ ] ESMA XSD schema download + validate Caelith's Annex IV XML
- [ ] First LinkedIn post (German): "AIFMD II: Was ändert sich beim Annex IV?"
- [ ] Identify 20 KVG compliance officers on LinkedIn, send connection requests
- [ ] Email BVI about KAGB an einem Tag (2 June)
- [ ] Contact HWR Berlin Gründungszentrum (EXIST application)
- [ ] Follow up on Gründungszuschuss (AfA)

**NGI Proposal #1 (`annex-iv-tools`):**
- [ ] 🔵 Julian: Read Guide for Applicants, FAQ, Eligibility (links in execution plan)
- [ ] 🔵 Julian: Decide license (Apache 2.0), project name, amount (€40K)
- [ ] 🟢 Mate: Draft full proposal text
- [ ] 🟢 Mate: Research existing open-source tools (confirm gap)
- [ ] 🟢 Mate: Extract Annex IV code into standalone library structure
- [ ] 🔵 Julian: Write abstract draft (300-500 words, your voice)

**Grants:**
- [ ] 🔵 Julian: Sign up for Microsoft for Startups, Google Cloud, AWS Activate
- [ ] 🔵 Julian: Email HWR Gründungszentrum re: EXIST

### WEEK 2 (Mar 3-9) — Discovery Calls + Proposal Refinement

**GTM:**
- [ ] Build free AIFMD II Readiness Checker (web form → PDF)
- [ ] Book 3-5 discovery calls from LinkedIn connections
- [ ] Second LinkedIn post: FRiG overview for small KVGs
- [ ] Add audit logging to Caelith

**NGI Proposal #1:**
- [ ] 🟢 Mate: Build proof-of-concept standalone npm package
- [ ] 🔵 Julian: Create public GitHub repo with LICENSE
- [ ] 🔵 Julian: Write ecosystem engagement section
- [ ] 🟡 Both: Review & iterate on draft

**NGI Proposal #2 prep (`eu-regulatory-calendar`):**
- [ ] 🟢 Mate: Start collecting regulatory deadlines from NCA websites (raw research)
- [ ] 🟢 Mate: Design data schema for the calendar dataset

### WEEK 3 (Mar 10-16) — Discovery Insights + Proposal Polish

**GTM:**
- [ ] Conduct 3-5 discovery calls, document answers
- [ ] LinkedIn post #3: Share AIFMD II Readiness Checker
- [ ] Reach out to HANSAINVEST + Hauck Aufhäuser Lampe (fund admin exploration)

**NGI Proposal #1:**
- [ ] 🟢 Mate: Prepare budget attachment (hours × rate per milestone)
- [ ] 🟡 Both: Stress-test every claim against NGI Vision
- [ ] 🔵 Julian: Browse funded projects for tone calibration

### WEEK 4 (Mar 17-23) — KILL GATE + Final Proposal Draft

**GTM — WEEK 4 KILL GATE:**
- [ ] Assess: Of 10+ outreach messages, how many discovery calls? Of calls, how many showed interest?
- [ ] If <3/10 interested → pivot discussion
- [ ] Follow up with all discovery contacts — offer pilot
- [ ] LinkedIn post #4
- [ ] Contact BAI about events

**NGI Proposal #1:**
- [ ] 🔵 Julian: Rewrite proposal in your own voice (final version)
- [ ] 🟢 Mate: Prepare GenAI disclosure log
- [ ] 🟡 Both: Final review

### WEEK 5 (Mar 24-31) — SUBMIT PROPOSAL #1

**GTM:**
- [ ] Continue discovery calls / follow-ups
- [ ] Start pilot with any interested KVGs

**NGI Proposal #1:**
- [ ] 🟡 Final review pass
- [ ] 🔵 **JULIAN: SUBMIT by April 1, 12:00 CEST** at https://nlnet.nl/propose/

**NGI Proposal #2 (`eu-regulatory-calendar`):**
- [ ] 🟢 Mate: Draft proposal text (deadline: June 1)
- [ ] 🟢 Mate: Build prototype dataset (10 countries, key deadlines)

### WEEK 6-7 (Apr 1-13) — Pilot + Start Building Open-Source

**GTM:**
- [ ] Run pilot customers through Annex IV workflow
- [ ] Build delegation disclosure template generator
- [ ] LinkedIn posts continue (bi-weekly)

**Product/Open-Source:**
- [ ] 🟢 Mate: Build `annex-iv-tools` library for real (regardless of grant outcome — we need this anyway)
- [ ] 🟢 Mate: Continue `eu-regulatory-calendar` data collection
- [ ] Publish npm package, start getting GitHub stars

### WEEK 8 (Apr 14-20) — FRiG ENTERS FORCE + Content Surge

**GTM — WEEK 8 KILL GATE:**
- [ ] If 0 paid pilots → serious pivot discussion
- [ ] FRiG transposition deadline April 16 — content moment
- [ ] Publish: "FRiG ist da: Was müssen KVGs jetzt tun?"
- [ ] Push readiness checker CTA

**NGI Proposal #2:**
- [ ] 🔵 Julian: Review `eu-regulatory-calendar` proposal draft
- [ ] 🟡 Both: Iterate

### WEEK 9-10 (Apr 21 - May 4) — First Revenue Push

**GTM:**
- [ ] Convert pilots to paying customers
- [ ] Pricing: €2,500/filing (annual) or €390/mo (quarterly)
- [ ] First case study if any customer is happy

**NGI Proposal #2:**
- [ ] 🔵 Julian: Final rewrite + submit by June 1 deadline

**NGI Proposal #3 prep (`esma-register-api`):**
- [ ] 🟢 Mate: Research ESMA register data structure, explore scraping/API approaches

### WEEK 11-12 (May 5-18) — Scale or Pivot

**If traction:**
- [ ] Build case studies, prep for KAGB conference (June 2)
- [ ] Explore CSSF/Luxembourg portal support
- [ ] Apply KfW StartGeld

**If no traction:**
- [ ] Execute pivot (see kill criteria in gtm-final-validated-execution-plan.md)

**NGI:**
- [ ] July-Aug: Expect decision on Proposal #1
- [ ] If approved → sign MoU, start delivering milestones (get paid!)
- [ ] Continue pipeline: Proposal #3 draft for August 1 deadline

---

## How The NGI Pipeline Feeds Caelith

```
NGI Funded (Open Source)              Caelith Dashboard (Proprietary)
═══════════════════════              ═══════════════════════════════
                                     
annex-iv-tools ──────────────────→  Annex IV Report Generator
  (npm library, €40K)                (uses library internally)
                                     
eu-regulatory-calendar ──────────→  Compliance Calendar Feature
  (open dataset, €18K)               (renders the data beautifully)
                                     
esma-register-api ───────────────→  Auto-populate Fund/AIFM Data
  (npm library, €18K)                (saves manual data entry)
                                     
aifmd-compliance-rules ──────────→  Compliance Monitoring Engine
  (rule definitions, €30K)           (evaluates rules against fund data)
```

**Each open-source project:**
1. Gets funded (€€€ for Julian to live and build)
2. Becomes a Caelith feature (product gets better)
3. Attracts users to the ecosystem (open-source funnel → paid dashboard)
4. Builds credibility ("NGI Zero funded, EU-backed")
5. Creates standards positioning (Caelith = THE reference implementation)

---

## Funding Stack (Conservative → Optimistic)

| Source | Conservative | Optimistic | Timeline |
|--------|-------------|-----------|----------|
| NGI Zero #1 (annex-iv-tools) | €30K | €40K | Aug 2026 - Feb 2027 |
| NGI Zero #2 (regulatory-calendar) | €12K | €18K | Nov 2026 - May 2027 |
| NGI Zero #3 (esma-register-api) | €12K | €18K | Feb 2027 - Aug 2027 |
| NGI Zero #4 (compliance-rules) | €20K | €30K | Apr 2027 - Oct 2027 |
| EXIST Gründungsstipendium | €12K | €35K | May 2026 - May 2027 |
| Gründungszuschuss | €10K | €18K | Apr 2026 - Oct 2026 |
| KfW StartGeld | — | €125K (loan) | Jun 2026 |
| IBB GründungsBONUS | — | €50K | Jul 2026 |
| Cloud credits (MS/GCP/AWS) | $50K | $400K | Mar 2026 |
| **Customer revenue** | €5K | €30K | Sep 2026 - Feb 2027 |
| **TOTAL (12 months)** | **~€101K** | **~€364K + $400K credits** | |

---

## Decision Framework

**If NGI #1 is funded (July-Aug 2026):**
→ Full speed. Deliver milestones. Submit #2 and #3. Build product. Find customers.

**If NGI #1 is NOT funded:**
→ Apply again next round with improved proposal. Meanwhile: EXIST + Gründungszuschuss carry the runway. Continue GTM. The open-source work still happens (it's the product).

**If discovery calls fail (Week 4 kill gate):**
→ Pivot buyer persona (sell to fund admins instead of KVGs). Open-source strategy unchanged — it's buyer-agnostic.

**If everything fails by Month 6:**
→ The open-source portfolio is still a career asset. Julian has NGI-funded projects on his resume, a GitHub portfolio, and HWR enrollment. Worst case: consulting gig using the expertise built.
