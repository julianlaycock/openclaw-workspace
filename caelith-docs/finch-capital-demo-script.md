# Finch Capital Demo Script
**Date:** Monday, March 2, 2026 — 10:30 CET
**Duration:** 25 minutes
**Attendee:** Eugenie Colonna-Distria, Finch Capital
**Context:** They said "too early" but agreed to see the product. Finch is an EU fintech VC — they understand APIs, developer tools, and B2B SaaS. Don't over-explain tech; show speed and depth.

**Goal:** Move from "too early" to "let's talk terms" or at minimum "keep us updated monthly."

---

## 0:00–3:00 — Intro & Market Problem

**[Screen: Blank / Caelith logo or landing page]**

> "Eugenie, thanks for making time. I know you flagged this as potentially early-stage, so I want to be respectful of your time — I'll show you the product live and let you judge.
>
> Quick context: AIFMD II enforcement starts April 12th. That's 44 days from today. Every alternative investment fund manager in the EU needs to comply with expanded Annex IV reporting, new investor classification rules, and stricter AML/KYC requirements.
>
> The problem: there's no modern tooling for this. Fund managers are using Excel, emailing XML files to consultants, or paying €50K+ to legacy vendors like anevis for managed services. It's 2026 and regulatory compliance for AIFs still runs on email attachments and manual XML editing.
>
> Caelith is the API-first compliance platform for AIFMD II. We automate what takes compliance teams days — in seconds."

**Transition:** "Let me show you."

---

## 3:00–8:00 — Landing Page & Readiness Check

**[Navigate to caelith.tech]**

> "This is our public landing page. Two things I want to highlight."

**[Scroll to readiness check section / CTA]**

> "We built a free AIFMD II readiness assessment. Fund managers answer 5–6 questions and get a compliance gap analysis instantly. This is our top-of-funnel — it's generating inbound leads right now because nobody else offers this."

**[Click through readiness check live — answer as a sample fund manager]**

- Pick: "Yes, we manage AIFs marketed in EU"
- Pick: "No, we haven't updated Annex IV templates for AIFMD II"
- Pick: "Manual / Excel-based process"

> "See the result — it flags exactly which gaps they have: Annex IV format not updated, no automated sanctions screening, missing investor classification under the new semi-professional category. Each gap maps to a Caelith feature. This is the entry point."

**[Point to CTA: "Start Free Trial" or "See Dashboard"]**

> "From here they sign up and land in the dashboard. Let me take you there."

---

## 8:00–15:00 — Dashboard, Sanctions Screening & Annex IV XML

**[Navigate to localhost:3000 / dashboard — already logged in]**

### Dashboard Overview (1 min)

> "This is the Caelith dashboard. You can see fund overview, compliance status, recent activity. Everything is real-time, API-driven."

### Sanctions Screening Demo (4 min)

**[Click: Investors page → select an investor or "Screen Investor"]**

> "Sanctions screening is table stakes for AIFMD II compliance. Let me show you something interesting."

**[Type in search/screening: "Viktor Yanukovich"]**

> "Watch this — I'm deliberately misspelling the name. Our screening engine uses fuzzy matching against EU, UN, OFAC, and UK sanctions lists."

**[Show results: fuzzy match hits for Viktor Yanukovych with confidence scores]**

> "It catches 'Yanukovich' even though the official list has 'Yanukovych'. This is the kind of thing that Excel can't do and that legacy tools charge a fortune for. It's one API call: `POST /api/sanctions/screen` with a name, and you get back match scores, list sources, and risk flags."

**[Show the JSON response or the UI card with match details]**

> "Every screen is logged, timestamped, and audit-ready. Your compliance officer can pull a full screening history for any investor."

### Annex IV XML Generation (3 min)

**[Navigate to Annex IV / Reporting section]**

> "Now the big one — Annex IV reporting. This is the XML that every AIFM must file with their national regulator quarterly or annually."

**[Click: Generate Annex IV Report → select a fund → click Generate]**

> "We take your fund data, apply ESMA's Annex IV schema — including all the AIFMD II changes — and generate valid XML in seconds."

**[Show the generated XML preview or download]**

> "This XML is schema-validated against the latest ESMA technical standards. You can submit it directly to your NCA. No consultant needed, no manual XML editing.
>
> By the way — the Annex IV generation is also available as an open-source npm package. I'll show you that in a moment."

---

## 15:00–20:00 — NEW Features

### Investor Classification (3 min)

**[Navigate to API docs or Investors section]**

> "AIFMD II introduces a new investor category: semi-professional investors. This is a big deal — it changes who can invest in your fund and what documentation you need."

**[Show POST request or UI form: classify an investor]**

Example scenario:
- Investment amount: €150,000
- Investor type: Natural person
- Suitability assessment: Completed
- Net worth declaration: Yes

> "I'm classifying an investor who wants to put in €150K. Under AIFMD II, they can qualify as semi-professional if they meet specific criteria — minimum €100K investment, suitability assessment, written declaration.
>
> Our API evaluates all criteria and returns the classification with the regulatory basis. No more reading 40-page ESMA Q&As to figure out if someone qualifies."

**[Show response: "Classification: Semi-Professional Investor, Basis: Article X AIFMD II, Requirements Met: 3/3"]**

### Deadline Calculator (1 min)

**[Navigate to deadline calculator or show it in dashboard]**

> "Simple but critical — when are your next filings due? This calculates reporting deadlines based on your fund type, AUM thresholds, and jurisdiction. Auto-syncs with your calendar if you want."

### Compliance Checklist (1 min)

**[Show compliance checklist view]**

> "A living checklist of everything you need for AIFMD II compliance. Not a static PDF — it updates based on your fund data and what you've already completed. Think of it as a progress tracker to April 12th."

---

## 20:00–23:00 — API, SDKs & Open Source

**[Navigate to API docs page]**

> "Eugenie, since Finch looks at developer tools — let me show you the technical layer.
>
> Full REST API, OpenAPI spec, everything documented. Authentication via API keys, webhook support for compliance events."

**[Show a few endpoints: /sanctions/screen, /annex-iv/generate, /investors/classify]**

> "We have SDKs for Node.js, Python, and we're adding Go. But here's what I'm most proud of:"

**[Open npmjs.com/package/open-annex-iv or GitHub]**

> "open-annex-iv — our open-source npm package for Annex IV XML generation. MIT licensed. This is our developer community play. Fund admins and fintechs can use this standalone, and when they need the full platform — screening, classification, dashboards — they upgrade to Caelith.
>
> It's the same playbook as Stripe with stripe-node or Plaid with plaid-node. Give away the hard technical work, monetize the platform."

---

## 23:00–25:00 — Business Model, Traction & Ask

> "Business model: SaaS, three tiers.
>
> - **Starter at €990/month** — covers Annex IV generation, sanctions screening, and the compliance checklist. Perfect for small AIFMs with 1–5 funds.
> - **Professional at €1,990/month** — adds investor classification, multi-fund management, API access, and priority support.
> - **Enterprise at €3,500/month** — custom integrations, dedicated support, SLA, bulk screening.
>
> For context: a compliance consultant charges €200–400/hour. A single Annex IV filing done manually takes 2–3 days. We pay for ourselves in the first month.

> "Traction: We're pre-revenue but have [X pipeline conversations / waitlist signups / LOIs — Julian to fill in live]. The open-source package has [X downloads]. We're targeting 10 paying customers by Q3.

> "What we're raising: [€X seed round] to hire two engineers, one compliance domain expert, and accelerate go-to-market before the April 12th deadline creates maximum urgency.

> "Eugenie, I'd love your honest take. What resonated? What concerns do you have?"

**[LISTEN. Don't fill silence. Let her react.]**

---

## Post-Demo Checklist

- [ ] Send follow-up email within 2 hours with:
  - Link to caelith.tech
  - Link to open-annex-iv on npm
  - One-pager / deck if requested
  - Specific answers to any questions raised
- [ ] Log feedback in CRM / notes
- [ ] If positive: propose follow-up call with technical co-founder or deeper dive
- [ ] If "too early": ask "What milestones would make this investable for Finch?" — get concrete criteria
