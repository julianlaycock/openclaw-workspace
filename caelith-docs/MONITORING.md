# Monitoring & Observability

## Health Endpoint

**URL:** `GET /api/health`  
**Auth:** None required  
**Check interval:** Every 5 minutes

### Expected Response (200 OK)

```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime": 12345.678,
  "timestamp": "2026-02-23T12:00:00.000Z",
  "db": "connected"
}
```

### Degraded Response (503)

```json
{
  "status": "error",
  "version": "0.1.0",
  "uptime": 12345.678,
  "timestamp": "2026-02-23T12:00:00.000Z",
  "db": "error"
}
```

### Additional Endpoints

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /api/health` | None | Liveness + DB check |
| `GET /api/health/ready` | None | Deep readiness probe |
| `GET /api/health/errors` | Admin | Error counts (last hour) |

---

## UptimeRobot Setup

1. Create a new **HTTP(s)** monitor
2. **URL:** `https://your-domain.com/api/health`
3. **Monitoring interval:** 5 minutes
4. **Alert condition:** Status code ≠ 200 OR keyword "ok" missing from response body
5. **Alert contacts:** Configure email/Slack/PagerDuty as needed
6. **Timeout:** 30 seconds

### Recommended Monitors

| Monitor | URL | Interval | Alert |
|---|---|---|---|
| API Health | `/api/health` | 5 min | Status ≠ 200 |
| DB Readiness | `/api/health/ready` | 5 min | Status ≠ 200 |

---

## Sentry Setup

### Environment Variable

```env
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

### What to Capture

- All unhandled exceptions (500 errors)
- Unhandled promise rejections
- Database connection failures
- External API timeouts (screening, LLM providers)

### What to Exclude

- 4xx client errors (validation, auth failures)
- Rate limit responses (429)
- Health check requests

### Recommended `sentry.init` Config

```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions for performance
  ignoreErrors: [/CORS/, /not allowed/],
  beforeSend(event) {
    // Strip PII from error events
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
    }
    return event;
  },
});
```

---

## Key Metrics to Monitor

### Error Rate
- **Target:** < 1% of total requests
- **Alert:** > 5% over 5-minute window
- **Source:** `GET /api/health/errors` or Sentry dashboard

### P95 Latency
- **Target:** < 500ms for API endpoints
- **Alert:** > 2s sustained over 5 minutes
- **Source:** Request logging (`durationMs` field in structured logs)

### Database Connection Pool
- **Target:** < 80% pool utilization (< 16 of 20 connections)
- **Alert:** Pool exhaustion or > 90% for 2+ minutes
- **Source:** `pg` pool events, or query `SELECT count(*) FROM pg_stat_activity`
- **Config:** `PG_POOL_MAX` env var (default: 20)

### Memory Usage
- **Target:** < 512MB RSS for the Node.js process
- **Alert:** > 80% of container memory limit
- **Source:** `process.memoryUsage()` — can be added to health endpoint if needed
- **Note:** Watch for memory leaks via increasing RSS over time without corresponding load increase

### Uptime
- **Target:** 99.9% (< 8.7h downtime/year)
- **Source:** UptimeRobot dashboard
