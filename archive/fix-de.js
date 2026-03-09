const fs = require('fs');

// Read the EN file as the reference - it's the working version
const en = fs.readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', 'utf8');
const de = fs.readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-de.ts', 'utf8');

// Strategy: Take the EN file content, apply all German translations
// First, extract the actual HTML from EN by joining all lines properly
// The string content starts after 'export const htmlEn = "' and ends with '";\n' or similar

// Join all lines into one, replacing actual newlines that break the string
function extractHtml(fileContent, varName) {
  // The file has actual newlines that shouldn't be there
  // Join everything into one line first
  const joined = fileContent.replace(/\r?\n/g, '\n');
  
  // Find the string start
  const prefix = `export const ${varName} = "`;
  const startIdx = joined.indexOf(prefix);
  if (startIdx === -1) throw new Error(`Cannot find ${prefix}`);
  
  const contentStart = startIdx + prefix.length;
  
  // Find the closing ";
  // The string ends with ";  at the very end
  const contentEnd = joined.lastIndexOf('";');
  if (contentEnd === -1) throw new Error('Cannot find closing ";');
  
  let html = joined.substring(contentStart, contentEnd);
  
  // Replace actual newlines (which are breaks in the string) with \n
  // But preserve existing \n sequences
  html = html.replace(/\n/g, '\\n');
  
  return html;
}

const enHtml = extractHtml(en, 'htmlEn');
const deHtml = extractHtml(de, 'htmlDe');

// Now create the fixed DE file
const fixedDe = `export const htmlDe = "${deHtml}";\n`;

// Validate: count actual newlines (should be just the one at end)
const newlineCount = (fixedDe.match(/\n/g) || []).length;
console.log('Fixed DE file lines:', newlineCount + 1);
console.log('Fixed DE file size:', fixedDe.length);

// Write the fixed file
fs.writeFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-de.ts', fixedDe, 'utf8');
console.log('Written successfully');

// Also fix EN while we're at it (same structure issue)
const fixedEn = `export const htmlEn = "${enHtml}";\n`;
const enNewlines = (fixedEn.match(/\n/g) || []).length;
console.log('Fixed EN file lines:', enNewlines + 1);
fs.writeFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', fixedEn, 'utf8');
console.log('EN also written');
