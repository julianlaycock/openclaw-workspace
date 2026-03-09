import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');
  const origLen = c.length;

  // ═══ FIX 1: Reveal animations not triggering ═══
  // Problem: IntersectionObserver doesn't fire for elements already in viewport
  // Solution: Replace the fade-in script with one that checks initial visibility
  
  // Remove ALL old fade-in scripts
  c = c.replace(/<script>\n?\(function\(\)\{\n?\s*var els=document\.querySelectorAll\('\.section[\s\S]*?obs\.observe\(el\)\}\);\n?\}\)\(\);\n?<\/script>/g, '');

  // Remove old counter scripts too (they may be duplicated)
  c = c.replace(/<script>\n?\(function\(\)\{\n?\s*function animateCount[\s\S]*?\}\)\(\);\n?<\/script>/g, '');

  // Remove old Lenis scripts
  c = c.replace(/<script>\n?document\.addEventListener\('DOMContentLoaded',function\(\)\{\n?\s*if\(typeof Lenis[\s\S]*?\}\);\n?\}\);\n?<\/script>/g, '');

  // Inject clean, working versions before </body>
  const newScripts = `
<script>
// Lenis smooth scroll
document.addEventListener('DOMContentLoaded',function(){
  if(typeof Lenis==='undefined')return;
  var lenis=new Lenis({duration:1.6,easing:function(t){return t===1?1:1-Math.pow(2,-12*t)},smoothWheel:true,wheelMultiplier:0.7});
  function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){e.preventDefault();lenis.scrollTo(target,{offset:-80})}
    });
  });
});
</script>
<script>
// Reveal animations — fixed to handle elements already in viewport
(function(){
  var selectors='.section,.feat-card,.dash-card,.tilt-card,.price-card,.faq-item,.copilot-section,.api-section,.comp-section,.process-section,.dash-section,.dash-stat,.cta-section';
  var els=document.querySelectorAll(selectors);
  els.forEach(function(el,i){
    el.classList.add('reveal');
    var d=i%4;
    if(d===1)el.classList.add('reveal-delay-1');
    if(d===2)el.classList.add('reveal-delay-2');
    if(d===3)el.classList.add('reveal-delay-3');
  });
  // Use requestAnimationFrame to ensure layout is computed before observing
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
        });
      },{threshold:0.01,rootMargin:'50px 0px -40px 0px'});
      els.forEach(function(el){obs.observe(el)});
    });
  });
})();
</script>
<script>
// Animated counters
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el=e.target;
        var text=el.textContent.trim();
        var match=text.match(/([\\.\\d,]+)(.*)/);
        if(match){
          var num=parseFloat(match[1].replace(/,/g,''));
          var suffix=match[2];
          if(!isNaN(num)&&num>0){
            el.textContent='0'+suffix;
            var dur=2200,t0=null;
            function step(ts){
              if(!t0)t0=ts;
              var p=Math.min((ts-t0)/dur,1);
              var ease=1-Math.pow(1-p,4);
              var v=num*ease;
              el.textContent=(String(num).includes('.')?v.toFixed(1):Math.round(v))+(suffix||'');
              if(p<1)requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
        }
        obs.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.dash-stat .n').forEach(function(el){obs.observe(el)});
})();
</script>`;

  c = c.replace('</body>', newScripts + '\n</body>');

  // ═══ FIX 2: Check for mojibake (Ã¤, Ã¶, Ã¼ etc) ═══
  const mojibakePatterns = [
    [/Ã¤/g, 'ä'], [/Ã¶/g, 'ö'], [/Ã¼/g, 'ü'],
    [/Ã„/g, 'Ä'], [/Ã–/g, 'Ö'], [/Ãœ/g, 'Ü'],
    [/ÃŸ/g, 'ß'], [/Ã©/g, 'é'], [/Ã¨/g, 'è'],
    [/Ã§/g, 'ç'], [/Ãª/g, 'ê'], [/Ã®/g, 'î'],
    [/Ã´/g, 'ô'], [/Ã»/g, 'û'], [/Ã¢/g, 'â'],
    [/â€"/g, '—'], [/â€"/g, '–'], [/â€™/g, '''],
    [/â€œ/g, '"'], [/â€\u009D/g, '"'], [/â€¦/g, '…'],
    [/Â§/g, '§'], [/Â©/g, '©'], [/Â®/g, '®'],
    [/Â /g, ' '], // non-breaking space mojibake
  ];
  
  let mojibakeFixed = 0;
  mojibakePatterns.forEach(([pattern, replacement]) => {
    const matches = c.match(pattern);
    if (matches) {
      mojibakeFixed += matches.length;
      c = c.replace(pattern, replacement);
    }
  });

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Fixed (${origLen} -> ${c.length} chars, ${mojibakeFixed} mojibake fixes)`);
}

console.log('\\nDone. Hard refresh both pages.');
