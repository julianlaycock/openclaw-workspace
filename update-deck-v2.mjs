import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/openclaw-workspace/pitch-deck/index-v3.html';
let html = readFileSync(p, 'utf8');

// ── 1. Tests: 131 → 231 ──
html = html.replace(
  '<div class="tc-num count-up" data-target="131">0</div><div class="tc-label">Tests passing<br>43 integration + 88 copilot</div>',
  '<div class="tc-num count-up" data-target="231">0</div><div class="tc-label">Tests passing<br>unit · integration · copilot</div>'
);

// ── 2. Grant pipeline: €85K → €110K (NGI €50K + Campus Founders €25K + Prototype fund pipeline) ──
html = html.replace(
  '<div class="tc-num" style="font-size:28px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">€85K</div><div class="tc-label">Grant pipeline<br>(2 NGI Zero apps)</div>',
  '<div class="tc-num" style="font-size:28px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">€110K+</div><div class="tc-label">Grant pipeline<br>NGI Zero · Campus Founders · EXIST</div>'
);

// ── 3. Add Sphinx validation to traction-bottom ──
html = html.replace(
  '<div class="tb-item"><strong>🟢 18 fund managers in active pipeline</strong>',
  '<div class="tb-item"><strong>🟢 Sphinx ($7.1M, Cherry Ventures + YC) validates thesis</strong>Browser-native compliance agents for US fintech raised $7.1M seed (Feb 2026). Caelith = same thesis, EU fund managers. Zero overlap, full validation. "Sphinx for EU fund compliance."</div>\n    <div class="tb-item"><strong>🟢 18 fund managers in active pipeline</strong>'
);

// ── 4. Fix notes count ──
html = html.replace(
  '131 tests, ESMA XSD-validated',
  '231 tests, ESMA XSD-validated'
);

// ── 5. Update endpoint count in notes if outdated ──
html = html.replace(/60\+ API endpoints/g, '72+ API endpoints');

// ── 6. Add email lead capture to open-core bullet ──
html = html.replace(
  '2 NGI Zero grants submitted. €85K pipeline.',
  'NGI Zero + Campus Founders submitted. €110K+ non-dilutive pipeline. Readiness check with email-gated lead capture live.'
);

writeFileSync(p, html, { encoding: 'utf8' });
console.log('Deck updated ✅');

// Verify
const v = readFileSync(p, 'utf8');
console.log('Tests 231:', v.includes('data-target="231"'));
console.log('€110K:', v.includes('€110K+'));
console.log('Sphinx:', v.includes('Sphinx'));
console.log('72+ endpoints:', v.includes('72+ API endpoints'));
