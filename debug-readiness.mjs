import { readFileSync } from 'fs';
const content = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

// Find the button rendering forEach
const idx = content.indexOf("'yes','partial','progress','no','na'");
console.log('Button rendering:');
console.log(content.substring(Math.max(0, idx - 100), idx + 500));

// Also find nav/progress bar top and content padding
console.log('\n--- progress-wrap CSS ---');
const pwIdx = content.indexOf('progress-wrap');
console.log(content.substring(Math.max(0, pwIdx - 20), pwIdx + 300));

// Find quiz screen content padding
const qsIdx = content.indexOf('screen quiz');
const qsIdx2 = content.indexOf('quiz-body');
console.log('\n--- quiz-body ---');
console.log(content.substring(Math.max(0, qsIdx2 - 20), qsIdx2 + 200));
