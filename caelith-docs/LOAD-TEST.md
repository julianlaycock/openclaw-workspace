# Load Testing Guide

## Overview

Load tests validate that the Caelith API meets latency and throughput targets under realistic traffic. Run them before major releases and quarterly.

## Prerequisites

- Node.js 18+
- Access to the target environment (staging or production)
- The benchmark script: `scripts/benchmark.sh` or `scripts/benchmark.ts`

## Running Tests

```bash
# Against staging
API_URL=https://staging.caelith.tech ./scripts/benchmark.sh

# Against production (use with caution — off-peak hours only)
API_URL=https://app.caelith.tech ./scripts/benchmark.sh
```

### Manual quick test with curl

```bash
# Health check latency
time curl -s https://app.caelith.tech/api/health

# Authenticated endpoint
time curl -s -H "Authorization: Bearer $TOKEN" https://app.caelith.tech/api/investors
```

## Latency Targets

| Endpoint | p50 | p95 | p99 |
|----------|-----|-----|-----|
| `GET /api/health` | < 50ms | < 100ms | < 200ms |
| `GET /api/investors` | < 200ms | < 500ms | < 1s |
| `GET /api/investors/:id` | < 150ms | < 400ms | < 800ms |
| `POST /api/investors` | < 300ms | < 700ms | < 1.5s |
| `GET /api/documents` | < 200ms | < 500ms | < 1s |
| `POST /api/auth/login` | < 300ms | < 600ms | < 1s |

**Throughput target:** ≥ 50 requests/second sustained for read endpoints.

## Interpreting Results

### What to look for

- **p95 exceeding targets** → investigate slow queries or missing indexes
- **Error rate > 1%** → check for connection pool exhaustion or rate limiting
- **Latency increasing over time** → possible memory leak or connection exhaustion
- **Timeouts** → check Railway resource limits and database connection count

### Common issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| High p99, normal p50 | Slow queries on cold cache | Add database indexes |
| Increasing latency | Connection pool exhaustion | Increase pool size or fix leaks |
| 429 errors | Rate limiting | Adjust rate limits or reduce test concurrency |
| 5xx errors under load | Memory/CPU limits | Scale Railway service |

## When to Run

| Trigger | Environment | Notes |
|---------|------------|-------|
| Before major release | Staging | Mandatory — block release if targets missed |
| Quarterly | Production (off-peak) | Lightweight — 50% of full load |
| After infrastructure change | Staging | DB migration, Railway plan change, etc. |
| After performance fix | Staging | Verify improvement |

## Recording Results

Save results in `docs/load-test-results/` with filename `YYYY-MM-DD-<description>.md`:

```markdown
# Load Test — 2026-02-23 — Pre-release v1.2

- **Environment:** Staging
- **Duration:** 5 minutes
- **Concurrency:** 20 users
- **Results:** [paste summary]
- **Pass/Fail:** PASS
- **Notes:** All endpoints within targets
```
