# Caelith — Changelog

All notable changes to the Caelith platform, organized by category.  
Generated: 2026-02-23

---

## 🔒 Security

| Commit | Description |
|--------|-------------|
| `e3fcdb00` | **CRITICAL**: Fix 6 cross-tenant data leakage vulnerabilities across 12 files |
| `6e618cf8` | Fix CRITICAL/HIGH findings from OWASP Top 10 penetration test |
| `76135f72` | Fix BOLA and input validation findings (negative units, CSV injection) |
| `d2c43588` | Remove password reset token from logs, use structured logger |
| `8e8767c3` | Harden LLM Copilot — table allowlist, prompt injection defense, input caps |
| `b42a7857` | Auth hardening — password reset flow, logout, brute force protection (10 req/15min) |
| `6f0b3043` | API endpoint hardening — validation middleware, error handling, auth checks across 13 routes |
| `5999704d` | CSRF origin validation middleware + filename sanitization on downloads |
| `6625c2c0` | Security page, ISO 27001 prep |

## ✨ Features

| Commit | Description |
|--------|-------------|
| `3ea8d5e2` | Demo showcase seed scripts — AIFMD II enrichment + readiness answers for prod |
| `169efd6f` | Scale test seed (50 funds, 1000 investors), benchmark script, performance indexes |
| `8b28f518` | Railway seed script + EU region config |
| `2d6e2151` | Enum translations + ErrorBoundary for A+ demo readiness |

## ⚡ Performance

| Commit | Description |
|--------|-------------|
| `8ff434a6` | Remove unused recharts dependency, dynamic import JSZip (bundle size reduction) |
| `169efd6f` | 8 missing database indexes added (migration 053) |

## 🧪 Testing

| Commit | Description |
|--------|-------------|
| `0be6eeab` | 87 new tests — auth, screening, readiness, hash chain, audit trail, compliance scoring |
| `28e688eb` | End-to-end customer simulation + edge case tests |

## 📚 Documentation

| Commit | Description |
|--------|-------------|
| `1ef74f9d` | README.md, CONTRIBUTING.md, docs/ARCHITECTURE.md, .env.example |
| `f87ce58a` | SECURITY.md, INCIDENT-RESPONSE.md, THREAT-MODEL.md, COMPLIANCE-MAP.md, DATA-CLASSIFICATION.md |
| `8e6a5526` | Monitoring & ops documentation |
| `8fc014a8` | LinkedIn content update — remove unverified claims, add DSGVO + features |
| `c7aa3a65` | Pitch deck v2 — VC review polish, ARR milestones, encoding fixes |

## 🏗️ Infrastructure

| Commit | Description |
|--------|-------------|
| `8e6a5526` | Health endpoint, error tracking, graceful shutdown, monitoring |
| `8c85f54b` | Always enable API rewrite + default Dockerfile build arg for Railway |
| `78ec4530` | Restore API rewrite in next.config |
| `27da4a1e` | Bind backend to 0.0.0.0 for Railway private networking |
| `dc5d59b1` | API proxy middleware + i18n import path fixes + eslint/ts build ignore |
| `f3917a3f` | Frontend API proxy — graceful 503 instead of ECONNREFUSED log spam |

## 📋 Compliance (GDPR / Regulatory)

| Commit | Description |
|--------|-------------|
| `bbd80f73` | GDPR endpoint hardening — Art. 15/17/20, data retention policies, consent tracking |

## 🎨 UI/UX

| Commit | Description |
|--------|-------------|
| `80a92310` | Cross-browser compatibility — Safari, Firefox, mobile, accessibility |
| `9bccf83a` | Monogram pill section dividers in rail mode + brighter section headers |
| `09ccae31` | Sidebar icon rail collapse + scroll-to-top + Soft Frost brightness uplift |
| `03f03a79` | Screening dismiss updates flag count live + collapsible sidebar with chevrons |
| `ee2ade42` | Sidebar v4 — Weighted Clarity design, search-first, active bar, Caelith palette |
| `144a345e` | Sidebar — restore Monitor section, collapsible with persistent state |
| `adea591e` | Sidebar v2 — activity-focused redesign, quick actions, tree-line sub-items |
| `78d8ee48` | Sidebar redesign — 14 items → 9, expandable sub-items |
| `defafe00` | Landing page EN — fix raw unicode escapes |
| `745f5522` | Landing page DE — fix 4 i18n issues |
| `ee0a43cf` | i18n audit — cross-language fixes |
| `9e9beb40` | i18n second pass — complete language separation |

## 🔧 Code Quality

| Commit | Description |
|--------|-------------|
| `57625874` | TypeScript strictness — remove all `any` types across 12 files, proper interfaces |

---

**Total commits tracked:** 40  
**Security vulnerabilities found & fixed:** 7 CRITICAL, 7 HIGH, 8 MEDIUM  
**Tests added:** 87+ unit tests, E2E simulation suite  
