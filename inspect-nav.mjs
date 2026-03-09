import { readFileSync } from 'fs';
const content = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html', 'utf8');

// Nav wrapper CSS
const navWrapIdx = content.indexOf('.nav-wrap');
console.log('=== .nav-wrap CSS ===');
console.log(content.substring(navWrapIdx, navWrapIdx + 500));

// Header/nav container HTML
const headerIdx = content.indexOf('nav-wrap');
console.log('\n=== nav-wrap HTML ===');
console.log(content.substring(Math.max(0, headerIdx - 30), headerIdx + 300));

// Check if nav is inside a fixed header
const fixedIdx = content.indexOf('position:fixed');
console.log('\n=== position:fixed occurrences ===');
let pos = 0;
while ((pos = content.indexOf('position:fixed', pos)) !== -1) {
  console.log(content.substring(Math.max(0, pos - 50), pos + 100));
  pos++;
}
