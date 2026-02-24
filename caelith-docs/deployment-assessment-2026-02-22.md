# Caelith Deployment & Impact Assessment — 2026-02-22

## Executive Summary

**20+ commits shipped today.** Caelith has evolved from a compliance rules engine into a comprehensive AIFMD II platform covering Art. 8, 20, and 21. This document assesses deployment readiness, landing page alignment, and strategic priorities.

---

## Part 1: Git Status ✅

- **Branch**: `main`
- **Status**: All commits pushed to `origin/main`. Working tree clean.
- **No unpushed changes.**

---

## Part 2: Landing Page Gap Analysis

### What the landing page previously advertised:
- 13 rules, 6 frameworks
- Rule Engine, Hash-chained Audit Trail, Regulatory Reporting, Scenario Modeling (4 features)
- Pricing: €990 / €1,990 / €3,500+ per month
- DSGVO-konform badge (basic mention)
- BaFin-compliant badge
- AIFMD II countdown

### What was MISSING (now added):
| Feature | AIFMD II Article | Status |
|---------|-----------------|--------|
| Depositary tracking | Art. 21 | ✅ Added to landing page |
| Senior persons / Leitungspersonen | Art. 8(1)(e) | ✅ Added to landing page |
| Delegation oversight + third-country flagging | Art. 20 | ✅ Added to landing page |
| Fee disclosure / Gebührentransparenz | Art. 3/23 | ✅ Added to landing page |
| LMT notifications to investors/NCAs | Art. 16 | ✅ Added to landing page |
| Compliance Copilot with PII safety | — | ✅ Added to landing page |
| AIFMD II Readiness Assessment | — | ✅ Added to landing page |
| DSGVO compliance details (AVV, Art. 15/17/20) | — | ✅ Added to credentials |
| SHA-256 audit trail badge | — | ✅ Added to credentials |
| Specific AIFMD II article coverage | Art. 8, 20, 21 | ✅ Added to credentials |

### What was already correct:
- ✅ Pricing (€990/€1,990/€3,500+)
- ✅ AIFMD II countdown timer (April 16, 2026)
- ✅ BaFin-konform badge
- ✅ EU-Hosting (Frankfurt) badge
- ✅ DSGVO-konform badge (now enhanced with specifics)

---

## Part 3: Landing Page Updates Made

### Both `landing-de.ts` and `landing-en.ts` updated:

1. **Hero subtitle** — Updated to mention depositaries, delegations, fees, senior persons, LMT enforcement, AI Copilot, SHA-256, and DSGVO/GDPR compliance
2. **Credentials section** — Added SHA-256 audit trail badge, AIFMD II articles badge, enhanced DSGVO/GDPR badge with "AVV, Art. 15/17/20"
3. **Feature cards** — Added 7 new expandable feature cards:
   - Depositary tracking (Art. 21)
   - Senior persons register (Art. 8(1)(e))
   - Delegation oversight (Art. 20)
   - Fee disclosure & LMT notifications
   - Compliance Copilot with PII safety
   - AIFMD II Readiness Assessment
4. **Total features now: 11** (was 4)

---

## Part 4: What Else Needs Updating

### 1. Pitch Deck
- **Location**: No `pitch-deck/` directory found in repo
- **Action needed**: Create or locate pitch deck source files and update with new feature set
- **Priority**: HIGH — needed before next KVG demo

### 2. Demo Script
- **Location**: `docs/Caelith Demo Leitpfaden.txt` + `docs/DEMO_REHEARSAL.md`
- **Action needed**: Update click path to include new pages (Depositaries, Senior Persons, Delegations, Fee Disclosure, LMT, Copilot PII demo, Readiness Assessment)
- **Priority**: HIGH

### 3. README.md
- **Current state**: Outdated — mentions "tokenized assets", "transfer restrictions", "on-chain tomorrow"
- **Missing**: AIFMD II, DSGVO, depositaries, delegations, LMT, Copilot, senior persons
- **Action needed**: Complete rewrite to match current product positioning
- **Priority**: MEDIUM

### 4. Outreach Templates
- **Location**: Not found in repo root. Check `docs/gtm/`
- **Action needed**: Add DSGVO talking points, AIFMD II article coverage, evidence bundle capability
- **Priority**: MEDIUM

### 5. LinkedIn / Marketing
- **Location**: Not found. May be in `docs/gtm/`
- **Action needed**: Update company page description with new capabilities
- **Priority**: LOW (after product stabilizes)

### 6. Security Page on caelith.tech
- **Status**: Not yet created
- **Action needed**: Add `/security` page with SHA-256 audit trail, DSGVO compliance, data processing details, ISO 27001 roadmap
- **Priority**: MEDIUM

---

## Part 5: Railway Deployment Checklist

### ✅ Already Done
- [x] Code pushed to `origin/main`

### ⚠️ Needs Verification
- [ ] **Migrations 041–052** — Must run on Railway PostgreSQL. Check with `npm run migrate` or equivalent
- [ ] **Seed data** — New features (depositary types, LMT tools, senior person roles) may need seed data
- [ ] **Environment variables** — Verify on Railway dashboard:
  - `ANTHROPIC_API_KEY` — Required for Copilot
  - `REGISTRATION_MODE` — Should be `invite` for production
  - `JWT_SECRET` — Must be set and secure
  - `DATABASE_URL` — Railway auto-provisions, but verify SSL mode
- [ ] **Privacy policy page** — Does `/datenschutz` or `/privacy` render on www.caelith.tech?
- [ ] **DB SSL** — Railway requires `?sslmode=require` in connection string
- [ ] **UTF-8 rendering** — Landing page has Unicode characters (ü, ö, ä, €). Verify no mojibake on production
- [ ] **CORS** — If Copilot calls Anthropic API, verify CORS/proxy setup

### Manual Railway Configuration Needed
1. Verify PostgreSQL addon is provisioned and connected
2. Check build command includes migration step
3. Verify custom domain `www.caelith.tech` SSL certificate is valid
4. Check memory limits (Copilot + API may need >512MB)

---

## Part 6: What's NOT Ready Yet (Honest Assessment)

### Needs a Lawyer 🔴
- **Datenschutzerklärung**: Template exists (`docs/avv-template.md`, `docs/verarbeitungsverzeichnis.md`) but needs legal review for production use
- **AVV (Auftragsverarbeitungsvertrag)**: Template created, needs legal sign-off
- **Terms of Service**: Not yet created
- **Impressum**: Required by German law for commercial websites — verify it's on caelith.tech

### Needs Manual Railway Configuration 🟡
- Run migrations 041–052 on production DB
- Seed reference data for new modules
- Verify ANTHROPIC_API_KEY is set for Copilot
- SSL certificate renewal check

### Needs Testing on Production 🟡
- ESMA Annex IV XML export with real data
- Copilot PII masking with production investor data
- Evidence bundle generation under load
- LMT notification delivery (email/webhook)
- Landing page rendering (UTF-8, images, countdown timer)

### Timeline Estimates
| Item | Effort | Priority |
|------|--------|----------|
| Run migrations on Railway | 15 min | 🔴 Critical |
| Verify landing page on production | 30 min | 🔴 Critical |
| Update demo script with new features | 2 hours | 🔴 High |
| Update README.md | 1 hour | 🟡 Medium |
| Legal review of Datenschutzerklärung | 1–2 weeks (external) | 🟡 Medium |
| Create /security page | 3 hours | 🟢 Low |
| Create pitch deck | 4 hours | 🔴 High |

---

## Part 7: Strategic Recommendations

### This Week (Priority Order)
1. **Deploy to Railway** — Run migrations, verify landing page renders, test Copilot
2. **Update demo script** — New click path covering all 11 feature areas
3. **Create pitch deck** — One-pager + 10-slide deck with new feature set
4. **Verify Impressum & Datenschutzerklärung** — Legal minimum for DE commercial site

### Can Wait
- LinkedIn company page update
- Security page
- ISO 27001 roadmap
- Outreach template updates
- README.md rewrite

### Biggest Risk to Next KVG Demo
**UTF-8 / encoding issues on the landing page.** The HTML files show `?` and garbled characters for German umlauts and Euro signs in the raw output. This could mean:
1. The files are double-encoded
2. The server isn't setting `charset=UTF-8` properly
3. PowerShell output encoding masks the real state

**Mitigation**: Load www.caelith.tech in a browser immediately after deploy and verify all German text renders correctly. If broken, check the `Content-Type` header and file encoding.

**Second biggest risk**: Migrations not running on Railway DB, leaving new features with empty tables.

---

## Appendix: Files Modified

| File | Change |
|------|--------|
| `src/frontend/src/app/api/landing/landing-de.ts` | +7 feature cards, enhanced credentials, updated hero |
| `src/frontend/src/app/api/landing/landing-en.ts` | +7 feature cards, enhanced credentials, updated hero |
| `docs/deployment-assessment-2026-02-22.md` | This document (new) |

---

*Assessment generated 2026-02-22 20:40 CET*
