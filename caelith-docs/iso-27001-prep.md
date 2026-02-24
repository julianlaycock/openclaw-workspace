# ISO 27001 Preparation — Gap Analysis & Control Mapping

**Status:** In Preparation  
**Date:** 2026-02-22  
**Owner:** Julian Laycock  

---

## Executive Summary

Caelith has strong foundational security controls already in place through DSGVO compliance work and the TOM document. This document maps existing controls to ISO 27001:2022 Annex A and identifies gaps.

**Overall Readiness: ~55%** — Many technical controls exist; documentation and process formalization needed.

---

## Control Mapping: Existing vs ISO 27001:2022 Annex A

### ✅ Already Covered (Quick Wins — Minimal Effort to Formalize)

| Annex A Control | Requirement | Our Implementation | Gap |
|---|---|---|---|
| A.5.1 | Information security policies | TOM document, data retention policy | Needs formal ISMS policy document |
| A.5.15 | Access control | RBAC (admin, compliance_officer, viewer) | ✅ Implemented |
| A.5.17 | Authentication information | bcrypt hashing, JWT httpOnly cookies | ✅ Implemented |
| A.5.23 | Cloud services security | Railway EU hosting, SSL/TLS | Document cloud security assessment |
| A.5.33 | Protection of records | SHA-256 hash chain audit trail, append-only | ✅ Implemented |
| A.5.34 | Privacy/PII protection | DSGVO Art. 15/17/20, PII stripping, pseudonymization | ✅ Implemented |
| A.8.1 | User endpoint devices | N/A (SaaS platform) | ✅ N/A |
| A.8.5 | Secure authentication | bcrypt, rate limiting, session management | ✅ Implemented |
| A.8.9 | Configuration management | Environment variables, .env.example | Document baseline configs |
| A.8.12 | Data leakage prevention | PII stripping before AI calls, CORS, CSP | ✅ Implemented |
| A.8.20 | Network security | HTTPS-only, TLS 1.2+ | ✅ Implemented |
| A.8.24 | Use of cryptography | SHA-256 audit chain, bcrypt, TLS | ✅ Implemented |
| A.8.25 | Secure development lifecycle | TypeScript strict, input validation | Document SDLC process |

### ⚠️ Partially Covered (Need Formalization)

| Annex A Control | Requirement | Current State | Action Needed |
|---|---|---|---|
| A.5.2 | Security roles & responsibilities | Julian = everything | Document roles formally |
| A.5.3 | Segregation of duties | Single developer | Acknowledge in risk assessment |
| A.5.8 | Security in project management | Ad-hoc | Create security review checklist |
| A.5.10 | Acceptable use of assets | Implicit | Write acceptable use policy |
| A.5.14 | Information transfer | TLS in transit, documented | Write data transfer policy |
| A.5.24 | Incident management planning | Breach notification procedure exists | Formalize incident response plan |
| A.5.25 | Assessment of security events | Audit log exists | Define triage criteria |
| A.5.26 | Response to security incidents | Breach procedure | Add playbooks |
| A.5.27 | Learning from incidents | Not formalized | Create post-incident review template |
| A.5.29 | Business continuity | Railway auto-recovery | Write BCP document |
| A.5.30 | ICT readiness for continuity | Auto-backups via Railway | Document RTO/RPO targets |
| A.5.35 | Independent review | GDPR audit conducted | Schedule periodic security reviews |
| A.5.36 | Compliance with policies | GDPR audit report | Regular compliance checks |
| A.8.8 | Technical vulnerability management | npm audit, dependabot | Document patch management process |
| A.8.15 | Logging | Audit trail, server logs | Centralize log management |
| A.8.16 | Monitoring | Basic health checks | Implement alerting/monitoring |

### ❌ Major Gaps (Significant Work Required)

| Annex A Control | Requirement | Current State | Effort |
|---|---|---|---|
| A.5.4 | Management responsibility | No formal management commitment | Write management commitment statement |
| A.5.5 | Contact with authorities | Not documented | Document BaFin, BSI, DPA contacts |
| A.5.6 | Contact with special interest groups | None | Join ISACA/BSI community |
| A.5.7 | Threat intelligence | Not implemented | Subscribe to threat feeds |
| A.5.9 | Asset inventory | Not formalized | Create information asset register |
| A.5.11 | Return of assets | N/A currently | Write offboarding procedure |
| A.5.12 | Classification of information | Not classified | Define data classification scheme |
| A.5.13 | Labeling of information | Not implemented | Define labeling requirements |
| A.5.16 | Identity management | Basic user management | Document identity lifecycle |
| A.5.18 | Access rights | RBAC exists | Document access review process |
| A.5.19-22 | Supplier security | No formal process | Create supplier assessment framework |
| A.5.31 | Legal/regulatory requirements | DSGVO/AIFMD covered | Create compliance register |
| A.5.37 | Documented operating procedures | Partial (README, deploy docs) | Write ops runbooks |
| A.6.1-8 | People security | Solo founder | Write HR security policies |
| A.7.1-14 | Physical security | Cloud-only | Document cloud physical controls |
| A.8.2 | Privileged access | Railway dashboard only | Document privileged access management |
| A.8.4 | Access to source code | GitHub private repo | Document code access controls |
| A.8.7 | Anti-malware | Not managed (SaaS) | Document malware strategy |
| A.8.28 | Secure coding | TypeScript strict, validation | Write secure coding guidelines |

---

## Priority Roadmap

### Phase 1: Quick Wins (1-2 weeks)
1. ✅ Write formal ISMS scope and policy statement
2. ✅ Create information asset register
3. ✅ Document data classification scheme (Public, Internal, Confidential, Restricted)
4. ✅ Formalize incident response plan from existing breach procedure
5. ✅ Document contact list (BaFin, BSI, DPA Berlin)
6. ✅ Create management commitment statement

### Phase 2: Process Formalization (2-4 weeks)
1. Write risk assessment methodology
2. Conduct formal risk assessment
3. Create Statement of Applicability (SoA)
4. Document SDLC security process
5. Write access review procedure
6. Create supplier assessment framework
7. Document backup/recovery procedures with RTO/RPO

### Phase 3: Operational Maturity (1-3 months)
1. Implement centralized log management
2. Set up monitoring and alerting
3. Conduct internal audit
4. Schedule management review
5. Implement vulnerability scanning pipeline
6. Create security awareness training

### Phase 4: Certification (3-6 months)
1. Engage certification body
2. Stage 1 audit (documentation review)
3. Remediate findings
4. Stage 2 audit (implementation review)
5. Achieve certification

---

## Existing Documentation Inventory

| Document | ISO 27001 Relevance | Status |
|---|---|---|
| TOM Document (Art. 32 DSGVO) | A.5.1, A.8.5, A.8.20, A.8.24 | ✅ Complete |
| GDPR Audit Report | A.5.34, A.5.35 | ✅ Complete (Grade A) |
| Breach Notification Procedure | A.5.24, A.5.26 | ✅ Complete |
| Data Retention Policy | A.5.33 | ✅ Complete |
| AVV Template | A.5.19-22 | ✅ Complete |
| Verarbeitungsverzeichnis | A.5.34 | ✅ Complete |
| Architecture Documentation | A.8.25 | ✅ Complete |
| README / Setup Guide | A.5.37 | ✅ Complete |
| Regulatory Coverage Matrix | A.5.31 | ✅ Complete |

---

## Cost Estimate

| Item | Estimated Cost |
|---|---|
| Certification body (Stage 1 + 2) | €8,000 — €15,000 |
| Consultant support (optional) | €3,000 — €8,000 |
| Internal time (documentation) | ~80-120 hours |
| Annual surveillance audit | €3,000 — €5,000 |

---

*Last updated: 2026-02-22*
