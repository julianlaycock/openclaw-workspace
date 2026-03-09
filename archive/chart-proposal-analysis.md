# Caelith Dashboard — Chart Proposal Analysis

## Research Foundations

### Data Visualization Principles Applied
- **Edward Tufte**: Maximize data-ink ratio. Every pixel must earn its place. Sparklines > chrome. Labels > legends.
- **Stephen Few**: Dashboard design should answer "what requires my attention RIGHT NOW?" — not "what does our data look like."
- **Preattentive attributes**: Color saturation and position are processed pre-consciously. Use red/amber/green sparingly but decisively for compliance states.
- **Shneiderman's mantra**: Overview first, zoom and filter, then details on demand.

### What Compliance Officers Actually Need (Daily)
Based on regulatory practice and AIFMD II/KAGB requirements:
1. **What's broken right now?** — Active breaches, overdue KYC, limit violations
2. **What's about to break?** — Approaching thresholds, expiring documents, upcoming deadlines
3. **Am I audit-ready?** — Coverage metrics, documentation completeness
4. **What changed since yesterday?** — Delta awareness, new flags

### AIFMD II Specific Monitoring Requirements
- **Leverage monitoring** (commitment + gross method) against regulatory limits
- **Liquidity profile** vs. redemption terms alignment
- **Delegation oversight** — substance requirements tracking
- **Investor concentration** per fund (regulatory reporting threshold)
- **Annex IV reporting** readiness and data completeness
- **Risk limit** compliance (VaR, stress tests)

### KYC/AML Dashboard Best Practices
- **Pipeline view** > static counts: show where investors are stuck in onboarding
- **Expiry-driven**: KYC is time-bound — documents expire, reviews are periodic
- **Risk-based approach**: High-risk investors need enhanced due diligence (EDD) — surface these
- **Actionable queues**: Not "6/12 verified" but "3 overdue, 2 expiring this month, 1 pending review"

### Competitor Landscape
- **FundApps**: Rule-based monitoring with breach alerts, UCITS/AIFMD limit checking, traffic-light status
- **Kneip**: Regulatory reporting focus (Annex IV, AIFMD), data completeness dashboards
- **ComplyAdvantage**: AML-focused, screening hit resolution queues, risk scoring
- **Confluence Technologies**: Position-level compliance, pre/post-trade checks

**Common pattern**: Competitors lead with **action queues** and **breach status**, not analytical charts. The best compliance dashboards look more like task managers than BI tools.

---

## Per-Chart Evaluation

### 1. Investor Type Allocation (Treemap + Tufte breakdown)
| Criterion | Score | Assessment |
|-----------|-------|------------|
| Signal vs noise | ⚠️ Low | Shows composition but doesn't drive action. A compliance officer doesn't wake up asking "what % is institutional?" |
| Target user value | ⚠️ Low | Useful for Annex IV reporting prep (once quarterly), not daily |
| Regulatory relevance | ✅ Medium | KAGB §1 investor classification matters for marketing restrictions |
| Information density | ❌ Poor | Treemap is hard to read for 3-4 categories. A simple bar or even text would suffice |

**Verdict: REMOVE as standalone chart.** Fold investor classification into the Concentration Risk card as a secondary metric. A treemap for 3 categories is visual overhead.

### 2. Jurisdiction Exposure (Heatmap + bars)
| Criterion | Score | Assessment |
|-----------|-------|------------|
| Signal vs noise | ⚠️ Low | Geographic distribution is informational, not actionable daily |
| Target user value | ⚠️ Low | Small German KVGs (3-15 funds) know their investor base. DE will always dominate. |
| Regulatory relevance | ✅ Medium | Third-country investor restrictions under AIFMD II matter, but this is a quarterly concern |
| Information density | ❌ Poor | Heatmap tiles for 4 countries is overkill — a simple table row would do |

**Verdict: REMOVE.** For a small KVG with 50-500 investors across DE/AT/LU/CH, this burns premium screen space for near-static data. Surface jurisdiction alerts (e.g., new sanctions on a country) in the violations feed instead.

### 3. KYC Status Overview (Big number + dot matrix + strip)
| Criterion | Score | Assessment |
|-----------|-------|------------|
| Signal vs noise | ✅ High | KYC completeness directly drives action — who needs follow-up? |
| Target user value | ✅ High | Compliance officers check this daily. Onboarding pipeline is core workflow |
| Regulatory relevance | ✅ High | GwG (Geldwäschegesetz) requires ongoing KYC. BaFin audits check this first |
| Information density | ⚠️ Medium | "6/12 verified" is good but needs temporal dimension — WHEN are they due? |

**Verdict: KEEP with major redesign.** Transform from static status to **action-oriented pipeline**:
- Show overdue reviews (red), expiring within 30 days (amber), pending initial KYC (blue)
- Add a "days overdue" dimension
- The dot matrix is cute but wastes space — replace with a compact funnel/strip that shows pipeline stages

### 4. Rule Violations (Severity list)
| Criterion | Score | Assessment |
|-----------|-------|------------|
| Signal vs noise | ✅ Very High | This IS the dashboard. Breaches = action required |
| Target user value | ✅ Very High | "What's wrong?" is THE question every morning |
| Regulatory relevance | ✅ Very High | Active breaches must be documented and resolved under KAGB/AIFMD |
| Information density | ✅ Good | List format is appropriate. Could add time-in-breach |

**Verdict: KEEP and elevate.** This should be the most prominent card. Modifications:
- Add "age" of each violation (hours/days since detection)
- Add trend indicator (new today vs. persistent)
- Group by severity with clear critical/warning/info bands

### 5. Concentration Risk (HHI + bars)
| Criterion | Score | Assessment |
|-----------|-------|------------|
| Signal vs noise | ✅ High | Concentration limits are hard regulatory requirements |
| Target user value | ✅ High | Small KVGs often have dominant investors — this is a real risk |
| Regulatory relevance | ✅ High | KAGB §262 concentration limits, AIFMD II investor diversification |
| Information density | ✅ Good | HHI is the right metric. Per-fund breakdown is correct |

**Verdict: KEEP with minor refinement.**
- Add threshold line showing regulatory limit
- Show how close each fund is to breaching concentration limits (distance-to-breach)
- Add the investor type breakdown here (absorbs Chart 1's purpose)

---

## What's Missing (Critical Gaps)

### Gap 1: Regulatory Deadline Tracker
**Why**: AIFMD II has phased implementation deadlines. Annex IV reporting is quarterly. BaFin submissions have hard dates. A compliance officer's worst nightmare is a missed deadline.

### Gap 2: Document Completeness / Audit Readiness
**Why**: BaFin audits check documentation completeness. "Are all required documents on file for all investors?" is a daily concern. This is different from KYC status — it's about the fund-level regulatory file.

### Gap 3: Leverage & Limit Utilization
**Why**: AIFMD II requires leverage monitoring (commitment method and gross method). Small KVGs need to see how close each fund is to its leverage limit. This is a hard compliance requirement completely absent from the current dashboard.

---

## Final Recommendation

### Dashboard Layout (6 cards, 3×2 grid)

| Card | Status | Rationale |
|------|--------|-----------|
| **1. Active Violations & Alerts** | 🔄 KEPT (elevated) | Was #4. Now the hero card. Top-left position. |
| **2. KYC / AML Pipeline** | 🔄 KEPT (redesigned) | Was #3. Redesigned from static to temporal/action-oriented |
| **3. Concentration Risk** | 🔄 KEPT (enhanced) | Was #5. Now includes investor type breakdown (absorbs #1) |
| **4. Leverage Utilization** | 🆕 NEW | Critical AIFMD II requirement. Shows per-fund leverage vs. limits |
| **5. Regulatory Calendar** | 🆕 NEW | Upcoming deadlines, filings, review dates. 90-day forward view |
| **6. Audit Readiness Score** | 🆕 NEW | Per-fund documentation completeness. One number per fund with drill-down |
| ~~Investor Type Allocation~~ | ❌ REMOVED | Absorbed into Concentration Risk card |
| ~~Jurisdiction Exposure~~ | ❌ REMOVED | Low daily value for small KVGs. Static data doesn't earn a card |

### Design Philosophy
- **Morning briefing**: Top row = "what's wrong" (Violations + KYC Pipeline + Concentration)
- **Readiness posture**: Bottom row = "am I prepared" (Leverage + Calendar + Audit Score)
- Every card answers a question that drives an action
- No decorative charts — every visualization must justify its ink
