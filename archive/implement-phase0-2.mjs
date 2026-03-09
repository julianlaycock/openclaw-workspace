import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend';

// ═══════════════════════════════════════════════
// PHASE 0: BUG FIXES
// ═══════════════════════════════════════════════

for (const lang of ['en', 'de']) {
  const f = `${base}/public/static/landing-${lang}.html`;
  let c = readFileSync(f, 'utf8');
  const fixes = [];

  // ── FIX 1: Reveal animations ──
  // Remove ALL old reveal/counter scripts (any pattern)
  const beforeLen = c.length;
  // Pattern: script blocks containing 'IntersectionObserver' and 'reveal'
  c = c.replace(/<script>[\s\S]*?IntersectionObserver[\s\S]*?<\/script>/g, (match) => {
    if (match.includes('reveal') || match.includes('animateCount') || match.includes('.n')) return '';
    return match;
  });
  // Also remove standalone counter scripts
  c = c.replace(/<script>\s*\/\*\s*Animated counters[\s\S]*?<\/script>/g, '');
  c = c.replace(/<script>\s*\/\*\s*Reveal animations[\s\S]*?<\/script>/g, '');

  // Inject fixed scripts before </body>
  const fixedScripts = `
<script>
/* ── Reveal animations (fixed) ── */
(function(){
  var sels='.section,.feat-card,.dash-card,.tilt-card,.price-card,.faq-item,.copilot-section,.api-section,.comp-section,.process-section,.dash-section,.dash-stat,.cta-section';
  var els=document.querySelectorAll(sels);
  els.forEach(function(el,i){
    el.classList.add('reveal');
    if(i%4===1)el.classList.add('reveal-delay-1');
    if(i%4===2)el.classList.add('reveal-delay-2');
    if(i%4===3)el.classList.add('reveal-delay-3');
  });
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}
        });
      },{threshold:0.01,rootMargin:'50px 0px -20px 0px'});
      els.forEach(function(el){obs.observe(el)});
    });
  });
})();
</script>
<script>
/* ── Animated counters ── */
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target,text=el.textContent.trim(),m=text.match(/([\\d,.]+)(.*)/);
      if(m){
        var num=parseFloat(m[1].replace(/,/g,'')),suf=m[2];
        if(!isNaN(num)&&num>0){
          el.textContent='0'+suf;var dur=2200,t0=null;
          function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),ease=1-Math.pow(1-p,4),v=num*ease;
            el.textContent=(String(num).includes('.')?v.toFixed(1):Math.round(v))+(suf||'');
            if(p<1)requestAnimationFrame(step)}
          requestAnimationFrame(step)
        }
      }
      obs.unobserve(el);
    });
  },{threshold:0.5});
  document.querySelectorAll('.dash-stat .n').forEach(function(el){obs.observe(el)});
})();
</script>`;

  c = c.replace('</body>', fixedScripts + '\n</body>');
  fixes.push('reveals+counters replaced');

  // ── FIX 2: Lang toggle on DE page ──
  if (lang === 'de') {
    // Fix EN link that wrongly points to ?lang=de
    c = c.replace(
      /<div class="lang-toggle"><a href="\/api\/landing\?lang=de">EN<\/a>/,
      '<div class="lang-toggle"><a href="/api/landing">EN</a>'
    );
    // Also fix any other broken EN link pattern
    c = c.replace(
      /<div class="lang-toggle"><a href="\/api\/landing\?lang=de"([^>]*)>EN<\/a>/,
      '<div class="lang-toggle"><a href="/api/landing"$1>EN</a>'
    );
    fixes.push('lang toggle fixed');
  }

  // ── FIX 3: Any remaining mojibake ──
  let mojiFixes = 0;
  const remaining = (c.match(/\uFFFD/g) || []).length;
  if (remaining > 0) {
    c = c.replaceAll('\uFFFD', '—');
    mojiFixes = remaining;
    fixes.push(`${mojiFixes} mojibake fixed`);
  }

  // ═══════════════════════════════════════════════
  // PHASE 2: MICRO-INTERACTIONS
  // ═══════════════════════════════════════════════

  // Add micro-interaction CSS before </style>
  const microCSS = `
/* ── Micro-interactions ── */
/* Scroll progress bar */
.scroll-progress{position:fixed;top:0;left:0;height:2px;background:var(--grad);z-index:10000;width:0%;transition:none;pointer-events:none}

/* Card hover lift */
.feat-card,.dash-card,.tilt-card,.price-card{transition:transform .4s cubic-bezier(.19,1,.22,1),box-shadow .4s cubic-bezier(.4,0,.2,1),border-color .3s}
.feat-card:hover,.dash-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,0.15);border-color:rgba(142,197,224,0.15)}
.tilt-card:hover{transform:perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,0.15)}
.price-card:hover{transform:translateY(-8px);box-shadow:0 24px 64px rgba(0,0,0,0.18)}

/* Button ripple + hover glow */
.btn,.btn-demo,.btn-readiness{position:relative;overflow:hidden}
.btn::after,.btn-demo::after,.btn-readiness::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.15) 0%,transparent 60%);opacity:0;transition:opacity .3s}
.btn:hover::after,.btn-demo:hover::after,.btn-readiness:hover::after{opacity:1}

/* Link underline animation */
.nav-links a::after{transition:width .3s cubic-bezier(.19,1,.22,1),left 0s}

/* FAQ expand animation */
.faq-item{cursor:pointer;transition:background .3s}
.faq-item:hover{background:rgba(142,197,224,0.03)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.19,1,.22,1),padding .3s,opacity .3s;opacity:0;padding:0 20px}
.faq-item.open .faq-a{max-height:500px;opacity:1;padding:0 20px 16px}

/* Smooth image/icon transitions */
.feat-icon svg{transition:transform .3s cubic-bezier(.19,1,.22,1)}
.feat-card:hover .feat-icon svg{transform:scale(1.1)}

/* Page load fade */
body{animation:pageLoad .6s ease}
@keyframes pageLoad{from{opacity:0}to{opacity:1}}

/* Gradient text shimmer */
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
h1 .grad{background-size:200% auto;animation:shimmer 4s linear infinite}
`;

  c = c.replace('</style>', microCSS + '\n</style>');

  // Add scroll progress bar element + JS
  c = c.replace('<body>', '<body>\n<div class="scroll-progress" id="scrollProgress"></div>');
  
  const microJS = `
<script>
/* ── Scroll progress bar ── */
(function(){
  var bar=document.getElementById('scrollProgress');
  if(!bar)return;
  window.addEventListener('scroll',function(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
  },{passive:true});
})();
/* ── Button mouse-follow glow ── */
(function(){
  document.querySelectorAll('.btn,.btn-demo,.btn-readiness').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      btn.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      btn.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });
})();
</script>`;

  c = c.replace('</body>', microJS + '\n</body>');
  fixes.push('micro-interactions added');

  writeFileSync(f, c, 'utf8');
  console.log(`✅ ${lang.toUpperCase()}: ${fixes.join(' | ')}`);
}

// ═══════════════════════════════════════════════
// FIX: /blog and /static behind auth
// ═══════════════════════════════════════════════
const authLayout = `${base}/src/components/auth-layout.tsx`;
let al = readFileSync(authLayout, 'utf8');

// Add /blog and /static to isPublicPage
if (!al.includes('/blog') || !al.includes('/static')) {
  al = al.replace(
    /const isPublicPage = pathname === '\/'/,
    "const isPublicPage = pathname === '/'"
  );
  // Find the isPublicPage line and add blog + static
  al = al.replace(
    /pathname\.startsWith\('\/deadlines'\)/,
    "pathname.startsWith('/deadlines') || pathname.startsWith('/blog') || pathname.startsWith('/api/blog') || pathname.startsWith('/static')"
  );
  writeFileSync(authLayout, al, 'utf8');
  console.log('✅ auth-layout.tsx: /blog, /api/blog, /static added to public pages');
} else {
  console.log('ℹ️ auth-layout.tsx: already has /blog');
}

// ═══════════════════════════════════════════════
// FIX: /demo-dashboard → redirect to Calendly if backend unavailable
// Already handled by the existing error state — just needs backend running
// ═══════════════════════════════════════════════

console.log('\n🎯 All Phase 0-2 fixes applied.');
console.log('Next: restart dev server (npm run dev) and hard refresh both landing pages.');
console.log('Then: consolidate landing sections (manual review needed).');
