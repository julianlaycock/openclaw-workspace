# Remediation Register Cross-Reference Assessment
**Date:** February 25, 2026
**Assessor:** Mate (AI Co-pilot)

## Summary

| Status | Count |
|--------|-------|
| ❌ Confirmed — needs fix | 10 |
| ⚠️ Partially addressed | 3 |
| ✅ Already resolved | 2 |

---

## Item-by-Item Assessment

### LEG-001 (P0) — Tenant Isolation Claims vs Reality
**Status: ❌ CONFIRMED — needs fix**
- `DEFAULT_TENANT_ID` fallback pattern is pervasive: **129 occurrences** across the backend
- `db.ts` lines 89, 199, 220, 241: `const scopedTenantId = tenantId || DEFAULT_TENANT_ID` — this means ANY request without a tenant falls back to the default tenant, which is NOT strict isolation
- The audit is correct: we claim tenant isolation but the runtime silently falls back to a shared default tenant
- **Effort:** Medium-High (129 touchpoints, but systematic — replace fallback with throw)

### LEG-002 (P0) — DEFAULT_TENANT_ID Fallbacks
**Status: ❌ CONFIRMED — needs fix**
- `db.ts:16` defines `DEFAULT_TENANT_ID = '00000000-0000-0000-0000-000000000099'`
- Used in `queryWithTenant()`, `executeWithTenant()`, and `transactionWithTenant()` as silent fallbacks
- Also hardcoded in **every repository file** (asset, decision-record, eligibility-criteria, event, transfer, etc.)
- Transfer repository (line 29, 105): uses `DEFAULT_TENANT_ID` directly instead of propagating from auth
- **Note:** For our current SINGLE-TENANT demo, this works. But it's a legal liability if we ever claim multi-tenant or if a second org is onboarded.

### LEG-003 (P0) — Transfer Queries Not Tenant-Scoped
**Status: ❌ CONFIRMED — needs fix**
- `transfer-repository.ts:29`: INSERT uses `DEFAULT_TENANT_ID` hardcoded, not from auth context
- `transfer-repository.ts:105`: Query filter uses `DEFAULT_TENANT_ID` directly
- Pending/approve/reject flows inherit this — no tenant param from the caller
- **Risk:** In multi-tenant, Tenant A could see/approve Tenant B's transfers

### LEG-004 (P0) — Event Misattribution
**Status: ❌ CONFIRMED — needs fix**
- `event-repository.ts:46`: `createEvent()` uses `DEFAULT_TENANT_ID` instead of the provided tenant
- The function signature accepts `CreateEventInput` but ignores any tenant_id on it
- All audit events get attributed to the default tenant
- **Risk:** Audit trail is useless for multi-tenant compliance

### LEG-005 (P0) — Erasure vs Sealed Decision Records
**Status: ⚠️ PARTIALLY ADDRESSED**
- Erasure flow EXISTS at `investor-routes.ts:208-271`
- It DOES update `decision_records` (line 262) — strips PII from `input_snapshot`
- BUT: the DB has an immutability trigger on `decision_records` (migration 029). The UPDATE may be blocked by the trigger!
- The erasure is NOT atomic (no transaction wrapping the 6 UPDATE/DELETE statements)
- Privacy page doesn't mention legal-retention carveout for sealed records
- **Fix needed:** Test if trigger blocks erasure, wrap in transaction, update privacy text

### LEG-006 (P0) — Erasure Not Atomic
**Status: ❌ CONFIRMED — needs fix**
- Erasure flow (`investor-routes.ts:213-264`) runs 6 separate queries with NO transaction
- If query #3 fails, queries #1-2 are already committed → partial anonymization
- **Fix:** Wrap in `transactionWithTenant()` or manual `BEGIN/COMMIT/ROLLBACK`

### LEG-007 (P0) — Sanctions Fail-Open
**Status: ❌ CONFIRMED — needs fix**
- `sanctions-data-service.ts:264-265, 293-294, 305-306, 311-312`: All catch blocks just `logger.warn()` and continue
- If EU/UN sanctions lists fail to download, the system continues with cached (possibly stale) data
- If NO data exists at all, screening would return zero matches = effectively "clear"
- There is NO `unavailable` or `blocked` status — no evidence the system blocks onboarding when screening fails
- **This is the most legally dangerous item** — AML/sanctions "fail-open" means you're rubber-stamping potentially sanctioned entities

### LEG-008 (P1) — Audit Package Tenant Scope
**Status: ⚠️ NEEDS VERIFICATION**
- Likely affected given the pervasive DEFAULT_TENANT_ID pattern
- Need to trace the audit package generation code specifically

### LEG-009 (P1) — Auth API Docs Mismatch
**Status: ⚠️ PARTIALLY ADDRESSED**
- Auth uses cookies (`access_token`, `refresh_token` via httpOnly cookies)
- OpenAPI docs at `/api/docs` — need to verify if they correctly document cookie-based auth vs token-based
- API docs were recently made public (commit `32312574`)

### LEG-010 (P1) — Privacy Link + Cookie Name Discrepancies
**Status: ❌ CONFIRMED — needs fix**
- Privacy page lists cookies: `caelith_session`, `caelith_theme`
- Actual cookie names: `access_token`, `refresh_token`
- **Complete mismatch!** Privacy page documents cookies that don't exist, and omits cookies that do exist
- This is an easy fix but a clear Art. 12 transparency violation

### LEG-011 (P1) — Data Location Inconsistency
**Status: ❌ CONFIRMED — needs fix**
- Privacy page (line 63): "EU (Railway, Amsterdam)"
- Privacy page (line 76): "EU West, Amsterdam, Netherlands"
- We migrated to EU West Amsterdam on Feb 24 — so "Amsterdam" is correct now
- BUT: no mention of "Germany" or "Frankfurt" on privacy page — check if landing page says something different
- Landing page (`route.ts`): No Frankfurt/Amsterdam mentions found in search — may be clean
- DPA page: Only mentions Anthropic as sub-processor, missing Railway, OpenAI (if used)
- **Fix:** Harmonize to "EU West (Amsterdam, Netherlands)" everywhere

### LEG-012 (P1) — Legal Entity Naming Inconsistency
**Status: ❌ CONFIRMED — needs fix**
- Privacy page (line 20): "Julian Laycock / Caelith"
- Terms page (line 22): "Julian Laycock ('Provider')"
- DPA page (line 135): "Caelith GmbH i.G." (Gründung — company in formation)
- Three different legal identities across three pages!
- **Fix:** Pick one canonical name and use it everywhere. Since GmbH isn't registered yet, probably "Julian Laycock, trading as Caelith"

### LEG-013 (P1) — Sub-Processor List Incomplete
**Status: ❌ CONFIRMED — needs fix**
- DPA lists ONLY: Anthropic, Inc.
- Missing: Railway (hosting, has access to DB), OpenAI (if Copilot uses it), no mention of GLEIF API (LEI lookups send fund data externally)
- Privacy page mentions Anthropic and OpenAI but DPA only has Anthropic
- **Fix:** Add Railway, verify OpenAI usage, add GLEIF if applicable

### LEG-014 (P1) — Retention Policy vs Reality
**Status: ⚠️ NEEDS VERIFICATION**
- Need to check what the privacy policy says about retention periods vs actual DB behavior
- Railway containers restart = in-memory state lost, but DB persists

### LEG-015 (P2) — Consent Withdrawal
**Status: ❌ NOT IMPLEMENTED**
- No consent withdrawal endpoint or UI found in codebase
- Privacy page likely mentions the right but no mechanism to exercise it
- Lower priority (P2) but still a GDPR requirement

---

## Priority Ranking for Action

### Immediate (before any customer/demo)
1. **LEG-007** — Sanctions fail-open → MUST fix. Legal nightmare.
2. **LEG-010** — Cookie names wrong in privacy page → 5 min fix, obvious violation
3. **LEG-012** — Entity naming → 10 min fix across 3 pages

### This Week (by Mar 4)
4. **LEG-006** — Erasure atomicity → wrap in transaction
5. **LEG-005** — Test immutability trigger vs erasure, add legal carveout text
6. **LEG-011** — Data location harmonization
7. **LEG-013** — Sub-processor list completion

### Next Week (by Mar 11)
8. **LEG-001/002/003/004** — The DEFAULT_TENANT_ID cleanup is a BIG refactor (129 files). Since we're currently single-tenant, the LEGAL risk is lower but the TECHNICAL debt is real. Plan this as a focused sprint.

### Later (by Apr 1)
9. **LEG-015** — Consent withdrawal mechanism
