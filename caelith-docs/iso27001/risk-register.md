# Risk Register

**Document ID:** ISMS-RISK-001  
**Version:** 1.0  
**Date:** 2026-02-23  
**Methodology:** ISO/IEC 27005:2022  
**Owner:** CTO  
**Classification:** Confidential

---

## Risk Assessment Criteria

**Likelihood Scale:**

| Score | Level | Description |
|-------|-------|-------------|
| 1 | Rare | < once per 5 years |
| 2 | Unlikely | Once per 1–5 years |
| 3 | Possible | Once per year |
| 4 | Likely | Multiple times per year |
| 5 | Almost Certain | Monthly or more |

**Impact Scale:**

| Score | Level | Description |
|-------|-------|-------------|
| 1 | Negligible | No data loss, no regulatory impact, <1h downtime |
| 2 | Minor | Limited data exposure (<10 records), minor operational disruption |
| 3 | Moderate | Significant data exposure, regulatory notification required, 4–24h downtime |
| 4 | Major | Large-scale breach, regulatory investigation, >24h downtime, customer loss |
| 5 | Critical | Catastrophic breach (all tenants), regulatory sanctions, existential business impact |

**Risk Appetite:** Risks scoring ≥12 require active mitigation. Risks scoring ≥16 are unacceptable and require immediate treatment.

---

## Risk Register

| ID | Description | Asset | Threat | Vulnerability | L | I | Score | Treatment | Annex A Control | Status |
|----|-------------|-------|--------|--------------|---|---|-------|-----------|----------------|--------|
| R01 | Prompt injection causes copilot to generate harmful SQL queries | Copilot service, PostgreSQL | Malicious user input | LLM susceptible to prompt injection despite read-only validation | 3 | 4 | **12** | Mitigate | A.8.26 Application security | Partial — read-only check exists; SQL AST parsing planned |
| R02 | PII leakage to Anthropic API via copilot queries | Customer PII (investors) | Data exfiltration via AI service | Blocklist-based PII stripping may miss new fields | 3 | 4 | **12** | Mitigate | A.5.34 Privacy and PII protection | Partial — stripPII exists; allowlist approach planned |
| R03 | Cross-tenant data disclosure via RLS bypass | All tenant data | Unauthorized access | RLS policy logic error or missing policy on new table | 2 | 5 | **10** | Mitigate | A.8.3 Access restriction | Implemented — strict RLS on all 12+ tables; no COALESCE fallback |
| R04 | PII stored unencrypted at rest in PostgreSQL | Investor PII (names, emails, tax IDs, LEIs) | Database compromise | No column-level encryption for restricted data | 3 | 4 | **12** | Mitigate | A.8.24 Use of cryptography | Gap — encryption at rest planned |
| R05 | KYC documents stored as unencrypted BYTEA | KYC documents | Database compromise | Binary documents lack application-level encryption | 3 | 4 | **12** | Mitigate | A.8.24 Use of cryptography | Gap — envelope encryption planned |
| R06 | Database superuser access bypasses all RLS | All tenant data | Privilege abuse | Application may connect with superuser role | 2 | 5 | **10** | Mitigate | A.8.2 Privileged access rights | Under review — connection role audit needed |
| R07 | JWT token theft enables account impersonation | User accounts, tenant data | Session hijacking | JWT stolen via XSS, network interception, or local storage access | 3 | 4 | **12** | Mitigate | A.8.5 Secure authentication | Partial — HTTPS enforced; token rotation planned |
| R08 | JWT signing key compromise | All user sessions | Key theft | No documented key rotation process | 2 | 5 | **10** | Mitigate | A.8.24 Use of cryptography | Gap — rotation process planned |
| R09 | DDoS / API flooding exhausts resources | Platform availability | Volumetric or application-layer DoS | Application-level rate limiting only; no WAF/CDN | 3 | 3 | **9** | Mitigate | A.8.6 Capacity management | Partial — rate limiting exists; WAF planned |
| R10 | SQL injection modifies data outside tenant scope | PostgreSQL data | Malicious input | Insufficient parameterisation in dynamic queries | 2 | 5 | **10** | Mitigate | A.8.28 Secure coding | Implemented — parameterised queries + RLS |
| R11 | Insider threat: employee exfiltrates customer data | All customer data | Malicious insider | Broad access rights; limited monitoring | 2 | 4 | **8** | Mitigate | A.6.1 Screening, A.8.15 Logging | Partial — RLS limits access; enhanced monitoring planned |
| R12 | Supply chain compromise via npm dependency | Application, source code | Malicious package update | No dependency pinning or SBOM generation | 3 | 4 | **12** | Mitigate | A.5.21 ICT supply chain security | Gap — SBOM and lockfile auditing planned |
| R13 | Anthropic API key leaked in logs or error messages | AI service access | Credential exposure | Secrets may appear in verbose error output | 2 | 3 | **6** | Mitigate | A.5.33 Protection of records | Partial — environment variable usage; log scrubbing planned |
| R14 | Data loss due to lack of tested backups | PostgreSQL data, Railway volumes | Infrastructure failure, human error | Backup/restore procedures not validated | 2 | 5 | **10** | Mitigate | A.8.13 Information backup | Gap — backup testing planned |
| R15 | GDPR non-compliance: incomplete data subject rights | Customer PII | Regulatory enforcement | No automated data export/deletion for data subjects | 3 | 4 | **12** | Mitigate | A.5.34 Privacy and PII protection | Partial — soft deletes exist; SAR process planned |
| R16 | AIFMD II regulatory non-compliance | Compliance decision records | Regulatory enforcement | AI-generated compliance advice may be inaccurate | 3 | 4 | **12** | Mitigate | A.5.31 Regulatory requirements | Partial — audit trail exists; human-in-the-loop review planned |
| R17 | Phishing attack targets Caelith users | User credentials | Social engineering | Users may enter credentials on fake login pages | 3 | 3 | **9** | Mitigate | A.6.3 Information security awareness | Gap — user awareness programme planned |
| R18 | Verbose error messages leak internal schema | Application architecture | Information gathering | Stack traces and DB schema exposed in error responses | 3 | 2 | **6** | Mitigate | A.8.26 Application security | Partial — production error handling under review |
| R19 | Decision record hash chain tampered via direct DB edit | Compliance audit trail | Data integrity attack | DBA with direct access can modify records | 2 | 4 | **8** | Mitigate | A.8.4 Access to source code | Implemented — immutability constraints + hash chain verification |
| R20 | Compromised external API feed injects malicious data | Screening results (OpenSanctions) | Supply chain attack | Insufficient validation of external data | 2 | 3 | **6** | Mitigate | A.5.21 ICT supply chain security | Partial — HTTPS enforced; response validation planned |
| R21 | GitHub repository compromise exposes source code and secrets | Source code, configuration | Unauthorized repository access | Weak access controls or leaked credentials | 2 | 4 | **8** | Mitigate | A.8.4 Access to source code | Partial — private repo; branch protection; secret scanning planned |
| R22 | Lack of intrusion detection delays breach response | All systems | Advanced persistent threat | No automated anomaly detection or alerting | 3 | 3 | **9** | Mitigate | A.8.16 Monitoring activities | Gap — SIEM/alerting planned |
| R23 | Password reset token prediction or reuse | User accounts | Account takeover | Token generation method not audited | 2 | 4 | **8** | Mitigate | A.8.5 Secure authentication | Under review |
| R24 | Malicious file upload via CSV import | Application, database | Code injection, resource exhaustion | CSV parsing may be exploitable | 2 | 3 | **6** | Accept | A.8.26 Application security | Implemented — MIME check, size limit, memory-only storage |
| R25 | Railway platform outage causes extended downtime | Platform availability | Cloud provider failure | Single-region deployment; no failover | 2 | 3 | **6** | Accept | A.8.14 Redundancy of IT facilities | Accepted — single region; DR plan to be developed |

---

## Risk Treatment Summary

| Treatment | Count | IDs |
|-----------|-------|-----|
| Mitigate | 23 | R01–R23 |
| Accept | 2 | R24, R25 |
| Transfer | 0 | — |
| Avoid | 0 | — |

**High-priority risks (score ≥ 12):** R01, R02, R04, R05, R07, R12, R15, R16 — require treatment plans within 90 days.

---

*Next review: 2026-05-23 (quarterly) or upon significant change.*
