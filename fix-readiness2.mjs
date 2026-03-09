import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
const c = readFileSync(path, 'utf8');

// Find "Germany" and show the exact chars around it
const idx = c.indexOf("Germany");
console.log('Germany found at index:', idx);
console.log('Chars around Germany:');
const slice = c.substring(idx, idx + 10);
for (let i = 0; i < slice.length; i++) {
  console.log(`  [${i}] char=${JSON.stringify(slice[i])} code=${slice.charCodeAt(i)}`);
}

// Show what exactly needs to be replaced
const before = c.substring(idx - 5, idx + 15);
console.log('\nExact bytes:', JSON.stringify(before));
