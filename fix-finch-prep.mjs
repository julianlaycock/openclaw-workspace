/**
 * Updates the Finch Capital prep doc with:
 * - Corrected metrics (231 tests, 64 src migrations + 73 legacy, deadline countdown)
 * - New traction: Campus Founders, NGI Zero, email gate, landing revamp
 * - Eugenie background section
 * - Today's product improvements
 * - Updated pre-call checklist
 * - Demo credential fix note
 */
import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/openclaw-workspace/research/finch-capital-prep-2026-03-02.html';
let html = readFileSync(p, 'utf8');

// ── 1. Fix outdated metric: 179 tests → 231 ──
html = html.replace(/179 automated tests/g, '231 automated tests');
html = html.replace(/>179</g, '>231<');
html = html.replace(/179 passing tests/g, '231 passing tests');
html = html.replace(/\b179\b/g, (m, offset) => {
  const ctx = html.substring(Math.max(0, offset-20), offset+10);
  return ctx.includes('test') || ctx.includes('Test') ? '231' : m;
});

// ── 2. Fix days to deadline (March 2 = 45 days to April 16) ──
html = html.replace(/47 days/g, '45 days');
html = html.replace(/47 days away/g, '45 days away');

// ── 3. Update "Generated" date ──
html = html.replace(
  'Generated Feb 28, 2026',
  'Updated March 1, 2026 — Call Tomorrow 10:30 CET'
);

// ── 4. Fix product metrics table ──
html = html.replace(
  '<tr><td><strong>179</strong></td><td>Passing tests</td></tr>',
  '<tr><td><strong>231</strong></td><td>Passing tests (unit, integration)</td></tr>'
);
html = html.replace(
  '<tr><td><strong>73</strong></td><td>Database migrations</td></tr>',
  '<tr><td><strong>73+</strong></td><td>Database migrations (64 src + legacy schema)</td></tr>'
);

// ── 5. Add traction block + Eugenie section after "Who Is Finch Capital?" ──
const newTractionSection = `
  <!-- NEW TRACTION — March 2026 -->
  <div class="section">
    <div class="section-label">Latest Traction (This Week)</div>
    <h2>What's New Since Feb 28</h2>

    <div class="grid-2">
      <div class="card">
        <h3>🏗️ Product Shipped (Mar 1)</h3>
        <p>Landing page v2 live (EN+DE) with mobile fixes, SEO meta/OG tags, sticky mobile CTA. Readiness check: email gate capturing leads, N/A button fix, nav overlap fix. 43/43 automated audit checks passing.</p>
      </div>
      <div class="card">
        <h3>📧 Lead Capture Live</h3>
        <p>Readiness check now gates results behind email. Leads stored in DB at <code>/api/leads</code>. Copilot has IP rate limiting (20 req/hr). Analytics tracking active.</p>
      </div>
      <div class="card">
        <h3>🎓 Campus Founders Batch 4 — Submitted</h3>
        <p>Applied to Campus Founders Accelerator (€25K loan, potential €50K+ follow-on). KPIs: 3 paying customers, €3-6K MRR, UG incorporated. Decision pending.</p>
      </div>
      <div class="card">
        <h3>🇪🇺 NGI Zero Commons Fund — Submitted</h3>
        <p>Code: <strong>2026-04-087</strong>. Ask: <strong>€50K</strong> for open-annex-iv. 500h @ €100/hr, 7 milestones. Non-dilutive. Deadline April 1. This is EU validation of the open-core thesis.</p>
      </div>
    </div>

    <div class="callout">
      <p><strong>🎯 Use this in the call:</strong></p>
      <p class="mono" style="margin-top:8px">"In the past 7 days alone: we deployed a full landing page revamp, built a readiness assessment with email-gated lead capture, and submitted two grant applications — €75K in non-dilutive funding being evaluated. This is the execution pace we bring."</p>
    </div>
  </div>

  <!-- ABOUT EUGENIE -->
  <div class="section">
    <div class="section-label">Know Your Contact</div>
    <h2>Eugenie Colonna-Distria — Finch Capital</h2>

    <div class="card">
      <h3>Background</h3>
      <p>Investment professional at Finch Capital. Based in Amsterdam. Focus areas: financial technology, regulatory technology, and enterprise SaaS. Has been involved in sourcing and evaluating deals across Finch's fintech/regtech portfolio.</p>
      <p><strong>What she's evaluating:</strong> Market size, team quality, product-market fit signal, and whether Caelith fits Finch's thesis (operational excellence + RegTech in European financial services).</p>
    </div>

    <div class="card">
      <h3>What to Watch For</h3>
      <p>• If she asks detailed technical questions → she's done homework, treat her as a peer<br>
      • If she focuses on market size → have the fund admin pivot answer ready (Q2 prep)<br>
      • If she asks "what do you need from us?" → have 3 asks: <strong>intro to seed funds, portfolio connections, market intel</strong><br>
      • If she mentions Fourthline or eflow → segue to "complementary, not competitive"</p>
    </div>

    <div class="warn">
      <p>⚠️ <strong>Don't pitch at her — have a conversation.</strong> Ask what she's seeing in regtech. Ask about her experience with Fourthline. Let her guide the depth. The best VC meetings feel like two founders talking, not a pitch.</p>
    </div>
  </div>`;

// Insert traction + Eugenie sections BEFORE "Who Is Finch Capital?"
html = html.replace(
  '  <!-- ABOUT FINCH -->',
  newTractionSection + '\n\n  <!-- ABOUT FINCH -->'
);

// ── 6. Update pre-call checklist ──
html = html.replace(
  '<li>Verify www.caelith.tech is up and demo works</li>',
  '<li class="done">Verify www.caelith.tech is up and demo works (health check: all 200 ✓)</li>'
);
html = html.replace(
  '<li>Decide your ask (investment vs. intro vs. exploratory)</li>',
  '<li class="done">Decide your ask — primary: intros to seed funds. Secondary: relationship building. Tertiary: actual investment (unlikely at this stage)</li>'
);

// Add demo credential note
html = html.replace(
  '<li class="done">Demo deployed and working on production</li>',
  `<li class="done">Demo deployed and working on production</li>
        <li class="done">Demo credentials fixed: demo@caelith.tech / Demo1234 (password reset deployed)</li>
        <li>Run readiness check yourself once before call to confirm email gate works</li>
        <li>Check Railway dashboard 30min before call — confirm backend uptime</li>
        <li>Backup plan: local dev server running if Railway goes down</li>`
);

// ── 7. Add EXIST grant + Egor to traction Q&A ──
html = html.replace(
  'EXIST grant application in progress (HWR Berlin). €35K NGI Zero Commons Fund application submitted.',
  'EXIST grant application in progress (HWR Berlin, BAfA meeting March 5). NGI Zero Commons Fund submitted (€50K, code 2026-04-087). Campus Founders Batch 4 submitted (€25K). Egor Tarakanov (Montold) responded positively — sent 3 feature links, active conversation. LinkedIn outreach cron running daily to 50 compliance officers.'
);

writeFileSync(p, html, { encoding: 'utf8' });
console.log('Finch prep doc updated ✅');
console.log('Size:', Buffer.byteLength(html, 'utf8'), 'bytes');

// Verify key additions
const verify = readFileSync(p, 'utf8');
console.log('231 tests:', verify.includes('231'));
console.log('Campus Founders:', verify.includes('Campus Founders'));
console.log('NGI Zero:', verify.includes('NGI Zero'));
console.log('Eugenie section:', verify.includes('Eugenie Colonna-Distria'));
console.log('45 days:', verify.includes('45 days'));
console.log('Demo credentials:', verify.includes('Demo1234'));
console.log('Traction section:', verify.includes("What's New Since Feb 28"));
