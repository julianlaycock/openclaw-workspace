# Architecture

Deep-dive into Caelith's architecture, data flow, and key design decisions.

---

## System Overview

```
┌─────────────┐     REST/JSON      ┌─────────────────┐       SQL        ┌──────────────┐
│   Next.js   │◄──────────────────►│  Express API    │◄───────────────►│ PostgreSQL   │
│   Frontend  │     :3000→:3001    │  Backend        │     pg driver   │ 16 + RLS     │
│             │                    │                 │                 │              │
│ React+TW    │                    │ Routes→Services │                 │ 52 migrations│
│ i18n (DE/EN)│                    │ →Repositories   │                 │ tenant_id    │
└─────────────┘                    └────────┬────────┘                 └──────────────┘
                                            │
                                   ┌────────▼────────┐
                                   │  Rules Engine   │
                                   │  (standalone)   │
                                   └────────┬────────┘
                                            │
                                   ┌────────▼────────┐
                                   │  AI Copilot     │
                                   │  (Anthropic)    │
                                   │  PII-stripped   │
                                   └─────────────────┘
```

---

## Folder Structure

```
caelith/
├── migrations/              # Sequential SQL migrations (001-052)
│
├── src/
│   ├── backend/
│   │   ├── server.ts        # Express app entry point
│   │   ├── db.ts            # PostgreSQL connection pool
│   │   ├── errors.ts        # Custom error classes
│   │   ├── validators.ts    # Request validation (Zod)
│   │   ├── config/
│   │   │   └── security-config.ts  # CORS, CSP, rate limits
│   │   ├── middleware/
│   │   │   ├── auth.ts      # JWT verification + RBAC
│   │   │   ├── security.ts  # Helmet, CORS, CSP headers
│   │   │   ├── error-handler.ts
│   │   │   ├── validate.ts  # Schema validation middleware
│   │   │   └── async-handler.ts
│   │   ├── models/          # TypeScript interfaces (no ORM)
│   │   │   └── index.ts     # Investor, Fund, Rule, AuditEvent, etc.
│   │   ├── repositories/    # Data access layer — raw SQL via pg
│   │   │   ├── investor-repository.ts
│   │   │   ├── rules-repository.ts
│   │   │   ├── event-repository.ts      # Audit trail
│   │   │   ├── fund-structure-repository.ts
│   │   │   └── ... (12 repositories)
│   │   ├── services/        # Business logic layer
│   │   │   ├── eligibility-service.ts   # Investor classification
│   │   │   ├── rules-service.ts         # Rule evaluation
│   │   │   ├── audit-trail-service.ts   # Hash-chained audit log
│   │   │   ├── integrity-service.ts     # Chain verification
│   │   │   ├── copilot-service.ts       # AI with tool-use
│   │   │   ├── pii-stripper.ts          # GDPR PII anonymization
│   │   │   ├── annex-iv-service.ts      # ESMA reporting
│   │   │   └── ... (40+ services)
│   │   ├── routes/          # Express route definitions
│   │   │   ├── investor-routes.ts
│   │   │   ├── rules-routes.ts
│   │   │   ├── copilot-routes.ts
│   │   │   └── ... (35+ route files)
│   │   ├── lib/             # Shared utilities
│   │   │   ├── logger.ts
│   │   │   ├── compliance-score.ts
│   │   │   └── pdf-brand.ts
│   │   └── utils/
│   │       └── eea-domicile.ts
│   │
│   ├── frontend/            # Next.js 14 application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # API client, hooks, i18n strings
│   │   ├── public/          # Static assets, logos
│   │   └── tailwind.config.ts
│   │
│   ├── rules-engine/        # Standalone compliance rule engine
│   │   ├── types.ts         # Rule, RuleResult, Severity
│   │   ├── validator.ts     # Core evaluation logic
│   │   └── validator.test.ts
│   │
│   └── mcp/                 # Model Context Protocol server
│       └── server.ts        # MCP tool definitions for AI agents
│
├── tests/
│   ├── unit/                # Fast, no-DB tests
│   ├── e2e/                 # Full API integration tests
│   └── fixtures/            # Shared test data
│
├── scripts/                 # CLI utilities
│   ├── migrate.ts           # Migration runner
│   ├── seed-demo.ts         # Demo data seeder
│   ├── seed-data.ts         # Basic seed
│   ├── seed-showcase.ts     # Showcase dataset
│   └── normalize-admin-user.ts
│
├── docker-compose.yml       # PostgreSQL + app
├── openapi.yml              # OpenAPI 3.0 spec
└── .env.example             # Environment template
```

---

## Data Flow

### Typical Request Lifecycle

```
Browser
  │
  ▼
Next.js Page (React component)
  │  fetch('/api/investors', { headers: { Authorization: 'Bearer ...' } })
  ▼
Express Router  (investor-routes.ts)
  │  middleware: auth → validate → asyncHandler
  ▼
Service Layer   (investor-service.ts)
  │  business logic, eligibility checks, rule evaluation
  ▼
Repository      (investor-repository.ts)
  │  parameterized SQL queries via pg Pool
  ▼
PostgreSQL
  │  RLS enforces tenant_id scoping
  ▼
Response flows back up: Repository → Service → Route → JSON → Frontend
```

### Audit Trail Flow

Every state-changing operation creates an audit event:

```
Service performs action
  │
  ├──► Write business data (investors, rules, etc.)
  │
  └──► audit-trail-service.ts
         │
         ├── Compute SHA-256 hash: hash(prev_hash + event_data + timestamp)
         ├── INSERT into audit_events with hash + prev_hash
         └── Return immutable audit record
```

---

## Key Design Decisions

### 1. Hash-Chained Audit Trail

**Decision:** Every audit event includes a SHA-256 hash of `(previous_hash + event_payload + timestamp)`, forming an immutable chain.

**Why:** EU fund compliance requires tamper-evident audit logs. Regulators (BaFin) and auditors need proof that compliance records haven't been altered. The hash chain makes any tampering detectable — if any record is modified, all subsequent hashes break.

**Verification:** `integrity-service.ts` can verify the entire chain on demand. Evidence bundles include chain verification status.

### 2. Multi-Tenancy via `tenant_id`

**Decision:** All business tables include a `tenant_id` column. PostgreSQL Row-Level Security (RLS) policies enforce tenant isolation at the database level.

**Why:** Caelith serves multiple fund management companies. Tenant isolation must be bullet-proof — a compliance platform cannot leak data between clients. RLS provides defense-in-depth beyond application-level checks.

**Implementation:**
- Migration `016_tenants.sql` adds tenant infrastructure
- Migration `030_enforce_rls.sql` enables RLS policies
- Every query scopes through `tenant_id` in the repository layer

### 3. Rules Engine Pattern

**Decision:** Compliance rules are modeled as data (stored in DB) evaluated by a standalone engine (`src/rules-engine/`), not hardcoded business logic.

**Why:** EU regulations change. New rules (AIFMD II updates, ELTIF 2.0 amendments) must be addable without code deployments. The rule engine evaluates conditions against fund/investor data and produces typed results with severity levels.

**Components:**
- `types.ts` — Rule schema, conditions, severity enum
- `validator.ts` — Evaluates rules against entity data
- `composite-rules-service.ts` — Combines multiple rules into rule packs
- `nl-rule-compiler.ts` — AI-powered natural language → rule translation

### 4. No ORM — Raw SQL via `pg`

**Decision:** Use the `pg` driver directly with parameterized queries. No Prisma, Drizzle, or TypeORM.

**Why:** Compliance queries are complex (joins across audit trails, regulatory lookups, aggregate compliance scores). An ORM would add abstraction overhead without benefit. Raw SQL gives full control over query plans, and the repository pattern keeps it organized.

### 5. PII-Safe AI Copilot

**Decision:** All data sent to the AI Copilot passes through `pii-stripper.ts` which removes/anonymizes personally identifiable information before any LLM API call.

**Why:** DSGVO/GDPR compliance. Fund investor data (names, addresses, tax IDs) must never leave the system boundary to third-party AI providers. The PII stripper uses pattern matching + entity detection to sanitize inputs.

### 6. RBAC with Three Roles

**Decision:** Three roles: `admin`, `compliance_officer`, `viewer`. JWT tokens carry role claims. Middleware enforces per-route access.

**Why:** Separation of duties is a regulatory requirement. Compliance officers can run assessments and generate reports. Viewers can audit but not modify. Admins manage users and configuration.

### 7. Sequential SQL Migrations

**Decision:** Plain `.sql` files numbered 001-052, run sequentially by `scripts/migrate.ts`.

**Why:** Maximum transparency for auditors. Every schema change is a readable SQL file. No migration framework magic. The migration runner is <100 lines and tracks applied migrations in a `schema_migrations` table.

---

## Regulatory Architecture

```
┌─────────────────────────────────────┐
│           Rule Packs                │
│  ┌───────────┐  ┌────────────────┐  │
│  │ AIFMD II  │  │ KAGB           │  │
│  │ (13 rules)│  │ (classification)│  │
│  └───────────┘  └────────────────┘  │
│  ┌───────────┐  ┌────────────────┐  │
│  │ ELTIF 2.0 │  │ MiFID II       │  │
│  └───────────┘  └────────────────┘  │
│  ┌───────────┐  ┌────────────────┐  │
│  │ SFDR      │  │ DSGVO/GDPR     │  │
│  └───────────┘  └────────────────┘  │
└──────────────────┬──────────────────┘
                   │ evaluate()
              ┌────▼─────┐
              │ Rules    │
              │ Engine   │
              └────┬─────┘
                   │ RuleResult[]
              ┌────▼──────────┐
              │ Compliance    │
              │ Score + Report│
              └───────────────┘
```

---

## Security Layers

1. **Transport:** HTTPS in production
2. **Authentication:** JWT with bcrypt-hashed passwords
3. **Authorization:** RBAC middleware on every route
4. **Input Validation:** Zod schemas on all request bodies
5. **SQL Injection:** Parameterized queries only
6. **Tenant Isolation:** PostgreSQL RLS
7. **Rate Limiting:** Per-endpoint rate limits (configurable store: memory or DB)
8. **Security Headers:** Helmet + CSP via `security-config.ts`
9. **Audit:** Hash-chained immutable event log
10. **AI Safety:** PII stripping before any external API call
