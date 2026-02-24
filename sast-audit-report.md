# Caelith SAST / Secrets / Supply Chain Audit Report

**Date:** 2026-02-23  
**Auditor:** Automated SAST scan (OpenClaw security subagent)  
**Scope:** `C:\Users\julia\.openclaw\sandboxes\caelith-project`

---

## Executive Summary

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 CRITICAL | 1 | Found — `.env` contains live API keys (not committed to git) |
| 🟠 HIGH | 2 | Found — npm vulnerabilities in Next.js; copilot SQL execution surface |
| 🟡 MEDIUM | 2 | Found — CI workflow fallback secrets; outdated eslint deps |
| 🟢 LOW | 0 | — |

**Overall Assessment:** The codebase has strong security practices. Parameterized queries are used consistently, no command injection, no XSS vectors, no prototype pollution in app code, no path traversal. The main risks are operational (secrets management) and dependency-level.

---

## 1. Secrets Scan

### 🔴 CRITICAL: Live API Keys in `.env` (NOT in git — mitigated)

**File:** `.env` (gitignored ✅)

| Secret | Value (redacted) |
|--------|------------------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-nWmP...` |
| `OPENAI_API_KEY` | `sk-proj-_mUT...` |
| `JWT_SECRET` | 128-char hex string |
| `ADMIN_PASSWORD` | `qD9O5OAFX-...` |
| `DATABASE_URL` | `postgresql://caelith:caelith@localhost:5432/caelith` |

**Risk:** `.env` is properly gitignored and `.env` was never committed to git history. `.claude/settings.local.json` also contains these keys but is gitignored. **No secrets found in git history.**

**Status:** ✅ Properly managed — `.gitignore` covers `.env`, `.env.*`, and `.claude/`

### 🟡 MEDIUM: CI Workflow Fallback Secrets

**File:** `.github/workflows/ci.yml`

The CI workflow uses `${{ secrets.CI_* }}` with hardcoded fallbacks:
- `POSTGRES_PASSWORD: 'caelith'`
- `JWT_SECRET: 'ci-test-secret-that-is-at-least-32-characters-long'`
- `ADMIN_PASSWORD: 'CiTestAdmin1!'`

**Risk:** Low — these are CI-only fallbacks for local/CI testing. Production should use GitHub Secrets.

**Recommendation:** Remove fallback values; require CI secrets to be configured.

---

## 2. SQL Injection Scan

### ✅ All Repository/Service Queries: SAFE

All SQL in `src/backend/repositories/` and `src/backend/services/` uses parameterized queries (`$1`, `$2`, etc.) via the `query()`, `execute()`, `queryWithTenant()`, and `executeWithTenant()` helpers. No raw string interpolation found in SQL.

**Dynamic SQL patterns found (all safe):**
- `composite-rules-service.ts:167` — Dynamic `UPDATE SET` with parameterized `$N` placeholders
- `webhook-service.ts:164` — Dynamic `UPDATE SET` with parameterized `$N` placeholders
- `audit-trail-service.ts:136-155` — Dynamic `WHERE` clause with parameterized `$N` placeholders
- `db.ts:178` — `SET LOCAL app.tenant_id = '${tenantId}'` — **UUID-validated** with strict regex before interpolation

### 🟠 HIGH: Copilot Service — LLM-Generated SQL Execution

**File:** `src/backend/services/copilot-service.ts:398` — `client.query(safeSql)`

The AI copilot generates SQL from user natural language and executes it. Defenses in place:
- ✅ `BEGIN READ ONLY` transaction
- ✅ `validateReadOnlySQL()` — blocks INSERT/UPDATE/DELETE/DDL
- ✅ `validateTableAllowlist()` — only allows 16 specific tables
- ✅ Forbidden patterns: `--`, `/*`, `;`, `pg_sleep`, `SET`, etc.
- ✅ `statement_timeout = 5s`
- ✅ Max 50 rows returned
- ✅ Tenant ID must be present in query

**Residual Risk:** Sophisticated prompt injection could potentially craft SQL that bypasses regex-based validation. The READ ONLY transaction is the strongest defense — even if validation is bypassed, writes are blocked at the DB level.

**Recommendation:** Consider using a PostgreSQL read-only database user for the copilot connection instead of relying solely on `BEGIN READ ONLY`.

---

## 3. Prototype Pollution

### ✅ CLEAN

No `Object.assign`, `lodash.merge`, `defaultsDeep`, or deep merging of `req.body` found in application source code (`src/backend/`, `src/frontend/src/`). All hits were in `node_modules/` (third-party libraries, not exploitable in this context).

---

## 4. Command Injection

### ✅ CLEAN

No `child_process`, `exec`, `execSync`, or `spawn` usage found in application source code. All hits were in `node_modules/@types/node/` type definitions only.

---

## 5. Path Traversal

### ✅ CLEAN

- `server.ts:260` — `readFileSync('./openapi.yml')` — hardcoded path, safe
- `server.ts:422` — `readFileSync(path.join(migrationsDir, file))` — `file` comes from `readdirSync`, not user input, safe
- File uploads use `multer.memoryStorage()` with 5MB limit, stored as BYTEA in PostgreSQL (no filesystem writes from user input)
- No `fs.readFile`/`writeFile` with user-controlled paths found

---

## 6. XSS / dangerouslySetInnerHTML

### ✅ CLEAN

No `dangerouslySetInnerHTML` usage found in any `.tsx` file under `src/frontend/src/`. React's default escaping applies to all rendered content.

---

## 7. npm Audit Results

### Root (`package.json`)

```
17 vulnerabilities (4 moderate, 13 high)
```

All are in **dev dependencies** (eslint ecosystem):
- `minimatch` ReDoS via `@humanwhocodes/config-array`, `glob`, `rimraf`, `flat-cache`
- `@typescript-eslint/typescript-estree` depends on vulnerable `minimatch`
- `eslint` ecosystem chain

**Risk:** LOW — dev-only dependencies, not shipped to production.

### Frontend (`src/frontend/package.json`)

```
19 high severity vulnerabilities
```

Key production vulnerabilities:
- **`next` 14.2.35**: 2 HIGH advisories
  - [GHSA-9g9p-9gw9-jx7f](https://github.com/advisories/GHSA-9g9p-9gw9-jx7f) — DoS via Image Optimizer `remotePatterns`
  - [GHSA-h25m-26qc-wcjf](https://github.com/advisories/GHSA-h25m-26qc-wcjf) — DoS via HTTP request deserialization (RSC)
- Fix: `npm audit fix --force` → `next@16.1.6` (breaking change)

**Risk:** HIGH for self-hosted deployments. The DoS vulnerabilities could allow attackers to crash the frontend server.

**Recommendation:** Upgrade `next` to `>=15.5.10` (or 16.x if feasible). Test for breaking changes.

---

## 8. Dependency Analysis

### Production Dependencies (Root)

| Package | Version | Status |
|---------|---------|--------|
| `@anthropic-ai/sdk` | ^0.74.0 | ✅ OK |
| `bcrypt` | 6.0.0 | ✅ OK |
| `cors` | ^2.8.5 | ✅ OK |
| `dotenv` | ^16.4.1 | ✅ OK |
| `express` | 4.22.1 | ✅ OK |
| `jsonwebtoken` | 9.0.3 | ✅ OK |
| `multer` | ^2.0.2 | ✅ OK |
| `pdfkit` | ^0.17.2 | ✅ OK |
| `pg` | 8.18.0 | ✅ OK |
| `swagger-ui-express` | ^5.0.1 | ✅ OK |
| `yaml` | ^2.8.2 | ✅ OK |

### Production Dependencies (Frontend)

| Package | Version | Status |
|---------|---------|--------|
| `next` | ^14.2.35 | 🟠 HIGH — 2 DoS vulnerabilities |
| `react` | ^18 | ✅ OK |
| `react-dom` | ^18 | ✅ OK |
| `recharts` | ^3.7.0 | ✅ OK |
| `jszip` | ^3.10.1 | ✅ OK |

### Dev Dependencies

| Package | Version | Status |
|---------|---------|--------|
| `eslint` | ^8.56.0 | 🟡 Outdated — v8 is deprecated, v9+ recommended |
| `@typescript-eslint/*` | ^6.19.0 | 🟡 Outdated — v8+ available |

No known supply chain compromises (no `event-stream`, `ua-parser-js`, `colors`, `faker` type incidents) in any dependency.

---

## Summary of Findings

| # | Finding | Severity | File(s) | Action Required |
|---|---------|----------|---------|-----------------|
| 1 | Live API keys in `.env` | 🔴 CRITICAL | `.env` | ✅ Already gitignored — rotate if exposed |
| 2 | Next.js DoS vulnerabilities | 🟠 HIGH | `src/frontend/package.json` | Upgrade `next` to >=15.5.10 |
| 3 | Copilot LLM-generated SQL | 🟠 HIGH | `copilot-service.ts` | Consider read-only DB user |
| 4 | CI fallback credentials | 🟡 MEDIUM | `.github/workflows/ci.yml` | Remove fallbacks |
| 5 | Outdated eslint (dev-only) | 🟡 MEDIUM | `package.json` | Upgrade when convenient |

---

## What's Done Well

- ✅ **Parameterized queries everywhere** — zero SQL injection in app code
- ✅ **No command injection surface** — no `child_process` usage
- ✅ **No XSS vectors** — no `dangerouslySetInnerHTML`
- ✅ **No prototype pollution** — clean app code
- ✅ **No path traversal** — file uploads stored in DB, not filesystem
- ✅ **Secrets properly gitignored** — `.env`, `.claude/` excluded from git
- ✅ **Strong copilot SQL defenses** — READ ONLY txn, table allowlist, pattern blocking
- ✅ **UUID validation on tenant ID** — prevents SQL injection in `SET LOCAL`
- ✅ **Rate limiting, CSRF protection, input sanitization** all present
- ✅ **JWT with short-lived access tokens + refresh token rotation**

---

*No CRITICAL findings requiring immediate code fixes were identified. All secrets are properly excluded from version control. The highest priority action item is upgrading Next.js to address DoS vulnerabilities.*
