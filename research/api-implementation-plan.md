# Caelith API Implementation Plan

> Practical, actionable roadmap for shipping compliance APIs to fund admins.
> Last updated: Feb 26, 2026

---

## Current State

We're not starting from zero. Commit `a99fea05` already delivered Phase 2 API infrastructure:

- **Auth**: API key system (`ck_live_` prefix, bcrypt hashed, stored in PostgreSQL)
- **Rate limiting**: Tiered per plan (free/pro/enterprise)
- **Routing**: Versioned at `/api/v1/*`
- **Docs**: OpenAPI/Swagger at `/api/docs`
- **Backend**: Express on localhost:3001, deployed to Railway (Amsterdam, EU)

**Working services already built:**
| Service | Status | Internal Route |
|---|---|---|
| Annex IV XML serializer | ✅ Production | Used by dashboard |
| Sanctions screening (pg_trgm) | ✅ Production | 6,863 entities loaded |
| LEI validation (GLEIF API) | ✅ Production | Real-time + cache |
| EMT/EET/EPT generator | ✅ Production | CSV/XLSX export |
| Readiness assessment | ✅ Production | 24-question scoring |
| Compliance Copilot AI | ✅ Production | Claude Haiku, tool-use |
| Rules engine (13 rules) | ✅ Production | 6 frameworks |
| Audit trail (SHA-256 chain) | ✅ Production | Tamper-evident |

**The gap**: These services power the dashboard internally but aren't exposed as clean, documented, metered API endpoints for external consumers.

---

## Phase 1: API Productization (Weeks 1-3)

**Goal**: Wrap existing services as production-grade API endpoints.

### Week 1: Core Endpoints

Expose the four highest-value endpoints:

```
POST /api/v1/annex-iv/generate
- Input: Fund data JSON (fund type, NAV, strategy, counterparties, etc.)
- Output: XSD-validated Annex IV XML + validation report
- Schema: Zod validation on input, detailed error messages

POST /api/v1/sanctions/screen
- Input: { name: string, threshold?: number, lists?: string[] }
- Output: { matches: [...], screenedAt: ISO8601, listVersions: {...} }
- Schema: Name required, threshold 0.0-1.0, default 0.3

GET /api/v1/lei/validate/:lei
- Input: LEI in path param (20-char alphanumeric)
- Output: { valid: boolean, status: string, entity: {...}, cachedAt: ISO8601 }
- Schema: LEI format validation before GLEIF call

POST /api/v1/templates/emt
- Input: Fund metadata JSON (NAV, fees, risk, ESG classification)
- Output: Filled EMT template (JSON or CSV)
- Also: /api/v1/templates/eet and /api/v1/templates/ept
```

**Tasks:**
- [ ] Create `src/api/v1/` route modules for each endpoint
- [ ] Add Zod input validation schemas per endpoint
- [ ] Standardize response format: `{ success, data, error, requestId, timestamp }`
- [ ] Add per-endpoint rate limiting (configurable per tier)
- [ ] Add request ID tracking (UUID per request, logged)
- [ ] Write integration tests for each endpoint

### Week 2: API Key Management

- [ ] API key management endpoints:
  - `POST /api/v1/keys` — create new key (returns key once, stores hash)
  - `DELETE /api/v1/keys/:keyId` — revoke key
  - `POST /api/v1/keys/:keyId/rotate` — rotate key (new key, old key valid for 24h)
  - `GET /api/v1/keys` — list active keys (masked)
- [ ] Build API key dashboard page in frontend (create/revoke/rotate)
- [ ] Add usage tracking: log every API call with key ID, endpoint, status, latency
- [ ] Usage endpoint: `GET /api/v1/usage` — returns call counts by endpoint/day

### Week 3: Documentation & OpenAPI

- [ ] Generate complete OpenAPI 3.0 spec for all endpoints
- [ ] Add request/response examples to every endpoint
- [ ] Write getting-started guide (auth → first call → interpret response)
- [ ] Add error code reference (standardized error codes with descriptions)
- [ ] Ensure Swagger UI at `/api/docs` reflects all new endpoints
- [ ] Create Postman collection export

**Deliverable**: 4 production endpoints, API key management, usage tracking, full docs.

---

## Phase 2: Developer Experience (Weeks 3-5)

**Goal**: Make it easy and pleasant to integrate.

### Week 3-4: SDK & Playground

- [ ] Generate TypeScript SDK from OpenAPI spec (use `openapi-typescript-codegen` or similar)
- [ ] Publish as `@caelith/sdk` on npm
- [ ] Interactive API playground with pre-filled example requests
- [ ] Sandbox mode: `/api/v1/sandbox/*` endpoints with synthetic test data
  - Sandbox uses test fund data (no real client data)
  - Sandbox API keys (`ck_test_` prefix) for development
  - Same endpoints, same schemas, fake data

### Week 4-5: Webhooks & Async

- [ ] Webhook registration endpoint: `POST /api/v1/webhooks`
- [ ] Events to support:
  - `sanctions.list_updated` — new sanctions list version loaded
  - `annex-iv.validation_complete` — async validation finished (for bulk)
  - `lei.status_changed` — cached LEI status changed on re-check
- [ ] Webhook delivery: signed payloads (HMAC-SHA256), retry with exponential backoff
- [ ] Webhook logs: `GET /api/v1/webhooks/:id/deliveries`

### API Versioning Strategy

- `/api/v1/*` is stable — no breaking changes after launch
- Breaking changes → `/api/v2/*` with 12-month deprecation notice on v1
- Non-breaking additions (new fields, new endpoints) added to v1
- Version sunset communicated via `Sunset` HTTP header + webhook event

**Deliverable**: TypeScript SDK on npm, sandbox environment, webhook support, versioning policy.

---

## Phase 3: Enterprise Features (Weeks 5-8)

**Goal**: Support fund admins serving multiple clients at scale.

### Multi-Tenant API

- [ ] Tenant concept: one API customer (fund admin) manages multiple KVG clients
- [ ] `X-Tenant-Id` header to scope requests to a specific client
- [ ] Tenant management endpoints:
  - `POST /api/v1/tenants` — register a client
  - `GET /api/v1/tenants` — list clients
  - `GET /api/v1/tenants/:id/usage` — per-client usage
- [ ] Database: tenant isolation via `tenant_id` column + RLS policies in PostgreSQL

### Bulk Operations

- [ ] `POST /api/v1/annex-iv/generate/batch` — submit multiple funds, get results async via webhook
- [ ] `POST /api/v1/sanctions/screen/batch` — screen multiple names in one call
- [ ] Batch limit: 100 items per request (enterprise: 1000)
- [ ] Async processing with job status endpoint: `GET /api/v1/jobs/:jobId`

### Rate Limit Tiers

| Tier | Rate Limit | Endpoints | Price |
|---|---|---|---|
| Free | 100 calls/day | Readiness check + LEI only | €0 |
| Pro | 10,000 calls/day | All endpoints | €990/mo |
| Enterprise | 100,000 calls/day | All + bulk + multi-tenant | Custom |

### Enterprise Security & Compliance

- [ ] SSO/OAuth2 for enterprise API consumers (OIDC integration)
- [ ] IP allowlisting per API key
- [ ] Audit log API: `GET /api/v1/audit` — query all compliance decisions programmatically
  - Filter by tenant, date range, decision type, outcome
  - Export as JSON or CSV
- [ ] SLA monitoring: uptime target 99.9%, latency P95 < 500ms
- [ ] Status page (public or authenticated)

**Deliverable**: Multi-tenant support, bulk ops, tiered rate limits, enterprise security.

---

## Phase 4: Go-to-Market (Weeks 6-10, overlapping with Phase 3)

**Goal**: Get the first fund admin paying for API access.

### Developer Marketing

- [ ] API pricing page on caelith.tech
  - Free tier (readiness check API — lead gen)
  - Pro tier (full API access)
  - Enterprise (custom, "talk to us")
- [ ] Developer portal at docs.caelith.tech (or /developers)
  - Getting started guide (5 minutes to first API call)
  - Authentication guide
  - Endpoint reference (auto-generated from OpenAPI)
  - Code examples in TypeScript, Python, cURL
- [ ] Technical blog posts:
  - "How we validate Annex IV XML against ESMA's XSD" (SEO + credibility)
  - "From open-annex-iv to production API: the open-core journey"
  - "Automating AIFMD II compliance with a single API call"

### Integration Guides

- [ ] Generic integration guide (REST API basics for fund admin dev teams)
- [ ] Common fund admin system integration patterns:
  - Batch processing (nightly compliance runs)
  - Event-driven (new investor → screen → validate → report)
  - Embedded (iframe readiness check on fund admin portal)

### Sales Motion

- [ ] Free readiness check API as lead gen (no auth required, limited to 50/day per IP)
- [ ] Identify 10 target fund admins with in-house tech teams
- [ ] Outreach template: "Your team builds compliance workflows. Our API does the hard parts."
- [ ] Case study template for first API customer
- [ ] Demo environment: pre-configured sandbox with realistic test data

**Deliverable**: Pricing page, developer portal, blog content, first outreach to fund admin tech teams.

---

## Integration with Overall Strategy

### Open-Core Flywheel

```
open-annex-iv (npm, free)
  → Developer discovers library
  → Needs validation, filing, audit trail
  → Upgrades to paid API (Pro/Enterprise)
  → Fund admin integrates for all clients
  → Revenue funds more open-source development
  → Repeat
```

The free npm package is the top of the funnel. The API is the monetization layer. The dashboard is the reference implementation that proves everything works.

### Revenue Stacking

| Revenue Stream | Unit Economics | Scale |
|---|---|---|
| Dashboard (KVG direct) | €990-3,500/mo per KVG | 200 German KVGs |
| API (Fund admins) | €50-200K/yr per admin | 10-20 major admins |
| Free tier (Lead gen) | €0 → conversion to paid | Unlimited |

API revenue is higher-margin (no UI support burden) and stickier (integration switching cost).

### Free Readiness Check as Lead Gen

`GET /api/v1/readiness/check` — no auth required, rate limited per IP.

- Developers embed it on their own sites
- Each call is a warm lead (they have funds that need compliance)
- Upsell path: "You found gaps → our API fixes them automatically"

### AIFMD II Timeline Alignment

| Date | Event | API Strategy |
|---|---|---|
| Now → Mar 2026 | Phase 1-2 build | Ship core endpoints |
| Apr 16, 2026 | AIFMD II enforcement | API must be production-ready |
| H2 2026 | ESMA new Annex IV ITS | Schema updates → API updates (customers need us) |
| Apr 2027 | New reporting obligations | Full API suite required |

The deadline creates urgency. Fund admins who integrate now are locked in for the schema transition.

### Finch Capital Positioning

For the March 2 call and future VC conversations:

- "We're not a dashboard company — we're compliance infrastructure"
- "One fund admin deal = €50-200K ARR. There are 20+ targets in Germany alone."
- "The API layer is what makes this a platform, not a tool"
- Revenue model: dashboard proves the engine → API scales the business
- Comparable: Stripe (payments infra), Plaid (banking infra), Caelith (compliance infra)

---

## Technical Architecture

```
┌─────────────────────────────────────────────────┐
│                  API Gateway                      │
│  (Rate limiting, Auth, Request logging, CORS)     │
├─────────────────────────────────────────────────┤
│              Versioned Router                      │
│         /api/v1/* → route handlers                │
├─────────────────────────────────────────────────┤
│              Service Layer                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Annex IV │ │Sanctions │ │   LEI    │         │
│  │Serializer│ │ Screener │ │Validator │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Template │ │Readiness │ │  Audit   │         │
│  │Generator │ │  Engine  │ │  Trail   │         │
│  └──────────┘ └──────────┘ └──────────┘         │
├─────────────────────────────────────────────────┤
│              Data Layer                            │
│  PostgreSQL (RLS for tenant isolation)            │
│  Redis (rate limiting, caching)                   │
│  GLEIF API (external, cached)                     │
├─────────────────────────────────────────────────┤
│              Infrastructure                        │
│  Railway EU (Amsterdam) → scale to dedicated      │
│  as demand grows                                  │
└─────────────────────────────────────────────────┘
```

### Key Decisions

- **API gateway**: Express middleware stack (already built). No external gateway needed yet.
- **Auth**: API key in `Authorization: Bearer ck_live_...` header. Keys bcrypt-hashed in DB.
- **Tenant isolation**: PostgreSQL Row-Level Security (RLS) policies keyed on `tenant_id`.
- **Caching**: Redis for rate limit counters + GLEIF/sanctions list caches. Add when needed (start with in-memory).
- **Hosting**: Railway EU (Amsterdam). Single service for now. Split into microservices only if specific service needs independent scaling.
- **Monitoring**: Request logging to PostgreSQL (endpoint, status, latency, key_id). Grafana dashboard when volume justifies it. Alert on error rate > 5% or P95 latency > 2s.

### Database Changes

```sql
-- API usage tracking
CREATE TABLE api_usage (
  id SERIAL PRIMARY KEY,
  api_key_id INTEGER REFERENCES api_keys(id),
  tenant_id INTEGER REFERENCES tenants(id),
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER NOT NULL,
  latency_ms INTEGER NOT NULL,
  request_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_usage_key_date ON api_usage(api_key_id, created_at);
CREATE INDEX idx_api_usage_tenant ON api_usage(tenant_id, created_at);

-- Tenant management
CREATE TABLE tenants (
  id SERIAL PRIMARY KEY,
  api_key_id INTEGER REFERENCES api_keys(id),
  name VARCHAR(255) NOT NULL,
  external_id VARCHAR(255), -- fund admin's client ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook subscriptions
CREATE TABLE webhooks (
  id SERIAL PRIMARY KEY,
  api_key_id INTEGER REFERENCES api_keys(id),
  url VARCHAR(2048) NOT NULL,
  events TEXT[] NOT NULL,
  secret VARCHAR(255) NOT NULL, -- HMAC signing key
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Success Metrics

| Metric | Week 4 Target | Week 8 Target | Week 12 Target |
|---|---|---|---|
| API keys issued | 5 (test users) | 15 | 30+ |
| Monthly API calls | 1,000 | 10,000 | 50,000 |
| Paying API customers | 0 | 1 | 3 |
| Revenue per API customer | — | €990/mo | €2,500/mo avg |
| Time to first API call | < 15 min | < 10 min | < 5 min |
| OpenAPI spec coverage | 4 endpoints | 8 endpoints | 12 endpoints |
| SDK downloads (npm) | 10 | 50 | 200 |
| Documentation pages | 10 | 25 | 40 |
| Uptime | 99% | 99.5% | 99.9% |

### Leading Indicators to Watch

- **Readiness check API calls** — free usage = demand signal
- **Sandbox API key creation** — developers evaluating
- **Swagger UI page views** — developer interest
- **open-annex-iv npm downloads** → API key creation conversion rate

---

## Immediate Next Steps (This Week)

1. **Create route stubs** for the 4 core endpoints with Zod validation
2. **Wire existing services** to the new API routes
3. **Add usage logging middleware** (endpoint, status, latency, key_id)
4. **Update OpenAPI spec** to include all 4 endpoints with examples
5. **Test with cURL** — document the exact commands in a getting-started guide

This isn't theoretical. The services exist. The auth exists. We need to wrap, document, meter, and ship.
