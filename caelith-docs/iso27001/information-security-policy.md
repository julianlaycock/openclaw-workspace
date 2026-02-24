# Information Security Policy

**Document ID:** ISMS-POL-001  
**Version:** 1.0  
**Effective Date:** 2026-02-23  
**Next Review:** 2027-02-23  
**Classification:** Internal  
**Owner:** CEO  
**Approved by:** Julian Laycock, CEO

---

## 1. Purpose

This policy establishes the framework for managing information security across the Caelith platform and organisation. It defines the commitment, objectives, and responsibilities for protecting information assets in accordance with ISO/IEC 27001:2022.

## 2. Scope

This policy applies to:

- **The Caelith SaaS platform** — a multi-tenant fund compliance solution for alternative investment managers
- **All environments:** production (Railway), staging, and development
- **All information assets:** source code (GitHub), databases (PostgreSQL), AI services (Anthropic Claude), external API integrations (OpenSanctions, regulatory feeds), and operational infrastructure
- **All personnel:** employees, contractors, and third parties with access to Caelith systems or data
- **All locations:** remote work environments, cloud infrastructure, and any location from which Caelith systems are accessed

## 3. Information Security Objectives

1. **Confidentiality** — Protect customer data (investor PII, fund structures, compliance decisions) from unauthorised disclosure, with strict multi-tenant isolation
2. **Integrity** — Ensure the accuracy and completeness of compliance records, including tamper-evident decision audit trails (hash chain integrity)
3. **Availability** — Maintain reliable access to the platform for all customers within agreed service levels
4. **Regulatory Compliance** — Meet requirements of GDPR, AIFMD II, KWG, and applicable AML/KYC regulations
5. **Trust** — Maintain customer and regulatory confidence through demonstrable security controls

## 4. Management Commitment

> As CEO of Caelith, I am committed to establishing and maintaining an Information Security Management System (ISMS) that protects our customers' data, meets regulatory requirements, and supports our business objectives.
>
> I commit to:
> - Providing the resources necessary to implement and operate the ISMS
> - Ensuring information security objectives are established and aligned with our strategic direction
> - Promoting continual improvement of the ISMS
> - Supporting all personnel in contributing to the effectiveness of the ISMS
>
> Information security is not optional — it is fundamental to the trust our customers place in us to manage their compliance data.
>
> — **Julian Laycock, CEO**

## 5. Roles and Responsibilities

| Role | Responsibility |
|------|---------------|
| **CEO** | Overall accountability for the ISMS; approves policies; ensures adequate resources; risk owner for strategic risks |
| **CTO** | Operational responsibility for security controls; manages technical implementation; leads incident response; reports security posture to CEO |
| **All Employees** | Comply with security policies; complete security awareness training; report incidents and vulnerabilities promptly |
| **Third Parties** | Comply with security requirements defined in contracts and data processing agreements (AVV) |

## 6. Policy Framework

This policy is supported by:

- **Risk Register** (ISMS-RISK-001) — ISO 27005-aligned risk assessment and treatment
- **Statement of Applicability** (ISMS-SOA-001) — Mapping of ISO 27001:2022 Annex A controls
- **Asset Inventory** (ISMS-ASSET-001) — Classification and ownership of information assets
- **Incident Response Plan** (docs/INCIDENT-RESPONSE.md) — Procedures for security incident handling
- **Data Classification Policy** (docs/DATA-CLASSIFICATION.md) — Four-tier classification scheme
- **Data Processing Agreement** (docs/avv-template.md) — GDPR Article 28 template
- **Breach Notification Procedure** (docs/breach-notification-procedure.md) — GDPR Article 33/34 compliance

## 7. Key Principles

1. **Least privilege** — Access is granted on a need-to-know basis with role-based access control
2. **Defence in depth** — Multiple layers of security controls (RLS, JWT, rate limiting, input validation)
3. **Tenant isolation** — Row-Level Security enforced at the database level for all tenant-scoped data
4. **Privacy by design** — PII is classified, minimised, and stripped before transmission to third-party AI services
5. **Auditability** — All significant actions are logged; compliance decisions maintain cryptographic integrity chains

## 8. Policy Review

- This policy shall be reviewed **at least annually** or upon significant changes to the business, technology, threat landscape, or regulatory environment
- Reviews are initiated by the CTO and approved by the CEO
- All changes are version-controlled and communicated to relevant personnel

## 9. Compliance

Non-compliance with this policy may result in disciplinary action, up to and including termination. Deliberate violations may be reported to relevant authorities.

---

*Document Control: This policy is maintained under version control in the Caelith repository.*
