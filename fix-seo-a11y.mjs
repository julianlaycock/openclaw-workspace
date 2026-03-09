import { readFileSync, writeFileSync } from 'fs';

const files = {
  en: 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html',
  de: 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html',
};

const metaTags = {
  en: `<meta name="description" content="Caelith automates AIFMD II compliance for EU fund managers — Annex IV filing, sanctions screening, investor reporting and BaFin portal submission. Start free.">
<meta property="og:title" content="Caelith — AIFMD II Compliance Platform for EU Fund Managers">
<meta property="og:description" content="Automate Annex IV filing, sanctions screening and BaFin submissions. Built for KVGs. 93% cheaper than Big 4. Try free.">
<meta property="og:image" content="https://www.caelith.tech/og-image.png">
<meta property="og:url" content="https://www.caelith.tech/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Caelith">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Caelith — AIFMD II Compliance Platform">
<meta name="twitter:description" content="Automate AIFMD II compliance for EU fund managers. Annex IV, sanctions, BaFin. 93% cheaper than Big 4.">
<meta name="twitter:image" content="https://www.caelith.tech/og-image.png">
<link rel="canonical" href="https://www.caelith.tech/">`,

  de: `<meta name="description" content="Caelith automatisiert die AIFMD-II-Compliance für EU-Fondsmanager — Annex-IV-Meldung, Sanktionsprüfung, Investorenreporting und BaFin-Portaleinreichung. Kostenlos starten.">
<meta property="og:title" content="Caelith — AIFMD-II-Compliance-Plattform für EU-Fondsmanager">
<meta property="og:description" content="Annex-IV-Einreichung, Sanktionsprüfung und BaFin-Meldungen automatisieren. Für KVGs. 93% günstiger als die Big 4. Jetzt kostenlos testen.">
<meta property="og:image" content="https://www.caelith.tech/og-image.png">
<meta property="og:url" content="https://www.caelith.tech/?lang=de">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="Caelith">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Caelith — AIFMD-II-Compliance-Plattform">
<meta name="twitter:description" content="AIFMD-II-Compliance automatisieren. Annex IV, Sanktionen, BaFin. 93% günstiger als die Big 4.">
<meta name="twitter:image" content="https://www.caelith.tech/og-image.png">
<link rel="canonical" href="https://www.caelith.tech/?lang=de">`,
};

const focusCss = `
/* Focus styles for keyboard navigation */
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px}
a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`;

for (const [lang, p] of Object.entries(files)) {
  let c = readFileSync(p, 'utf8');

  // Mojibake check
  if (c.includes('\u00e2\u20ac') || c.includes('\u00c3\u00bc')) {
    console.log(`${lang.toUpperCase()}: ❌ MOJIBAKE ABORT`); continue;
  }

  let changes = 0;

  // ── 1. Add meta/OG/Twitter tags + canonical after <title> ──
  const titleEnd = c.indexOf('</title>') + 8;
  if (!c.includes('og:title')) {
    c = c.substring(0, titleEnd) + '\n' + metaTags[lang] + c.substring(titleEnd);
    changes++;
    console.log(`${lang.toUpperCase()}: ✅ SEO meta + OG + Twitter + canonical added`);
  } else {
    console.log(`${lang.toUpperCase()}: ⚠️  OG tags already present`);
  }

  // ── 2. Add focus styles ──
  const styleClose = c.indexOf('</style>');
  if (!c.includes(':focus-visible') && styleClose > -1) {
    c = c.substring(0, styleClose) + focusCss + '\n' + c.substring(styleClose);
    changes++;
    console.log(`${lang.toUpperCase()}: ✅ focus-visible styles added`);
  }

  // ── 3. Add type="button" to hamburger and close buttons ──
  c = c.replace('<button class="hamburger" id="hamburger" aria-label="Menu">', '<button type="button" class="hamburger" id="hamburger" aria-label="Menu">');
  c = c.replace('<button class="mobile-close" id="mobileClose" aria-label="Close menu">', '<button type="button" class="mobile-close" id="mobileClose" aria-label="Close menu">');
  c = c.replace('<button class="consent-reject"', '<button type="button" class="consent-reject"');
  c = c.replace('<button class="consent-accept"', '<button type="button" class="consent-accept"');
  changes++;
  console.log(`${lang.toUpperCase()}: ✅ type="button" added to all buttons`);

  writeFileSync(p, c, { encoding: 'utf8' });
  console.log(`${lang.toUpperCase()}: written (${changes} change groups)\n`);
}

// Verify
for (const [lang, p] of Object.entries(files)) {
  const v = readFileSync(p, 'utf8');
  console.log(`${lang.toUpperCase()} verify:`);
  console.log('  meta desc:', v.includes('name="description"') ? '✅' : '❌');
  console.log('  og:title:', v.includes('og:title') ? '✅' : '❌');
  console.log('  og:image:', v.includes('og:image') ? '✅' : '❌');
  console.log('  canonical:', v.includes('rel="canonical"') ? '✅' : '❌');
  console.log('  focus-visible:', v.includes(':focus-visible') ? '✅' : '❌');
  console.log('  mojibake:', v.includes('\u00e2\u20ac') ? '❌' : '✅ clean');
}
