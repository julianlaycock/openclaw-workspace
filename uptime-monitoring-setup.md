# Caelith Production — Monitoring, SSL & Observability Setup Guide

**Date:** 2026-02-23  
**Status:** Documentation only — Julian executes signups manually  
**Domain:** https://www.caelith.tech

---

## 1. SSL Verification Results

**Checked:** 2026-02-23 12:26 UTC

| Check | Result |
|-------|--------|
| HTTPS connection | ✅ Successful (HTTP 200) |
| SSL certificate | ✅ Valid (site loads over HTTPS without errors) |
| Domain match | ✅ `www.caelith.tech` matches certificate |
| Content served | ✅ Full landing page rendered ("Compliance-Plattform für EU-Fondsverwalter") |
| HSTS header | ⚠️ Not confirmed in fetch metadata — **Action:** verify via `curl -I https://www.caelith.tech` and check for `Strict-Transport-Security` header. If missing, add via Railway or Vercel config. |

### Recommended HSTS action

If HSTS is not set, add this response header in your hosting config:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

For Railway: add via a custom `next.config.js` headers block or reverse proxy config.

---

## 2. UptimeRobot Setup (Free Tier)

**URL:** https://uptimerobot.com  
**Plan:** Free — 50 monitors, 5-minute intervals, email/webhook alerts

### Step 1: Create Account

1. Go to https://uptimerobot.com/signUp
2. Sign up with **julian.laycock@caelith.tech**
3. Verify email

### Step 2: Add Alert Contact

1. Go to **My Settings** → **Alert Contacts** → **Add Alert Contact**
2. Type: **E-mail**
3. Email: `julian.laycock@caelith.tech`
4. Friendly name: `Julian`
5. Click **Create Alert Contact** → confirm via email

### Step 3: Create Monitor 1 — Landing Page

1. Click **+ Add New Monitor** (top left)
2. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** `Caelith — Landing Page`
   - **URL:** `https://www.caelith.tech`
   - **Monitoring Interval:** 5 minutes
3. Under **Alert Contacts**, select `Julian (julian.laycock@caelith.tech)`
4. Click **Create Monitor**

### Step 4: Create Monitor 2 — API Health

1. Click **+ Add New Monitor**
2. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** `Caelith — API Health`
   - **URL:** `https://www.caelith.tech/api/health`
   - **Monitoring Interval:** 5 minutes
   - **Keyword (optional):** If the endpoint returns JSON, use Keyword Type = "Keyword Exists" with a keyword like `ok` or `healthy` to validate response body
3. Under **Alert Contacts**, select `Julian`
4. Click **Create Monitor**

### Step 5: Verify

- Both monitors should show **green (Up)** within 5 minutes
- Test alerting: pause a monitor, wait, then check for email notification

### Optional: Status Page

UptimeRobot offers a free public status page:
1. Go to **Status Pages** → **Add Status Page**
2. Name: `Caelith Status`
3. Custom domain (optional): `status.caelith.tech` (add CNAME to `stats.uptimerobot.com`)
4. Add both monitors → Publish

---

## 3. Log Aggregation Options

### Option A: Railway Built-in Logs

- **What you get:** Real-time streaming logs per service, searchable in the Railway dashboard
- **Retention:** ~1 hour of logs in the UI; no long-term storage
- **Search:** Basic keyword filter
- **Export:** None built-in (can use `railway logs` CLI)
- **Cost:** Included in Railway plan
- **Verdict:** Fine for live debugging, **not sufficient** for post-incident investigation or audit trails

### Option B: Betterstack Logs (formerly Logtail)

- **URL:** https://betterstack.com/logs
- **Free tier:** 1 GB/month, 3-day retention
- **Features:** Structured log ingestion, full-text search, dashboards, alerting
- **Integration:** Simple HTTP drain — add to Railway as a log drain or send from your app via their SDK
- **Setup:** Sign up → create source → get token → add `BETTERSTACK_TOKEN` to Railway env → integrate SDK or HTTP drain
- **Verdict:** ✅ **Recommended for Caelith.** 1 GB/month is plenty for <100 users. Alerting included. Pairs well with Betterstack Uptime (alternative to UptimeRobot).

### Option C: Axiom

- **URL:** https://axiom.co
- **Free tier:** 500 GB ingest/month (!), 30-day retention, 10 datasets
- **Features:** Very generous ingest limits, query language, dashboards
- **Integration:** HTTP API, OpenTelemetry, Vercel/Railway integrations
- **Verdict:** Most generous free tier by far. Slightly more complex setup than Betterstack. Great if you want OpenTelemetry traces later.

### 🏆 Recommendation

**Start with Betterstack Logs.** Reasons:
1. Simplest setup for a Railway-hosted Next.js app
2. 1 GB/month is more than enough for pre-seed
3. Built-in alerting on log patterns (errors, exceptions)
4. If you later want uptime monitoring too, Betterstack Uptime replaces UptimeRobot
5. Single vendor = fewer accounts to manage

**Upgrade path:** If you outgrow 1 GB/month or need longer retention, switch to Axiom (500 GB free) or Betterstack paid ($29/mo for 30-day retention).

---

## 4. Alerting Setup

### Layer 1: Downtime Alerts (UptimeRobot)

Already configured in Section 2. You'll get email alerts when:
- `www.caelith.tech` goes down
- `/api/health` returns non-200 or times out

**Response time threshold (optional):**
1. Edit each monitor → Advanced Settings
2. Set **HTTP Request Timeout** to 30 seconds (default)
3. UptimeRobot marks the monitor as "down" if it exceeds this

### Layer 2: Railway Notifications

1. In Railway dashboard → Project Settings → **Notifications**
2. Enable: Deploy failures, crash loops, service restarts
3. Delivery: Email (uses your Railway account email)
4. Optional: Add a Slack/Discord webhook for team notifications

### Layer 3: Latency & Error Rate Alerting (Future)

For **p95 latency** and **error rate** monitoring, you need APM. Free options:

**Option A: Betterstack (if already using their Logs)**
- Create alert rules on log patterns: e.g., alert when `status >= 500` count exceeds 5 in 5 minutes
- No p95 latency natively — need to log response times and query

**Option B: Grafana Cloud Free Tier** ⭐
- **URL:** https://grafana.com/products/cloud/
- **Free tier:** 10K metrics, 50 GB logs, 50 GB traces, 14-day retention
- **Setup:** Add OpenTelemetry to your Next.js app → send traces to Grafana Cloud
- **Alerts:** Create alert on `http_server_duration` p95 > 2s, or error rate > 1%
- **Verdict:** Best free option for real APM. Set up when you have >10 active users.

### Recommended Alerting Timeline

| Phase | Tool | What |
|-------|------|------|
| Now (pre-launch) | UptimeRobot | Downtime alerts |
| Now | Railway | Deploy failure alerts |
| Month 1-2 | Betterstack Logs | Error log pattern alerts |
| Month 3+ (with users) | Grafana Cloud | p95 latency, error rate, traces |

---

## 5. CDN Assessment

### Do you need a CDN now?

**No.** Here's why:

- **<100 users**, primarily B2B (not consumer scale)
- **Railway/Vercel already serve from EU** (Frankfurt) — your users are EU-based
- **Next.js SSR** handles caching well with built-in ISR/static optimization
- Adding a CDN now adds complexity with zero measurable benefit

### When to add a CDN

Add a CDN when **any** of these are true:
- Users in multiple continents (US + EU + APAC)
- Static asset load times > 2s for remote users
- You're serving large files (PDFs, reports > 5 MB)
- Traffic exceeds ~1000 unique visitors/day
- You need DDoS protection (unlikely pre-seed, but worth noting)

### Recommended: Cloudflare Free Tier

When the time comes:

1. **Sign up** at https://dash.cloudflare.com/sign-up
2. **Add site:** `caelith.tech`
3. **Change nameservers** at your registrar to Cloudflare's (they'll provide two)
4. **SSL mode:** Set to **Full (Strict)** (since you already have a valid cert)
5. **What you get for free:**
   - Global CDN for static assets
   - Automatic HTTPS + HSTS
   - Basic DDoS protection
   - Web Application Firewall (limited rules)
   - Analytics
   - Page Rules (3 free)
6. **Caching:** Cloudflare auto-caches static assets (.js, .css, images). API routes pass through uncached by default.

**Estimated timeline:** Not needed until ~Q3 2026 or first non-EU customer, whichever comes first.

---

## Summary & Action Items

| # | Action | Priority | Time |
|---|--------|----------|------|
| 1 | Verify HSTS header (`curl -I https://www.caelith.tech`) | High | 2 min |
| 2 | Sign up for UptimeRobot, add 2 monitors | High | 10 min |
| 3 | Sign up for Betterstack Logs, connect to Railway | Medium | 20 min |
| 4 | Enable Railway deploy failure notifications | Medium | 5 min |
| 5 | Add HSTS header if missing | Medium | 15 min |
| 6 | (Future) Grafana Cloud for APM | Low | When needed |
| 7 | (Future) Cloudflare CDN | Low | When needed |
