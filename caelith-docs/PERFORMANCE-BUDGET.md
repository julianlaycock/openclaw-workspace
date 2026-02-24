# Performance Budget

## Targets

| Metric | Budget |
|--------|--------|
| Page JS (per route) | ≤ 250 KB |
| First Load JS (total) | ≤ 800 KB |
| Largest Contentful Paint (LCP) | ≤ 2.5 s |
| Cumulative Layout Shift (CLS) | ≤ 0.1 |

## Current State

Run `npm run build` in `src/frontend` and check the route table output.
Use `scripts/check-bundle-size.ts` to automate budget checks.

## Automated Check

```bash
cd src/frontend
npx tsx ../../scripts/check-bundle-size.ts
```

The script reads `.next/build-manifest.json` route sizes from the build output
and warns if any page exceeds the budget.

## Notes

- Budgets are for gzipped transfer size as reported by Next.js build output.
- LCP and CLS are runtime metrics — measure with Lighthouse or Web Vitals.
- Plausible Analytics script (~1 KB) is loaded async and doesn't count toward route JS.
