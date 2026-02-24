# Caelith — Security Overview

**Compliance infrastructure for alternative fund managers**
Last updated: February 2026

---

## Data Protection & Privacy

- **GDPR-compliant by design** — privacy principles embedded from architecture onwards
- **EU-only data residency** — all data stored exclusively in EU (Railway, Amsterdam)
- **AI Copilot PII stripping** — personally identifiable information is removed before any data is sent to AI providers
- **Row-Level Security (RLS)** — strict tenant isolation at the database level; no cross-tenant data access is possible
- **Soft-delete architecture** — supports GDPR Right to Erasure (Art. 17) with recoverable deletion
- **Full audit trail** — all actions logged with pseudonymized PII for accountability without exposure

## Authentication & Access Control

- **bcrypt-12 password hashing** — industry-standard adaptive hashing
- **HTTP-only, Secure, SameSite=Strict cookies** — session tokens inaccessible to JavaScript and protected against CSRF
- **Role-based access control (RBAC)** — three tiers: Admin, Compliance Officer, Viewer
- **Rate limiting** — authentication: 50 requests/15 min; API: 500 requests/15 min
- **CSRF protection** — Origin/Referer header validation on all state-changing requests

## Application Security

- **Content Security Policy (CSP)** — restricts resource loading to trusted origins
- **HSTS** — HTTP Strict Transport Security enforced
- **X-Frame-Options DENY** — clickjacking protection
- **Parameterized SQL queries** — zero SQL injection surface across the entire application
- **Input sanitization** — protection against null byte injection and prototype pollution
- **Copilot query sandboxing** — AI-generated SQL runs in read-only transactions against a 16-table allowlist with a 50-row result cap

## Infrastructure

- **Railway (EU West, Amsterdam)** — hosted on managed infrastructure in the EU
- **PostgreSQL with encrypted connections** — TLS-encrypted database traffic
- **No public database endpoints** — database accessible only from application services
- **Private networking** — backend API not exposed to the public internet

## Compliance Roadmap

| Milestone | Target |
|---|---|
| SOC 2 Type I | Q4 2026 |
| Annual penetration testing | Starting Q3 2026 |
| ISO 27001 gap analysis | Q1 2027 |

## Contact

Security inquiries: **julian.laycock@caelith.tech**

---

*Caelith Technologies · caelith.tech*
