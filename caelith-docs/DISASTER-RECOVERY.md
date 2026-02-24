# Disaster Recovery Plan

**Last updated:** 2026-02-23  
**Owner:** Julian Laycock  
**Review cadence:** Quarterly

---

## Recovery Objectives

| Metric | Target |
|--------|--------|
| **RTO** (Recovery Time Objective) | 4 hours |
| **RPO** (Recovery Point Objective) | 24 hours (daily backups at 03:00 UTC) |

---

## Scenario 1: Database Corruption

**Symptoms:** Application errors, data inconsistencies, failed queries.

**Response:**
1. Confirm corruption scope — check Railway logs and run read queries
2. Put application in maintenance mode (scale frontend to 0 replicas)
3. Download latest backup artifact from GitHub Actions
4. Restore:
   ```bash
   gunzip -c backups/caelith-YYYY-MM-DD-HHMMSS.sql.gz | psql "$DATABASE_URL"
   ```
5. Verify data integrity — spot-check key tables (investors, users, documents)
6. Restore application traffic
7. Post-incident: identify root cause, document in incident log

**Estimated recovery:** 1–2 hours

---

## Scenario 2: Railway Platform Outage

**Symptoms:** Application unreachable, Railway dashboard/API unavailable.

**Response:**
1. Check [Railway Status](https://status.railway.app) for incident updates
2. If outage exceeds 2 hours:
   - Provision alternative hosting (Render, Fly.io, or VPS)
   - Deploy from latest `main` branch
   - Point DNS to new deployment
   - Restore database from latest backup to new PostgreSQL instance
3. Communicate status to stakeholders
4. Once Railway recovers, evaluate whether to migrate back

**Estimated recovery:** 2–4 hours (depends on alternative provisioning)

---

## Scenario 3: Security Breach

**Symptoms:** Unauthorized access detected, suspicious data changes, credential exposure.

**Response — Immediate (within 30 minutes):**
1. Revoke all active sessions — invalidate JWT tokens
2. Rotate database credentials on Railway
3. Rotate all API keys and secrets (Railway variables)
4. Review access logs for scope of breach

**Response — Containment (within 2 hours):**
5. If data exfiltration suspected, take database snapshot before changes
6. Assess which data was accessed/modified
7. Reset all user passwords and force re-authentication
8. Update environment variables across all services

**Response — Recovery:**
9. Deploy patched application if vulnerability identified
10. Notify affected users per legal requirements
11. Document incident per `docs/SECURITY.md`
12. Engage legal/compliance if PII was exposed

**Reference:** See `docs/SECURITY.md` for full security policy.

---

## Scenario 4: Accidental Data Deletion

**Symptoms:** Missing records reported by users or monitoring.

**Response:**
1. Identify deletion scope and timestamp
2. Download backup taken before the deletion
3. Restore to a temporary database:
   ```bash
   createdb caelith_recovery
   gunzip -c backups/caelith-YYYY-MM-DD-HHMMSS.sql.gz | psql caelith_recovery
   ```
4. Extract deleted records:
   ```sql
   -- Example: recover deleted investors
   \copy (SELECT * FROM investors WHERE id IN (...)) TO 'recovered.csv' CSV HEADER
   ```
5. Insert recovered records into production database
6. Verify restoration with the reporting user

**Estimated recovery:** 1–2 hours

---

## Contact List & Escalation

| Role | Contact | Escalation |
|------|---------|------------|
| **Lead Developer** | Julian Laycock — julian.laycock@caelith.tech | First responder |
| **Infrastructure** | Julian Laycock | Railway + GitHub Actions |

> Add additional contacts as the team grows.

**Escalation order:**
1. Developer on-call detects or is alerted to issue
2. If unresolved in 1 hour → escalate to Lead Developer
3. If unresolved in 2 hours → activate full DR procedure
4. If customer data impacted → notify legal/compliance

---

## Quarterly DR Test Schedule

| Quarter | Test Date (Target) | Scenario to Test |
|---------|-------------------|------------------|
| Q1 2026 | March 2026 | Backup restore (Scenario 1) |
| Q2 2026 | June 2026 | Alternative deployment (Scenario 2) |
| Q3 2026 | September 2026 | Credential rotation (Scenario 3) |
| Q4 2026 | December 2026 | Selective data recovery (Scenario 4) |

**Test procedure:**
1. Schedule 2-hour maintenance window
2. Execute recovery steps against staging/temporary environment
3. Document time-to-recovery and any issues
4. Update this plan with lessons learned
5. File test report in `docs/dr-tests/` directory
