# Caelith Operational Runbook

## Table of Contents

1. [Deployment](#deployment)
2. [Running Migrations](#running-migrations)
3. [Accessing the Railway Database](#accessing-the-railway-database)
4. [Checking Logs](#checking-logs)
5. [Restarting Services](#restarting-services)
6. [Rolling Back a Bad Deploy](#rolling-back-a-bad-deploy)
7. [Seeding Demo Data](#seeding-demo-data)
8. [Adding a New User/Tenant Manually](#adding-a-new-usertenant-manually)
9. [Common Error Codes](#common-error-codes)
10. [Running E2E Tests](#running-e2e-tests)

---

## Deployment

Caelith deploys automatically via **Railway** from GitHub.

### How it works

1. Push to `main` branch → Railway detects the commit → auto-builds and deploys
2. Railway runs `npm run build` (backend TSC + frontend Next.js build)
3. Railway starts the app with `npm run start` (`node dist/backend/server.js`)
4. The frontend is served by Next.js on the same deployment or a separate service

### Deploy manually from Railway dashboard

1. Go to [railway.app](https://railway.app) → your project
2. Click on the service → **Deployments** tab
3. Click **Deploy** to trigger a manual redeploy from latest commit

### Environment variables

Set in Railway dashboard → Service → **Variables** tab:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (auto-set by Railway Postgres plugin) |
| `JWT_SECRET` | Yes | Secret for signing JWTs |
| `NODE_ENV` | Yes | `production` |
| `REGISTRATION_MODE` | No | `open`, `invite`, or `disabled` (default: `disabled`) |
| `INVITE_CODE` | No | Required if REGISTRATION_MODE=invite |
| `ANTHROPIC_API_KEY` | No | For AI copilot / NL rule compiler |
| `PORT` | No | Railway sets this automatically |

---

## Running Migrations

Migrations are in `scripts/migrate.ts` and run automatically on app startup.

### Run manually (local)

```bash
npm run migrate
```

### Run manually (Railway)

1. Railway dashboard → Service → **Settings** → **Shell**
2. Or use Railway CLI:
   ```bash
   railway run npm run migrate
   ```

### Migration files

Located in `src/backend/migrations/` — they run in order. The migration runner tracks which have been applied via a `migrations` table.

---

## Accessing the Railway Database

### Via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Connect to your project
railway link

# Open psql shell
railway connect postgres
```

### Via connection string

1. Railway dashboard → Postgres plugin → **Connect** tab
2. Copy the `DATABASE_URL`
3. Use any Postgres client:
   ```bash
   psql "postgresql://user:pass@host:port/dbname"
   ```

### Via GUI tools

Use the connection string with:
- **pgAdmin** (desktop)
- **DBeaver** (desktop)
- **Supabase Studio** or **TablePlus**

> ⚠️ Railway DB connections require the Railway proxy or public networking to be enabled.

---

## Checking Logs

### Railway dashboard

1. Go to your service → **Deployments** tab
2. Click on a deployment → **View Logs**
3. Or click **Observability** → **Logs** for real-time streaming

### Railway CLI

```bash
railway logs
railway logs --follow  # tail -f equivalent
```

### What to look for

- `[ERROR]` — Application errors
- `[WARN]` — Warnings (non-fatal)
- `Migration applied:` — Migration success
- `Server listening on port` — Startup success
- `SIGTERM` — Graceful shutdown signal

### Structured logging

The app uses a structured logger (`src/backend/lib/logger.ts`). Logs include:
- Timestamp
- Level (info/warn/error)
- Request ID (for tracing)
- Tenant ID (for multi-tenant debugging)

---

## Restarting Services

### Via Railway dashboard

1. Service → **Deployments** tab
2. Click **⟳ Redeploy** on the latest deployment

### Via Railway CLI

```bash
railway up  # Triggers a new deployment
```

### Force restart without code changes

Push an empty commit:
```bash
git commit --allow-empty -m "chore: force redeploy"
git push
```

---

## Rolling Back a Bad Deploy

### Option 1: Revert in Railway dashboard

1. Service → **Deployments** tab
2. Find the last good deployment
3. Click **⟳ Redeploy** on that deployment

### Option 2: Git revert

```bash
git revert HEAD
git push origin main
# Railway auto-deploys the revert
```

### Option 3: Railway rollback

```bash
# List recent deployments
railway deployments

# Rollback to specific deployment
railway rollback <deployment-id>
```

> ⚠️ **Database migrations are NOT auto-reverted.** If the bad deploy included a migration, you may need to manually undo schema changes. Always write migrations that are backward-compatible.

---

## Seeding Demo Data

### Available seed scripts

```bash
# Full demo data (recommended for showcases)
npm run seed:demo

# Basic seed data (minimal)
npm run seed:basic

# Showcase seed (maximum data for demos)
npm run seed:showcase
```

All seed scripts first run `npm run normalize:admin` to ensure the admin user exists.

### On Railway

```bash
railway run npm run seed:demo
```

### What gets seeded

- Default tenant
- Admin user (email from env or default)
- Sample fund structures (Spezial-AIF, SICAV, etc.)
- Sample investors with various KYC statuses
- Assets, holdings, transfers
- Eligibility criteria
- Compliance rules
- Decision records with integrity chain

---

## Adding a New User/Tenant Manually

### Add a user via API

```bash
# If REGISTRATION_MODE=open:
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!","name":"New User"}'
```

### Add a user via database

```sql
-- Generate a bcrypt hash for the password first (or use the app)
INSERT INTO users (id, email, password_hash, name, role, tenant_id)
VALUES (
  gen_random_uuid(),
  'user@example.com',
  '$2b$10$...', -- bcrypt hash
  'New User',
  'viewer',     -- or 'admin', 'compliance_officer'
  '00000000-0000-0000-0000-000000000099' -- default tenant
);
```

### Add a new tenant

```sql
INSERT INTO tenants (id, name, slug, status, max_funds, max_investors)
VALUES (
  gen_random_uuid(),
  'New Tenant GmbH',
  'new-tenant',
  'active',
  50,
  1000
);

-- Then create admin user for that tenant
INSERT INTO users (id, email, password_hash, name, role, tenant_id)
VALUES (
  gen_random_uuid(),
  'admin@newtenant.com',
  '$2b$10$...', -- bcrypt hash
  'Tenant Admin',
  'admin',
  '<tenant-id-from-above>'
);
```

### User roles

| Role | Permissions |
|------|------------|
| `admin` | Full access: CRUD all entities, webhooks, imports, reports, audit trail |
| `compliance_officer` | Write access to investors, assets, funds, rules, transfers, onboarding |
| `viewer` | Read-only access to all data |

---

## Common Error Codes

| HTTP Status | Error Code | Meaning | What to do |
|-------------|-----------|---------|------------|
| 400 | `VALIDATION_ERROR` | Bad request body / missing fields | Check API docs for required fields |
| 401 | `UNAUTHORIZED` | Missing/invalid/expired JWT | Re-login or refresh token |
| 403 | `FORBIDDEN` | User lacks required role | Check user role in DB |
| 404 | `NOT_FOUND` | Resource doesn't exist | Verify UUID, check tenant scoping |
| 409 | `CONFLICT` | Duplicate (e.g., email already exists) | Use different value |
| 422 | `BUSINESS_LOGIC_ERROR` | Business rule violation | Read error message — usually AIFMD II requirement not met |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests | Wait and retry. Auth endpoints: 10/min. API: 100/min. Export: 5/min |
| 500 | `INTERNAL_ERROR` | Server bug | Check logs for stack trace |
| 503 | `SERVICE_UNAVAILABLE` | External service missing (e.g., no ANTHROPIC_API_KEY) | Set required env var |

### Common business logic errors

| Error message | Cause | Fix |
|--------------|-------|-----|
| `Cannot activate fund: AIFMD II Art. 8(1)(e) requires at least 2 senior management persons resident in the EU` | Trying to set fund status to 'active' | Add 2+ EU-resident senior persons first |
| `Cannot activate open-ended fund: AIFMD II Art. 16(2b) requires at least 2 liquidity management tools` | Open-ended fund missing LMTs | Add 2+ LMTs before activating |
| `Cannot delete: this fund structure has N linked asset(s)` | Trying to delete fund with assets | Remove/reassign assets first |
| `units must be a positive number` | Zero or negative units in transfer/holding | Use positive number |

---

## Running E2E Tests

### Prerequisites

- Node.js ≥ 20
- PostgreSQL running (local or Docker)
- `DATABASE_URL` set in `.env`

### Run all tests

```bash
npm test           # Unit tests (vitest)
npm run test:e2e   # E2E tests (vitest with e2e config)
npm run test:all   # Both unit + E2E
```

### Run with UI

```bash
npm run test:ui    # Opens Vitest UI in browser
```

### Run specific test file

```bash
npx vitest run src/backend/__tests__/my-test.test.ts
```

### Quality check (full pipeline)

```bash
npm run quality:check
# Runs: sync check → TypeScript type check → all tests
```

### Test configuration

- `vitest.config.ts` — Unit test config
- `vitest.e2e.config.ts` — E2E test config
- `vitest.all.config.ts` — Combined config

### Common test issues

| Issue | Fix |
|-------|-----|
| DB connection error | Ensure `DATABASE_URL` is set and Postgres is running |
| Port already in use | Run `node scripts/free-port.js 3001` |
| Stale Next.js cache | Run `npm run clean:frontend` |
| Test timeout | Increase timeout in vitest config or check DB performance |
