import { readFileSync, writeFileSync } from 'fs';

const files = [
  'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html',
  'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html',
];

for (const p of files) {
  let c = readFileSync(p, 'utf8');
  const lang = p.includes('-en') ? 'EN' : 'DE';

  // Pre-flight
  if (c.includes('\u00e2\u20ac') || c.includes('\u00c3')) {
    console.log(`${lang}: ❌ MOJIBAKE detected - aborting`);
    continue;
  }
  console.log(`${lang}: ✅ encoding clean`);

  let changes = 0;

  // ── Fix 1: Nav inner padding — match hero/section horizontal padding ──
  // Current: padding:16px clamp(32px,5vw,80px)
  // Fix:     padding:16px clamp(40px,8vw,120px)  ← same as hero + sections
  const oldNavPad = 'nav{padding:16px clamp(32px,5vw,80px);display:flex;align-items:center;gap:24px;max-width:1400px;margin:0 auto}';
  const newNavPad = 'nav{padding:16px clamp(40px,8vw,120px);display:flex;align-items:center;gap:24px;max-width:1400px;margin:0 auto}';
  if (c.includes(oldNavPad)) {
    c = c.replace(oldNavPad, newNavPad);
    changes++;
    console.log(`  ${lang}: nav padding aligned ✅`);
  } else {
    console.log(`  ${lang}: ⚠️  nav rule not found (maybe already patched)`);
    // Show current nav rule
    const idx = c.indexOf('nav{padding');
    if (idx > -1) console.log('  Current:', c.substring(idx, idx + 120));
  }

  // ── Fix 2: Logo vertical alignment — ensure nav-logo is vertically centered ──
  // Already has align-items:center on nav, but double-check logo line-height
  const oldLogo = '.nav-logo{font-family:\'Sora\';font-weight:800;font-size:18px;color:#fff;margin-right:auto}';
  const newLogo = '.nav-logo{font-family:\'Sora\';font-weight:800;font-size:18px;color:#fff;margin-right:auto;line-height:1;display:flex;align-items:center}';
  if (c.includes(oldLogo)) {
    c = c.replace(oldLogo, newLogo);
    changes++;
    console.log(`  ${lang}: nav-logo vertical centering ✅`);
  }

  // ── Fix 3: Scrolled pill — ensure max-width matches section-inner (1200px not 860px) ──
  // When scrolled, pill should be consistent width — use clamp to keep it sensible
  const oldScrolled = '.nav-wrap.scrolled{max-width:860px;margin:14px auto;padding:2px 6px;background:rgba(18,22,22,0.82);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.05);border-radius:24px;box-shadow:0 12px 48px rgba(0,0,0,0.12),inset 0 1px 0 rgba(255,255,255,0.04)}';
  const newScrolled = '.nav-wrap.scrolled{max-width:900px;margin:14px auto;padding:2px 6px;background:rgba(18,22,22,0.82);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.05);border-radius:24px;box-shadow:0 12px 48px rgba(0,0,0,0.12),inset 0 1px 0 rgba(255,255,255,0.04)}';
  if (c.includes(oldScrolled)) {
    c = c.replace(oldScrolled, newScrolled);
    changes++;
    console.log(`  ${lang}: scrolled pill max-width ✅`);
  }

  // ── Fix 4: Hero top padding — account for fixed nav height (~56px) ──
  // Current hero padding-top: clamp(80px,10vh,120px) — good, but let's ensure min is higher
  // At small viewports, 80px might not be enough for the fixed nav + breathing room
  // Change min from 80px to 100px
  const oldHeroPad = 'hero{position:relative;padding:clamp(80px,10vh,120px) clamp(40px,8vw,120px) clamp(40px,6vh,80px)';
  const newHeroPad = 'hero{position:relative;padding:clamp(100px,12vh,140px) clamp(40px,8vw,120px) clamp(40px,6vh,80px)';
  if (c.includes(oldHeroPad)) {
    c = c.replace(oldHeroPad, newHeroPad);
    changes++;
    console.log(`  ${lang}: hero top padding increased ✅`);
  }

  writeFileSync(p, c, { encoding: 'utf8' });
  console.log(`  ${lang}: Written (${changes} changes)\n`);
}

// Verify both files are clean
for (const p of files) {
  const v = readFileSync(p, 'utf8');
  const lang = p.includes('-en') ? 'EN' : 'DE';
  console.log(`${lang} post-check: mojibake=${v.includes('\u00e2\u20ac')} nav-aligned=${v.includes('clamp(40px,8vw,120px)')} hero-padded=${v.includes('clamp(100px,12vh,140px)')}`);
}
