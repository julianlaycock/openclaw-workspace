import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static';

for (const lang of ['en', 'de']) {
  const f = `${base}/landing-${lang}.html`;
  let c = readFileSync(f, 'utf8');
  const log = [];

  // ═══ FIX 1: Mojibake — replace all U+FFFD with correct chars ═══
  const mojibakeMap = [
    ['compliance \uFFFD automated', 'compliance — automated'],
    ['confirm \uFFFD handled', 'confirm — handled'],
    ['always-on.\uFFFD', 'always-on.'],
    ['Demn\uFFFDchst', 'Demnächst'],
    ['Compliance \uFFFD automatisiert', 'Compliance — automatisiert'],
    ['\uFFFDbermitteln', 'übermitteln'],
    ['Best\uFFFDtigung', 'Bestätigung'],
    ['\uFFFD vollst\uFFFDndig', ' — vollständig'],
    ['\uFFFDber das', 'über das'],
    ['Pr\uFFFDfungen', 'Prüfungen'],
    ['Gespr\uFFFDch', 'Gespräch'],
    ['AGENTS \uFFFD', 'AGENTS —'],
    ['AGENTEN \uFFFD', 'AGENTEN —'],
  ];
  let mojiFixes = 0;
  for (const [bad, good] of mojibakeMap) {
    while (c.includes(bad)) { c = c.replace(bad, good); mojiFixes++; }
  }
  // Catch any remaining
  const remaining = (c.match(/\uFFFD/g) || []).length;
  if (remaining > 0) {
    c = c.replaceAll('\uFFFD', '—');
    mojiFixes += remaining;
  }
  if (mojiFixes) log.push(`${mojiFixes} mojibake chars fixed`);

  // ═══ FIX 2: Feature card numbering — make sequential 01-09 ═══
  // The hero-feat cards have numbers like 01, 04, 03, 02... fix to 01-09 sequential
  let featIdx = 0;
  c = c.replace(/<div class="feat-num">(\d{2})<\/div>/g, () => {
    featIdx++;
    return `<div class="feat-num">${String(featIdx).padStart(2, '0')}</div>`;
  });
  if (featIdx > 0) log.push(`${featIdx} feature cards renumbered 01-${String(featIdx).padStart(2, '0')}`);

  // ═══ FIX 3: Duplicate "Made in Berlin" — remove from footer body, keep in footer-bottom ═══
  const berlinBadgeCount = (c.match(/class="berlin-badge"/g) || []).length;
  if (berlinBadgeCount > 0) {
    c = c.replace(/<div class="berlin-badge">.*?<\/div>\s*/g, '');
    log.push('removed duplicate "Made in Berlin" badge');
  }

  // ═══ FIX 4: GitHub link → specific repo ═══
  c = c.replace(
    /href="https:\/\/github\.com\/julianlaycock"([^>]*>)\s*(View on GitHub|Auf GitHub ansehen)/g,
    'href="https://github.com/julianlaycock/open-annex-iv"$1$2'
  );
  log.push('GitHub link → specific repo');

  // ═══ FIX 5: Fix reveal animations — replace broken observer with working one ═══
  // Remove ALL old reveal/counter/lenis scripts
  c = c.replace(/<script>\s*\(function\(\)\{\s*var els=document\.querySelectorAll\('\.section[\s\S]*?<\/script>/g, '');
  c = c.replace(/<script>\s*\(function\(\)\{\s*function animateCount[\s\S]*?<\/script>/g, '');

  // Inject fixed scripts before </body>
  const fixedScripts = `
<script>
/* Reveal animations — fixed IntersectionObserver */
(function(){
  var sels='.section,.feat-card,.dash-card,.tilt-card,.price-card,.faq-item,.copilot-section,.api-section,.comp-section,.process-section,.dash-section,.dash-stat,.cta-section';
  var els=document.querySelectorAll(sels);
  els.forEach(function(el,i){
    el.classList.add('reveal');
    var d=i%4;
    if(d===1)el.classList.add('reveal-delay-1');
    if(d===2)el.classList.add('reveal-delay-2');
    if(d===3)el.classList.add('reveal-delay-3');
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
/* Animated counters */
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target;
      var text=el.textContent.trim();
      var m=text.match(/([\\d,.]+)(.*)/);
      if(m){
        var num=parseFloat(m[1].replace(/,/g,''));
        var suffix=m[2];
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
    });
  },{threshold:0.5});
  document.querySelectorAll('.dash-stat .n').forEach(function(el){obs.observe(el)});
})();
</script>`;

  c = c.replace('</body>', fixedScripts + '\n</body>');
  log.push('reveal animations + counters replaced with fixed versions');

  writeFileSync(f, c, 'utf8');
  console.log(`✅ ${lang.toUpperCase()}: ${log.join(' | ')}`);
}

console.log('\nAll fixes applied. Hard refresh both pages (Ctrl+Shift+R).');
