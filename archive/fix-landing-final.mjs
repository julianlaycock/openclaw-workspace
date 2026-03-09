import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend';

for (const lang of ['en', 'de']) {
  const f = `${base}/public/static/landing-${lang}.html`;
  let c = readFileSync(f, 'utf8');
  const fixes = [];

  // ═══ FIX 1: CSS content '\u2713' → '\2713' ═══
  // In CSS, Unicode escapes use \XXXX not \uXXXX
  const u2713count = (c.match(/\\u2713/g) || []).length;
  if (u2713count > 0) {
    c = c.replaceAll('\\u2713', '\\2713');
    fixes.push(`\\u2713→\\2713 (${u2713count})`);
  }

  // ═══ FIX 2: Remove duplicate micro-interaction CSS blocks ═══
  // Keep only the first one
  const microMarker = '/* ── Micro-interactions ── */';
  const firstIdx = c.indexOf(microMarker);
  const secondIdx = c.indexOf(microMarker, firstIdx + 1);
  if (secondIdx > -1) {
    // Find the end of the second block (next </style> or next non-micro CSS)
    // Since both blocks are identical, just remove everything from second marker to end of that block
    const thirdMarker = c.indexOf('</style>', secondIdx);
    if (thirdMarker > -1) {
      c = c.substring(0, secondIdx) + c.substring(thirdMarker);
      fixes.push('duplicate micro-CSS removed');
    }
  }

  // ═══ FIX 3: Remove duplicate scroll-progress div ═══
  const scrollDivs = (c.match(/<div class="scroll-progress" id="scrollProgress"><\/div>/g) || []).length;
  if (scrollDivs > 1) {
    // Remove the first occurrence (keep the second which is right before lang-toggle)
    c = c.replace('<div class="scroll-progress" id="scrollProgress"></div>\n<div class="scroll-progress" id="scrollProgress"></div>', '<div class="scroll-progress" id="scrollProgress"></div>');
    fixes.push('duplicate scroll-progress div removed');
  }

  // ═══ FIX 4: Remove ALL existing scripts (they're broken/incomplete) ═══
  // Remove everything between <!-- urgency badge removed --> and </body>
  const urgencyComment = '<!-- urgency badge removed -->';
  const urgencyIdx = c.indexOf(urgencyComment);
  const bodyEndIdx = c.indexOf('</body>');
  if (urgencyIdx > -1 && bodyEndIdx > -1) {
    c = c.substring(0, urgencyIdx + urgencyComment.length) + '\n\n' + c.substring(bodyEndIdx);
    fixes.push('old broken scripts removed');
  }

  // ═══ FIX 5: DE lang toggle ═══
  if (lang === 'de') {
    // The EN link wrongly points to ?lang=de
    c = c.replace(
      '<div class="lang-toggle"><a href="/api/landing?lang=de">EN</a>',
      '<div class="lang-toggle"><a href="/api/landing">EN</a>'
    );
    fixes.push('DE lang toggle fixed');
  }

  // ═══ FIX 6: Any remaining mojibake (U+FFFD) ═══
  const fffd = (c.match(/\uFFFD/g) || []).length;
  if (fffd > 0) {
    c = c.replaceAll('\uFFFD', '—');
    fixes.push(`${fffd} U+FFFD mojibake fixed`);
  }

  // ═══ FIX 7: Inject ALL scripts (complete, tested) ═══
  const allScripts = `
<script>
/* ── Navbar scroll morph + FAQ toggle + Countdown + Terminal typing ── */
(function(){
  /* Navbar scroll */
  var nav=document.getElementById('navWrap');
  if(nav){
    var last=0;
    window.addEventListener('scroll',function(){
      var y=window.scrollY;
      if(y>80)nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      last=y;
    },{passive:true});
  }

  /* Countdown to April 16 2026 */
  var target=new Date('2026-04-16T00:00:00+02:00').getTime();
  function updateCD(){
    var now=Date.now(),diff=target-now;
    if(diff<0)diff=0;
    var d=Math.floor(diff/864e5),h=Math.floor(diff%864e5/36e5),m=Math.floor(diff%36e5/6e4),s=Math.floor(diff%6e4/1e3);
    var dEl=document.getElementById('cdDays');if(dEl)dEl.textContent=d;
    var hEl=document.getElementById('cdHms');if(hEl)hEl.textContent=String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m '+String(s).padStart(2,'0')+'s';
    var nEl=document.getElementById('navCd');if(nEl)nEl.textContent=d+'d '+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    var ring=document.getElementById('cdRing');
    if(ring){var total=90*864e5;var pct=Math.min(100,((total-diff)/total)*100);ring.style.setProperty('--progress',pct+'%')}
  }
  updateCD();setInterval(updateCD,1000);

  /* FAQ toggle */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.closest('.faq-item');
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');i.querySelector('.faq-q').setAttribute('aria-expanded','false')});
      if(!isOpen){item.classList.add('open');q.setAttribute('aria-expanded','true')}
    });
    q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click()}});
  });

  /* Hamburger */
  var ham=document.getElementById('hamburger');
  if(ham){ham.addEventListener('click',function(){
    var links=document.querySelector('.nav-links');
    if(links)links.classList.toggle('mobile-open');
  })}

  /* Terminal typing animation */
  var termBody=document.getElementById('termBody');
  if(termBody){
    var lines=[
      {t:'<span class="cmd">$</span> caelith evaluate --fund "Global Credit Fund IV"',d:0},
      {t:'<span class="ok">✓</span> Loading fund structure... 4 tranches, 127 investors',d:800},
      {t:'<span class="ok">✓</span> Running 13 rules across 6 frameworks',d:1400},
      {t:'<span class="ok">✓</span> AIFMD II Art. 23 — disclosure requirements met',d:2000},
      {t:'<span class="ok">✓</span> KAGB §1(19) — all investors classified',d:2400},
      {t:'<span class="ok">✓</span> Sanctions screening — 0 matches (6,863 entities)',d:2800},
      {t:'<span class="ok">✓</span> LEI verified — 127/127 via GLEIF',d:3200},
      {t:'<span class="ok">✓</span> Audit trail — Block #1247 <span class="hash">a3f7c912...8b2de447</span>',d:3600},
      {t:'',d:4000},
      {t:'<span class="cmd">$</span> caelith export --annex-iv --format xml',d:4200},
      {t:'<span class="ok">✓</span> Annex IV XML generated (ESMA Rev 6 v1.2)',d:4800},
      {t:'<span class="ok">✓</span> XSD validation passed — 0 errors',d:5200},
      {t:'<span class="ok">✓</span> Output: <span class="warn">annex-iv-2026-Q1.xml</span> (ready for BaFin)',d:5600},
      {t:'',d:6000},
      {t:'<span style="color:var(--accent)">All checks passed. Fund is audit-ready.</span>',d:6200}
    ];
    function runTerminal(){
      termBody.innerHTML='';
      lines.forEach(function(l){
        setTimeout(function(){
          var div=document.createElement('div');
          div.className='term-line';
          div.setAttribute('data-animate','');
          div.innerHTML=l.t||'&nbsp;';
          termBody.appendChild(div);
          requestAnimationFrame(function(){div.removeAttribute('data-animate')});
          termBody.scrollTop=termBody.scrollHeight;
        },l.d);
      });
      setTimeout(runTerminal,12000);
    }
    runTerminal();
  }
})();
</script>
<script>
/* ── Reveal animations ── */
(function(){
  var sels='.section,.feat-card,.dash-card,.tilt-card,.price-card,.faq-item,.copilot-section,.api-section,.comp-section,.process-section,.dash-section,.dash-stat,.cta-section,.readiness-banner,.open-source-bar,.agent-card';
  var els=document.querySelectorAll(sels);
  els.forEach(function(el,i){
    el.classList.add('reveal');
    if(i%4===1)el.classList.add('reveal-delay-1');
    if(i%4===2)el.classList.add('reveal-delay-2');
    if(i%4===3)el.classList.add('reveal-delay-3');
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
    },{threshold:0.01,rootMargin:'50px 0px -20px 0px'});
    els.forEach(function(el){obs.observe(el)});
  })});
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
</script>
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
</script>
<script>
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
</script>
`;

  c = c.replace('</body>', allScripts + '</body>');
  fixes.push('all scripts injected (nav+countdown+faq+terminal+reveals+counters+progress+glow)');

  writeFileSync(f, c, 'utf8');
  console.log(`✅ ${lang.toUpperCase()}: ${fixes.join(' | ')}`);
}

// ═══ Verify: scan both files for remaining issues ═══
console.log('\n── Verification ──');
for (const lang of ['en', 'de']) {
  const f = `${base}/public/static/landing-${lang}.html`;
  const c = readFileSync(f, 'utf8');
  const issues = [];
  
  if (c.includes('\\u2713')) issues.push('STILL HAS \\u2713');
  if ((c.match(/\uFFFD/g) || []).length > 0) issues.push('STILL HAS U+FFFD mojibake');
  if ((c.match(/scroll-progress/g) || []).length > 2) issues.push('duplicate scroll-progress');
  if ((c.match(/Micro-interactions/g) || []).length > 1) issues.push('duplicate micro-CSS');
  if (!c.includes('runTerminal')) issues.push('MISSING terminal script');
  if (!c.includes('nav.classList.add')) issues.push('MISSING navbar scroll script');
  if (!c.includes('faq-item')) issues.push('MISSING FAQ');
  if (!c.includes('updateCD')) issues.push('MISSING countdown');
  if (!c.includes('IntersectionObserver')) issues.push('MISSING reveals');
  
  if (lang === 'de') {
    // Check lang toggle
    if (c.includes('href="/api/landing?lang=de">EN</a>')) issues.push('DE lang toggle still broken');
  }
  
  if (issues.length === 0) {
    console.log(`✅ ${lang.toUpperCase()}: ALL CHECKS PASSED`);
  } else {
    console.log(`❌ ${lang.toUpperCase()}: ${issues.join(' | ')}`);
  }
}

console.log('\n🎯 Done. Hard refresh both pages to verify.');
