import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // Replace the .nav-wrap.scrolled block using regex (handles any whitespace/formatting)
  const replaced = c.replace(
    /\.nav-wrap\.scrolled\{[^}]+\}/,
    '.nav-wrap.scrolled{max-width:860px;margin:12px auto;background:rgba(26,31,31,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.25);padding:4px 8px}'
  );
  
  if (replaced === c) {
    console.log(`${lang}: WARNING - .nav-wrap.scrolled not found/replaced`);
    // Debug: find what's actually there
    const idx = c.indexOf('.scrolled{');
    if (idx > -1) {
      const prefix = c.substring(Math.max(0, idx - 20), idx);
      const block = c.substring(idx, c.indexOf('}', idx) + 1);
      console.log(`  Found: ...${prefix}${block.substring(0, 100)}`);
    }
  } else {
    c = replaced;
    console.log(`${lang}: .nav-wrap.scrolled replaced with morph styles`);
  }

  // Update .nav-wrap transition
  c = c.replace(
    /\.nav-wrap\{([^}]*?)transition:[^;]+;/,
    '.nav-wrap{$1transition:all .4s cubic-bezier(.4,0,.2,1);'
  );

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Done (${c.length} chars)\n`);
}
