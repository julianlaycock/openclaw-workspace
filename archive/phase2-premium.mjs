import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\public\\static';

for (const lang of ['en', 'de']) {
  const f = join(publicDir, `landing-${lang}.html`);
  let c = readFileSync(f, 'utf8');

  // ═══════════════════════════════════════════════
  // 1. NAVBAR — Silky smooth with CSS-only animation
  // ═══════════════════════════════════════════════
  
  // Remove old nav-wrap CSS
  c = c.replace(/\.nav-wrap\{[^}]+\}/g, '');
  c = c.replace(/\.nav-wrap\.scrolled\{[^}]+\}/g, '');

  const navCSS = `
.nav-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;max-width:100%;margin:0 auto;padding:0;background:transparent;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);border:1px solid transparent;border-radius:0;box-shadow:0 0 0 transparent;transition:max-width 1.1s cubic-bezier(.19,1,.22,1),margin 1.1s cubic-bezier(.19,1,.22,1),padding 1.1s cubic-bezier(.19,1,.22,1),border-radius 1.1s cubic-bezier(.19,1,.22,1),background .8s cubic-bezier(.4,0,.2,1),backdrop-filter .8s cubic-bezier(.4,0,.2,1),-webkit-backdrop-filter .8s cubic-bezier(.4,0,.2,1),border-color .8s cubic-bezier(.4,0,.2,1),box-shadow .8s cubic-bezier(.4,0,.2,1)}
.nav-wrap.scrolled{max-width:860px;margin:14px auto;padding:2px 6px;background:rgba(18,22,22,0.82);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,0.05);border-radius:24px;box-shadow:0 12px 48px rgba(0,0,0,0.12),0 2px 8px rgba(0,0,0,0.06),inset 0 1px 0 rgba(255,255,255,0.04)}
`;

  // ═══════════════════════════════════════════════
  // 2. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  // Every section fades in + slides up when visible
  // ═══════════════════════════════════════════════

  const fadeCSS = `
.reveal{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.19,1,.22,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.12s}
.reveal-delay-2{transition-delay:.24s}
.reveal-delay-3{transition-delay:.36s}
`;

  const fadeJS = `
<script>
(function(){
  var els=document.querySelectorAll('section,.card,.metric-card,.price-card,.faq-item,[class*="-block"],.copilot-section,.api-section');
  els.forEach(function(el,i){
    el.classList.add('reveal');
    if(i%3===1)el.classList.add('reveal-delay-1');
    if(i%3===2)el.classList.add('reveal-delay-2');
  });
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
    });
  },{threshold:0.08,rootMargin:'0px 0px -60px 0px'});
  els.forEach(function(el){observer.observe(el)});
})();
</script>`;

  // ═══════════════════════════════════════════════
  // 3. ANIMATED STAT COUNTERS
  // Numbers count up when scrolled into view
  // ═══════════════════════════════════════════════

  const counterJS = `
<script>
(function(){
  function animateCount(el,target,suffix){
    var start=0,duration=2000,startTime=null;
    var isFloat=String(target).includes('.');
    function step(ts){
      if(!startTime)startTime=ts;
      var p=Math.min((ts-startTime)/duration,1);
      var ease=1-Math.pow(1-p,4);
      var val=start+(target-start)*ease;
      el.textContent=(isFloat?val.toFixed(1):Math.round(val))+(suffix||'');
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el=e.target;
        var text=el.textContent.trim();
        var match=text.match(/([\\d.]+)(.*)/);
        if(match){
          var num=parseFloat(match[1]);
          var suffix=match[2];
          el.textContent='0'+suffix;
          animateCount(el,num,suffix);
          observer.unobserve(el);
        }
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.metric-value,.stat-number,[class*="count"]').forEach(function(el){
    observer.observe(el);
  });
})();
</script>`;

  // ═══════════════════════════════════════════════
  // 4. PREMIUM HOVER EFFECTS ON CARDS
  // Subtle lift + glow on hover
  // ═══════════════════════════════════════════════

  const cardCSS = `
.card,.metric-card,.price-card{transition:transform .4s cubic-bezier(.19,1,.22,1),box-shadow .4s cubic-bezier(.4,0,.2,1)}
.card:hover,.metric-card:hover,.price-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.15),0 4px 12px rgba(0,0,0,0.08)}
`;

  // ═══════════════════════════════════════════════
  // 5. SMOOTH ANCHOR SCROLLING (via Lenis, already added)
  // Make sure Lenis config is premium
  // ═══════════════════════════════════════════════

  // Replace existing Lenis init with smoother config
  c = c.replace(
    /const lenis=new Lenis\(\{[^}]+\}\);/,
    'const lenis=new Lenis({duration:1.6,easing:function(t){return t===1?1:1-Math.pow(2,-12*t)},smoothWheel:true,wheelMultiplier:0.8,touchMultiplier:1.5});'
  );

  // ═══════════════════════════════════════════════
  // 6. SUBTLE GRADIENT MESH ANIMATION ON HERO
  // Slowly moving gradient orbs for depth
  // ═══════════════════════════════════════════════

  const gradientCSS = `
@keyframes gradientShift{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 20%,rgba(100,180,200,0.12) 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,rgba(140,100,200,0.06) 0%,transparent 50%);background-size:200% 200%;animation:gradientShift 20s ease infinite;pointer-events:none;z-index:0}
`;

  // ═══════════════════════════════════════════════
  // 7. TYPOGRAPHY POLISH
  // Better letter-spacing, smoother font rendering
  // ═══════════════════════════════════════════════

  const typographyCSS = `
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
h1,h2,h3{letter-spacing:-0.02em}
p{letter-spacing:0.01em}
`;

  // ═══════════════════════════════════════════════
  // 8. CTA BUTTONS — Premium micro-interactions
  // ═══════════════════════════════════════════════

  // Upgrade existing btn styles
  const btnCSS = `
.btn,.btn-demo{transition:transform .3s cubic-bezier(.19,1,.22,1),box-shadow .3s cubic-bezier(.4,0,.2,1),background .3s ease}
.btn:hover,.btn-demo:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,0.2)}
.btn:active,.btn-demo:active{transform:translateY(0);transition-duration:.1s}
`;

  // ═══════════════════════════════════════════════
  // INJECT ALL CSS + JS
  // ═══════════════════════════════════════════════

  const allCSS = navCSS + fadeCSS + cardCSS + gradientCSS + typographyCSS + btnCSS;
  c = c.replace('</style>', allCSS + '\n</style>');

  const allJS = fadeJS + counterJS;
  c = c.replace('</body>', allJS + '\n</body>');

  writeFileSync(f, c, 'utf8');
  console.log(`${lang}: Full premium upgrade applied (${c.length} chars)`);
}

console.log('\\n✅ Applied:');
console.log('1. Ultra-smooth navbar (1.1s spring curve, 24px radius, frosted glass)');
console.log('2. Scroll-triggered fade-in animations on all sections');
console.log('3. Animated stat counters (count up on scroll)');
console.log('4. Premium card hover effects (lift + glow)');
console.log('5. Smoother Lenis scroll (1.6s duration, reduced wheel speed)');
console.log('6. Animated gradient mesh on hero background');
console.log('7. Typography polish (antialiasing, letter-spacing)');
console.log('8. CTA button micro-interactions (lift on hover, snap on click)');
