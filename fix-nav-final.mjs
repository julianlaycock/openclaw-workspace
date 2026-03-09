import { readFileSync, writeFileSync } from 'fs';

const files = [
  'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html',
  'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html',
];

for (const p of files) {
  let c = readFileSync(p, 'utf8');
  const lang = p.includes('-en') ? 'EN' : 'DE';

  if (c.includes('\u00e2\u20ac') || c.includes('\u00c3\u00bc')) {
    console.log(`${lang}: ❌ MOJIBAKE - abort`); continue;
  }

  let changes = 0;

  // ── Remove max-width + margin from nav ──
  // The nav max-width (1400px) creates a centering offset that heroes/sections don't have
  // Just use clamp padding from viewport edge — same as hero section behaviour
  const oldNav = 'nav{padding:16px clamp(40px,8vw,120px);display:flex;align-items:center;gap:24px;max-width:1400px;margin:0 auto}';
  const newNav = 'nav{padding:16px clamp(40px,8vw,120px);display:flex;align-items:center;gap:24px}';

  if (c.includes(oldNav)) {
    c = c.replace(oldNav, newNav);
    changes++;
    console.log(`${lang}: ✅ nav max-width removed — logo now aligns with hero content`);
  } else {
    const navIdx = c.indexOf('nav{padding');
    console.log(`${lang}: ⚠️  nav rule variant:`, navIdx > -1 ? c.substring(navIdx, navIdx + 120) : 'not found');
  }

  // ── Add gap between nav logo and links so they don't stretch too far ──
  // With no max-width, on very wide screens add a sensible gap constraint
  // nav-links uses gap:20px + margin-right:auto on logo naturally distributes space
  // This is fine — it's standard fixed nav pattern (like Vercel, Linear, etc.)

  writeFileSync(p, c, { encoding: 'utf8' });
  console.log(`${lang}: written (${changes} changes)`);
}

// Verify
for (const p of files) {
  const v = readFileSync(p, 'utf8');
  const lang = p.includes('-en') ? 'EN' : 'DE';
  const navRule = v.match(/nav\{padding[^}]+\}/)?.[0] || 'not found';
  console.log(`\n${lang} nav rule: ${navRule}`);
  console.log(`${lang} mojibake: ${v.includes('\u00e2\u20ac')}`);
}
