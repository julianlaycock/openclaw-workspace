import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let c = readFileSync(path, 'utf8');

// All unescaped apostrophes in single-quoted JS strings inside the template literal
// Fix by replacing with HTML entity &#39; (safe in both JS strings and HTML)
const fixes = [
  // gate-copy strings with We'll / We'll
  ["We'll create a tailored step-by-step plan", "We&#39;ll create a tailored step-by-step plan"],
  ["We'll be in touch shortly", "We&#39;ll be in touch shortly"],
  ["We'll only use your email to send the report. No spam, ever.", "We&#39;ll only use your email to send the report. No spam, ever."],
  ["We'll send your detailed analysis to", "We&#39;ll send your detailed analysis to"],
  // Any other contractions in single-quoted strings
  ["doesn't", "doesn&#39;t"],
  ["can't", "can&#39;t"],
  ["won't", "won&#39;t"],
  ["don't", "don&#39;t"],
  ["it's", "it&#39;s"],
  ["that's", "that&#39;s"],
  ["you'd", "you&#39;d"],
  ["you'll", "you&#39;ll"],
  ["they'll", "they&#39;ll"],
  ["we'd", "we&#39;d"],
];

let count = 0;
for (const [from, to] of fixes) {
  if (c.includes(from)) {
    c = c.split(from).join(to);
    console.log(`Fixed: "${from}" → "${to}"`);
    count++;
  }
}

writeFileSync(path, c, 'utf8');
console.log(`\nTotal fixes: ${count}`);

// Verify
const script = c.substring(c.indexOf('<script>') + 8, c.lastIndexOf('</script>'));
try {
  new Function(script);
  console.log('✅ Script parses OK after fix!');
} catch(e) {
  console.log('❌ Still has error:', e.message);
  // Show lines near error
  const lines = script.split('\n');
  lines.forEach((l, i) => {
    // Look for unescaped apostrophes in single-quoted strings
    // Simple heuristic: line has odd number of raw ' chars that aren't preceded by \
    const rawQuotes = [...l].filter((ch, j) => ch === "'" && l[j-1] !== '\\').length;
    if (rawQuotes % 2 !== 0 && !l.trim().startsWith('//')) {
      console.log(`Possibly broken line ${i+1}:`, l.substring(0, 150));
    }
  });
}
