# Data Classification & PII Inventory

**Last updated:** 2026-02-23  
**Classification levels:** Public < Internal < Confidential < Restricted

---

## Classification Definitions

| Level | Definition | Examples |
|-------|-----------|----------|
| **Public** | Non-sensitive; safe for public disclosure | App version, generic regulatory text |
| **Internal** | Business data; no regulatory impact if disclosed internally | Fund structure names, asset types, rule configurations |
| **Confidential** | Business-sensitive; disclosure could cause competitive harm or minor regulatory issues | Investor counts, AUM figures, fee structures, compliance decisions |
| **Restricted** | PII or regulated data; disclosure triggers GDPR notification, financial harm, or identity theft | Investor names, emails, tax IDs, LEIs, KYC documents, passwords |

---

## PII Inventory by Table

### `users`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `id` | Internal | No | None | RBAC + tenant RLS | Indefinite |
| `email` | **Restricted** | ✅ Email | ❌ Plaintext | RBAC + tenant RLS | Until account deletion + 30 days |
| `password_hash` | **Restricted** | ✅ Credential | ✅ bcrypt hashed | RBAC + tenant RLS; never returned by API | Until account deletion + 30 days |
| `name` | **Restricted** | ✅ Full name | ❌ Plaintext | RBAC + tenant RLS | Until account deletion + 30 days |
| `role` | Internal | No | None | RBAC + tenant RLS | Lifetime of account |
| `tenant_id` | Internal | No | None | RBAC | Lifetime of account |
| `deleted_at` | Internal | No | None | RBAC | Indefinite |

### `investors`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `id` | Internal | No | None | Tenant RLS | Indefinite |
| `name` | **Restricted** | ✅ Full name / entity name | ❌ Plaintext | Tenant RLS | 10 years post-relationship (AML requirement) |
| `email` | **Restricted** | ✅ Email | ❌ Plaintext | Tenant RLS | 10 years post-relationship |
| `jurisdiction` | Confidential | No (but correlated with PII) | None | Tenant RLS | 10 years post-relationship |
| `investor_type` | Confidential | No | None | Tenant RLS | 10 years post-relationship |
| `kyc_status` | Confidential | No | None | Tenant RLS | 10 years post-relationship |
| `kyc_expiry` | Confidential | No | None | Tenant RLS | 10 years post-relationship |
| `tax_id` | **Restricted** | ✅ Tax identification number | ❌ Plaintext | Tenant RLS | 10 years post-relationship (tax law) |
| `lei` | **Restricted** | ✅ Legal Entity Identifier | ❌ Plaintext | Tenant RLS | 10 years post-relationship |
| `accredited` | Confidential | No | None | Tenant RLS | 10 years post-relationship |
| `tenant_id` | Internal | No | None | RLS key | Indefinite |
| `deleted_at` | Internal | No | None | Tenant RLS | Indefinite |

### `investor_documents`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `id` | Internal | No | None | Tenant RLS | Per document type |
| `investor_id` | Internal | No (FK) | None | Tenant RLS | Per document type |
| `document_type` | Confidential | No | None | Tenant RLS | Per document type |
| `filename` | Confidential | Possibly (may contain name) | ❌ Plaintext | Tenant RLS | Per document type |
| `file_data` | **Restricted** | ✅ KYC identity docs, proof of address, AML screening | ❌ Plaintext (BYTEA) | Tenant RLS | KYC: 5 years post-expiry; AML: 10 years |
| `mime_type` | Internal | No | None | Tenant RLS | Per document type |
| `status` | Confidential | No | None | Tenant RLS | Per document type |
| `expiry_date` | Confidential | No | None | Tenant RLS | Per document type |
| `notes` | Confidential | Possibly | ❌ Plaintext | Tenant RLS | Per document type |
| `uploaded_by` | Internal | No (FK) | None | Tenant RLS | Per document type |
| `verified_by` | Internal | No (FK) | None | Tenant RLS | Per document type |

### `login_attempts`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `email` | **Restricted** | ✅ Email | ❌ Plaintext | No RLS (system table) | 30 days (per `migrations/051`) |
| `ip_address` | **Restricted** | ✅ IP address (GDPR PII) | ❌ Plaintext | No RLS | 30 days |
| `success` | Internal | No | None | No RLS | 30 days |
| `attempted_at` | Internal | No | None | No RLS | 30 days |

### `refresh_tokens`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `user_id` | Internal | No (FK) | None | System-only | Until expiry |
| `token` | **Restricted** | ✅ Authentication credential | ❌ Plaintext | System-only; unique index | Until expiry |
| `expires_at` | Internal | No | None | System-only | Until expiry |

### `password_reset_tokens`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `user_id` | Internal | No (FK) | None | System-only | Until used or expired |
| `token` | **Restricted** | ✅ Authentication credential | ❌ Plaintext | System-only | Until used or expired |
| `expires_at` | Internal | No | None | System-only | Until used or expired |
| `used` | Internal | No | None | System-only | Until cleanup |

### `decision_records`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `id` | Internal | No | None | Tenant RLS | 10 years (regulatory) |
| `subject_id` | Internal | No (FK, but links to investor) | None | Tenant RLS | 10 years |
| `input_snapshot` | **Restricted** | ✅ May contain investor name, email, tax_id, LEI | ❌ Plaintext (JSONB) | Tenant RLS | 10 years (immutable) |
| `decided_by` | Internal | No (FK) | None | Tenant RLS | 10 years |
| `integrity_hash` | Internal | No | None | Tenant RLS | 10 years |
| `previous_hash` | Internal | No | None | Tenant RLS | 10 years |

### `onboarding_records`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `investor_id` | Internal | No (FK, links to PII) | None | Tenant RLS | 10 years |
| `rejection_reasons` | Confidential | Possibly (may reference investor attributes) | ❌ Plaintext (JSONB) | Tenant RLS | 10 years |
| `reviewed_by` | Internal | No (FK) | None | Tenant RLS | 10 years |

### `events` (Audit Trail)

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `payload` | **Restricted** | ✅ May contain any entity data including PII | ❌ Plaintext (JSONB) | Tenant RLS | 7 years |
| `entity_id` | Internal | No (FK) | None | Tenant RLS | 7 years |
| `event_type` | Internal | No | None | Tenant RLS | 7 years |

### `fund_senior_persons`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `full_name` | **Restricted** | ✅ Full name | ❌ Plaintext | Tenant-scoped | Lifetime of fund + 10 years |
| `role` | Confidential | No | None | Tenant-scoped | Lifetime of fund + 10 years |
| `jurisdiction` | Confidential | No | None | Tenant-scoped | Lifetime of fund + 10 years |
| `eu_resident` | Confidential | No | None | Tenant-scoped | Lifetime of fund + 10 years |

### `tenants`

| Column | Classification | PII? | Encryption at Rest | Access Control | Retention |
|--------|---------------|------|-------------------|----------------|-----------|
| `name` | Internal | No (org name) | None | System-level | Indefinite |
| `slug` | Internal | No | None | System-level | Indefinite |
| `domain` | Internal | No | None | System-level | Indefinite |
| `settings` | Confidential | No | None | System-level | Indefinite |

### Non-PII Tables (Summary)

The following tables contain **no PII** — classified as Internal or Confidential:

| Table | Classification | Notes |
|-------|---------------|-------|
| `assets` | Internal | Fund asset records; names are fund/asset names, not personal |
| `holdings` | Confidential | Links investors to assets; FK references only |
| `rules` | Internal | Compliance rule configurations |
| `transfers` | Confidential | Asset transfer records; FKs to investors |
| `fund_structures` | Confidential | Fund legal structures, AUM, strategies |
| `eligibility_criteria` | Internal | Regulatory thresholds per fund |
| `composite_rules` | Internal | Multi-condition compliance rules |
| `regulatory_documents` | Internal | Embedded regulatory texts |
| `webhooks` | Internal | Webhook configurations |
| `webhook_deliveries` | Internal | Delivery logs |
| `rate_limit_counters` | Internal | Rate limiting state |
| `fund_fee_disclosures` | Confidential | Fee structures |
| `fund_lmt_*` | Confidential | Liquidity management tools |

---

## Summary: All Restricted (PII) Columns

| Table | Column | PII Category | Encrypted? | Action Required |
|-------|--------|-------------|------------|-----------------|
| `users` | `email` | Email | ❌ | Encrypt at rest |
| `users` | `name` | Full name | ❌ | Encrypt at rest |
| `users` | `password_hash` | Credential | ✅ bcrypt | OK |
| `investors` | `name` | Full name / entity | ❌ | Encrypt at rest |
| `investors` | `email` | Email | ❌ | Encrypt at rest |
| `investors` | `tax_id` | Tax ID | ❌ | **Priority: encrypt at rest** |
| `investors` | `lei` | LEI | ❌ | Encrypt at rest |
| `investor_documents` | `file_data` | Identity documents | ❌ | **Priority: encrypt at rest or move to encrypted storage** |
| `investor_documents` | `filename` | Possibly PII | ❌ | Sanitize on upload |
| `login_attempts` | `email` | Email | ❌ | Consider hashing (used for lookup) |
| `login_attempts` | `ip_address` | IP address | ❌ | Consider hashing |
| `refresh_tokens` | `token` | Auth credential | ❌ | **Priority: hash tokens** |
| `password_reset_tokens` | `token` | Auth credential | ❌ | **Priority: hash tokens** |
| `decision_records` | `input_snapshot` | Mixed PII (JSONB) | ❌ | Encrypt JSONB or strip PII before storage |
| `events` | `payload` | Mixed PII (JSONB) | ❌ | Encrypt JSONB or implement field-level redaction |
| `fund_senior_persons` | `full_name` | Full name | ❌ | Encrypt at rest |

---

## Recommended Actions (Priority Order)

1. **Encrypt `investors.tax_id`** — Highest-sensitivity PII; tax fraud risk if disclosed
2. **Encrypt or externalize `investor_documents.file_data`** — KYC identity documents stored as unencrypted BYTEA
3. **Hash `refresh_tokens.token` and `password_reset_tokens.token`** — Credentials should never be stored in plaintext
4. **Implement column-level encryption** for `investors.name`, `investors.email`, `investors.lei`, `users.name`, `users.email`
5. **Encrypt or redact PII in `events.payload`** and `decision_records.input_snapshot` JSONB fields
6. **Hash `login_attempts.email` and `login_attempts.ip_address`** — Or use HMAC for lookup capability
7. **Sanitize `investor_documents.filename`** to remove any PII embedded in uploaded filenames
