import { readFileSync } from 'fs';
const content = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html', 'utf8');

// Hero and section container CSS
['hero{', '.hero{', '.hero-grid{', '.hero-content', 'section{', '.container{', '.section-inner'].forEach(sel => {
  const idx = content.indexOf(sel);
  if (idx > -1) console.log(sel, '\n  ', content.substring(idx, idx+200), '\n');
});

// What padding does the hero use?
const heroSection = content.indexOf('<section class="hero"');
console.log('\nHero HTML:', content.substring(heroSection, heroSection + 150));
