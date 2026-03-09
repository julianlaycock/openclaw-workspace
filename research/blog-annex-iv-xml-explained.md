# Annex IV XML Schema Explained for Humans

*A practical guide to AIFMD Annex IV reporting, the ESMA XSD schema, and how to generate validated XML without losing your mind.*

---

**TL;DR:** Every Alternative Investment Fund Manager (AIFM) in the EU must file Annex IV reports to their National Competent Authority (NCA) in a specific XML format defined by ESMA. The schema is dense, the documentation is scattered, and validation errors are cryptic. This post breaks it all down — and shows you how Caelith can generate XSD-validated XML via a single API call.

---

## What Is Annex IV Reporting?

Annex IV reporting is the mandatory transparency reporting requirement under the **Alternative Investment Fund Managers Directive (AIFMD)**. If you manage or market alternative investment funds in the EU — hedge funds, private equity, real estate funds, funds of funds — you almost certainly need to file it.

The report captures a comprehensive snapshot of each fund's:

- **Assets under management (AUM)** and net asset value (NAV)
- **Investment strategy** and instrument breakdown
- **Leverage** (gross and commitment methods)
- **Liquidity profile** — both portfolio and investor-side
- **Risk measures** — market, counterparty, and concentration
- **Geographical and sectoral exposure**
- **Stress test results**

Reports are filed **quarterly, semi-annually, or annually**, depending on the size of the AIFM and the funds it manages. The data is submitted to your NCA (e.g., BaFin in Germany, FCA in the UK, AMF in France), which forwards it to ESMA for EU-wide systemic risk monitoring.

### Who Needs to File?

| AIFM Type | AUM Threshold | Filing Frequency |
|---|---|---|
| Registered (sub-threshold) AIFM | < €100M | Annual |
| Licensed AIFM (leveraged) | > €100M (leveraged funds) | Quarterly |
| Licensed AIFM (unleveraged) | > €500M (unleveraged) | Semi-annual |
| Large fund (individual AIF) | > €500M NAV | Quarterly (fund-level) |

If you're a **Kapitalverwaltungsgesellschaft (KVG)** in Germany, BaFin expects Annex IV filings via their MVP portal or through approved reporting channels — all in the ESMA-defined XML format.

### What Changes with AIFMD II?

**AIFMD II** (Directive 2024/927) enters into force on **April 16, 2026**. Key changes for Annex IV reporting include:

- **Expanded data fields** — more granular liquidity, leverage, and delegation reporting
- **New loan origination disclosures** for funds engaged in direct lending
- **Enhanced stress testing** requirements
- **Revised XML schema** — ESMA is updating the XSD to accommodate the new fields

If you're currently filing Annex IV, your reporting pipeline **will need to change** by April 2026. If you're building that pipeline now, you want to build it on the latest schema.

---

## The ESMA XSD Schema: Structure Explained

ESMA publishes the official XML Schema Definition (XSD) that all Annex IV XML files must validate against. The current version is **Revision 6, Version 1.2** (commonly referenced as `AIFMD_Reporting_DataTypes_V1.2.xsd`).

Let's demystify the structure.

### High-Level Architecture

An Annex IV XML file has three major sections:

```
AIFMReporting
├── AIFMRecordInfo          ← Manager-level data
│   ├── AIFMNationalCode
│   ├── AIFMName
│   ├── AIFMContentType
│   ├── AIFMCompleteDescription   ← Full manager report (24(1))
│   └── AIFMBaseCurrencyDescription
│
├── AIFRecordInfo[]         ← One per fund
│   ├── AIFNationalCode
│   ├── AIFName
│   ├── AIFContentType
│   ├── AIFCompleteDescription
│   │   ├── AIFPrincipalInfo
│   │   │   ├── AIFIdentification
│   │   │   ├── ShareClassIdentification[]
│   │   │   ├── AIFDescription
│   │   │   │   ├── MasterAIFsIdentification
│   │   │   │   ├── PrimeBrokers[]
│   │   │   │   ├── AIFBaseCurrencyDescription
│   │   │   │   └── ... (strategy, instruments, turnover)
│   │   │   └── MainInstrumentsTraded[]
│   │   │
│   │   ├── AIFLeverageInfo
│   │   │   ├── GrossMethodRate
│   │   │   └── CommitmentMethodRate
│   │   │
│   │   ├── AIFIndividualInfo   ← Only for large funds (>€500M)
│   │   │   ├── IndividualExposure
│   │   │   ├── RiskProfile
│   │   │   ├── StressTests
│   │   │   └── LiquidityProfile
│   │   │
│   │   └── ... 
│   └── AIFMCompleteDescription
│
└── CancellationAIFMRecordInfo[]  ← Optional cancellations
```

### Key Schema Design Patterns

**1. Content Types Drive Conditional Logic**

The `AIFMContentType` and `AIFContentType` fields determine which child elements are required. Content types include:

- `1` — Initial filing
- `2` — Transitional
- `3` — 24(1) — Manager-level only
- `4` — 24(2) — Fund-level basic
- `5` — 24(2) + 24(4) — Fund-level detailed (for large AIFs)

If your content type is `4`, you need `AIFPrincipalInfo` but not `AIFIndividualInfo`. If it's `5`, you need both. **Getting the content type wrong is the #1 source of validation failures.**

**2. Enumerated Types Everywhere**

The schema uses strict enumerations for almost everything: strategy codes, instrument types, geographical regions, currency codes. For example, the `AIFTypeType` enumeration includes:

- `HFND` — Hedge fund
- `PEQF` — Private equity fund  
- `REST` — Real estate fund
- `FOFS` — Fund of funds
- `OTHR` — Other

You can't deviate. `hedge_fund` won't work. `HFND` or nothing.

**3. Percentage Buckets, Not Exact Values**

Many fields (e.g., geographical exposure, instrument breakdown) use percentage buckets like `0%`, `0-10%`, `10-25%`, etc. rather than exact percentages. The schema defines these as enumerated types:

```xml
<FiveRangePercentageType>
  <enumeration value="0%"/>
  <enumeration value="0%-10%"/>
  <enumeration value="10%-25%"/>
  <enumeration value="25%-50%"/>
  <enumeration value="50%-100%"/>
</FiveRangePercentageType>
```

**4. ISO Standards for Identifiers**

- **LEI** (Legal Entity Identifier) — 20-character alphanumeric, validated via checksum
- **ISIN** — 12-character instrument identifier
- **ISO 4217** — 3-letter currency codes
- **ISO 3166** — 2-letter country codes

---

## Common XML Validation Errors (and How to Fix Them)

After years of working with Annex IV XML, these are the errors we see most often:

### 1. Wrong Content Type for the Reporting Obligation

**Error:** `cvc-complex-type.2.4.a: Invalid content was found starting with element 'AIFIndividualInfo'`

**Cause:** You included `AIFIndividualInfo` (the detailed risk section) but set `AIFContentType` to `4` instead of `5`.

**Fix:** Match your content type to the actual data you're providing. Content type `5` = 24(2) + 24(4) = full fund-level report including individual info.

### 2. Invalid Enumeration Values

**Error:** `cvc-enumeration-valid: Value 'DE' is not facet-valid with respect to enumeration '[EEA, EUR, ...]'`

**Cause:** Using an ISO country code where the schema expects a custom regional grouping.

**Fix:** Check the exact enumeration in the XSD. ESMA uses custom geographic groupings (`EEA`, `EUR`, `AsiaPacific`, etc.) in some fields, not ISO country codes.

### 3. Missing Required Elements

**Error:** `cvc-complex-type.2.4.b: The content of element 'AIFCompleteDescription' is not complete`

**Cause:** A required child element is missing. Common culprits: `AIFBaseCurrencyDescription`, `MainInstrumentsTraded`, `AIFLeverageInfo`.

**Fix:** Cross-reference the XSD to ensure every required element for your content type is present. Use a schema-aware editor.

### 4. Decimal Precision Issues

**Error:** `cvc-fractionDigits-valid: Value '1234567.123' has 3 fraction digits, but the number of fraction digits has been limited to 2`

**Cause:** The schema restricts many monetary values to 2 decimal places.

**Fix:** Round all monetary values to 2 decimal places before serialization.

### 5. Empty Optional Blocks

**Error:** `cvc-complex-type.2.4.b: The content of element 'PrimeBrokers' is not complete`

**Cause:** You included an empty `<PrimeBrokers/>` element. If you have no prime brokers, omit the element entirely.

**Fix:** Don't include optional parent elements unless you have data to put in them.

### 6. LEI Checksum Failures

**Error:** `cvc-pattern-valid: Value '5493001KJTIIGC8Y1R12' is not facet-valid with respect to pattern '[A-Z0-9]{18}[0-9]{2}'`

**Cause:** LEI has an invalid format or checksum.

**Fix:** Validate LEIs against the GLEIF database before including them. The last 2 digits are a MOD 97-10 checksum.

---

## How Caelith Generates XSD-Validated XML

Caelith is an API-first platform purpose-built for AIFMD Annex IV reporting. Instead of manually constructing XML or wrestling with Excel-to-XML converters, you send structured fund data to our API and receive validated XML back.

### The Workflow

1. **Upload fund data** — via API or dashboard (JSON format)
2. **Caelith maps your data** to the ESMA XSD schema, applying correct content types, enumerations, and validation rules
3. **XSD validation runs** server-side — any issues are returned as actionable error messages
4. **Download your XML** — ready to submit to your NCA

### API Example: curl

```bash
curl -X POST https://api.caelith.tech/v1/reports/annex-iv/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "reportingPeriod": "2025-Q4",
    "aifm": {
      "name": "Example Capital GmbH",
      "lei": "5493001KJTIIGC8Y1R12",
      "nationalCode": "DE000001234",
      "memberState": "DE"
    },
    "funds": [
      {
        "name": "Example Equity Fund I",
        "nationalCode": "DE000099999",
        "aifType": "PEQF",
        "contentType": 4,
        "baseCurrency": "EUR",
        "nav": 150000000,
        "aum": 180000000,
        "leverage": {
          "grossMethod": 105.5,
          "commitmentMethod": 102.3
        },
        "strategy": {
          "type": "PEQF_VENT",
          "predominant": true
        }
      }
    ]
  }'
```

**Response:**
```json
{
  "status": "valid",
  "xml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><AIFMReporting ...>...</AIFMReporting>",
  "downloadUrl": "https://api.caelith.tech/v1/reports/annex-iv/abc123/download",
  "validation": {
    "errors": [],
    "warnings": [
      "Fund 'Example Equity Fund I': No share class ISINs provided — report will omit ShareClassIdentification"
    ]
  }
}
```

### API Example: Python

```python
import requests

API_KEY = "your_api_key"
BASE_URL = "https://api.caelith.tech/v1"

payload = {
    "reportingPeriod": "2025-Q4",
    "aifm": {
        "name": "Example Capital GmbH",
        "lei": "5493001KJTIIGC8Y1R12",
        "nationalCode": "DE000001234",
        "memberState": "DE"
    },
    "funds": [
        {
            "name": "Example Equity Fund I",
            "nationalCode": "DE000099999",
            "aifType": "PEQF",
            "contentType": 4,
            "baseCurrency": "EUR",
            "nav": 150_000_000,
            "aum": 180_000_000,
            "leverage": {
                "grossMethod": 105.5,
                "commitmentMethod": 102.3
            },
            "strategy": {
                "type": "PEQF_VENT",
                "predominant": True
            }
        }
    ]
}

response = requests.post(
    f"{BASE_URL}/reports/annex-iv/generate",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload
)

result = response.json()

if result["status"] == "valid":
    # Download the XML file
    xml_content = result["xml"]
    with open("annex_iv_2025_q4.xml", "w") as f:
        f.write(xml_content)
    print(f"✓ Valid XML generated — {len(result['validation']['warnings'])} warnings")
else:
    for error in result["validation"]["errors"]:
        print(f"✗ {error}")
```

### API Example: TypeScript

```typescript
const API_KEY = process.env.CAELITH_API_KEY!;
const BASE_URL = "https://api.caelith.tech/v1";

interface AnnexIVRequest {
  reportingPeriod: string;
  aifm: {
    name: string;
    lei: string;
    nationalCode: string;
    memberState: string;
  };
  funds: Array<{
    name: string;
    nationalCode: string;
    aifType: string;
    contentType: number;
    baseCurrency: string;
    nav: number;
    aum: number;
    leverage: { grossMethod: number; commitmentMethod: number };
    strategy: { type: string; predominant: boolean };
  }>;
}

async function generateAnnexIV(payload: AnnexIVRequest) {
  const response = await fetch(
    `${BASE_URL}/reports/annex-iv/generate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (result.status === "valid") {
    console.log(`✓ Valid XML generated`);
    console.log(`  Warnings: ${result.validation.warnings.length}`);
    return result.xml;
  } else {
    console.error("Validation errors:", result.validation.errors);
    throw new Error("XML validation failed");
  }
}

// Usage
const xml = await generateAnnexIV({
  reportingPeriod: "2025-Q4",
  aifm: {
    name: "Example Capital GmbH",
    lei: "5493001KJTIIGC8Y1R12",
    nationalCode: "DE000001234",
    memberState: "DE",
  },
  funds: [
    {
      name: "Example Equity Fund I",
      nationalCode: "DE000099999",
      aifType: "PEQF",
      contentType: 4,
      baseCurrency: "EUR",
      nav: 150_000_000,
      aum: 180_000_000,
      leverage: { grossMethod: 105.5, commitmentMethod: 102.3 },
      strategy: { type: "PEQF_VENT", predominant: true },
    },
  ],
});
```

---

## Key Deadlines

| Date | Event |
|---|---|
| **April 16, 2026** | AIFMD II transposition deadline — new reporting requirements take effect |
| **Q1 2026** | ESMA expected to publish final updated XSD for AIFMD II |
| **Q2 2026** | First reporting period under new rules (for quarterly filers) |
| **Ongoing** | NCAs may set earlier local deadlines for testing/dry runs |

If you're a KVG or AIFM filing Annex IV today, **now** is the time to modernize your reporting pipeline. The AIFMD II schema changes mean your existing Excel macros or manual XML construction won't survive the transition without significant rework.

---

## Why This Matters

Annex IV reporting is one of those compliance obligations that's just painful enough to be dangerous. It's not so complex that firms invest in proper tooling — but it's complex enough that manual processes break regularly. Late filings, validation failures, and NCA rejections create real regulatory risk.

The firms that get this right treat Annex IV as a **data pipeline problem**, not a compliance checkbox. Structured data in, validated XML out, every quarter, automatically.

That's what Caelith does.

---

## Get Started

- **Documentation:** [docs.caelith.tech](https://docs.caelith.tech)
- **API Reference:** [api.caelith.tech/docs](https://api.caelith.tech/docs)
- **Free Trial:** Generate your first Annex IV XML at [caelith.tech](https://caelith.tech)

Questions? Reach us at [hello@caelith.tech](mailto:hello@caelith.tech).

---

*Keywords: AIFMD Annex IV XML schema, ESMA XSD, Annex IV reporting, AIFMD II 2026, XML validation errors, Annex IV API, KVG reporting, BaFin Annex IV, alternative investment fund reporting*
