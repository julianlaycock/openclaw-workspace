# Caelith Demo Playbook

> **Product:** Caelith — EU Fund Compliance SaaS
> **URL:** www.caelith.tech | **Login:** admin@caelith.com / Admin1234
> **Last updated:** 2026-02-23

---

## 1. Pre-Demo Checklist (T-5 Minutes)

### Browser Setup
- [ ] Use Chrome (incognito or clean profile — no embarrassing bookmarks)
- [ ] Zoom level: 100% on a 1080p+ external monitor (not laptop screen)
- [ ] Close all other tabs — zero distractions
- [ ] Disable browser notifications, Slack, Teams, email popups
- [ ] Bookmark bar hidden (`Ctrl+Shift+B`)

### Pages to Pre-Load (5 tabs, in order)
1. **Dashboard** — www.caelith.tech/dashboard (the "wow" opener)
2. **Investors** — www.caelith.tech/investors (for screening & KYC stories)
3. **Compliance Rules** — www.caelith.tech/compliance (rule engine)
4. **Readiness Assessment** — www.caelith.tech/readiness (gap analysis)
5. **Copilot** — www.caelith.tech/copilot (AI assistant)

### Have Ready
- [ ] This playbook open on second screen or printed
- [ ] Prospect's fund name, AUM, domicile, and regulatory regime (research beforehand)
- [ ] Pricing one-pager (PDF, not on screen — share after, not during)
- [ ] Notepad for capturing their specific pain points live

### Fallback Plan (If Site Is Slow/Down)
1. **Stall 30 seconds:** "Let me pull up the latest build — we shipped an update this morning."
2. **If still loading:** Switch to pre-recorded walkthrough video (keep 3-min Loom on desktop)
3. **If fully down:** Pivot to slide deck + architecture diagram. Say: "I'd rather show you the real product — let's reschedule 15 minutes and I'll have it ready." (Shows confidence, not panic.)
4. **Nuclear option:** Screen-share from your phone (responsive design works)

---

## 2. Demo Scripts

---

### Script A: Compliance Officer (15 min)

**Audience mindset:** "Will this actually catch what I'd catch? Can I trust it for an audit?"

#### Opening (1 min)
> "You spend your days making sure funds stay compliant with AIFMD, UCITS, ELTIF — and you know how painful it is when the rules change and you're updating spreadsheets at midnight. Let me show you what it looks like when that's automated."

#### Act 1: Dashboard Overview (2 min)
- Show the compliance dashboard — point to the **red/amber/green** status indicators
- **Key line:** "This is your Monday morning view. Within 5 seconds you know which funds need attention."
- Highlight the alert count and last-checked timestamps

#### Act 2: Rule Engine Deep Dive (4 min)
- Navigate to Compliance Rules
- Show a UCITS concentration rule firing on the **Norges fund (55% single-issuer concentration)**
- **Key line:** "This isn't a generic alert — Caelith maps directly to Article 52 of the UCITS Directive. The rule says 5/10/40. Norges is at 55%. That's a breach, flagged automatically."
- Show how rules can be configured per regulation and per fund
- Point out the **audit trail** — every rule evaluation is timestamped and logged
- **Key line:** "When CSSF or BaFin asks 'how did you monitor this?', you hand them this log."

#### Act 3: Investor Screening & KYC (4 min)
- Go to Investors page
- Show the **expired KYC** flag — "This investor's KYC expired 47 days ago. In a spreadsheet, this is a row someone forgot to highlight. Here, it's impossible to miss."
- Show sanctions/PEP screening integration
- **Key line:** "Screening runs continuously, not just at onboarding. If someone gets sanctioned Tuesday, you know Tuesday — not at your next quarterly review."

#### Act 4: Readiness Assessment & Evidence Bundle (3 min)
- Open Readiness Assessment
- Show the gap analysis — percentage scores per regulatory area
- **Key line:** "If you're preparing for ELTIF 2.0 or DORA, this tells you exactly where you stand and what's missing."
- Show evidence bundle export — "One click, and you have an audit-ready package. No more chasing 14 people for documents."

#### Close (1 min)
> "You're doing this work already — manually. Caelith doesn't replace your judgment. It gives you perfect memory, real-time monitoring, and proof that you did the right thing. What part of your current workflow causes you the most pain?"

---

### Script B: CTO / IT Decision Maker (15 min)

**Audience mindset:** "How does this fit into our stack? Is the data secure? Will this create more work for my team?"

#### Opening (1 min)
> "Your compliance team probably comes to you with tools that need 6 months of integration work. Caelith is different — I'll show you the architecture and you can judge for yourself."

#### Act 1: Architecture Overview (3 min)
- Show the dashboard briefly (30 sec context), then pivot to talking architecture:
  - **Multi-tenant SaaS** — each client's data is logically isolated
  - **Next.js frontend + Node.js API backend** — modern, standard stack
  - **PostgreSQL** — no exotic databases, easy to reason about
  - **Hosted in EU (Frankfurt)** — data never leaves EU borders
- **Key line:** "No proprietary runtimes, no vendor lock-in on the data layer. If you ever leave, your data exports cleanly."

#### Act 2: API & Integration (4 min)
- Show the API documentation / endpoint structure
- **Key line:** "Your portfolio management system pushes holdings data via REST API. Caelith evaluates compliance rules and returns results. It's a stateless call — you can integrate in a sprint."
- Discuss webhook support for real-time alerts
- SSO/SAML support for enterprise auth

#### Act 3: Security & GDPR (4 min)
- Encryption at rest (AES-256) and in transit (TLS 1.3)
- GDPR by design: data minimization, right to deletion, DPA included
- Role-based access control — show the permission model in the UI
- **Key line:** "We don't process investor personal data beyond what's needed for screening. No training on your data. No third-party data sharing."
- SOC 2 Type II roadmap (mention timeline honestly)

#### Act 4: Deployment & Scalability (2 min)
- SaaS-first, but **private cloud deployment available** for regulated entities
- Horizontal scaling — "Whether you have 3 funds or 300, same architecture"
- 99.9% uptime SLA
- **Key line:** "Your compliance team self-serves. They don't file Jira tickets with your team to add a rule."

#### Close (1 min)
> "The goal is: your compliance team gets a tool that works, and your team gets zero maintenance burden. What does your current integration landscape look like?"

---

### Script C: CEO / Geschäftsführer (10 min)

**Audience mindset:** "How much does this cost vs. what we're doing now? What's the risk of NOT doing this?"

#### Opening (1 min)
> "You're paying Big 4 consultants €200K+ a year for compliance reviews that are outdated the day they're delivered. I'll show you how Caelith gives you real-time compliance for 93% less."

#### Act 1: Dashboard — The CEO View (3 min)
- Show the dashboard — focus on the **portfolio-level risk overview**
- **Key line:** "Green means compliant. Red means exposed. Right now, you have 3 red items — that's regulatory risk sitting on your desk."
- Show the Norges concentration breach: "This is a fund with 55% in a single issuer. If the regulator finds this before you do, that's a fine and a reputation problem."
- Show readiness scores: "You're at 68% ready for ELTIF 2.0. Your competitors who are at 95% will launch products faster."

#### Act 2: Cost & Speed (3 min)
- **The Big 4 comparison:**
  - Big 4 annual compliance review: €150K–€300K
  - Caelith annual license: starts at €X (insert actual pricing)
  - **"That's 93% cost reduction — and you get daily monitoring instead of an annual PDF."**
- Time to compliance insight: "Big 4 gives you a report in 8 weeks. Caelith gives you a dashboard in 8 minutes."
- **Key line:** "The question isn't whether you can afford Caelith. It's whether you can afford to wait 8 weeks to find out you have a breach."

#### Act 3: Copilot — AI That Speaks Regulatory (2 min)
- Open the Compliance Copilot
- Ask it a natural question: "Are we ELTIF 2.0 compliant?"
- Show it pulling real data from the system to answer
- **Key line:** "Your compliance team has a 24/7 expert that knows your portfolio and every EU regulation. No billable hours."

#### Close (1 min)
> "Caelith is three things: lower cost, faster insight, less risk. Which of those matters most to you right now?"

---

## 3. Objection Handling

### 1. "You're a one-person company."
> "That's true today — and that's actually an advantage for you. You get founder-level attention, direct access to the person building the product, and the ability to shape the roadmap. Every company you trust today was one person once. The question is: does the product work? Let me show you the output, and you judge."

**Backup:** "We're backed by [mention any advisors, pilot clients, or institutional validation]. And the code runs whether I'm one person or a hundred."

### 2. "We already use Excel / consultants for this."
> "Excel works — until it doesn't. It doesn't alert you when a rule changes. It doesn't screen investors continuously. And it definitely doesn't generate an audit trail. Your consultant gives you a snapshot once a quarter. Caelith gives you a live feed. The question is: do you want to know about a breach in January or in April?"

### 3. "Can you handle our specific fund structure?"
> "What's your structure? [Listen.] Caelith's rule engine is configurable per fund, per regulation, per jurisdiction. If you have a Luxembourg RAIF with AIFMD overlay and ELTIF sleeve — yes, we model that. If there's something truly bespoke, we'll configure it during onboarding. Let me show you the rule builder."

### 4. "What about data security / GDPR?"
> "Data stays in the EU — Frankfurt data center. Encrypted at rest and in transit. We're GDPR by design: data minimization, right to deletion, DPA included in every contract. We process the minimum investor data needed for screening — nothing more, no training on your data, no third-party sharing."

### 5. "We need on-premise."
> "We offer private cloud deployment for regulated entities. Same product, your infrastructure. But honestly — most of our clients start with SaaS because the security model is equivalent and there's zero ops burden on your side. What's driving the on-prem requirement? Often we can address the underlying concern without the infrastructure overhead."

### 6. "Price is too high."
> "Compared to what? If your current process costs €150K–€300K in consultant fees, even our highest tier saves you 90%+. If you're comparing to doing nothing — the cost of a single regulatory finding is multiples of our annual fee. What's your current annual spend on compliance tooling and advisory?"

### 7. "Price is suspiciously low."
> "We're SaaS — the marginal cost of serving one more client is near zero. Big 4 charges for human hours. We charge for software. That's not a quality difference, it's a business model difference. The output speaks for itself — I just showed you the rule engine and audit trail. Would a Big 4 report give you real-time alerts?"

### 8. "We need to see a POC / pilot first."
> "Absolutely. We offer a 30-day pilot with your real fund data. You'll have full access to the platform, and we'll configure your specific regulatory requirements during onboarding. If it doesn't deliver value, you walk away. Fair?"

### 9. "What if regulations change?"
> "That's exactly the problem we solve. When ELTIF 2.0 updated in January 2024, our rule engine was updated within days. Your spreadsheet wasn't. Regulatory change is our core competency — we monitor ESMA, CSSF, BaFin, and FCA publications and update rules proactively."

### 10. "We need to involve more stakeholders / think about it."
> "Of course. Who else should see this? I can do a tailored 10-minute demo for your [CEO/CTO/Head of Compliance] — different focus for each. And I'll send you a summary of what we covered today with specific next steps within 2 hours. What's your timeline for making a decision?"

---

## 4. Demo Data Stories

The seeded demo environment contains real-feeling scenarios. Use these narratives:

### Story 1: Norges Fund — Concentration Breach (55%)
> **Setup:** "This fund has 55% exposure to a single issuer."
> **Narrative:** "Under UCITS 5/10/40 rules, no single issuer can exceed 10% — or 35% with government bond exceptions. At 55%, this is a clear breach. In a manual process, this might sit unnoticed until the next quarterly review. Caelith caught it the moment the position data was ingested."
> **Emotional hook:** "Imagine your regulator finding this before you do."

### Story 2: Expired KYC — The Ticking Clock
> **Setup:** An investor's KYC documentation expired 47 days ago.
> **Narrative:** "This investor passed screening at onboarding. But KYC isn't a one-time event — documents expire, circumstances change. This investor's verification lapsed 47 days ago. Under AML regulations, you're now transacting with an unverified counterparty. Caelith flagged this on day 1 of expiry."
> **Emotional hook:** "How many expired KYCs are hiding in your spreadsheet right now?"

### Story 3: ELTIF Non-Compliance — Regulatory Readiness Gap
> **Setup:** The fund is structured as an ELTIF but doesn't meet the updated ELTIF 2.0 requirements.
> **Narrative:** "This fund was compliant under ELTIF 1.0. But the regulation evolved — new liquidity requirements, new eligible asset definitions, new investor suitability rules. The fund hasn't adapted. The readiness assessment shows exactly which requirements are unmet and what needs to change."
> **Emotional hook:** "Your competitors who are ELTIF 2.0 ready are already marketing to retail investors. You're not."

### Story 4: Readiness Gaps — The 68% Problem
> **Setup:** Overall readiness score of 68% across regulatory frameworks.
> **Narrative:** "68% sounds okay — until you realize that the 32% gap includes critical items like transaction reporting and risk management documentation. These aren't nice-to-haves. Each gap is a potential finding in your next audit."
> **Emotional hook:** "Would you fly on a plane that's 68% safe?"

---

## 5. Post-Demo Follow-Up Email Template

**Send within 2 hours of the demo.** Personalize the bracketed sections.

---

**Subject:** Caelith for [Company Name] — Summary & Next Steps

Hi [First Name],

Thank you for your time today. It was great to understand how [Company Name] currently handles [specific process they mentioned — e.g., "UCITS concentration monitoring across your 12 Luxembourg funds"].

Here's a quick recap of what we covered:

**What we showed you:**
- [Specific feature 1 they reacted to — e.g., "Real-time concentration breach detection — the Norges 55% scenario"]
- [Specific feature 2 — e.g., "Automated KYC expiry monitoring across your investor base"]
- [Specific feature 3 — e.g., "ELTIF 2.0 readiness assessment with gap-by-gap breakdown"]

**The pain point you mentioned:**
> "[Quote their exact words if possible — e.g., 'We found out about a breach 3 months after it happened because the spreadsheet wasn't updated']"

**How Caelith addresses this:**
[1-2 sentences connecting their pain to the product — e.g., "Caelith evaluates compliance rules against live portfolio data daily, so a breach is flagged within hours — not months. The audit trail proves continuous monitoring to your regulator."]

**Suggested next steps:**
1. [If they want a pilot]: We set up a 30-day pilot with your fund data — I can have the environment ready by [date].
2. [If they need stakeholder buy-in]: I'll prepare a tailored 10-minute demo for [person they mentioned]. When works for them?
3. [If they need pricing]: Attached is our pricing overview based on [X funds / Y AUM].

I'll follow up [day of week] if I don't hear from you. In the meantime, feel free to reach me directly at [your email/phone].

Best,
[Your name]
Founder, Caelith
[Phone] | www.caelith.tech

---

*"Compliance shouldn't be a quarterly surprise. It should be a daily certainty."*
