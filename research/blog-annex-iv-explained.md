# The AIFMD II Annex IV XML Schema, Explained for Humans

*Last updated: February 2026 · By the Caelith team*

---

## What Is Annex IV and Why Should You Care

Annex IV is the standardized reporting template that every AIFM in the EU must file with its National Competent Authority (NCA) under the Alternative Investment Fund Managers Directive. AIFMD II — the revised directive entering force on **April 16, 2026** — significantly expands what you need to report: more granular exposure data, new leverage breakdowns, additional risk metrics, and tighter validation rules. The filing format is XML, validated against ESMA's XSD schema (currently Rev 6, version 1.2).

If you're a compliance officer at a German KVG, this is not optional reading. Your first filing under the new regime could be due as early as Q2 2026, and the XML schema has over 200 fields with conditional logic that will reject your submission if you get a single enumeration wrong. The good news: once you understand the structure, it's not magic — it's just bureaucracy with angle brackets.

---

## The XML Schema in Plain Language

The Annex IV XML file is a nested tree. Think of it as a form with sections. Here's the hierarchy that actually matters:

### 1. AIFMReportingInfo (the wrapper)

The root element. Contains metadata about who's filing and when.

```xml
<AIFMReportingInfo
  CreationDateAndTime="2026-06-30T12:00:00"
  Version="1.2"
  ReportingMemberState="DE">
```

This tells ESMA: "This report was created on this date, uses schema version 1.2, and is filed in Germany."

### 2. AIFMRecordInfo (about the manager)

One per AIFM. This section identifies your firm:

```xml
<AIFMRecordInfo>
  <FilingType>INIT</FilingType>
  <AIFMContentType>1</AIFMContentType>
  <ReportingPeriodStartDate>2026-01-01</ReportingPeriodStartDate>
  <ReportingPeriodEndDate>2026-03-31</ReportingPeriodEndDate>
  <ReportingPeriodType>Q1</ReportingPeriodType>
  <AIFMReportingCode>1</AIFMReportingCode>
  <AIFMJurisdiction>DE</AIFMJurisdiction>
  <AIFMNationalCode>K-FR-XXXX-XXXX-X</AIFMNationalCode>
  <AIFMName>Muster Kapitalverwaltungsgesellschaft mbH</AIFMName>
  <AIFMEEAFlag>true</AIFMEEAFlag>
  <AIFMNoReportingFlag>false</AIFMNoReportingFlag>
  <!-- ... -->
</AIFMRecordInfo>
```

Key fields: `FilingType` (INIT for first filing, AMND for amendments), `AIFMContentType` (1 = full report with AIF data, 2 = AIFM-only), and the `ReportingPeriod` block that defines which quarter you're filing.

### 3. AIFRecordInfo (about each fund)

One per AIF managed. This is where most of the complexity lives. Each fund gets its own block covering:

- **AIFDescription** — NAV, inception date, fund type, domicile
- **AIFIndividualInfo** — the big one:
  - **MainInstrumentsTraded** — top 5 instruments by value, coded by asset type and sub-type
  - **IndividualExposure** — macro and geographical exposure breakdowns
  - **RiskProfile** — market risk, counterparty risk, liquidity profile
  - **LeverageInfo** — leverage calculated via Gross Method and Commitment Method
  - **StressTests** — results of NAV stress tests (new in AIFMD II)
  - **LiquidityManagement** — liquidity management tools available (also new)

```xml
<AIFRecordInfo>
  <AIFNationalCode>DE000EXAMPLE01</AIFNationalCode>
  <AIFName>Muster Immobilienfonds I</AIFName>
  <AIFMemberState>DE</AIFMemberState>
  <AIFDescription>
    <AIFMasterFeederStatus>NONE</AIFMasterFeederStatus>
    <PredominantAIFType>PEQF</PredominantAIFType>
    <AIFBaseCurrency>EUR</AIFBaseCurrency>
    <AIFNetAssetValue>250000000</AIFNetAssetValue>
    <!-- ... -->
  </AIFDescription>
  <AIFIndividualInfo>
    <!-- The deep stuff goes here -->
  </AIFIndividualInfo>
</AIFRecordInfo>
```

### 4. The Exposure & Risk Blocks

These are tables encoded as XML. Each row is an element with coded values:

```xml
<MainInstrumentsTraded>
  <MainInstrumentTraded>
    <Ranking>1</Ranking>
    <SubAssetType>DER_FEX_FORW</SubAssetType>
    <InstrumentCodeType>ISIN</InstrumentCodeType>
    <InstrumentValue>45000000</InstrumentValue>
    <ShortPosition>false</ShortPosition>
  </MainInstrumentTraded>
</MainInstrumentsTraded>
```

The sub-asset type codes (`DER_FEX_FORW` = derivative, foreign exchange, forward) are enumerated in the XSD. There are roughly 80 of them. Get one character wrong and validation fails silently on some NCA portals.

---

## 5 Fields That Trip Everyone Up

### 1. LEI Validation (AIFMLEICode / AIFLEICode)

The Legal Entity Identifier must be a valid, active 20-character LEI. Not "applied for." Not expired. Not the old pre-LEI code you used in 2019. ESMA's validator cross-checks against the GLEIF database. If your LEI lapsed and you didn't renew it, your entire filing gets rejected — not just the field.

**Fix:** Check your LEI status at [search.gleif.org](https://search.gleif.org) before filing season. Renewal takes 1-3 business days.

### 2. ReportingMemberState

This isn't where your fund is domiciled. It's where the AIFM is authorized. German KVG managing a Luxembourg fund? `ReportingMemberState` is `DE`, not `LU`. Mixing this up means your file goes to the wrong NCA — or more likely, gets rejected by the right one.

### 3. NAVFrequency

ESMA expects a specific code: `D` (daily), `W` (weekly), `BM` (bi-monthly), `M` (monthly), `Q` (quarterly), `HY` (half-yearly), `Y` (yearly), `N` (not applicable). Common mistake: using `A` for annual (it's `Y`) or `S` for semi-annual (it's `HY`). These are enumerated in the XSD — there's no freetext fallback.

### 4. PredominantAIFType

You must classify each fund into one of ESMA's buckets: `HFND` (hedge fund), `PEQF` (private equity), `REST` (real estate), `FOFS` (fund of funds), `OTHR` (other), and a few more. The gotcha: this drives **which subsequent fields are required**. Classify a real estate fund as `OTHR` and you'll skip required property-type breakdowns. Classify it as `REST` and suddenly 15 more fields appear. There's no shortcut — pick the right type.

### 5. Leverage: Gross vs. Commitment Method

AIFMD II requires leverage reported under **both** the Gross Method and the Commitment Method. These are not the same number. Gross includes all positions at absolute value (no netting). Commitment allows netting and hedging offsets.

```xml
<LeverageAIF>
  <GrossMethodRate>2.35</GrossMethodRate>
  <CommitmentMethodRate>1.80</CommitmentMethodRate>
</LeverageAIF>
```

A leverage ratio of 1.0 means no leverage. If your Gross is lower than your Commitment, something is wrong with your calculation. Common error: submitting percentages (235%) instead of ratios (2.35).

---

## NCA Differences That Matter

The XSD is European, but the filing portals are national. Each NCA adds its own flavor.

### BaFin (Germany)

- Filing portal: MVP Portal (Meldewesen-Plattform)
- **National code format:** BaFin uses its own WM-Nummer or registration code, not a freely chosen ID. Must match exactly.
- **Extra validation:** BaFin runs additional plausibility checks beyond XSD validation. A file can be schema-valid but still rejected by BaFin's backend if NAV figures are inconsistent across sections.
- **Filing frequency quirk:** BaFin expects sub-threshold AIFMs to file annually, but the reporting period must still align to calendar quarters — you file once, but for Q4.

### CSSF (Luxembourg)

- Filing portal: eDesk (SOFiE reporting module)
- **LEI mandatory since 2024** — no grace period. Some older CSSF filers still have placeholder LEIs; these will be hard-rejected under AIFMD II.
- **Passporting fields:** If you're a German KVG filing for a Lux-domiciled AIF, CSSF expects the `AIFMemberState` to be `LU` and the `ReportingMemberState` to be `DE`. Getting these crossed is the #1 support ticket at CSSF.
- **More granular fund-of-funds reporting** required than other NCAs for certain categories.

### AMF (France)

- Filing portal: GECO / ROSA
- **Stricter on stress test data** — AMF has been an early adopter of the AIFMD II stress testing requirements and expects populated stress test fields even in transitional periods where other NCAs accept blanks.
- **Language:** Error messages are in French. Plan accordingly.

### The Universal Truth

No two NCA portals give the same error messages for the same problem. BaFin gives you a plausibility error code. CSSF gives you a line number. AMF gives you a French sentence. Build your validation locally before uploading anywhere.

---

## How to Validate Your XML

### Step 1: XSD Validation

This is the minimum. Validate your XML against ESMA's official XSD (Rev 6 v1.2). This catches:
- Missing required elements
- Wrong enumeration values
- Invalid data types (string where integer expected)
- Structural errors (wrong nesting)

Any XML editor or command-line tool (`xmllint`, Python's `lxml`) can do this.

### Step 2: Business Logic Checks

XSD validation won't catch:
- NAV values that don't add up across sections
- Leverage ratios below 1.0 (mathematically impossible)
- Exposure percentages that don't sum to ~100%
- Missing sections that are conditionally required based on `PredominantAIFType`

This is where most rejections happen. The file is technically valid XML but logically broken.

### Step 3: NCA-Specific Pre-Checks

Each NCA has quirks (see above). Ideally, validate against your specific NCA's known rules before uploading.

### What Caelith Does

Caelith's Annex IV generator runs all three layers automatically. You fill in structured data (or import from your portfolio system), and it outputs a schema-valid, business-logic-checked, NCA-aware XML file. We also offer a [free XML validator](https://www.caelith.tech) that checks your existing files against the XSD and flags the most common business logic errors.

---

## The Deadline Math

**April 16, 2026** is when AIFMD II applies. Here's your timeline, working backwards:

| Date | What |
|------|------|
| **April 16, 2026** | AIFMD II enforcement. New reporting obligations active. |
| **March 2026** | First filing window opens for Q1 2026 reporters (30-45 day filing window depending on NCA). |
| **February 2026** | Your XML generator, data pipeline, and validation process should be tested end-to-end with real data. ← **You are here.** |
| **January 2026** | Internal UAT. Map your fund data to the new schema fields. Identify gaps. |
| **Q4 2025** | Choose your tooling. Build or buy. Start integration. |
| **Q3 2025** | If you haven't started, you're behind. |

### If you're reading this in February 2026:

You have **7 weeks**. That's tight but doable if you:
1. Have your fund data accessible and structured
2. Pick a tool that handles the XSD validation + NCA quirks for you
3. Do a dry run against your NCA portal (most allow test submissions)
4. Don't try to hand-edit XML — one misplaced tag and you're debugging at 11 PM on filing night

### The real risk isn't the deadline — it's the first rejection.

NCA portals don't give instant feedback. BaFin's processing can take 24-48 hours. If your first submission bounces on Day 1 of the filing window, you've already lost two days. Submit early. Submit a test file. Don't wait.

---

## TL;DR

- Annex IV is a structured XML report filed by every EU AIFM — expanded significantly under AIFMD II
- The schema has 200+ fields, conditional logic based on fund type, and NCA-specific quirks
- The five biggest gotchas: LEI validation, ReportingMemberState confusion, NAVFrequency codes, PredominantAIFType driving conditional fields, and leverage ratio formatting
- BaFin, CSSF, and AMF all have different portal behaviors and validation rules
- Validate locally at three levels (XSD, business logic, NCA-specific) before uploading
- April 16, 2026 is the hard deadline — start your test filing now

---

*Caelith builds compliance infrastructure for European fund managers. Our Annex IV generator validates against ESMA XSD Rev 6 v1.2 with NCA-specific profiles for BaFin, CSSF, and AMF. [Learn more →](https://www.caelith.tech)*
