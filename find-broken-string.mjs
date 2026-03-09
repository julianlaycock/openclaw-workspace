import { readFileSync } from 'fs';
const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);
const lines = script.split('\n');

// Find ALL lines with unbalanced single quotes (after first ')
let issues = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Count unescaped single quotes
  let quoteCount = 0;
  for (let j = 0; j < l.length; j++) {
    if (l[j] === "'" && (j === 0 || l[j-1] !== '\\')) {
      quoteCount++;
    }
  }
  // If odd number of unescaped quotes, this line has unbalanced quotes
  if (quoteCount % 2 !== 0) {
    issues.push({ line: i+1, text: l.substring(0, 200), count: quoteCount });
  }
}

if (issues.length === 0) {
  console.log('No lines with odd quote counts found');
} else {
  console.log(`Found ${issues.length} lines with odd quote counts:`);
  issues.forEach(({line, text, count}) => {
    console.log(`\nLine ${line} (quotes: ${count}):`);
    console.log(text);
  });
}
