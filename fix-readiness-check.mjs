import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let c = readFileSync(path, 'utf8');

// Fix 1: Germany\\'s → Germany&#39;s (HTML entity, safe in JS string context)
// The issue: in the template literal, \\\\'s = two backslashes + apostrophe.
// At runtime: \\\\ → \\, then \\' → closes the JS single-quoted string early.
// Fix: replace the problematic apostrophe with HTML entity &#39; which is safe in both contexts.

// English disclaimerText
c = c.replace(
  "National implementations (e.g., Germany\\\\'s FoMaStG) may vary.",
  "National implementations (e.g., Germany&#39;s FoMaStG) may vary."
);

// Also fix German de: section which likely has same issue with German apostrophes
// Search for any \\\\'s pattern (double backslash + apostrophe in template literal)
const before = c;
c = c.replace(/\\\\\\\\'s/g, '&#39;s');

// Also fix \\'s patterns (single-escaped apostrophe that breaks JS string)
c = c.replace(/(?<!\\)\\\\' /g, "&#39; "); // backslash-backslash-quote-space

writeFileSync(path, c, 'utf8');

if (c !== before) {
  console.log('Replacements made');
} else {
  console.log('No replacements found - trying direct search');
}

// Verify by extracting and checking
const script = c.substring(c.indexOf('<script>') + 8, c.lastIndexOf('</script>'));
try {
  new Function(script);
  console.log('Script parses OK after fix!');
} catch(e) {
  console.log('Still has error:', e.message);
  // Show context
  const lines = script.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Germany")) console.log(`Line ${i+1}:`, lines[i].substring(0, 150));
  }
}
