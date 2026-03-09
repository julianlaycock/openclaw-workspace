import { readFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);

const lines = script.split('\n');

// Show lines 54-65 of the script (around the error)
for (let i = 53; i < 68; i++) {
  console.log(`Script line ${i+1}:`, JSON.stringify(lines[i]));
}

// Try wrapping line 57-58 as a complete mini-program
const testStr = lines[57]; // disclaimerText line
console.log('\nFull disclaimerText line:');
console.log(testStr);

// Check for issues
// Count opening vs closing single quotes (unescaped)
let inStr = false;
let issues = [];
for (let j = 0; j < testStr.length; j++) {
  const ch = testStr[j];
  const prev = testStr[j-1];
  if (ch === "'" && prev !== '\\') {
    if (!inStr) { inStr = true; }
    else { inStr = false; }
  }
}
console.log('\nString properly terminated (inStr=false):', !inStr);
