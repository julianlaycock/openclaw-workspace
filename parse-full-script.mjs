import { readFileSync } from 'fs';

const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);

// Try to parse the full script
try {
  new Function(script);
  console.log('Script parses OK locally');
} catch(e) {
  console.log('Parse error:', e.message);
}

// Also look for template literal markers in the JS part
const lines = script.split('\n');
lines.forEach((l, i) => {
  // Look for single quote followed by something that could break
  if (l.includes("'") && l.includes('\\u') ) {
    console.log(`Line ${i+1} has unicode escape in string:`, l.substring(0, 150));
  }
  // Look for ${...} which would be interpolated by the outer TS template literal
  if (l.includes('${') && !l.includes('${langParam}')) {
    console.log(`Line ${i+1} has extra interpolation:`, l.substring(0, 150));
  }
});
