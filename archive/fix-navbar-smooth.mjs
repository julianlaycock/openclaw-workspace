import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // Remove all existing nav-wrap CSS
  c = c.replace(/\.nav-wrap\{[^}]+\}/g, '');
  c = c.replace(/\.nav-wrap\.scrolled\{[^}]+\}/g, '');

  // Ultra-smooth navbar: 0.8s duration, spring-like easing, opacity-based background transition
  const navCSS = `
.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;max-width:100%;margin:0 auto;background:transparent;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);border:1px solid transparent;border-radius:0px;box-shadow:none;padding:0;transition:max-width .8s cubic-bezier(.16,1,.3,1),margin .8s cubic-bezier(.16,1,.3,1),background .6s ease,backdrop-filter .6s ease,-webkit-backdrop-filter .6s ease,border .6s ease,border-radius .8s cubic-bezier(.16,1,.3,1),box-shadow .6s ease,padding .8s cubic-bezier(.16,1,.3,1)}
.nav-wrap.scrolled{max-width:860px;margin:14px auto;background:rgba(22,27,27,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06);border-radius:22px;box-shadow:0 8px 40px rgba(0,0,0,0.15),0 1.5px 6px rgba(0,0,0,0.08);padding:2px 6px}
`;
  c = c.replace('</style>', navCSS + '</style>');

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Ultra-smooth navbar applied (${c.length} chars)`);
}

console.log('\\n0.8s spring curve for size/shape, 0.6s ease for color/blur.');
console.log('Explicit from-values (transparent, 0px blur, 0 radius) ensure smooth interpolation.');
