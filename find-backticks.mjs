import { readFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');
const lines = c.split('\n');
// Find lines with backticks after line 5 (skipping the opening template literal)
lines.forEach((l, i) => {
  if (i > 5 && l.includes('`')) {
    console.log('LINE', i+1, ':', l.substring(0, 120));
  }
});
console.log('Total lines:', lines.length);
