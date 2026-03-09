import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let c = readFileSync(path, 'utf8');

// Find all occurrences of "Germany"
let idx = 0;
while ((idx = c.indexOf('Germany', idx)) !== -1) {
  const slice = c.substring(idx, idx + 15);
  console.log(`At ${idx}: ${JSON.stringify(slice)}`);
  idx++;
}

// Extract script and re-check
const script = c.substring(c.indexOf('<script>') + 8, c.lastIndexOf('</script>'));

// Find lines with apostrophe issues more carefully
const lines = script.split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Check if a single-quoted string on this line has \\' which closes it early
  // Pattern: content followed by \\' where \\ is escape-backslash
  if (l.includes("\\\\'")) {
    console.log(`\nLine ${i+1} has \\\\' pattern:`, l.substring(0, 200));
  }
}

// Try parsing full script to get error
try {
  new Function(script);
  console.log('\nScript parses OK!');
} catch(e) {
  console.log('\nError:', e.message);
  // Find line number if available
  if (e.lineNumber) console.log('At line:', e.lineNumber);
}
