import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  console.log(`Processing ${f}...`);
  let c = readFileSync(f, 'utf8');

  // 1. Arrow animation: 3px -> 4px
  const arrowCount = (c.match(/translateX\(3px\)/g) || []).length;
  c = c.replace(/translateX\(3px\)/g, 'translateX(4px)');
  console.log(`  Arrow: ${arrowCount} occurrences updated`);

  // 2. Hero gradient overlay
  if (c.includes('background:#2D3333;height:100vh')) {
    c = c.replace(
      'background:#2D3333;height:100vh',
      'background:radial-gradient(ellipse at 30% 0%, rgba(200,230,240,0.3) 0%, transparent 60%), #2D3333;height:100vh'
    );
    console.log('  Hero gradient: injected');
  } else {
    console.log('  Hero gradient: pattern not found, skipping');
  }

  // 3. Morphing navbar CSS
  if (!c.includes('.nav-scrolled')) {
    const navCSS = `
.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .4s cubic-bezier(.4,0,.2,1);padding:0 16px}
.nav-scrolled{max-width:900px;margin:12px auto;background:rgba(25,30,30,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.25)}`;
    c = c.replace('</style>', navCSS + '\n</style>');
    console.log('  Navbar CSS: injected');
  }

  // 4. Lenis smooth scroll + navbar scroll listener
  if (!c.includes('lenis')) {
    const scripts = `
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
<script>
const lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
requestAnimationFrame(raf);
(function(){
  var nav=document.querySelector('nav');
  if(nav){
    var wrap=nav.parentElement;
    if(wrap){
      wrap.classList.add('nav-wrap');
      window.addEventListener('scroll',function(){
        wrap.classList.toggle('nav-scrolled',window.scrollY>50);
      });
    }
  }
})();
</script>`;
    c = c.replace('</body>', scripts + '\n</body>');
    console.log('  Lenis + scroll listener: injected');
  }

  writeFileSync(f, c, 'utf8');
  console.log(`  Done (${c.length} chars)\n`);
}

console.log('Phase 1 complete. Refresh localhost:3000/api/landing to see changes.');
