import { readFileSync, writeFileSync } from 'fs';

const f = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html';
let c = readFileSync(f, 'utf8');

c = c.replace(
  '<h1>Compliance-Infrastruktur für<br><span class="grad">europäische alternative Investmentfonds</span></h1>',
  '<h1>Fonds-Compliance,<br><span class="grad">automatisiert.</span></h1>'
);

writeFileSync(f, c, 'utf8');
console.log('Done. DE hero now says "Fonds-Compliance, automatisiert."');
