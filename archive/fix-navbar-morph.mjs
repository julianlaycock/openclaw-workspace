import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  console.log(`Processing ${f}...`);
  let c = readFileSync(f, 'utf8');

  // Remove the nav-scrolled CSS I injected (wrong class name)
  c = c.replace(/\n\.nav-scrolled[\s\S]*?box-shadow:[^}]+\}/, '');
  c = c.replace(/\n\.nav-scrolled \.nav-wrap[^}]+\}/, '');

  // Update the existing .nav-wrap.scrolled CSS to include morphing
  // Replace the existing .scrolled style with the Sphinx-style morphing version
  const oldScrolledCSS = '.nav-wrap.scrolled{background:rgba(26,31,31,0.92);backdrop-filter:blur(24px);border-bottom-color:rgba(255,255,255,0.06);box-shadow:0 4px 24px rgba(0,0,0,0.3)}';
  const newScrolledCSS = '.nav-wrap.scrolled{max-width:860px;margin:12px auto;background:rgba(26,31,31,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;border-bottom-color:rgba(255,255,255,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.25);padding:4px 8px}';
  
  if (c.includes(oldScrolledCSS)) {
    c = c.replace(oldScrolledCSS, newScrolledCSS);
    console.log('  Navbar morph: updated existing .scrolled CSS');
  } else {
    // Try with slightly different formatting
    const altOld = '.nav-wrap.scrolled{background:rgba(26, 31, 31, 0.92)';
    if (c.includes(altOld)) {
      // Replace the entire .nav-wrap.scrolled block
      c = c.replace(
        /\.nav-wrap\.scrolled\{[^}]+\}/,
        newScrolledCSS
      );
      console.log('  Navbar morph: updated (alt match)');
    } else {
      console.log('  WARNING: Could not find .nav-wrap.scrolled to update');
      console.log('  Searching for "scrolled"...');
      const idx = c.indexOf('.scrolled');
      if (idx > -1) console.log('  Found at index:', idx, c.substring(idx, idx+100));
    }
  }

  // Also update the .nav-wrap transition to include all properties
  c = c.replace(
    '.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;transition:background .4s,box-shadow .4s,border-color .4s;border-bottom:1px solid transparent}',
    '.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s cubic-bezier(.4,0,.2,1);border-bottom:1px solid transparent}'
  );

  writeFileSync(f, c, 'utf8');
  console.log(`  Done (${c.length} chars)\n`);
}

console.log('Navbar morph updated. Refresh to see the floating pill effect on scroll.');
