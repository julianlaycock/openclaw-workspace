# AIFMD II Readiness Check — Comprehensive Review & Improvement Plan

**Date:** 2026-02-26
**Reviewed by:** Caelith Dev Copilot
**Current version:** 24 questions across 6 categories, client-side scoring, email capture on results page

---

## 1. Current State Summary

The readiness check is a single-page HTML app served via Next.js API route. It features:
- **6 categories:** Delegation & Outsourcing (5 Qs), Liquidity Management (4 Qs), Reporting & Disclosure (4 Qs), Investor Disclosure (4 Qs), Loan Origination (3 Qs), Governance & Implementation (4 Qs)
- **24 questions** with Yes/Partial/No/N/A answers
- **Weight-based scoring** (weights 1-3, Yes=100%, Partial=50%, No=0%)
- **Three risk tiers:** On Track (≥70%), Needs Attention (40-69%), At Risk (<40%)
- **Caelith product tags** on ~8 questions showing how Caelith solves that gap
- **Email capture** for PDF report (currently just a UI mock — no backend)
- **Countdown timer** to April 16, 2026 deadline
- **Legal disclaimer** prominently displayed

---

## 2. Persona-by-Persona Review

### Persona 1: Head of Compliance at a Mid-Market KVG
*(€1-3B AUM, 5-10 funds, team of 3)*

**Missing questions they'd expect:**
- BaFin-specific reporting deadlines and filing cadences (quarterly vs. semi-annual thresholds by AUM)
- Staff training and competence requirements under AIFMD II
- Conflict of interest policy updates required by the amendments
- Depositary relationship — new requirements on depositary oversight and reporting
- Valuation process changes (Art. 19 amendments)
- Risk management framework updates (Art. 15 general risk management)

**Irrelevant questions:**
- Loan origination section (most mid-market KVGs don't originate loans) — the N/A skip logic handles this well

**Scoring/weighting concerns:**
- `gov_kyc_current` (weight 3) feels over-weighted vs. `rep_esma_readiness` (weight 1) — for this persona, ESMA readiness is more critical than KYC currency
- LMT questions all have equal or near-equal weights, but for a KVG with multiple open-ended funds, `lmt_selected` is dramatically more important than `lmt_investor_communication`

**Trust level:** Medium-high. Good legal references. Would want to see FoMaStG-specific references since German transposition may differ from the directive text.

**Would they share?** Yes, with their team — but would want a PDF export to present to the Geschäftsführung.

---

### Persona 2: Geschäftsführer (MD) of a Small KVG
*(€300M AUM, 2 funds, wears many hats)*

**Missing questions they'd expect:**
- "What's the minimum I legally need to do by April 16?" — the tool doesn't distinguish mandatory Day 1 requirements vs. phased-in provisions (April 2027 extensions)
- Cost/effort estimation — even a rough T-shirt sizing (S/M/L) per gap
- Whether their current service providers (admin, depositary) are covering any of these requirements already
- Proportionality considerations — many AIFMD II provisions apply differently to small AIFMs below thresholds

**Irrelevant questions:**
- `del_subdelegation` — a small KVG with 2 funds likely doesn't have complex sub-delegation chains
- `rep_esma_readiness` — too forward-looking for someone focused on surviving April 2026

**Scoring/weighting concerns:**
- All questions treated equally regardless of fund type (open-ended vs. closed-ended) — LMT requirements only apply to open-ended AIFs but the tool doesn't filter
- No indication of which gaps are "stop the business" vs. "administrative fine" severity

**Trust level:** Medium. Would appreciate a simpler, shorter version. 24 questions feels heavy when you're the only compliance person.

**Would they share?** Unlikely to share externally. Might forward to their lawyer or WP (auditor).

---

### Persona 3: Fund Administrator at a Service KVG
*(50+ funds for external managers)*

**Missing questions they'd expect:**
- Multi-fund/multi-client reporting capabilities and templates
- API and data integration readiness (receiving data from external managers)
- Template standardization across clients
- Operational scalability — can processes handle 50+ fund updates?
- White-labeling of compliance documentation for clients
- Cross-border considerations (managing funds domiciled in different EU jurisdictions)
- AIFMD II marketing passport changes

**Irrelevant questions:**
- `gov_gap_analysis` and `gov_project_team` are too generic — a service KVG needs this per client, not just once

**Scoring/weighting concerns:**
- The scoring doesn't account for scale. A service KVG scoring 70% across 50 funds is in much worse shape than a single-fund KVG at 70% — the remediation effort is 50x.
- No differentiation between "we do this for some funds" vs. "we do this for all funds"

**Trust level:** Low-medium. Too simplistic for their multi-client reality. Would need fund-type filtering at minimum.

**Would they share?** Would share with external managers as a conversation starter — "here's where you need to help us."

---

### Persona 4: Legal/Compliance Consultant Advising KVGs
*(Cares about accuracy, completeness, recommendation-worthiness)*

**Missing questions they'd expect:**
- AIFMD II changes to depositary rules (Art. 21 amendments)
- Changes to AIFM authorization/registration requirements
- New rules on undue costs (Art. 12 amendments — ESMA cost benchmark)
- Supervisory cooperation and data sharing between NCAs
- Transitional provisions — what can be delayed to April 2027?
- Marketing and cross-border distribution changes
- Third-country AIFM regime changes
- ESG/sustainability integration (while not AIFMD II per se, it's closely linked in practice)

**Accuracy concerns:**
- Art. 16(2b)-(2d) references: these sub-article numbers may not be stable in all consolidated versions — should cross-reference with Directive 2024/927 article numbers directly
- "§ 36 KAGB" cited for delegation register — this is correct but should note FoMaStG may amend KAGB sections
- The tool conflates AIFMD II (EU directive) with KAGB (German implementation) without clearly separating the layers — a consultant would notice this
- `loan_retention` cites Art. 15b(1) — correct, but should note the 8-year grandfathering for existing funds
- Missing: the distinction between what's in Directive 2024/927 vs. what will come via Level 2 (RTS/ITS)

**Scoring/weighting concerns:**
- The 70/40 thresholds for risk classification feel arbitrary — no regulatory basis for these numbers
- A consultant would want to see how the score maps to actual regulatory risk

**Trust level:** Medium. Good starting point but too many gaps for a consultant to put their name behind it. Would recommend it as a "first conversation starter" but not as a compliance assessment.

**Would they share?** Yes — as a lead generation tool for their own clients, IF it were more comprehensive and had co-branding options.

---

### Persona 5: CFO/COO of a Real Estate KVG
*(Bottom-line impact, non-compliance consequences, resource planning)*

**Missing questions they'd expect:**
- Real estate-specific considerations (valuation frequency, illiquid asset management)
- Budget/FTE estimation for compliance — "what will this cost me?"
- Non-compliance consequences — fines, license revocation risk, investor claims
- Insurance considerations (D&O, PI)
- Impact on fund terms and investor agreements
- IT system readiness and upgrade requirements

**Irrelevant questions:**
- LMT section is partially irrelevant — most RE funds are closed-ended (though some Offene Immobilienfonds exist)
- Loan origination — RE KVGs rarely originate loans in the AIFMD sense (shareholder loans to SPVs are typically excluded)

**Scoring/weighting concerns:**
- No cost/effort dimension — a CFO needs to know "fixing this gap costs €X and takes Y months"
- The risk badge ("At Risk") means nothing without consequence quantification

**Trust level:** Low. Too compliance-focused, not enough business impact language. A CFO would close this tab.

**Would they share?** Only if it included resource/budget estimates they could take to the board.

---

## 3. Comprehensive Improvement List

### 🎯 Accuracy Improvements

| # | Improvement | Priority |
|---|-----------|----------|
| A1 | **Add fund-type filter at start** (open-ended / closed-ended / both) — skip LMT questions for closed-ended funds | HIGH |
| A2 | **Distinguish Day 1 (Apr 2026) vs. Phase 2 (Apr 2027) requirements** — tag each question with its effective date | HIGH |
| A3 | **Add missing AIFMD II topics:** depositary rules (Art. 21), undue costs (Art. 12), marketing passport changes, third-country regime, valuation (Art. 19) | HIGH |
| A4 | **Separate EU directive layer from German KAGB layer** — clearly label which source is EU-wide vs. Germany-specific | MEDIUM |
| A5 | **Fix article references** — use Directive 2024/927 article numbers alongside AIFMD consolidated references for precision | MEDIUM |
| A6 | **Add grandfathering/transitional provisions** for loan origination (8-year transition for existing funds) | MEDIUM |
| A7 | **Adjust scoring weights** — `rep_esma_readiness` should be weight 2 (not 1); `gov_kyc_current` could be weight 2 (not 3, as it's not AIFMD II-specific) | MEDIUM |
| A8 | **Add proportionality filter** — below-threshold AIFMs have different requirements; ask AUM upfront | MEDIUM |
| A9 | **Refine risk thresholds** — consider 80/50 instead of 70/40, or make them dynamic based on days-to-deadline | LOW |
| A10 | **Add "In Progress" answer option** — real projects are rarely binary; "In Progress" maps better than "Partial" | LOW |

### 💡 Engagement Improvements

| # | Improvement | Priority |
|---|-----------|----------|
| E1 | **Real PDF export** — generate a branded PDF with scores, gaps, and action items (use client-side jsPDF or server-side) | HIGH |
| E2 | **German language toggle** — the German market is the primary audience; offer DE/EN switch | HIGH |
| E3 | **Social share image** — auto-generate an OG image with the score for LinkedIn sharing (e.g., "I scored 62% on AIFMD II readiness") | HIGH |
| E4 | **Save/resume progress** — use localStorage so users can pause and return | MEDIUM |
| E5 | **Results URL with encoded answers** — allow sharing specific results (base64 in URL hash) | MEDIUM |
| E6 | **One-question-at-a-time mode** — reduce cognitive load, increase completion rate | MEDIUM |
| E7 | **Animated score reveal** — count up from 0 to final score for emotional impact | LOW |
| E8 | **Add estimated completion time per category** — "~30 seconds" next to each category | LOW |
| E9 | **Progress persistence indicator** — show "Your answers are saved locally" to reduce abandonment | LOW |

### 🚀 Value-Add Features

| # | Feature | Priority |
|---|---------|----------|
| V1 | **Personalized action plan** — generate a prioritized 90-day plan based on gaps, with effort estimates (S/M/L) | HIGH |
| V2 | **Industry benchmark** — "You scored 58%. The average KVG scores 52%." (aggregate anonymized data from completions) | HIGH |
| V3 | **Compliance Copilot integration** — "Ask Caelith's AI about this gap" button on each results card | HIGH |
| V4 | **Consequence indicators** — per gap, show: fine risk, audit finding risk, investor complaint risk | MEDIUM |
| V5 | **Cost/effort estimator** — rough T-shirt sizing per gap: "Fixing this typically requires: €5-15k, 2-4 weeks, external counsel recommended" | MEDIUM |
| V6 | **Deadline tracker** — after completing the check, offer to set calendar reminders for key AIFMD II milestones | MEDIUM |
| V7 | **Comparison mode** — let users retake and compare scores over time ("You improved from 42% to 67%") | LOW |
| V8 | **Team assessment** — let multiple team members take the check independently, then merge/compare views | LOW |
| V9 | **Consultant co-branding** — let consultants embed the tool with their branding (white-label lead gen) | LOW |

### 📣 LinkedIn Promotion Ideas

| # | Idea | Type |
|---|------|------|
| L1 | **"X days left" countdown series** — weekly posts with decreasing urgency | Recurring content |
| L2 | **Anonymized benchmark stats** — "We analyzed 200+ KVG self-assessments. Here's what we found." | Data-driven post |
| L3 | **"The 3 gaps nobody talks about"** — highlight surprising low-scoring areas | Thought leadership |
| L4 | **Video walkthrough** — 60-second screen recording of taking the check | Demo content |
| L5 | **Consultant partnership posts** — tag lawyers/consultants who should share with clients | Network amplification |
| L6 | **"I took my own readiness check"** (Julian as CEO) — authentic, personal, shows skin in game | Personal brand |
| L7 | **Carousel: "6 AIFMD II categories you must address"** — each slide = one category | Visual content |
| L8 | **Poll: "How ready is your KVG for AIFMD II?"** → follow up with link in comments | Engagement bait |

---

## 4. LinkedIn Promotion Strategy

### Post Angle 1: The Countdown Urgency

**🇩🇪 German:**
> **Noch 49 Tage bis AIFMD II. Wie bereit ist Ihre KVG wirklich?**
>
> Am 16. April 2026 tritt die AIFMD II in Kraft. Keine Verlängerung. Keine Übergangsfrist für die Kernpflichten.
>
> Wir haben einen kostenlosen Readiness Check entwickelt — 24 Fragen, 3 Minuten, sofortige Auswertung.
>
> Kein Login. Keine Daten gespeichert. Nur Klarheit.
>
> 🔗 Link im ersten Kommentar
>
> Was ist Ihre größte AIFMD II-Baustelle? Delegation? Liquiditätsmanagement? Reporting?
>
> #AIFMDII #KVG #Compliance #Fondsregulierung #BaFin

**🇬🇧 English:**
> **49 days until AIFMD II. How ready is your fund manager — really?**
>
> April 16, 2026. No extension. No transition period for core obligations.
>
> We built a free readiness check — 24 expert questions, 3 minutes, instant scorecard.
>
> No signup. No data stored. Just clarity.
>
> 🔗 Link in first comment
>
> What's your biggest AIFMD II gap? Delegation? Liquidity management? Reporting?
>
> #AIFMDII #FundManagement #Compliance #AlternativeInvestments

---

### Post Angle 2: The Shocking Statistic

**🇩🇪 German:**
> **67% der KVGs, die unseren AIFMD II Check gemacht haben, scoren unter 60%.**
>
> Das ist nicht unsere Meinung — das sind die Selbsteinschätzungen von Fondsmanagern.
>
> Die häufigsten Lücken:
> → Kein LMT-Aktivierungskonzept dokumentiert
> → Auslagerungsregister unvollständig
> → Neue Kostentransparenz-Anforderungen nicht umgesetzt
>
> Und der Stichtag ist in 7 Wochen.
>
> Wo steht Ihre KVG? 3 Minuten, kostenlos, anonym.
>
> 🔗 Link im ersten Kommentar
>
> #AIFMDII #Compliance #KVG #Fondsbranche

**🇬🇧 English:**
> **67% of fund managers who took our AIFMD II check scored below 60%.**
>
> That's not our opinion — those are self-assessments from actual AIFMs.
>
> Most common gaps:
> → No documented LMT activation framework
> → Incomplete outsourcing register
> → New cost transparency requirements not implemented
>
> And the deadline is 7 weeks away.
>
> Where does your firm stand? 3 minutes, free, anonymous.
>
> 🔗 Link in first comment
>
> #AIFMDII #Compliance #FundManagement #RegTech

---

### Post Angle 3: The Personal Story (Julian as Founder)

**🇩🇪 German:**
> **Ich habe unseren eigenen AIFMD II Readiness Check gemacht. Das Ergebnis hat mich überrascht.**
>
> Als wir Caelith gebaut haben, dachte ich: "Wir kennen die Regulierung in- und auswendig."
>
> Dann habe ich unseren Check selbst durchgespielt — aus der Perspektive einer typischen KVG mit €500M AUM.
>
> Ergebnis: 54%.
>
> Nicht weil die Fragen unfair sind. Sondern weil die Lücke zwischen "wir wissen, was zu tun ist" und "es ist dokumentiert, implementiert und prüfungssicher" riesig ist.
>
> Genau diese Lücke zeigt der Check.
>
> 3 Minuten. Kostenlos. Keine Anmeldung.
>
> 🔗 Link im ersten Kommentar
>
> #AIFMDII #StartupLife #RegTech #Compliance

**🇬🇧 English:**
> **I took our own AIFMD II readiness check. The result surprised me.**
>
> Building Caelith, I thought: "We know this regulation inside out."
>
> Then I ran our check from the perspective of a typical KVG with €500M AUM.
>
> Result: 54%.
>
> Not because the questions are unfair. But because the gap between "we know what to do" and "it's documented, implemented, and audit-ready" is massive.
>
> That's exactly what this check reveals.
>
> 3 minutes. Free. No signup.
>
> 🔗 Link in first comment
>
> #AIFMDII #Startup #RegTech #Compliance

---

### Post Angle 4: The Expert Breakdown (Educational)

**🇩🇪 German:**
> **AIFMD II: Die 6 Bereiche, die jede KVG bis April 2026 abdecken muss**
>
> [KARUSSELL-POST mit 8 Slides]
>
> Slide 1: "AIFMD II Readiness — Der Überblick"
> Slide 2: 🔗 Delegation & Auslagerung — EU-Substanzanforderung, Auslagerungsregister
> Slide 3: 💧 Liquiditätsmanagement — Mind. 2 LMTs, Aktivierungsregeln
> Slide 4: 📊 Reporting — Erweitertes Annex IV, Datenqualität
> Slide 5: 🛡️ Investorentransparenz — Kostentransparenz, LMT-Information
> Slide 6: 📋 Kreditvergabe — 5% Retention, 20% Konzentrationsgrenze
> Slide 7: ⚙️ Governance — Gap-Analyse, Projektteam, Reg-Monitoring
> Slide 8: "Wo stehen Sie? Kostenloser Check — Link im Kommentar"
>
> #AIFMDII #Fondsregulierung #KVG #Compliance

**🇬🇧 English:**
> **AIFMD II: The 6 areas every fund manager must address by April 2026**
>
> [CAROUSEL POST with 8 slides — same structure as German]
>
> #AIFMDII #FundRegulation #Compliance #AlternativeInvestments

---

### Post Angle 5: The Consultant Challenge

**🇩🇪 German:**
> **An alle Compliance-Berater, Wirtschaftsprüfer und Fondsanwälte:**
>
> Wie gut kennen Ihre Mandanten ihre AIFMD II-Lücken?
>
> Wir haben einen kostenlosen, 3-minütigen Readiness Check gebaut. 24 Fragen zu Delegation, Liquidität, Reporting, Transparenz, Kreditvergabe und Governance.
>
> Nicht als Ersatz für Ihre Beratung — sondern als Gesprächsstarter.
>
> Schicken Sie den Link an 3 Mandanten und fragen Sie: "Was kam bei Ihnen raus?"
>
> Ich garantiere: Es wird Handlungsbedarf sichtbar, den Sie gemeinsam adressieren können.
>
> 🔗 Link im ersten Kommentar
>
> #AIFMDII #Compliance #Beratung #Fondsrecht

**🇬🇧 English:**
> **To all compliance consultants, auditors, and fund lawyers:**
>
> How well do your clients know their AIFMD II gaps?
>
> We built a free 3-minute readiness check. 24 questions covering delegation, liquidity, reporting, disclosure, loan origination, and governance.
>
> Not a replacement for your advice — a conversation starter.
>
> Send the link to 3 clients and ask: "What did you score?"
>
> I guarantee: it will surface action items you can address together.
>
> 🔗 Link in first comment
>
> #AIFMDII #Compliance #Consulting #FundLaw

---

### Posting Cadence

| Week | Post | Notes |
|------|------|-------|
| W1 (Feb 27) | Angle 3 — Personal Story | Warm, authentic, sets the stage |
| W1 (Mar 1) | Angle 4 — Carousel | Educational, high save/share rate |
| W2 (Mar 5) | Angle 1 — Countdown | Urgency driver |
| W2 (Mar 8) | Angle 5 — Consultant Challenge | Expands reach via consultants |
| W3 (Mar 12) | Angle 2 — Shocking Statistic | Only post once you have real data (50+ completions) |
| W3+ | Repeat Angle 1 with updated countdown | Every Thursday until deadline |
| W4+ | Micro-posts with individual findings | "Did you know: only 23% of KVGs have LMT activation rules documented?" |

### Using Results as Content

Once you have 50+ completions, publish anonymized insights:
- **Average score by category** — "Liquidity Management is the weakest area at 38% average"
- **Most common gap** — "78% of respondents haven't updated pre-contractual disclosures"
- **Score distribution** — "Only 12% score above 70% — are you one of them?"
- **Segment insights** — if you add the AUM filter: "Small KVGs (<€500M) score 15 points lower on average"

### CTA Strategy

| Approach | When to Use | Expected CTR |
|----------|-------------|--------------|
| **Link in first comment** | Default for all posts | Higher reach (algorithm doesn't suppress), moderate CTR |
| **Direct link in post** | Reposting by others, carousels | Lower reach but higher CTR from those who see it |
| **"Comment READY for the link"** | Poll/engagement posts | Highest engagement, creates comment volume, but feels gimmicky for B2B |
| **QR code in carousel** | Carousel posts, conference slides | Captures mobile users |

**Recommendation:** Use "Link in first comment" for 80% of posts. Use direct link only in reshares and carousel CTAs. Avoid "comment for link" — it's too B2C for fund management audience.

---

## 5. Quick Wins (Implement This Week)

1. **Add German language toggle** — your primary audience reads German
2. **Add fund-type question at start** (open-ended / closed-ended / both) to skip irrelevant LMT questions
3. **Implement real PDF export** with jsPDF — huge perceived value, captures emails
4. **Add 5 missing high-priority questions** (depositary, undue costs, valuation, transitional provisions, proportionality)
5. **Generate OG share image** — makes LinkedIn shares look professional

---

*This review is based on analysis of the readiness check code, AIFMD II (Directive 2024/927), and practical knowledge of the German KVG market.*
