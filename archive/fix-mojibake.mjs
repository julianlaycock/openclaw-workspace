import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static';

for (const lang of ['en', 'de']) {
  const f = `${base}/landing-${lang}.html`;
  let c = readFileSync(f, 'utf8');
  let fixes = 0;

  // All known mojibake replacements (U+FFFD = replacement char from corrupted UTF-8)
  const replacements = [
    // EN file
    ['compliance \uFFFD automated', 'compliance — automated'],
    ['confirm \uFFFD handled', 'confirm — handled'],
    ['monitoring \uFFFD always', 'monitoring — always'],
    // DE file  
    ['Demn\uFFFDchst', 'Demnächst'],
    ['Compliance \uFFFD automatisiert', 'Compliance — automatisiert'],
    ['\uFFFDbermitteln', 'übermitteln'],
    ['Best\uFFFDtigung \uFFFD vollst\uFFFDndig', 'Bestätigung — vollständig'],
    ['\uFFFDber das', 'über das'],
    ['Pr\uFFFDfungen', 'Prüfungen'],
    ['Gespr\uFFFDch', 'Gespräch'],
    // Also fix the HTML comment
    ['AGENTS \uFFFD COMING', 'AGENTS — COMING'],
    ['AGENTEN \uFFFD DEMN', 'AGENTEN — DEMN'],
  ];

  for (const [bad, good] of replacements) {
    if (c.includes(bad)) {
      c = c.replaceAll(bad, good);
      fixes++;
    }
  }

  // Catch any remaining U+FFFD that we missed — replace with em dash as most likely
  const remaining = (c.match(/\uFFFD/g) || []).length;
  if (remaining > 0) {
    console.log(`  WARNING: ${remaining} remaining U+FFFD in ${lang} after targeted fixes`);
    // Show context for each remaining one
    const lines = c.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('\uFFFD')) {
        const idx = line.indexOf('\uFFFD');
        console.log(`  Line ${i+1}: ...${line.substring(Math.max(0,idx-20), idx+20)}...`);
      }
    });
  }

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: ${fixes} targeted fixes applied, ${remaining} remaining`);
}

console.log('\nDone. Hard refresh the landing page.');
