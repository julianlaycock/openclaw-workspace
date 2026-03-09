import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // ═══════════════════════════════════════════════
  // FIX 2: FADE-IN — target .section divs, not <section> tags
  // ═══════════════════════════════════════════════
  
  // Remove old broken fade JS
  c = c.replace(/<script>\n?\(function\(\)\{\n?\s*var els=document\.querySelectorAll\('section,[\s\S]*?observer\.observe\(el\)\}\);\n?\}\)\(\);\n?<\/script>/g, '');

  const fadeJS = `
<script>
(function(){
  var els=document.querySelectorAll('.section,.feat-card,.dash-card,.tilt-card,.price-card,.faq-item,.copilot-section,.api-section,.comp-section,.process-section,.dash-section');
  els.forEach(function(el,i){
    el.classList.add('reveal');
    var delay=i%4;
    if(delay===1)el.classList.add('reveal-delay-1');
    if(delay===2)el.classList.add('reveal-delay-2');
    if(delay===3)el.classList.add('reveal-delay-3');
  });
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
    });
  },{threshold:0.06,rootMargin:'0px 0px -80px 0px'});
  els.forEach(function(el){obs.observe(el)});
})();
</script>`;

  // ═══════════════════════════════════════════════
  // FIX 3: COUNTERS — target .dash-stat .n elements
  // ═══════════════════════════════════════════════

  // Remove old broken counter JS
  c = c.replace(/<script>\n?\(function\(\)\{\n?\s*function animateCount[\s\S]*?observer\.observe\(el\);\n?\s*\}\);\n?\}\)\(\);\n?<\/script>/g, '');

  const counterJS = `
<script>
(function(){
  function animateCount(el,target,suffix){
    var start=0,dur=2200,t0=null;
    var isF=String(target).includes('.');
    function step(ts){
      if(!t0)t0=ts;
      var p=Math.min((ts-t0)/dur,1);
      var ease=1-Math.pow(1-p,4);
      var v=start+(target-start)*ease;
      el.textContent=(isF?v.toFixed(1):Math.round(v))+(suffix||'');
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el=e.target;
        var text=el.textContent.trim();
        var match=text.match(/([\\d,.]+)(.*)/);
        if(match){
          var num=parseFloat(match[1].replace(/,/g,''));
          var suffix=match[2];
          if(!isNaN(num)&&num>0){
            el.textContent='0'+suffix;
            animateCount(el,num,suffix);
          }
        }
        obs.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.dash-stat .n').forEach(function(el){obs.observe(el)});
})();
</script>`;

  // ═══════════════════════════════════════════════
  // FIX 5: LENIS — fix initialization (might be syntax error)
  // ═══════════════════════════════════════════════

  // Remove old Lenis init
  c = c.replace(/<script>\n?const lenis=new Lenis[\s\S]*?requestAnimationFrame\(raf\);[\s\S]*?<\/script>/g, '');
  // Also remove any nav-scrolled toggling script from Phase 1
  c = c.replace(/<script>\n?\(function\(\)\{\n?\s*var nav=document[\s\S]*?\}\)\(\);?\n?<\/script>/g, '');

  const lenisJS = `
<script>
document.addEventListener('DOMContentLoaded',function(){
  if(typeof Lenis==='undefined')return;
  var lenis=new Lenis({
    duration:1.6,
    easing:function(t){return t===1?1:1-Math.pow(2,-12*t)},
    smoothWheel:true,
    wheelMultiplier:0.7,
    touchMultiplier:1.5
  });
  function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();lenis.scrollTo(target,{offset:-80})}
    });
  });
});
</script>`;

  // ═══════════════════════════════════════════════
  // FIX 8: BUTTONS — higher specificity override
  // ═══════════════════════════════════════════════

  // Remove old btn CSS if injected
  c = c.replace(/\.btn,\.btn-demo\{transition:transform[^}]+\}/g, '');
  c = c.replace(/\.btn:hover,\.btn-demo:hover\{[^}]+\}/g, '');
  c = c.replace(/\.btn:active,\.btn-demo:active\{[^}]+\}/g, '');

  const btnCSS = `
a.btn-demo,a.btn,.btn-demo,.btn{transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s cubic-bezier(.4,0,.2,1),background .3s ease,color .2s !important}
a.btn-demo:hover,a.btn:hover,.btn-demo:hover,.btn:hover{transform:translateY(-2px) !important;box-shadow:0 8px 24px rgba(0,0,0,0.2) !important}
a.btn-demo:active,a.btn:active,.btn-demo:active,.btn:active{transform:translateY(0) scale(0.98) !important;transition-duration:.1s !important}
`;

  c = c.replace('</style>', btnCSS + '\n</style>');

  // Inject all JS before </body>
  c = c.replace('</body>', lenisJS + fadeJS + counterJS + '\n</body>');

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Fixed all 4 issues (${c.length} chars)`);
}

console.log('\\nFixed:');
console.log('2. Fade-in: now targets .section, .feat-card, .dash-card, etc.');
console.log('3. Counters: now targets .dash-stat .n elements');
console.log('5. Lenis: wrapped in DOMContentLoaded, smooth anchor scrolling added');
console.log('8. Buttons: higher specificity with !important overrides');
