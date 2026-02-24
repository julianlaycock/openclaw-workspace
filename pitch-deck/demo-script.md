# Caelith — 5-Minute Demo Script

**Login:** demo@caelith.tech (set up dedicated demo account)
**URL:** https://www.caelith.tech/login

---

## Minute 0:00–0:30 — Hook & Login

> "Let me show you what automated AIFMD II compliance actually looks like."

- Open browser → www.caelith.tech (landing page — 5 seconds max)
- Click Sign In → login with demo credentials
- **Dashboard loads** — show the overview: funds, investors, compliance status at a glance

**Key line:** "Everything you see here was built in 3 months by a single person. That's how focused the scope is."

---

## Minute 0:30–1:30 — The Fund Structure

> "This is Rhein Capital, a fictional German Spezial-AIF with 3 sub-funds."

- Click into the fund → show fund details
- Show **framework auto-detection**: AIFMD II + KAGB Spezial-AIF rules are automatically applied based on fund type and jurisdiction
- Show the **6 frameworks** available in the dropdown

**Key line:** "Caelith knows which regulations apply to your fund before you do. It maps your structure to the applicable frameworks automatically."

---

## Minute 1:30–2:30 — Investor Classification (The Money Shot)

> "Now watch what happens when I evaluate an investor."

- Navigate to **Investors** → select an investor (e.g., "Bayerische Versicherung AG")
- Click **"Run Compliance Check"** (or equivalent action)
- Show the **result**: classification (professional/semi-professional/retail), all 247 rules evaluated, which passed, which flagged
- **Point to the evaluation time** — "<23ms" displayed in the UI
- Show a **flagged rule** — explain what it means in plain language

**Key line:** "247 rules. Under 23 milliseconds. What used to take a compliance officer 2 days just happened while I was talking."

---

## Minute 2:30–3:30 — The Audit Trail (The Differentiator)

> "This is what no other tool does."

- Navigate to **Audit Trail**
- Show the **hash chain**: each decision links cryptographically to the previous one
- Click on an entry → show the full decision record: timestamp, rules applied, result, hash, previous hash
- Explain: "If anyone modifies a single character in any past decision, every hash after it breaks. It's the same concept that secures Bitcoin, applied to compliance."

**Key line:** "When a BaFin auditor asks 'show me how you classified this investor on January 15th' — you click one button and hand them cryptographic proof."

---

## Minute 3:30–4:15 — Reporting

> "Compliance isn't just about decisions — it's about proving them."

- Navigate to **Reports** → show Annex IV reporting
- Generate a sample report → show the PDF/XML output
- Show **cross-framework coverage**: AIFMD II disclosures, KAGB requirements

**Key line:** "One click. Regulator-ready. PDF, XML, or XBRL. What used to be a 2-4 week project with consultants."

---

## Minute 4:15–5:00 — Close & Numbers

> "Let me put this in context."

- Return to **Dashboard** — show the overview one more time
- Deliver the closing stats:
  - "247 rules across 6 EU regulatory frameworks"
  - "Under 23ms per evaluation"
  - "Cryptographic proof of every single decision"
  - "Starting at €299/month — that's 50× cheaper than hiring Deloitte"
  - "AIFMD II enforcement is in [X] days. This is live, working, and ready for pilots."

**Key line:** "I'm not asking you to imagine what this could look like. I'm showing you the working product. We need €400K to hire a CTO, run 3-5 pilots with German AIFMs, and scale this across Europe."

---

## Demo Environment Checklist

Before any demo, verify:
- [ ] Demo account works (demo@caelith.tech)
- [ ] 3 realistic funds loaded (German names: Rhein Capital, Alpen Invest, Hanseatische Beteiligungen)
- [ ] 15-20 investors with varied classifications (mix of professional, semi-professional, retail)
- [ ] At least 1 flagged/non-compliant investor (for dramatic effect)
- [ ] Audit trail has 20+ entries with visible hash chain
- [ ] Annex IV report generates without errors
- [ ] Page load time is fast (no spinners > 2 seconds)
- [ ] No empty states visible anywhere in the flow
- [ ] Mobile: at minimum not broken (VCs check on phones)

## Backup Plan

If the live site is down or slow:
- Have a **2-3 minute screen recording** (Loom) ready to share
- Have **3 screenshots** of key screens: dashboard, compliance evaluation, audit trail
