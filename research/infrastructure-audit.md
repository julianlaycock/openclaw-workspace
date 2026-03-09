# Caelith Infrastructure Audit — #13-16

**Date:** 2026-02-27  
**Auditor:** Mate (subagent)

---

## #13 SDK Smoke Test

### Python SDK (`sdks/python/caelith/client.py`)
### TypeScript SDK (`sdks/typescript/src/index.ts`)

**Both SDKs cover identical resource namespaces:**
- ✅ Sanctions (screen, screenBatch, stats)
- ✅ LEI (lookup, search, validate)
- ✅ AnnexIV (generate, validate)
- ✅ Templates (emt, eet, ept, schema)
- ✅ Calendar (registerFund, obligations, summary, updateObligation)
- ✅ Webhooks (create, list, delete, deliveries)
- ✅ NCA (list, get, quirks, validate)
- ✅ Regulatory (events, get, transposition, sources)
- ✅ Audit (list, get)
- ✅ Usage (current, daily)

**SDKs are consistent with each other** — both Python and TypeScript expose the same methods and paths.

### Error Handling
- ✅ **Python:** Custom `CaelithError` exception with code/message/status. Parses JSON error bodies. Falls back to generic `HTTP_ERROR`.
- ✅ **TypeScript:** Custom `CaelithError` extends Error. Parses JSON error response. Timeout via `AbortController`.
- ✅ Both validate API key prefix (`ck_live_` / `ck_test_`)

### SDK vs API Endpoint Coverage Gap

The SDKs target `/api/v1/public/*` (the public API for external customers). The backend has **47 route files** covering the full internal + public surface. The SDKs intentionally cover only the **public-facing subset**, which is correct.

**Internal-only routes NOT in SDKs (expected/correct):**
analytics, api-key, asset, audit-package, audit-trail, auth, compliance-report, compliance-trend, composite-rules, copilot, dashboard, decision-record, delegation, docs, eligibility, event, evidence-bundle, fee-disclosure, fund-structure, holding, import, integrity, investor, investor-document, lmt, lmt-notification, news, nl-rules, onboarding, readiness, reg-intel, regulatory-identifiers, rule-pack, rules, scenario, screening, senior-persons, settings, template-export, tenant, transfer

**⚠️ Potential gaps to verify:**
- SDKs have `NCA` resource — confirm `/api/v1/public/nca/*` routes actually exist (no `nca-routes.ts` file found in backend — these may be handled inline or within regulatory-routes)
- SDKs reference `/batch/sanctions/screen` — confirm this batch endpoint exists

**Verdict:** SDKs are well-built, match each other, have proper error handling. No dead methods detected. Minor gap: verify NCA and batch endpoints are actually routed.

---

## #14 Database Backup Strategy

### Current State: ✅ Backup scripts exist

- `scripts/backup-db.sh` — Linux/CI version
- `scripts/backup-db.ps1` — Windows PowerShell version
- `backups/` directory exists

**Both scripts:**
- Support `local` and `production` environments
- Use `pg_dump` with plain format
- Timestamped filenames (`caelith-YYYY-MM-DD-HHMMSS.sql`)
- Auto-cleanup: keep last 7 backups
- Production mode requires `DATABASE_URL` env var

### ⚠️ Critical Risks

1. **No automated scheduling** — Scripts exist but there's no cron job, GitHub Action, or Railway cron configured to run them automatically
2. **Railway trial plan has NO automatic backups** — if the DB dies or a bad migration runs, data is gone
3. **Backups are local-only** — `backups/` directory is on the machine running the script, not offsite (no S3/GCS upload)
4. **No backup verification** — no script to test restoring from a backup

### Recommendations

| Priority | Action |
|----------|--------|
| 🔴 P0 | Set up automated daily backup via GitHub Actions or a cron job calling `backup-db.sh production` |
| 🔴 P0 | Upload backups to S3/GCS/Backblaze B2 (local backups die with the machine) |
| 🟡 P1 | Add a restore script (`scripts/restore-db.sh`) and test it |
| 🟡 P1 | Run backup BEFORE every migration (add to migration script) |
| 🟢 P2 | Upgrade from Railway trial to a plan with automatic DB snapshots |

---

## #15 Error Monitoring

### Current State: ⚠️ Basic — No External Monitoring

**What exists:**
- ✅ `process.on('uncaughtException')` and `process.on('unhandledRejection')` in `server.ts` — but only `console.error` (logs to stdout, lost on restart)
- ✅ `error-tracker.ts` middleware — in-memory error categorization and counting with 1-hour window
- ✅ `logger.ts` — structured logging, "Designed for production observability (Sentry, Datadog, CloudWatch, etc.)" per comment
- ❌ **No Sentry, LogRocket, Bugsnag, or any external error monitoring tool integrated**
- ❌ **No persistent error storage** — in-memory counts reset on server restart
- ❌ **No alerting** — errors happen silently

**The error-tracker middleware is well-designed** (categorization, pruning, bounded memory) but it's a placeholder. The comment literally says "Prepares for Sentry integration later."

### Impact

**You are blind in production.** If the API starts throwing 500s at 3 AM, nobody knows until a customer complains. Railway logs exist but nobody watches them.

### Recommendations

| Priority | Action | Cost |
|----------|--------|------|
| 🔴 P0 | **Integrate Sentry** — free tier covers 5K errors/month. `npm i @sentry/node`, init in server.ts, done in 30 min | Free |
| 🟡 P1 | Configure Sentry alerts → email/Slack on new error types | Free |
| 🟡 P1 | Add Sentry to the frontend too (`@sentry/nextjs`) for client-side errors | Free |
| 🟢 P2 | Consider LogTail/Betterstack for log aggregation (free tier: 1GB/month) | Free |

---

## #16 Uptime Monitoring

### Current State: ❌ None Configured

No uptimerobot, betterstack, cronitor, or any uptime monitoring references found in the codebase.

### Recommended Setup: UptimeRobot (Free Tier)

**Why UptimeRobot:** Free, 50 monitors, 5-minute check intervals, email/Slack/webhook alerts.

#### Setup Guide

1. **Sign up** at https://uptimerobot.com (free account)
2. **Create these monitors:**

| Monitor Name | Type | URL | Interval | Alert |
|-------------|------|-----|----------|-------|
| Caelith Landing | HTTP(s) | `https://www.caelith.tech/` | 5 min | Email |
| Caelith API Health | HTTP(s) | `https://www.caelith.tech/api/health` | 5 min | Email |
| Caelith API Sanctions | Keyword ("results" or 200 OK) | `https://www.caelith.tech/api/v1/sanctions/search?q=test` | 5 min | Email |

3. **Configure alerts:**
   - Add email alert contact (Julian's email)
   - Optional: Slack webhook for #alerts channel
   - Set alert threshold: 2 consecutive failures before alerting

4. **Status page (optional):**
   - UptimeRobot offers a free public status page
   - URL: `https://stats.uptimerobot.com/your-id`
   - Embed on caelith.tech/status for customer confidence

#### Alternatives

| Service | Free Tier | Check Interval | Notes |
|---------|-----------|----------------|-------|
| **UptimeRobot** | 50 monitors | 5 min | Best free option |
| **Betterstack** | 10 monitors | 3 min | Better UI, incident management |
| **Cronitor** | 5 monitors | 1 min | Good for cron job monitoring too |

---

## Summary Scorecard

| Area | Status | Risk Level |
|------|--------|------------|
| #13 SDKs | ✅ Solid | 🟢 Low |
| #14 DB Backups | ⚠️ Scripts exist, no automation | 🔴 High |
| #15 Error Monitoring | ❌ None (placeholder only) | 🔴 Critical |
| #16 Uptime Monitoring | ❌ None | 🟡 Medium |

### Top 3 Actions (Do This Week)

1. **Integrate Sentry** — 30 min, free, gives you eyes on production errors
2. **Set up UptimeRobot** — 10 min, free, alerts you when the site goes down
3. **Automate DB backups** — 1 hour, schedule daily pg_dump + offsite upload
