const fs = require('fs');
const de = fs.readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-de.ts', 'utf8');
const en = fs.readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', 'utf8');

// Check if the files can be evaluated as JS (replacing export)
function testEval(name, content) {
  try {
    new Function(content.replace(/^export\s+/, ''));
    console.log(name, 'VALID JS');
  } catch(e) {
    console.log(name, 'INVALID:', e.message);
  }
}

testEval('EN', en);
testEval('DE', de);

// Compare structure: find where DE differs from EN in non-content ways
// Look for unescaped quotes or other issues in each line
const deLines = de.split('\n');
const enLines = en.split('\n');

for (let i = 0; i < deLines.length; i++) {
  // Check for unescaped double quotes (not preceded by backslash, not at string boundaries)
  const dl = deLines[i];
  const el = enLines[i];
  
  // Count unescaped double quotes
  const deQuotes = (dl.match(/(?<!\\)"/g) || []).length;
  const enQuotes = (el.match(/(?<!\\)"/g) || []).length;
  
  if (deQuotes !== enQuotes) {
    console.log(`Line ${i}: DE has ${deQuotes} unescaped quotes, EN has ${enQuotes}`);
    // Find the positions
    let pos = 0;
    let count = 0;
    while (pos < dl.length) {
      if (dl[pos] === '"' && (pos === 0 || dl[pos-1] !== '\\')) {
        count++;
        if (count > 1 && count < deQuotes) {
          console.log(`  DE quote at pos ${pos}: ...${dl.substring(Math.max(0,pos-30), pos+30)}...`);
        }
      }
      pos++;
    }
  }
}

// Check for problematic characters in DE that aren't in EN
console.log('\nChecking for non-ASCII issues in DE...');
const deLast = deLines[deLines.length - 1];
// Look for ü, ö, ä, ß etc that might not be properly encoded
const nonAscii = [];
for (let i = 0; i < deLast.length; i++) {
  if (deLast.charCodeAt(i) > 127) {
    nonAscii.push({pos: i, char: deLast[i], code: deLast.charCodeAt(i), context: deLast.substring(Math.max(0,i-10), i+10)});
  }
}
console.log(`Found ${nonAscii.length} non-ASCII chars in DE last line`);
if (nonAscii.length > 0) {
  nonAscii.slice(0, 5).forEach(n => console.log(`  pos ${n.pos}: '${n.char}' (${n.code}) context: ${n.context}`));
}
