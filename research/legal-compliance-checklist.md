# Caelith Legal Compliance Checklist

**Audit Date:** 2026-02-27
**Auditor:** Mate (subagent)
**Target:** https://www.caelith.tech

---

## #4 — Impressum Audit (§5 TMG)

**Source pages:** `/impressum` (Next.js page) + `/api/impressum` (SSR route)

| Requirement | Status | Severity | Notes |
|---|---|---|---|
| Full name of business owner | ✅ Present | — | "Julian Laycock" |
| Physical address (full street) | ❌ **MISSING** | 🔴 HIGH | Next.js page shows only "Berlin, Germany" — no street address. The API/SSR impressum has "Musterstraße 1, 10115 Berlin" (placeholder). **Neither version has a real address.** §5 TMG requires a full postal address. |
| Email contact | ✅ Present | — | julian.laycock@caelith.tech |
| Phone number | ❌ **MISSING** | 🔴 HIGH | No phone number anywhere. Under §5 TMG + EU case law (C-298/07), a phone number or equivalent real-time contact is **mandatory**. |
| Trade register entry | ⚠️ Noted | 🟡 MEDIUM | Both versions note "not registered / pending." Acceptable for Einzelunternehmer but should be updated upon registration. |
| VAT ID (§27a UStG) | ⚠️ Noted | 🟢 LOW | API version states "not yet registered." Acceptable if below threshold / not yet issued. |
| Responsible person (§55 RStV) | ✅ Present | — | "Julian Laycock" listed in both versions |
| **Consistency between pages** | ❌ **MISMATCH** | 🟡 MEDIUM | The Next.js `/impressum` page and the SSR `/api/impressum` route show **different content** — the API version has more detail (placeholder address, VAT section, disclaimers) while the Next.js page is minimal. Should be unified. |

### Impressum Fixes Required
1. **Add real physical address** (or keep placeholder with clear "to be updated" note — still risky)
2. **Add phone number** — required by law
3. **Unify** the two impressum versions (Next.js page vs. API route)

---

## #5 — Privacy Policy vs. Actual Tracking

### What the Privacy Policy Says
- Only "strictly necessary cookies" (session cookies)
- No tracking cookies, no advertising cookies, no third-party analytics cookies
- Lists `caelith_session` cookie (httpOnly, secure)
- Lists `caelith_theme` as localStorage (not cookie)
- Data processors: Railway, Anthropic, OpenAI, OpenSanctions
- **Does NOT mention Plausible Analytics**

### What's Actually Implemented

| Component | What it does | Disclosed? | Severity |
|---|---|---|---|
| **Plausible Analytics** (`analytics.tsx`) | Loads `plausible.io/js/script.js` in production. Cookie-free, privacy-first. | ❌ **NOT disclosed** | 🟡 MEDIUM |
| **POST /api/analytics/track** | Collects: event_type, source, metadata, session_id, **IP hash** (SHA-256), user_agent, referrer. Stores in `analytics_events` DB table. | ❌ **NOT disclosed** | 🔴 HIGH |
| **POST /api/analytics/events** | Collects: session data (referrer, UTM params, locale, viewport, device type, landing page), event streams (page, timing). Stores in `demo_sessions` + `demo_events` tables. | ❌ **NOT disclosed** | 🔴 HIGH |
| **Auth cookies** (`access_token`, `refresh_token`) | httpOnly, secure, sameSite strict. Set on login. | ⚠️ Partially — privacy policy mentions `caelith_session` but actual cookies are `access_token` + `refresh_token` | 🟡 MEDIUM |
| **Cookie consent banner** (`cookie-consent.tsx`) | Shows banner, stores acceptance in `localStorage`. Links to `/privacy-policy` (broken link — should be `/privacy`). | ⚠️ Exists but has broken link | 🟡 MEDIUM |

### Gaps Found
1. **Plausible Analytics not disclosed** — even though it's cookie-free/GDPR-friendly, it should be mentioned in the privacy policy as a data processor
2. **Custom analytics endpoints not disclosed** — `/api/analytics/track` and `/api/analytics/events` collect significant behavioral data (IP hashes, user agents, page views, session timing, UTM params, viewport sizes). This MUST be disclosed under GDPR Art. 13/14
3. **Cookie names mismatch** — Privacy policy says `caelith_session` but code uses `access_token` + `refresh_token`
4. **Cookie consent banner links to wrong URL** — Links to `/privacy-policy` instead of `/privacy`

---

## #6 — Cookie Consent (TTDSG)

### Cookies Set on First Visit
- **Auth cookies** (`access_token`, `refresh_token`): Only set upon login — NOT on first visit ✅
- **Plausible**: Cookie-free analytics — no cookies set ✅
- **No other cookies detected** in response headers from production

### Cookie Consent Banner Assessment

| Check | Status | Notes |
|---|---|---|
| Are non-essential cookies set before consent? | ✅ No | Auth cookies only on login; Plausible is cookie-free |
| Is a consent banner present? | ✅ Yes | `cookie-consent.tsx` exists |
| Does the banner accurately describe what's used? | ⚠️ Mostly | Says "essential cookies" — accurate since only auth cookies exist |
| Does the banner link to correct privacy policy? | ❌ No | Links to `/privacy-policy` (404) instead of `/privacy` |
| Is consent stored properly? | ⚠️ | Stored in `localStorage` (`caelith-cookie-consent`). Acceptable for essential-only, but not a robust consent record |
| TTDSG compliance | ✅ OK | Since no non-essential cookies are set before consent, TTDSG requirements are met. The analytics is cookie-free (Plausible) and the custom analytics uses no cookies. |

### Cookie Consent Severity: 🟢 LOW (for TTDSG specifically)
The site doesn't set non-essential cookies on first visit, so TTDSG consent requirements are technically met. However, the **broken privacy policy link** in the banner needs fixing.

---

## Summary of Findings by Severity

### 🔴 HIGH — Must Fix
1. **Impressum: No phone number** — §5 TMG + EU case law requires it
2. **Impressum: No real physical address** — placeholder address is non-compliant
3. **Privacy policy: Undisclosed analytics data collection** — `/api/analytics/track` and `/api/analytics/events` collect IP hashes, user agents, behavioral data without any disclosure

### 🟡 MEDIUM — Should Fix
4. **Privacy policy: Plausible not mentioned** as data processor
5. **Privacy policy: Wrong cookie names** — says `caelith_session`, actual is `access_token` + `refresh_token`
6. **Cookie banner: Broken link** — `/privacy-policy` should be `/privacy`
7. **Impressum: Two different versions** on different routes

### 🟢 LOW — Nice to Have
8. **VAT ID placeholder** — acceptable for now, update when issued
9. **Cookie consent localStorage** — works but consider more robust solution if cookies expand

---

## Recommended Actions

### Immediate (before any public launch)
- [ ] Add phone number to Impressum
- [ ] Add real physical address to Impressum (or proper c/o address)
- [ ] Add Plausible Analytics disclosure to privacy policy
- [ ] Add custom analytics data collection disclosure to privacy policy (what data, why, retention period, legal basis)
- [ ] Fix cookie names in privacy policy (`access_token` + `refresh_token` instead of `caelith_session`)
- [ ] Fix cookie consent banner link (`/privacy` not `/privacy-policy`)
- [ ] Unify Impressum pages (Next.js page vs API route)

### Before Scale
- [ ] Update trade register info upon company registration
- [ ] Add VAT ID when issued
- [ ] Consider a proper Cookie Management Platform if adding non-essential cookies
- [ ] Add Art. 13 GDPR information notice for the analytics data collection
