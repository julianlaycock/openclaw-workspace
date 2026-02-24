# Caelith Demo Readiness Audit — 2026-02-22

## Executive Summary

**Grade: B− (Demo-Ready with Caveats)**

The Caelith dashboard is functionally impressive and tells a compelling compliance story. The navigation, data model, and core workflows (fund → investor → rule → decision → report) are solid. However, **significant i18n gaps** undermine the "made for German KVGs" positioning. Multiple pages have English headings, labels, buttons, and full sentences leaking through the German UI. The landing page is well-localized, but the app itself is inconsistent — roughly 60% German, 40% English across all pages combined. The fund detail page and several compliance pages are the worst offenders.

No 404s or crashes were found. Visual polish is good. Data coherence is strong (realistic fund names, investor names, amounts).

---

## Page-by-Page Findings

### 1. Landing Page (`/`)
**German Quality: ★★★★☆**
- Mostly excellent German copy
- **English leaks:**
  - Comparison table: `"2–4 weeks"`, `"1–2 frameworks"`, `"Screenshots & E-Mails"`, `"From €11,880/year"`
  - Step 02: `"Every investor is classified and validated against"` (full English sentence mid-German text)
  - Step 03: `"Manipulationssicher by Design. BaFin-ready by Default."` (English phrases)
  - Framework diagram: `"Six regulatory frameworks. One engine."` (English)
  - Enterprise pricing: `"From €3,500/mo"` (should be "Ab")
  - Footer badges: `"EU Data Residency"`, `"EU-hosted"`, `"GDPR Compliant"`, `"SHA-256 Audit Chain"`
  - UTF-8 encoding issues: `"FÃœR"`, `"fÃ¼r"`, `"Ã„nderungen"` etc. — character rendering broken throughout

### 2. Dashboard (`/dashboard`)
**German Quality: ★★★★☆**
- Headers, cards, sidebar all German ✓
- **English leaks:**
  - `"Compliance score: 100/100 — Gut"` (mixed)
  - Decision table values: `"Scenario Analysis"`, `"simulated"`, `"approved"`, `"Onboarding Approval"`, `"Eligibility Check"`, `"Transfer Validation"`, `"All passed"` → all English
  - `"Template: ..."` fund names (6 template funds visible with English names)
  - Copilot suggestion buttons: all English (`"Summarize my portfolio compliance status"`, etc.)

### 3. Funds List (`/funds`)
**German Quality: ★★★☆☆**
- Page title & subtitle: German ✓
- Buttons: `"Export"`, `"CSV importieren"`, `"+ Neuen Fonds erstellen"` ✓
- **English leaks:**
  - `"Compliant"` (should be "Konform")
  - `"10 investors verified"`, `"6 investors verified"`, `"9 investors verified"` — all English
  - `"Setup Required"` and `"Complete fund configuration"` — English status text
  - `"active"` badge — English
  - Template fund names: `"Template: Luxembourg SIF"`, `"Template: German Spezial-AIF"`, etc. — all English
  - Copilot buttons: all English

### 4. Fund Detail (`/funds/:id`)
**German Quality: ★★☆☆☆** — Most problematic page
- Breadcrumb: `"Funds"` (should be "Fonds")
- **English leaks (extensive):**
  - Buttons: `"Holdings"`, `"Apply Rule Pack"`, `"Annex IV XML"`, `"Evidence Bundle"`, `"Audit Package"`, `"Export PDF"`
  - Labels: `"Inception"`, `"Currency"`, `"SFDR"`, `"Not classified"`
  - Section: `"Total Investors"`, `"Across all assets"`, `"Total AUM"`, `"Total units"`, `"Allocated"`, `"utilized"`, `"Assets"`, `"assets in fund"`
  - Status: `"All Clear"`, `"No risk flags detected for this fund structure."`
  - Table headers: `"Name"`, `"Type"`, `"Total Units"`, `"Allocated"`, `"Utilization"`, `"Holders"`, `"Cap Table →"`
  - Section: `"Eligibility Criteria"`, `"Configured investor eligibility rules"`
  - Table: `"Investor Type"`, `"Jurisdiction"`, `"Min Investment (EUR)"`, `"Suitability"`, `"Not required"`, `"Required"`
  - Cell values: `"institutional"`, `"professional"`, `"semi_professional"` (raw enum, not translated)
  - `"Onboarding Pipeline"` heading, `"total applications"`, `"allocated"` status
  - `"Recent Decisions"` heading with `"Time"`, `"Type"`, `"Result"`, `"Violations"`, `"All passed"`, `"simulated"`, `"approved"`
  - `"Scenario Modeling"`, `"What-if analysis for eligibility criteria changes"`, `"Run Scenario"`
  - Copilot buttons: all English

### 5. Investor List (`/investors`)
**German Quality: ★★★★☆**
- Title, filters, column headers: German ✓
- **English leaks:**
  - Investor type values in table: `"retail"`, `"well informed"`, `"semi professional"`, `"professional"`, `"institutional"` — raw English enums, not translated
  - KYC status values: `"verified"` — not translated (should be "Verifiziert")
  - Dropdown option: `"Select jurisdiction..."` — English
  - Copilot buttons: all English

### 6. Investor Detail (from previous agent)
**German Quality: ★☆☆☆☆** — Nearly entirely English
- `"KYC STATUS"`, `"KYC EXPIRY"`, `"HOLDINGS"`, `"ACCREDITATION"`, `"Identity verified"`, `"Accredited investor"`, `"Holdings"`, `"ASSET"`, `"UNITS"`, `"FUND"`, `"ACQUIRED"`, `"Onboarding Status"`, `"allocated"`, `"Check Eligibility"`, `"Onboarding"`, breadcrumb `"Investors"`

### 7. Holdings (`/holdings`)
**German Quality: ★★☆☆☆**
- **English leaks:**
  - Page title: `"Holdings & Cap Table"` (completely English)
  - Subtitle: `"View ownership and allocate units"` (English)
  - Buttons: `"Import CSV"`, `"+ Allocate Units"`
  - Dropdown: `"Select Asset for Cap Table"`, `"Select an asset..."`
  - Empty state: `"Select an asset"`, `"Choose an asset above to view its cap table."`

### 8. Transfers (`/transfers`)
**German Quality: ★★☆☆☆**
- Title: `"Transfers"` (same in both languages, acceptable)
- Subtitle: German ✓ (`"Simulieren, ausführen und überprüfen..."`)
- **English leaks:**
  - Buttons: `"Bulk Transfer"`, `"+ New Transfer"`
  - Dropdown: `"Asset Scope (optional)"`, `"All assets"`
  - View buttons: `"Table"`, `"Kanban"`
  - Empty state: `"Showing 0 transfers across all assets."`, `"No transfers yet"`, `"Simulate and execute your first transfer using the button above."`

### 9. Regelwerk / Rules (`/rules`)
**German Quality: ★★☆☆☆**
- Title: German ✓
- **English leaks:**
  - Buttons: `"Visual Builder"`, `"+ New Rule"`
  - Dropdown: `"View Rules for Asset"`, `"Select an asset..."`
  - Full section: `"AI Rule Builder"`, `"Describe a compliance rule in plain English and we'll generate the logic for you."`
  - Placeholder: `"e.g., Block retail investors from SIF funds"`
  - Button: `"Generate Rule"`
  - `"Quick Templates"` heading
  - All template buttons: English (`"Block retail investors"`, `"€125K minimum investment"`, etc.)
  - Empty state: `"Select an asset"`, `"Choose an asset above to view its rules."`

### 10. Entscheidungen / Decisions (`/decisions`)
**German Quality: ★★★☆☆**
- Title, filters, column headers: German ✓
- **English leaks:**
  - Table values: `"Eligibility Check"`, `"rejected"`, `"approved"`, `"simulated"`, `"Scenario Analysis"`, `"Onboarding Approval"`, `"Transfer Validation"` — all English
  - `"Showing 23 of 23 decisions"` — English
  - `"1 of 8 failed"`, `"6 passed"`, `"1 passed"` — English
  - `"View"` button — English
  - `"System"`, `"System Admin"` — English
  - Copilot buttons: all English

### 11. Screening (`/screening`)
**German Quality: ★★★★★** — Best page!
- Fully German title, subtitle, button, empty state

### 12. Annex IV Bericht (`/reports/annex-iv`)
**German Quality: ★★★★☆**
- Mostly excellent German
- **English leaks:**
  - `"Article 24(4)"` (acceptable, regulatory reference)
  - Leverage: `"Commitment-Methode"` / `"Bruttomethode"` — good
  - Liquidity: `"Quarterly"` — English
  - LMT tools: `"redemption in kind"`, `"notice period"` — English
  - Disclaimer: Full paragraph in English (`"This AIFMD Annex IV report was generated by..."`)

### 13. Evidenz-Paket (`/reports/evidence-bundle`)
**German Quality: ★★★★★** — Excellent
- Fully German, well-translated
- File names in English (acceptable — technical filenames)

### 14. AIFMD II Check / Readiness (`/readiness`)
**German Quality: ★★★★★** — Excellent
- Title: `"AIFMD II Readiness Assessment"` (English, but standard term)
- All questions, explanations, buttons in German ✓
- Legal references in German ✓
- Copilot buttons: English

### 15. Kalender (`/calendar`)
**German Quality: ★★★☆☆**
- Summary cards: German ✓
- Filter buttons: German ✓
- **English leaks:**
  - All event titles: `"AIFMD II Transposition Deadline"`, `"Annex IV Q1 Filing Deadline"`, `"SFDR Annual Disclosure"`, `"BaFin Annual Report Deadline"`, `"AMLR Effective Date"`
  - All event descriptions: Full English sentences
  - KYC events: `"KYC Expiry: ..."`, `"KYC expires in X days. Current status: verified."`

### 16. Audit-Protokoll (`/audit-log`)
**German Quality: ★★★☆☆**
- Title: German ✓
- **English leaks:**
  - Filter dropdown values: `"investor"`, `"fund structure"`, `"transfer"`, `"rule"`, `"composite rule"`, `"eligibility criteria"`, `"onboarding"`, `"readiness answer"`, `"asset"`, `"holding"`, etc. — all raw English enums
  - Shows "Keine Audit-Einträge gefunden" (blank state, German ✓ — but suspicious there are no entries at all)

### 17. Compliance Copilot (global)
**German Quality: ★★☆☆☆**
- Disclaimer text: German ✓
- Input placeholder: German ✓
- **All suggestion buttons on every page: English** (this is the single most consistently wrong element across the entire app)

---

## Demo Story Coherence

**Rating: ★★★★☆ — Very Good**

- Fund names are plausible and diverse: Meridian SIF Alpha (LU), Evergreen RAIF Beta (LU), Atlantic QIAIF Gamma (IE), Horizon ELTIF 2.0 Delta (LU), Berlin Immobilien Spezial-AIF I (DE) ✓
- AIFM names fit: Meridian Capital AIFM S.à r.l., Berliner Kapitalverwaltung GmbH ✓
- Investor names: realistic mix of German (Allianz, Mueller Family Office, Bayerische Versorgungskammer) and international (CalPERS, Temasek, Nomura) ✓
- Amounts: sensible unit ranges (100K–2M), reasonable fund sizes ✓
- The AIFMD II deadline countdown (54 days to April 16, 2026) creates urgency ✓
- **Minor issue:** 6 "Template:" funds visible in lists (e.g., "Template: Luxembourg SIF") — these look like seed data and should be hidden or deleted before demos

---

## Issue Classification

### P0 — Demo Killers 🔴

| # | Issue | Page(s) |
|---|-------|---------|
| 1 | **Investor detail page ~95% English** | `/investors/:id` |
| 2 | **Fund detail page ~50% English** — the page you'd click into during any demo | `/funds/:id` |
| 3 | **UTF-8 encoding broken on landing page** — "FÃœR", "fÃ¼r" instead of proper umlauts | `/` (landing) |
| 4 | **Template funds visible** — "Template: Luxembourg SIF" etc. look like test data | `/funds`, `/dashboard` |

### P1 — Noticeable in Demo 🟡

| # | Issue | Page(s) |
|---|-------|---------|
| 5 | Holdings page entirely English (title, subtitle, all labels) | `/holdings` |
| 6 | Transfers page mostly English (buttons, dropdowns, empty state) | `/transfers` |
| 7 | Rules page: AI Rule Builder section entirely English | `/rules` |
| 8 | Calendar event titles & descriptions all English | `/calendar` |
| 9 | Copilot suggestion buttons English on every page | Global |
| 10 | Decision table values all English (approved/rejected/simulated, type names) | `/decisions`, `/dashboard` |
| 11 | Investor type & KYC status values shown as raw English enums in table | `/investors` |
| 12 | Annex IV disclaimer paragraph entirely English | `/reports/annex-iv` |
| 13 | Audit log filter values are raw English enums | `/audit-log` |
| 14 | Audit log shows zero entries — should have seed data | `/audit-log` |

### P2 — Minor 🟢

| # | Issue | Page(s) |
|---|-------|---------|
| 15 | Landing page comparison table has English fragments | `/` |
| 16 | `"Quarterly"` not translated in Annex IV liquidity section | `/reports/annex-iv` |
| 17 | `"active"` badge not translated on fund cards | `/funds` |
| 18 | Dashboard sidebar user shows `"--"` instead of user name | Global |
| 19 | `"Select jurisdiction..."` option in investor filter dropdown | `/investors` |
| 20 | Readiness title is English (`"AIFMD II Readiness Assessment"`) | `/readiness` |

---

## Comprehensive i18n Gaps List

### English strings found on German UI pages:

**Global / Sidebar:**
- `"EN"` button (intentional toggle)
- `"Light Mode"` button label
- `"Close copilot"`
- All Copilot suggestion buttons (4 per page × 15+ pages)
- `"--"` where user name should appear

**Dashboard:**
- `"Compliance score: 100/100"`, `"Scenario Analysis"`, `"simulated"`, `"approved"`, `"Onboarding Approval"`, `"Eligibility Check"`, `"Transfer Validation"`, `"All passed"`, `"Template: ..."` fund names

**Funds List:**
- `"Compliant"`, `"X investors verified"`, `"Setup Required"`, `"Complete fund configuration"`, `"active"`, `"Template: Luxembourg SIF"`, `"Template: German Spezial-AIF"`, `"Template: Luxembourg RAIF"`, `"Template: Irish RIAIF"`, `"Template: ELTIF 2.0"`, `"Template: Irish QIAIF"`

**Fund Detail (massive):**
- `"Funds"` (breadcrumb), `"Holdings"`, `"Apply Rule Pack"`, `"Annex IV XML"`, `"Evidence Bundle"`, `"Audit Package"`, `"Export PDF"`, `"Inception"`, `"Currency"`, `"SFDR"`, `"Not classified"`, `"Total Investors"`, `"Across all assets"`, `"Total AUM"`, `"Total units"`, `"Allocated"`, `"utilized"`, `"Assets"`, `"assets in fund"`, `"All Clear"`, `"No risk flags detected for this fund structure."`, `"Name"`, `"Type"`, `"Total Units"`, `"Utilization"`, `"Holders"`, `"Cap Table →"`, `"Export Cap Table PDF"`, `"Eligibility Criteria"`, `"Configured investor eligibility rules"`, `"Investor Type"`, `"Jurisdiction"`, `"Min Investment (EUR)"`, `"Suitability"`, `"Not required"`, `"Required"`, `"institutional"`, `"professional"`, `"semi_professional"`, `"Onboarding Pipeline"`, `"total applications"`, `"allocated"`, `"Recent Decisions"`, `"Time"`, `"Result"`, `"Violations"`, `"All passed"`, `"Scenario Modeling"`, `"What-if analysis for eligibility criteria changes"`, `"🔮 Run Scenario"`, `"Fund"` (type column)

**Investor List:**
- `"retail"`, `"well informed"`, `"semi professional"`, `"professional"`, `"institutional"`, `"verified"`, `"Select jurisdiction..."`

**Investor Detail:**
- `"KYC STATUS"`, `"KYC EXPIRY"`, `"HOLDINGS"`, `"ACCREDITATION"`, `"Identity verified"`, `"Accredited investor"`, `"ASSET"`, `"UNITS"`, `"FUND"`, `"ACQUIRED"`, `"Onboarding Status"`, `"allocated"`, `"Check Eligibility"`, `"Onboarding"`, `"Investors"` (breadcrumb)

**Holdings:**
- `"Holdings & Cap Table"`, `"View ownership and allocate units"`, `"Import CSV"`, `"+ Allocate Units"`, `"Select Asset for Cap Table"`, `"Select an asset..."`, `"Select an asset"`, `"Choose an asset above to view its cap table."`

**Transfers:**
- `"Bulk Transfer"`, `"+ New Transfer"`, `"Asset Scope (optional)"`, `"All assets"`, `"Table"`, `"Kanban"`, `"Showing 0 transfers across all assets."`, `"No transfers yet"`, `"Simulate and execute your first transfer using the button above."`

**Rules:**
- `"Visual Builder"`, `"+ New Rule"`, `"View Rules for Asset"`, `"Select an asset..."`, `"AI Rule Builder"`, `"Describe a compliance rule in plain English..."`, `"Generate Rule"`, `"Quick Templates"`, `"Block retail investors"`, `"€125K minimum investment"`, `"Restrict US persons"`, `"Professional investors only"`, `"KYC verified required"`, `"EU/EEA residents only"`, `"Select an asset"`, `"Choose an asset above to view its rules."`

**Decisions:**
- `"Showing 23 of 23 decisions"`, `"Eligibility Check"`, `"rejected"`, `"approved"`, `"simulated"`, `"Scenario Analysis"`, `"Onboarding Approval"`, `"Transfer Validation"`, `"X of Y failed"`, `"X passed"`, `"View"`, `"System"`, `"System Admin"`

**Calendar:**
- `"AIFMD II Transposition Deadline"`, `"EU Member States must transpose..."`, `"Annex IV Q1 Filing Deadline"`, `"AIFMD Annex IV report due for Q1 2026..."`, `"SFDR Annual Disclosure"`, `"BaFin Annual Report Deadline"`, `"Annual activity report to BaFin..."`, `"AMLR Effective Date"`, `"KYC Expiry: ..."`, `"KYC expires in X days. Current status: verified."`

**Annex IV:**
- `"Quarterly"`, `"redemption in kind"`, `"notice period"`, `"Private Equity"`, `"Fund"`, full English disclaimer paragraph

**Audit Log:**
- `"investor"`, `"fund structure"`, `"transfer"`, `"rule"`, `"composite rule"`, `"eligibility criteria"`, `"onboarding"`, `"readiness answer"`, `"asset"`, `"holding"`, `"investor document"`, `"lmt"`, `"delegation"`

---

## Ideal 5-Minute Demo Click Path

1. **Landing Page** (30s) — Quick scroll showing positioning, pricing, AIFMD II countdown. Skip quickly due to encoding issues.
2. **Dashboard** (60s) — Show compliance score 100/100, fund cards, KYC pipeline, investor type distribution, jurisdiction map. Point to "54 Tage bis AIFMD II".
3. **Funds → Meridian SIF Alpha** (60s) — Click into fund detail, show overview tab, jurisdiction pie chart, KYC status. **Avoid scrolling to English-heavy sections** (Assets table, Eligibility Criteria, Onboarding Pipeline).
4. **Annex IV Bericht** (45s) — Select Meridian SIF Alpha, show AIF identification, investor concentration, leverage, compliance status. Highlight XML export.
5. **Evidenz-Paket** (30s) — Show hash chain integrity ✅, bundle contents, PDF export.
6. **AIFMD II Check** (45s) — Show gap analysis, answer a question live. Highlight auto-detection.
7. **Entscheidungen** (30s) — Show decision chain with hash-linked integrity. Click "Kettenintegrität prüfen".
8. **Compliance Copilot** (30s) — Ask a natural language question (type in German).

**⚠️ Avoid during demo:** Investor detail page, Holdings page, Transfers page, Rules page (AI Builder section), Calendar event details.

---

## Fixes Needed Before Next Demo

### Must-Fix (P0) — Before any demo:

1. **Translate fund detail page** — This is the #1 priority. Every label, heading, table header, status text, and button needs German i18n.
2. **Translate investor detail page** — Nearly 100% English, needs full i18n pass.
3. **Fix UTF-8 encoding on landing page** — Umlauts rendering as `FÃœR`, `fÃ¼r` etc. Likely a charset/meta tag issue.
4. **Hide or delete template funds** — Remove "Template: ..." funds from seed data, or filter them from the UI.

### Should-Fix (P1) — Before investor-facing demos:

5. **Translate enum values everywhere** — `"retail"` → `"Privatanleger"`, `"verified"` → `"Verifiziert"`, `"approved"` → `"Genehmigt"`, `"rejected"` → `"Abgelehnt"`, `"simulated"` → `"Simuliert"`, etc. This affects Investors, Decisions, Dashboard, Fund Detail.
6. **Translate Holdings page** — Full page English.
7. **Translate Transfers page** — Buttons, dropdowns, empty states.
8. **Translate Rules page** — AI Builder section, templates, empty states.
9. **Translate Calendar events** — Titles and descriptions.
10. **Translate Copilot suggestion buttons** — On every page.
11. **Translate Annex IV disclaimer** — Full paragraph.
12. **Seed audit log data** — Currently empty, should show activity.

### Nice-to-Have (P2):

13. Fix landing page English fragments in comparison table and steps.
14. Show actual user name in sidebar instead of `"--"`.
15. Translate `"Light Mode"` button.
16. Translate `"active"` fund status badge.

---

*Report generated 2026-02-22T19:20 CET by Caelith Demo Readiness Audit*
