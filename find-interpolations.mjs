import { readFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');
const lines = c.split('\n');
// Find lines with ${ after line 7 (inside the template literal) that aren't the ${langParam} ones
lines.forEach((l, i) => {
  if (i > 6 && i < 1292 && l.includes('${')) {
    console.log('LINE', i+1, ':', l.substring(0, 150));
  }
});
