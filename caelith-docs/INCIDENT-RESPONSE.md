# Incident Response Plan

**Last updated:** 2026-02-23  
**Owner:** CTO / Head of Engineering  
**Review cadence:** Quarterly or after any P0/P1 incident

---

## 1. Severity Classification

| Severity | Definition | Examples |
|----------|-----------|----------|
| **P0 — Critical** | Active data breach, complete service outage, or compromise of production credentials. Immediate customer/regulatory impact. | RLS bypass exposing cross-tenant data; database credentials leaked; ransomware; hash chain integrity failure in production |
| **P1 — High** | Significant security vulnerability being actively exploited, or partial service degradation affecting compliance workflows. | Authentication bypass; SQL injection in copilot; elevated privilege escalation; production DB corruption |
| **P2 — Medium** | Security vulnerability identified but not yet exploited; limited blast radius. Non-critical service degradation. | XSS in non-sensitive page; rate limiting failure; CSV import validation bypass; stale KYC documents served |
| **P3 — Low** | Minor security finding, hardening opportunity, or cosmetic issue with security implications. | Missing security header on non-sensitive endpoint; verbose error messages; dependency with low-severity CVE |

---

## 2. Response Timeline

| Severity | Acknowledge | Investigate | Mitigate | Resolve | Post-Mortem |
|----------|------------|-------------|----------|---------|-------------|
| **P0** | 15 min | 1 hour | 4 hours | 24 hours | Within 3 days |
| **P1** | 30 min | 4 hours | 12 hours | 3 days | Within 5 days |
| **P2** | 4 hours | 1 business day | 3 business days | 2 weeks | Within 2 weeks |
| **P3** | 1 business day | 1 week | Next sprint | Next release | Optional |

---

## 3. Roles and Responsibilities

| Role | Person/Team | Responsibilities |
|------|------------|------------------|
| **Incident Commander (IC)** | CTO (primary), Senior Engineer (backup) | Declares severity, coordinates response, makes escalation decisions, owns communication |
| **Technical Lead** | On-call engineer | Root cause analysis, develops and deploys fix, validates remediation |
| **Communications Lead** | CEO / Head of Compliance | Drafts and sends customer/regulator notifications, manages external messaging |
| **Evidence Custodian** | DevOps / IC | Preserves logs, snapshots, and forensic artifacts; maintains chain of custody |
| **Legal Advisor** | External counsel | Advises on regulatory notification obligations (GDPR Art. 33/34, BaFin) |

### Escalation Path

```
Engineer discovers issue
  → Slack #incidents + page IC
    → IC assesses severity
      → P0/P1: All-hands war room (15 min)
      → P2: Assigned to sprint, tracked in issue tracker
      → P3: Backlog item
```

---

## 4. Communication Templates

### 4a. Customer Notification (P0/P1 Data Breach)

```
Subject: Security Incident Notification — [Incident ID]

Dear [Customer Name],

We are writing to inform you of a security incident that may affect your data
on the Caelith platform.

WHAT HAPPENED
On [DATE] at approximately [TIME] UTC, we identified [brief description].

WHAT DATA WAS AFFECTED
[Specific data types: investor names, jurisdictions, KYC documents, etc.]

WHAT WE ARE DOING
- [Immediate containment actions taken]
- [Remediation steps underway]
- [Timeline for full resolution]

WHAT YOU CAN DO
- [Recommended actions: password reset, review audit trail, etc.]

We take this incident seriously and are committed to transparency. We will
provide updates as our investigation progresses.

For questions, contact: security@caelith.io

[Name]
[Title]
Caelith GmbH
```

### 4b. Regulator Notification (GDPR Art. 33 — Within 72 Hours)

```
Subject: Data Protection Breach Notification — Art. 33 GDPR

To: [Supervisory Authority / Landesdatenschutzbeauftragter]

1. NATURE OF THE BREACH
   - Type: [Confidentiality / Integrity / Availability]
   - Description: [What happened]
   - Date/time of breach: [DATE/TIME]
   - Date/time of discovery: [DATE/TIME]

2. DATA SUBJECTS AFFECTED
   - Categories: [Fund investors, compliance officers]
   - Approximate number: [N]
   - Jurisdictions: [DE, LU, etc.]

3. PERSONAL DATA AFFECTED
   - Categories: [Names, email, tax IDs, LEIs, KYC documents]
   - Approximate number of records: [N]

4. LIKELY CONSEQUENCES
   - [Risk assessment: identity theft, financial fraud, regulatory exposure]

5. MEASURES TAKEN
   - Containment: [Actions]
   - Remediation: [Actions]
   - Mitigation for data subjects: [Actions]

6. CONTACT
   - DPO: [Name, email, phone]
   - Technical contact: [Name, email]

Filed by: [Name, Title]
Date: [DATE]
```

### 4c. BaFin Notification (if applicable)

```
If the incident affects regulated fund data or compliance records,
notify BaFin IT incident reporting desk per MaRisk AT 7.3:
- bafin-it-meldung@bafin.de
- Include: incident classification, affected entities, timeline, remediation
```

---

## 5. Post-Incident Review Process

### Within 3–5 Days of Resolution

1. **Timeline reconstruction** — Minute-by-minute account from detection to resolution
2. **Root cause analysis** — Use 5-Whys or fishbone diagram
3. **Impact assessment** — Data subjects affected, records exposed, financial impact
4. **Control gap analysis** — What control failed? Was it missing, misconfigured, or bypassed?
5. **Action items** — Specific, assigned, time-bound remediation tasks
6. **Lessons learned** — What went well, what didn't, process improvements

### Post-Mortem Document Template

```markdown
# Post-Incident Review: [Incident ID]

**Date:** [DATE]
**Severity:** P[0-3]
**Duration:** [Detection to resolution]
**IC:** [Name]

## Summary
[2-3 sentence overview]

## Timeline
| Time (UTC) | Event |
|------------|-------|
| HH:MM | ... |

## Root Cause
[Technical root cause]

## Impact
- Data subjects affected: [N]
- Data types exposed: [list]
- Service downtime: [duration]

## What Went Well
- ...

## What Went Poorly
- ...

## Action Items
| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | ... | ... | ... | Open |

## Appendix
[Links to logs, dashboards, forensic artifacts]
```

### Review Distribution
- Internal: All engineering + compliance team
- Board: P0/P1 incidents within 1 week
- Customers: Summary if data was affected
- Regulators: As required by GDPR Art. 33

---

## 6. Evidence Preservation

### Immediately Upon Detection

1. **Do not restart services** until logs and memory state are captured
2. **Capture database state:**
   ```sql
   -- Snapshot affected tables (read-only, do not modify)
   SELECT * FROM events WHERE timestamp >= '[incident_start]' ORDER BY timestamp;
   SELECT * FROM login_attempts WHERE attempted_at >= '[incident_start]';
   SELECT * FROM decision_records WHERE created_at >= '[incident_start]';
   ```
3. **Preserve application logs:**
   ```bash
   # Copy current logs to incident-specific directory
   cp -r /var/log/caelith/ /evidence/incident-[ID]/app-logs/
   ```
4. **Capture network state:**
   - Load balancer access logs
   - WAF/firewall logs
   - DNS query logs (if relevant)
5. **Database audit:**
   ```sql
   -- Check integrity chain for tampering
   SELECT id, sequence_number, integrity_hash, previous_hash
   FROM decision_records
   ORDER BY sequence_number DESC
   LIMIT 100;
   ```
6. **Take filesystem snapshots** of production volumes (if cloud-hosted)

### Chain of Custody

| Step | Action | By | Timestamp |
|------|--------|----|-----------|
| 1 | Evidence identified and isolated | Evidence Custodian | [TIME] |
| 2 | SHA-256 hash of all evidence files computed | Evidence Custodian | [TIME] |
| 3 | Evidence stored in locked, access-logged storage | Evidence Custodian | [TIME] |
| 4 | Access log reviewed; no unauthorized access confirmed | IC | [TIME] |

### Retention

- Incident evidence: **7 years** (aligned with financial regulatory requirements)
- Post-mortem documents: **Indefinite**
- Raw logs: Per data retention policy (see `docs/data-retention-policy.md`)
