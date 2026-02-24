# Security Policy

**Last updated:** 2026-02-23

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest (main branch) | ✅ Active security updates |
| Previous release | ⚠️ Critical fixes only (90 days) |
| Older | ❌ End of life |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### Responsible Disclosure Process

1. **DO NOT** open a public GitHub issue for security vulnerabilities.
2. Email **security@caelith.io** with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Any suggested mitigations
3. You will receive an acknowledgment within **24 hours**.
4. We will provide a detailed response within **72 hours**, including:
   - Confirmation of the vulnerability
   - Severity assessment (CVSS score)
   - Estimated timeline for a fix
5. We aim to release patches within:
   - **Critical (CVSS ≥ 9.0):** 24 hours
   - **High (CVSS 7.0–8.9):** 7 days
   - **Medium (CVSS 4.0–6.9):** 30 days
   - **Low (CVSS < 4.0):** Next scheduled release

### Security Contact

| Channel | Details |
|---------|---------|
| Primary | security@caelith.io |
| PGP Key | Available at `/.well-known/security.txt` |
| Backup | CTO directly (see internal contacts) |

### Safe Harbor

We will not pursue legal action against researchers who:
- Act in good faith and follow this disclosure policy
- Avoid accessing or modifying other users' data
- Do not disrupt services or degrade performance
- Provide sufficient detail for us to reproduce and fix the issue

## Security Architecture Overview

Caelith is a multi-tenant financial SaaS platform for fund compliance. Key security controls:

- **Authentication:** bcrypt-hashed passwords, JWT access + refresh tokens, brute-force lockout
- **Authorization:** Role-based (admin, compliance_officer, viewer) with tenant-scoped access
- **Multi-tenancy isolation:** PostgreSQL Row-Level Security (RLS) on all tenant-scoped tables; strict `app.tenant_id` session variable required (no COALESCE fallback)
- **Data integrity:** SHA-256 hash chain on decision records for tamper detection
- **Transport:** HSTS, CSP, X-Frame-Options DENY, all security headers enforced
- **Rate limiting:** Per-IP and per-endpoint limits (auth: 10/15min, API: 200/15min, export: 10/min in production)
- **Input validation:** Null-byte stripping, length limits, filename sanitization, CSRF origin validation
- **Audit trail:** Immutable event log; decision records cannot be deleted or modified
- **PII protection:** Copilot queries strip PII via pseudonymization before sending to external AI

## Dependency Management

- Dependencies are reviewed before upgrades
- `npm audit` is run as part of CI
- No known critical vulnerabilities should remain unpatched for more than 7 days

## Infrastructure

- PostgreSQL with enforced RLS policies
- No direct database access from browser; all queries routed through authenticated API
- File uploads restricted to 5 MB, CSV-only with MIME type validation
- KYC documents stored as BYTEA in tenant-isolated rows with RLS
