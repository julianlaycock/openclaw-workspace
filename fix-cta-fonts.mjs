import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let content = readFileSync(p, 'utf8');

const startMarker = '// Final CTA — recommended next steps';
const endMarker = '  // Disclaimer';
const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

let ctaBlock = content.substring(startIdx, endIdx);

// The problem: font-family:\'Sora\' inside a single-quoted JS string breaks parsing
// Fix: remove quotes from single-word font names (Sora doesn't need quotes)
// and replace JetBrains Mono with a safe version
ctaBlock = ctaBlock.replace(/font-family:\\'Sora\\'/g, 'font-family:Sora');
ctaBlock = ctaBlock.replace(/font-family:\\'JetBrains Mono\\'/g, 'font-family:JetBrains Mono');

// Also check for any remaining unescaped single quotes in font-family
console.log('Remaining font-family issues:', ctaBlock.match(/font-family:'[^']+'/g));

const newContent = content.substring(0, startIdx) + ctaBlock + content.substring(endIdx);
writeFileSync(p, newContent, 'utf8');
console.log('Written. Verifying...');

// Verify the JS is valid by checking the block
const verify = readFileSync(p, 'utf8');
const block = verify.substring(verify.indexOf(startMarker), verify.indexOf(endMarker));
const hasSoraQuotes = block.includes("font-family:'Sora'");
const hasJBMQuotes = block.includes("font-family:'JetBrains Mono'");
console.log('Broken Sora quotes remain:', hasSoraQuotes);
console.log('Broken JBM quotes remain:', hasJBMQuotes);
console.log('Block snippet:', block.substring(100, 300));
