# Sentry Setup for Caelith

## What It Does

Caelith's backend has Sentry error tracking pre-wired (`src/backend/services/error-tracking.ts`). When configured, it automatically captures:

- **Unhandled exceptions** in Express routes
- **Explicit error reports** via `captureException()` (used throughout the codebase)
- **Performance traces** (10% sampling in production, 100% in dev)
- **Environment & release tags** for filtering in the Sentry dashboard

Without a DSN configured, everything is a no-op — errors still go to the structured logger.

## Setup Steps (~5 minutes)

1. **Create a free Sentry account** at [sentry.io](https://sentry.io)
2. **Create a new project** → select **Node.js** as the platform
3. **Copy the DSN** from the project settings (looks like `https://abc123@o123.ingest.sentry.io/456`)
4. **Set the environment variable** in Railway:
   - Go to your Railway project → Backend service → Variables
   - Add: `SENTRY_DSN` = `<your DSN>`
5. **Redeploy** the backend service

That's it. The backend will auto-initialize Sentry on next startup.

## Optional: Install the SDK

The backend dynamically imports `@sentry/node`. If it's not already in `package.json`:

```bash
cd src/backend
npm install @sentry/node
```

## What's Covered

| Area | Tracked? |
|------|----------|
| Express route errors | ✅ Via error handler middleware |
| LEI/GLEIF lookup failures | ✅ Via captureException |
| Database errors | ✅ Via captureException |
| Screening service errors | ✅ Via captureException |
| Frontend errors | ❌ Not yet (would need @sentry/nextjs) |

## Verify It Works

After deploying with the DSN set, check your Sentry dashboard. You should see the initialization event. To trigger a test error, you can temporarily add a route that throws.
