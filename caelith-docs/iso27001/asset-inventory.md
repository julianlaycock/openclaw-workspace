# Asset Inventory

**Document ID:** ISMS-ASSET-001  
**Version:** 1.0  
**Date:** 2026-02-23  
**Owner:** CTO  
**Classification:** Internal

---

## 1. Systems & Infrastructure

| Asset ID | Asset | Type | Owner | Classification | Location | Backup Status | Notes |
|----------|-------|------|-------|---------------|----------|--------------|-------|
| SYS-001 | Railway (Production) | Cloud PaaS | CTO | Confidential | Railway EU region | Railway-managed; restore testing planned | Hosts frontend + backend + PostgreSQL |
| SYS-002 | Railway (Staging) | Cloud PaaS | CTO | Internal | Railway EU region | Not backed up | Non-production; rebuildable |
| SYS-003 | GitHub Repository | Source control | CTO | Confidential | GitHub cloud (US) | Git history; no separate backup | Private repo; branch protection enabled |
| SYS-004 | PostgreSQL Database | RDBMS | CTO | Restricted | Railway (managed) | Railway automated snapshots; restore untested | Contains all tenant data and PII |
| SYS-005 | Anthropic Claude API | External AI service | CTO | Confidential | Anthropic cloud (US) | N/A (stateless) | PII stripped before transmission |
| SYS-006 | OpenSanctions API | External screening service | CTO | Internal | OpenSanctions cloud | N/A (stateless) | Sanctions/PEP screening data |
| SYS-007 | Developer Workstations | Endpoints | Individual | Confidential | Remote (employees) | Individual responsibility | Access to source code and credentials |

## 2. Data Stores

| Asset ID | Asset | Type | Owner | Classification | Location | Backup Status | Retention |
|----------|-------|------|-------|---------------|----------|--------------|-----------|
| DAT-001 | `users` table | Database table | CTO | Restricted | PostgreSQL (SYS-004) | Via SYS-004 | Account lifetime + 30 days |
| DAT-002 | `investors` table | Database table | CTO | Restricted | PostgreSQL (SYS-004) | Via SYS-004 | 10 years post-relationship (AML) |
| DAT-003 | `investor_documents` table | Database table | CTO | Restricted | PostgreSQL (SYS-004) | Via SYS-004 | 10 years post-relationship |
| DAT-004 | `fund_structures` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | 10 years |
| DAT-005 | `holdings` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | 10 years |
| DAT-006 | `decision_records` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | Indefinite (audit trail) |
| DAT-007 | `compliance_rules` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | Indefinite |
| DAT-008 | `eligibility_criteria` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | 10 years |
| DAT-009 | `login_attempts` table | Database table | CTO | Internal | PostgreSQL (SYS-004) | Via SYS-004 | 90 days |
| DAT-010 | `refresh_tokens` table | Database table | CTO | Restricted | PostgreSQL (SYS-004) | Via SYS-004 | Token expiry |
| DAT-011 | `tenants` table | Database table | CTO | Confidential | PostgreSQL (SYS-004) | Via SYS-004 | Indefinite |
| DAT-012 | Railway volumes | Persistent storage | CTO | Confidential | Railway EU | Railway-managed | Platform lifecycle |
| DAT-013 | GitHub repository (source) | Code repository | CTO | Confidential | GitHub cloud | Git history | Indefinite |
| DAT-014 | Environment variables / secrets | Configuration | CTO | Restricted | Railway env vars | Not separately backed up | Rotated per policy |

## 3. Applications & Services

| Asset ID | Asset | Type | Owner | Classification | Technology | Location | Notes |
|----------|-------|------|-------|---------------|-----------|----------|-------|
| APP-001 | Caelith Frontend | Web application | CTO | Internal | Next.js / React | Railway (SYS-001) | SSR + SPA; serves on port 3000 |
| APP-002 | Caelith Backend API | API service | CTO | Confidential | Express.js / Node.js | Railway (SYS-001) | REST API on port 3001; all business logic |
| APP-003 | Copilot Service | AI integration | CTO | Confidential | Node.js + Anthropic SDK | Railway (SYS-001) | Natural language compliance queries |
| APP-004 | CSV Import Service | Data ingestion | CTO | Confidential | Node.js | Railway (SYS-001) | Bulk investor/fund data import |
| APP-005 | Integrity Verification | Audit service | CTO | Confidential | Node.js | Railway (SYS-001) | Hash chain verification for decision records |
| APP-006 | Export/Report Generator | Reporting | CTO | Confidential | Node.js | Railway (SYS-001) | PDF/CSV export of compliance data |

## 4. Third-Party Services

| Asset ID | Service | Provider | Purpose | Data Shared | Contract/DPA | Classification |
|----------|---------|----------|---------|-------------|-------------|---------------|
| TPP-001 | Railway | Railway Corp | Hosting & PostgreSQL | All application data | ToS | Restricted |
| TPP-002 | GitHub | Microsoft | Source control, CI | Source code | ToS | Confidential |
| TPP-003 | Anthropic Claude API | Anthropic | AI copilot | Anonymised query context (PII stripped) | API ToS | Confidential |
| TPP-004 | OpenSanctions | OpenSanctions | PEP/sanctions screening | Entity names for screening | API ToS | Internal |

---

*Next review: 2026-08-23 (semi-annual) or upon significant infrastructure change.*
