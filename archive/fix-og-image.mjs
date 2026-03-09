import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend';

for (const lang of ['en', 'de']) {
  const f = `${base}/public/static/landing-${lang}.html`;
  let c = readFileSync(f, 'utf8');
  
  // Replace old og:image (screenshot-dashboard.png) with new og-card.png
  c = c.replaceAll(
    'https://www.caelith.tech/screenshot-dashboard.png',
    'https://www.caelith.tech/og-card.png'
  );
  
  writeFileSync(f, c, 'utf8');
  console.log(`✅ ${lang.toUpperCase()}: og:image → og-card.png`);
}

console.log('🎯 Done. Commit and push to deploy.');
