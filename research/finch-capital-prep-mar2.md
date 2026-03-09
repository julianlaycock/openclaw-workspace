# Finch Capital Call Prep — Monday March 2, 10:30 CET

**Contact:** Eugenie Colonna-Distria
**Context:** They said "too early" but want to learn about the product. This is relationship-building, not a pitch for a check.

---

## The Updated Narrative (with Sphinx Angle)

### 30-Second Opener
"We're building the compliance infrastructure layer for European fund managers — think regulatory intelligence plus autonomous filing agents. Sphinx just raised $7.1M doing this for US fintechs with AML/KYC. We're applying the same thesis to EU fund compliance — a market with 700+ KVGs in Germany alone, all facing an April 16 AIFMD II deadline, and zero automated solutions."

### The 3-Sentence Story
1. **The problem:** European fund managers spend thousands of hours per year on regulatory reporting — manually generating XML files, uploading them to government portals, screening investors against sanctions lists, and compiling due diligence reports. It's all manual, error-prone, and absurdly expensive.
2. **What we built:** A compliance platform with 60+ API endpoints — XSD-validated Annex IV XML generation, sanctions screening (6,863 entities), investor classification, regulatory intelligence. What takes a compliance officer 2 hours in Excel runs in 30 seconds.
3. **Where we're going:** Autonomous compliance agents that don't just generate reports — they file them directly with regulators (BaFin, CSSF), run continuous investor screening, and compile due diligence reports automatically. The dashboard is the brain. The agents are the hands.

---

## The Sphinx Reference (USE THIS)

> "You may have seen Sphinx raised $7.1M two weeks ago from Cherry Ventures and YC for browser-native compliance agents. They automate AML/KYC for US fintechs and banks. We're doing the same thing for EU fund compliance — AIFMD reporting, Annex IV filing, investor due diligence. Same thesis, completely different vertical, zero overlap. They validated the category. We're building the European fund version."

**Why this works:**
- References a recent, credible raise ($7.1M, Cherry Ventures, YC)
- Makes Caelith legible as a category ("the Sphinx for X")
- Shows market awareness and strategic clarity
- Differentiates clearly (no competition narrative)

---

## Anticipated Questions + Answers

### "What does Caelith do?"
"Compliance infrastructure for European fund managers. We automate Annex IV regulatory reporting, investor classification, and sanctions screening. What takes compliance teams hours of manual Excel work runs in seconds through our platform. And we're building autonomous agents that will file reports directly with regulators like BaFin — nobody does this today."

### "How far along are you?"
Be honest: "Pre-revenue. 60+ API endpoints live, XSD-validated XML that passes ESMA schemas, live sanctions screening. Applied to Campus Founders accelerator. We built the full product in 10 days and have been hardening it for 3 months. Now focused on getting first customers and building the agent layer."

### "Who's on the team?"
"Solo founder, technical CEO. I built the entire platform — frontend, backend, 60+ endpoints, regulatory knowledge base. Lean and fast. Looking for a technical co-founder with compliance domain expertise as we scale."

### "How big is the market?"
"700+ KVGs (capital management companies) in Germany alone, registered with BaFin. Luxembourg has hundreds more through CSSF. At €990-3,500/month per customer, Germany alone is a €8-30M ARR opportunity. Fund administrators are the multiplier — one deal with a fund admin managing 50 funds could be €50-200K ARR."

### "Why now?"
"AIFMD II enforcement hits April 16 — 45 days from now. Every fund manager in Europe needs to comply with expanded reporting requirements. Norway just mandated XML-only Annex IV submissions from June 2026. The regulatory pressure is creating a forcing function, and there's no automated solution in the market for mid-market fund managers."

### "Who's the competition?"
"anevis solutions is the incumbent — enterprise, managed service, acquisition-driven (just acquired an IT service provider). They serve large institutions. We're self-service for mid-market KVGs. But our real competitor is inertia — Excel spreadsheets and fund administrators who bundle compliance into their fees. The agent layer is how we break through that inertia. Instead of 'learn a new dashboard,' it's 'we file your reports for you.'"

### "What's the business model?"
"Open-core. Open schemas and libraries (we published open-annex-iv on npm, submitted to NGI Zero for EU funding). Paid managed filing pipeline, hosted APIs with SLA, audit trail, and the agent layer. Dashboard tier at €990/mo, professional at €1,990/mo, enterprise from €3,500/mo. Agents will be priced separately — usage-based or as a premium tier."

### "What do you need?"
DON'T ask for money. Say: "We're focused on getting 3 paying customers first. I'd love your perspective on two things: what traction signals would make you want to revisit in 6 months, and whether you've seen the compliance agent category emerge in your portfolio or deal flow."

---

## Questions Julian Should Ask

1. "What traction signals would make you want to revisit in 6 months?"
2. "Have you seen the compliance agent category emerge in your deal flow? Sphinx is one — are there others?"
3. "Which of your portfolio companies had a similar regulatory infrastructure angle?"
4. "What's the biggest mistake you see early-stage fintech founders make in Europe specifically?"
5. "Would you be open to a quarterly update email?"

---

## Numbers to Have Ready

| Metric | Value |
|--------|-------|
| API endpoints | 60+ |
| Pricing | €990 / €1,990 / €3,500+ /mo |
| Target market (DE) | 700+ KVGs (BaFin registry) |
| AIFMD II deadline | April 16, 2026 (45 days) |
| Build time | 10 days (product), 3 months (total) |
| Accelerator | Campus Founders Batch 4 (applied, €25K) |
| KPI target | 3 customers, €3-6K MRR |
| Sphinx comp | $7.1M seed, Cherry Ventures + YC |
| Open source | open-annex-iv on npm, NGI Zero submitted |
| Sanctions DB | 6,863 entities, EU/UN lists |
| Grant pipeline | €100-135K realistic (NGI ×2 + EXIST + IBB) |

---

## Closing the Call

"I'll send you a quarterly update with our numbers. If we hit the milestones we're targeting, I'd love to continue this conversation."

Then **actually send quarterly updates.** Set a cron for it.

---

---

## The Open-Core Defense

They WILL ask "why open-core?" — here's the airtight answer.

### What's Open vs. What's Paid

| Open (Free) | Paid (Caelith Platform) |
|---|---|
| Annex IV XML serialization (open-annex-iv on npm) | Hosted filing pipeline with audit trail |
| ESMA schema definitions | Autonomous filing agents (BaFin, CSSF portals) |
| Field validation rules | Live sanctions + PEP screening |
| Code list mappings | Investor due diligence engine |
| | Continuous monitoring + alerts |
| | Multi-tenant dashboard + RBAC |
| | Regulatory intelligence feed |
| | Customer support + SLA |

"The open library is like giving away a hammer. We sell the construction company."

### 3 Reasons a VC Should Love This

**1. "It's a wedge, not the product."**
"The XML serializer is table stakes — every competitor generates XML. By open-sourcing it, we make it the standard. Developers at fund admins integrate it, discover Caelith, and realize they need the 95% of value on top: screening, DD, filing agents, audit trails. The library is a zero-cost acquisition channel."

**2. "Switching costs through adoption, not lock-in."**
"Traditional compliance vendors lock you in with proprietary formats. We make the format open — customers never feel trapped. But once they're on our filing pipeline, audit trail, screening engine — switching cost is operational, not contractual. Customers stay because we're better, not because leaving is painful."

**3. "Validated by infrastructure winners."**
"Elastic (open-core, $2B+ revenue), HashiCorp (open-core, acquired $6B), MongoDB ($30B+ market cap). Plaid open-sourced Quickstart, Stripe open-sourced SDKs. Open the interface layer, monetize the managed service. We're applying that pattern to regulatory compliance."

### If They Push: "What if Big 4 / Amazon clones it?"

"Deloitte charges €500/hour for AIFMD consulting. They won't build €990/month SaaS — it cannibalizes advisory revenue. Amazon doesn't understand KAGB § 1 Abs. 19 Nr. 33 semi-professional investor thresholds. This market requires deep regulatory domain expertise that can't be hired overnight."

### If They Push: "When do you close-source?"

"Never. The library stays open forever. The gap between the open library and the paid platform GROWS over time. Every new feature is proprietary platform value. The open layer is frozen infrastructure."

### Killer Data Point

"There is no AIFMD compliance API in Europe. Not from ESMA, not from any NCA, not from any vendor. Every competitor — AQMetrics, FundApps, anevis — is a closed platform. Nobody can build on top of them. We're the first open infrastructure layer for EU fund compliance."

---

## Pre-Call Checklist (Monday morning)
- [ ] Product demo ready on localhost:3000 (in case they ask for a screen share)
- [ ] Sphinx blog post re-read for specific numbers
- [ ] BaFin MVP Portal workflow documented (show pain point)
- [ ] Calm, confident, relationship-building mode — NOT desperate pitch mode
