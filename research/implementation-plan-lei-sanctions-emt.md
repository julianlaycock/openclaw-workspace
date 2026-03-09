# Implementation Plan: LEI Validation, Sanctions Screening Upgrade, EMT/EET/EPT Generation

**Date:** 2026-02-25
**Author:** Mate
**Status:** Ready for review

---

## Overview

Three features that upgrade Caelith from "reporting tool" to "compliance operations platform":

1. **GLEIF LEI Auto-Lookup** — Validate and enrich Legal Entity Identifiers automatically
2. **EU Sanctions Screening (Free Tier)** — Screen investors against the official EU consolidated sanctions list without a paid API
3. **EMT/EET/EPT Template Generation** — Auto-generate the European regulatory templates every fund must produce

---

## Feature 1: GLEIF LEI Auto-Lookup & Validation

### What it does in plain English
Every fund, fund manager, depositary, and counterparty needs a Legal Entity Identifier (LEI) for regulatory filings. Currently, compliance officers look these up manually on gleif.org. This feature auto-validates LEI codes and fills in entity details (legal name, jurisdiction, registration authority, status) with one click.

### Where it fits in the existing system

**Existing touchpoints:**
- `Investor` model already has `lei: string | null` field
- `FundStructure` model has `aifm_lei`, `depositary_lei` fields
- `CounterpartyExposure` has `lei` field
- Annex IV serializer uses LEI codes (already validates format)
- Screening service already sends LEI to OpenSanctions

**Integration points:**
1. **Investor create/update** (`investor-service.ts`) — When an LEI is provided, auto-validate against GLEIF
2. **Fund structure create/update** (`fund-structure-repository.ts`) — Validate AIFM LEI and depositary LEI
3. **Annex IV generation** (`annex-iv-service.ts`) — Pre-validate all LEIs before generating XML
4. **Investor detail page** (`/investors/[id]`) — Show LEI status badge + enriched entity data
5. **Fund detail page** (`/funds/[id]`) — Show AIFM/depositary LEI validation status

### Technical design

```
NEW FILES:
  src/backend/services/lei-service.ts          — GLEIF API client + cache
  src/backend/routes/lei-routes.ts             — GET /api/lei/:code (lookup), GET /api/lei/validate/:code
  migrations/057_lei_cache.sql                 — Cache table for GLEIF responses

MODIFIED FILES:
  src/backend/services/investor-service.ts     — Add LEI validation on create/update
  src/backend/services/annex-iv-service.ts     — Pre-validate LEIs before XML generation
  src/backend/server.ts                        — Mount /api/lei routes
  src/frontend/src/app/investors/[id]/page.tsx — LEI badge + enriched data display
  src/frontend/src/app/funds/[id]/...          — AIFM/depositary LEI status
```

### Database: Migration 057

```sql
CREATE TABLE lei_cache (
  lei VARCHAR(20) PRIMARY KEY,
  legal_name TEXT NOT NULL,
  legal_jurisdiction VARCHAR(4),
  entity_status VARCHAR(20),       -- 'ACTIVE', 'INACTIVE', 'LAPSED', etc.
  registration_authority VARCHAR(100),
  initial_registration_date DATE,
  last_update_date DATE,
  managing_lou VARCHAR(100),       -- Local Operating Unit
  raw_response JSONB,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

CREATE INDEX idx_lei_cache_expires ON lei_cache(expires_at);
```

### API Design

```
GET  /api/lei/validate/:code    → { valid: bool, status: 'ACTIVE'|'INACTIVE'|'LAPSED'|'NOT_FOUND', entity?: {...} }
GET  /api/lei/search?q=name     → { results: [{ lei, name, jurisdiction }] }  (search by entity name)
POST /api/lei/bulk-validate     → { results: [{ lei, valid, status }] }       (validate multiple at once)
```

### GLEIF API Details
- **Base URL:** `https://api.gleif.org/api/v1`
- **No API key needed** — free public API
- **Rate limit:** 60 requests/minute (generous)
- **Lookup:** `GET /lei-records/{lei}` → full entity record
- **Search:** `GET /lei-records?filter[entity.legalName]=...`
- **Cache strategy:** 7-day TTL (LEI data changes rarely)

### User experience
- Investor form: Type or paste LEI → green checkmark if valid + auto-fill legal name
- Invalid LEI → red warning "LEI not found in GLEIF registry"
- Expired LEI → yellow warning "LEI status: LAPSED — renewal may be required"
- Annex IV export: Pre-flight check validates all LEIs, warns about issues before generating XML
- Bulk validation button on investor list page

### Effort: ~2 days

---

## Feature 2: EU Sanctions Screening (Free Tier Upgrade)

### What it does in plain English
Caelith already has a screening service that calls the OpenSanctions API (paid, ~€500-2K/mo) or falls back to mock data for demos. This upgrade adds a **free production-grade option**: directly parsing the EU's official consolidated sanctions list (XML, published by the European Commission) + UN Security Council sanctions list. No third-party API needed.

### Where it fits in the existing system

**Existing touchpoints:**
- `screening-service.ts` — Already has OpenSanctions integration + mock mode
- `screening-routes.ts` — POST /api/screening/:investorId, POST /api/screening/bulk/run
- `/screening` page — Frontend already shows results
- Event type `screening.completed` — Already in audit trail

**What changes:**
The existing service has three modes: `opensanctions` (paid API), `mock` (demo). We add a third: `eu_consolidated` (free, self-hosted). This becomes the default when no OpenSanctions API key is configured.

### Data sources (all free, official, machine-readable)

1. **EU Consolidated Sanctions List**
   - URL: `https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content`
   - Format: XML (~15MB), updates daily
   - Contains: All EU restrictive measures (financial sanctions, travel bans)
   - Legal basis: EU Regulations under CFSP

2. **UN Security Council Consolidated List**
   - URL: `https://scsanctions.un.org/resources/xml/en/consolidated.xml`
   - Format: XML (~5MB)
   - Updates: As resolutions are adopted

3. **(Optional future) OFAC SDN List**
   - URL: `https://www.treasury.gov/ofac/downloads/sdn.xml`
   - Relevant for funds with US exposure

### Technical design

```
NEW FILES:
  src/backend/services/sanctions-data-service.ts   — Download, parse, index sanctions lists
  src/backend/services/fuzzy-match-service.ts      — Name matching (Levenshtein + phonetic)
  migrations/058_sanctions_cache.sql               — Local sanctions database

MODIFIED FILES:
  src/backend/services/screening-service.ts        — Add 'eu_consolidated' provider
  src/backend/server.ts                            — Add sanctions list refresh cron (daily)
  src/frontend/src/app/screening/page.tsx          — Show data source + last refresh time
  src/frontend/src/app/settings/page.tsx           — Screening provider selection
```

### Database: Migration 058

```sql
CREATE TABLE sanctions_entities (
  id SERIAL PRIMARY KEY,
  source VARCHAR(20) NOT NULL,              -- 'eu_fsf', 'un_sc', 'ofac_sdn'
  entity_id VARCHAR(100) NOT NULL,          -- Source-specific ID
  entity_type VARCHAR(20) NOT NULL,         -- 'person', 'entity'
  names TEXT[] NOT NULL,                    -- All name variants (for matching)
  names_normalized TEXT[] NOT NULL,         -- Lowercased, accent-stripped, transliterated
  birth_dates DATE[],
  nationalities VARCHAR(4)[],
  addresses TEXT[],
  id_documents JSONB,                       -- Passport numbers, tax IDs
  programmes TEXT[],                        -- Which sanctions programme
  listing_date DATE,
  raw_entry JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sanctions_metadata (
  source VARCHAR(20) PRIMARY KEY,
  last_fetched TIMESTAMPTZ,
  last_published TIMESTAMPTZ,              -- When the list was last updated
  entity_count INTEGER,
  etag VARCHAR(200)                        -- For conditional HTTP requests
);

-- Full-text search + trigram for fuzzy matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_sanctions_names_gin ON sanctions_entities USING GIN (names_normalized gin_trgm_ops);
CREATE INDEX idx_sanctions_source ON sanctions_entities(source);
```

### Matching algorithm

```typescript
// fuzzy-match-service.ts
// 1. Normalize input: lowercase, strip accents/diacritics, transliterate Cyrillic/Arabic
// 2. Exact match on normalized names (fast, catches most)
// 3. Trigram similarity (pg_trgm) for fuzzy matching — threshold 0.4
// 4. Phonetic matching (Soundex/Metaphone) for name variants
// 5. Score: weighted combination of name similarity + country match + DOB match
// 6. Return matches above threshold (configurable, default 50%)
```

### Integration with existing screening flow

```typescript
// screening-service.ts — modified flow
export async function screenInvestor(investorId: string, tenantId: string): Promise<ScreeningResult> {
  const provider = getConfiguredProvider(); // 'opensanctions' | 'eu_consolidated' | 'mock'
  
  switch (provider) {
    case 'opensanctions':
      return screenViaOpenSanctions(investor, apiKey);  // Existing code
    case 'eu_consolidated':
      return screenViaEUConsolidated(investor);          // NEW: local DB matching
    case 'mock':
      return mockScreen(investor);                       // Existing code
  }
}
```

### Daily refresh job

```typescript
// In server.ts startup
import { refreshSanctionsLists } from './services/sanctions-data-service.js';

// Refresh on startup + daily at 06:00 UTC
await refreshSanctionsLists();
setInterval(refreshSanctionsLists, 24 * 60 * 60 * 1000);
```

### Settings integration
Add to existing Settings page under "Security" or new "Screening" section:
- Provider toggle: OpenSanctions (API key required) | EU Consolidated (free) | Demo mode
- Last refresh timestamp
- Entity count per source
- Manual "Refresh now" button
- Match threshold slider (40-80%, default 50%)

### User experience
- Same screening UI — user clicks "Screen" on investor, gets results
- Results show source: "EU Consolidated Financial Sanctions" with direct link to regulation
- Each match shows: name, programme (e.g. "EU Council Regulation 269/2014 — Ukraine"), listing date
- Bulk screening: "Screen All Investors" button, progress bar, summary report
- Dashboard widget: "Last sanctions screening: 2 hours ago, 0 matches"

### Effort: ~5-7 days
- Day 1-2: Sanctions XML parser + database schema + data import
- Day 3-4: Fuzzy matching engine (pg_trgm + normalization)
- Day 5: Integration with existing screening service + settings UI
- Day 6-7: Testing + edge cases + bulk screening performance

---

## Feature 3: EMT/EET/EPT Template Generation

### What it does in plain English

Every EU fund must produce three regulatory data templates:

- **EMT** (European MiFID Template): Product data for distributors — fees, target market, costs, risk classification
- **EET** (European ESG Template): ESG/sustainability data — SFDR classification, taxonomy alignment, PAI indicators
- **EPT** (European PRIIPs Template): Key Information Document data — performance scenarios, cost breakdown, risk indicator

These are **standardized CSV/Excel files** with fixed column schemas (defined by FinDatEx, the European fund data exchange standard body). Currently, most small KVGs fill these **by hand in Excel** — it takes 2-4 hours per fund per quarter.

Caelith already has most of the underlying data (fund structure, SFDR classification, fees, risk metrics). Auto-generating these templates = instant time savings.

### Where it fits in the existing system

**Data sources (already in Caelith):**
- `FundStructure` → fund name, ISIN, domicile, legal form, SFDR classification, currency, inception date
- `FundStructure.lmt_types` → LMTs for EMT liquidity section
- `RuleSet` → minimum investment, qualification required
- `Investor concentration` → investor breakdown for EPT
- `Leverage` data → risk indicators
- `Holdings` → asset breakdown for EET taxonomy alignment

**Integration points:**
1. **Reports section** (`/reports`) — New "Regulatory Templates" subsection alongside Annex IV and Evidence Bundle
2. **Fund detail page** (`/funds/[id]`) — "Export Templates" button in the actions area
3. **Sidebar** — Under REPORTS section (already exists)

### Technical design

```
NEW FILES:
  src/backend/services/emt-service.ts              — Generate EMT CSV from fund data
  src/backend/services/eet-service.ts              — Generate EET CSV from fund data
  src/backend/services/ept-service.ts              — Generate EPT CSV from fund data
  src/backend/routes/template-export-routes.ts     — GET /api/reports/templates/:fundId/:type
  src/frontend/src/app/reports/templates/page.tsx   — Template generation UI
  src/frontend/src/app/reports/templates/[fundId]/page.tsx — Per-fund template preview

MODIFIED FILES:
  src/backend/server.ts                            — Mount template export routes
  src/frontend/src/app/reports/page.tsx             — Add "Regulatory Templates" card
  src/frontend/src/app/funds/[id]/...              — Add "Export Templates" dropdown
```

### EMT Template (v4.1 — current FinDatEx standard)

The EMT has ~250 fields organized in sections. We auto-fill what we can from Caelith data:

| EMT Section | Auto-fillable from Caelith? | Source |
|---|---|---|
| 00 General (ISIN, name, LEI, domicile) | ✅ Yes | `fund_structures` + LEI service |
| 01 Financial Instrument (type, currency, maturity) | ✅ Partial | `fund_structures.legal_form`, currency |
| 02 Target Market (investor type, knowledge, risk tolerance) | ✅ Yes | `eligibility_criteria` |
| 03 Costs (ongoing, transaction, performance fees) | ⚠️ New fields needed | Need `fund_fees` table or manual input |
| 04 Distribution (marketing passport countries) | ⚠️ Partial | Could derive from jurisdiction data |
| 05 Risk/Reward (SRI, VaR, max drawdown) | ⚠️ Partial | Leverage data exists, need SRI calc |

### EET Template (v1.1.2)

| EET Section | Auto-fillable? | Source |
|---|---|---|
| 00 General (ISIN, name, LEI) | ✅ Yes | `fund_structures` |
| 01 SFDR Classification | ✅ Yes | `fund_structures.sfdr_classification` |
| 02 Taxonomy Alignment | ⚠️ Manual for now | Needs asset-level ESG tagging |
| 03 PAI Indicators | ⚠️ Manual for now | Needs ESG data feed |
| 04 Do No Significant Harm | ⚠️ Manual for now | Compliance assessment |

### EPT Template (v2.0)

| EPT Section | Auto-fillable? | Source |
|---|---|---|
| 00 General (ISIN, name, LEI) | ✅ Yes | `fund_structures` |
| 01 Performance Scenarios | ⚠️ Needs calc | Need NAV history for scenario modeling |
| 02 Costs | ⚠️ Same as EMT | Need fee structure |
| 03 Risk Indicator (SRI) | ⚠️ Partial | Leverage + volatility data |

### Phased approach

**Phase 1 (this sprint):** Generate EMT with all auto-fillable fields populated, remaining fields as empty/placeholder with clear "MANUAL INPUT REQUIRED" markers. This alone saves 60% of the work.

**Phase 2 (when customer feedback arrives):** Add fund fee structure to data model, calculate SRI, complete EPT performance scenarios.

**Phase 3 (ESG module):** Full EET with taxonomy alignment, PAI indicators.

### Migration 059 (optional, for fee structure)

```sql
-- Only needed for Phase 2, but design now for forward compatibility
CREATE TABLE fund_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fund_structure_id UUID NOT NULL REFERENCES fund_structures(id),
  fee_type VARCHAR(30) NOT NULL,    -- 'management', 'performance', 'entry', 'exit', 'transaction', 'ongoing'
  rate_bps INTEGER,                 -- Basis points (e.g., 150 = 1.50%)
  rate_fixed NUMERIC(15,2),         -- Fixed amount (EUR)
  frequency VARCHAR(20),            -- 'annual', 'quarterly', 'per_transaction'
  description TEXT,
  effective_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_fund_fees_fund ON fund_fees(fund_structure_id);
```

### CSV generation approach

```typescript
// emt-service.ts — simplified
export async function generateEMT(fundId: string, tenantId: string): Promise<string> {
  const fund = await getFundStructure(fundId, tenantId);
  const eligibility = await getEligibilityCriteria(fundId, tenantId);
  const lei = fund.aifm_lei ? await validateLEI(fund.aifm_lei) : null;
  
  // FinDatEx EMT v4.1 column schema
  const rows: string[][] = [];
  rows.push(['00010_Fund_Name', fund.name]);
  rows.push(['00020_Fund_ISIN', fund.isin || '']);  // May need ISIN field
  rows.push(['00030_Fund_LEI', fund.aifm_lei || '']);
  rows.push(['00040_Fund_Domicile', fund.domicile]);
  rows.push(['00050_Fund_Currency', fund.currency]);
  // ... ~250 more fields
  
  // Fields we can't auto-fill get marked
  rows.push(['03010_Ongoing_Costs_Pct', '']); // MANUAL INPUT REQUIRED
  
  return rows.map(r => r.join(';')).join('\n');
}
```

### User experience
- Reports page: New "Regulatory Templates" section with EMT/EET/EPT cards
- Click fund → Choose template type → Preview (table view showing all fields, green=auto-filled, yellow=needs review, red=missing)
- "Download CSV" button → FinDatEx-compliant CSV
- "Download Excel" button → XLSX with formatting + validation dropdowns
- Bulk: "Generate All Templates" for all active funds → ZIP download
- Tooltip on each field explaining what it is and where the data comes from

### Effort: ~8-10 days
- Day 1-2: EMT field mapping + CSV generator for auto-fillable fields
- Day 3-4: EET + EPT generators (similar pattern)
- Day 5-6: Frontend — template preview page with field status indicators
- Day 7-8: Export (CSV + XLSX), bulk generation
- Day 9-10: Testing, edge cases, i18n (field labels in DE/EN)

---

## Implementation Order

```
Week 1 (Days 1-2):  Feature 1 — LEI Validation
Week 1 (Days 3-7):  Feature 2 — Sanctions Screening Upgrade  
Week 2 (Days 8-12): Feature 3 — EMT/EET/EPT (Phase 1: auto-fill what we can)
Week 2 (Day 12):    Integration testing + deploy
```

### Shared infrastructure

All three features share:
- **Cache pattern**: LEI cache (7d TTL) + sanctions cache (24h refresh) + template cache (per-generation)
- **Audit trail**: All use existing `createEvent()` → `event_repository.ts`
- **Tenant isolation**: All use existing `queryInTenantContext()` / `withTenantContext()`
- **Settings**: All configurable through existing Settings page structure
- **Auth**: All behind existing `authenticate` + `authorizeWrite()` middleware

### What we do NOT change
- No changes to existing data models (Investor, FundStructure, etc.)
- No changes to existing screening UI flow (just adds a new provider option)
- No changes to Annex IV generation (just adds LEI pre-validation)
- No new auth flows or permissions — uses existing role system

### Git strategy
- One feature branch per feature: `feat/lei-validation`, `feat/sanctions-free`, `feat/emt-eet-ept`
- Each merged to main after testing
- Deploy after all three

---

## Success Metrics

| Feature | "Done" means | User value |
|---|---|---|
| LEI Validation | Auto-validate LEI on investor/fund create, pre-check before Annex IV | 30 seconds saved per entity, zero invalid LEIs in filings |
| Sanctions Screening | Free production screening against EU+UN lists, <2s per investor | Replaces €10-30K/yr commercial tools for basic screening |
| EMT/EET/EPT | Generate 60%+ pre-filled templates for any fund | Saves 2-4 hours per fund per quarter |
