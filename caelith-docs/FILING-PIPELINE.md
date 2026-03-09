# Filing Pipeline Architecture

## Overview

Caelith Filing Pipeline is the regulatory infrastructure layer that enables automated filing submissions to EU National Competent Authorities (NCAs). It exposes a headless API for validating, generating, and submitting AIFMD Annex IV XML reports.

## Architecture

```
External Consumers                    Caelith Dashboard
(AI Agents, Fund Admins,              (Reference Implementation)
 Compliance Tools)                    
        │                                    │
        ▼                                    ▼
┌──────────────────────────────────────────────────┐
│              Filing Pipeline API                  │
│         /api/v1/pipeline/filings/*                │
│                                                   │
│  POST /validate    — Validate report data         │
│  POST /xml         — Generate validated XML       │
│  POST /submit      — Submit XML to NCA portal     │
│  POST /filings     — Full pipeline (validate →    │
│                      generate → submit)           │
│  GET  /:id/status  — Query NCA journal            │
│                                                   │
│  GET  /schemas     — Available filing schemas     │
│  GET  /ncas        — Supported NCA portals        │
└──────────┬───────────────────────┬────────────────┘
           │                       │
    ┌──────▼──────┐        ┌──────▼──────────┐
    │ XML Engine  │        │ NCA Connectors   │
    │             │        │                  │
    │ Serializer  │        │ BaFin SOAP ────► │ portal.mvp.bafin.de:444
    │ Validator   │        │ CSSF SOFiE ───► │ (planned)
    │ Schema Reg  │        │ DNB DLR ──────► │ (planned)
    └─────────────┘        └─────────────────┘
```

## Authentication

Pipeline API supports the same auth as the rest of the Caelith API:
- **API Key**: `Authorization: Bearer ck_live_XXXXX` (for external consumers)
- **JWT**: Session-based auth (for dashboard integration)

NCA portal credentials are passed per-request or via environment variables:
- `BAFIN_PORTAL_USER` — BaFin MVP Portal username
- `BAFIN_PORTAL_PASS` — BaFin MVP Portal password
- `BAFIN_ENTITY_ID` — Liable entity ID (e.g. `hg_05_1234567890`)

## BaFin Submission Methods

### Primary: SOAP Web Service (Recommended)
- **Production**: `https://portal.mvp.bafin.de:444/services/ws/aifmd`
- **Test**: `https://portal.mvp.bafin.de:444/services/ws/t_aifmd`
- **Auth**: WS-Security UsernameToken (username#entityId + password)
- **Protocol**: HTTPS + SOAP 1.1, no MTOM, UTF-8
- **Response**: Synchronous `meldungsId` (report ID)
- **Status Tracking**: Journal endpoint at `portal.mvp.bafin.de:444/services/ws/protokoll`

### Fallback: Playwright Browser Automation
- Headless Chromium automation of portal UI
- Used when SOAP endpoint is unavailable or for NCAs without API access
- More fragile (depends on portal UI stability)

## Filing Lifecycle

```
draft → validated → ready_to_submit → submitted → acknowledged → accepted
                                                               └→ rejected → draft (retry)
```

## Supported NCAs

| NCA | Country | Automated | Method |
|-----|---------|-----------|--------|
| BaFin | Germany | ✅ | SOAP Web Service |
| CSSF | Luxembourg | 🔜 Planned | SOFiE (SFTP) |
| FMA | Austria | ❌ Manual | OeKB Portal |
| AMF | France | ❌ Manual | GECO Portal |
| AFM/DNB | Netherlands | 🔜 Planned | DLR API (SFTP/AS4) |
| CBI | Ireland | ❌ Manual | ONR Portal |
| Consob | Italy | ❌ Manual | INFOSTAT |
| CNMV | Spain | ❌ Manual | Sede Electrónica |

## API Examples

### Validate a report
```bash
curl -X POST https://api.caelith.tech/api/v1/pipeline/filings/validate \
  -H "Authorization: Bearer ck_live_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "reportingMemberState": "DE", ... }'
```

### Generate XML
```bash
curl -X POST https://api.caelith.tech/api/v1/pipeline/filings/xml \
  -H "Authorization: Bearer ck_live_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "report": { ... }, "format": "json" }'
```

### Submit to BaFin (test mode)
```bash
curl -X POST https://api.caelith.tech/api/v1/pipeline/filings/submit \
  -H "Authorization: Bearer ck_live_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "xml": "<?xml version=\"1.0\"...",
    "nca": "DE",
    "testMode": true,
    "customerReference": "Q4-2025-FundA"
  }'
```

### Full pipeline (validate → generate → submit)
```bash
curl -X POST https://api.caelith.tech/api/v1/pipeline/filings \
  -H "Authorization: Bearer ck_live_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "report": { ... },
    "nca": "DE",
    "autoSubmit": true,
    "testMode": true
  }'
```

## Files

```
src/backend/
├── agents/bafin-filing-agent/
│   ├── index.ts                 — Main orchestrator (Playwright fallback)
│   ├── soap-client.ts           — SOAP client (primary method) ← NEW
│   ├── portal-automation.ts     — Playwright portal automation
│   ├── config.ts                — URLs, timeouts, credentials
│   ├── types.ts                 — Type definitions
│   └── __tests__/
├── routes/v1/
│   └── filing-pipeline-routes.ts — Pipeline API routes ← NEW
├── services/
│   ├── annex-iv-xml/            — XML serializer + validator
│   ├── filing-workflow-service.ts — Filing lifecycle management
│   └── nca-portal-service.ts    — NCA portal data
```
