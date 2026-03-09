# Scale Test Report

**Date:** 2026-02-23  
**Status:** Scripts created, pending local DB execution  
**Dataset:** 50 funds, 100 assets, 1000 investors, 500 holdings, 200 transfers, 100 decisions, 500 events

## Scripts Created

| Script | Purpose |
|--------|---------|
| `scripts/seed-scale-test.ts` | Seeds large dataset with realistic distributions |
| `scripts/benchmark-endpoints.ts` | Benchmarks all major API endpoints (p50/p95/p99) |
| `migrations/053_scale_test_indexes.sql` | Adds missing indexes identified by query analysis |

## How to Run

```bash
# 1. Seed the scale test data
npx tsx scripts/seed-scale-test.ts

# 2. Apply the new indexes
npx tsx scripts/migrate.ts

# 3. Run the benchmark
npx tsx scripts/benchmark-endpoints.ts
```

## Benchmark Endpoints

| Endpoint | Method |
|----------|--------|
| `/api/dashboard` | GET |
| `/api/fund-structures` | GET |
| `/api/fund-structures/:id` | GET |
| `/api/investors` | GET |
| `/api/investors/:id` | GET |
| `/api/compliance-decisions` | GET |
| `/api/transfers` | GET |
| `/api/audit-trail` | GET |
| `/api/readiness` | GET |
| `/api/reports/annex-iv/:fundId` | POST |
| `/api/reports/evidence-bundle/:fundId` | POST |

**Thresholds:** 🟡 SLOW > 500ms (p95), 🔴 CRITICAL > 2000ms (p95)

## Index Analysis

### Existing Indexes (Good Coverage)

The codebase already has solid index coverage for:
- Primary key lookups (all tables)
- `holdings.investor_id`, `holdings.asset_id` (foreign key lookups)
- `transfers.asset_id + executed_at`, `from_investor_id`, `to_investor_id`
- `events.timestamp`, `events.entity_type + entity_id`, `events.event_type`
- `decision_records.asset_id + decided_at`, `decision_records.subject_id`
- `investors.jurisdiction`, `investors.investor_type`, `investors.kyc_status`
- Tenant-scoped indexes on all major tables

### Missing Indexes Added (migration 053)

| Table | Index | Reason |
|-------|-------|--------|
| `decision_records` | `(tenant_id, result)` | Compliance decisions page filters by result (approved/rejected) |
| `decision_records` | `(tenant_id, result, decided_at DESC)` | Dashboard compliance trend chart groups by result + time |
| `transfers` | `(tenant_id, status, executed_at DESC)` | Transfer list with status tabs (pending/executed/rejected) |
| `events` | `(tenant_id, timestamp DESC) INCLUDE (event_type, entity_type, entity_id)` | Audit trail listing — covering index avoids heap lookups |
| `investors` | `(tenant_id, kyc_status, kyc_expiry) WHERE kyc_expiry IS NOT NULL` | Dashboard KYC expiry widget needs partial index |
| `holdings` | `(tenant_id, asset_id, units DESC) WHERE units > 0` | Cap table sorted by position size — partial index |
| `fund_structures` | `(tenant_id, status)` | Active fund listings on dashboard and selectors |
| `investors` | `(tenant_id, investor_type, kyc_status)` | Dashboard investor type distribution chart |

### Query Patterns Analyzed

| Repository | Query Pattern | Index Status |
|------------|---------------|-------------|
| `investor-repository.ts` | `SELECT * FROM investors ORDER BY created_at DESC` | ✅ `idx_investors_created_at` |
| `investor-repository.ts` | `WHERE jurisdiction = ?` | ✅ `idx_investors_jurisdiction` |
| `fund-structure-repository.ts` | `WHERE id = $1 AND tenant_id = $2` | ✅ PK + tenant index |
| `fund-structure-repository.ts` | `WHERE domicile = ?` | ✅ `idx_fund_structures_domicile` |
| `holding-repository.ts` | `WHERE asset_id = ? AND units > 0 ORDER BY units DESC` | 🆕 Added partial index |
| `holding-repository.ts` | `WHERE investor_id = ? AND asset_id = ?` | ✅ UNIQUE constraint |
| `transfer-repository.ts` | `WHERE asset_id = ? ORDER BY executed_at DESC` | ✅ `idx_transfers_asset_executed` |
| `transfer-repository.ts` | `WHERE from_investor_id = ? OR to_investor_id = ?` | ✅ Separate indexes |
| `decision-record-repository.ts` | `WHERE asset_id = ? ORDER BY decided_at DESC` | ✅ `idx_dr_asset_decided` |
| `decision-record-repository.ts` | `WHERE subject_id = ?` | ✅ `idx_dr_subject` |
| `event-repository.ts` | `WHERE entity_type = ? AND entity_id = ?` | ✅ `idx_events_entity` |
| `event-repository.ts` | `ORDER BY timestamp DESC LIMIT ?` | 🆕 Covering index added |

## Notes

- No local DB was available at analysis time; scripts are ready to run
- All scripts use the same DB connection pattern as existing seed scripts (`src/backend/db.ts`)
- The benchmark script writes an updated version of this report with actual latency data
- Index migration is safe to apply (all `CREATE INDEX IF NOT EXISTS`)
