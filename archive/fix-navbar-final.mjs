import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // 1. Remove ALL old nav-wrap CSS rules (clean slate)
  // Remove .nav-wrap{...} blocks
  c = c.replace(/\.nav-wrap\{[^}]+\}/g, '');
  // Remove .nav-wrap.scrolled{...} blocks  
  c = c.replace(/\.nav-wrap\.scrolled\{[^}]+\}/g, '');
  // Remove .nav-scrolled blocks from Phase 1 injection
  c = c.replace(/\.nav-scrolled[^{]*\{[^}]+\}/g, '');

  // 2. Inject clean, premium navbar CSS before </style>
  // Key to smooth: transition individual properties, use will-change, longer duration
  const navCSS = `
.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;border-bottom:1px solid transparent;padding:0;will-change:max-width,margin,background,border-radius,border-color,box-shadow,padding;transition:max-width .5s cubic-bezier(.22,1,.36,1),margin .5s cubic-bezier(.22,1,.36,1),background .5s cubic-bezier(.22,1,.36,1),border-radius .5s cubic-bezier(.22,1,.36,1),border-color .5s cubic-bezier(.22,1,.36,1),box-shadow .5s cubic-bezier(.22,1,.36,1),padding .5s cubic-bezier(.22,1,.36,1),backdrop-filter .5s cubic-bezier(.22,1,.36,1)}
.nav-wrap.scrolled{max-width:860px;margin:14px auto;background:rgba(22,27,27,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.07);border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,0.2),0 2px 8px rgba(0,0,0,0.1);padding:2px 6px}
`;
  c = c.replace('</style>', navCSS + '</style>');

  // 3. Remove duplicate Lenis/nav-scrolled scripts injected by Phase 1
  // Remove the nav-scrolled toggling script (we use the existing .scrolled toggling)
  c = c.replace(/\(function\(\)\{var nav=document[\s\S]*?nav-scrolled[\s\S]*?\}\)\(\);?\n?/g, '');

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Clean navbar CSS applied (${c.length} chars)`);
}

console.log('\\nDone. The transition now uses:');
console.log('- 0.5s duration (was 0.4s) for smoother feel');
console.log('- cubic-bezier(.22,1,.36,1) = ease-out-quint (premium overshoot curve)');
console.log('- Individual property transitions (not "all") for GPU optimization');
console.log('- will-change hint for browser compositing');
console.log('- Softer blur (20px) and more translucent bg (0.88)');
console.log('- Larger border-radius (20px) and subtler shadow');
