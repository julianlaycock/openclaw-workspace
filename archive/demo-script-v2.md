# Demo Script — Caelith Compliance Engine
**Version 2 — February 24, 2026**
**Duration: 12–15 minutes**

---

## Pre-Demo Checklist

- [ ] **Browser**: Chrome, incognito mode, zoom 100%, dark mode preferred
- [ ] **URL**: `https://www.caelith.tech` (use prod — shows it's real, not localhost)
- [ ] **Login ready**: `demo@caelith.com` / `Demo1234` (no exclamation mark)
- [ ] **Pre-warm copilot**: Open copilot once before demo and ask a throwaway question so the first real query isn't slow
- [ ] **Tabs**: Only one tab. No second monitors showing code/Slack. Clean desktop.
- [ ] **Network**: Verify prod is up — hit the login page, confirm it loads <3s
- [ ] **Known issues to route around**:
  - `/api/reports/compliance/{id}` — 500 error, do NOT click individual compliance reports
  - `/api/funds/{id}/regulatory-identifiers` — 500 error, avoid regulatory identifiers tab
- [ ] **Have ready** (not on screen): Pitch deck PDF, one-pager PDF, pricing page

---

## The Story

### Act 1: The Problem (2 min)

> **Opening line:** "Every fund manager in the EU is facing the same problem right now. AIFMD II goes live April 16th — that's 51 days from today. Most firms are still doing compliance in spreadsheets, or paying Big 4 consultants €200K+ to tell them what they already know."

Key beats:
- **The deadline**: AIFMD II enforcement starts April 16, 2026. It's not optional.
- **The pain**: Small and mid-size fund managers (KVGs) don't have compliance departments. They rely on expensive consultants or manual work.
- **The scale**: 2,500+ AIFMs across the EU managing €7T in assets. Every single one needs to comply.
- **The cost**: Big 4 engagement = €150K–500K. Caelith = €990/month. That's **93% cheaper**.

> **Transition:** "We built something that replaces that entire process. Let me show you."

---

### Act 2: The Solution — Caelith (8–10 min)

**Login** → Use demo credentials. The login page is clean and minimal — let it speak for itself.

---

#### Stop 1: Dashboard (30 seconds)

> "This is the command center. At a glance: 8 funds under management, compliance score, AUM breakdown, recent activity."

- Point to the **compliance score ring** — aggregate health across all funds
- Mention the **fund bands** — each fund's status at a glance
- Note the **analytics tabs** — portfolio-level insights
- **Don't linger** — this is context-setting, not the demo

---

#### Stop 2: Fund Detail — Rhine Spezial-AIF Gamma (1 min)

> "Let's drill into a specific fund."

- Click **Rhine Spezial-AIF Gamma** (or the Luxembourg RAIF if that's more impressive)
- Show the **tabbed layout**: Overview, Holdings, Investors, LMTs, Delegations, Compliance
- Point out: "Every data point a regulator would ask for — fund structure, investor breakdown, risk metrics — all in one place."
- Mention **LMT tab**: "AIFMD II requires at least 2 Liquidity Management Tools per fund. We track that automatically."
- Mention **Delegations tab**: "Delegation oversight is a new AIFMD II requirement — letterbox risk, third-country flags. All tracked."

---

#### Stop 3: AIFMD II Readiness Assessment (2 min) ⭐ *Killer feature*

> "This is what nobody else has."

- Navigate to the **AIFMD II Readiness** page
- Show the **72% donut** — "This fund is 72% ready for AIFMD II. Here's exactly what's missing."
- Walk through **category breakdown**: 8 categories, each scored
- Click into a gap: "See — it tells you the specific requirement, the article reference, and what action to take."
- **The line**: "A consultant would charge you €50K and 3 months to produce this assessment. We generate it in 30 seconds, and it updates live as you fix things."

---

#### Stop 4: Annex IV Report Generation (1.5 min)

> "Annex IV is the big one — the report every AIFM files with their national regulator."

- Navigate to Annex IV reporting
- **Generate a report** — show the output
- Show the **XML structure**: "This is ESMA-compliant XML. Correct codes, correct format, ready to submit."
- Point out: **EUR AUM figures**, **SubAssetType codes**, **ESMA XSD compliance**
- **The line**: "Firms spend 2–3 months preparing this manually. With Caelith, you click a button."

---

#### Stop 5: Compliance Copilot (2 min) ⭐ *Wow moment*

> "Now — what if you could just ask your compliance data a question?"

- Open the Copilot
- **Question 1** (English): *"What are our biggest compliance risks right now?"*
  - Let it run. It queries live fund data — LMTs, delegations, readiness scores — and synthesizes a real answer.
- **Question 2** (German): *"Welche Fonds brauchen dringend Aufmerksamkeit?"*
  - Show it works in German. "Our clients are German KVGs. The product speaks their language."
- **Behind the scenes**: "This isn't ChatGPT with a skin. It has a 16-table allowlist — it can only query compliance-relevant data. Prompt injection defenses, 50-row caps, PII stripping. Enterprise-grade."

---

#### Stop 6: Investor Onboarding (1 min)

> "Compliance isn't just about funds — it's about who's investing in them."

- Show the **Kanban board** — investors moving through onboarding stages
- Drag one investor to the next stage
- Point out: "KYC document tracking, compliance guardrails — you can't advance an investor who's missing required docs."
- Mention: "Full audit trail on every state change."

---

#### Stop 7: Audit Trail (30 seconds)

> "Speaking of audit trails…"

- Navigate to audit log
- Show entries: "Every action, every user, timestamped and hash-chained. When BaFin comes knocking, you have receipts."
- **Don't dwell** — the point is it exists and it's comprehensive.

---

#### Stop 8: Settings (30 seconds)

> "Quick look at the admin layer."

- Open Settings briefly
- Show: Organization settings, security, notifications, appearance (EN/DE, themes)
- **The point**: "This isn't a prototype. It's enterprise-ready software with real admin controls."

---

### Act 3: The Business (2–3 min)

> "So — the product is real, it's live, and the market is massive."

Key beats:
- **Market**: 2,500+ EU AIFMs, €7T AUM. Starting with ~100 small German KVGs (Immobilien, Spezial-AIF)
- **Pricing**: €990/mo (Essentials, 3 funds) → €1,990/mo (Professional, 15 funds) → €3,500+/mo (Enterprise)
- **Traction**: 10 KVGs contacted, pipeline building, Finch Capital intro call Mar 2
- **Founder velocity**: "I built this in 3 months, solo. The full stack — frontend, backend, compliance logic, AI copilot, security hardening."
- **Timeline**: AIFMD II deadline (Apr 16) creates natural urgency — every KVG needs a solution NOW
- **Expansion**: AIFMD II is the wedge. Then AML Regulation (July 2027), ELTIF 2.0, SFDR overhaul (2028-29)
- **The ask**: Depends on audience:
  - *Investors*: "We're raising a pre-seed to accelerate go-to-market and hire."
  - *Prospects*: "We're looking for 2-3 pilot partners. Free onboarding, direct input on the roadmap."
  - *Incubators*: "We need ecosystem access and go-to-market support in the DACH region."

---

## Anticipated Questions & Answers

### "How accurate is the compliance checking?"
> "The rules engine is based on KAGB, AIFMD II directive text, and BaFin guidance — 13 core compliance rules with article-level references. The Annex IV generator follows ESMA's XSD schema. We ran a legal QA audit and scored A+ on regulatory accuracy. That said, we position this as a tool that augments compliance officers, not replaces legal counsel."

### "What about data security? Where is data stored?"
> "Railway cloud (EU region), PostgreSQL with SSL, bcrypt-12 password hashing, httpOnly cookies, CSP headers, tenant isolation on every query. We passed a 64-point penetration test at 98.4%. SOC 2 and ISO 27001 artifacts are in progress — we have the policy docs, risk register, and Statement of Applicability already drafted."

### "Who are your competitors?"
> "The real competitor is spreadsheets and consultants — that's what 90% of small KVGs use today. In software: Deloitte/PwC have enterprise tools for €500K+ engagements. There are a few RegTech startups (Apiax, Suade) but none focused specifically on AIFMD II for the DACH market. We're the only product that combines AIFMD II readiness scoring, Annex IV generation, and an AI copilot in one platform."

### "What's your go-to-market?"
> "Direct outreach to German KVGs — there are about 100 small ones (under €5B AUM) that can't afford Big 4 but must comply. Cold email + LinkedIn, demo-led sales. The AIFMD II deadline is our best salesperson."

### "How do you handle regulatory changes?"
> "The rules engine is modular — each regulation is a separate rule pack. When AIFMD II amendments come, we update the rule definitions. The copilot's context is dynamically generated from live data, so it always reflects current state. We're building toward AML Regulation (2027) as our next module."

### "Is this just a wrapper around ChatGPT?"
> "No. The copilot uses Claude (Anthropic) with a hardened architecture: 16-table SQL allowlist, parameterized queries only, prompt injection defenses, PII stripping before context is sent to the model, 50-row result caps. It can't access arbitrary data — only compliance-relevant tables. The compliance rules engine is deterministic code, not AI."

---

## Things to Avoid

### ❌ Don't Click
- **Individual compliance report links** (`/api/reports/compliance/{id}`) — returns 500 error
- **Regulatory identifiers tab** on fund detail — returns 500 error
- **Any URL you haven't tested in the last hour** — prod can be flaky

### ❌ Don't Show
- **Settings > Danger Zone** — "Reset Account Data" is real and destructive
- **The code / terminal / DevTools** — you're a CEO, not demoing architecture
- **The landing page in detail** — it's fine but the product is the star
- **Embedding/vector features** — disabled on prod (no API keys), will show errors

### ❌ Don't Spend Too Long On
- **Dashboard** — 30 seconds max, it's just context
- **Settings** — quick flash, move on
- **Explaining the tech stack** — only if asked. Lead with business value.
- **Pricing details** — mention the range, offer to follow up with specifics

### ❌ Don't Say
- "It's just a prototype" or "We're still building" — the product is live and functional
- "I'm a solo founder" without framing it as velocity — "built in 3 months" is impressive; "I'm alone" sounds risky
- Specific revenue numbers if there aren't any yet — say "pipeline building" and "pilot discussions"

---

## Audience-Specific Adjustments

### For Investors (Finch Capital, VCs)
- Lead with market size (€23B TAM) and timing (regulatory deadline = forcing function)
- Emphasize founder velocity and capital efficiency
- Show the expansion roadmap (AIFMD II → AML → ELTIF → SFDR)
- End with: traction metrics and what funding unlocks

### For Prospects (KVG Compliance Managers)
- Lead with their pain: "When did you last update your Annex IV?"
- Spend more time on Readiness Assessment and Annex IV — these are their nightmares
- Demo in German where possible (copilot, UI language)
- End with: free pilot offer, direct roadmap input

### For Incubators (Lanzadera, HTGF)
- Lead with founder story and velocity
- Show breadth of product (it's not just one feature)
- Emphasize the regulatory moat — compliance logic is hard to replicate
- End with: what you need from the program (network, GTM, funding)

---

## Post-Demo

- [ ] Send one-pager PDF within 1 hour
- [ ] Connect on LinkedIn same day
- [ ] Follow up email within 24 hours with specific next steps
- [ ] Log interaction in outreach tracker
- [ ] Note any feature requests or objections in `memory/YYYY-MM-DD.md`
