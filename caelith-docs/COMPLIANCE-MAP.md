# Compliance Control Mapping

**Last updated:** 2026-02-23  
**Scope:** Caelith platform security controls mapped to SOC 2 Type II, GDPR, and ISO 27001

**Status legend:** ✅ Implemented | ⚠️ Partial | ❌ Gap

---

## 1. SOC 2 Type II — Trust Service Criteria

### CC1: Control Environment

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC1.1 | Organization demonstrates commitment to integrity and ethical values | ⚠️ Partial | `docs/SECURITY.md` (responsible disclosure); no formal code of conduct documented |
| CC1.2 | Board exercises oversight of internal controls | ❌ Gap | No board-level security oversight documented |
| CC1.3 | Management establishes structure, authority, and responsibility | ⚠️ Partial | Role-based access (admin/compliance_officer/viewer) in `migrations/003_users_auth.sql`; no org chart for security responsibilities |
| CC1.4 | Commitment to attract, develop, and retain competent individuals | ❌ Gap | No documented security training program |
| CC1.5 | Individuals held accountable for internal control responsibilities | ⚠️ Partial | Audit trail tracks user actions in `events` table; `src/backend/repositories/event-repository.ts` |

### CC2: Communication and Information

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC2.1 | Entity obtains/generates relevant, quality information | ✅ Implemented | Comprehensive audit trail: `events` table, decision records with hash chain; `migrations/017_integrity_chain.sql` |
| CC2.2 | Entity internally communicates information necessary for controls | ⚠️ Partial | Error logging via `src/backend/lib/logger.ts`; no centralized SIEM |
| CC2.3 | Entity communicates with external parties | ⚠️ Partial | `docs/breach-notification-procedure.md` exists; `docs/INCIDENT-RESPONSE.md` |

### CC3: Risk Assessment

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC3.1 | Entity specifies objectives with sufficient clarity | ✅ Implemented | `docs/PRD.md`, regulatory coverage documented in `docs/regulatory-coverage.md` |
| CC3.2 | Entity identifies and analyzes risks to objectives | ✅ Implemented | `docs/THREAT-MODEL.md` (STRIDE analysis) |
| CC3.3 | Entity considers potential for fraud | ⚠️ Partial | Hash chain tamper detection on decision records; no formal fraud risk assessment |
| CC3.4 | Entity identifies and assesses changes that could affect controls | ⚠️ Partial | Migration-based schema changes tracked in `migrations/`; no formal change management board |

### CC4: Monitoring Activities

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC4.1 | Entity selects, develops, and performs monitoring activities | ⚠️ Partial | Integrity chain verification endpoint (`src/backend/routes/integrity-routes.ts`); no automated continuous monitoring |
| CC4.2 | Entity evaluates and communicates deficiencies | ⚠️ Partial | `docs/CTO_AUDIT_REPORT.md` documents findings; no formal deficiency tracking |

### CC5: Control Activities

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC5.1 | Entity selects and develops control activities to mitigate risks | ✅ Implemented | RLS, rate limiting, input validation, CSRF protection; `src/backend/middleware/security.ts` |
| CC5.2 | Entity selects and develops general controls over technology | ✅ Implemented | Security headers, CSP, HSTS; `src/backend/middleware/security.ts` |
| CC5.3 | Entity deploys controls through policies and procedures | ⚠️ Partial | Controls are code-enforced; limited written policies (see `docs/data-retention-policy.md`, `docs/tom-document.md`) |

### CC6: Logical and Physical Access Controls

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC6.1 | Entity implements logical access security over protected information assets | ✅ Implemented | JWT authentication, RBAC, tenant isolation via RLS; `src/backend/middleware/auth.ts`, `migrations/019_security_hardening.sql` |
| CC6.2 | Prior to issuing system credentials, entity registers and authorizes new users | ✅ Implemented | User registration with role assignment; `src/backend/routes/auth-routes.ts` |
| CC6.3 | Entity authorizes, modifies, or removes access as needed | ⚠️ Partial | Soft delete on users (`deleted_at`); no automated access review/recertification |
| CC6.4 | Entity restricts physical access to facilities and protected assets | ❌ Gap | Cloud-hosted; no physical access controls documented |
| CC6.5 | Entity discontinues logical and physical protections over assets no longer needed | ⚠️ Partial | Refresh token expiry; `migrations/051_login_attempts_retention.sql` for login data cleanup |
| CC6.6 | Entity implements controls to prevent or detect unauthorized access | ✅ Implemented | Brute-force lockout (`login_attempts`), rate limiting, CSRF validation |
| CC6.7 | Entity restricts data transmission, movement, and removal | ⚠️ Partial | Export rate limiting; filename sanitization; no DLP controls |
| CC6.8 | Entity implements controls to prevent or detect deployment of unauthorized changes | ⚠️ Partial | Git-based version control; no formal change approval workflow documented |

### CC7: System Operations

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC7.1 | Entity detects and monitors configuration changes | ⚠️ Partial | Migration-tracked schema changes; events table logs data changes; no infra config monitoring |
| CC7.2 | Entity monitors system components for anomalies indicative of incidents | ❌ Gap | No SIEM or anomaly detection; application logging only |
| CC7.3 | Entity evaluates security events to determine if they constitute incidents | ⚠️ Partial | `docs/INCIDENT-RESPONSE.md` defines classification; no automated triage |
| CC7.4 | Entity responds to identified security incidents | ✅ Implemented | `docs/INCIDENT-RESPONSE.md` with procedures, templates, evidence preservation |
| CC7.5 | Entity identifies, develops, and implements recovery activities | ⚠️ Partial | Incident response plan exists; no documented disaster recovery / BCP |

### CC8: Change Management

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC8.1 | Entity authorizes, designs, develops, configures, documents, tests, approves, and implements changes | ⚠️ Partial | Git PRs + CI tests; sequential migrations in `migrations/`; no formal CAB |

### CC9: Risk Mitigation

| Criterion | Control Description | Status | Evidence |
|-----------|-------------------|--------|----------|
| CC9.1 | Entity identifies, selects, and develops risk mitigation activities for third-party risks | ⚠️ Partial | Anthropic API key management; PII stripping for copilot; no formal vendor risk assessment |
| CC9.2 | Entity assesses and manages risks associated with vendors and business partners | ❌ Gap | No vendor risk management program documented |

---

## 2. GDPR Articles

| Article | Requirement | Status | Evidence |
|---------|-------------|--------|----------|
| **Art. 5** | Principles: lawfulness, purpose limitation, data minimization, accuracy, storage limitation, integrity, confidentiality | ⚠️ Partial | Data retention policy (`docs/data-retention-policy.md`); PII minimization in copilot; storage limitation via login_attempts cleanup (`migrations/051`); no formal data minimization review |
| **Art. 6** | Lawful basis for processing | ⚠️ Partial | Processing purposes implied in `docs/verarbeitungsverzeichnis.md`; no explicit legal basis mapping per data category |
| **Art. 12-14** | Transparent information and communication | ⚠️ Partial | `docs/verarbeitungsverzeichnis.md` (processing register); no public-facing privacy notice |
| **Art. 15** | Right of access | ⚠️ Partial | API supports data retrieval per tenant; no formal DSAR workflow |
| **Art. 17** | Right to erasure | ⚠️ Partial | Soft delete implemented (`deleted_at`); decision records are immutable by design (compliance requirement conflicts) |
| **Art. 20** | Right to data portability | ✅ Implemented | CSV/PDF export functionality; `src/backend/routes/import-routes.ts`, export routes |
| **Art. 25** | Data protection by design and default | ✅ Implemented | RLS enforced by default; PII stripping in copilot; input sanitization; security headers |
| **Art. 28** | Processor obligations | ⚠️ Partial | Anthropic used as sub-processor; no documented DPA with Anthropic |
| **Art. 30** | Records of processing activities | ✅ Implemented | `docs/verarbeitungsverzeichnis.md` |
| **Art. 32** | Security of processing | ✅ Implemented | Encryption in transit (HSTS), access control (RBAC + RLS), integrity (hash chain), rate limiting; see `docs/tom-document.md` |
| **Art. 33** | Notification to supervisory authority (72h) | ✅ Implemented | `docs/INCIDENT-RESPONSE.md` includes regulator notification template and timeline |
| **Art. 34** | Communication to data subject | ✅ Implemented | `docs/INCIDENT-RESPONSE.md` includes customer notification template |
| **Art. 35** | Data Protection Impact Assessment | ❌ Gap | No DPIA conducted or documented |
| **Art. 37-39** | Data Protection Officer | ❌ Gap | No DPO appointed or documented |

---

## 3. ISO 27001:2022 — Annex A Controls

| Control | Description | Status | Evidence |
|---------|-------------|--------|----------|
| **A.5.1** | Policies for information security | ⚠️ Partial | `docs/SECURITY.md`, `docs/tom-document.md`; no overarching ISMS policy |
| **A.5.2** | Information security roles and responsibilities | ⚠️ Partial | RBAC roles defined; `docs/INCIDENT-RESPONSE.md` defines IR roles; no RACI matrix |
| **A.5.3** | Segregation of duties | ⚠️ Partial | Three roles (admin/compliance_officer/viewer); copilot actions logged separately |
| **A.5.7** | Threat intelligence | ⚠️ Partial | `docs/THREAT-MODEL.md`; no ongoing threat intelligence feeds |
| **A.5.8** | Information security in project management | ⚠️ Partial | Security-focused migrations; no formal secure SDLC checkpoints |
| **A.5.23** | Information security for cloud services | ❌ Gap | No cloud security policy documented |
| **A.5.24** | Incident management planning and preparation | ✅ Implemented | `docs/INCIDENT-RESPONSE.md` |
| **A.5.25** | Assessment and decision on information security events | ✅ Implemented | Severity classification (P0-P3) in `docs/INCIDENT-RESPONSE.md` |
| **A.5.26** | Response to information security incidents | ✅ Implemented | Response procedures, templates, evidence preservation in `docs/INCIDENT-RESPONSE.md` |
| **A.5.27** | Learning from information security incidents | ✅ Implemented | Post-mortem process documented in `docs/INCIDENT-RESPONSE.md` |
| **A.5.28** | Collection of evidence | ✅ Implemented | Evidence preservation steps + chain of custody in `docs/INCIDENT-RESPONSE.md` |
| **A.5.31** | Legal, statutory, regulatory, and contractual requirements | ⚠️ Partial | `docs/regulatory-coverage.md`; compliance rules engine; no formal legal register |
| **A.5.34** | Privacy and protection of PII | ⚠️ Partial | PII stripping in copilot; RLS isolation; `docs/verarbeitungsverzeichnis.md`; no encryption at rest for PII |
| **A.8.1** | User endpoint devices | ❌ Gap | No endpoint security policy |
| **A.8.2** | Privileged access rights | ⚠️ Partial | Admin role restricted; no PAM solution |
| **A.8.3** | Information access restriction | ✅ Implemented | RLS, RBAC, tenant isolation |
| **A.8.4** | Access to source code | ⚠️ Partial | Git-based; no documented access control policy for repo |
| **A.8.5** | Secure authentication | ✅ Implemented | bcrypt hashing, brute-force lockout, refresh tokens, rate limiting |
| **A.8.7** | Protection against malware | ❌ Gap | No server-side malware scanning; file uploads limited to CSV (5MB) and KYC docs |
| **A.8.9** | Configuration management | ⚠️ Partial | Migrations tracked; environment variables for config; no formal CM database |
| **A.8.10** | Information deletion | ⚠️ Partial | Soft deletes; login_attempts retention cleanup; no automated PII purge |
| **A.8.11** | Data masking | ✅ Implemented | PII pseudonymization in copilot (`stripPIIFromToolResult`); `src/backend/services/copilot-service.ts` |
| **A.8.12** | Data leakage prevention | ⚠️ Partial | Export rate limiting; copilot PII stripping; no DLP tooling |
| **A.8.15** | Logging | ✅ Implemented | Events table (immutable audit trail), login_attempts, copilot feedback; `src/backend/lib/logger.ts` |
| **A.8.16** | Monitoring activities | ⚠️ Partial | Integrity chain verification; no real-time monitoring/alerting |
| **A.8.24** | Use of cryptography | ⚠️ Partial | bcrypt for passwords; SHA-256 for integrity chain; HSTS for transport; no encryption at rest |
| **A.8.25** | Secure development life cycle | ⚠️ Partial | Tests in `tests/`; security middleware; no formal SSDLC policy |
| **A.8.26** | Application security requirements | ✅ Implemented | Input validation, CSRF, CSP, rate limiting, filename sanitization |
| **A.8.28** | Secure coding | ✅ Implemented | Parameterized queries; input sanitization; null byte stripping; TypeScript strict mode |

---

## Summary Dashboard

| Framework | Implemented | Partial | Gap | Total |
|-----------|------------|---------|-----|-------|
| **SOC 2 CC1-CC9** | 7 | 16 | 5 | 28 |
| **GDPR** | 6 | 6 | 2 | 14 |
| **ISO 27001 Annex A** | 11 | 13 | 4 | 28 |
| **Overall** | **24** | **35** | **11** | **70** |

### Priority Gaps to Address

1. **DPIA** (GDPR Art. 35) — Required for high-risk processing of financial/KYC data
2. **DPO appointment** (GDPR Art. 37-39) — Likely required given scale of PII processing
3. **Encryption at rest** for PII columns — Needed for SOC 2 CC6.7, ISO A.8.24, GDPR Art. 32
4. **SIEM / monitoring** — Critical for SOC 2 CC7.2, ISO A.8.16
5. **Vendor risk management** — SOC 2 CC9.2 (especially for Anthropic sub-processing)
6. **DPA with Anthropic** — GDPR Art. 28 requirement
