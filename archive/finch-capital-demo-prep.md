# Finch Capital Demo Prep — Monday March 2, 10:30 CET

**Context:** They said "too early but wants to learn about the product." This is a discovery call, not a pitch. Goal: make them believers in the problem and our approach so they stay warm for a future round.

---

## 1. 15-Minute Demo Flow

### Opening (2 min) — Frame the Problem
- Don't pitch Caelith yet. Start with AIFMD II.
- "April 16, 2026 — 48 days. Every KVG in Germany needs to comply. Most are still figuring out what changed."
- The market is ~400 KVGs + fund admins. Compliance today = consultants + Excel + manual XML filing. No API infrastructure exists for mid-market.

### Readiness Check (3 min) — Hook
- Live: **www.caelith.tech/readiness-check**
- Walk through it as if you're a KVG compliance officer. Show how it surfaces gaps.
- "This is free. It's our top-of-funnel — shows fund managers what they're missing, then offers to fix it."

### API Demo (5 min) — The Product
Show 3-4 endpoints that tell the best story. Suggested sequence:
1. **Sanctions screening** — "One API call. Name in, PEP/sanctions match out. No spreadsheet."
2. **Annex IV XML generation** — "The reporting format regulators require. We generate valid XML from structured data."
3. **LEI validation** — "Checks legal entity identifiers against GLEIF in real-time."
4. **NCA profiles + regulatory calendar** — "Every national authority, every deadline, structured and queryable."

Keep it fast. Show curl/response or the copilot demo UI, not slides.

### Copilot Demo (3 min) — The Vision
- Live: **www.caelith.tech/api/copilot-demo**
- Show natural language → compliance action. "Check if this entity is sanctioned." "Generate my Annex IV report."
- This is the "wow" moment. Save it for after the API demo so they understand what's underneath.

### Close (2 min) — Where We Are
- 34 endpoints live. Dashboard in beta. Two incubators (HWR Berlin, Lanzadera).
- Honest about stage: pre-revenue, 15 KVGs contacted, learning from market feedback.
- "We're not raising today. We wanted to show you the product since you asked."

---

## 2. Key Talking Points

| Point | Why It Matters |
|---|---|
| **AIFMD II is a hard deadline, not optional** | Creates urgency — this isn't a nice-to-have market |
| **Mid-market is underserved** | Enterprise has anevis. Small funds use consultants. Nobody serves €100M-2B AUM with self-service tools |
| **API-first = platform play** | We're not building a consultancy. We're building infrastructure that fund admins and fintechs can build on |
| **34 endpoints already live** | We ship. This isn't a deck — it's a working product |
| **Regulatory calendars + NCA data = moat** | Structured regulatory data doesn't exist elsewhere. We're building the dataset |
| **Free tier → paid conversion** | Readiness check is free. Dashboard is €990-3,500/mo. API scales to enterprise |

**What NOT to say:**
- Don't oversell traction. 15 contacts / 0 revenue is honest. Own it.
- Don't position this as a raise. They said "too early." Respect that framing.
- Don't trash anevis. Position them as validation ("enterprise is solved, mid-market isn't").

---

## 3. Anticipated Questions + Answers

**Q: Why haven't you closed any customers yet?**
A: "We've contacted 15 KVGs. The one detailed response told us they outsource to consultants — which actually validates the problem. Consultants charge €50-200K/year for what our API does programmatically. We're now refining our go-to-market to target the fund admins and compliance officers directly, not through procurement. We also see fund administrators as a channel — they serve multiple KVGs and need scalable tooling."

**Q: What's your competitive landscape?**
A: "anevis solutions is the incumbent — enterprise, managed service, 6-figure contracts. They validate the market. We're self-service, API-first, targeting the mid-market that can't afford anevis and currently uses consultants + Excel. Think Stripe vs. enterprise payment processors."

**Q: How do you know KVGs will buy software vs. keep using consultants?**
A: "Two forces: (1) AIFMD II significantly expands reporting requirements — consultants don't scale when you need ongoing compliance, not annual audits. (2) Regulators are moving toward machine-readable reporting (Annex IV XML). You can't submit XML by hiring a lawyer. The shift to digital reporting makes software inevitable."

**Q: What's your GTM?**
A: "Three channels: (1) Free readiness check as inbound funnel, (2) Direct outreach to KVG compliance officers, (3) Fund administrators as a distribution channel — one admin serves 10-50 funds. We're in HWR Berlin's incubator (access to German fintech network) and Lanzadera (European expansion)."

**Q: Why are you the team to build this?**
A: *(Julian — prep your personal answer. Emphasize: domain learning speed, technical execution, shipping 34 endpoints as a solo/small team, incubator backing.)*

**Q: What would you raise and when?**
A: "We're focused on getting to first paying customers before raising. When we do, it'll be a pre-seed/seed to scale GTM in DACH. Happy to keep you updated as we hit milestones."

**Q: How defensible is this?**
A: "Three layers: (1) Structured regulatory dataset (NCA profiles, calendars, rule mappings) — no one else has this in API form. (2) Network effects from fund admin channel — more funds = better sanctions/PEP data. (3) Switching costs once embedded in compliance workflows."

---

## 4. What to Ask THEM (Intelligence Gathering)

### About the Market
- "What's your thesis on regtech in Europe? Are you seeing more deal flow here?"
- "Have you looked at other compliance infrastructure plays? What excited or didn't excite you?"
- "Do you see AIFMD II as a catalyst or is the regulatory compliance market too niche for VC returns?"

### About Go-to-Market
- "We're debating whether to go direct to KVGs or through fund administrators. Do you have a view on which scales better?"
- "Any portfolio companies selling to German financial institutions? What GTM worked for them?"

### About Timing / Fundraising
- "What would you need to see from us to get excited about a future round?"
- "Is there a stage or milestone where this fits your fund's sweet spot?"
- "Are there other investors you think we should talk to at this stage?"

### About Product
- "From what you've seen — does the API-first approach resonate, or do you think this market wants managed services?"

---

## 5. Follow-Up Actions After the Call

**Within 24 hours:**
- [ ] Send thank-you email with: (1) link to readiness check, (2) link to copilot demo, (3) 1-pager or pitch deck if they ask
- [ ] Log all feedback/questions in `memory/2026-03-02.md`
- [ ] Update CRM/tracker with Finch Capital status and next steps

**Within 1 week:**
- [ ] Act on any GTM feedback they gave
- [ ] Connect with any investors they recommended
- [ ] If they suggested specific milestones, add to roadmap

**Ongoing:**
- [ ] Monthly or milestone-based update email (keep them warm)
- [ ] Add to investor update list when you start sending those

---

## Pre-Call Checklist (Sunday night / Monday morning)

- [ ] Test readiness check live — make sure it loads fast, no errors
- [ ] Test copilot demo — run through the exact queries you'll show
- [ ] Test 3-4 API endpoints you'll demo — have curl commands ready as backup
- [ ] Good internet connection, camera on, quiet room
- [ ] Have pitch deck open but don't screen-share it unless asked
- [ ] Water, notepad for their questions
