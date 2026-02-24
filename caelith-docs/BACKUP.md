# Caelith Backup & Recovery Procedures

## Railway Database Backups

### What Railway Provides

Railway's managed PostgreSQL includes:

- **Point-in-time recovery (PITR):** Available on Pro plan. Continuous WAL archiving with ability to restore to any point in time within the retention window.
- **Automatic daily snapshots:** Railway takes daily snapshots of the database volume (Pro plan).
- **No automatic backups on free/hobby plan.** You must handle backups yourself.

> ⚠️ **Verify your plan level.** If on the free/hobby tier, Railway provides NO automatic backups. Manual `pg_dump` is essential.

### How to check your backup status

1. Railway dashboard → Postgres plugin → **Settings**
2. Look for "Backups" or "Point-in-time Recovery" section
3. If not visible, your plan doesn't include automated backups

---

## Manual Backup with pg_dump

### Prerequisites

- PostgreSQL client tools installed (`pg_dump`, `psql`)
- Railway CLI installed and authenticated
- `DATABASE_URL` from Railway dashboard

### Full database dump

```bash
# Get connection string from Railway
railway variables | grep DATABASE_URL

# Full dump (custom format — recommended for restore flexibility)
pg_dump "$DATABASE_URL" \
  --format=custom \
  --no-owner \
  --no-acl \
  --file=caelith-backup-$(date +%Y%m%d-%H%M%S).dump

# Full dump (plain SQL — human-readable, larger)
pg_dump "$DATABASE_URL" \
  --format=plain \
  --no-owner \
  --no-acl \
  --file=caelith-backup-$(date +%Y%m%d-%H%M%S).sql
```

### Schema-only dump (no data)

```bash
pg_dump "$DATABASE_URL" \
  --schema-only \
  --no-owner \
  --file=caelith-schema-$(date +%Y%m%d).sql
```

### Data-only dump

```bash
pg_dump "$DATABASE_URL" \
  --data-only \
  --no-owner \
  --file=caelith-data-$(date +%Y%m%d).sql
```

### Dump specific tables

```bash
# Just investors and holdings (e.g., for partial restore)
pg_dump "$DATABASE_URL" \
  --format=custom \
  --table=investors \
  --table=holdings \
  --file=caelith-investors-$(date +%Y%m%d).dump
```

### Using Railway CLI proxy

```bash
# This opens a local proxy to the Railway DB
railway connect postgres

# In another terminal, dump via localhost proxy
pg_dump postgresql://localhost:PORT/railway \
  --format=custom \
  --file=backup.dump
```

---

## Recommended Backup Schedule

| Frequency | What | Retention | Method |
|-----------|------|-----------|--------|
| **Daily** | Full `pg_dump` (custom format) | 30 days | Automated script / CI job |
| **Weekly** | Full dump uploaded to external storage (S3/GCS) | 90 days | CI pipeline |
| **Before each deploy** | Schema + data snapshot | Until next deploy | Pre-deploy CI step |
| **Before destructive operations** | Targeted table dumps | 7 days | Manual |

### Automation example (GitHub Actions)

```yaml
# .github/workflows/backup.yml
name: Database Backup
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:       # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Install PostgreSQL client
        run: sudo apt-get install -y postgresql-client

      - name: Dump database
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          pg_dump "$DATABASE_URL" \
            --format=custom \
            --no-owner \
            --no-acl \
            --file=caelith-backup-$(date +%Y%m%d-%H%M%S).dump

      - name: Upload to artifact storage
        uses: actions/upload-artifact@v4
        with:
          name: db-backup-${{ github.run_id }}
          path: "*.dump"
          retention-days: 30
```

> For production, upload to S3/GCS instead of GitHub artifacts.

---

## Restore Procedures

### Restore from custom format dump

```bash
# Create a fresh database (or use existing)
# WARNING: This will overwrite existing data!

# Option 1: Restore into existing DB (drops and recreates objects)
pg_restore \
  --dbname="$DATABASE_URL" \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  caelith-backup-20260223.dump

# Option 2: Restore into a new database
createdb -h HOST -U USER caelith_restored
pg_restore \
  --dbname=caelith_restored \
  --no-owner \
  --no-acl \
  caelith-backup-20260223.dump
```

### Restore from plain SQL

```bash
psql "$DATABASE_URL" < caelith-backup-20260223.sql
```

### Restore specific tables

```bash
# List contents of a custom dump
pg_restore --list caelith-backup.dump

# Restore only specific tables
pg_restore \
  --dbname="$DATABASE_URL" \
  --table=investors \
  --table=holdings \
  --no-owner \
  --data-only \
  caelith-backup.dump
```

### Railway PITR restore (Pro plan)

1. Railway dashboard → Postgres plugin → **Backups** tab
2. Select the point in time you want to restore to
3. Railway creates a new database instance at that point
4. Update your service's `DATABASE_URL` to point to the restored instance
5. Verify data, then optionally swap back

---

## Disaster Recovery Checklist

### If the database is corrupted or lost:

1. **Stop the app** — Railway dashboard → Service → pause/stop
2. **Identify the most recent backup** — Check local dumps, CI artifacts, or S3
3. **Create a new Railway Postgres instance** (if needed)
4. **Restore the backup** using `pg_restore`
5. **Run migrations** — `railway run npm run migrate` (applies any migrations newer than backup)
6. **Verify data** — Spot-check key tables: `investors`, `fund_structures`, `decision_records`
7. **Update `DATABASE_URL`** if using a new Postgres instance
8. **Restart the app**
9. **Verify integrity chain** — `GET /api/decisions/verify-chain`

### If a bad migration corrupted data:

1. Restore from pre-deploy backup
2. Fix the migration script
3. Re-run migrations
4. Re-deploy

---

## Data Integrity Verification

Caelith includes a built-in integrity verification system:

```bash
# Public endpoint (no auth required, rate limited)
curl https://your-app.railway.app/api/public/integrity/verify

# Authenticated (returns hash details)
curl -H "Authorization: Bearer $TOKEN" \
  https://your-app.railway.app/api/integrity/verify

# Via decisions API
curl -H "Authorization: Bearer $TOKEN" \
  https://your-app.railway.app/api/decisions/verify-chain
```

The decision record integrity chain uses SHA-256 hashes. Each record's hash includes the previous record's hash, forming a tamper-evident append-only chain. After restore, always verify the chain is intact.

---

## Storage Considerations

### Current architecture

- **KYC documents:** Stored as BYTEA in PostgreSQL (max 5MB per file)
- **All data:** In a single Postgres database

### Impact on backups

- Document storage inflates DB size significantly
- A `pg_dump` includes all document binary data
- For large deployments, consider migrating documents to S3/MinIO (noted as TODO in `investor-document-routes.ts`)

### Recommended: Monitor DB size

```sql
-- Check total database size
SELECT pg_size_pretty(pg_database_size(current_database()));

-- Check table sizes
SELECT
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) as total_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;
```
