import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // Find the exact .scrolled CSS block
  const scrolledIdx = c.indexOf('.scrolled{background:rgba(26,31,31');
  if (scrolledIdx === -1) {
    console.log(`${lang}: .scrolled block not found`);
    continue;
  }
  
  // Find the closing brace
  const blockEnd = c.indexOf('}', scrolledIdx);
  const oldBlock = c.substring(scrolledIdx, blockEnd + 1);
  console.log(`${lang} OLD: ${oldBlock.substring(0, 120)}...`);

  // Find the class prefix (might be .nav-wrap.scrolled or just .scrolled)
  const prefixStart = c.lastIndexOf('.', scrolledIdx);
  const fullSelector = c.substring(prefixStart, scrolledIdx + '.scrolled'.length);
  console.log(`${lang} Selector: "${fullSelector}"`);

  const newBlock = `scrolled{max-width:860px;margin:12px auto;background:rgba(26,31,31,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.25);padding:4px 8px}`;

  c = c.substring(0, scrolledIdx) + newBlock + c.substring(blockEnd + 1);

  // Also update .nav-wrap transition to animate all properties
  c = c.replace(
    /\.nav-wrap\{([^}]*?)transition:[^;]+;/,
    '.nav-wrap{$1transition:all .4s cubic-bezier(.4,0,.2,1);'
  );

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Updated! (${c.length} chars)\n`);
}

console.log('Done. Refresh the page.');
