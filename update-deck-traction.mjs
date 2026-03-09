import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/openclaw-workspace/pitch-deck/index-v3.html';
let html = readFileSync(p, 'utf8');

// Find the traction slide numbers
const tcNums = [...html.matchAll(/<div class="tc-num">([^<]+)<\/div>\s*<div class="tc-label">([^<]+)<\/div>/g)];
console.log('Current traction cards:');
tcNums.forEach(m => console.log(' ', m[1], '—', m[2]));

// Find traction section HTML 
const tractionSlideStart = html.indexOf('id="slide-7"') > -1 ? html.indexOf('id="slide-7"') : html.indexOf('SLIDE 7');
const traction = html.substring(tractionSlideStart, tractionSlideStart + 3000);
console.log('\nTraction slide snippet:', traction.substring(0, 500));

// Update test count in any traction/metrics cards
// Replace 179 with 231 wherever it appears in traction context
html = html.replace(/>179</g, '>231<');
html = html.replace(/>179\b/g, '>231');

// Update '47 days' with '45 days' 
html = html.replace(/47 days/g, '45 days');

// Add Sphinx to competitive validation if there's a competition slide
const compIdx = html.toLowerCase().indexOf('competition');
if (compIdx > -1) {
  console.log('\nCompetition slide found at:', compIdx);
  console.log(html.substring(compIdx, compIdx + 200));
}

// Check what grant/traction info is present
console.log('\nKey content check:');
['Sphinx', '$7.1M', 'Campus Founders', 'EXIST', 'Montold', 'NGI', 'non-dilutive', '€50K', 'email gate'].forEach(k => {
  console.log(' ', k + ':', html.includes(k));
});

writeFileSync(p, html, { encoding: 'utf8' });
console.log('\nDeck updated.');
