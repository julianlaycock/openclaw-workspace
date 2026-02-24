# BOLA + Mass Assignment + Input Fuzzing Audit Report

**Date:** 2026-02-23  
**Auditor:** Security Engineer (automated)  
**Scope:** `src/backend/routes/`, `src/backend/repositories/`, `src/backend/services/`  
**Codebase:** Caelith Compliance Platform

---

## Executive Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH | 4 |
| MEDIUM | 5 |
| LOW | 3 |

The primary systemic issue is **hardcoded DEFAULT_TENANT_ID** throughout repositories — most queries use `queryWithTenant()` without passing the authenticated user's `tenantId`, defaulting to a static UUID. In a single-tenant deployment this is benign, but it means **tenant isolation is not enforced at the application layer** for most entities. RLS policies at the DB level may partially mitigate this, but the app layer should be the first line of defense.

---

## 1. BOLA (Broken Object Level Authorization) Audit

### Architecture Context

- `queryWithTenant(sql, params)` auto-appends `AND tenant_id = ?` but **defaults to `DEFAULT_TENANT_ID`** when no tenant is passed
- `withTenantContext()` sets `SET LOCAL app.tenant_id` for RLS, also using `DEFAULT_TENANT_ID`
- PostgreSQL RLS provides a secondary defense layer
- Most repositories **never receive the authenticated user's tenantId**

### Endpoint-by-Endpoint Analysis

#### ❌ VULNERABLE — No tenant scoping from authenticated user

| Route File | Method | Path | Issue |
|---|---|---|---|
| `asset-routes.ts` | GET | `/:id` | `findAssetById()` → `queryWithTenant` with DEFAULT_TENANT_ID, not user's tenant |
| `asset-routes.ts` | DELETE | `/:id` | `deleteAsset()` → `executeWithTenant` with DEFAULT_TENANT_ID |
| `asset-routes.ts` | PATCH | `/:id` | `updateAsset()` → uses DEFAULT_TENANT_ID |
| `asset-routes.ts` | POST | `/` | `createAsset()` → hardcodes DEFAULT_TENANT_ID in INSERT |
| `asset-routes.ts` | GET | `/:id/utilization` | Same DEFAULT_TENANT_ID issue |
| `investor-routes.ts` | GET | `/:id` | `getInvestor()` → repo uses DEFAULT_TENANT_ID |
| `investor-routes.ts` | PATCH | `/:id` | `updateInvestor()` → DEFAULT_TENANT_ID |
| `investor-routes.ts` | POST | `/` | `createInvestor()` → DEFAULT_TENANT_ID in INSERT |
| `investor-routes.ts` | DELETE | `/:id` | Uses `queryWithTenant` (from route) — **PARTIALLY SAFE** (route passes tenant) |
| `investor-routes.ts` | GET | `/:id/export` | Uses `queryWithTenant` from route — **PARTIALLY SAFE** |
| `holding-routes.ts` | POST | `/` | `allocateHolding()` → repo uses DEFAULT_TENANT_ID |
| `holding-routes.ts` | GET | `/` | repo uses DEFAULT_TENANT_ID |
| `composite-rules-routes.ts` | PATCH | `/:id` | `updateCompositeRule()` → no tenant check at all |
| `composite-rules-routes.ts` | DELETE | `/:id` | `deleteCompositeRule()` → no tenant check |
| `webhook-routes.ts` | PATCH | `/:id` | `updateWebhook()` → no tenant check |
| `webhook-routes.ts` | DELETE | `/:id` | `deleteWebhook()` → no tenant check |
| `webhook-routes.ts` | GET | `/:id/deliveries` | No tenant check |
| `rules-routes.ts` | GET | `/:assetId` | repo uses DEFAULT_TENANT_ID |
| `transfer-routes.ts` | GET | `/` | `findAllTransfers()` → no tenant scope |
| `transfer-routes.ts` | GET | `/history` | No tenant filtering |
| `transfer-routes.ts` | GET | `/history/:assetId` | No tenant filtering |
| `onboarding-routes.ts` | GET | `/:id` | repo uses DEFAULT_TENANT_ID (but has tenant in SQL) |
| `investor-document-routes.ts` | GET | `/:investorId` | No tenant check |
| `investor-document-routes.ts` | POST | `/:investorId/upload` | No tenant check on investor ownership |
| `investor-document-routes.ts` | GET | `/file/:documentId` | **No tenant check** — any user can download any document |
| `investor-document-routes.ts` | PATCH | `/file/:documentId/verify` | No tenant check |
| `investor-document-routes.ts` | DELETE | `/file/:documentId` | No tenant check |
| `annex-iv-routes.ts` | GET | `/:fundStructureId` | No tenant check — queries fund by ID without tenant |
| `annex-iv-routes.ts` | GET | `/aifm/:aifmLei` | No tenant check on AIFM LEI query |
| `evidence-bundle-routes.ts` | GET | `/:fundStructureId` | No tenant check |
| `compliance-report-routes.ts` | GET | `/compliance/:fundStructureId` | No tenant check |
| `eligibility-routes.ts` | PUT | `/criteria/:id/supersede` | repo uses DEFAULT_TENANT_ID |

#### ✅ SAFE — Proper tenant scoping

| Route File | Method | Path | Why Safe |
|---|---|---|---|
| `audit-trail-routes.ts` | GET | `/` | Passes `req.user?.tenantId` to service |
| `dashboard-routes.ts` | GET | `/` | Uses `req.user?.tenantId` in all queries |
| `decision-record-routes.ts` | GET | `/` | Explicit `dr.tenant_id = $N` with user's tenantId |
| `calendar-routes.ts` | GET | `/` | Passes `req.user?.tenantId` |
| `compliance-trend-routes.ts` | GET | `/trend` | Passes `req.user?.tenantId` |
| `copilot-routes.ts` | POST | `/chat` | Passes `req.user?.tenantId` |
| `readiness-routes.ts` | ALL | `/*` | Uses `req.user?.tenantId` |
| `screening-routes.ts` | POST | `/:investorId` | Passes `req.user?.tenantId` |
| `tenant-routes.ts` | GET | `/current` | Scoped to user's own tenant |
| `fund-structure-routes.ts` | GET | `/:id` | Uses `query()` with `AND tenant_id = $2` and DEFAULT_TENANT_ID (partial) |
| `fund-structure-routes.ts` | DELETE | `/:id` | Uses `queryWithTenant` + `executeWithTenant` with user's tenant |
| `fund-structure-routes.ts` | PATCH | `/:id` | `updateFundStructure` uses tenant in WHERE |
| `delegation-routes.ts` | ALL | `/*` | Service uses `AND tenant_id = $N` with DEFAULT_TENANT_ID |
| `lmt-routes.ts` | ALL | `/*` | Service uses `AND tenant_id = $N` with DEFAULT_TENANT_ID |
| `fee-disclosure-routes.ts` | ALL | `/*` | Service uses `AND tenant_id = $N` |
| `senior-persons-routes.ts` | ALL | `/*` | Service uses `AND tenant_id = $N` |
| `audit-package-routes.ts` | GET | `/:fundId` | Passes `req.user?.tenantId` |
| `transfer-routes.ts` | POST | `/:id/approve` | Passes tenantId |
| `transfer-routes.ts` | POST | `/:id/reject` | Passes tenantId |
| `transfer-routes.ts` | GET | `/pending` | Passes tenantId |

**Severity: CRITICAL** — In multi-tenant deployment, user A can access/modify resources belonging to user B's tenant for assets, investors, holdings, documents, webhooks, and composite rules.

**Mitigating factor:** PostgreSQL RLS policies likely enforce tenant isolation at the DB level if properly configured. However, defense-in-depth requires application-layer checks. Also, `DEFAULT_TENANT_ID` is used for RLS context too, meaning RLS may grant access to the default tenant regardless.

---

## 2. Mass Assignment Audit

### Methodology
For each POST/PUT endpoint, checked whether request body fields are spread directly into SQL or explicitly whitelisted.

### Results

| Endpoint | Verdict | Analysis |
|---|---|---|
| `POST /investors` | ✅ SAFE | Explicitly destructures: `name, jurisdiction, accredited, investor_type, kyc_status, kyc_expiry, tax_id, lei, email`. `tenant_id` and `role` cannot be injected. |
| `PATCH /investors/:id` | ✅ SAFE | Same explicit field list. |
| `POST /fund-structures` | ✅ SAFE | Explicit field destructuring. `tenant_id` hardcoded in repo. |
| `PATCH /fund-structures/:id` | ✅ SAFE | Explicit field list. |
| `POST /transfers` | ✅ SAFE | Explicit: `asset_id, from_investor_id, to_investor_id, units, execution_date` |
| `POST /assets` | ✅ SAFE | Explicit: `name, asset_type, total_units, fund_structure_id, unit_price` |
| `POST /auth/register` | ✅ SAFE | Comment explicitly says "role is never accepted from public registration — always defaults to 'viewer'" |
| `POST /delegations` | ✅ SAFE | All fields explicitly listed |
| `POST /fees` | ✅ SAFE | All fields explicitly listed |
| `POST /lmts` | ✅ SAFE | All fields explicitly listed |
| `POST /senior-persons` | ✅ SAFE | All fields explicitly listed |
| `POST /holdings` | ✅ SAFE | `investor_id, asset_id, units, acquired_at` |
| `POST /webhooks` | ✅ SAFE | `url, event_types` only |
| `POST /composite-rules` | ✅ SAFE | Explicit field list |
| `POST /eligibility/criteria` | ⚠️ MEDIUM | `fund_structure_id` accepted from body — user can associate criteria with any fund. No ownership check. |
| `POST /onboarding` | ⚠️ MEDIUM | `investor_id, asset_id` from body — can create onboarding for any investor/asset combo. |
| `PUT /regulatory-identifiers/:fundId` | ✅ SAFE | Explicit fields, fund ID from URL param |
| `PUT /readiness/:questionKey` | ✅ SAFE | Only `status, notes` from body |
| `POST /import/bulk` | ⚠️ HIGH | Bulk import accepts full entity payloads. The `executeBulkImport` function uses the user's `tenantId`, but the payload structure could include `tenant_id` fields in entity objects. Need to verify the import service strips these. |

### Mass Assignment Summary
**No critical mass assignment vulnerabilities found.** All routes use explicit field destructuring rather than `...req.body` spreads. The `tenant_id` is always hardcoded from the server side. The `role` field in registration is explicitly ignored.

---

## 3. Input Validation Depth Audit

### `requireFields()` Analysis

```typescript
export function requireFields(body: Record<string, unknown>, fields: string[]): void {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === '',
  );
  // ...
}
```

| Edge Case | Result | Risk |
|---|---|---|
| `null` | ✅ Caught (treated as missing) | None |
| `undefined` | ✅ Caught | None |
| `''` (empty string) | ✅ Caught | None |
| `[]` (empty array) | ❌ **Passes** — truthy value | **MEDIUM** — Array where string expected passes validation |
| `{}` (empty object) | ❌ **Passes** — truthy value | **MEDIUM** — Object where string expected passes |
| `0` (zero) | ❌ **Passes** — not null/undefined/empty | OK for numeric fields, but could be wrong for "required" semantics |
| `false` | ❌ **Passes** | OK for boolean fields |
| `" "` (whitespace only) | ❌ **Passes** — not empty string | **LOW** — Whitespace-only strings accepted |

### `requireUuid()` Analysis

```typescript
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function requireUuid(value: string, paramName: string = 'id'): string {
  if (!UUID_RE.test(value)) {
    throw new ValidationError(`Invalid ${paramName}: must be a valid UUID`);
  }
  return value;
}
```

| Edge Case | Result | Risk |
|---|---|---|
| Valid UUID | ✅ Passes | None |
| Non-UUID string | ✅ Rejected | None |
| `null` / `undefined` | ✅ Rejected (regex test fails on non-string) | None |
| Array/Object | ✅ Rejected (regex test fails) | None |
| UUID with null bytes | ✅ Rejected (doesn't match regex) | None |

### Type Confusion Risks

| Scenario | Affected Endpoints | Risk |
|---|---|---|
| Array in `name` field | `POST /investors`, `POST /assets` | **MEDIUM** — `requireFields` passes, but `asset-routes.ts` has `typeof name !== 'string'` check. `investor-routes.ts` does NOT check type of `name`. PostgreSQL will coerce or error. |
| Nested object in string field | `POST /investors` | **LOW** — PostgreSQL will cast to `[object Object]` string or error |
| String > 10KB in `name` | All POST endpoints | **MEDIUM** — No length validation on most string fields. PostgreSQL VARCHAR limits may catch this, but if columns are TEXT type, unlimited. |
| Unicode zero-width chars | All string fields | **LOW** — Accepted and stored. Could cause display confusion. Not exploitable for SQL injection. |
| RTL override chars (U+202E) | All string fields | **LOW** — Accepted. Could cause UI display confusion in reports/PDFs. |
| Null bytes (`\x00`) | All string fields | **MEDIUM** — PostgreSQL rejects null bytes in TEXT columns (throws error). But the error may not be handled gracefully. |
| Negative numbers for `units` | `POST /holdings`, `POST /transfers` | **HIGH** — No validation that `units` > 0. `Number(units)` accepts negative. Could allow negative holdings or reverse transfers. |
| Future dates where past expected | `acquired_at` in holdings | **LOW** — No date validation at all. Future acquisition dates accepted. |
| `NaN` from `Number()` | `total_units`, `units` fields | **MEDIUM** — `Number("abc")` → `NaN`, which would be inserted into DB. PostgreSQL may reject or store as null. |

---

## 4. CSV Import Security Audit

### File: `import-routes.ts` + `csv-import-service.ts`

#### Upload Controls ✅
- **File size limit:** 5MB via multer (`limits: { fileSize: 5 * 1024 * 1024 }`)
- **MIME type filter:** Only `text/csv`, `text/plain`, `application/vnd.ms-excel` or `.csv` extension
- **Memory storage:** No disk writes (no path traversal risk)
- **Row limit:** 5000 entities max per import

#### CSV Injection ⚠️ HIGH
- **No sanitization of cell values** for formula injection
- Values starting with `=`, `+`, `-`, `@`, `\t`, `\r` are stored as-is
- If exported back to CSV/Excel, these could execute formulas
- Example: investor name `=CMD("calc")` would be stored and re-exported
- The `parseCsvPreview` and `csvToPayload` functions pass values through without sanitizing

#### Filename Handling ✅
- Files stored in memory (`multer.memoryStorage()`), not written to disk
- No path traversal risk since `file.originalname` is never used for file system operations
- Document download in `investor-document-routes.ts` uses `sanitizeFilename()` — good

#### Entity Count Limit ✅
- Both JSON bulk and CSV import enforce 5000 entity limit

---

## 5. Additional Findings

### F-5.1: Annex IV — No Authentication on Some Report Endpoints (MEDIUM)
The `annex-iv-routes.ts` doesn't show explicit `authenticate` middleware. If mounted without auth in the main app, reports are publicly accessible.

### F-5.2: Integrity Verification Public Endpoint (LOW — by design)
`GET /public/integrity/verify` is intentionally public with rate limiting (10/min). Acceptable.

### F-5.3: PDF Content-Disposition Header Injection (LOW)
Several PDF endpoints use `fundStructureId.substring(0, 8)` in filenames. Since `requireUuid` is not always called before this, a malicious ID could inject headers. However, UUID format limits characters to hex + hyphens, making this very low risk.

### F-5.4: Password Reset Token Logged to Console (MEDIUM)
`auth-routes.ts` line: `console.log(\`[PASSWORD RESET] Token for ${email}: ${token}\`)`. In production, this leaks reset tokens to logs.

---

## 6. Remediation Summary

### CRITICAL (Fix Immediately)

| ID | Finding | Fix |
|----|---------|-----|
| C-1 | **Systemic BOLA: DEFAULT_TENANT_ID hardcoded in repositories** | Pass `req.user.tenantId` through service layer to all repository functions. Refactor repositories to accept tenantId parameter. |
| C-2 | **Investor documents: no tenant isolation** | `investor-document-routes.ts` — all endpoints access documents by ID without any tenant check. Any authenticated user can download/verify/delete any document. |
| C-3 | **Negative units accepted in holdings/transfers** | Add `units > 0` validation in `holding-routes.ts` and `transfer-routes.ts` POST handlers. |

### HIGH (Fix This Sprint)

| ID | Finding | Fix |
|----|---------|-----|
| H-1 | **CSV injection in imported data** | Sanitize CSV cell values: strip leading `=`, `+`, `-`, `@` characters, or prefix with `'` on export. |
| H-2 | **Composite rules/webhooks: no tenant check on mutations** | Add tenant scoping to `updateCompositeRule`, `deleteCompositeRule`, `updateWebhook`, `deleteWebhook`. |
| H-3 | **requireFields accepts arrays/objects as valid** | Add type checking: `typeof body[f] !== 'string'` for string fields, or add a `requireString()` helper. |
| H-4 | **Password reset token in console.log** | Remove or replace with secure logging that redacts tokens. |

### MEDIUM (Fix Next Sprint)

| ID | Finding | Fix |
|----|---------|-----|
| M-1 | String length limits not enforced | Add `maxLength` validation for name/description fields (e.g., 500 chars). |
| M-2 | NaN propagation from `Number()` calls | Validate numeric inputs: `if (isNaN(n) \|\| !isFinite(n)) throw ValidationError` |
| M-3 | No date format validation | Add ISO date regex validation for date fields. |
| M-4 | Onboarding/eligibility cross-tenant resource references | Validate that referenced `investor_id`, `asset_id`, `fund_structure_id` belong to the user's tenant. |
| M-5 | Annex IV report endpoints may lack auth | Verify auth middleware is applied at mount point. |

### LOW (Backlog)

| ID | Finding | Fix |
|----|---------|-----|
| L-1 | Whitespace-only strings pass `requireFields` | Trim before checking |
| L-2 | Unicode confusables (ZWJ, RTL override) accepted | Consider Unicode normalization or sanitization for display fields |
| L-3 | Future dates accepted for `acquired_at` | Add date range validation |

---

## 7. Fixes Applied

### Fix C-3: Negative units validation
Added `units > 0` checks in `holding-routes.ts` and `transfer-routes.ts`.

### Fix H-1: CSV injection sanitization
Added `sanitizeCsvValue()` function in `csv-import-service.ts` to strip formula injection characters.

### Fix H-3: Type validation in requireFields
Enhanced `requireFields()` with optional type checking; added `requireString()` helper.

### Fix H-4: Password reset token logging
Removed token from console.log in auth-routes.ts.

### Fix M-2: NaN validation
Added `requirePositiveNumber()` helper in validate.ts.
