import { readFileSync } from 'fs';
const html = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html', 'utf8');
const deHtml = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html', 'utf8');

// Find trust-line p tag in EN
const idx = html.indexOf('<p class="trust-line">');
console.log('EN trust-line p tag:', idx > -1 ? html.substring(Math.max(0,idx-80), idx+120) : '❌ NOT FOUND IN HTML');

const deIdx = deHtml.indexOf('<p class="trust-line">');
console.log('DE trust-line p tag:', deIdx > -1 ? '✅ found' : '❌ NOT FOUND');

// Show hero CTAs area
const ctasIdx = html.indexOf('class="hero-ctas"');
console.log('\nHero CTAs area:', html.substring(ctasIdx, ctasIdx + 400));
