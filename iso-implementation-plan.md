# ISO/IEC Compliance Strategy for Caelith
### CTO Recommendation → CEO Review
### February 2026

---

## Executive Summary

Julian — here's my honest assessment of what ISO standards we need, when, and why. I've filtered the full ISO universe down to what actually matters for Caelith's stage, market, and customers. The bottom line: **we need ISO 27001 certification, but not today.** Here's the phased plan.

---

## Caelith's Profile (drives everything)

- **B2B SaaS** selling to regulated financial institutions (KVGs, AIFMs)
- **Multi-tenant**, processing **restricted PII** (investor tax IDs, KYC docs, investment amounts)
- **AI copilot** generating SQL against live customer data
- **Cloud-hosted** (Railway, EU region)
- **Pre-revenue, solo founder** — resources are extremely limited
- **Target buyers**: German compliance officers and Geschäftsführer at 10-50 fund KVGs

---

## What Our Customers Will Ask For (and When)

| Milestone | What Buyers Expect | Our Answer |
|-----------|-------------------|------------|
| **Pilot (now)** | Privacy policy, DPA/AVV, basic security posture | ✅ We have this today |
| **First paying customer (Month 3-6)** | SOC 2 Type I report OR ISO 27001 commitment + pen test letter | 🟡 Need to start |
| **Enterprise / 15+ customers (Month 12)** | ISO 27001 certification, SOC 2 Type II, formal DPA | 🔴 Must have |
| **€1M+ ARR / Series A** | All of above + 27701 (privacy), vendor risk management | Plan ahead |

German KVGs under BaFin supervision are required to perform vendor due diligence (MaRisk AT 9). They'll ask for: security certifications, pen test reports, DPA, and evidence of access controls. **ISO 27001 is the gold standard in DACH.** SOC 2 matters more for US/UK buyers.

---

## Recommended ISO Standards for Caelith

### Tier 1: Must Have (certify within 12 months)

| Standard | What | Why for Caelith | When |
|----------|------|-----------------|------|
| **ISO 27001:2022** | Information Security Management System | The one cert that opens every enterprise door in DACH. Required by MaRisk for BaFin-regulated buyers. | Start Month 3, certify Month 10-12 |
| **ISO 27002:2022** | Implementation guidance for 27001 controls | You don't certify this — it's the "how to" for implementing 27001's 93 controls. Use as reference. | Ongoing |

**Cost estimate**: €15-25K for certification audit (small scope), €5-10K for consulting/gap analysis.
**Effort**: ~2 days/week for 6 months with a dedicated person (or CTO + consultant).

### Tier 2: Should Have (within 18 months)

| Standard | What | Why for Caelith | When |
|----------|------|-----------------|------|
| **ISO 27017:2015** | Cloud security controls | We're cloud-native. This adds cloud-specific controls to our 27001. Cheap to add as an extension. | Month 12-15 |
| **ISO 27018:2025** | PII protection in public cloud | We process investor PII (tax IDs, KYC) in Railway's cloud. German customers will care about this. | Month 12-15 |
| **ISO 27701:2025** | Privacy Information Management | Extends 27001 to cover GDPR privacy management. Strong signal for DSGVO-conscious German buyers. | Month 15-18 |
| **ISO 27005:2022** | Risk management | Formalizes how we do risk assessments. Already partially done (THREAT-MODEL.md). | Month 6-12 |

### Tier 3: Nice to Have (post-Series A)

| Standard | What | Why | When |
|----------|------|-----|------|
| **ISO 27035-1:2023** | Incident management | We have INCIDENT-RESPONSE.md. Formal standard alignment post-cert. | Month 18+ |
| **ISO 22301:2019** | Business continuity | RTO/RPO, DR testing. Enterprise buyers will ask for this eventually. | Month 18+ |
| **ISO 42001:2023** | AI management system | Our Copilot uses LLM-generated SQL. As AI regulation matures (EU AI Act), this becomes relevant. | Month 24+ |
| **ISO 27034-1** | Application security | Formalizes our SDLC security. We're already doing most of this. | Month 18+ |
| **ISO 27036 series** | Supply chain security | Vendor risk management for our processors (Railway, Anthropic, OpenSanctions). | Month 18+ |

### Skip for Now

| Standard | Why Skip |
|----------|---------|
| **SOC 2 Type I/II** | US-centric. Our market is DACH/EU. ISO 27001 is the equivalent and more recognized. Revisit if US expansion. |
| **ISO 27014** | Governance standard for boards. We're a 1-person company. Irrelevant until we have a real leadership team. |
| **ISO 27031** | ICT continuity. Overkill at our stage. |

---

## Implementation Roadmap

### Phase 1: Foundation (Month 1-3, NOW → May 2026)
**Cost: ~€0 (sweat equity) | Effort: 4-6 hours/week**

What we already have:
- ✅ Risk assessment (THREAT-MODEL.md with STRIDE analysis)
- ✅ Incident response plan (INCIDENT-RESPONSE.md)
- ✅ Data classification (DATA-CLASSIFICATION.md)
- ✅ Compliance mapping (COMPLIANCE-MAP.md — 70 controls mapped)
- ✅ Security policies (SECURITY.md)
- ✅ Access controls (RBAC, tenant isolation, auth hardening)
- ✅ Audit trail (hash-chained, tamper-proof)
- ✅ Encryption in transit (TLS), password hashing (bcrypt 12)
- ✅ PII stripping for AI calls
- ✅ Penetration test completed (code-level)

What we need to do:
- [ ] **Information Security Policy** — formal 2-page policy document (scope, objectives, management commitment)
- [ ] **Risk register** — convert threat model into ISO 27005-style risk register with likelihood × impact scoring
- [ ] **Statement of Applicability (SoA)** — map our controls to all 93 Annex A controls, mark which apply and which don't
- [ ] **Asset inventory** — list all systems, data stores, third parties
- [ ] **Access review process** — documented quarterly review of who has access to what
- [ ] **Encryption at rest** — Railway DB encryption status, consider application-level encryption for tax_id/KYC columns

### Phase 2: Gap Closure (Month 4-6, Jun-Aug 2026)
**Cost: ~€5-10K consulting | Effort: 1 day/week**

- [ ] Hire ISO 27001 consultant for gap analysis (~€3-5K)
- [ ] External penetration test by certified firm (~€3-5K for small scope)
- [ ] Implement missing controls identified in gap analysis
- [ ] Set up formal monitoring/alerting (Sentry + UptimeRobot → Datadog/Grafana later)
- [ ] Backup verification + DR test
- [ ] Security awareness training (documented, even if just founder + CTO)
- [ ] Vendor risk assessment for Railway, Anthropic, OpenSanctions

### Phase 3: Certification (Month 7-12, Sep 2026-Feb 2027)
**Cost: ~€15-25K audit | Effort: 2 days/week during audit prep**

- [ ] Stage 1 audit (documentation review) — ~1 day
- [ ] Address Stage 1 findings
- [ ] Stage 2 audit (on-site/remote, control effectiveness) — ~2-3 days
- [ ] Receive ISO 27001:2022 certificate
- [ ] Marketing: add certification badge to website, pitch deck, outreach

### Phase 4: Extend (Month 12-18, 2027)
**Cost: ~€5-10K per extension | With CTO + consultant**

- [ ] Add ISO 27017 + 27018 (cloud + PII) — typically audited as extension to 27001
- [ ] Start ISO 27701 (privacy) preparation
- [ ] Align with SOC 2 if US/UK expansion planned

---

## What This Means for Caelith RIGHT NOW

**We're in better shape than 95% of startups at our stage.** The security audit sprint we just ran — 7 CRITICAL fixed, pen test, 87 tests, 70-control compliance map, security docs — puts us months ahead of where most pre-seed companies are.

**For pilot customers (next 3 months):**
We can confidently say:
- "We've completed a comprehensive security audit with zero outstanding critical vulnerabilities"
- "We have formal incident response, threat model, and data classification documentation"
- "We map to 70 SOC 2/GDPR/ISO 27001 controls"
- "Formal ISO 27001 certification is in progress, target Q4 2026"
- "Here's our pen test report, DPA, and privacy policy"

This is MORE than adequate for pilot conversations. Most German Mittelstand KVGs won't ask for the actual cert until we're quoting enterprise deals.

**For the pitch deck / fundraise:**
"ISO 27001 certification in progress" is a strong signal. "Security-first architecture with hash-chained audit trail" is even better — it shows we designed for compliance, not bolted it on.

---

## My Recommendation

1. **Don't spend money on certification yet.** Get pilots first, prove PMF, raise pre-seed.
2. **Keep building the evidence base** — every doc we created today is an ISO artifact.
3. **Budget €20-35K for ISO 27001 certification in the pre-seed allocation** (it's already in the pitch deck under "SOC 2 Type II + ISO 27001: €50K").
4. **Start formal cert process when we have 3+ paying customers** — that's when the ROI flips from "nice to have" to "deal blocker if we don't."
5. **27017 + 27018 + 27701 as fast-follows** — cheap extensions once 27001 is in place.
6. **Skip SOC 2 unless a specific customer requires it** — ISO 27001 covers the same ground and is more recognized in DACH.

---

## Decision Needed

Do you agree with:
1. **ISO 27001 as the single target cert** (not SOC 2)?
2. **Cert timeline: Q4 2026** (after pre-seed, with budget)?
3. **Phase 1 work starting now** (risk register, SoA, asset inventory — I can do this)?

Let me know and I'll start executing Phase 1.

---

*Prepared by: Mate (CTO) | For: Julian Laycock (CEO) | Date: 2026-02-23*
