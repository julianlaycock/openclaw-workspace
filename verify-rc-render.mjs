// Simulate what Next.js renders from the template literal
// Template literal processing: \\ → \, \' → ' (but we fixed \' to \\' so \\ → \ and then ' stays)
import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync(
  'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts',
  'utf8'
);

// Extract the template literal content between the script tags
const scriptStart = src.indexOf('<script>') + '<script>'.length;
const scriptEnd = src.lastIndexOf('</script>');
const rawScript = src.substring(scriptStart, scriptEnd);

// Simulate template literal processing (rough simulation of \\ → \)
// In a JS template literal, \\ is a literal backslash in the output
const rendered = rawScript.replace(/\\\\/g, '\\');

writeFileSync('C:/Users/julia/openclaw-workspace/rc-rendered.js', rendered, 'utf8');
console.log('Rendered script written. Now checking syntax...');

// Check for the problematic onfocus pattern
const focusBad = rendered.includes("borderColor='rgba");
const focusGood = rendered.includes("borderColor=\\'rgba") || rendered.includes("borderColor=\\u0027rgba");
console.log('Bad pattern (breaks string):', focusBad);
console.log('Good pattern:', focusGood);
console.log('onfocus context:', rendered.substring(rendered.indexOf('gate-email'), rendered.indexOf('gate-email') + 400));
