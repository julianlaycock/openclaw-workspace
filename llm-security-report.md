# LLM/Copilot Security Hardening Report

**Date:** 2026-02-23  
**Scope:** `src/backend/services/copilot-service.ts`, `copilot-routes.ts`, `pii-stripper.ts`, `text-sanitizer.ts`, `frontend/src/components/copilot.tsx`

---

## 1. Prompt Injection

### Findings

| Issue | Severity | Status |
|---|---|---|
| **Context fields injected unsanitized into system prompt** — `currentPage`, `selectedEntityId`, `selectedEntityType` were embedded directly. An attacker could craft a malicious `currentPage` value like `"/investors\n\nIGNORE ALL PREVIOUS INSTRUCTIONS..."` to manipulate the system prompt. | **HIGH** | **FIXED** |
| **No system prompt hardening** — The system prompt lacked explicit refusal instructions for jailbreak attempts, prompt leaking, or write-SQL generation. | **MEDIUM** | **FIXED** |
| **No backend message length limit** — Frontend enforces 2000 chars but backend accepted unlimited input, enabling large prompt injection payloads. | **MEDIUM** | **FIXED** |
| User input sanitized via `sanitizeMessage()` (control chars stripped) and `stripPII()` before reaching the LLM. | — | Already OK |

### Fixes Applied
- **Added `sanitizeContext()`**: Validates `currentPage` against `[a-zA-Z0-9/_-]` pattern (max 100 chars), `selectedEntityId` via UUID regex extraction, `selectedEntityType` via allowlist.
- **Added security rules block** to system prompt: explicit non-negotiable instructions to refuse prompt leaking, write SQL, cross-tenant queries, credential column access, and instruction override attempts.
- **Added `MAX_MESSAGE_LENGTH = 2000`** enforcement in `sanitizeMessage()` server-side.

---

## 2. SQL Execution Sandboxing

### Findings

| Check | Status |
|---|---|
| Only SELECT allowed (INSERT/UPDATE/DELETE/DROP/ALTER blocked) | ✅ Already enforced via `FORBIDDEN_PATTERNS` + `startsWith('SELECT')` |
| Statement timeout | ✅ `SET LOCAL statement_timeout = '5000'` (5s) |
| Read-only transaction | ✅ `BEGIN READ ONLY` |
| Result size limit | ⚠️ **PARTIALLY FIXED** — `MAX_ROWS_RETURNED = 50` enforced, but LLM-generated `LIMIT 10000` would bypass it |

### Fixes Applied
- **LIMIT cap enforcement**: If the LLM generates a `LIMIT` > 50, it's now capped to 50 server-side. Previously only added `LIMIT 50` when no LIMIT clause was present.

---

## 3. Data Exfiltration via Table Access

### Findings

| Issue | Severity | Status |
|---|---|---|
| **Blocklist approach** — Only `users`, `refresh_tokens`, `login_attempts`, `migrations` were blocked. Any other system table (e.g., `pg_authid`, custom tables) was accessible. | **HIGH** | **FIXED** |

### Fixes Applied
- **Replaced blocklist with explicit allowlist** (`ALLOWED_TABLES`): Only 16 known business tables are permitted. New `validateTableAllowlist()` function parses FROM/JOIN clauses and rejects queries referencing any table not in the allowlist.
- Allowlist: `fund_structures`, `assets`, `investors`, `holdings`, `transfers`, `decision_records`, `composite_rules`, `rules`, `eligibility_criteria`, `onboarding_records`, `investor_documents`, `events`, `regulatory_documents`, `fund_lmts`, `fund_delegations`, `aifmd_readiness`.

---

## 4. Output Sanitization (XSS)

### Findings

| Check | Status |
|---|---|
| Frontend renders `msg.content` via React JSX `{msg.content}` | ✅ **Safe** — React auto-escapes all interpolated strings |
| No `dangerouslySetInnerHTML` or markdown rendering library used | ✅ Confirmed |
| No stored XSS risk — copilot responses are ephemeral (client-side state only, not persisted to DB) | ✅ |

**No changes needed.** If markdown rendering is added in the future, use a sanitizing library (e.g., `DOMPurify` + `react-markdown` with `rehype-sanitize`).

---

## 5. PII in LLM Context

### Findings

| Check | Status |
|---|---|
| User messages stripped via `stripPII()` before LLM call | ✅ Emails, phones, IBANs, LEIs, tax IDs, UUIDs replaced with placeholders |
| DB query results stripped via `stripPIIFromToolResult()` | ✅ Names pseudonymized, emails/tax IDs/addresses redacted, JSONB fields scrubbed |
| Regulatory search results (RAG) | ✅ No PII — contains only regulatory text |

**PII handling is solid.** Note: `stripPII()` replaces UUIDs with `[ID]`, which means entity IDs from user messages are anonymized. The LLM gets entity context via the (now-sanitized) `context.selectedEntityId` in the system prompt instead.

---

## Summary of Changes

| File | Changes |
|---|---|
| `src/backend/services/copilot-service.ts` | Added table allowlist + validation, system prompt hardening, context sanitization, backend message length limit, LIMIT cap enforcement |

All changes are committed locally (not pushed).
