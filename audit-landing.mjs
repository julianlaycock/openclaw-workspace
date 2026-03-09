import https from 'https';

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

const base = 'https://www.caelith.tech';

// 1. Fetch landing page (EN)
const landing = await fetch(base + '/');
const html = landing.body;

console.log('=== LANDING PAGE AUDIT ===\n');

// Content checks
const checks = [
  ['Sign In link (/login)', html.includes('href="/login"')],
  ['Try Demo link', html.includes('/demo-dashboard')],
  ['Nav: Features', html.includes('href="#features"')],
  ['Nav: Platform', html.includes('href="#platform"')],
  ['Nav: API', html.includes('href="#developers"')],
  ['Nav: Pricing', html.includes('href="#pricing"')],
  ['Nav: FAQ', html.includes('href="#faq"')],
  ['DE language toggle', html.includes('?lang=de') || html.includes('/api/landing?lang=de')],
  ['No mojibake (Ã)', !html.includes('Ã')],
  ['No mojibake (â€)', !html.includes('â€')],
  ['Euro sign (€)', html.includes('€')],
  ['Arrow (→)', html.includes('→')],
  ['Checkmark (✓)', html.includes('✓')],
  ['Section: Features', html.includes('id="features"')],
  ['Section: Platform', html.includes('id="platform"')],
  ['Section: Developers', html.includes('id="developers"')],
  ['Section: Comparison', html.includes('id="comparison"')],
  ['Section: Pricing', html.includes('id="pricing"')],
  ['Section: FAQ', html.includes('id="faq"')],
  ['Calendly link', html.includes('calendly.com/julian-laycock-caelith')],
  ['Contact email', html.includes('julian.laycock@caelith.tech')],
  ['LinkedIn link', html.includes('linkedin.com/company/caelithtech')],
  ['GitHub link', html.includes('github.com/julianlaycock')],
  ['npm link', html.includes('npmjs.com/package/open-annex-iv')],
  ['Blog link', html.includes('/api/blog') || html.includes('/blog')],
  ['API Docs link', html.includes('/api/docs')],
  ['Privacy link', html.includes('/privacy')],
  ['Terms link', html.includes('/terms')],
  ['Impressum link', html.includes('/impressum')],
  ['Readiness Check CTA', html.includes('/readiness-check')],
  ['Countdown JS', html.includes('2026-04-16')],
  ['Cookie consent bar', html.includes('consentBar')],
  ['Scroll progress bar', html.includes('scrollProgress')],
  ['Terminal animation', html.includes('runTerminal')],
  ['FAQ accordion', html.includes('faq-item')],
  ['Mobile hamburger', html.includes('hamburger')],
  ['overflow-x:hidden on html', html.includes('html{scroll-behavior:smooth;overflow-x:hidden}')],
  ['API code overflow fix', html.includes('overflow-x:auto;white-space:pre')],
  ['comp-table min-width', html.includes('min-width:480px')],
  ['Sora font loaded', html.includes('Sora')],
  ['JetBrains Mono font loaded', html.includes('JetBrains+Mono')],
  ['Copyright 2026', html.includes('2026 Caelith')],
  ['Made in Berlin', html.includes('Berlin')],
];

let passed = 0, failed = 0;
checks.forEach(([label, result]) => {
  const icon = result ? '✅' : '❌';
  if (!result) failed++;
  else passed++;
  console.log(`${icon} ${label}`);
});

console.log(`\n${passed}/${checks.length} passed, ${failed} failed`);

// 2. DE landing
console.log('\n=== DE LANDING PAGE ===');
const deLanding = await fetch(base + '/api/landing?lang=de');
const deHtml = deLanding.body;
const deChecks = [
  ['DE: No mojibake', !deHtml.includes('Ã') && !deHtml.includes('â€')],
  ['DE: Umlauts (ü)', deHtml.includes('ü')],
  ['DE: Umlauts (ö)', deHtml.includes('ö')],
  ['DE: Sign In link', deHtml.includes('href="/login"')],
  ['DE: Try Demo', deHtml.includes('demo-dashboard')],
];
deChecks.forEach(([label, result]) => console.log(`${result ? '✅' : '❌'} ${label}`));

// 3. Readiness check
console.log('\n=== READINESS CHECK ===');
const rc = await fetch(base + '/api/readiness-check');
const rcHtml = rc.body;
const rcChecks = [
  ['RC: N/A button (not ansNa)', rcHtml.includes("'ansNa'") === false],
  ['RC: ansNa key fixed', !rcHtml.includes("ansNA: 'N/A'") && rcHtml.includes("ansNa: 'N/A'")],
  ['RC: New CTA present', rcHtml.includes('Recommended next steps ready')],
  ['RC: Book 15-Min Demo', rcHtml.includes('Book a 15-Min Demo')],
  ['RC: No broken font-family quotes', !rcHtml.includes("font-family:'Sora'")],
  ['RC: Nav overlap fix (padding)', rcHtml.includes('padding-top:80px') || rcHtml.includes('padding-top:72px')],
  ['RC: Calendly link', rcHtml.includes('calendly.com')],
  ['RC: No mojibake', !rcHtml.includes('Ã') && !rcHtml.includes('â€')],
];
rcChecks.forEach(([label, result]) => console.log(`${result ? '✅' : '❌'} ${label}`));

// 4. Quick API checks
console.log('\n=== API ENDPOINTS ===');
const apiChecks = [
  ['/api/health', 200],
  ['/api/copilot-demo', 200],
  ['/api/docs', 200],
  ['/readiness-check', 200],
  ['/demo-dashboard', 200],
  ['/login', 200],
  ['/blog', 200],
  ['/privacy', 200],
  ['/impressum', 200],
];
for (const [route, expectedStatus] of apiChecks) {
  const r = await fetch(base + route);
  const ok = r.status === expectedStatus;
  console.log(`${ok ? '✅' : '❌'} ${route} → ${r.status}`);
}
