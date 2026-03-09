# LinkedIn Daily Outreach — Cron Task Instructions

## What This Does
Every day at 9:00 AM CET, generate a ready-to-send LinkedIn outreach list for Julian.

## Steps

1. **Read state**: Load `memory/linkedin-outreach-state.json` to see who's already been contacted
2. **Read prospect list**: Load `linkedin-outreach-targets-50.md` for KVG targets AND also use the Fund Admin Target List embedded below.
3. **Select next 10**: Pick the next 10 un-contacted prospects, prioritizing:
   - 🔴 Fund admin targets (HIGH PRIORITY — each admin serves multiple funds = high leverage)
   - 🟡 KVG Tier 1 targets second
   - KVG Tier 3 > Tier 4 after that

---

## 🔴 Fund Admin Target List (HIGH PRIORITY — pre-researched, DACH/EU)

These are real people at German/EU fund administration firms. Use the Fund Admin message template for all of them.

| # | Name | Title | Company | LinkedIn URL | City |
|---|------|-------|---------|-------------|------|
| FA-1 | Andrea Kind | Head of Legal & Compliance | HANSAINVEST | https://www.linkedin.com/in/andrea-kind-52462534/ | Hamburg, DE |
| FA-2 | Sandra Ender | Teamleitung Compliance & AML | HANSAINVEST | https://www.linkedin.com/in/sandra-ender-599846131/ | Hamburg, DE |
| FA-3 | Michael Zirschnitz | Reporting Services | HANSAINVEST | https://www.linkedin.com/in/michael-zirschnitz-b8b51480/ | Hamburg, DE |
| FA-4 | Jürgen Lemmen | Group Head of Middle Office | Universal Investment | https://www.linkedin.com/in/j%C3%BCrgen-lemmen-17a92897/ | Frankfurt, DE |
| FA-5 | Gerald Hann von Hannenheim | Director – Head of Fund Administration Germany | (PE firm, Germany) | https://www.linkedin.com/in/gerald-hann-von-hannenheim-565077a/ | Germany | ⚠️ InMail-only — skip |
| FA-6 | Luca Farinella | Fund Admin / Regulatory | Hauck Aufhäuser Lampe | https://www.linkedin.com/in/luca-farinella-53b46b29b/ | Frankfurt, DE | ⚠️ InMail-only — skip |
| FA-7 | Frank J. Linker | Senior Advisor | Hauck Aufhäuser Lampe | https://www.linkedin.com/in/frank-j-linker-93985b15/ | Frankfurt, DE | ⚠️ InMail-only — skip |
| FA-8 | Alexandra Hajkova | Director of Product & Fund Structuring | (EU fund admin) | https://www.linkedin.com/in/talirova/ | EU | ⚠️ InMail-only — skip |

## 🟡 KVG Targets — Pre-Researched (use KVG message template)

| # | Name | Title | Company | LinkedIn URL | City | Notes |
|---|------|-------|---------|-------------|------|-------|
| KVG-P1 | Andreas Haas | Head of Risks | AEW Invest GmbH | https://www.linkedin.com/in/andreas-haas-mba-mrics-320b2b77/ | Frankfurt, DE | 329 connections, KVG compliance+risk |
| KVG-P2 | Matthias J. Meckert | Legal/Regulatory | PGIM Real Estate Germany AG | https://www.linkedin.com/in/matthias-j-meckert-9555bb15/ | Frankfurt, DE | AIFMD + ESG specialist |
| KVG-P3 | Bernhard Pfeiler | Head of Portfolio Management (KVG) | Catella Real Estate AG | https://www.linkedin.com/in/bernhard-pfeiler-578971222/ | Munich, DE | 500+ connections |
| KVG-P4 | André Göpfert | — | AIF Kapitalverwaltungs-AG | https://de.linkedin.com/in/andr%C3%A9-g%C3%B6pfert-9a0047114 | Stuttgart/Munich, DE | Small profile, likely open to connect |
| KVG-P5 | Jörg Schubert | Geschäftsführer | Master-KVG | https://www.linkedin.com/in/j%C3%B6rg-schubert-4b7329158/ | Germany | Decision maker |

**Next fund admins to research** (search for compliance/reporting leads at):
- IntReal International Real Estate KVG (Hamburg) — specialist real estate fund admin, 60+ mandates
- Verwahrstelle BLB (Bayerische Landesbank) — depositary + admin
- CACEIS Germany (Frankfurt/Munich) — major French-German fund admin
- Société Générale Securities Services Germany
- BNY Mellon Germany (Frankfurt)
- Apex Group Germany
- Alter Domus Germany
- IQ-EQ Germany

---
4. **Search for each prospect**: For each of the 10, run a web search:
   - Query: `site:linkedin.com/in "{Company Name}" compliance OR "head of compliance" OR "compliance officer" OR "Leiter Compliance" OR "Fondsadministration" OR "fund administration"`
   - **CRITICAL**: Only use profiles where the person is clearly based in DACH (Germany, Austria, Switzerland) or works for a DACH/EU fund manager or fund admin firm. Discard any profile that appears to be US/UK-based or works at a non-EU firm (e.g. Binance, US banks, US hedge funds).
   - Find the ACTUAL LinkedIn profile URL and full name
   - If no compliance person found, search for COO, Geschäftsführer, or Head of Fund Administration
   - **Skip and move to next prospect** if no DACH-relevant profile can be found
   - **CRITICAL**: Only include profiles where the free **"Connect"** button is available. If a profile only shows "Message" (InMail) or "Follow", skip it — InMail requires paid credits. Prioritise open profiles and 2nd-degree connections where Connect is free.
5. **Generate personalized messages**: For each found profile, fill in LinkedIn connection template (300 char limit — count carefully):

   **For KVGs (Kapitalverwaltungsgesellschaften):**
   - DE: `Hallo {Vorname}, KVGs verlieren Wochen mit manuellem Annex-IV-Reporting. Caelith automatisiert das — ESMA-validiert, 93% günstiger als Berater. April-Deadline naht: caelith.tech`
   - EN: `Hi {Name}, KVGs still lose weeks on manual Annex IV filings. Caelith automates it — ESMA-validated, 93% cheaper than consultants. April 16 deadline: caelith.tech`

   **For Fund Admins (Fondsadministratoren / Verwaltungsgesellschaften):**
   - DE: `Hallo {Vorname}, Fondsadmins, die Annex IV noch manuell erstellen, riskieren Fehler und Verzögerungen. Caelith automatisiert AIFMD-Reporting für alle Mandate. Demo: caelith.tech`
   - EN: `Hi {Name}, fund admins handling Annex IV manually risk errors and delays across mandates. Caelith automates AIFMD reporting at scale. See the demo: caelith.tech`

   Choose DE for German-speaking profiles, EN for international profiles at EU firms. Always pick the template matching the prospect type (KVG vs Fund Admin).
6. **Update state**: Add contacted names to `linkedin-outreach-state.json`
7. **Deliver to Julian** via WhatsApp in this format:

```
🔗 LinkedIn Outreach — {date}

1. **{Name}** — {Title} at {Company}
   Profile: {URL}
   Message: {personalized message}

2. ...

📋 Just open each link, click Connect, paste the message. ~5 min total.
```

## Rules
- Never repeat a prospect already in contacted list
- If fewer than 10 prospects remain, say so and suggest refreshing the list
- Skip weekends (Sat/Sun) — LinkedIn activity on weekdays performs better
- Track in state file after each run
