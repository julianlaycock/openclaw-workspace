import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let c = readFileSync(path, 'utf8');

// Fix the gate-copy line which uses single-quoted strings containing apostrophes
// Pattern: ' ... We'll ... ' - the We'll breaks the JS string
const badPatterns = [
  "We'll create a tailored step-by-step plan for each of your gaps",
  "We'll be in touch shortly",
  "We\\'ll be in touch shortly",
  "We\\'ll create",
];

// Find and show what's in the gate-copy area
const idx = c.indexOf('gate-copy');
if (idx >= 0) {
  console.log('gate-copy area:');
  console.log(c.substring(idx, idx + 400));
}

// Replace all apostrophes in the ternary expression strings for gate-copy and gate-success
// Strategy: find the specific lines and replace ' with &#39; only in the string content

// Fix We'll in any context in the JS
c = c.replace(/We'll/g, "We&#39;ll");
c = c.replace(/We\\'ll/g, "We&#39;ll");

// Fix We'll be in touch  
c = c.replace(/We.ll be in touch/g, "We&#39;ll be in touch");

writeFileSync(path, c, 'utf8');

// Test
const script = c.substring(c.indexOf('<script>') + 8, c.lastIndexOf('</script>'));
try {
  new Function(script);
  console.log('✅ Script parses OK!');
} catch(e) {
  console.log('❌ Error:', e.message);
  // Find the problematic line
  const lines = script.split('\n');
  // Write to file and use node --check
  const { writeFileSync: wf } = await import('fs');
  wf('C:/Users/julia/openclaw-workspace/test2.js', script);
}
