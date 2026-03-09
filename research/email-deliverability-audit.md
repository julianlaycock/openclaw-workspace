# Email Deliverability Audit — caelith.tech
**Date:** 2026-02-27

## DNS Records Summary

### ✅ SPF — CONFIGURED
```
v=spf1 include:_spf-eu.ionos.com ~all
```
- Authorizes IONOS mail servers
- Uses `~all` (softfail) — consider switching to `-all` (hardfail) for stricter enforcement

### ✅ MX — CONFIGURED
```
mx00.ionos.es (priority 10)
mx01.ionos.es (priority 10)
```
- IONOS mail hosting active

### ⚠️ DMARC — CONFIGURED BUT WEAK
```
v=DMARC1; p=none;
```
- DMARC record exists (via CNAME to dmarc.ionos.es)
- **Policy is `p=none`** — this means NO enforcement. Spoofed emails are not rejected.
- Should be escalated to `p=quarantine` then `p=reject` once DKIM is set up

### 🔴 DKIM — NOT CONFIGURED (HIGH SEVERITY)
Checked selectors: `google`, `default`, `s1`, `s2`, `s1082742` — **all missing**.

**Impact:** Without DKIM, emails from caelith.tech:
- Will likely land in **spam/junk** for Gmail, Outlook, Yahoo recipients
- Will fail alignment checks required by Google/Yahoo's 2024 sender requirements
- DMARC cannot fully function without DKIM (SPF alone breaks on forwarding)

## Severity Assessment

| Record | Status | Severity |
|--------|--------|----------|
| SPF | ✅ Configured | LOW (consider `-all`) |
| MX | ✅ Configured | OK |
| DMARC | ⚠️ Weak (`p=none`) | MEDIUM |
| DKIM | 🔴 Missing | **HIGH** |

## Recommendations

1. **IMMEDIATE: Set up DKIM** — Log into IONOS mail settings → enable DKIM signing → add the DKIM DNS record they provide
2. **After DKIM verified:** Change DMARC policy from `p=none` to `p=quarantine`, then to `p=reject`
3. **Optional:** Change SPF from `~all` to `-all` for stricter enforcement
4. **Test:** After changes, send test emails to mail-tester.com and check score

## Risk Summary
**Cold outreach emails from caelith.tech are at HIGH RISK of landing in spam.** Missing DKIM is the critical gap. This directly impacts sales pipeline if Julian is doing email outreach to fund managers.
