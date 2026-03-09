import { readFileSync } from 'fs';
const content = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

// Get lang-btn CSS
const langCss = content.indexOf('.lang-btn{');
console.log('lang-btn CSS:', content.substring(langCss, langCss + 400));

// Get toggle HTML element
const idx = content.indexOf('lang-toggle');
// Skip the CSS definition, find the HTML
let pos = content.indexOf('lang-toggle', idx + 1);
while (pos > -1 && content.substring(pos - 10, pos).includes('{')) {
  pos = content.indexOf('lang-toggle', pos + 1);
}
console.log('\nToggle HTML context:', content.substring(Math.max(0, pos - 50), pos + 300));

// Full CTA block
const ctaStart = content.indexOf('// Final CTA');
console.log('\nFull CTA block (first 2000):\n', content.substring(ctaStart, ctaStart + 2000));
