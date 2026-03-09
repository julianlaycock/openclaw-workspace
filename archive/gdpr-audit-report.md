# GDPR Compliance Audit Report — Caelith

**Date:** 2026-02-23  
**Auditor:** Security Engineer (automated)  
**Scope:** Art. 15/17/20 endpoints, data retention, consent tracking  
**Commit:** `compliance: GDPR endpoint hardening, data retention, consent tracking`

---

## 1. GDPR Endpoint Audit

### Art. 15 / Art. 20 — Data Access & Portability (`GET /api/investors/:id/export`)

**Status: HARDENED ✅ (was PARTIAL ⚠️)**

**Pre-existing coverage:**
- ✅ Investor core record
- ✅ Holdings
- ✅ Decision records
- ✅ Onboarding records
- ✅ Investor documents (metadata)
- ✅ JSON format with Content-Disposition header
- ✅ Audit trail entry logged on export

**Gaps found & fixed:**
| Gap | Severity | Fix |
|-----|----------|-----|
| Missing **transfers** (from/to) | HIGH | Added query for transfers WHERE from_investor_id OR to_investor_id |
| Missing **audit trail events** | MEDIUM | Added events WHERE entity_type='investor' AND entity_id |
| Missing **screening results** | MEDIUM | Added screening-specific event query |
| No **CSV export** (Art. 20 machine-readable) | MEDIUM | Added `?format=csv` query parameter support |

**Authentication:** ✅ Route is behind `authenticate` + `authorizeWrite('admin', 'compliance_officer')` middleware. All authenticated users can read (GET), only admin/CO can write.

### Art. 17 — Right to Erasure (`DELETE /api/investors/:id`)

**Status: HARDENED ✅ (was PARTIAL ⚠️)**

**Pre-existing coverage:**
- ✅ Soft-delete (deleted_at timestamp)
- ✅ PII fields nullified (name→'GELÖSCHT', email/tax_id/lei→NULL)
- ✅ Events payload PII stripped
- ✅ Audit trail entry for deletion

**Gaps found & fixed:**
| Gap | Severity | Fix |
|-----|----------|-----|
| **investor_documents** not deleted | HIGH | Added DELETE FROM investor_documents |
| **onboarding_records** PII (handoff_notes, owner_tag) retained | MEDIUM | Added UPDATE to NULL notes/tags |
| **decision_records** input_snapshot contained PII | MEDIUM | Added JSONB key stripping on input_snapshot |
| Events payload missing tax_id/lei stripping | LOW | Added to payload strip list |

**Cascade verification:**
- Holdings: retained (FK to anonymized investor, needed for fund accounting)
- Transfers: retained (FK to anonymized investor, financial audit requirement)
- Decision records: structure retained, PII stripped from snapshots
- Onboarding: structure retained, free-text notes nullified
- Documents: fully deleted (no orphaned file references)

**Authentication:** ✅ DELETE requires `authenticate` + admin/compliance_officer role.

---

## 2. Data Retention Policy

**Status: IMPLEMENTED ✅ (was MISSING ❌)**

**File:** `scripts/data-retention.ts`  
**Usage:** `npx tsx scripts/data-retention.ts [--dry-run]`

| Cleanup Task | Retention Period | Source |
|-------------|-----------------|--------|
| Audit trail events | 7 years (configurable via `RETENTION_AUDIT_YEARS`) | HGB §257, AO §147 |
| Closed account PII anonymization | 90 days post-deletion (configurable via `RETENTION_CLOSURE_GRACE_DAYS`) | Art. 17 GDPR |
| Expired password reset tokens | Immediate (expired or used) | Art. 5(1)(e) GDPR |
| Expired refresh tokens | Immediate (past expires_at) | Art. 5(1)(e) GDPR |
| Login attempts | 30 days | Art. 5(1)(e) GDPR |

**Cron recommendation:** `0 2 * * * npx tsx /path/to/scripts/data-retention.ts`

---

## 3. Consent Tracking

**Status: IMPLEMENTED ✅ (was MISSING ❌)**

**Migration:** `054_gdpr_consent_tracking.sql`

- Added `consent_at` (TIMESTAMPTZ) and `consent_privacy_version` (VARCHAR) to `users` table
- Registration (`registerUser`) now stores `consent_at = NOW()` and reads version from `PRIVACY_POLICY_VERSION` env var (default: `2026-02-01-v1`)
- Existing users backfilled with `created_at` as consent timestamp

---

## 4. Data Export Format (Art. 20)

**Status: COMPLIANT ✅**

- **JSON:** Default format, served with `application/json` Content-Type and `Content-Disposition: attachment` header
- **CSV:** Available via `?format=csv`, multi-section format with headers per data category
- Both are "commonly used, machine-readable formats" per Art. 20 GDPR

---

## 5. Remaining Recommendations

| Priority | Item | Notes |
|----------|------|-------|
| MEDIUM | Add consent re-confirmation flow | When privacy policy version changes, prompt users to re-consent |
| MEDIUM | Automated data retention cron | Deploy the script as a scheduled job in production |
| LOW | Investor self-service portal | Allow investors to trigger Art. 15 export and Art. 17 deletion themselves |
| LOW | Data Processing Agreement (DPA) tracking | Track third-party processor agreements for Art. 28 |
| LOW | Right to restriction (Art. 18) | Add `processing_restricted` flag enforcement across all query paths |

---

## Files Changed

1. `src/backend/routes/investor-routes.ts` — Hardened export + delete endpoints
2. `src/backend/services/auth-service.ts` — Consent fields on registration
3. `migrations/054_gdpr_consent_tracking.sql` — Schema: consent_at, consent_privacy_version
4. `scripts/data-retention.ts` — New automated cleanup script
