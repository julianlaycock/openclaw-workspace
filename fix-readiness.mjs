import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let content = readFileSync(p, 'utf8');

// ── 1. Find ansNa bug ──
const ansNaIdx = content.indexOf('ansNa');
if (ansNaIdx > -1) {
  console.log('ansNa context:', content.substring(ansNaIdx - 200, ansNaIdx + 200));
}

// ── 2. Find na button label ──
const naLabelIdx = content.indexOf("N/A");
console.log('N/A label count:', (content.match(/N\/A/g) || []).length);

// ── 3. Find the answer button rendering - look for btn that has value 'na'
const btnSection = content.substring(content.indexOf('ANSWER_OPTIONS') > -1 ? content.indexOf('ANSWER_OPTIONS') : content.indexOf("'na'"), content.indexOf("'na'") + 500);
console.log('na button area:', btnSection.substring(0, 300));

// ── 4. Find nav-bar / content padding issue ──
// Look for the scrollable content container and its padding
const scrollIdx = content.indexOf('screen-quiz');
if (scrollIdx > -1) console.log('screen-quiz:', content.substring(scrollIdx - 50, scrollIdx + 200));
const wrapIdx = content.indexOf('quiz-content');
if (wrapIdx > -1) console.log('quiz-content:', content.substring(wrapIdx - 20, wrapIdx + 150));
