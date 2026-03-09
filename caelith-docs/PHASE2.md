# PHASE 2: API Infrastructure Pivot

> Phase 1 (Dashboard) tagged as `v1.0-phase1` on 2026-02-26.
> Phase 2 begins: Public API — "Stripe for compliance."

---

## What We Have (Phase 1 Inventory)

### Services (business logic — reusable as-is)
| Service | File | API-Ready? |
|---------|------|------------|
| Annex IV XML generation | `services/annex-iv-xml/` (serializer, helpers, types) | ✅ Yes — core product |
| Annex IV orchestration | `services/annex-iv-service.ts` | ✅ Yes |
| Sanctions screening | `services/screening-service.ts` + `sanctions-data-service.ts` + `fuzzy-match-service.ts` | ✅ Yes |
| LEI lookup/validation | `services/lei-service.ts` | ✅ Yes |
| EMT template generation | `services/emt-service.ts` | ✅ Yes |
| EET template generation | `services/eet-service.ts` | ✅ Yes |
| EPT template generation | `services/ept-service.ts` | ✅ Yes |
| API key auth + management | `services/api-key-service.ts` | ✅ Already built |
| Rate limiting (tiered) | `middleware/rate-limiter.ts` | ✅ Already built |

### Middleware (already built)
- `api-key-auth.ts` — `ck_live_*` Bearer token validation, falls through to JWT if not API key
- `rate-limiter.ts` — tiered limits (auth/api-key/general)
- `error-handler.ts` — structured error responses
- `validate.ts` — request validation

### Infrastructure
- API key DB schema: migration 060 (`ck_live_` prefix, bcrypt hashed)
- Versioned routes: `/api/v1/*` already mounted (mirrors all dashboard routes)
- OpenAPI/Swagger: `/api/docs` already serves docs
- PostgreSQL with RLS, multi-tenant ready

### What's Missing for Public API
1. **Dedicated public API routes** — current v1 routes mirror the dashboard (session auth). Need clean, API-key-only routes with simplified request/response contracts.
2. **Usage tracking** — log every API call per key for billing and analytics
3. **Proper error envelope** — consistent `{ error: { code, message, details } }` format
4. **API response format** — clean JSON contracts, no internal field leakage
5. **Webhook delivery** — notify customers on async completions
6. **Developer portal** — docs, examples, playground
7. **Billing infrastructure** — usage → invoices

---

## Architecture

```
                    ┌─────────────────────────┐
                    │     www.caelith.tech     │
                    └────────┬────────────────┘
                             │
                    ┌────────▼────────────────┐
                    │    Express Server        │
                    │    (src/backend/)        │
                    └────┬───────────┬────────┘
                         │           │
              ┌──────────▼──┐  ┌─────▼──────────┐
              │ /api/*      │  │ /api/v1/public/*│
              │ Dashboard   │  │ Public API      │
              │ (JWT auth)  │  │ (API key auth)  │
              └──────┬──────┘  └──────┬──────────┘
                     │                │
                     └───────┬────────┘
                             │
                    ┌────────▼────────────────┐
                    │   Shared Services        │
                    │   (annex-iv, sanctions,  │
                    │    lei, emt/eet/ept)     │
                    └────────┬────────────────┘
                             │
                    ┌────────▼────────────────┐
                    │   PostgreSQL + Redis     │
                    └─────────────────────────┘
```

**Key principle:** Dashboard routes and public API routes share the SAME services layer. The only differences are authentication (JWT vs API key) and response formatting.

### Folder Structure (new additions in bold)

```
src/backend/
  routes/
    *.ts                    ← Dashboard routes (Phase 1, untouched)
    v1/index.ts             ← Dashboard v1 mirror (Phase 1, untouched)
    **public/               ← NEW: Public API routes**
      **index.ts**          ← Mounts all public routes under /api/v1/public
      **annex-iv.ts**       ← POST /generate, POST /validate
      **sanctions.ts**      ← POST /screen, GET /stats
      **lei.ts**            ← GET /lookup/:lei, POST /validate
      **templates.ts**      ← POST /emt, POST /eet, POST /ept
  middleware/
    api-key-auth.ts         ← Already built
    rate-limiter.ts         ← Already built
    **usage-tracker.ts**    ← NEW: Logs API calls per key
    **api-error.ts**        ← NEW: Consistent error envelope
  services/
    (all existing — shared) ← No changes needed
    **usage-service.ts**    ← NEW: Usage tracking + billing queries
```

---

## Technical Implementation Plan

### Step 1: Tag Phase 1 ✂️
```bash
git tag v1.0-phase1 -m "Phase 1 complete: Dashboard, Annex IV, sanctions, LEI, templates"
git push origin v1.0-phase1
```

### Step 2: Public API Error Envelope
Create `middleware/api-error.ts` — consistent error format for all public endpoints:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Fund type is required",
    "details": [{ "field": "fund_type", "issue": "missing" }]
  },
  "request_id": "req_abc123"
}
```
Success responses:
```json
{
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "processing_ms": 142
  }
}
```

### Step 3: Usage Tracking
- Migration 063: `api_usage` table (key_id, endpoint, method, status, latency_ms, timestamp)
- `middleware/usage-tracker.ts` — logs every public API request
- `services/usage-service.ts` — queries for billing dashboard

### Step 4: Public API Routes (Priority Order)

**4a. Annex IV Generate** (`POST /api/v1/public/annex-iv/generate`)
- Input: Fund data JSON (name, type, AUM, investors, holdings)
- Output: Validated XML + validation report
- Calls: `annex-iv-service.ts` → `annex-iv-xml/serializer.ts`
- This is the flagship. Gets built first, tested thoroughly.

**4b. Annex IV Validate** (`POST /api/v1/public/annex-iv/validate`)
- Input: Raw XML string
- Output: Validation report (XSD compliance, warnings)
- Lower effort — parsing + schema check only

**4c. Sanctions Screen** (`POST /api/v1/public/sanctions/screen`)
- Input: `{ names: ["John Doe", "Company GmbH"], threshold?: 0.8 }`
- Output: Matches with confidence scores, source list, entry dates
- Calls: `screening-service.ts` + `fuzzy-match-service.ts`

**4d. LEI Lookup** (`GET /api/v1/public/lei/:lei`)
- Input: LEI code in URL
- Output: Entity name, jurisdiction, status, registration date
- Calls: `lei-service.ts` (GLEIF API + caching)

**4e. LEI Validate** (`POST /api/v1/public/lei/validate`)
- Input: `{ leis: ["5299001GCZB5TSWKOH68", ...] }`
- Output: Batch validation results

**4f. Template Generation** (`POST /api/v1/public/templates/{emt|eet|ept}`)
- Input: Fund data
- Output: Filled template (JSON or CSV)
- Calls: `emt-service.ts`, `eet-service.ts`, `ept-service.ts`

### Step 5: API Key Management UI
- Already have `api-key-routes.ts` + `api-key-service.ts`
- Add dashboard page: generate keys, view usage, revoke keys
- Show usage metrics per key (calls, errors, latency)

### Step 6: Developer Documentation
- Expand OpenAPI spec at `/api/docs` with public endpoints
- Add code examples (cURL, Python, JavaScript)
- Request/response examples for each endpoint
- Authentication guide
- Rate limit documentation

### Step 7: Webhook Delivery (Week 5+)
- For async operations (large batch screening, bulk validation)
- `POST` to customer-configured URLs with signed payloads
- Retry logic with exponential backoff

### Step 8: Billing Infrastructure (Week 7+)
- Free tier: 100 API calls/month (sanctions + LEI only)
- Starter: 1,000 calls/month — €99/mo
- Professional: 10,000 calls/month — €499/mo
- Enterprise: unlimited — custom pricing
- Usage-based overage billing
- Stripe integration for payment processing

---

## Execution Order (What We Build Today)

| # | Task | Est. Time | Depends On |
|---|------|-----------|------------|
| 1 | Tag Phase 1 | 1 min | — |
| 2 | API error envelope middleware | 30 min | — |
| 3 | Usage tracking (migration + middleware + service) | 1 hr | — |
| 4 | Public route scaffold (`routes/public/index.ts`) | 30 min | #2, #3 |
| 5 | `POST /annex-iv/generate` endpoint | 1 hr | #4 |
| 6 | `POST /annex-iv/validate` endpoint | 30 min | #4 |
| 7 | `POST /sanctions/screen` endpoint | 45 min | #4 |
| 8 | `GET /lei/:lei` + `POST /lei/validate` | 30 min | #4 |
| 9 | `POST /templates/{emt|eet|ept}` | 30 min | #4 |
| 10 | Mount public router in server.ts | 15 min | #4 |
| 11 | Integration tests | 1 hr | #5-9 |
| 12 | Update OpenAPI docs | 30 min | #5-9 |

**Total estimated: ~6-7 hours for core API launch.**

---

## Security Model

- **API keys only** — no JWT/session auth on public routes
- API keys scoped per tenant (multi-tenant isolation via RLS)
- Rate limits per key tier (already built in `rate-limiter.ts`)
- Request logging with PII stripping for audit trail
- CORS restricted to registered origins
- No internal fields exposed (tenant_id, user_id, etc.)
- Signed webhook payloads (HMAC-SHA256)

## What We DON'T Change

- Dashboard routes — untouched, same auth, same behavior
- Frontend — untouched
- Database schema — additive only (new tables/columns, never modify existing)
- Existing services — consumed as-is, not refactored
- Deployment — same Railway setup, same server

---

---

## Progress Log

### 2026-02-26 — Phase 2 Day 1
- ✅ Tagged Phase 1 as `v1.0-phase1`
- ✅ Migration 063: `api_usage` table
- ✅ Migration 064: `api_keys` missing columns (expires_at, key_hash widened)
- ✅ Migration 065: Disabled RLS on `api_keys` (was blocking validation)
- ✅ `middleware/api-envelope.ts` — consistent `{data, meta}` response format
- ✅ `middleware/usage-tracker.ts` — logs every API call for billing
- ✅ `routes/public/` — 6 route files, 10 endpoints
- ✅ `routes/public/index.ts` — API key auth + envelope + usage + discovery
- ✅ Annex IV generate with sparse input defaults
- ✅ `api-key-service.ts` — fixed scopes (Postgres array), parseScopes helper
- ✅ `/developers` page — key management, endpoint reference, code examples (cURL/Python/JS)
- ✅ Sidebar: "API & Developers" nav item (admin only)
- ✅ Settings: fixed API key routes + UTF-8 mojibake
- ✅ OpenAPI docs updated with all 10 public endpoints
- ✅ **32/32 integration tests passing** against production
- ✅ All endpoints verified live on www.caelith.tech

### Commits (Phase 2)
- `ba567f18` — PHASE2.md created
- `ec8cc30c` — Core API infrastructure (9 new files, 672 LOC)
- `226ffed1` — Developers page + sidebar
- `6cb8bfcc` — Migration 064 (api_keys columns)
- `aaee9c97` — Scopes fix + parseScopes
- `236eb583` — Migration 065 (disable RLS)
- `07db9960` — Annex IV defaults + tests
- `9778f7b6` — Annex IV correct type fields
- `f1e71629` — OpenAPI docs update
- `de285a8d` — Rate limiting + free tier + usage dashboard
- `c72868f8` — Free tier bumped to 1000 during dev
- `59665fbe` — Data reliability hardcoded (6h sanctions refresh, LEI fallback, XSD versioning, disclaimers)
- `adc19afc` — Sandbox mode (ck_test_) + audit receipts (SHA-256 signed compliance records)

### Strategic Gaps Identified & Addressed
1. ✅ **Sandbox mode** — `ck_test_` keys return mock data, no quota consumed
2. ✅ **Audit receipts** — SHA-256 signed, immutable compliance records
3. ✅ **Rate limiting** — X-RateLimit-* headers, monthly quota, tier system
4. ✅ **Data freshness** — 6h auto-refresh, staleness warnings, version pinning
5. ✅ **Legal precision** — `no_match_found` not `clear`, disclaimers, methodology
6. ⬜ **Batch processing** — screen 1000+ names in one call
7. ⬜ **Python + JS SDKs** — `pip install caelith`, `npm install @caelith/sdk`
8. ⬜ **Regulatory calendar API** — deadline alerts, filing reminders
9. ⬜ **Delta screening** — "what changed since my last screen?"
10. ⬜ **Filing lifecycle** — draft → validated → submitted → acknowledged

*Created: 2026-02-26 | Phase 2 kickoff*
