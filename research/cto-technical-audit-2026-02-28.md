# Caelith Technical Audit — February 28, 2026

## CTO Assessment

### Executive Summary

Caelith is a surprisingly mature codebase for a 10-week, single-developer project — approximately 80,000 lines of TypeScript across 412 files, with a well-structured Express + Next.js architecture, real security hardening, and 35 test files covering critical paths. The biggest strength is the comprehensive domain coverage (72 API route files, 60+ services, 12 repositories) that demonstrates deep regulatory knowledge encoded in code. The biggest risk is the absence of automated test execution in CI — the GitHub Actions pipeline only runs typecheck, meaning all 35 test files could be silently broken on every deploy.

### Overall Score: 58/100

*Methodology: weighted average across 11 categories. Scores calibrated against what a senior engineer at a regulated fintech (Stripe, Adyen) would expect. Context-adjusted for stage: pre-revenue, 1 developer, 10 weeks.*

### Detailed Scoring

| Category | Weight | Score | Weighted | Notes |
|----------|--------|-------|----------|-------|
| Code Quality & Architecture | 15% | 68/100 | 10.2 | Clean separation, good patterns, some sprawl |
| Security Posture | 15% | 72/100 | 10.8 | Genuinely strong for stage — real pentest fixes |
| Test Coverage | 10% | 42/100 | 4.2 | 35 test files exist but CI doesn't run them |
| CI/CD & DevOps | 10% | 30/100 | 3.0 | CI = typecheck only. No test/lint/build in pipeline |
| Performance & Scalability | 10% | 50/100 | 5.0 | Adequate for current scale, no profiling or caching |
| API Design & Documentation | 10% | 62/100 | 6.2 | OpenAPI spec, versioned API, Swagger UI |
| Frontend UX & Accessibility | 8% | 55/100 | 4.4 | Skip-to-content, error boundary, but limited a11y |
| Error Handling & Observability | 7% | 65/100 | 4.55 | Structured JSON logging, Sentry integration, request IDs |
| Data Integrity & Compliance | 5% | 70/100 | 3.5 | Multi-tenant RLS prep, audit trails, integrity hashes |
| Documentation & Onboarding | 5% | 60/100 | 3.0 | OPS-GUIDE, SECURITY-AUDIT exist; no architecture docs |
| Dependency Management | 5% | 55/100 | 2.75 | Clean deps, but 10 known vulns (dev-only), no lockfile audit in CI |
| **TOTAL** | **100%** | | **57.6 ≈ 58/100** | |

---

### Category Deep Dives

#### 1. Code Quality & Architecture (68/100)

**What exists:** Clean monorepo with `src/backend` (Express + PostgreSQL) and `src/frontend` (Next.js 15 + React 19 + Tailwind). Repository pattern (`src/backend/repositories/` — 12 repos), service layer (`src/backend/services/` — 60+ services), route layer (72 route files). TypeScript throughout with strict-ish config.

**What's good:** The layered architecture (routes → services → repositories → db) is textbook correct. The `db.ts` module provides a clean abstraction with tenant-scoping helpers (`withTenant`, `queryWithTenant`, `executeWithTenant`). Parameterized queries everywhere — no raw string concatenation. The server.ts, while long (~350 lines), is well-organized with clear sections.

**What's weak:** 72 route files and 60+ services for a single-developer project suggests feature sprawl. Some modules are likely thin wrappers. No shared validation library visible (each route likely validates inline). The `server.ts` has inline schema creation (`ensureAnalyticsEventsSchema`, `ensureSettingsSchema`) that should be migrations.

**Score justification:** Good patterns, real separation of concerns. Docked for sprawl and the inline schema anti-pattern. A Google engineer would approve the architecture but question whether 72 endpoints are all tested.

**Top fixes:** (1) Move inline schema creation into migration files. (2) Add a shared request validation layer (zod or joi) to reduce per-route boilerplate.

---

#### 2. Security Posture (72/100)

**What exists:** `security.ts` implements: security headers (HSTS with preload, X-Frame-Options DENY, CSP, Permissions-Policy, COOP), three-tier rate limiting (API 500/15min, auth 50/15min, export 10/min with DB-backed store for production), CSRF origin validation, input sanitization with prototype pollution defense, filename sanitization. Auth uses httpOnly/secure/SameSite=lax cookies. JWT with 32-char minimum secret enforcement at startup. bcrypt with cost factor 12. Webhook SSRF guard exists. Demo guard middleware.

**What's good:** This is genuinely impressive for a 10-week project. The `SECURITY-AUDIT.md` shows a real security review was done and findings were fixed. Rate limiting falls back from DB to in-memory gracefully. CSRF protection validates origin against allowlist. The `shouldBootstrapAdmin` function separates dev/prod admin behavior. `trust proxy` is only enabled in production. CSP is comprehensive (though requires unsafe-inline/unsafe-eval for Next.js).

**What's weak:** CSP needs unsafe-inline + unsafe-eval (Next.js limitation — nonce-based is the fix). Rate limiting uses IP-based keys, which means shared IPs (corporate NAT) could trigger false positives. No WAF or bot detection. No request signing for webhook deliveries verification. 10 dependency vulnerabilities (all dev-only, but still flagged in audits).

**Score justification:** Would pass a basic pentest. The security-audit document and implemented fixes show security-aware development. Docked for CSP gaps and lack of rate limit bypass protection. A Stripe engineer would say "solid foundation, needs hardening for PCI/SOC2."

**Top fixes:** (1) Implement nonce-based CSP (requires Next.js middleware). (2) Add authenticated rate limiting (per-user, not just per-IP) to prevent abuse from authenticated users.

---

#### 3. Test Coverage (42/100)

**What exists:** 35 test files using Vitest. Coverage includes: auth (auth.test.ts, auth-extended.test.ts, auth-stress.test.ts), security (security.test.ts, security-config.test.ts, multi-tenant-security.test.ts), services (audit-trail, screening, integrity, readiness, lei, import, csv-import), compliance (compliance-report, compliance-score), data layer (repositories, db-context, transaction-helper), validation (validator, xsd-validation, validation-failures), API (public-api, public-api-v2, happy-path, demo-flow.spec.ts).

**What's good:** Tests cover critical paths — auth, security, multi-tenant isolation, compliance logic. The happy-path and demo-flow tests suggest integration-level coverage. XSD validation tests are important for regulatory correctness. Coverage config targets 80% with realistic starting point of 60%.

**What's weak:** 35 tests for 72 routes means ~50% route coverage at best. No frontend tests at all (no jest/vitest/testing-library for React components). **CI does not run tests** — the GitHub Actions workflow only runs `tsc --noEmit`. Tests could be broken right now and nobody would know. No test database provisioning in CI.

**Score justification:** Tests exist and cover important areas, but they're effectively decoration if CI doesn't run them. A broken test that nobody runs is the same as no test.

**Top fixes:** (1) Add `npm test` to CI pipeline — this alone would move the score +15 points. (2) Set up a test database in CI (PostgreSQL service container).

---

#### 4. CI/CD & DevOps (30/100)

**What exists:** `.github/workflows/ci.yml` runs on push/PR with a single job: typecheck (`tsc --noEmit` on frontend only). Deployment is Railway auto-deploy on push to main. OPS-GUIDE documents deployment, local setup, and database backup scripts. Dependabot configured for weekly dependency PRs. Keep-alive pings prevent Railway cold starts.

**What's good:** Railway auto-deploy is simple and works. The keep-alive ping is smart for Railway's architecture. Backup scripts with auto-rotation (7 backups) exist. The `quality:check` npm script exists locally (typecheck + tests).

**What's weak:** CI only runs frontend typecheck. No backend typecheck, no tests, no lint, no build verification. There's no staging environment. No deploy previews for PRs. No rollback procedure documented beyond "git revert." No health check verification post-deploy. The `quality:check` script exists but isn't wired into CI.

**Score justification:** This is the weakest category. Deploying to production on every push to main with only a frontend typecheck is a risk. The infrastructure (Railway) is fine for the stage, but the pipeline is dangerously thin.

**Top fixes:** (1) Expand CI to run: backend typecheck, `npm test`, `npm run build`. Takes ~30 minutes to set up, adds massive safety. (2) Add a post-deploy health check (curl the /api/health/ready endpoint after Railway deploys).

---

#### 5. Performance & Scalability (50/100)

**What exists:** PostgreSQL connection pooling (configurable max 20, with idle timeout and connection timeout). Request logging tracks duration (`durationMs`). Next.js standalone output for smaller production bundles. Bundle analyzer configured. JSON body limit set to 1MB. Input string length capped at 10,240 chars.

**What's good:** Connection pooling is properly configured with sensible defaults. The standalone output is correct for containerized deployment. Rate limiting provides basic protection against abuse. The keep-alive pings prevent cold start latency.

**What's weak:** No application-level caching (Redis or in-memory). No query optimization evidence (no indexes beyond what migrations create). No pagination enforcement on list endpoints. No response compression middleware. No CDN for static assets. No database query logging or slow query tracking. The sanctions auto-refresh runs in-process (should be a background job).

**Score justification:** Adequate for a demo with 10 users. Would struggle with 100+ concurrent users without caching. Normal for stage — premature optimization is the real risk here.

**Top fixes:** (1) Add compression middleware (2 lines, meaningful latency improvement). (2) Add Redis caching for expensive endpoints (sanctions data, compliance scores) when user count justifies it.

---

#### 6. API Design & Documentation (62/100)

**What exists:** Versioned API (`/api/v1/`), public API router with separate auth (`/api/v1/public/`), auto-generated OpenAPI 3.0 spec via `docs-routes.ts`, legacy Swagger UI available, API key management system (create, revoke, scopes, prefix tracking), API envelope middleware, usage tracking middleware, `X-API-Version` header on all responses.

**What's good:** The API versioning strategy is sound (v1 namespace, version header). API key system is complete: hashed storage, scope-based permissions, last-used tracking, revocation. The dual public/private API architecture shows product thinking. The `/api/health/ready` deep health check with sanctions freshness is production-grade.

**What's weak:** No rate limit documentation for API consumers. No API changelog. No SDK or client library. Error response format isn't documented (though AppError class suggests consistency). No webhook payload documentation.

**Score justification:** Above average for stage. The API key system and versioning show this was built with external consumers in mind. Docked for lack of consumer-facing docs.

**Top fixes:** (1) Add API error response documentation to the OpenAPI spec. (2) Write a one-page API quickstart guide for potential integration partners.

---

#### 7. Frontend UX & Accessibility (55/100)

**What exists:** Next.js 15 with React 19, Tailwind CSS, custom fonts (Sora + JetBrains Mono with `display: swap`). Skip-to-content link, ErrorBoundary component, ToastProvider, CookieConsent, Analytics component. Theme switching (dark default, light via localStorage). OpenGraph + Twitter card metadata. Structured data (JSON-LD). 37 components.

**What's good:** The skip-to-content link shows accessibility awareness. Font loading with `display: swap` prevents FOIT. The ErrorBoundary prevents white-screen crashes. Metadata is comprehensive (OG, Twitter, JSON-LD, manifest.json, favicons). The theme persistence via localStorage with FOUC prevention script is a nice touch.

**What's weak:** Only 37 components for a full dashboard app suggests some components are doing too much. No visible ARIA attributes beyond the skip link. No keyboard navigation testing evidence. No Lighthouse CI or accessibility audits. `lang="de"` hardcoded but alternates suggest EN/DE support — potential mismatch. `unsafe-inline` script in layout for theme detection.

**Score justification:** Foundation is there but accessibility testing is absent. The metadata and SEO work is thorough. A WCAG audit would likely find issues.

**Top fixes:** (1) Run Lighthouse CI and fix critical accessibility findings. (2) Add `aria-label` and `role` attributes to interactive components systematically.

---

#### 8. Error Handling & Observability (65/100)

**What exists:** Structured JSON logger (`lib/logger.ts`) with levels, timestamps, and context (requestId, userId, tenantId, method, path, statusCode, durationMs). Sentry integration (`error-tracking.ts`) with lazy init. Request ID middleware (generates UUID, sets X-Request-Id header). Error handler middleware maps PostgreSQL error codes to user-friendly responses. Error tracker middleware counts errors by path. `AppError` class for typed errors. Uncaught exception and unhandled rejection handlers. Graceful shutdown on SIGINT/SIGTERM.

**What's good:** The structured logger is production-ready — JSON format, context metadata, configurable levels. Sentry integration provides real crash reporting. The PostgreSQL error code mapping (23505→409, 23503→400, etc.) prevents DB internals from leaking. Request ID propagation enables distributed tracing. The error counts endpoint (`/api/health/errors`) enables monitoring without external tools.

**What's weak:** No metrics collection (Prometheus, StatsD). No alerting rules. No distributed tracing (OpenTelemetry). Logger writes to stdout only — no log shipping config documented. No performance budgets or SLO definitions. Health check only verifies DB and sanctions freshness — doesn't check API key table, migrations, etc.

**Score justification:** Strong foundation for a single-service app. The structured logging and Sentry setup would pass a basic observability review. Missing metrics and alerting are expected at this stage.

**Top fixes:** (1) Add basic uptime monitoring (UptimeRobot or similar — free tier). (2) Set up Sentry alerts for error rate spikes.

---

#### 9. Data Integrity & Compliance (70/100)

**What exists:** Multi-tenant architecture with RLS preparation (policies exist, currently disabled with `NO FORCE` for single-tenant MVP). Tenant-scoped queries throughout (`withTenant`, `queryWithTenant`, `executeWithTenant`). Tenant ID validated as UUID format to prevent SQL injection in `SET LOCAL`. 73 migration files. Integrity service with cryptographic hashing. Audit trail service. Evidence bundle generation. Annex IV XML with XSD validation. Decision records for compliance decisions. GDPR endpoints exist (`gdpr-endpoints.test.ts`).

**What's good:** The multi-tenant preparation is architecturally sound — the `withTenantContext` function correctly uses `SET LOCAL` scoped to transactions for RLS, and validates UUID format. 73 migrations show disciplined schema evolution. The integrity hashing and evidence bundles are differentiating features for a compliance product. XSD validation for Annex IV is critical for regulatory acceptance.

**What's weak:** RLS is disabled (`NO FORCE`) — a multi-tenant security bug in application code would expose cross-tenant data. No database-level encryption at rest documentation. No data retention policies implemented. No PII audit beyond the pii-stripper service.

**Score justification:** The compliance-specific features (integrity hashing, evidence bundles, XSD validation, audit trails) are exactly what this product needs. The RLS disabled decision is documented and appropriate for single-tenant MVP.

**Top fixes:** (1) Document the data retention policy (even if it's "we keep everything"). (2) Enable RLS before onboarding a second tenant.

---

#### 10. Documentation & Onboarding (60/100)

**What exists:** `OPS-GUIDE.md` covers deployment, local setup, database backups. `SECURITY-AUDIT.md` documents security review findings and fixes. `package.json` has comprehensive scripts with descriptive names. `.env.example` presumably exists (referenced in OPS-GUIDE). OpenAPI docs auto-generated. README presumably exists.

**What's good:** The OPS-GUIDE is practical — it tells you how to deploy, run locally, and backup the database. The SECURITY-AUDIT is unusually thorough for a startup. Script naming is self-documenting (`seed:demo`, `seed:showcase`, `quality:check`, `clean:frontend`).

**What's weak:** No architecture decision records (ADRs). No data model documentation. No component storybook. No API integration guide. No runbook for incident response. The OPS-GUIDE is brief — no troubleshooting section, no "what to do when Railway is down."

**Score justification:** Documentation exists where it matters most (ops, security). Lacks the depth that would help onboard a second developer quickly.

**Top fixes:** (1) Write a 1-page architecture overview with a system diagram. (2) Add a troubleshooting section to OPS-GUIDE covering common failures (DB connection, Railway deploys, port conflicts).

---

#### 11. Dependency Management (55/100)

**What exists:** Lean production dependencies (14 packages — express, pg, bcrypt, jsonwebtoken, cors, pdfkit, fast-xml-parser, anthropic SDK, MCP SDK, swagger-ui, multer, dotenv, yaml). Node >=20 engine requirement. Dependabot configured for weekly PRs. Frontend uses Next.js 15 + React 19 (latest).

**What's good:** Production dependencies are minimal and well-chosen. No framework bloat — no ORM (raw SQL with pg), no auth library (custom JWT). The dependency choices show intentional decisions. React 19 + Next.js 15 are cutting-edge but stable.

**What's weak:** 10 known vulnerabilities (6 high, 4 moderate — all in dev dependencies: eslint/vitest toolchain). No `npm audit` in CI. No lockfile integrity check. `@anthropic-ai/sdk` and `@modelcontextprotocol/sdk` are early-stage SDKs that may have breaking changes. No dependency license audit.

**Score justification:** Clean, intentional dependency choices. Docked for missing CI audit and known vulnerabilities (even if dev-only, they show up in investor due diligence scans).

**Top fixes:** (1) Add `npm audit --production` to CI (catches real vulnerabilities, ignores dev-only). (2) Fix the minimatch vulnerability in frontend (`npm audit fix`).

---

### Strategic Technical Roadmap

| Priority | Action | Impact | Effort | Score Impact |
|----------|--------|--------|--------|-------------|
| P0 | Expand CI: add `npm test`, backend typecheck, `npm run build`, `npm audit --production` | Catches bugs before production, investor confidence | 2-4 hours | +8 points |
| P0 | Add post-deploy health check verification | Prevents deploying broken builds silently | 1 hour | +2 points |
| P1 | Write 1-page architecture overview + system diagram | Investor due diligence, onboarding speed | 2 hours | +3 points |
| P1 | Add compression middleware + response caching headers | Measurable performance improvement | 1 hour | +2 points |
| P1 | Run Lighthouse CI, fix critical a11y issues | EU accessibility requirements (EAA 2025) | 4 hours | +3 points |
| P2 | Set up uptime monitoring (UptimeRobot free tier) | Catch outages before customers do | 30 min | +2 points |
| P2 | Nonce-based CSP via Next.js middleware | Eliminates unsafe-inline/unsafe-eval | 4-6 hours | +2 points |
| P2 | Add frontend component tests (5-10 critical flows) | Prevents UI regressions | 1-2 days | +4 points |
| P3 | Add shared request validation layer (zod schemas) | Reduces per-route boilerplate, catches bad input | 2-3 days | +3 points |
| P3 | Document API integration guide for partners | Sales enablement, partnership readiness | 4 hours | +2 points |

**Total achievable improvement: ~31 points → 89/100** (with full roadmap execution)

**Quick wins (P0 items): +10 points → 68/100 in one afternoon**

---

### What Would Impress a Technical Due Diligence

**What VCs / technical investors look for:**

1. **CI/CD pipeline that prevents bad deploys** — Caelith has typecheck only. Need: tests + build + audit in CI.
2. **Security posture documentation** — Caelith has this (SECURITY-AUDIT.md). Genuinely above average.
3. **Test coverage metrics** — Tests exist but coverage % is unknown because CI doesn't run them. Need: coverage report in CI.
4. **Architecture that scales** — Multi-tenant prep with RLS, clean service layer, PostgreSQL. Solid.
5. **Observability** — Structured logging + Sentry. Acceptable.
6. **Bus factor mitigation** — Single developer, no architecture docs, no onboarding guide. Risk.
7. **Compliance domain expertise encoded in code** — 247 rules, XSD validation, Annex IV generation, sanctions screening, LEI verification. This is the moat.
8. **Dependency hygiene** — Lean and intentional. Good.

**Where Caelith stands vs the bar:**
- Security: ✅ Above average
- Domain depth: ✅ Exceptional for stage
- Architecture: ✅ Sound
- CI/CD: ❌ Below minimum bar
- Testing: ⚠️ Exists but unverified
- Documentation: ⚠️ Operational docs good, architectural docs missing
- Bus factor: ❌ Critical risk

---

### Honest Assessment: Is This Codebase Investor-Ready?

**Short answer: Not yet, but it's 4-6 hours of work away from being defensible.**

The codebase is remarkably strong for a 10-week solo project. The domain depth — 72 API route files covering AIFMD II compliance, Annex IV XML generation with XSD validation, sanctions screening, investor eligibility, audit trails with cryptographic integrity — is the kind of thing that takes competitors months to replicate. The security posture, with a documented audit and implemented fixes, is better than most Series A startups I've reviewed.

**But here's what a technical investor would flag in 5 minutes:**

1. "Your CI pipeline only runs typecheck. How do you know your 35 test files pass?" — This is an easy kill shot. Fix it today.
2. "What's your bus factor?" — One developer, no architecture docs. This isn't unusual for pre-seed, but it needs to be acknowledged and mitigated with documentation.
3. "Show me your test coverage report." — You can't, because CI doesn't generate one. Wire up vitest coverage in CI and the number will probably be 40-60% on backend, which is fine for stage.

**What Julian should say in VC conversations:**

"We have 80,000 lines of TypeScript with 35 test suites, comprehensive security hardening backed by a documented audit, multi-tenant architecture ready for scale, and domain-specific features (XSD-validated Annex IV, sanctions screening, cryptographic audit trails) that encode 10 weeks of regulatory research. Our CI runs typecheck, tests, and security audits on every push." — That last sentence needs to be true first.

**The honest truth:** This is a 58/100 codebase that can be a 68/100 codebase in one afternoon. The foundation is strong. The gaps are mechanical, not architectural. Fix the CI pipeline, write an architecture overview, and this codebase tells a compelling technical story.

The code quality reflects a developer who thinks about security, maintainability, and compliance — exactly the traits that matter for a regtech product. The question isn't whether the code is good (it is). The question is whether the safety nets are in place to keep it good as the team scales. Right now, they're not. But they can be.
