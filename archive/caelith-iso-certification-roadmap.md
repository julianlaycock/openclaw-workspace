# Caelith — ISO & Certification Roadmap for German KVG Market

*Prepared: 2026-02-22 | Status: Pre-seed, 1-person team, no formal certifications*

---

## Executive Summary

As a B2B SaaS platform handling PII and financial data for BaFin-regulated fund managers, Caelith operates in one of the most compliance-sensitive buyer segments in Germany. The good news: you don't need every certification on day one. The bad news: you need *something* credible before enterprise KVGs will sign.

**The honest truth for a 1-person startup:** Full ISO 27001 certification costs €15-40k and takes 6-12 months. That's likely premature at pre-seed. But there's a clear sequence of moves that builds trust incrementally while you grow.

---

## 1. Complete ISO Norm Analysis

### ISO 27001 — Information Security Management System (ISMS)

| Aspect | Detail |
|---|---|
| **What it covers** | Systematic approach to managing sensitive information: risk assessment, security controls, policies, incident response, access management, encryption, supplier management. The 2022 revision includes 93 controls across organizational, people, physical, and technological domains. |
| **Why relevant to Caelith** | This is THE certification KVGs ask about first. BaFin's MaRisk/BAIT (now DORA) require regulated entities to ensure outsourcing partners have adequate IT security. ISO 27001 is the universally accepted proof. You're handling investor PII, KYC documents, compliance decisions — a breach would be catastrophic for your customers' regulatory standing. |
| **Cost estimate** | Implementation consulting: €10-20k (can DIY large parts). Certification audit (Stage 1+2): €8-15k. Annual surveillance audits: €4-8k/year. Total Year 1: €15-35k. Ongoing: €5-10k/year. |
| **Timeline** | 6-12 months from scratch. A solo founder who's technically competent can do it in 6-8 months with a consultant guiding the process. |
| **ROI** | **🔴 CRITICAL — #1 priority.** This is a sales unblocker. Many KVGs won't even start a pilot without it or a credible "in progress" statement. Every month without it is lost pipeline. |

### ISO 27701 — Privacy Information Management (GDPR Extension)

| Aspect | Detail |
|---|---|
| **What it covers** | Extension to ISO 27001 for privacy management. Maps directly to GDPR requirements: lawful basis, data subject rights, DPIAs, breach notification, processor/controller obligations. |
| **Why relevant to Caelith** | You process investor PII (names, addresses, KYC docs, possibly nationality/tax residency). KVGs are data controllers; you're a processor. ISO 27701 proves your GDPR compliance systematically. German DPAs (Datenschutzbehörden) are among the most aggressive in the EU. |
| **Cost estimate** | Incremental on top of 27001: €5-10k for implementation, €3-5k additional audit cost. Standalone makes no sense — requires 27001 as foundation. |
| **Timeline** | 2-4 months additional on top of 27001 implementation. Best done simultaneously. |
| **ROI** | **🟡 HIGH — #3 priority.** Strong differentiator but KVGs accept a solid DPA + privacy documentation as sufficient initially. Do this in Year 2 or bundle with 27001 if budget allows. |

### ISO 27017 — Cloud Security Controls

| Aspect | Detail |
|---|---|
| **What it covers** | Cloud-specific security controls: shared responsibility model, virtual machine hardening, cloud service customer/provider responsibilities, data segregation, secure deletion. |
| **Why relevant to Caelith** | You're cloud-hosted (Railway/AWS). KVG IT teams will ask about cloud-specific controls. This standard explicitly addresses multi-tenancy, data localization, and cloud provider management. |
| **Cost estimate** | Incremental on 27001: €3-7k implementation, €2-4k audit delta. |
| **Timeline** | 1-3 months additional, best bundled with 27001. |
| **ROI** | **🟢 MEDIUM — #5 priority.** Nice-to-have. Most KVGs accept AWS's own ISO 27017 cert + your 27001 as sufficient. Bundle in Year 2. |

### ISO 27018 — PII Protection in Public Cloud

| Aspect | Detail |
|---|---|
| **What it covers** | Specific controls for protecting PII in cloud: consent, data portability, transparency, sub-processor management, government access requests, data location disclosure. |
| **Why relevant to Caelith** | Directly applicable — you store investor PII (KYC documents, personal data) in cloud infrastructure. German customers are especially sensitive about where PII resides. |
| **Cost estimate** | Incremental on 27001: €3-6k implementation, €2-3k audit delta. |
| **Timeline** | 1-2 months additional, bundle with 27001. |
| **ROI** | **🟢 MEDIUM — #6 priority.** Overlaps significantly with 27701. Choose one or the other first; 27701 is more comprehensive and recognized. |

### ISO 9001 — Quality Management System

| Aspect | Detail |
|---|---|
| **What it covers** | Process quality: customer focus, leadership, process approach, continuous improvement, evidence-based decisions, relationship management. |
| **Why relevant to Caelith** | Signals operational maturity. Some procurement departments check for it reflexively. Relevant for your audit trail and reporting features — proves your own processes are sound. |
| **Cost estimate** | Implementation: €5-10k. Certification: €5-8k. Annual: €3-5k. |
| **Timeline** | 4-8 months. |
| **ROI** | **⚪ LOW — #8 priority.** KVGs care about security certs, not quality management certs for software vendors. Skip until you have 10+ employees and enterprise customers explicitly request it. |

### SOC 2 Type I / Type II

| Aspect | Detail |
|---|---|
| **What it covers** | Trust Service Criteria: security, availability, processing integrity, confidentiality, privacy. Type I = controls exist at a point in time. Type II = controls operated effectively over 6-12 months. |
| **Why relevant to Caelith** | SOC 2 is the US/global standard for SaaS trust. Increasingly requested by international fund managers and larger KVGs with global operations. If you ever sell to UK, Luxembourg, or US-adjacent fund admins, this becomes important. |
| **Cost estimate** | Type I: €15-25k (audit + tooling like Vanta/Drata). Type II: €20-35k. Annual: €15-25k. Automation platforms (Vanta, Drata, Secureframe): €6-15k/year. |
| **Timeline** | Type I: 3-6 months. Type II: 6-12 months after Type I. |
| **ROI** | **🟡 HIGH — #2 priority.** Here's why: SOC 2 Type I is *faster and more practical* than ISO 27001 for a solo founder. Platforms like Vanta automate 70% of it. You can credibly say "SOC 2 Type I certified" within 3-4 months. German KVGs increasingly accept SOC 2 alongside ISO 27001. **However**, pure-play German KVGs still prefer ISO 27001. If your market is 100% German, swap #1 and #2. If you plan to expand to Lux/UK/international, SOC 2 first. |

### ISO 22301 — Business Continuity Management

| Aspect | Detail |
|---|---|
| **What it covers** | Business impact analysis, continuity strategies, disaster recovery, testing/exercising recovery plans. |
| **Why relevant to Caelith** | KVGs need to ensure their outsourced services have continuity plans (MaRisk AT 7.3). If Caelith goes down during a regulatory reporting deadline, that's a BaFin issue for the KVG. |
| **Cost estimate** | €8-15k certification. €4-6k/year maintenance. |
| **Timeline** | 4-6 months. |
| **ROI** | **⚪ LOW — #7 priority.** You need a *documented* BCP/DR plan (this is a quick win, see Section 3). Formal certification is overkill until you're handling mission-critical daily operations for multiple KVGs. |

### ISO 42001 — AI Management System

| Aspect | Detail |
|---|---|
| **What it covers** | Responsible AI governance: risk management for AI systems, transparency, fairness, data quality, human oversight, AI lifecycle management. Brand new standard (2023). |
| **Why relevant to Caelith** | Your Compliance Copilot feature uses AI for compliance decisions. In a regulated financial context, this is sensitive — AI-assisted compliance decisions that turn out wrong create regulatory liability. The EU AI Act classifies financial compliance tools as potentially high-risk. |
| **Cost estimate** | Very few accredited auditors yet. Estimated €15-25k. Market still forming. |
| **Timeline** | 6-12 months. Few precedents to follow. |
| **ROI** | **🟢 MEDIUM — #4 priority (strategically).** This is a *future differentiator*, not a current sales requirement. No KVG is asking for it today. But being among the first RegTech companies with ISO 42001 is a powerful marketing story. Target this for 2027 when the EU AI Act enforcement ramps up. For now, document your AI governance approach (see Quick Wins). |

### Additional Relevant Standards

**C5 (Cloud Computing Compliance Criteria Catalogue) — BSI**
| Aspect | Detail |
|---|---|
| **What it covers** | German Federal Office for Information Security (BSI) catalog of 121 criteria for cloud security. Essentially Germany's answer to SOC 2 for cloud services. |
| **Why relevant** | BaFin explicitly references C5 in its cloud outsourcing guidance. Some KVGs may require C5 attestation for cloud-hosted services. This is very Germany-specific and increasingly important. |
| **Cost** | €20-40k for Type 1, requires a WP (Wirtschaftsprüfer) audit. |
| **Timeline** | 6-12 months. |
| **ROI** | **🟡 HIGH for pure German market.** If BaFin tightens cloud outsourcing rules (likely under DORA), C5 could become mandatory. Watch this space. Not feasible at 1-person stage but plan for it. |

**ISAE 3402 / IDW PS 951**
| Aspect | Detail |
|---|---|
| **What it covers** | German equivalent of SOC 2 — assurance report on controls at a service organization, audited by a Wirtschaftsprüfer. |
| **Why relevant** | Some traditional German KVGs and their auditors (WPs) specifically request IDW PS 951 reports because it's the framework they know. |
| **Cost** | €15-30k. |
| **ROI** | **🟢 MEDIUM.** Only pursue if specific customers request it. SOC 2 / ISO 27001 typically suffice. |

---

## 2. Prioritized Roadmap (ROI-Ranked)

### Phase 0: Now → Month 3 (Quick Wins — €0-3k)
*No certification. Build credibility through documentation and transparency.*

→ See Section 3 for complete list.

### Phase 1: Month 3-9 — ISO 27001 (€15-35k)

**This is your #1 priority. Everything else is secondary.**

| Rank | Standard | Action | Why |
|---|---|---|---|
| **#1** | **ISO 27001** | Full certification | Unlocks enterprise KVG sales. Required by BaFin outsourcing rules. Non-negotiable for serious customers. |
| **#2** | **SOC 2 Type I** | Consider doing *instead of* or *alongside* 27001 if international expansion planned | Faster via automation platforms. Increasingly accepted in DACH. |

**Decision point:** If budget is tight, pick ONE:
- 100% German market → ISO 27001
- International ambitions → SOC 2 Type I first (faster), ISO 27001 second

### Phase 2: Month 9-18 — Privacy & Trust Layer (€8-15k incremental)

| Rank | Standard | Action | Why |
|---|---|---|---|
| **#3** | **ISO 27701** | Add to existing 27001 ISMS | GDPR proof. Differentiator in privacy-sensitive German market. |
| **#4** | **ISO 42001** | Begin documentation only | EU AI Act preparation. Marketing value. Formal cert in 2027+. |

### Phase 3: Month 18-36 — Enterprise Readiness (€15-30k)

| Rank | Standard | Action | Why |
|---|---|---|---|
| **#5** | **ISO 27017** | Bundle with surveillance audit | Cloud security checkbox for enterprise procurement. |
| **#6** | **ISO 27018** | Bundle with surveillance audit | PII-in-cloud specific. |
| **#7** | **ISO 22301** | Formal certification | BCP for mission-critical deployments. |
| **#8** | **ISO 9001** | Only if customers explicitly request | Operational maturity signal. Low priority for SaaS. |

### Phase 4: When Revenue Justifies (€20-40k)

| Standard | Trigger |
|---|---|
| **BSI C5** | When BaFin/DORA mandates it or a Tier-1 KVG requires it |
| **ISAE 3402 / IDW PS 951** | When a customer's WP specifically requests it |
| **SOC 2 Type II** | When selling to UK/Lux/US fund ecosystem |

### Total Investment Roadmap

| Phase | Timeline | Investment | Revenue Needed |
|---|---|---|---|
| Phase 0 | Now | €0-3k | Pre-revenue OK |
| Phase 1 | Month 3-9 | €15-35k | Seed funding or €5k+ MRR |
| Phase 2 | Month 9-18 | €8-15k incremental | €10k+ MRR |
| Phase 3 | Month 18-36 | €15-30k | €25k+ MRR |
| Phase 4 | 36+ months | €20-40k per cert | €50k+ MRR |

---

## 3. Quick Wins (Implement NOW — Week 1-4)

These cost almost nothing but dramatically change how you're perceived in vendor due diligence.

### 🔒 Security & Trust Page (Week 1)
Create `caelith.com/security` with:
- **Data hosting:** "All data hosted in EU (AWS Frankfurt / eu-central-1)" — confirm this is true
- **Encryption:** "AES-256 at rest, TLS 1.3 in transit"
- **Access control:** "Role-based access, MFA enforced"
- **Data segregation:** "Single-tenant architecture — your data is never co-mingled"
- **Backups:** "Daily encrypted backups, 30-day retention, tested recovery"
- **Incident response:** Link to your incident response procedure
- **Sub-processors:** List (AWS, Railway, any others)

### 📋 Data Processing Agreement (Week 1)
- Draft a GDPR-compliant DPA (Art. 28) — use templates from [DPA Generator tools] or adapt from established SaaS companies
- Include: sub-processor list, data location, deletion procedures, audit rights, breach notification SLA
- Make it downloadable or pre-signed on your website
- **This is non-negotiable for any German B2B sale**

### 📊 Technical & Organizational Measures (TOMs) Document (Week 1-2)
German companies specifically request a "TOM-Dokument" (Technische und Organisatorische Maßnahmen). Create one covering:
- Access control (physical + logical)
- Input control (audit logging)
- Transfer control (encryption)
- Availability control (backups, DR)
- Separation control (tenant isolation)
- This is a standard GDPR Art. 32 requirement — every German company knows to ask for it

### 🛡️ Penetration Test (Week 2-4, €1-3k)
- Commission a basic pentest from a German provider (e.g., SySS, Cure53, or smaller firms)
- Even a lightweight web application pentest (€1-2k) gives you a report you can share
- "Independently pen-tested" is a powerful trust signal
- Fix any critical/high findings before sharing

### 📝 Information Security Policy Pack (Week 2-3)
Write these core policies (even if it's just you):
1. Information Security Policy
2. Access Control Policy
3. Data Classification Policy
4. Incident Response Plan
5. Business Continuity / Disaster Recovery Plan
6. Acceptable Use Policy
7. Change Management Policy
8. Vendor/Supplier Security Policy

These form the backbone of ISO 27001 anyway — you're pre-building your ISMS.

### 🤖 AI Transparency Statement (Week 1)
For your Copilot feature:
- "AI-assisted recommendations, human-approved decisions"
- Describe the model used, data handling, and that no customer data is used for training
- State that all AI outputs are logged and auditable
- Reference EU AI Act awareness

### 📜 Certifications-in-Progress Statement (Week 1)
You can legitimately state:
- *"Caelith is currently implementing an Information Security Management System aligned with ISO 27001, with certification targeted for [Q3 2026]."*
- *"SOC 2 Type I assessment planned for [Q4 2026]."*
- Don't say "SOC 2 compliant" or "ISO 27001 compliant" — that implies certification you don't have

### 🏗️ Compliance Automation Platform (Week 1, €0-500/mo)
Sign up for Vanta, Drata, or Secureframe (some have startup programs with free/discounted tiers):
- Connects to AWS, GitHub, etc. and continuously monitors controls
- Auto-generates evidence for future SOC 2 / ISO 27001 audits
- Gives you a "Trust Center" page you can share with prospects immediately
- **Vanta's startup program** and **Drata's seed-stage pricing** are worth investigating

### 📁 Vendor Questionnaire Response Template
Pre-fill a standard security questionnaire (SIG, CAIQ, or German ISAE-style) with your answers. When a KVG sends their vendor assessment, you respond in 24h instead of scrambling for weeks.

---

## 4. German Market Specifics

### What German KVGs Look For in Vendor Due Diligence

German KVGs are BaFin-regulated. When they outsource to a SaaS provider, they must comply with:

#### MaRisk (Mindestanforderungen an das Risikomanagement)
- **AT 9 (Outsourcing):** KVGs must perform risk analysis before outsourcing. They need to assess your:
  - Financial stability (problematic for pre-seed — be transparent, offer escrow)
  - Business continuity capability
  - Information security posture
  - Audit rights (you MUST grant their auditors access to inspect your operations)
  - Exit strategy (data portability — how do they get their data out?)

#### BAIT → now transitioning to DORA
- **Bankaufsichtliche Anforderungen an die IT** is being superseded by DORA (Digital Operational Resilience Act), effective January 2025
- DORA requirements for ICT third-party service providers:
  - Contractual requirements (SLAs, audit rights, termination, data access)
  - Concentration risk assessment
  - Incident reporting
  - Resilience testing
  - **Register of all ICT third-party arrangements** — you'll be in this register

#### KAGB Outsourcing Requirements
- §36 KAGB governs outsourcing by KVGs
- BaFin must be notified of material outsourcing
- If your platform handles compliance decisions, this could be classified as **material outsourcing** (wesentliche Auslagerung), triggering:
  - Formal BaFin notification
  - Enhanced due diligence on you
  - Ongoing monitoring requirements
  - Your compliance with their regulatory obligations

#### What They'll Actually Ask You

Based on typical German KVG vendor assessments:

1. **ISO 27001 certified?** (Most important single question)
2. **Where is data hosted?** (Must be EU, ideally Germany)
3. **DPA signed?** (Must have)
4. **TOM document?** (Must have)
5. **Penetration test results?** (Strongly expected)
6. **Business continuity plan?** (Expected)
7. **Sub-processor list?** (Required by GDPR)
8. **Audit rights?** (Non-negotiable — they need contractual right to audit you)
9. **Incident notification SLA?** (GDPR: 72h, DORA: tighter)
10. **Exit/transition plan?** (What happens if Caelith shuts down?)
11. **Insurance?** (Cyber insurance / professional liability)
12. **Financial stability?** (References, funding status)
13. **DORA compliance status?** (New requirement)

#### BSI IT-Grundschutz

- Germany's own security framework, maintained by BSI (Bundesamt für Sicherheit in der Informationstechnik)
- More prescriptive than ISO 27001 (specific technical controls vs. risk-based approach)
- **ISO 27001 auf Basis von IT-Grundschutz** is a German-specific certification variant
- Some government-adjacent or very conservative KVGs prefer this
- **Recommendation:** Don't pursue Grundschutz certification — standard ISO 27001 is sufficient. But familiarize yourself with the Grundschutz Kompendium for technical control implementation; it's excellent practical guidance
- Available free at bsi.bund.de

#### DORA (Digital Operational Resilience Act) — The New Reality

Since January 2025, DORA applies to financial entities including KVGs. Key impacts for Caelith as an ICT third-party provider:

- You may need to be registered in the **EU Oversight Framework** if you become a "critical ICT third-party service provider"
- At current scale this is unlikely, but be aware of the trajectory
- KVGs must include specific DORA-mandated clauses in contracts with you
- Prepare contract templates that already include these clauses — this makes their procurement process frictionless

### The "1-Person Startup" Objection

**This will be your biggest challenge.** Let's be honest:

KVGs will worry about:
- **Key-person risk:** If you're hit by a bus, their compliance platform is dead
- **Financial viability:** Pre-seed startup handling their regulatory obligations
- **Audit capacity:** Can a 1-person company handle audit requests?

**Mitigation strategies:**
1. **Source code escrow:** Offer to place source code in escrow (e.g., Iron Mountain, NCC Group). If Caelith ceases operations, the customer gets the code. Cost: €2-5k/year. Huge trust builder.
2. **Data export guarantees:** Demonstrate that all data can be exported in standard formats at any time. Build this feature prominently.
3. **Transparent roadmap:** Share your hiring and funding plans. KVGs respect honesty.
4. **Reference customers:** Your first 1-2 customers are disproportionately valuable. Consider discounted pricing in exchange for being a reference.
5. **Professional liability insurance:** Get IT professional liability (IT-Haftpflicht) and cyber insurance. German companies check for this.

---

## 5. Recommended First 90 Days Action Plan

| Week | Action | Cost | Impact |
|---|---|---|---|
| 1 | Create security page on website | €0 | Immediate trust signal |
| 1 | Draft and publish DPA | €0-500 | Removes procurement blocker |
| 1 | Write TOM document | €0 | Required for every German B2B sale |
| 1 | Publish AI transparency statement | €0 | Proactive EU AI Act positioning |
| 2 | Sign up for Vanta/Drata (startup plan) | €0-300/mo | Continuous monitoring + trust center |
| 2 | Start writing core security policies | €0 | Foundation for ISO 27001 |
| 2 | Prepare vendor questionnaire template | €0 | Fast response to prospects |
| 3 | Commission penetration test | €1-3k | Independent validation |
| 4 | Confirm EU-only data residency (verify Railway/AWS config) | €0 | Factual basis for claims |
| 4 | Get cyber insurance quote | €1-2k/yr | Professional credibility |
| 5-8 | Engage ISO 27001 consultant for gap assessment | €2-5k | Roadmap to certification |
| 8-12 | Begin formal ISO 27001 implementation | €10-20k | Sales accelerator |

---

## Summary: The Honest Path

**Year 1 (Pre-seed / Seed):**
- Quick wins from Section 3 (€2-5k total)
- ISO 27001 certification (€15-35k) — time this with your seed round
- Every sales conversation should include: "We're pursuing ISO 27001 certification, targeted for [date]. Here's our current security posture: [link to security page]"

**Year 2 (Post-seed, 3-5 employees):**
- ISO 27701 (GDPR extension)
- SOC 2 Type I (if international expansion)
- Begin ISO 42001 documentation

**Year 3+ (Growth, 10+ employees):**
- SOC 2 Type II
- BSI C5 (if market demands)
- ISO 27017/27018 bundle
- ISO 22301

**The meta-lesson:** In the German KVG market, trust is earned through documentation, not just technology. A well-written TOM document and a DPA ready on Day 1 of a sales conversation signals more maturity than a flashy product demo. Lead with compliance, not features.

---

*This analysis reflects the regulatory landscape as of February 2026. DORA enforcement and EU AI Act developments may shift priorities. Review quarterly.*
