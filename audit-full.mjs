/**
 * Full landing page audit — desktop, mobile, tablet
 * Tests: functionality, SEO, performance, accessibility, UX, responsiveness
 */
import https from 'https';
import http from 'http';

async function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': opts.ua || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ...opts.headers },
      timeout: 12000
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data, url }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

const base = 'https://www.caelith.tech';
const issues = [];
const opts = [];
const ok = [];

function issue(cat, msg) { issues.push(`[${cat}] ${msg}`); }
function opt(cat, msg) { opts.push(`[${cat}] ${msg}`); }
function pass(msg) { ok.push(msg); }

// ─────────────────────────────────────────
// 1. FETCH PAGES
// ─────────────────────────────────────────
console.log('Fetching pages...');
const [en, de, mobileEn] = await Promise.all([
  fetch(`${base}/`),
  fetch(`${base}/api/landing?lang=de`),
  fetch(`${base}/`, { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15' }),
]);

const html = en.body;
const deHtml = de.body;

// ─────────────────────────────────────────
// 2. ALL LINKS — check every href in page
// ─────────────────────────────────────────
console.log('Checking links...');
const hrefs = [...html.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]).filter(h => !h.startsWith('mailto:') && !h.startsWith('http'));
const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(m => m[1]);
const internalLinks = hrefs.filter(h => !h.startsWith('#'));

// Check internal links
const linkResults = await Promise.allSettled(
  internalLinks.map(l => fetch(`${base}${l.startsWith('/') ? l : '/' + l}`))
);
internalLinks.forEach((l, i) => {
  const r = linkResults[i];
  if (r.status === 'rejected') issue('LINKS', `${l} → network error`);
  else if (r.value.status >= 400) issue('LINKS', `${l} → HTTP ${r.value.status}`);
  else pass(`Link ${l} → ${r.value.status}`);
});

// Check external links exist (just headers)
const extResults = await Promise.allSettled(
  externalLinks.slice(0, 10).map(l => fetch(l))
);
externalLinks.slice(0, 10).forEach((l, i) => {
  const r = extResults[i];
  if (r.status === 'rejected') opt('LINKS', `External link unreachable: ${l}`);
  else if (r.value.status >= 400) issue('LINKS', `External broken: ${l} → ${r.value.status}`);
  else pass(`External ${l.substring(0, 60)} → ${r.value.status}`);
});

// ─────────────────────────────────────────
// 3. SEO AUDIT
// ─────────────────────────────────────────
console.log('SEO checks...');
const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
const desc = html.match(/name="description" content="([^"]+)"/)?.[1] || '';
const og = {
  title: html.includes('og:title'),
  desc: html.includes('og:description'),
  image: html.includes('og:image'),
  url: html.includes('og:url'),
};
const canonical = html.includes('rel="canonical"');
const h1count = (html.match(/<h1[^>]*>/g) || []).length;
const h2count = (html.match(/<h2[^>]*>/g) || []).length;
const imgAlt = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]).filter(t => !t.includes('alt='));

if (!title) issue('SEO', 'Missing <title>');
else if (title.length < 30) opt('SEO', `Title too short (${title.length} chars): "${title}"`);
else if (title.length > 60) opt('SEO', `Title too long (${title.length} chars): "${title.substring(0,60)}..."`);
else pass(`Title OK (${title.length} chars)`);

if (!desc) issue('SEO', 'Missing meta description');
else if (desc.length < 120) opt('SEO', `Meta desc short (${desc.length}/120-160): "${desc.substring(0,80)}..."`);
else if (desc.length > 160) opt('SEO', `Meta desc long (${desc.length}/160 max)`);
else pass(`Meta desc OK (${desc.length} chars)`);

if (!og.title || !og.desc) issue('SEO', `Missing OG tags: title=${og.title} desc=${og.desc} image=${og.image}`);
else pass('OG tags present');
if (!og.image) opt('SEO', 'No og:image — add a 1200×630 social preview image for LinkedIn/Twitter shares');
if (!canonical) opt('SEO', 'No canonical URL tag — add <link rel="canonical"> to prevent duplicate content');
if (h1count === 0) issue('SEO', 'No H1 found');
else if (h1count > 1) opt('SEO', `Multiple H1 tags (${h1count}) — only one per page recommended`);
else pass(`H1 count: ${h1count}`);
if (imgAlt.length > 0) opt('ACCESSIBILITY', `${imgAlt.length} image(s) missing alt text`);
else pass('All images have alt text');

// ─────────────────────────────────────────
// 4. PERFORMANCE
// ─────────────────────────────────────────
console.log('Performance checks...');
const htmlSize = Buffer.byteLength(html, 'utf8');
const googleFonts = (html.match(/fonts\.googleapis\.com/g) || []).length;
const inlineStyles = (html.match(/style="/g) || []).length;
const externalScripts = (html.match(/<script src=/g) || []).length;
const externalCss = (html.match(/<link rel="stylesheet"/g) || []).length;
const hasLazyLoad = html.includes('loading="lazy"');
const hasPreconnect = html.includes('rel="preconnect"');
const hasFontDisplay = html.includes('display=swap');
const hasWebpImages = html.includes('.webp');

if (htmlSize > 100 * 1024) opt('PERF', `HTML is ${(htmlSize/1024).toFixed(1)}KB — large inline page, consider splitting or compressing`);
else pass(`HTML size: ${(htmlSize/1024).toFixed(1)}KB`);

if (!hasPreconnect) opt('PERF', 'Add <link rel="preconnect" href="https://fonts.gstatic.com"> for faster font load');
else pass('Preconnect tags present');
if (!hasFontDisplay) opt('PERF', 'Add &display=swap to Google Fonts URL to prevent invisible text during load');
else pass('font-display:swap configured');
if (externalScripts > 2) opt('PERF', `${externalScripts} external scripts — check for blocking renders`);
if (!hasWebpImages) opt('PERF', 'No WebP images detected — serve WebP for ~30% smaller images');
opt('PERF', `${inlineStyles} inline style attributes — consider moving repetitive patterns to classes`);

// Timing test
const t0 = Date.now();
await fetch(`${base}/`);
const ttfb = Date.now() - t0;
if (ttfb > 1500) issue('PERF', `Slow TTFB: ${ttfb}ms (target <800ms)`);
else if (ttfb > 800) opt('PERF', `TTFB: ${ttfb}ms — acceptable but above 800ms target`);
else pass(`TTFB: ${ttfb}ms`);

// ─────────────────────────────────────────
// 5. RESPONSIVENESS
// ─────────────────────────────────────────
console.log('Responsiveness checks...');
const hasViewportMeta = html.includes('name="viewport"');
const hasOverflowHidden = html.includes('overflow-x:hidden');
const hasMobileBreakpoint = html.includes('@media(max-width:768px)') || html.includes('@media (max-width: 768px)');
const hasTabletBreakpoint = html.includes('@media(max-width:1024px)') || html.includes('@media (max-width: 1024px)');
const hasMobileSmBreakpoint = html.includes('@media(max-width:480px)') || html.includes('@media (max-width: 480px)');
const hasHamburger = html.includes('hamburger');
const mobileNavExists = html.includes('mobile-nav') || html.includes('mobile-menu') || html.includes('mobileClose');
const hasTableOverflow = html.includes('overflow-x:auto');

if (!hasViewportMeta) issue('MOBILE', 'Missing viewport meta tag');
else pass('Viewport meta present');
if (!hasOverflowHidden) issue('MOBILE', 'No overflow-x:hidden on html — likely causes horizontal scroll on mobile');
else pass('overflow-x:hidden present');
if (!hasMobileBreakpoint) issue('MOBILE', 'No 768px breakpoint found');
else pass('768px breakpoint present');
if (!hasMobileSmBreakpoint) opt('MOBILE', 'No 480px breakpoint — small phones may have layout issues');
else pass('480px breakpoint present');
if (!hasTabletBreakpoint) opt('TABLET', 'No 1024px tablet breakpoint — intermediate layouts may be suboptimal');
if (!hasHamburger) issue('MOBILE', 'No hamburger menu — nav links hidden on mobile with no alternative');
else pass('Hamburger menu present');
if (!mobileNavExists) issue('MOBILE', 'Hamburger present but no mobile nav overlay found');
else pass('Mobile nav overlay present');
if (!hasTableOverflow) opt('MOBILE', 'Tables/wide elements may not scroll on mobile — add overflow-x:auto wrappers');

// ─────────────────────────────────────────
// 6. ACCESSIBILITY
// ─────────────────────────────────────────
console.log('Accessibility checks...');
const ariaLabels = (html.match(/aria-label=/g) || []).length;
const ariaLive = html.includes('aria-live');
const skipLink = html.includes('skip') && html.includes('main');
const focusStyles = html.includes(':focus') || html.includes('focus-visible');
const contrastBg = html.includes('var(--bg)');
const btnWithoutType = (html.match(/<button(?![^>]*type=)[^>]*>/g) || []).length;
const inputLabels = (html.match(/<input/g) || []).length;
const labelCount = (html.match(/<label/g) || []).length;
const hasLang = html.includes('<html lang=');

if (!hasLang) issue('A11Y', 'Missing lang attribute on <html>');
else pass('lang attribute present');
if (!skipLink) opt('A11Y', 'No skip-to-content link — add for keyboard/screen reader users');
if (ariaLabels < 3) opt('A11Y', `Only ${ariaLabels} aria-label attributes — interactive elements (buttons, icons) should have labels`);
else pass(`aria-labels: ${ariaLabels}`);
if (!focusStyles) opt('A11Y', 'No visible focus styles detected — keyboard navigation will be invisible');
else pass('Focus styles present');
if (btnWithoutType > 0) opt('A11Y', `${btnWithoutType} <button> elements without type="button" — may accidentally submit forms`);
if (inputLabels > 0 && labelCount === 0) opt('A11Y', 'Input fields present without <label> elements — use aria-label or <label>');

// ─────────────────────────────────────────
// 7. FUNCTIONAL CHECKS
// ─────────────────────────────────────────
console.log('Functional checks...');
const hasCountdown = html.includes('2026-04-16') || html.includes('countdown');
const hasTerminal = html.includes('runTerminal') || html.includes('term-line');
const hasScrollProgress = html.includes('scrollProgress') || html.includes('scroll-progress');
const hasCookieConsent = html.includes('consentBar') || html.includes('cookie-consent');
const hasFaqAccordion = html.includes('faq-item') || html.includes('faq-toggle');
const hasPlausible = html.includes('plausible') || html.includes('analytics');
const hasSmoothScroll = html.includes('scroll-behavior:smooth');
const hasLangSwitch = html.includes('/api/landing?lang=de') || html.includes('switchLang');
const calendlyLink = html.match(/calendly\.com\/[^"]+/)?.[0];
const loginLink = html.includes('href="/login"');
const demoLink = html.includes('/demo-dashboard');
const readinessLink = html.includes('/readiness-check');
const blogLink = html.includes('/blog') || html.includes('/api/blog');
const apiDocsLink = html.includes('/api/docs');
const hasSignInLink = html.includes('Sign In') || html.includes('sign-in');

if (!hasCountdown) opt('FUNC', 'No countdown to April 16 deadline visible');
else pass('Countdown timer present');
if (!hasTerminal) opt('FUNC', 'Terminal animation not detected');
else pass('Terminal animation present');
if (!hasScrollProgress) opt('FUNC', 'No scroll progress bar');
else pass('Scroll progress bar present');
if (!hasCookieConsent) issue('LEGAL', 'No cookie consent banner — required for GDPR (especially given analytics)');
else pass('Cookie consent present');
if (!hasFaqAccordion) opt('FUNC', 'No FAQ accordion detected');
else pass('FAQ accordion present');
if (!hasPlausible) opt('ANALYTICS', 'No analytics detected — consider adding Plausible or similar privacy-first analytics');
else pass('Analytics present');
if (!hasSmoothScroll) opt('UX', 'No smooth scroll — nav anchor links will jump abruptly');
else pass('Smooth scroll configured');
if (!hasLangSwitch) issue('FUNC', 'No EN/DE language switcher found');
else pass('Language switcher present');
if (!calendlyLink) issue('FUNC', 'No Calendly link found — primary CTA broken');
else pass(`Calendly link: ${calendlyLink}`);
if (!loginLink) opt('UX', 'No Sign In link in nav');
else pass('Sign In link present');
if (!demoLink) issue('FUNC', 'No demo dashboard link');
else pass('Demo link present');
if (!readinessLink) opt('UX', 'No readiness check CTA');
else pass('Readiness check CTA present');
if (!blogLink) opt('UX', 'No blog link in page');
else pass('Blog link present');
if (!apiDocsLink) opt('UX', 'No API docs link');
else pass('API docs link present');

// ─────────────────────────────────────────
// 8. CONTENT QUALITY
// ─────────────────────────────────────────
console.log('Content checks...');
const hasPrice = html.includes('990') || html.includes('1,990');
const hasTestimonials = html.includes('testimonial') || html.includes('quote') || html.includes('"');
const hasSocialProof = html.includes('KVG') || html.includes('fund') || html.includes('manager');
const hasBafin = html.includes('BaFin');
const hasAIFMD = html.includes('AIFMD');
const hasTrustBadge = html.includes('GDPR') || html.includes('ISO') || html.includes('SOC');
const hasDeadline = html.includes('April 16') || html.includes('16. April');
const hasContactEmail = html.includes('@caelith.tech');

if (!hasPrice) opt('CONTENT', 'No pricing numbers visible — price transparency builds trust');
else pass('Pricing visible');
if (!hasTestimonials) opt('CONTENT', 'No testimonials/social proof quotes — strongest B2B trust signal missing');
if (!hasBafin) opt('CONTENT', 'BaFin not mentioned — should be prominent for German market');
else pass('BaFin mentioned');
if (!hasDeadline) opt('CONTENT', 'April 16 deadline not prominent enough');
else pass('April 16 deadline present');
if (!hasContactEmail) opt('CONTENT', 'No contact email visible on page — reduces trust');
else pass('Contact email present');
if (!hasTrustBadge) opt('TRUST', 'No GDPR/security badges — add "GDPR compliant", "EU-hosted", "SOC 2 ready" badges near CTAs');

// ─────────────────────────────────────────
// 9. DE VERSION PARITY
// ─────────────────────────────────────────
console.log('DE parity checks...');
const deMojibake = deHtml.includes('\u00c3') || deHtml.includes('\u00e2\u20ac');
const deHasCalendly = deHtml.includes('calendly.com');
const deHasUmlauts = deHtml.includes('\u00fc') && deHtml.includes('\u00e4') && deHtml.includes('\u00f6');
const deHasPricing = deHtml.includes('990');
const deHasDemo = deHtml.includes('demo-dashboard');
const deHasSwitchToEn = deHtml.includes('?lang=en') || deHtml.includes('/api/landing?lang=en');
const deHasBafin = deHtml.includes('BaFin');
const deHasSignIn = deHtml.includes('Anmelden') || deHtml.includes('Sign In');
const deCookieConsent = deHtml.includes('consentBar') || deHtml.includes('cookie');

if (deMojibake) issue('DE', 'Mojibake in DE page — encoding issue');
else pass('DE: no mojibake');
if (!deHasUmlauts) issue('DE', 'German umlauts missing (ü/ä/ö) — encoding broken');
else pass('DE: umlauts present');
if (!deHasCalendly) issue('DE', 'No Calendly link in DE version');
else pass('DE: Calendly link present');
if (!deHasSwitchToEn) opt('DE', 'No EN switcher in DE page — users can\'t switch back to English');
else pass('DE: EN switcher present');
if (!deHasBafin) opt('DE', 'BaFin not mentioned in DE version');
else pass('DE: BaFin present');
if (!deCookieConsent) opt('DE', 'Cookie consent may be missing in DE version');
else pass('DE: cookie consent present');

// ─────────────────────────────────────────
// 10. SECURITY HEADERS
// ─────────────────────────────────────────
console.log('Security checks...');
const headers = en.headers;
if (!headers['x-frame-options']) opt('SECURITY', 'No X-Frame-Options header — clickjacking risk');
else pass('X-Frame-Options set');
if (!headers['x-content-type-options']) opt('SECURITY', 'No X-Content-Type-Options header');
else pass('X-Content-Type-Options set');
if (!headers['strict-transport-security']) opt('SECURITY', 'No HSTS header');
else pass('HSTS set');
if (!headers['content-security-policy']) opt('SECURITY', 'No Content-Security-Policy header');
else pass('CSP set');

// ─────────────────────────────────────────
// 11. MOBILE-SPECIFIC CHECKS (content audit)
// ─────────────────────────────────────────
console.log('Mobile-specific checks...');
const hasMinHeight44 = html.includes('min-height:44px') || html.includes('min-height: 44px');
const hasTouchTargets = html.includes('min-width:44px');
const mobileNavCss = html.includes('.nav-links{display:none') || html.includes('hamburger{display:');
const hasMediaQueryMobile = html.match(/@media\(max-width:\d+px\)/g) || [];
const mobileBreakpoints = [...new Set(hasMediaQueryMobile)];
const hasFlexWrap = html.includes('flex-wrap:wrap');
const hasTableMobile = html.includes('@media') && html.includes('table');

if (!hasMinHeight44 && !hasTouchTargets) opt('MOBILE', 'Touch targets may be too small — Apple HIG recommends 44×44px minimum');
else pass('Touch targets sized');
if (mobileBreakpoints.length < 2) opt('MOBILE', `Only ${mobileBreakpoints.length} responsive breakpoints — consider tablet (1024px), mobile (768px), small (480px)`);
else pass(`Responsive breakpoints: ${mobileBreakpoints.join(', ')}`);
if (!hasFlexWrap) opt('MOBILE', 'Some flex rows may not wrap on small screens — add flex-wrap:wrap to key containers');
else pass('flex-wrap:wrap present');

// ─────────────────────────────────────────
// 12. UX BEST PRACTICES
// ─────────────────────────────────────────
console.log('UX checks...');
const primaryCtaCount = (html.match(/btn-primary|btn-demo|btn-cta/g) || []).length;
const hasBackToTop = html.includes('back-to-top') || html.includes('scrollTop');
const hasStickyCtaMobile = html.includes('sticky-cta') || html.includes('bottom-cta');
const faqCount = (html.match(/faq-item|<dt|question/g) || []).length;
const hasVideo = html.includes('<video') || html.includes('youtube') || html.includes('loom');
const ctaAboveFold = html.indexOf('btn-demo') < html.indexOf('<section');
const hasLoadingStates = html.includes('skeleton') || html.includes('loading');

if (primaryCtaCount === 0) issue('UX', 'No primary CTA button detected');
else pass(`Primary CTA buttons: ${primaryCtaCount}`);
if (!hasBackToTop) opt('UX', 'No back-to-top button — long page, users should have easy way back');
if (!hasStickyCtaMobile) opt('UX', 'No sticky CTA bar on mobile — high-converting pages show CTA when scrolling');
if (faqCount < 4) opt('UX', `Only ${faqCount} FAQ items detected — expand to 6-8 for better SEO and objection handling`);
else pass(`FAQ items: ${faqCount}`);
if (!hasVideo) opt('UX', 'No product video/demo — video demos typically 3-5× higher conversion than static screenshots');
if (!ctaAboveFold) opt('UX', 'Primary CTA may not be above the fold — hero CTA should be visible without scrolling');
else pass('CTA visible above fold');

// ─────────────────────────────────────────
// OUTPUT
// ─────────────────────────────────────────
const critical = issues.filter(i => i.match(/LINKS|FUNC|MOBILE|LEGAL|DE/));
const perf = opts.filter(i => i.includes('PERF'));
const seo = opts.filter(i => i.includes('SEO') || i.includes('CONTENT'));
const ux = opts.filter(i => i.includes('UX') || i.includes('MOBILE') || i.includes('TABLET') || i.includes('FUNC'));
const a11y = opts.filter(i => i.includes('A11Y') || i.includes('ACCESSIBILITY'));
const trust = opts.filter(i => i.includes('TRUST') || i.includes('SECURITY'));

console.log('\n\n════════════════════════════════════════════════════════════');
console.log('CAELITH LANDING PAGE FULL AUDIT REPORT');
console.log('════════════════════════════════════════════════════════════');
console.log(`✅ PASSING: ${ok.length} checks`);
console.log(`❌ CRITICAL ISSUES: ${issues.length}`);
console.log(`⚠️  OPTIMISATIONS: ${opts.length}`);

if (issues.length > 0) {
  console.log('\n── CRITICAL ISSUES (fix these first) ──');
  issues.forEach(i => console.log('  ❌', i));
}

console.log('\n── PERF OPTIMISATIONS ──');
perf.forEach(i => console.log('  ⚡', i));

console.log('\n── SEO / CONTENT ──');
seo.forEach(i => console.log('  🔍', i));

console.log('\n── UX / MOBILE / TABLET ──');
ux.forEach(i => console.log('  📱', i));

console.log('\n── ACCESSIBILITY ──');
a11y.forEach(i => console.log('  ♿', i));

console.log('\n── TRUST / SECURITY ──');
trust.forEach(i => console.log('  🔒', i));

const remaining = opts.filter(i => !perf.includes(i) && !seo.includes(i) && !ux.includes(i) && !a11y.includes(i) && !trust.includes(i));
if (remaining.length > 0) {
  console.log('\n── OTHER ──');
  remaining.forEach(i => console.log('  ⚪', i));
}

console.log('\n════════════════════════════════════════════════════════════');
