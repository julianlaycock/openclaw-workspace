# UI Polish Report — Caelith Frontend

**Date:** 2026-02-23  
**Scope:** All `page.tsx` files in `src/frontend/src/app/`  
**Pages scanned:** 27

---

## 1. Consistency Check

### Page Titles
✅ **Consistent pattern** — All authenticated pages use `text-lg md:text-xl font-semibold tracking-tight text-ink` for h1 titles. Most use `PageHeader` component or inline `<h1>` with the same classes.

**Exceptions (by design):**
- Static legal pages (`/terms`, `/security`, `/privacy`, `/dpa`) use a different style: `text-2xl font-bold text-accent-950` on light `bg-[#F5F2EA]` backgrounds. This is intentional — they're public-facing pages outside the dashboard shell.

### Table Header Styling
✅ **Consistent** — All tables use `text-xs font-medium uppercase tracking-wide text-ink-tertiary` for `<th>` elements. Tables use `border-b border-edge` for header borders and `divide-y divide-edge-subtle` for row dividers.

### Button Variants
✅ **Mostly consistent** — Primary actions use `<Button>`, secondary actions use `<Button variant="secondary">`. 

**Minor issues found:**
- `/rules` page has some hardcoded German button labels (`"Visueller Editor"`, `"+ Neue Regel"`, `"Generiere..."`, `"Regel generieren"`) that should use `t()`.
- `/transfers` page has English-only button labels (`"+ New Transfer"`, `"Simulate"`, `"Execute Transfer"`, `"Approve"`, `"Reject"`).
- `/rules/builder` page has mixed English labels (`"Save Rule"`, `"Saving..."`, `"AI Rule Generator"`).

### Empty States
✅ **Consistent** — All pages use `<EmptyState>` component with `title` and `description` props. Some include an `action` button.

---

## 2. Loading / Error / Empty States

| Page | Loading | Error | Empty |
|------|---------|-------|-------|
| `/dashboard` | ✅ Skeleton | ✅ ErrorMessage | ✅ SetupWizard |
| `/investors` | ✅ SkeletonTable | ✅ ErrorMessage | ✅ EmptyState |
| `/investors/[id]` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ (handled) |
| `/funds` | ✅ SkeletonCards | ✅ ErrorMessage | ✅ EmptyState |
| `/funds/[id]` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ (handled) |
| `/assets` | ✅ SkeletonCards | ✅ ErrorMessage | ✅ EmptyState |
| `/holdings` | ✅ SkeletonTable | ✅ ErrorMessage | ✅ EmptyState |
| `/transfers` | ✅ SkeletonTable | ✅ ErrorMessage | ✅ EmptyState |
| `/rules` | ✅ LoadingSpinner | ✅ (via useAsync) | ✅ EmptyState |
| `/rules/builder` | ✅ LoadingSpinner | ✅ Alert | ✅ (form page) |
| `/decisions` | ✅ SkeletonTable | ✅ ErrorMessage | ✅ EmptyState |
| `/readiness` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ null check |
| `/reports` | ✅ (no data fetch) | N/A | N/A |
| `/reports/annex-iv` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ Empty prompt |
| `/reports/evidence-bundle` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ Empty prompt |
| `/screening` | ✅ LoadingSpinner | ✅ Error banner | ✅ EmptyState |
| `/calendar` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ EmptyState |
| `/audit-log` | ✅ LoadingSpinner | ✅ (inline) | ✅ Empty row msg |
| `/onboarding` | ✅ LoadingSpinner | ✅ ErrorMessage | ✅ EmptyState |

**No gaps found.** All data-fetching pages handle all three states.

---

## 3. i18n Completeness

### ❌ Issues Found

**Hardcoded German strings (should use `t()`):**
- `/rules/page.tsx`: `"Visueller Editor"`, `"+ Neue Regel"`, `"Generiere..."`, `"Regel generieren"`, `"KI-Regel-Generator"`, `"Beschreiben Sie eine Compliance-Regel..."`, `"Schnellvorlagen"`, `"Vermögenswert auswählen..."`, `"Regeln für Vermögenswert anzeigen"`, all `RULE_TEMPLATES` labels, `CONDITION_FIELDS` labels
- `/readiness/page.tsx`: Hardcoded German category labels in `categoryLabels`, hardcoded methodology text

**Hardcoded English strings (should use `t()`):**
- `/transfers/page.tsx`: `"+ New Transfer"`, `"Transfer Units"`, `"Simulate"`, `"Simulating..."`, `"Execute Transfer"`, `"Executing..."`, `"Bulk Transfer Batch"`, `"All assets"`, `"Select investor..."`, all kanban column labels, `"Table"`, `"Kanban"`, `"Approve"`, `"Reject"`, `"Pending Approval"`, `"Executed"`, `"Rejected"`, many more
- `/rules/page.tsx`: `"Built-in Rules"`, `"Configure Built-in Rules"`, `"Custom Compliance Rules"`, modal labels, validation messages
- `/rules/builder/page.tsx`: `"Rule Builder"`, `"Conditions"`, `"Asset"`, `"Description"`, `"AI Rule Generator"`, `"Save Rule"`, `"Saving..."`
- `/onboarding/page.tsx`: Kanban column labels (`"Applied"`, `"Eligible"`, etc.)

**Note:** The app has a comprehensive i18n system (`useI18n()`), and most pages use it extensively. The gaps are primarily in the rules, transfers, and onboarding pages where complex UI was added later.

---

## 4. Dark Theme

### ✅ Generally Excellent
The app uses CSS custom properties (`text-ink`, `bg-bg-primary`, `border-edge`, etc.) consistently throughout authenticated pages.

### ⚠️ Potential Issues

1. **Static legal pages** (`/security`, `/terms`, `/privacy`, `/dpa`): Use hardcoded light colors (`bg-[#F5F2EA]`, `text-accent-950`, `bg-white/60`). These don't adapt to dark mode. **This is likely intentional** — they're public-facing pages shown outside the app shell.

2. **History/PDF modals in readiness & evidence-bundle**: Use `bg-[#F8F9FA]`, `text-[#2D3333]` — hardcoded light surface colors. These modals will look jarring in dark mode. The `light-surface` CSS class is applied but the inline colors override it.

3. **Transfers page validation result**: Uses `text-accent-200` and `text-red-300` which may have low contrast in light mode.

---

## 5. Mobile Responsiveness

### Sidebar
✅ **Well-handled** — Sidebar uses `fixed z-50` positioning with `-translate-x-full` hidden state on mobile, slides in via `mobileOpen` prop. Has explicit close button for mobile. Also has rail (collapsed) mode.

### Tables
✅ **Scrollable** — Most table pages use `<ScrollableTable>` wrapper or `overflow-x-auto` with `min-w-[700px]` on tables, providing horizontal scroll on mobile.

### Forms
✅ **Responsive** — Forms use `flex-col` → `sm:flex-row` patterns. Modal forms have `max-w-lg` with `mx-4` margins.

### ⚠️ Minor Issues
- `/readiness` question rows: Status buttons (`Yes/Partial/No/N/A`) may be cramped on very small screens — the buttons are `flex-shrink-0` and could overflow.
- `/transfers` kanban view: Uses `xl:grid-cols-3` — on mobile it stacks to single column, which is fine.

---

## 6. Navigation

### Sidebar Links
✅ **All links verified** — Every sidebar nav item maps to a real route:
- `/dashboard`, `/funds`, `/holdings`, `/transfers`, `/investors`, `/onboarding`, `/screening`
- `/rules`, `/decisions`, `/readiness`, `/reports`, `/reports/annex-iv`, `/reports/evidence-bundle`  
- `/calendar`, `/audit-log`

### Breadcrumbs
✅ **Present on detail pages** — `/reports/annex-iv`, `/reports/evidence-bundle`, `/investors/[id]`, `/funds/[id]`, `/jurisdiction/[code]` all use `<DetailBreadcrumb>`.

### `/audit` Redirect
✅ `/audit` correctly redirects to `/audit-log`.

### Back Links
✅ Legal pages (`/security`, `/terms`, `/privacy`, `/dpa`) have back links to `/login`.

---

## 7. Form Validation

### Client-side Validation
| Form | Required Fields | Error Messages | Submit Disabled |
|------|----------------|----------------|-----------------|
| Login | ✅ HTML `required` | ✅ `setError()` | ✅ `loading` state |
| Add Investor | ✅ `required` | ✅ `createForm.error` | ✅ `saving` state |
| Add Asset | ✅ `required` | ✅ `createForm.error` | ✅ via `useFormAction` |
| Add Fund | ✅ `required` | ✅ `formError` | ✅ `saving` state |
| Transfer (sim) | ✅ `required` + manual checks | ✅ `formError` | ✅ `simulating`/`executing` |
| Bulk Transfer | ⚠️ No HTML `required` | ✅ `bulkError` | ✅ `bulkLoading` |
| Rules (built-in) | ✅ `required` on asset | ✅ `formError` | ✅ `saving` state |
| Rules (composite) | ✅ manual checks | ✅ `compositeFormError` | ✅ `saving` state |
| Rule Builder | ✅ manual checks | ✅ `error` state | ✅ `saving` state |
| Onboarding | ✅ `required` | ✅ error display | ✅ loading states |
| Holdings | ✅ `required` | ✅ `formError` | ✅ `allocating` state |
| Readiness answers | N/A (button-based) | ✅ via toast | ✅ `saving` per question |

### ⚠️ Missing Required Field Indicators
Most forms rely on HTML `required` attribute but don't visually indicate required fields with asterisks or labels. The `Input` and `Select` components don't render a visual `*` indicator.

---

## 8. Bugs Fixed

### 🐛 `readiness/page.tsx` — Multiple `t()` scope errors (FIXED)

**Problem:** Several sub-components (`Methodology`, `HistoryPanel`, `Disclaimer`, `DeadlineBanner`, `CategoryBar`, `SavedToast`, `QuestionRow`) referenced `t()` translation function without having it in scope. These were standalone functions defined outside the main `ReadinessPage` component.

**Additionally:** Props mismatches:
- `Disclaimer` expected `{ t }` prop but was called with `{ lang }`
- `DeadlineBanner` expected `{ days, t }` but was called with `{ days, lang }`
- `CategoryBar` expected `openLabel` prop but was called with `lang`
- `SavedToast` expected `label` prop but was called without it
- `ReadinessPage` itself destructured only `{ locale }` from `useI18n()` but used `t()` throughout

**Fix:** Added `const { t } = useI18n()` to each sub-component, removed `t` from prop types, fixed prop mismatches. Main component now destructures `{ t, locale }`.

---

## Summary

| Category | Status |
|----------|--------|
| Consistency | ✅ Good — minor button label inconsistencies |
| Loading/Error/Empty | ✅ Complete coverage |
| i18n | ⚠️ Rules, Transfers, Onboarding pages have hardcoded strings |
| Dark Theme | ✅ Good — legal pages intentionally light, minor modal issues |
| Mobile | ✅ Good — sidebar collapses, tables scroll |
| Navigation | ✅ All links work, breadcrumbs present |
| Form Validation | ✅ Good — no visual required field indicators |
| Bugs Fixed | 🔧 Readiness page `t()` scope errors (7 components fixed) |
