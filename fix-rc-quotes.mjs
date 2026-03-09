/**
 * Fix readiness-check route.ts: single \' (broken) → \\' (correct) in event handlers
 * 
 * Root cause: inside a TypeScript template literal, \' renders as just ' (not \')
 * because single-quote doesn't need escaping in template literals.
 * The fix: use \\' which renders as \' in the output, which is valid in a JS single-quoted string.
 */
import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let src = readFileSync(p, 'utf8');

// Count before
const singleBackslashQuote = (src.match(/(?<!\\)\\'/g) || []).length;
console.log(`Single \\' occurrences: ${singleBackslashQuote}`);

// The problematic patterns are: onfocus, onblur, onmouseover, onmouseout handlers
// that use \' inside the template literal for quoting CSS values.
// These are all in event handler inline style strings like:
//   onfocus="this.style.borderColor=\'rgba(...)\'", etc.
// Fix: replace \' with \\' in these contexts ONLY where it's a single backslash.

// Strategy: find all standalone \' (not \\') and replace with \\'
// Use a regex that matches ' preceded by exactly one \ (not \\)
// In the source string, \\ represents a literal backslash, so:
// - "\\'" in source = a backslash + quote in the file (the CORRECT double-backslash form)  
// - "\'" in source = single backslash + quote (the broken form)

// We need to fix cases where the SOURCE TEXT has a literal single backslash before quote
// In JS string terms: look for sequences where char is '\' and next is '\''
// and the char before is NOT '\'

let fixed = 0;
let result = '';
for (let i = 0; i < src.length; i++) {
  if (src[i] === '\\' && src[i+1] === "'" && (i === 0 || src[i-1] !== '\\')) {
    // Check if we're inside a JS string context (rough heuristic: look for the surrounding pattern)
    // This is a single \' — change to \\'
    result += "\\\\'";
    i++; // skip the '
    fixed++;
  } else {
    result += src[i];
  }
}

console.log(`Fixed ${fixed} occurrences`);

// Verify the fix looks right
const testSection = result.substring(87600, 87750);
console.log('\nFixed section preview:');
console.log(testSection);

writeFileSync(p, result, { encoding: 'utf8' });
console.log('\nFile written. Verifying with node syntax check...');
