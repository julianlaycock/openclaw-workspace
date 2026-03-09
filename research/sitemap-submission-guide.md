# Caelith Sitemap Submission Guide

**Date:** 2026-02-27

## Verification Results

| Check | Status | Details |
|-------|--------|---------|
| Sitemap accessible | ✅ | `https://www.caelith.tech/sitemap.xml` returns 200 with valid XML, 32 URLs |
| robots.txt references sitemap | ✅ | `Sitemap: https://www.caelith.tech/sitemap.xml` present |
| Google ping | ⚠️ Deprecated | Google deprecated the `/ping` endpoint in 2023. Use Search Console instead |
| Bing ping | ⚠️ Gone (410) | Bing also deprecated the ping endpoint |

## Key Pages in Sitemap (priority ≥ 0.8)

- `/` — Homepage (priority 1.0)
- `/api/landing` — Landing page (priority 1.0)
- `/api/landing?lang=de` — German landing (priority 0.9)
- `/readiness-check` — Readiness check tool (priority 0.9)
- `/api/copilot-demo` — Copilot demo (priority 0.8)
- `/nca/bafin`, `/nca/cssf`, `/nca/amf`, `/nca/cnmv`, `/nca/fca` — NCA pages (priority 0.8)

## Manual Steps for Julian — Google Search Console

### 1. Submit the Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select the `https://www.caelith.tech` property (add it if not yet verified)
3. In the left sidebar, click **Sitemaps**
4. In the "Add a new sitemap" field, enter: `sitemap.xml`
5. Click **Submit**
6. Wait for Google to process — status should change to "Success"

### 2. Request Indexing for Key Pages

For each high-priority page:

1. In Search Console, use the **URL Inspection** tool (top search bar)
2. Paste the full URL (e.g., `https://www.caelith.tech/`)
3. Click **Request Indexing**
4. Repeat for these priority URLs:
   - `https://www.caelith.tech/`
   - `https://www.caelith.tech/api/landing`
   - `https://www.caelith.tech/readiness-check`
   - `https://www.caelith.tech/api/copilot-demo`
   - `https://www.caelith.tech/nca/bafin`
   - `https://www.caelith.tech/copilot`
   - `https://www.caelith.tech/developers`

> **Note:** There's a daily limit on indexing requests (~10-20/day). Start with the highest-priority pages.

### 3. Bing Webmaster Tools (Optional but Recommended)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add `https://www.caelith.tech` if not already added
3. Submit the sitemap URL under **Sitemaps**
4. Use **URL Submission** to request indexing for key pages

### 4. Verify Property (if not already done)

If the property isn't verified yet in Google Search Console:
- **Recommended method:** Add a DNS TXT record via your domain registrar
- **Alternative:** Upload an HTML verification file to the site root
- **Alternative:** Add a `<meta>` tag to the homepage `<head>`
