# Caelith API Reference

> **Base URL:** `http://localhost:3001` (dev) · Production on Railway  
> **Auth:** JWT Bearer token or `access_token` httpOnly cookie. All endpoints except Auth (public) and Public Integrity require authentication.

---

## Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | None | Register (controlled by `REGISTRATION_MODE` env: open/invite/disabled). Body: `{email, password, name, inviteCode?}` |
| POST | `/api/auth/login` | None | Login. Body: `{email, password}`. Returns JWT + refresh token (also set as cookies) |
| POST | `/api/auth/refresh` | None | Refresh token. Body: `{refreshToken}` or via `refresh_token` cookie |
| POST | `/api/auth/logout` | Yes | Revokes refresh tokens, clears cookies |
| POST | `/api/auth/forgot-password` | None | Request reset. Body: `{email}`. Always returns 200 |
| POST | `/api/auth/reset-password` | None | Reset with token. Body: `{token, password}` |
| GET | `/api/auth/me` | Yes | Current user info |

---

## Investors

**Roles:** admin, compliance_officer (for writes)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/investors` | List all investors |
| POST | `/api/investors` | Create investor. Required: `{name, jurisdiction, accredited}`. Optional: `investor_type`, `kyc_status`, `kyc_expiry`, `tax_id`, `lei`, `email` |
| GET | `/api/investors/:id` | Get by ID |
| PATCH | `/api/investors/:id` | Update investor fields |
| DELETE | `/api/investors/:id` | **DSGVO Art. 17** — Soft-delete + PII anonymization across all tables |
| GET | `/api/investors/:id/export` | **DSGVO Art. 15/20** — Full data export. Query: `?format=json|csv` |

**Investor types:** `institutional`, `professional`, `semi_professional`, `well_informed`, `retail`  
**KYC statuses:** `pending`, `verified`, `expired`, `rejected`

---

## Assets

**Roles:** admin, compliance_officer (for writes)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/assets` | List all |
| POST | `/api/assets` | Create. Required: `{name, asset_type, total_units}`. Optional: `fund_structure_id`, `unit_price` |
| GET | `/api/assets/:id` | Get by ID |
| PATCH | `/api/assets/:id` | Update |
| DELETE | `/api/assets/:id` | Delete |
| GET | `/api/assets/:id/utilization` | Utilization stats |

---

## Holdings & Cap Table

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/holdings?assetId=X` | Holdings by asset |
| GET | `/api/holdings?investorId=X` | Holdings by investor |
| POST | `/api/holdings` | Allocate. Required: `{investor_id, asset_id, units, acquired_at}` |
| GET | `/api/holdings/cap-table/:assetId` | Cap table JSON |
| GET | `/api/holdings/cap-table/:assetId/pdf` | Cap table PDF download |

---

## Transfers

**Roles:** admin, compliance_officer (for writes)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/transfers` | List all (optional `?assetId=X`) |
| POST | `/api/transfers` | Execute transfer. Required: `{asset_id, from_investor_id, to_investor_id, units, execution_date}`. Returns 201 (executed) or 202 (pending approval) |
| POST | `/api/transfers/simulate` | Dry-run simulation |
| GET | `/api/transfers/pending` | Pending transfers |
| POST | `/api/transfers/:id/approve` | Approve |
| POST | `/api/transfers/:id/reject` | Reject. Required: `{reason}` |
| GET | `/api/transfers/history` | History (optional `?assetId=X`) |
| GET | `/api/transfers/history/:assetId` | History for asset |

---

## Fund Structures

**Roles:** admin, compliance_officer (for writes)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/fund-structures` | List all |
| POST | `/api/fund-structures` | Create. Required: `{name, legal_form, domicile, regulatory_framework}` |
| GET | `/api/fund-structures/:id` | Get by ID |
| PATCH | `/api/fund-structures/:id` | Update. **Activation blocked** if AIFMD II requirements not met (2 EU-resident senior persons, 2 LMTs for open-ended funds) |
| DELETE | `/api/fund-structures/:id` | Delete (blocked if linked assets exist) |

### Fund Sub-resources

| Method | Path | Description |
|--------|------|-------------|
| GET/PUT | `/api/funds/:fundId/regulatory-identifiers` | LEI, ISIN, WKN, BaFin ID, GIIN, etc. |
| GET/POST | `/api/funds/:fundId/lmts` | Liquidity Management Tools |
| PUT/DELETE | `/api/funds/:fundId/lmts/:id` | Update/delete LMT |
| POST | `/api/funds/:fundId/lmts/:id/activate` | Activate LMT |
| POST | `/api/funds/:fundId/lmts/:id/deactivate` | Deactivate LMT |
| GET/POST | `/api/funds/:fundId/delegations` | Delegation management |
| PUT/DELETE | `/api/funds/:fundId/delegations/:id` | Update/delete delegation |
| GET/POST | `/api/funds/:fundId/senior-persons` | Senior management persons (AIFMD II Art. 8) |
| PATCH/DELETE | `/api/funds/:fundId/senior-persons/:id` | Update/delete senior person |
| GET/POST | `/api/funds/:fundId/fees` | Fee disclosures |
| PATCH/DELETE | `/api/funds/:fundId/fees/:id` | Update/delete fee |
| GET/POST | `/api/lmts/:lmtId/notifications` | LMT notification records |

---

## Compliance Rules

| Method | Path | Auth Roles | Description |
|--------|------|------------|-------------|
| POST | `/api/rules` | admin, compliance_officer | Create/update rule set. Required: `{asset_id, qualification_required, lockup_days, jurisdiction_whitelist}` |
| GET | `/api/rules/:assetId` | admin, compliance_officer | Get rules for asset |
| GET | `/api/rules/:assetId/versions` | admin, compliance_officer | Rule version history |
| GET | `/api/composite-rules?assetId=X` | admin, compliance_officer | List composite rules |
| POST | `/api/composite-rules` | admin, compliance_officer | Create composite rule. Required: `{asset_id, name, operator, conditions}`. Operator: AND/OR/NOT |
| PATCH | `/api/composite-rules/:id` | admin, compliance_officer | Update |
| DELETE | `/api/composite-rules/:id` | admin, compliance_officer | Delete |

---

## Decision Records & Integrity Chain

**Roles:** admin (for writes)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/decisions` | List decisions. Query: `?decision_type=X&result=X&limit=50&offset=0` |
| GET | `/api/decisions/:id` | Get by ID |
| GET | `/api/decisions/:id/explain` | Human-readable explanation |
| GET | `/api/decisions/:id/evidence.pdf` | Evidence bundle PDF |
| GET | `/api/decisions/asset/:assetId` | Decisions for asset |
| GET | `/api/decisions/investor/:investorId` | Decisions for investor |
| GET | `/api/decisions/verify-chain` | Verify SHA-256 integrity chain |
| POST | `/api/decisions/seal-all` | Seal all unsealed records (admin only) |

---

## Eligibility

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/eligibility/criteria` | Create criteria. Required: `{fund_structure_id, investor_type, jurisdiction}` |
| POST | `/api/eligibility/check` | Check eligibility. Required: `{investor_id, fund_structure_id}` |
| PUT | `/api/eligibility/criteria/:id/supersede` | Version/supersede criteria |

---

## Onboarding

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/onboarding?asset_id=X` | List by asset or investor |
| POST | `/api/onboarding` | Apply. Required: `{investor_id, asset_id, requested_units}` |
| GET | `/api/onboarding/:id` | Get record |
| POST | `/api/onboarding/:id/check-eligibility` | Run eligibility check |
| POST | `/api/onboarding/:id/review` | Approve/reject. Body: `{decision: "approved"|"rejected"}` |
| POST | `/api/onboarding/:id/allocate` | Allocate units |
| PATCH | `/api/onboarding/:id/handoff` | Update handoff details |

---

## Reports

**Roles:** admin

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reports/compliance/:fundStructureId` | Compliance report JSON |
| GET | `/api/reports/compliance/:fundStructureId/pdf` | Compliance report PDF |
| GET | `/api/reports/annex-iv/:fundStructureId` | AIFMD Annex IV JSON. Query: `?start=&end=` |
| GET | `/api/reports/annex-iv/:fundStructureId/xml` | Annex IV ESMA XML download |
| GET | `/api/reports/annex-iv/aifm/:aifmLei` | AIFM-level aggregate report |
| GET | `/api/reports/annex-iv/aifm/:aifmLei/xml` | AIFM-level aggregate XML |
| GET | `/api/reports/evidence-bundle/:fundStructureId` | Evidence bundle JSON |
| GET | `/api/reports/evidence-bundle/:fundStructureId/download` | Evidence bundle file download |
| GET | `/api/reports/audit-package/:fundId` | Audit package JSON |
| GET | `/api/reports/audit-package/:fundId/pdf` | Audit package PDF |

---

## Dashboard

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard` | Overview stats: funds, investors, events, risk flags, decisions |
| GET | `/api/dashboard/overview` | Alias for above |

---

## Compliance Trend

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/compliance/trend` | 30-day score trend (auto-generates synthetic data if < 2 real snapshots) |
| POST | `/api/compliance/snapshot` | Record today's compliance snapshot |

---

## Calendar & Alerts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar` | Events. Query: `?from=&to=&category=&severity=` |
| GET | `/api/calendar/alerts` | Upcoming alerts. Query: `?days=30` |

---

## Screening

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/screening/:investorId` | Screen single investor |
| POST | `/api/screening/bulk/run` | Bulk screen. Optional body: `{fundStructureId}` |

---

## Readiness Assessment (AIFMD II)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/readiness` | Full assessment (questions + answers + score) |
| GET | `/api/readiness/score` | Score only (dashboard card) |
| PUT | `/api/readiness/:questionKey` | Save answer. Body: `{status: "yes"|"no"|"partial"|"na", notes?}` |
| GET | `/api/readiness/history` | Past snapshots |
| GET | `/api/readiness/export` | PDF export. Query: `?lang=en|de` |

---

## AI & Regulatory Intelligence

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/copilot/chat` | Chat with compliance copilot. Body: `{message, context?}` |
| POST | `/api/copilot/feedback` | Feedback. Body: `{messageId, rating: "up"|"down"}` |
| POST | `/api/regulatory/ingest` | Ingest document (admin). Multipart: `file` + `documentTitle`, `jurisdiction`, `framework` |
| POST | `/api/regulatory/query` | Query knowledge base. Body: `{question, filters?, topK?}` |
| POST | `/api/regulatory/suggest-rules` | AI-suggest rules. Body: `{fundStructureId}` |
| POST | `/api/nl-rules/from-natural-language` | Compile NL → rule. Body: `{description, asset_id}`. Requires `ANTHROPIC_API_KEY` |

---

## Import

**Roles:** admin. Rate limited.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/import/bulk` | JSON bulk import (max 5000 entities) |
| POST | `/api/import/parse-csv` | Parse CSV preview. Multipart: `file` + `entityType` |
| POST | `/api/import/csv` | CSV import. Multipart: `file` + `entityType` + `columnMapping` (JSON) |
| GET | `/api/import/templates/:entityType` | Download CSV template |

**Entity types:** `investors`, `fund_structures`, `holdings`, `eligibility_criteria`

---

## Other Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/events` | admin | Query system events |
| GET/POST/PATCH/DELETE | `/api/webhooks` | admin | Webhook CRUD |
| GET | `/api/webhooks/:id/deliveries` | admin | Delivery log |
| GET | `/api/templates` | Yes | List regulatory rule templates |
| GET | `/api/templates/:id` | Yes | Get template details |
| GET | `/api/rule-packs` | Yes | List AIFMD II rule packs |
| POST | `/api/rule-packs/apply` | Yes | Apply rule pack to fund |
| POST | `/api/scenarios/impact` | Yes | What-if scenario analysis |
| GET | `/api/investor-documents/:investorId` | Yes | List KYC documents |
| POST | `/api/investor-documents/:investorId/upload` | Yes | Upload document (5MB max, PDF/JPEG/PNG/TIFF/DOC/DOCX) |
| GET | `/api/investor-documents/file/:documentId` | Yes | Download document |
| PATCH | `/api/investor-documents/file/:documentId/verify` | Yes | Verify document |
| PATCH | `/api/investor-documents/file/:documentId/reject` | Yes | Reject document |
| DELETE | `/api/investor-documents/file/:documentId` | Yes | Delete document |
| GET | `/api/news` | Yes | Regulatory news feed (BaFin, ESMA, ECB, EBA). Cached 30min |
| GET | `/api/tenants/current` | Yes | Current tenant info |
| GET | `/api/tenants` | admin | List all tenants |
| GET | `/api/audit-trail` | admin | Query audit log |
| GET | `/api/public/integrity/verify` | None | Public hash chain verification (rate limited: 10/min) |
| GET | `/api/integrity/verify` | Yes | Detailed integrity verification |

---

## Common Error Responses

| Status | Error Code | Meaning |
|--------|-----------|---------|
| 400 | `VALIDATION_ERROR` | Invalid input / missing required fields |
| 401 | `UNAUTHORIZED` | Missing or invalid JWT |
| 403 | `FORBIDDEN` | Insufficient role permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 422 | `BUSINESS_LOGIC_ERROR` | Business rule violation (e.g., AIFMD II requirements) |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |
| 503 | `SERVICE_UNAVAILABLE` | External service not configured |

---

## Notes

- All IDs are UUIDs
- Multi-tenant: data scoped by `tenant_id` derived from JWT
- Decision records form a SHA-256 append-only hash chain for tamper evidence
- DSGVO (GDPR) compliance: investor export (Art. 15/20) and erasure (Art. 17) built in
- AIFMD II enforcement: fund activation requires 2 EU-resident senior persons + 2 LMTs for open-ended funds
- OpenAPI spec available at `docs/api-spec.yaml`
