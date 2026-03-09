import { readFileSync, writeFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);

// Write to temp file to run with node --check
writeFileSync('/tmp/test-script.js', script, 'utf8');
console.log('Written', script.length, 'bytes to /tmp/test-script.js');
console.log('Run: node --check /tmp/test-script.js');
