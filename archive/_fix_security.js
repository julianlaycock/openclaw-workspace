const fs = require('fs');
const p = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\middleware\\security.ts';
let c = fs.readFileSync(p, 'utf8');

// Fix 1: CSP - remove unsafe-eval from production, add documentation
c = c.replace(
  /process\.env\.NODE_ENV === 'production'\s*\n\s*\? "script-src 'self' 'unsafe-inline' 'unsafe-eval'".*\n\s*: "script-src 'self' 'unsafe-eval'",\s*\/\/ Dev only:.*\n\s*"style-src 'self' 'unsafe-inline' https:\/\/fonts\.googleapis\.com",\s*\/\/ Swagger UI \+ React inline styles require this/,
  `// CSP script-src rationale:
    // - 'unsafe-inline': Required by Next.js for inline <script> tags (e.g. __NEXT_DATA__).
    //   Removing breaks hydration. TODO: Migrate to nonce-based CSP when Next.js supports it
    //   natively (tracked: https://github.com/vercel/next.js/discussions/54907).
    // - 'unsafe-eval': Required in dev (HMR/Fast Refresh). REMOVED in production —
    //   Next.js prod builds don't use eval().
    process.env.NODE_ENV === 'production'
      ? "script-src 'self' 'unsafe-inline'"   // unsafe-inline required by Next.js; unsafe-eval REMOVED
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Dev: HMR + Swagger UI need eval
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",    // React inline styles + Google Fonts`
);

fs.writeFileSync(p, c);
console.log('security.ts updated');
