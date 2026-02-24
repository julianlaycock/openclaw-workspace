# Caelith — 5-Minute Demo Script

**Audience:** KVG Geschäftsführer / Head of Compliance  
**Goal:** Show that Caelith replaces manual compliance workflows with an audit-ready, AI-assisted platform  
**Login:** admin@caelith.com / Admin1234

---

## Minute 0–1: First Impression (Dashboard)

**Navigate:** Login → Dashboard

**What they see:** Compliance score ring, fund overview cards, upcoming deadlines, recent activity

**Say:**
> „Alle Ihre Fonds auf einen Blick — Compliance-Score, regulatorische Deadlines, aktuelle Risiken. Kein Excel, keine E-Mail-Ketten."

**Talking points:**
- Score updates in real-time as rules pass/fail
- Dashboard shows all funds with traffic-light status
- Upcoming regulatory deadlines (compliance calendar)
- „Das sieht Ihr Compliance Officer jeden Morgen als Erstes"

**Click:** Point out the compliance score ring and fund cards. Don't click into settings.

---

## Minute 1–2: Fund Deep Dive

**Navigate:** Click into a fund (e.g., "Growth Fund I") → Overview tab

**What they see:** Fund details, depositary (with LEI), investor list, eligibility classification

**Say:**
> „Jeder Fonds hat seine eigene Compliance-Sicht. Depositar, Anlegerklassifizierung, Delegationen — alles an einem Ort."

**Then click:**
1. **LMTs tab** → Show the Liquidity Management Tools
   - „Artikel 16(2b) verlangt mindestens zwei LMTs pro Fonds. Caelith erzwingt das automatisch."
2. **Delegations tab** → Show delegation entries
   - „Drittstaaten-Delegationen werden automatisch geflaggt — Artikel 20 Compliance auf Knopfdruck."

**Talking points:**
- Investor eligibility: KAGB §1(19), MiFID II Annex II — automatic classification
- ELTIF 2.0 retail suitability with Art. 30(3) exemptions
- Senior persons / EU substance tracking (Art. 8(1)(e))

---

## Minute 2–3: Regulatory Reporting

**Navigate:** Annex IV section (from sidebar or fund view)

**What they see:** Full ESMA Annex IV report — EUR AUM, leverage, geographic exposure, counterparty data

**Say:**
> „Der komplette Annex-IV-Bericht, automatisch befüllt. EUR-AUM, Leverage, geographische Allokation."

**Then click:**
1. **XML Export** button
   - „ESMA-XSD-konform. Direkt an BaFin übermittelbar, ohne manuelle Nacharbeit."
2. **Evidence Bundle**
   - „Jede Aktion wird in einer SHA-256-Hash-Chain protokolliert. Das ist Ihr Audit-Trail — manipulationssicher."

**Talking points:**
- No manual XML editing — export is schema-valid
- Evidence bundles for BaFin audits / WP review
- Hash chain = tamper-evident, court-grade evidence

---

## Minute 3–4: Compliance Intelligence

**Navigate:** Screening section → Rules Engine → Readiness Assessment

**Show in order:**
1. **AML/Sanctions Screening**
   - „PEP- und Sanktionslisten-Check, direkt integriert."
2. **Rules Engine**
   - „13 vorkonfigurierte Regeln über 6 Frameworks. Jede Regel hat eine klare Pass/Fail-Logik mit Begründung."
3. **AIFMD II Readiness Assessment**
   - „24 Fragen, die genau zeigen, wo Sie stehen. Countdown bis 16. April — das ist Ihr Gap-Assessment."

**Say:**
> „Die meisten KVGen wissen nicht genau, wo ihre AIFMD-II-Lücken sind. Caelith zeigt es in 10 Minuten."

**Talking points:**
- Rules are pre-mapped to AIFMD II articles
- Readiness score gives a clear percentage
- Countdown creates urgency (April 16 deadline)

---

## Minute 4–5: AI Copilot & DSGVO

**Navigate:** Open Compliance Copilot (button in sidebar or header)

**Type in Copilot:**
> „Welche Fonds haben das höchste Compliance-Risiko?"

**Wait for response, then say:**
> „Der Copilot hat Zugriff auf alle Fonds-Daten, aber keine personenbezogenen Anlegerdaten verlassen das System. PII wird vor der KI-Anfrage anonymisiert."

**Then briefly mention:**
- „DSGVO-konform ab Tag 1 — Artikel 15, 17, 20 Endpunkte sind eingebaut"
- „AVV-ready, TOM dokumentiert, PII-Anonymisierung im Backend"
- „Hosting in der EU, keine Daten verlassen den europäischen Raum"

**Closing:**
> „Caelith ersetzt Ihren Excel-basierten Compliance-Prozess durch eine Plattform, die Prüfer lieben. Wollen wir über einen Piloten sprechen?"

---

## ⚠️ What NOT to Show

- **Do not** open the API docs / Swagger UI — too technical for this audience
- **Do not** demo user management / RBAC settings — boring, save for technical follow-up
- **Do not** show empty states — make sure demo data is seeded before the call
- **Do not** switch to English during the demo — keep it fully in German for German KVGs
- **Do not** deep-dive into the hash chain implementation — just mention "SHA-256, manipulationssicher"
- **Do not** show the settings/configuration pages — they're functional but not polished

---

## Pre-Demo Checklist

- [ ] Demo data seeded (`npx tsx scripts/seed-data.ts`)
- [ ] At least 2 funds with full data (investors, depositary, LMTs, delegations)
- [ ] Annex IV report populated for at least one fund
- [ ] Copilot API key configured and working
- [ ] Browser zoom at 100%, dark/light mode consistent
- [ ] Screen sharing set up, notifications silenced
