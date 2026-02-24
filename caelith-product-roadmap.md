# Caelith Product Roadmap — Tier 1 Game Changers

## Build Order

### 1. Regulatory Deadline Calendar + Auto-Alerts
**Status:** 🔨 Building
**Est:** 1 week | **Value:** Daily-use sticky feature
**What:** Auto-populated compliance calendar from live fund data — KYC expiry dates, Annex IV filing windows, SFDR reporting periods, regulatory deadlines. Alert banners at -30, -14, -7, -1 days.
**Backend:** New `/api/calendar` endpoint that aggregates deadlines from: investors (kyc_expiry), fund_structures (reporting periods), eligibility_criteria (effective_date), regulatory calendar (static AIFMD/BaFin dates).
**Frontend:** New `/calendar` page with monthly/list view. Dashboard widget showing upcoming deadlines. Alert badges in sidebar.
**Landing page:** Add "Compliance Calendar" to features list.
**Pitch deck:** Add to platform capabilities.

### 2. Audit Package Generator ("WP-Ready Export")
**Status:** ⏳ Next
**Est:** 2-3 weeks | **Value:** Strongest ROI pitch ("3 weeks → 30 minutes")
**What:** One-click export per fund: all compliance decisions + SHA-256 chain + investor KYC status + rule execution history + transfer approvals + risk flag timeline. Structured PDF + ZIP.
**Backend:** New `/api/reports/audit-package/{fundId}` endpoint.
**Frontend:** "Export Audit Package" button on fund detail page.
**Landing page:** Lead with "Audit prep: 3 weeks → 30 minutes" claim.
**Pitch deck:** Add as key differentiator.

### 3. Sanctions & PEP Screening
**Status:** ⏳ Queued
**Est:** 2 weeks | **Value:** Legally required, replaces €5-15K/yr tools
**What:** Auto-screen investors against EU/UN/OFAC sanctions + PEP databases via OpenSanctions API. Flag matches, log in audit chain.
**Backend:** New screening service, `/api/investors/{id}/screen`, batch screening endpoint. Integration with OpenSanctions API (free) or ComplyAdvantage (premium).
**Frontend:** Screening status badge on investor cards. Screening results panel. Bulk screening action.
**Landing page:** Add "Sanctions & PEP Screening" to features.
**Pitch deck:** Ties directly to AMLR 2027 story.

### 4. Investor Self-Service Portal (White-Label)
**Status:** ⏳ Queued
**Est:** 3-4 weeks | **Value:** 10x stickiness, justifies Professional tier
**What:** White-labeled portal where investors view holdings, upload KYC docs, download certificates, track onboarding. Subdomain per KVG.
**Backend:** New auth flow for investors (separate from admin). Read-only API endpoints. Document upload endpoint.
**Frontend:** Separate Next.js app or route group (`/portal/...`).
**Landing page:** Major feature highlight.
**Pitch deck:** "The interface layer between KVGs and their investors."

---

## Landing Page Updates Needed
- Add "Compliance Calendar" with auto-alerts
- Add "WP-Ready Audit Export" — lead with ROI claim
- Add "Sanctions & PEP Screening"
- Add "Investor Portal" (coming soon)
- Update feature count from 13 rules → fuller platform story

## Pitch Deck Updates Needed
- Platform Vision slide: add Tier 1 features to roadmap timeline
- Product slide: show calendar + audit export + screening
- Differentiation: "compliance operating system, not just a dashboard"
