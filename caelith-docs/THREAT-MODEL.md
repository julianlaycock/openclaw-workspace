# STRIDE Threat Model — Caelith Platform

**Last updated:** 2026-02-23  
**Scope:** Caelith multi-tenant fund compliance SaaS  
**Methodology:** STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)

---

## 1. Architecture Overview

```
┌──────────────┐     HTTPS      ┌──────────────────┐     HTTP       ┌──────────────────┐
│              │ ───────────────→│                  │ ──────────────→│                  │
│   Browser    │                 │  Next.js Frontend│                │  Express API     │
│  (SPA/React) │ ←───────────── │  (localhost:3000) │ ←──────────── │  (localhost:3001) │
│              │                 │                  │                │                  │
└──────────────┘                 └──────────────────┘                └────────┬─────────┘
                                                                             │
                                                              ┌──────────────┼──────────────┐
                                                              │              │              │
                                                              ▼              ▼              ▼
                                                    ┌──────────────┐ ┌────────────┐ ┌────────────┐
                                                    │  PostgreSQL  │ │  Anthropic  │ │  External  │
                                                    │  (RLS-      │ │  Claude API │ │  APIs      │
                                                    │   enforced)  │ │  (copilot)  │ │  (news,    │
                                                    └──────────────┘ └────────────┘ │   reg data)│
                                                                                    └────────────┘
```

### Trust Boundaries

| # | Boundary | From → To | Protocol |
|---|----------|-----------|----------|
| TB1 | Browser ↔ Frontend | User device → Next.js SSR/static | HTTPS (HSTS enforced) |
| TB2 | Frontend ↔ API | Next.js → Express backend | HTTP (internal); JWT auth |
| TB3 | API ↔ Database | Express → PostgreSQL | TCP; RLS via `app.tenant_id` session var |
| TB4 | API ↔ Anthropic | Express → Claude API | HTTPS; API key in env |
| TB5 | API ↔ External APIs | Express → news/regulatory feeds | HTTPS |
| TB6 | Tenant ↔ Tenant | Logical boundary within shared DB | RLS policies per table |

---

## 2. Data Flow Diagrams

### 2a. Authentication Flow

```
Browser                    API                        PostgreSQL
  │                         │                            │
  │── POST /api/auth/login ─→│                            │
  │   {email, password}     │── SELECT * FROM users ─────→│
  │                         │   WHERE email = $1          │
  │                         │←── user row ────────────────│
  │                         │                            │
  │                         │── bcrypt.compare() ────────│
  │                         │── INSERT login_attempts ───→│
  │                         │── Generate JWT + refresh ──│
  │←── {token, refresh} ───│                            │
  │                         │── INSERT refresh_tokens ──→│
```

### 2b. Copilot SQL Execution Flow

```
Browser                    API                    Anthropic         PostgreSQL
  │                         │                        │                 │
  │── POST /copilot/chat ──→│                        │                 │
  │   {message, context}   │                        │                 │
  │                         │── Build system prompt ─│                 │
  │                         │   + DB schema          │                 │
  │                         │── API call ───────────→│                 │
  │                         │←── tool_use: sql_query │                 │
  │                         │                        │                 │
  │                         │── Validate: READ-ONLY? │                 │
  │                         │── SET app.tenant_id ──→│                 │
  │                         │── Execute query ──────→│                 │
  │                         │←── Raw results ────────│                 │
  │                         │                        │                 │
  │                         │── stripPII(results) ──│                 │
  │                         │── Send sanitized ─────→│                 │
  │                         │←── Natural language ───│                 │
  │←── {response} ─────────│                        │                 │
```

### 2c. CSV Import Flow

```
Browser                    API                        PostgreSQL
  │                         │                            │
  │── POST /import/csv ────→│                            │
  │   (multipart, ≤5MB)    │── Validate MIME type ──────│
  │                         │── Parse CSV in memory ─────│
  │                         │── Validate column mapping ─│
  │                         │── Validate each row ───────│
  │                         │── SET app.tenant_id ──────→│
  │                         │── INSERT ... (batched) ───→│
  │                         │←── result counts ──────────│
  │←── {imported, errors} ─│                            │
```

### 2d. File Export / Audit Package Generation

```
Browser                    API                        PostgreSQL
  │                         │                            │
  │── GET /export/... ─────→│                            │
  │                         │── Auth + rate limit check ─│
  │                         │── SET app.tenant_id ──────→│
  │                         │── Query scoped data ──────→│
  │                         │←── rows ──────────────────│
  │                         │── Generate PDF/CSV ────────│
  │                         │── sanitizeFilename() ──────│
  │←── file download ──────│                            │
```

---

## 3. Threat Enumeration by Trust Boundary

### TB1: Browser ↔ Frontend

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **S** Spoofing | Phishing site mimics Caelith login | High | Medium |
| **T** Tampering | DOM manipulation / browser extension injects malicious JS | Medium | Low |
| **I** Info Disclosure | Sensitive data cached in browser storage | Medium | Medium |
| **D** DoS | Client-side resource exhaustion (large datasets) | Low | Low |

### TB2: Frontend ↔ API

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **S** Spoofing | Stolen/forged JWT used to impersonate user | Critical | Medium |
| **T** Tampering | Modified request body bypasses frontend validation | High | Medium |
| **R** Repudiation | User denies performing action; insufficient audit logging | Medium | Low |
| **I** Info Disclosure | Verbose error messages leak stack traces/schema | Medium | Medium |
| **D** DoS | API flooding exhausts rate limits or DB connections | High | Medium |
| **E** Elevation | Role parameter injection (`role: admin` in request body) | Critical | Low |

### TB3: API ↔ Database

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **S** Spoofing | `app.tenant_id` not set → RLS denies access (secure default) | Critical | Low |
| **T** Tampering | SQL injection modifies data outside tenant scope | Critical | Low |
| **T** Tampering | Decision record hash chain broken by direct DB edit | High | Low |
| **I** Info Disclosure | RLS bypass reveals cross-tenant data | Critical | Low |
| **E** Elevation | Application DB user has excessive privileges (superuser) | Critical | Low |

### TB4: API ↔ Anthropic Claude

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **I** Info Disclosure | PII sent to Anthropic in query results | High | Medium |
| **T** Tampering | Prompt injection causes Claude to generate harmful SQL | Critical | Medium |
| **I** Info Disclosure | Anthropic API key leaked in logs/errors | High | Low |
| **R** Repudiation | AI-generated compliance advice is incorrect; no audit trail | High | Medium |

### TB5: API ↔ External APIs

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **S** Spoofing | MITM on outbound API calls | Medium | Low |
| **T** Tampering | Malicious data from compromised feed injected into system | Medium | Low |
| **I** Info Disclosure | Tenant data sent to wrong external endpoint (SSRF) | High | Low |

### TB6: Tenant ↔ Tenant (Multi-Tenant Isolation)

| STRIDE | Threat | Severity | Likelihood |
|--------|--------|----------|------------|
| **I** Info Disclosure | Tenant A accesses Tenant B's investors/funds/documents | Critical | Low |
| **T** Tampering | Tenant A modifies Tenant B's decision records | Critical | Low |
| **E** Elevation | Tenant admin escalates to platform-wide admin | Critical | Low |

---

## 4. Existing Mitigations

### 4a. Multi-Tenant Data Isolation

| Control | Implementation | Evidence |
|---------|---------------|----------|
| Row-Level Security | All 12+ tenant-scoped tables have RLS enabled with strict policies (no COALESCE fallback) | `migrations/019_security_hardening.sql`, `migrations/020_fix_rls_policies.sql` |
| Session variable | `app.tenant_id` must be set and non-empty; if unset, RLS denies all rows | `migrations/020_fix_rls_policies.sql` |
| Tenant-scoped indexes | Composite indexes on `(tenant_id, ...)` for all major queries | `migrations/019_security_hardening.sql` |
| JWT tenant claim | JWT includes `tenantId`; middleware sets DB session variable | `src/backend/middleware/auth.ts` |

### 4b. Copilot SQL Execution

| Control | Implementation | Evidence |
|---------|---------------|----------|
| Read-only validation | Queries from Claude are validated as SELECT-only before execution | `src/backend/services/copilot-service.ts` |
| PII stripping | `stripPIIFromToolResult()` pseudonymizes names, emails, tax IDs, LEIs before sending to Anthropic | `src/backend/services/copilot-service.ts` |
| Tenant scoping | All copilot queries execute within `queryInTenantContext()` with RLS | `src/backend/services/copilot-service.ts` |
| Audit logging | Copilot interactions logged as events (`copilot.chat`, `copilot.feedback`) | `src/backend/routes/copilot-routes.ts` |
| Input validation | Empty/missing messages rejected; message content sanitized | `src/backend/routes/copilot-routes.ts` |

### 4c. Hash Chain Integrity

| Control | Implementation | Evidence |
|---------|---------------|----------|
| SHA-256 chain | Each decision record includes `integrity_hash` and `previous_hash` | `migrations/017_integrity_chain.sql` |
| Sequence numbers | `BIGINT GENERATED BY DEFAULT AS IDENTITY` with unique index | `migrations/017_integrity_chain.sql` |
| Immutability | Decision records: no DELETE endpoint, no UPDATE of core fields | `migrations/029_decision_record_immutability.sql` |
| Verification endpoint | `/api/integrity/verify` validates the full chain | `src/backend/routes/integrity-routes.ts` |

### 4d. File Export Generation

| Control | Implementation | Evidence |
|---------|---------------|----------|
| Filename sanitization | `sanitizeFilename()` strips traversal, null bytes, control chars | `src/backend/middleware/security.ts` |
| Rate limiting | Export endpoint: 10 requests/minute | `src/backend/middleware/security.ts` |
| Tenant scoping | All export queries run within RLS-enforced tenant context | Various route files |
| Content-Disposition | Filenames sanitized before use in headers | `src/backend/middleware/security.ts` |

### 4e. CSV Import

| Control | Implementation | Evidence |
|---------|---------------|----------|
| File size limit | 5 MB maximum via multer config | `src/backend/routes/import-routes.ts` |
| MIME type validation | Only `text/csv`, `text/plain`, `application/vnd.ms-excel` accepted | `src/backend/routes/import-routes.ts` |
| Memory-only storage | `multer.memoryStorage()` — no temp files written to disk | `src/backend/routes/import-routes.ts` |
| Entity type validation | Only `investors`, `fund_structures`, `holdings`, `eligibility_criteria` allowed | `src/backend/routes/import-routes.ts` |
| Row-level validation | Each row validated against schema before insert | `src/backend/services/csv-import-service.ts` |
| Tenant scoping | All inserts within tenant context | Import routes |

### 4f. General Security Controls

| Control | Implementation | Evidence |
|---------|---------------|----------|
| Security headers | HSTS, CSP, X-Frame-Options DENY, nosniff, etc. | `src/backend/middleware/security.ts` |
| CSRF protection | Origin/Referer validation on state-changing requests | `src/backend/middleware/security.ts` |
| Rate limiting | API: 200/15min, Auth: 10/15min, Export: 10/min (production) | `src/backend/middleware/security.ts` |
| Brute-force protection | `login_attempts` table tracks attempts per email and IP | `migrations/019_security_hardening.sql` |
| Input sanitization | Null byte removal, length truncation (10KB), recursive object sanitization | `src/backend/middleware/security.ts` |
| Soft deletes | Users, investors, funds, assets support `deleted_at` (no hard delete) | `migrations/019_security_hardening.sql` |
| Password hashing | bcrypt | `src/backend/services/` (auth) |
| Refresh tokens | Stored in DB with expiry; revocable | `migrations/019_security_hardening.sql` |

---

## 5. Residual Risks

| # | Risk | Current Status | Severity | Recommended Mitigation |
|---|------|---------------|----------|----------------------|
| R1 | **Prompt injection in copilot** — Claude may be tricked into generating harmful queries despite read-only validation | Partially mitigated (read-only check exists) | High | Add SQL AST parsing; whitelist allowed tables/functions; implement query result row limits |
| R2 | **PII leakage to Anthropic** — Pseudonymization may miss new PII fields added in future migrations | Partially mitigated | High | Allowlist approach (only send explicitly safe columns) instead of blocklist |
| R3 | **No encryption at rest** — PII columns (name, email, tax_id, LEI) stored in plaintext in PostgreSQL | Gap | High | Implement column-level encryption for restricted PII fields |
| R4 | **KYC documents stored as BYTEA** — Binary documents in DB without additional encryption layer | Partially mitigated (RLS) | High | Add application-level encryption for `file_data` column; consider external object storage with envelope encryption |
| R5 | **Superuser DB access bypasses RLS** — If application connects as superuser, all RLS policies are ineffective | Unknown | Critical | Ensure app connects with non-superuser role; audit connection configuration |
| R6 | **JWT secret rotation** — No documented process for rotating JWT signing keys | Gap | Medium | Implement key rotation with grace period for existing tokens |
| R7 | **No WAF/DDoS protection** — Rate limiting is application-level only | Gap | Medium | Deploy cloud WAF (Cloudflare, AWS WAF) in front of application |
| R8 | **Shared DB for all tenants** — Compromise of DB credentials exposes all tenants | Accepted (mitigated by RLS) | High | Consider per-tenant database schemas for high-value customers |
| R9 | **No intrusion detection** — No automated alerting on anomalous access patterns | Gap | Medium | Implement log-based anomaly detection; alert on RLS violations, bulk data access |
| R10 | **Password reset token strength** — Token generation method not audited | Unknown | Medium | Verify tokens use `crypto.randomBytes(32)` or equivalent; enforce short TTL |
