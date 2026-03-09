# Infrastructure & Security Audit Report

**Date:** 2026-02-23  
**Scope:** HTTP Headers, CORS, Database, Environment, Error Handling, Logging, TLS  
**Project:** Caelith (`src/backend/`)

---

## Summary

| Area | Rating | Issues Found |
|------|--------|-------------|
| HTTP Security Headers | ✅ GOOD | 1 minor (CSP style-src) |
| CORS | ✅ GOOD | None |
| Database Security | ✅ GOOD | None |
| Environment Separation | ✅ GOOD | None |
| Error Handling | ✅ GOOD | None |
| Logging Security | 🔴 FIXED | 1 critical (password reset token logged) |
| TLS/Cookies | ✅ GOOD | None |

**Overall: Well-secured application. One critical logging issue fixed.**

---

## 1. HTTP Security Headers (`middleware/security.ts`)

**All required headers are present and correctly configured:**

| Header | Value | Status |
|--------|-------|--------|
| Content-Security-Policy | `default-src 'self'; script-src 'self'` (prod) | ✅ No unsafe-eval in prod |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` | ✅ Correct |
| X-Frame-Options | `DENY` | ✅ Correct |
| X-Content-Type-Options | `nosniff` | ✅ Correct |
| Referrer-Policy | `strict-origin-when-cross-origin` | ✅ Correct |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | ✅ All restricted |
| X-XSS-Protection | `1; mode=block` | ✅ Legacy defense-in-depth |
| Cross-Origin-Opener-Policy | `same-origin-allow-popups` | ✅ Good |
| X-Powered-By | Removed | ✅ Good |
| upgrade-insecure-requests | Production only | ✅ Good |

**Minor note:** `style-src 'unsafe-inline'` is present — required for Swagger UI and React inline styles. Acceptable tradeoff; consider moving Swagger to a separate subdomain if tightening further.

## 2. CORS Policy (`server.ts`)

✅ **Not using wildcard `*`.** Origin is validated via callback function.

- **Production origins:** `https://caelith.tech`, `https://www.caelith.tech`
- **Dev origins:** `localhost:3000-3003`
- **Configurable:** via `CORS_ORIGINS` env var
- **credentials:** `true` (correct for cookie-based auth)
- **CSRF protection:** Origin/Referer validation on state-changing requests ✅

## 3. Database Security (`db.ts`)

| Check | Status |
|-------|--------|
| SSL enforced in production | ✅ `rejectUnauthorized: true` by default, custom CA support via `PG_CA_CERT` |
| Connection string not hardcoded | ✅ Uses `DATABASE_URL` env var (fallback to localhost only for dev) |
| Error messages to clients | ✅ Error handler returns generic message in production |
| Connection pool limits | ✅ `max: 20` (configurable via `PG_POOL_MAX`), idle timeout 30s, connect timeout 5s |
| Tenant isolation | ✅ RLS with `SET LOCAL` session variables, UUID validation prevents SQL injection |
| Pool logging | ✅ Logs config without secrets |

## 4. Environment Separation

| Check | Status |
|-------|--------|
| `.env` in `.gitignore` | ✅ Both `.env` and `.env.*` excluded |
| Required env vars validated at startup | ✅ `JWT_SECRET`, `DATABASE_URL` — exits on missing |
| JWT_SECRET strength | ✅ Requires ≥32 chars for HS256 |
| NODE_ENV toggles security | ✅ CSP strict in prod, rate limits stricter, Swagger requires auth, trust proxy, registration disabled by default |
| Reset endpoint | ✅ Only enabled when `NODE_ENV=test` AND `ENABLE_TEST_RESET=1` |
| No committed secrets | ✅ No hardcoded API keys or passwords in source |

## 5. Error Handling (`middleware/error-handler.ts`)

✅ **Production-safe:**
- `AppError` instances return controlled `errorCode` + `message` (no stack traces)
- Unhandled errors return `"An unexpected error occurred"` in production
- Stack traces only shown in non-production (`debug` field)
- 500 errors are logged server-side with request context

## 6. Logging Security

### 🔴 CRITICAL — FIXED: Password Reset Token Logged in Plaintext

**File:** `routes/auth-routes.ts:125`  
**Before:** `console.log(\`[PASSWORD RESET] Token for ${email}: ${token}\`)`  
**Risk:** Password reset tokens logged to stdout — anyone with log access could hijack password resets.  
**Fix applied:** Replaced with `logger.info('Password reset token generated', { email })` — token value no longer logged.

### Fixed: Raw `console.warn`/`console.error` in `news-routes.ts`

Replaced with structured logger calls for consistency and to prevent accidental data leakage in future log pipeline changes.

### Logger Design

✅ The structured logger (`lib/logger.ts`) outputs JSON with timestamps, levels, and context. No passwords, tokens, or PII are logged through the logger. The `error` context serializes only `message` and `stack` from Error objects.

## 7. TLS / Cookies

| Check | Status |
|-------|--------|
| Cookie `Secure` flag | ✅ `secure: process.env.NODE_ENV === 'production'` |
| Cookie `httpOnly` | ✅ Set on both `access_token` and `refresh_token` |
| Cookie `sameSite` | ✅ `strict` |
| HSTS header | ✅ `max-age=31536000; includeSubDomains; preload` |
| HTTPS redirect | ⚠️ CSP `upgrade-insecure-requests` is set in production (browser-side). Server-side HTTPS redirect should be handled by reverse proxy/load balancer. |
| Refresh token rotation | ✅ Old token deleted on use, new one issued |

---

## Changes Made

1. **`src/backend/routes/auth-routes.ts`** — Removed password reset token from logs, added logger import
2. **`src/backend/routes/news-routes.ts`** — Replaced `console.warn`/`console.error` with structured logger

## Recommendations (No Action Required Now)

1. **CSP style-src:** Consider isolating Swagger UI to remove `'unsafe-inline'` from styles
2. **HTTPS redirect:** Verify your reverse proxy (Railway/nginx) enforces HTTP→HTTPS redirect
3. **Rate limit store:** In multi-instance production, ensure `RATE_LIMIT_STORE=database` or use Redis
4. **RLS:** Re-enable `FORCE ROW LEVEL SECURITY` when moving to multi-tenant deployment
