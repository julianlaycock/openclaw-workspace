import { readFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('disclaimerText:') && l.includes('orientation tool')) {
    console.log('Line', i+1, '(full):');
    console.log(JSON.stringify(l));
    // Check for unescaped single quotes
    const inside = l.substring(l.indexOf("'") + 1);
    let count = 0;
    for (let j = 0; j < inside.length; j++) {
      if (inside[j] === "'" && inside[j-1] !== '\\') count++;
    }
    console.log('Unescaped single quotes inside:', count);
  }
});
