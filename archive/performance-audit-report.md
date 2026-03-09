# Caelith Frontend Performance Audit Report

**Date:** 2026-02-23  
**Auditor:** Frontend Performance Subagent  
**Scope:** `src/frontend/` — Next.js 15 app with React 19

---

## 1. Bundle Analysis

### Page Sizes (client-side JS chunks)
All page chunks are under 200KB individually. Largest pages:

| Page | Size | Notes |
|------|------|-------|
| `funds/[id]` | 84 KB | Largest page — many tabs/components |
| `layout` (shared) | 63 KB | Loaded on every page |
| `dashboard` | 63 KB | Charts + dashboard logic |
| `transfers` | 31 KB | Kanban + drag logic |
| `onboarding` | 29 KB | Multi-step wizard |

Shared chunks:
- `framework` (React): 185 KB
- `4bd1b696` (shared dep): 169 KB
- `255` (shared dep): 168 KB
- `910` (likely i18n): 125 KB
- `726` (shared): 116 KB

**Total first-load JS estimate:** ~700 KB (framework + shared + layout + page). This is moderate for a SPA-style app but could be improved.

### Dependency Issues Found

| Issue | Severity | Status |
|-------|----------|--------|
| **`recharts` (^3.7.0) in package.json but never imported** | 🔴 High | ✅ **FIXED** — removed from package.json |
| **`jszip` statically imported in annex-iv page** | 🟡 Medium | ✅ **FIXED** — converted to dynamic `import()` |

### Recommendations
- Run `npm prune` / reinstall to remove recharts from node_modules
- Consider adding `@next/bundle-analyzer` for ongoing monitoring
- The `i18n.tsx` file appears very large (contains all translations inline) — consider splitting by locale

---

## 2. Image Optimization

### Findings
- ✅ **No `<img>` tags found in application source code** (src/). All app pages use CSS/SVG for visuals.
- ⚠️ The **landing page** (served via API route as raw HTML) uses `<img>` tags with `loading="lazy"` for screenshots:
  ```html
  <img src="/screenshot-dashboard.png" alt="..." loading="lazy">
  ```
  These are NOT using Next.js `<Image>` component (expected since it's a standalone HTML page served via API route, not a React page).

### Recommendations
- Landing page images: Add explicit `width`/`height` attributes to prevent CLS
- Consider converting landing screenshots to WebP format

---

## 3. Code Splitting

### Current State
- ❌ **No `next/dynamic` imports found** — all components are statically imported
- ✅ JSZip now dynamically imported (fixed)

### Components That Should Be Dynamically Imported
| Component | Used In | Why |
|-----------|---------|-----|
| `CsvUploadWizard` | funds, holdings, investors pages | Heavy CSV parsing logic, only shown on button click |
| `Copilot` | auth-layout (every page) | Chat widget, not needed on initial render |
| `CommandPalette` | auth-layout (every page) | Only shown on Cmd+K, not needed on initial render |
| `SetupWizard` | onboarding | Full wizard flow |
| `RuleBuilder` components | rules/builder page | Complex rule editing UI |
| `RiskDetailPanel` | used in modals | Only shown on click |

### Recommendations
- Use `next/dynamic` with `{ ssr: false }` for modal-based components (Copilot, CommandPalette, CsvUploadWizard)
- This could save 50-100KB from the initial layout chunk

---

## 4. Loading States

### ✅ Pages WITH Proper Loading States
All data-fetching pages have loading states implemented:
- **Dashboard**: Custom skeleton components (`SkeletonBanner`, `SkeletonFundBand`, `SkeletonSidebar`)
- **Investors**: `SkeletonTable` + `Suspense` boundary
- **Funds**: `SkeletonCards`
- **Decisions**: `SkeletonTable`
- **Holdings**: `SkeletonTable`
- **Audit-log**: `LoadingSpinner`
- **Calendar**: `LoadingSpinner`
- **Reports/Annex-IV**: `LoadingSpinner`
- **Reports/Evidence-Bundle**: `LoadingSpinner`
- **Rules**: `LoadingSpinner`
- **Screening**: `LoadingSpinner`
- **Readiness**: `LoadingSpinner`
- **Transfers**: `SkeletonTable`
- **Onboarding**: `LoadingSpinner`
- **Jurisdiction/[code]**: `SkeletonTable`
- **Fund Detail**: `LoadingSpinner`
- **Investor Detail**: `LoadingSpinner`

### Assessment
**Good coverage.** The dashboard uses rich skeleton components while other pages use simpler spinners. Consider upgrading high-traffic pages (funds list, investors list) from `LoadingSpinner` to `SkeletonTable`/`SkeletonCards` where they aren't already.

---

## 5. React Performance

### ✅ Good Patterns Found
- **Charts component** (`charts.tsx`): All 13+ chart components wrapped in `React.memo` ✅
- **Extensive use of `useMemo`**: Dashboard (8 instances), investors page, transfers, decisions, command palette
- **Extensive use of `useCallback`**: Login, fund detail, reports, transfers, copilot, CSV wizard
- **Custom hooks** (`useAsync`, `useSort`, `useFormAction`) properly encapsulate state

### ⚠️ Potential Anti-Patterns Found

1. **Inline object/array literals in JSX props**: Several pages pass inline style objects:
   - Charts use `style={{ color: ... }}` and `style={{ width: ... }}` extensively — these create new objects each render. For `React.memo` components this is mitigated since the memo is on the component boundary, not individual elements inside.
   
2. **No issues found with missing `key` props** — list rendering appears correct throughout.

3. **The `i18n.tsx` file**: The `t()` and `translateEnum()` functions are created via `useCallback` ✅

### Assessment
React performance patterns are **above average** for this codebase. The team is already using memo, useMemo, and useCallback correctly in the right places.

---

## 6. Lighthouse Preparation

### Meta Tags
- ✅ Root layout has proper `<title>` and `<meta name="description">`
- ✅ OpenGraph tags present
- ✅ Theme color, manifest, apple-touch-icon all configured
- ⚠️ Individual pages don't set page-specific titles (all show "Caelith - Compliance Engine")

### Font Loading
- ✅ Using `next/font/google` with `display: 'swap'` for both Sora and JetBrains Mono
- ✅ Fonts are optimized by Next.js (self-hosted, no external requests)

### Above-the-Fold Content
- ✅ Skip-to-content link present
- ✅ Layout renders server-side shell
- ⚠️ All pages are `'use client'` — the entire page content is JS-dependent. This is inherent to the app architecture (SPA behind auth).

### Recommendations
- Add per-page metadata using Next.js `metadata` export or `generateMetadata`
- Consider server components for static pages (privacy, terms, DPA, security)

---

## Quick Wins Applied

### 1. Removed unused `recharts` dependency
**File:** `package.json`  
**Impact:** Prevents tree-shaking issues and removes ~500KB from node_modules. Since it was never imported, it shouldn't have been in the client bundle, but removing it prevents accidental future imports.

### 2. Dynamic import for JSZip
**File:** `src/app/reports/annex-iv/page.tsx`  
**Change:** `import JSZip from 'jszip'` → `const { default: JSZip } = await import('jszip')` inside the export handler  
**Impact:** JSZip (~90KB) is no longer included in the annex-iv page's initial JS bundle. It's only loaded when the user clicks "Export All".

---

## Priority Recommendations (Not Yet Fixed)

| Priority | Issue | Estimated Impact |
|----------|-------|-----------------|
| 🔴 High | Dynamic import Copilot + CommandPalette from layout | -50KB from every page load |
| 🔴 High | Dynamic import CsvUploadWizard | -30KB from funds/investors/holdings pages |
| 🟡 Medium | Split i18n translations by locale (lazy load non-default) | -60KB from shared chunk |
| 🟡 Medium | Add per-page metadata titles | Better SEO/accessibility |
| 🟢 Low | Convert static pages to server components | Faster TTFB for terms/privacy/DPA |
| 🟢 Low | Add width/height to landing page images | Reduce CLS |
| 🟢 Low | Add `@next/bundle-analyzer` to devDependencies | Ongoing monitoring |
