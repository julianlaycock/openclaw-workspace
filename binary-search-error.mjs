import { readFileSync } from 'fs';

const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);

// Binary search for the error
function hasUnexpectedIdentifierError(code) {
  try {
    new Function(code);
    return false;
  } catch(e) {
    return e.message.includes('Unexpected identifier') || e.message.includes('Invalid or unexpected token');
  }
}

const lines = script.split('\n');
let lo = 0, hi = lines.length - 1;

// First find a range that has the error
while (lo < hi - 1) {
  const mid = Math.floor((lo + hi) / 2);
  const chunk = lines.slice(0, mid).join('\n');
  if (hasUnexpectedIdentifierError(chunk + '\n;')) {
    hi = mid;
  } else {
    lo = mid;
  }
}

console.log(`Error around line ${lo+1} to ${hi+1} of script`);
for (let i = Math.max(0, lo-3); i <= Math.min(lines.length-1, hi+3); i++) {
  console.log(`  [${i+1}]: ${JSON.stringify(lines[i]).substring(0, 200)}`);
}
