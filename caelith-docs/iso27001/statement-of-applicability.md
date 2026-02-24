# Statement of Applicability (SoA)

**Document ID:** ISMS-SOA-001  
**Version:** 1.0  
**Date:** 2026-02-23  
**Standard:** ISO/IEC 27001:2022 Annex A  
**Owner:** CTO  
**Classification:** Confidential

---

## Legend

- **Status:** Implemented | Partial | Planned | N/A
- **Applicable:** Yes / No (with justification if No)

---

## A.5 — Organisational Controls

| Control | Name | Applicable | Justification | Status | Evidence |
|---------|------|-----------|---------------|--------|----------|
| A.5.1 | Policies for information security | Yes | Foundation of ISMS | Implemented | `docs/iso27001/information-security-policy.md` |
| A.5.2 | Information security roles and responsibilities | Yes | Roles defined in security policy | Implemented | Security policy §5 |
| A.5.3 | Segregation of duties | Yes | Small team — partial segregation | Partial | Role-based access; full segregation limited by team size |
| A.5.4 | Management responsibilities | Yes | CEO commitment documented | Implemented | Security policy §4 |
| A.5.5 | Contact with authorities | Yes | GDPR breach notification requirements | Partial | `docs/breach-notification-procedure.md`; authority contact list planned |
| A.5.6 | Contact with special interest groups | Yes | Security community engagement | Planned | To establish industry group memberships |
| A.5.7 | Threat intelligence | Yes | Awareness of threats to SaaS/fintech | Planned | Threat intel feeds to be subscribed |
| A.5.8 | Information security in project management | Yes | Security considered in all development | Partial | Threat model exists; formal gate reviews planned |
| A.5.9 | Inventory of information and other associated assets | Yes | Asset tracking required | Implemented | `docs/iso27001/asset-inventory.md` |
| A.5.10 | Acceptable use of information and other associated assets | Yes | Define acceptable use | Planned | Acceptable use policy to be created |
| A.5.11 | Return of assets | Yes | Employee offboarding | Planned | Offboarding checklist to be created |
| A.5.12 | Classification of information | Yes | Four-tier classification in use | Implemented | `docs/DATA-CLASSIFICATION.md` |
| A.5.13 | Labelling of information | Yes | Classification labels on documents | Partial | Document headers include classification; automated labelling planned |
| A.5.14 | Information transfer | Yes | Data shared with third parties (Anthropic, OpenSanctions) | Partial | PII stripping implemented; formal transfer policy planned |
| A.5.15 | Access control | Yes | Multi-tenant access control critical | Implemented | RBAC + RLS + JWT |
| A.5.16 | Identity management | Yes | User identity lifecycle | Partial | User creation/soft-delete; formal lifecycle process planned |
| A.5.17 | Authentication information | Yes | Password and token management | Partial | bcrypt hashing, JWT; MFA planned |
| A.5.18 | Access rights | Yes | Role-based access | Implemented | RBAC roles (admin, manager, analyst, viewer) |
| A.5.19 | Information security in supplier relationships | Yes | Third-party services used | Partial | API ToS in place; formal supplier security assessments planned |
| A.5.20 | Addressing information security within supplier agreements | Yes | Contractual security requirements | Partial | AVV template exists; supplier-specific agreements planned |
| A.5.21 | Managing information security in the ICT supply chain | Yes | npm dependencies, cloud services | Planned | SBOM generation and dependency auditing planned |
| A.5.22 | Monitoring, review and change management of supplier services | Yes | Cloud provider monitoring | Planned | Supplier review process to be established |
| A.5.23 | Information security for use of cloud services | Yes | Railway, GitHub, Anthropic | Partial | Cloud services in use with basic security; formal cloud security policy planned |
| A.5.24 | Information security incident management planning and preparation | Yes | Incident handling required | Implemented | `docs/INCIDENT-RESPONSE.md` |
| A.5.25 | Assessment and decision on information security events | Yes | Event triage process | Partial | Incident response plan exists; formal triage criteria planned |
| A.5.26 | Response to information security incidents | Yes | Incident response execution | Partial | Incident response plan exists; tabletop exercises planned |
| A.5.27 | Learning from information security incidents | Yes | Post-incident improvement | Planned | Post-incident review process to be formalised |
| A.5.28 | Collection of evidence | Yes | Forensic capability | Planned | Log retention and evidence collection procedures planned |
| A.5.29 | Information security during disruption | Yes | Business continuity | Planned | BC/DR plan to be developed |
| A.5.30 | ICT readiness for business continuity | Yes | Platform resilience | Planned | DR testing and failover planning |
| A.5.31 | Legal, statutory, regulatory and contractual requirements | Yes | GDPR, AIFMD II, KWG | Partial | `docs/COMPLIANCE-MAP.md`; regulatory tracking ongoing |
| A.5.32 | Intellectual property rights | Yes | Source code, third-party licences | Partial | Private repo; licence compliance review planned |
| A.5.33 | Protection of records | Yes | Compliance and audit records | Implemented | Decision records with hash chain integrity |
| A.5.34 | Privacy and protection of PII | Yes | GDPR compliance critical | Partial | PII inventory, AVV, classification exist; DPIA and SAR automation planned |
| A.5.35 | Independent review of information security | Yes | Objective assurance | Planned | External audit/penetration test planned |
| A.5.36 | Compliance with policies, rules and standards for information security | Yes | Internal compliance verification | Planned | Internal audit programme to be established |
| A.5.37 | Documented operating procedures | Yes | Operational consistency | Partial | Some procedures documented; comprehensive runbook planned |

## A.6 — People Controls

| Control | Name | Applicable | Justification | Status | Evidence |
|---------|------|-----------|---------------|--------|----------|
| A.6.1 | Screening | Yes | Background checks for access to restricted data | Planned | Pre-employment screening process to be formalised |
| A.6.2 | Terms and conditions of employment | Yes | Security obligations in contracts | Planned | Employment contract security clauses to be added |
| A.6.3 | Information security awareness, education and training | Yes | All personnel need security awareness | Planned | Security awareness programme to be developed |
| A.6.4 | Disciplinary process | Yes | Enforce policy compliance | Planned | Disciplinary procedures to reference security policy |
| A.6.5 | Responsibilities after termination or change of employment | Yes | Protect information after departure | Planned | Offboarding process with access revocation |
| A.6.6 | Confidentiality or non-disclosure agreements | Yes | Protect sensitive information | Partial | NDAs used with some parties; standardisation planned |
| A.6.7 | Remote working | Yes | Fully remote team | Partial | HTTPS access; formal remote work security policy planned |
| A.6.8 | Information security event reporting | Yes | Incident reporting by all staff | Partial | Incident response plan exists; reporting channel to be formalised |

## A.7 — Physical Controls

| Control | Name | Applicable | Justification | Status | Evidence |
|---------|------|-----------|---------------|--------|----------|
| A.7.1 | Physical security perimeters | No | Fully cloud-hosted; no physical premises | N/A | — |
| A.7.2 | Physical entry | No | No physical offices/data centres | N/A | — |
| A.7.3 | Securing offices, rooms and facilities | No | No physical offices | N/A | — |
| A.7.4 | Physical security monitoring | No | No physical premises | N/A | — |
| A.7.5 | Protecting against physical and environmental threats | No | Cloud infrastructure managed by Railway | N/A | Railway's responsibility |
| A.7.6 | Working in secure areas | No | No secure areas | N/A | — |
| A.7.7 | Clear desk and clear screen | Yes | Remote workers handle sensitive data | Planned | Clear desk/screen policy to be included in remote work policy |
| A.7.8 | Equipment siting and protection | Yes | Developer workstations | Partial | Employee responsibility; formal guidance planned |
| A.7.9 | Security of assets off-premises | Yes | Laptops used remotely | Planned | Device security policy planned |
| A.7.10 | Storage media | Yes | Local development may have data copies | Planned | Media handling policy planned |
| A.7.11 | Supporting utilities | No | Cloud hosted | N/A | Railway's responsibility |
| A.7.12 | Cabling security | No | No physical cabling | N/A | — |
| A.7.13 | Equipment maintenance | No | Cloud hosted; no physical equipment to maintain | N/A | — |
| A.7.14 | Secure disposal or re-use of equipment | Yes | Employee device lifecycle | Planned | Device disposal procedures planned |

## A.8 — Technological Controls

| Control | Name | Applicable | Justification | Status | Evidence |
|---------|------|-----------|---------------|--------|----------|
| A.8.1 | User endpoint devices | Yes | Developer workstations access production | Planned | Endpoint security policy planned |
| A.8.2 | Privileged access rights | Yes | Database and infrastructure admin access | Partial | Role separation exists; superuser audit under review (R06) |
| A.8.3 | Information access restriction | Yes | Multi-tenant data isolation critical | Implemented | RLS policies on all tenant-scoped tables; RBAC roles |
| A.8.4 | Access to source code | Yes | Source code is confidential asset | Partial | Private GitHub repo; branch protection; fine-grained access planned |
| A.8.5 | Secure authentication | Yes | User authentication for SaaS | Partial | bcrypt + JWT + brute-force protection; MFA planned |
| A.8.6 | Capacity management | Yes | Platform performance and availability | Partial | Railway scaling; formal capacity planning planned |
| A.8.7 | Protection against malware | Yes | Application and endpoint protection | Planned | WAF and endpoint protection planned |
| A.8.8 | Management of technical vulnerabilities | Yes | Application and dependency vulnerabilities | Planned | Vulnerability scanning and patching process planned |
| A.8.9 | Configuration management | Yes | Infrastructure and application configuration | Partial | Environment variables managed; formal configuration baseline planned |
| A.8.10 | Information deletion | Yes | GDPR right to erasure | Partial | Soft deletes implemented; hard deletion and verification planned |
| A.8.11 | Data masking | Yes | PII protection in non-production environments | Partial | PII stripping for Anthropic; full data masking for staging planned |
| A.8.12 | Data leakage prevention | Yes | Prevent unauthorized data exfiltration | Partial | RLS + PII stripping; DLP tooling planned |
| A.8.13 | Information backup | Yes | Data protection against loss | Partial | Railway automated snapshots; restore testing planned (R14) |
| A.8.14 | Redundancy of information processing facilities | Yes | Platform availability | Planned | Single-region currently; multi-region DR planned |
| A.8.15 | Logging | Yes | Security event and audit logging | Partial | Audit events logged; centralised log management (SIEM) planned |
| A.8.16 | Monitoring activities | Yes | Detect security events | Planned | Monitoring and alerting (SIEM) planned (R22) |
| A.8.17 | Clock synchronisation | Yes | Log correlation | Implemented | Railway platform provides NTP synchronisation |
| A.8.18 | Use of privileged utility programs | Yes | Administrative tools | Partial | Database admin tools restricted; formal control planned |
| A.8.19 | Installation of software on operational systems | Yes | Change control for deployments | Partial | Git-based deployments; formal change management planned |
| A.8.20 | Networks security | Yes | Network-level protection | Partial | HTTPS enforced; internal network segmentation is Railway-managed |
| A.8.21 | Security of network services | Yes | Network service protection | Partial | HSTS, TLS; WAF planned |
| A.8.22 | Segregation of networks | Yes | Environment separation | Partial | Separate Railway environments; formal segmentation planned |
| A.8.23 | Web filtering | No | Not applicable to SaaS backend | N/A | — |
| A.8.24 | Use of cryptography | Yes | Data protection in transit and at rest | Partial | TLS in transit; encryption at rest planned (R04, R05) |
| A.8.25 | Secure development life cycle | Yes | Application security | Partial | Threat model, security middleware; formal SDLC security gates planned |
| A.8.26 | Application security requirements | Yes | Security built into application | Implemented | Input validation, rate limiting, CSRF protection, security headers |
| A.8.27 | Secure system architecture and engineering principles | Yes | Defence-in-depth architecture | Implemented | RLS, JWT, rate limiting, input sanitisation, hash chain integrity |
| A.8.28 | Secure coding | Yes | Prevent vulnerabilities in code | Partial | Parameterised queries, input validation; SAST/code review process planned |
| A.8.29 | Security testing in development and acceptance | Yes | Verify security before deployment | Planned | Penetration testing and security testing in CI/CD planned |
| A.8.30 | Outsourced development | No | All development in-house | N/A | — |
| A.8.31 | Separation of development, test and production environments | Yes | Environment isolation | Implemented | Separate Railway environments (dev/staging/prod) |
| A.8.32 | Change management | Yes | Controlled changes to systems | Partial | Git PRs and Railway deployments; formal change management process planned |
| A.8.33 | Test information | Yes | Protect data used in testing | Planned | Production data masking for test environments planned |
| A.8.34 | Protection of information systems during audit testing | Yes | Audit does not compromise production | Planned | Audit testing procedures to be defined |

---

## Summary

| Category | Total | Applicable | N/A | Implemented | Partial | Planned |
|----------|-------|-----------|-----|------------|---------|---------|
| A.5 Organisational | 37 | 37 | 0 | 10 | 16 | 11 |
| A.6 People | 8 | 8 | 0 | 0 | 3 | 5 |
| A.7 Physical | 14 | 5 | 9 | 0 | 1 | 4 |
| A.8 Technological | 34 | 32 | 2 | 6 | 16 | 10 |
| **Total** | **93** | **82** | **11** | **16** | **36** | **30** |

---

*Next review: 2026-08-23 (semi-annual) or upon significant change to scope or controls.*
