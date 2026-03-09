# QA Report: Persona 1 — KVG Compliance Officer (Petra Schneider)

**Date:** 2026-02-25  
**Tester:** Automated QA (OpenClaw Subagent)  
**Environment:** Production (https://www.caelith.tech)  
**Browser:** Chrome (OpenClaw managed profile)  
**Persona:** Petra Schneider, German-speaking KVG Compliance Officer, 8 funds, €1.2B AUM

---

## Executive Summary

⛔ **BLOCKER: Login credentials provided (demo@caelith.com / Demo1234) are invalid.** The account could not be authenticated, which prevented testing of all authenticated features (User Stories 1–20 dashboard functionality). The aggressive account lockout policy (locks after ~2 failed attempts, 15-minute cooldown) compounded the issue. Only the login page and public landing page could be tested.

**Overall Status:** 🔴 Blocked — 18 of 20 user stories untestable due to authentication failure.

---

## Test Results

### User Story 1: Login → Dashboard → Review Compliance Status

#### Test 1.1: Login with valid credentials
| Field | Detail |
|---|---|
| **Steps** | 1. Navigate to https://www.caelith.tech/login 2. Enter email: demo@caelith.com 3. Enter password: Demo1234 4. Click "Sign In" |
| **Expected** | Redirect to dashboard with compliance status overview |
| **Actual** | Error: "Invalid email or password" — credentials rejected |
| **Status** | ❌ |
| **Severity** | **Critical** — Cannot access application at all |
| **Notes** | First attempt failed with "Invalid email or password". The password was confirmed visible via Show button as "Demo1234". Credentials are definitively wrong. |

#### Test 1.2: Account lockout policy
| Field | Detail |
|---|---|
| **Steps** | 1. Attempt login multiple times with wrong credentials |
| **Expected** | Reasonable lockout after 5+ attempts with clear messaging |
| **Actual** | Account locked after only ~2-3 failed attempts. Message: "Account temporarily locked. Try again in 15 minutes." |
| **Status** | ⚠️ |
| **Severity** | **Medium** — Lockout threshold is very aggressive (2-3 attempts). A legitimate user mistyping their password could easily lock themselves out. Industry standard is 5-10 attempts. |

#### Test 1.3: Login page UX and accessibility
| Field | Detail |
|---|---|
| **Steps** | 1. Navigate to login page 2. Review form fields, labels, and layout |
| **Expected** | Clean, accessible login form with clear labels |
| **Actual** | ✅ Login page is clean and professional. Has: Skip to content link, EMAIL/PASSWORD labels, placeholder text, Show password toggle, "Keep me signed in" checkbox, Sign In button. Copyright notice present. |
| **Status** | ✅ |
| **Severity** | N/A |
| **Notes** | Login page title is "Caelith - Compliance Engine" (English). Tagline says "COMPLIANCE PLATFORM FOR EU FUND MANAGERS" in English. For a German user (Petra), this might be unexpected if the app defaults to German elsewhere. The landing page defaults to German, but the login page is English-only. |

---

### User Story 2: Switch UI to German → Verify All Labels Translate

#### Test 2.1: Landing page German translation
| Field | Detail |
|---|---|
| **Steps** | 1. Visit https://www.caelith.tech/ (defaults to German) 2. Review all labels and content |
| **Expected** | Full German translation of all UI elements |
| **Actual** | ✅ Landing page fully translated to German. Navigation: "So funktioniert's", "Preise", "Häufige Fragen", "Ressourcen", "Anmelden". All content sections, pricing, FAQ, footer — all in German. Language toggle (DE | EN) present in nav. |
| **Status** | ✅ |
| **Severity** | N/A |

#### Test 2.2: Landing page English translation
| Field | Detail |
|---|---|
| **Steps** | 1. Visit https://www.caelith.tech/?lang=en 2. Compare with German version |
| **Expected** | Full English translation, consistent with German version |
| **Actual** | ✅ All content properly translated. "How it works", "Pricing", "FAQ", "Resources", "Sign in". Content matches German version semantically. |
| **Status** | ✅ |
| **Severity** | N/A |

#### Test 2.3: Login page language support
| Field | Detail |
|---|---|
| **Steps** | 1. Navigate to https://www.caelith.tech/login 2. Check if German translation is available |
| **Expected** | Login page should match site language (German by default) or offer language toggle |
| **Actual** | Login page is English-only: "Sign In", "Sign in to access the dashboard", "EMAIL", "PASSWORD", "Keep me signed in", "Show password". No language toggle on login page. |
| **Status** | ⚠️ |
| **Severity** | **Medium** — Inconsistency: landing page defaults to German, but login page is English-only with no language toggle. German users expect consistent language. "Anmelden" link leads to an English-only page. |

---

### User Story 3–20: Dashboard Features (BLOCKED)

⛔ **All remaining user stories require authenticated access and could not be tested.**

| # | User Story | Status | Reason |
|---|---|---|---|
| 3 | Fund list → click into each fund → check detail pages | 🔍 Blocked | Auth failure |
| 4 | Annex IV XML → generate for PE fund | 🔍 Blocked | Auth failure |
| 5 | Annex IV XML → generate for hedge fund | 🔍 Blocked | Auth failure |
| 6 | Annex IV XML → generate with incomplete data | 🔍 Blocked | Auth failure |
| 7 | LEI validation → validate a fund's LEI | 🔍 Blocked | Auth failure |
| 8 | LEI → enter invalid LEI → check error handling | 🔍 Blocked | Auth failure |
| 9 | LEI → check GLEIF response display format | 🔍 Blocked | Auth failure |
| 10 | Sanctions screening → screen all investors | 🔍 Blocked | Auth failure |
| 11 | Sanctions → search specific investor name | 🔍 Blocked | Auth failure |
| 12 | Sanctions → check screening result detail | 🔍 Blocked | Auth failure |
| 13 | EMT template → generate and check field auto-fill | 🔍 Blocked | Auth failure |
| 14 | EET template → generate and compare to EMT | 🔍 Blocked | Auth failure |
| 15 | EPT template → generate | 🔍 Blocked | Auth failure |
| 16 | Copilot → ask complex AIFMD II question in German | 🔍 Blocked | Auth failure |
| 17 | Copilot → ask about specific fund's compliance gaps | 🔍 Blocked | Auth failure |
| 18 | Copilot → ask to explain regulatory term, then follow up | 🔍 Blocked | Auth failure |
| 19 | Investor management → search, filter, view details | 🔍 Blocked | Auth failure |
| 20 | Settings → check org profile, appearance, all sections | 🔍 Blocked | Auth failure |

---

## Additional Observations (Public Pages)

### Landing Page Quality
| Observation | Severity | Details |
|---|---|---|
| ✅ DE/EN toggle works smoothly | N/A | Language switching is seamless on landing page |
| ✅ Pricing section well-structured | N/A | Three tiers (Essentials, Professional, Enterprise) clearly laid out |
| ✅ Trust signals present | N/A | BaFin-compliant, GDPR, ESMA XSD, SHA-256, EU hosting badges |
| ✅ GitHub link works | N/A | Links to open-annex-iv repository |
| ✅ Legal pages linked | N/A | Privacy, Terms, Impressum all linked |
| ⚠️ Cookie/font consent banner | Low | Google Fonts notice with "Verstanden"/"Got it" button appears — good for GDPR but could be more detailed |
| ⚠️ "Demo testen" button (#) | Low | "Explore Demo" / "Demo testen" links to "#" — doesn't navigate anywhere |
| ⚠️ Footer product links go to /login | Low | "Rules Engine", "Audit Trail", "Reporting" footer links all go to /login — not helpful for unauthenticated users; should show feature pages or at least anchor to landing page sections |

### Login Page Issues
| Observation | Severity | Details |
|---|---|---|
| ⚠️ No "Forgot Password" link | Medium | No password recovery mechanism visible on login page |
| ⚠️ Tab key triggers form submission | Medium | Pressing Tab from email field appears to submit the form instead of moving to password field (observed: Tab from email triggered "Missing required fields: password" error, suggesting form submission) |
| ⚠️ No rate-limit feedback | Low | Lockout message doesn't tell user how many attempts remain or exactly when they can retry |
| ⚠️ Password visible as plaintext in DOM | Low | When "Show" is clicked, password text is visible in snapshot — expected for a "show password" feature, but noted |

---

## Summary of Issues Found

| # | Issue | Severity | Category |
|---|---|---|---|
| 1 | **Demo credentials invalid** (demo@caelith.com / Demo1234) | 🔴 Critical | Authentication |
| 2 | Account lockout after ~2 failed attempts (too aggressive) | 🟡 Medium | Security/UX |
| 3 | Login page English-only (no DE translation, no language toggle) | 🟡 Medium | i18n |
| 4 | No "Forgot Password" link on login page | 🟡 Medium | UX |
| 5 | Tab key may trigger form submission instead of field navigation | 🟡 Medium | UX/A11y |
| 6 | "Demo testen" / "Explore Demo" button links to "#" | 🟢 Low | UX |
| 7 | Footer product links all redirect to /login | 🟢 Low | UX |
| 8 | Lockout message lacks remaining attempts / precise retry time | 🟢 Low | UX |
| 9 | Google Fonts consent banner could be more detailed | 🔵 Cosmetic | GDPR |

---

## Recommendations

1. **Immediate:** Verify and update demo credentials. The provided credentials (demo@caelith.com / Demo1234) do not authenticate. This blocks all QA testing.
2. **High Priority:** Add German translation to the login page with a language toggle, matching the landing page behavior.
3. **High Priority:** Add a "Forgot Password" / "Passwort vergessen" link to the login page.
4. **Medium:** Increase account lockout threshold to at least 5 attempts before locking.
5. **Medium:** Investigate Tab key behavior on login form — ensure it navigates between fields rather than submitting.
6. **Low:** Fix "Demo testen" CTA to link to actual demo or scroll to relevant section.
7. **Low:** Update footer product links to anchor to landing page feature sections for unauthenticated users.

---

## Test Coverage

| Category | Planned | Executed | Passed | Failed | Blocked |
|---|---|---|---|---|---|
| Authentication | 3 | 3 | 1 | 1 | 0 |
| Localization | 3 | 3 | 2 | 0 | 0 |
| Dashboard | 3 | 0 | 0 | 0 | 3 |
| Fund Management | 3 | 0 | 0 | 0 | 3 |
| Annex IV XML | 9 | 0 | 0 | 0 | 9 |
| LEI Validation | 9 | 0 | 0 | 0 | 9 |
| Sanctions | 9 | 0 | 0 | 0 | 9 |
| Templates | 9 | 0 | 0 | 0 | 9 |
| Copilot | 9 | 0 | 0 | 0 | 9 |
| Investors | 3 | 0 | 0 | 0 | 3 |
| Settings | 3 | 0 | 0 | 0 | 3 |
| **TOTAL** | **63** | **6** | **3** | **1** | **57** |

> ⚠️ Only 10% of planned tests could be executed. Re-run required with valid credentials.
