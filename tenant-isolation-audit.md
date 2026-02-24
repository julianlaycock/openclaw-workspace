# Tenant Isolation Security Audit — Caelith Platform

**Audit Date:** 2026-02-23  
**Auditor:** Automated Security Audit (Claude)  
**Severity:** 🔴 CRITICAL — Multiple cross-tenant data leakage vulnerabilities found  
**Scope:** All repositories (`src/backend/repositories/`), routes (`src/backend/routes/`), and services (`src/backend/services/`)

---

## Executive Summary

The Caelith platform implements tenant isolation through two mechanisms:
1. **Application-level**: `queryWithTenant()` / `executeWithTenant()` — auto-appends `WHERE tenant_id = ?` and sets PostgreSQL RLS session variable
2. **Database-level**: Row-Level Security (RLS) via `SET LOCAL app.tenant_id`

**However, numerous services and repositories bypass both mechanisms** by using raw `query()` / `execute()` from `db.ts` without any tenant_id filtering. Since raw `query()` does NOT set the RLS session variable, these queries bypass both application AND database-level isolation.

### Critical Pattern: `DEFAULT_TENANT_ID` Hardcoding

Many services use `DEFAULT_TENANT_ID` (`00000000-0000-0000-0000-000000000099`) instead of reading from `req.user.tenantId`. In a multi-tenant deployment, **every tenant would share the same hardcoded tenant ID**, making isolation meaningless. This is acceptable ONLY in single-tenant mode.

---

## Vulnerability Summary

| Severity | Count | Category |
|----------|-------|----------|
| 🔴 CRITICAL | 6 | Cross-tenant data leakage via raw queries |
| 🟠 HIGH | 4 | No tenant filtering on write/delete operations |
| 🟡 MEDIUM | 5 | DEFAULT_TENANT_ID hardcoded (single-tenant assumption) |
| 🟢 LOW | 3 | Minor isolation gaps unlikely to be exploitable |

---

## Repository-Level Audit

### Repositories using `queryWithTenant` / `executeWithTenant` (PASS ✅)

| Repository | Read | Write | Delete | Status |
|-----------|------|-------|--------|--------|
| `investor-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | ✅ `executeWithTenant` | **PASS** (reads safe) |
| `asset-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | ✅ `executeWithTenant` | **PASS** (reads safe) |
| `holding-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | ✅ `executeWithTenant` | **PASS** (reads safe) |
| `rules-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | ✅ `executeWithTenant` | **PASS** (reads safe) |
| `transfer-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | N/A | **PASS** (reads safe) |
| `event-repository.ts` | ✅ `queryWithTenant` | ⚠️ `execute` with hardcoded tenant | N/A | **PASS** (reads safe) |
| `fund-structure-repository.ts` | ✅ `queryWithTenant` for lists | ✅ manual `tenant_id = $N` | N/A | **PASS** |
| `eligibility-criteria-repository.ts` | ✅ `queryWithTenant` | ✅ manual `tenant_id = $N` | N/A | **PASS** |
| `decision-record-repository.ts` | ✅ `queryWithTenant` for searches | ✅ manual `tenant_id = $N` | N/A | **PASS** |
| `onboarding-repository.ts` | ✅ `queryWithTenant` for lists | ✅ manual `tenant_id = $N` | N/A | **PASS** |

### Repositories using raw `query()` / `execute()` (FAIL ❌)

| Repository | Issue | Status |
|-----------|-------|--------|
| `investor-document-repository.ts` | `findDocumentsByInvestor()`, `findDocumentById()`, `updateDocumentStatus()`, `deleteDocument()` — ALL use raw `query()`/`execute()` with **NO tenant_id filter** | 🔴 **CRITICAL FAIL** |

---

## Route-Level Audit

### Routes — PASS ✅

| Route | Tenant Mechanism | Status |
|-------|-----------------|--------|
| `investor-routes.ts` | Uses repository layer (queryWithTenant) + queryWithTenant for export/delete | **PASS** |
| `asset-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `holding-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `transfer-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `event-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `fund-structure-routes.ts` | Uses `queryWithTenant`/`executeWithTenant` directly | **PASS** |
| `eligibility-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `decision-record-routes.ts` | Uses repository + manual `tenant_id` filter | **PASS** |
| `onboarding-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `rules-routes.ts` | Uses repository layer (queryWithTenant) | **PASS** |
| `dashboard-routes.ts` | Raw `query()` BUT manually passes `req.user.tenantId` as `$1` in every query | **PASS** |
| `readiness-routes.ts` | Raw `query()`/`execute()` BUT uses `req.user.tenantId` as `$1` in all queries | **PASS** |
| `compliance-trend-routes.ts` | Raw `query()`/`execute()` BUT uses `req.user.tenantId` as `$1` in all queries | **PASS** |
| `audit-trail-routes.ts` | Delegates to `getAuditTrail()` which filters by `tenant_id = $1` | **PASS** |
| `screening-routes.ts` | Passes `req.user.tenantId` to service | **PASS** |
| `auth-routes.ts` | Tenant-aware auth | **PASS** |
| `tenant-routes.ts` | Admin-only, filters by tenant | **PASS** |
| `calendar-routes.ts` | Uses `queryInTenantContext` | **PASS** |

### Routes — FAIL ❌ / RISK ⚠️

| Route | Issue | Severity | Status |
|-------|-------|----------|--------|
| `annex-iv-routes.ts` | Delegates to `annex-iv-service.ts` which uses raw `query()` with NO tenant filter on fund_structures, assets, holdings, investors, decision_records. **Any authenticated user can generate Annex IV reports for ANY tenant's fund by knowing the fundStructureId.** | 🔴 **CRITICAL** | **FAIL** |
| `annex-iv-routes.ts` (AIFM endpoint) | `/aifm/:aifmLei` queries `fund_structures WHERE aifm_lei = $1` with NO tenant filter. Returns ALL funds across ALL tenants sharing that AIFM LEI. | 🔴 **CRITICAL** | **FAIL** |
| `evidence-bundle-routes.ts` | Delegates to `evidence-bundle-service.ts` which uses raw `query()` with NO tenant filter. Full evidence bundles (decisions, investors, rules, criteria) exposed cross-tenant. | 🔴 **CRITICAL** | **FAIL** |
| `integrity-routes.ts` | Authenticated endpoint queries `decision_records` with NO tenant filter. Public endpoint calls `verifyChain()` which queries ALL decision records across ALL tenants. | 🔴 **CRITICAL** | **FAIL** |
| `regulatory-identifiers-routes.ts` | Uses raw `query()`/`execute()` with NO tenant filter. Any user can read/write regulatory identifiers for any fund. | 🔴 **CRITICAL** | **FAIL** |
| `investor-document-routes.ts` | Document CRUD goes through `investor-document-repository.ts` which has NO tenant filtering. | 🔴 **CRITICAL** | **FAIL** |
| `composite-rules-routes.ts` | Delegates to `composite-rules-service.ts` which uses raw `query()`/`execute()` with NO tenant filter. | 🟠 **HIGH** | **FAIL** |
| `delegation-routes.ts` | Service uses `DEFAULT_TENANT_ID` hardcoded, not `req.user.tenantId`. | 🟡 **MEDIUM** | **RISK** |
| `senior-persons-routes.ts` | Service uses `DEFAULT_TENANT_ID` hardcoded, not `req.user.tenantId`. | 🟡 **MEDIUM** | **RISK** |
| `fee-disclosure-routes.ts` | Service uses `DEFAULT_TENANT_ID` hardcoded, not `req.user.tenantId`. | 🟡 **MEDIUM** | **RISK** |
| `lmt-routes.ts` | Service uses `DEFAULT_TENANT_ID` hardcoded, not `req.user.tenantId`. | 🟡 **MEDIUM** | **RISK** |
| `lmt-notification-routes.ts` | Service uses `DEFAULT_TENANT_ID`. | 🟡 **MEDIUM** | **RISK** |
| `webhook-routes.ts` | `webhook-service.ts` has ZERO tenant filtering. All webhooks visible to all tenants. | 🟠 **HIGH** | **FAIL** |

---

## Service-Level Audit (Critical Findings)

### 🔴 `annex-iv-service.ts` — CRITICAL
- Uses raw `query()` for ALL database access
- Queries `fund_structures`, `assets`, `holdings`, `investors`, `decision_records` with NO tenant_id filter
- **Impact**: Complete fund data exposure — investor PII, holdings, compliance decisions, KYC status
- **GDPR Impact**: Art. 5(1)(f) integrity/confidentiality breach, Art. 32 security of processing failure

### 🔴 `evidence-bundle-service.ts` — CRITICAL
- Uses raw `query()` for ALL database access
- Queries `fund_structures`, `assets`, `decision_records`, `investors`, `eligibility_criteria`, `rules`, `composite_rules` with NO tenant_id filter
- **Impact**: Complete audit evidence package of another tenant downloadable as JSON

### 🔴 `integrity-service.ts` — CRITICAL
- `verifyChain()` and `sealRecord()` query ALL `decision_records` across tenants
- Hash chain verification mixes records from different tenants
- **Impact**: Chain includes other tenants' decision data; integrity compromise

### 🔴 `compliance-report-service.ts` — CRITICAL
- Uses raw `query()` for fund structure, assets, holdings, investors, decisions, criteria
- No tenant_id filter on any query
- **Impact**: Full compliance reports for any tenant's fund

### 🔴 `cap-table-pdf.ts` — CRITICAL
- Uses raw `query()` for assets, holdings, investors
- No tenant_id filter
- **Impact**: Cap table with investor names and holdings exposed cross-tenant

### 🔴 `composite-rules-service.ts` — CRITICAL
- Uses raw `query()`/`execute()` with NO tenant_id filter
- Rules can be read, created, updated, deleted for any tenant's assets

### 🟠 `webhook-service.ts` — HIGH
- ZERO tenant awareness. All webhooks shared across tenants.
- Webhook deliveries for all tenants visible.

### 🟠 `scenario-service.ts` — HIGH
- Uses raw `query()` to load investors + holdings with no tenant filter

### 🟠 `transfer-service.ts` — HIGH
- Internal transaction queries (holdings FOR UPDATE) use raw pool queries without tenant context
- `getPendingTransfers()` accepts `_tenantId` param but the actual implementation may not use it

### 🟠 `rules-service.ts` — HIGH
- Uses raw `query()`/`execute()` for some operations

---

## Specific Attack Scenarios

### Attack 1: Annex IV Data Exfiltration
```
GET /api/reports/annex-iv/{victimFundId}
→ Returns: Fund name, AIFM details, ALL investor types/jurisdictions, 
  holdings breakdown, KYC stats, compliance violations, leverage data
```

### Attack 2: Evidence Bundle Download
```
GET /api/reports/evidence-bundle/{victimFundId}/download
→ Returns: Complete audit package with decision records, investor data,
  eligibility criteria, composite rules
```

### Attack 3: AIFM Cross-Tenant Enumeration
```
GET /api/reports/annex-iv/aifm/{knownLEI}
→ Returns: ALL funds across ALL tenants managed by that AIFM
```

### Attack 4: Investor Document Access
```
GET /api/investors/{investorId}/documents/{documentId}
→ Returns: KYC documents (passport scans, etc.) from any tenant
```

### Attack 5: Regulatory Identifier Tampering
```
PUT /api/funds/{victimFundId}/regulatory-identifiers
Body: { "lei_code": "ATTACKER_LEI" }
→ Overwrites victim's regulatory identifiers
```

---

## Recommendations (Priority Order)

### 1. IMMEDIATE (P0) — Fix Critical Cross-Tenant Queries
- **annex-iv-service.ts**: Add `AND tenant_id = $N` to ALL queries, or refactor to use `queryWithTenant`
- **evidence-bundle-service.ts**: Same
- **compliance-report-service.ts**: Same
- **integrity-service.ts**: Scope `verifyChain()` and `sealRecord()` to tenant
- **investor-document-repository.ts**: Add tenant_id filtering to all functions
- **regulatory-identifiers-routes.ts**: Add tenant_id filtering
- **composite-rules-service.ts**: Add tenant_id filtering
- **cap-table-pdf.ts**: Add tenant_id filtering
- **webhook-service.ts**: Add tenant_id to webhooks table and filter

### 2. SHORT-TERM (P1) — Eliminate DEFAULT_TENANT_ID in Services
- All services using `DEFAULT_TENANT_ID` must accept `tenantId` as a parameter passed from the route handler via `req.user.tenantId`
- Routes must pass `req.user.tenantId` down to every service call

### 3. MEDIUM-TERM (P2) — Enforce at Database Level
- Ensure RLS policies are `FORCE`d on ALL tenant-scoped tables (not just enabled)
- The application DB user should NOT be a superuser (superusers bypass RLS)
- Add RLS policies to: `regulatory_identifiers`, `investor_documents`, `composite_rules`, `webhooks`, `webhook_deliveries`

### 4. LONG-TERM (P3) — Architectural Improvements
- **Lint rule**: Ban direct import of `query`/`execute` from `db.ts` — require `queryWithTenant`/`executeWithTenant`/`queryInTenantContext`
- **Middleware**: Add a middleware that injects `tenantId` into `req` and make all db helpers tenant-aware by default
- **Integration tests**: Add cross-tenant isolation tests (create data as Tenant A, verify Tenant B cannot access)

---

## Files Requiring Fixes

| File | Fix Required |
|------|-------------|
| `src/backend/services/annex-iv-service.ts` | Add tenant_id to ALL 10+ queries |
| `src/backend/services/evidence-bundle-service.ts` | Add tenant_id to ALL 8+ queries |
| `src/backend/services/compliance-report-service.ts` | Add tenant_id to ALL 10+ queries |
| `src/backend/services/integrity-service.ts` | Scope chain verification to tenant |
| `src/backend/services/composite-rules-service.ts` | Add tenant_id to CRUD |
| `src/backend/services/cap-table-pdf.ts` | Add tenant_id to all queries |
| `src/backend/services/webhook-service.ts` | Add tenant_id to all operations |
| `src/backend/services/scenario-service.ts` | Add tenant_id to investor query |
| `src/backend/services/transfer-service.ts` | Ensure tenant context in pool transactions |
| `src/backend/repositories/investor-document-repository.ts` | Add tenant_id to ALL CRUD |
| `src/backend/routes/regulatory-identifiers-routes.ts` | Add tenant_id to GET/PUT |
| `src/backend/routes/annex-iv-routes.ts` | Pass tenantId to service |
| `src/backend/routes/integrity-routes.ts` | Scope to tenant, especially authenticated endpoint |

---

## Note on Current Single-Tenant Deployment

The codebase currently appears to operate in **single-tenant mode** (all data uses `DEFAULT_TENANT_ID`). In this mode, the vulnerabilities documented above are **not actively exploitable** because there is only one tenant. However:

1. The code structure suggests multi-tenancy was designed for (tenant_id columns exist, RLS is referenced)
2. If a second tenant is ever onboarded without fixing these issues, **immediate cross-tenant exposure occurs**
3. The `DEFAULT_TENANT_ID` pattern creates a false sense of security — it looks tenant-aware but isn't

**These must be fixed BEFORE any multi-tenant deployment.**
