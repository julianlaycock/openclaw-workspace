/**
 * UX improvement patches for landing-en.html and landing-de.html
 * Implements: sticky mobile CTA, tablet breakpoint, touch targets,
 * skip-to-content, trust badges near hero CTAs
 */
import { readFileSync, writeFileSync } from 'fs';

const files = {
  en: 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html',
  de: 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-de.html',
};

const copy = {
  en: {
    skipLink: 'Skip to content',
    stickyBook: 'Book Demo',
    stickyCheck: 'Readiness Check',
    trustLine: 'GDPR compliant &nbsp;·&nbsp; EU-hosted &nbsp;·&nbsp; No lock-in',
  },
  de: {
    skipLink: 'Zum Inhalt springen',
    stickyBook: 'Demo buchen',
    stickyCheck: 'Readiness-Check',
    trustLine: 'DSGVO-konform &nbsp;·&nbsp; EU-gehostet &nbsp;·&nbsp; Kein Lock-in',
  },
};

// ── CSS patches ──────────────────────────────────────────────────────────────
const newCss = `
/* ── Skip to content ── */
.skip-link{position:absolute;top:-40px;left:16px;background:var(--accent);color:#1a1f1f;padding:8px 16px;border-radius:0 0 8px 8px;font-weight:600;font-size:13px;text-decoration:none;z-index:9999;transition:top .2s}
.skip-link:focus{top:0}

/* ── Tablet breakpoint (769px–1024px) ── */
@media(max-width:1024px) and (min-width:769px){
  nav{padding:14px clamp(32px,4vw,56px)}
  .hero{padding:clamp(90px,11vh,130px) clamp(32px,5vw,80px) clamp(36px,5vh,72px)}
  .hero-grid{grid-template-columns:1fr 1fr;gap:32px}
  h1{font-size:clamp(32px,4.5vw,52px)!important}
  section{padding:clamp(64px,8vw,96px) clamp(32px,5vw,80px)}
  .section-inner{max-width:100%}
  .features-grid{grid-template-columns:repeat(2,1fr)!important}
  .pricing-grid{gap:16px}
  .comparison-grid,.compare-grid{overflow-x:auto}
}

/* ── Mobile touch targets ── */
@media(max-width:768px){
  .nav-links a{min-height:44px;display:flex;align-items:center}
  .btn,.btn-demo,.btn-md,.btn-lg{min-height:44px;display:inline-flex;align-items:center;justify-content:center}
  .faq-question,.faq-header{min-height:48px;display:flex;align-items:center}
  .hamburger{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
}

/* ── Sticky mobile CTA bar ── */
.sticky-cta-bar{
  display:none;
  position:fixed;bottom:0;left:0;right:0;z-index:999;
  background:rgba(18,22,22,0.97);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-top:1px solid rgba(142,197,224,0.15);
  padding:12px 20px;
  transform:translateY(100%);
  transition:transform .35s cubic-bezier(.19,1,.22,1);
}
.sticky-cta-bar.visible{transform:translateY(0)}
.sticky-cta-bar-inner{display:flex;gap:10px;align-items:center;max-width:500px;margin:0 auto}
.sticky-cta-book{flex:1;padding:11px 16px;border-radius:10px;background:linear-gradient(135deg,var(--accent),var(--warm));color:#fff;font-family:'Sora',sans-serif;font-weight:700;font-size:13px;text-align:center;text-decoration:none;border:none;cursor:pointer;min-height:44px;display:flex;align-items:center;justify-content:center}
.sticky-cta-check{flex:1;padding:11px 16px;border-radius:10px;border:1px solid rgba(142,197,224,0.3);color:var(--accent);font-family:'Sora',sans-serif;font-weight:600;font-size:13px;text-align:center;text-decoration:none;min-height:44px;display:flex;align-items:center;justify-content:center}
@media(max-width:768px){
  .sticky-cta-bar{display:block}
}
@media(min-width:769px){
  .sticky-cta-bar{display:none!important}
}

/* ── Trust line ── */
.trust-line{font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.04em;margin-top:14px;font-family:'JetBrains Mono',monospace}`;

// ── JS for sticky CTA bar ─────────────────────────────────────────────────────
const stickyJs = `
// Sticky mobile CTA bar — show after hero, hide near footer
(function() {
  var bar = document.getElementById('stickyCta');
  if (!bar) return;
  var hero = document.getElementById('heroSection');
  var footer = document.querySelector('footer');
  function onScroll() {
    if (!hero) return;
    var heroBottom = hero.getBoundingClientRect().bottom;
    var footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
    var nearFooter = footerTop < window.innerHeight + 80;
    if (heroBottom < 0 && !nearFooter) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, {passive: true});
})();`;

for (const [lang, p] of Object.entries(files)) {
  let c = readFileSync(p, 'utf8');

  if (c.includes('\u00e2\u20ac') || c.includes('\u00c3\u00bc')) {
    console.log(`${lang.toUpperCase()}: ❌ MOJIBAKE ABORT`); continue;
  }

  const t = copy[lang];
  let changes = [];

  // ── 1. Skip-to-content link — inject after <body> ──
  if (!c.includes('skip-link')) {
    c = c.replace('<nav>', `<a class="skip-link" href="#main-content">${t.skipLink}</a>\n<nav>`);
    // Add id to main content anchor
    c = c.replace('<!-- ═══ 1. HERO ═══ -->', '<!-- ═══ 1. HERO ═══ -->\n<span id="main-content"></span>');
    changes.push('skip-to-content link');
  }

  // ── 2. Inject CSS before </style> ──
  if (!c.includes('sticky-cta-bar')) {
    const styleClose = c.lastIndexOf('</style>');
    c = c.substring(0, styleClose) + newCss + '\n' + c.substring(styleClose);
    changes.push('CSS: tablet breakpoint, touch targets, sticky CTA bar, trust line, skip link');
  }

  // ── 3. Trust line — add after the hero CTA buttons ──
  // Find the hero-ctas div closing tag and add trust line after it
  if (!c.includes('trust-line')) {
    // Insert after the hero CTAs block
    const heroCtas = '</div>\n      <div class="hero-label">';
    // More robust: find hero-ctas closing and insert after
    const heroCatasEnd = c.indexOf('</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>');
    // Try simpler approach: find the hero trust section
    const trustInsert = 'class="hero-ctas">';
    const heroCatasIdx = c.indexOf(trustInsert);
    if (heroCatasIdx > -1) {
      // Find the closing </div> of hero-ctas
      let depth = 1;
      let pos = heroCatasIdx + trustInsert.length;
      while (pos < c.length && depth > 0) {
        if (c.substring(pos, pos+4) === '<div') depth++;
        if (c.substring(pos, pos+6) === '</div>') { depth--; if (depth === 0) break; }
        pos++;
      }
      if (depth === 0) {
        const insertAt = pos + 6;
        c = c.substring(0, insertAt) + `\n      <p class="trust-line">${t.trustLine}</p>` + c.substring(insertAt);
        changes.push('trust line under hero CTAs');
      }
    }
  }

  // ── 4. Sticky CTA bar HTML — inject before </body> ──
  if (!c.includes('stickyCta')) {
    const bodyClose = c.lastIndexOf('</body>');
    const stickyHtml = `
<!-- Sticky mobile CTA bar -->
<div class="sticky-cta-bar" id="stickyCta" aria-label="Quick actions">
  <div class="sticky-cta-bar-inner">
    <a href="https://calendly.com/julian-laycock-caelith/30min" target="_blank" rel="noopener" class="sticky-cta-book">${t.stickyBook}</a>
    <a href="/readiness-check" class="sticky-cta-check">${t.stickyCheck}</a>
  </div>
</div>`;
    c = c.substring(0, bodyClose) + stickyHtml + '\n' + c.substring(bodyClose);
    changes.push('sticky mobile CTA bar HTML');
  }

  // ── 5. Inject sticky JS before </body> ──
  if (!c.includes('stickyCta') === false && !c.includes('onScroll')) {
    const bodyClose = c.lastIndexOf('</body>');
    c = c.substring(0, bodyClose) + `<script>${stickyJs}</script>\n` + c.substring(bodyClose);
    changes.push('sticky CTA JS');
  } else if (!c.includes('onScroll')) {
    const bodyClose = c.lastIndexOf('</body>');
    c = c.substring(0, bodyClose) + `<script>${stickyJs}</script>\n` + c.substring(bodyClose);
    changes.push('sticky CTA JS');
  }

  writeFileSync(p, c, { encoding: 'utf8' });
  console.log(`${lang.toUpperCase()}: ✅ ${changes.join(' | ')}`);
}

// Verify both files
console.log('\n=== VERIFICATION ===');
for (const [lang, p] of Object.entries(files)) {
  const v = readFileSync(p, 'utf8');
  console.log(`\n${lang.toUpperCase()}:`);
  console.log('  skip-link:', v.includes('skip-link') ? '✅' : '❌');
  console.log('  tablet breakpoint 1024px:', v.includes('max-width:1024px') ? '✅' : '❌');
  console.log('  touch targets:', v.includes('min-height:44px') ? '✅' : '❌');
  console.log('  sticky CTA bar:', v.includes('stickyCta') ? '✅' : '❌');
  console.log('  trust line:', v.includes('trust-line') ? '✅' : '❌');
  console.log('  mojibake:', v.includes('\u00e2\u20ac') ? '❌ CORRUPT' : '✅ clean');
}
