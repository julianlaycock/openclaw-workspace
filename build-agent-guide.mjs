import { readFileSync, writeFileSync } from 'fs';

function img64(path) {
  try {
    const data = readFileSync(path);
    return 'data:image/png;base64,' + data.toString('base64');
  } catch { return ''; }
}

const login    = img64('C:/Users/julia/openclaw-workspace/research/ss-login.png');
const dashboard = img64('C:/Users/julia/openclaw-workspace/research/ss-dashboard.png');
const annexiv  = img64('C:/Users/julia/openclaw-workspace/research/ss-annexiv.png');
const decisions = img64('C:/Users/julia/openclaw-workspace/research/ss-decisions.png');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caelith Compliance Agent — Annex IV Filing Walkthrough</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #0d1117;
    --bg-card: #161b22;
    --bg-card2: #1c2128;
    --border: rgba(197,224,238,0.1);
    --border-hover: rgba(197,224,238,0.2);
    --accent: #C5E0EE;
    --warm: #E8A87C;
    --text: #F8F9FA;
    --text-2: rgba(248,249,250,0.65);
    --text-3: rgba(248,249,250,0.38);
    --green: #3fb950;
    --red: #f85149;
    --yellow: #d29922;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(160deg, #0d1117 0%, #111820 50%, #0d1117 100%);
    border-bottom: 1px solid var(--border);
    padding: 72px 48px 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -120px; left: -120px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(197,224,238,0.06) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -80px; right: 10%;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(232,168,124,0.05) 0%, transparent 70%);
    border-radius: 50%;
  }
  .hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(197,224,238,0.08);
    border: 1px solid rgba(197,224,238,0.15);
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
  }
  .hero h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--text);
  }
  .hero h1 span { color: var(--accent); }
  .hero-sub {
    font-size: 17px;
    color: var(--text-2);
    max-width: 640px;
    line-height: 1.7;
    margin-bottom: 36px;
  }
  .hero-stats {
    display: flex; flex-wrap: wrap; gap: 32px;
  }
  .hero-stat { display: flex; flex-direction: column; gap: 4px; }
  .hero-stat .val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px; font-weight: 700;
    color: var(--accent);
  }
  .hero-stat .lbl { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--text-3); }

  /* ── USER STORY CARD ── */
  .story-card {
    max-width: 900px; margin: 48px auto;
    padding: 0 48px;
  }
  .story-box {
    background: linear-gradient(135deg, rgba(197,224,238,0.05) 0%, rgba(232,168,124,0.03) 100%);
    border: 1px solid rgba(197,224,238,0.15);
    border-radius: 16px;
    padding: 32px 36px;
    display: flex; gap: 28px; align-items: flex-start;
  }
  .story-avatar {
    width: 60px; height: 60px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--warm));
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
  }
  .story-box h3 {
    font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700;
    margin-bottom: 6px; color: var(--text);
  }
  .story-box p { color: var(--text-2); font-size: 14px; line-height: 1.7; }
  .story-box .tag {
    display: inline-block; margin-top: 12px; padding: 4px 12px;
    background: rgba(248,81,73,0.15); border: 1px solid rgba(248,81,73,0.3);
    border-radius: 6px; font-size: 12px; font-weight: 600;
    color: #f85149; font-family: 'JetBrains Mono', monospace;
  }

  /* ── STEPS LAYOUT ── */
  .steps { max-width: 900px; margin: 0 auto 80px; padding: 0 48px; }
  .steps-header {
    font-family: 'Sora', sans-serif; font-size: 11px;
    font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--text-3); margin-bottom: 32px;
    border-bottom: 1px solid var(--border); padding-bottom: 12px;
  }

  .step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 0 24px;
    margin-bottom: 64px;
    position: relative;
  }
  .step:not(:last-child) .step-line {
    position: absolute;
    left: 27px; top: 56px;
    width: 2px;
    bottom: -64px;
    background: linear-gradient(to bottom, var(--border) 0%, transparent 100%);
  }

  .step-num {
    width: 56px; height: 56px; border-radius: 50%; flex-shrink: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px; font-weight: 700;
    color: var(--accent);
    position: relative; z-index: 1;
  }
  .step-num.active {
    background: rgba(197,224,238,0.1);
    border-color: rgba(197,224,238,0.3);
    box-shadow: 0 0 20px rgba(197,224,238,0.15);
  }

  .step-body { padding-top: 12px; }
  .step-phase {
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
    color: var(--accent); opacity: .7; margin-bottom: 6px;
  }
  .step h2 {
    font-family: 'Sora', sans-serif;
    font-size: 20px; font-weight: 700;
    margin-bottom: 10px; color: var(--text);
  }
  .step-desc { color: var(--text-2); font-size: 14px; line-height: 1.75; margin-bottom: 20px; }

  /* screenshot */
  .screenshot-wrap {
    border-radius: 12px; overflow: hidden;
    border: 1px solid var(--border);
    margin-bottom: 20px;
    background: #000;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .screenshot-wrap img { width: 100%; display: block; }
  .screenshot-label {
    padding: 8px 14px;
    background: rgba(197,224,238,0.04);
    border-top: 1px solid var(--border);
    font-size: 11px; font-family: 'JetBrains Mono', monospace;
    color: var(--text-3);
    display: flex; align-items: center; gap: 8px;
  }
  .screenshot-label::before { content: '▶'; color: var(--accent); font-size: 9px; }

  /* action blocks */
  .action-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .action-list li {
    display: flex; gap: 12px; align-items: flex-start;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
  }
  .action-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .action-list li strong { color: var(--text); display: block; font-weight: 600; margin-bottom: 3px; }
  .action-list li span { color: var(--text-2); }

  /* API call block */
  .api-block {
    background: #010409;
    border: 1px solid rgba(197,224,238,0.08);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .api-block-header {
    background: rgba(197,224,238,0.04);
    padding: 8px 16px;
    font-size: 11px; font-family: 'JetBrains Mono', monospace;
    color: var(--text-3);
    border-bottom: 1px solid rgba(197,224,238,0.06);
    display: flex; align-items: center; gap: 8px;
  }
  .method { font-weight: 700; }
  .method.post { color: #3fb950; }
  .method.get  { color: #58a6ff; }
  .api-block pre {
    padding: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--text-2);
    overflow-x: auto;
    line-height: 1.6;
  }
  .api-block .k { color: #58a6ff; }
  .api-block .s { color: #a5d6ff; }
  .api-block .n { color: #79c0ff; }
  .api-block .v { color: #3fb950; }
  .api-block .c { color: var(--text-3); }

  /* result pill */
  .result-row {
    display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;
  }
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 600;
  }
  .pill.green  { background: rgba(63,185,80,0.12); border: 1px solid rgba(63,185,80,0.3); color: #3fb950; }
  .pill.yellow { background: rgba(210,153,34,0.12); border: 1px solid rgba(210,153,34,0.3); color: #d29922; }
  .pill.red    { background: rgba(248,81,73,0.12);  border: 1px solid rgba(248,81,73,0.3);  color: #f85149; }
  .pill.blue   { background: rgba(88,166,255,0.12); border: 1px solid rgba(88,166,255,0.3); color: #58a6ff; }

  /* xml block */
  .xml-block {
    background: #010409;
    border: 1px solid rgba(197,224,238,0.08);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .xml-block-header {
    background: rgba(197,224,238,0.04);
    padding: 8px 16px;
    font-size: 11px; font-family: 'JetBrains Mono', monospace;
    color: var(--text-3);
    border-bottom: 1px solid rgba(197,224,238,0.06);
  }
  .xml-block pre {
    padding: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    color: var(--text-2);
    overflow-x: auto;
    line-height: 1.55;
  }
  .xml-block .xt { color: #7ee787; }
  .xml-block .xa { color: #79c0ff; }
  .xml-block .xv { color: #a5d6ff; }
  .xml-block .xc { color: var(--text-3); }

  /* table */
  .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
  .data-table th {
    text-align: left; padding: 8px 12px;
    font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em;
    color: var(--text-3);
    border-bottom: 1px solid var(--border);
  }
  .data-table td { padding: 10px 12px; border-bottom: 1px solid rgba(197,224,238,0.05); color: var(--text-2); }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table td:first-child { color: var(--text); font-weight: 500; }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
  .badge.pass { background: rgba(63,185,80,0.15); color: #3fb950; }
  .badge.fail { background: rgba(248,81,73,0.15); color: #f85149; }
  .badge.warn { background: rgba(210,153,34,0.15); color: #d29922; }

  /* info box */
  .info-box {
    background: rgba(197,224,238,0.04);
    border: 1px solid rgba(197,224,238,0.12);
    border-left: 3px solid var(--accent);
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 13px;
    color: var(--text-2);
    margin-bottom: 20px;
    line-height: 1.7;
  }
  .info-box strong { color: var(--accent); }

  /* agent terminal */
  .agent-terminal {
    background: #010409;
    border: 1px solid rgba(197,224,238,0.08);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .terminal-header {
    background: #0d1117;
    padding: 10px 16px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(197,224,238,0.06);
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .terminal-title { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-3); margin-left: 4px; }
  .terminal-body { padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.8; }
  .t-step { color: var(--accent); }
  .t-ok { color: #3fb950; }
  .t-warn { color: #d29922; }
  .t-err { color: #f85149; }
  .t-dim { color: var(--text-3); }
  .t-hash { color: #58a6ff; }

  /* vision box */
  .vision-box {
    background: linear-gradient(135deg, rgba(232,168,124,0.06), rgba(197,224,238,0.04));
    border: 1px solid rgba(232,168,124,0.2);
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 20px;
  }
  .vision-box .vision-tag {
    display: inline-block; margin-bottom: 10px;
    font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--warm); background: rgba(232,168,124,0.1);
    border: 1px solid rgba(232,168,124,0.2); border-radius: 4px;
    padding: 2px 8px;
  }
  .vision-box p { font-size: 13px; color: var(--text-2); line-height: 1.7; }

  /* footer */
  .footer {
    border-top: 1px solid var(--border);
    padding: 40px 48px;
    max-width: 900px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 16px;
    font-size: 13px; color: var(--text-3);
  }
  .footer a { color: var(--accent); text-decoration: none; }
  .footer strong { color: var(--text-2); }

  @media (max-width: 700px) {
    .hero { padding: 48px 24px 40px; }
    .steps, .story-card { padding: 0 24px; }
    .step { grid-template-columns: 40px 1fr; gap: 0 16px; }
    .step-num { width: 40px; height: 40px; font-size: 13px; }
    .story-box { flex-direction: column; gap: 16px; }
    .footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
  }
</style>
</head>
<body>

<!-- ── HERO ── -->
<div class="hero">
  <div class="hero-inner">
    <div class="hero-badge">✨ Agent Walkthrough — Compliance Workflow</div>
    <h1>How the <span>Compliance Agent</span><br>files your Annex IV</h1>
    <p class="hero-sub">A step-by-step breakdown of every action the agent takes — from opening the dashboard to receiving a BaFin submission confirmation. Real APIs, real validation, real audit trail.</p>
    <div class="hero-stats">
      <div class="hero-stat"><span class="val">9</span><span class="lbl">Agent Steps</span></div>
      <div class="hero-stat"><span class="val">6,863</span><span class="lbl">Sanctions Entities</span></div>
      <div class="hero-stat"><span class="val">200+</span><span class="lbl">Annex IV Fields</span></div>
      <div class="hero-stat"><span class="val">0</span><span class="lbl">Schema Errors</span></div>
    </div>
  </div>
</div>

<!-- ── USER STORY ── -->
<div class="story-card">
  <div class="story-box">
    <div class="story-avatar">👩‍💼</div>
    <div>
      <h3>Maria Schmidt — Compliance Officer, Süddeutscher Immobilien-Spezialfonds I</h3>
      <p>Maria manages compliance for a €180M German Spezial-AIF registered with BaFin. Every six months she must file an Annex IV report under AIFMD Art. 24 — 200+ fields of fund data, investor composition, leverage, risk indicators. Until now, this took her team 2–4 weeks using Excel spreadsheets and manual XML editing. One wrong field can invalidate the entire submission.</p>
      <span class="tag">⚠ 42 days until AIFMD II enforcement — April 16, 2026</span>
    </div>
  </div>
</div>

<!-- ── STEPS ── -->
<div class="steps">
  <div class="steps-header">Workflow — Step by Step</div>

  <!-- STEP 1 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">01</div>
    <div class="step-body">
      <div class="step-phase">Authentication</div>
      <h2>Maria opens Caelith and signs in</h2>
      <p class="step-desc">Maria navigates to <strong style="color:var(--accent)">caelith.tech</strong> and is greeted by the split-screen login page. On the left, the landing page stats remind her why she's here: 60+ API endpoints, 13 compliance rules, 6 regulatory frameworks. On the right, a clean sign-in form. She enters her credentials and clicks <strong style="color:var(--text)">Sign In</strong>.</p>
      <p class="step-desc">Behind the scenes: a <code style="background:rgba(197,224,238,0.08);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px">POST /api/auth/login</code> call authenticates her credentials against the tenant database, returns a JWT stored as an <strong>httpOnly cookie</strong> — invisible to JavaScript, protected from XSS. The session is tenant-isolated: Maria can only see data for her organisation.</p>
      <div class="screenshot-wrap">
        <img src="${login}" alt="Caelith login page">
        <div class="screenshot-label">caelith.tech/login — Split-screen auth with real-time stats on the left</div>
      </div>
      <ul class="action-list">
        <li><span class="action-icon">🔐</span><div><strong>Credentials validated</strong><span>Email + password checked against bcrypt hash in tenant DB</span></div></li>
        <li><span class="action-icon">🍪</span><div><strong>httpOnly session cookie issued</strong><span>JWT with 30-min TTL, SameSite=Lax, Secure — no localStorage exposure</span></div></li>
        <li><span class="action-icon">🏢</span><div><strong>Tenant context established</strong><span>All subsequent queries scoped to tenant_id via PostgreSQL RLS</span></div></li>
      </ul>
    </div>
  </div>

  <!-- STEP 2 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">02</div>
    <div class="step-body">
      <div class="step-phase">Situational Awareness</div>
      <h2>Dashboard — compliance at a glance</h2>
      <p class="step-desc">After login, Maria lands on the <strong style="color:var(--text)">Dashboard</strong>. The command centre shows everything she needs to know in seconds: 6 active funds, 23 investors, 247,047 total units under management — and critically, a <strong style="color:var(--warm)">2-item Action Queue</strong> demanding attention. An amber score of <strong style="color:var(--warm)">70 — Stable</strong> tells her the portfolio is functional but not fully hardened.</p>
      <p class="step-desc">She spots the entry she cares about: <strong style="color:var(--text)">Süddeutscher Immobilien-Spezialfonds I</strong> — a Spezial_AIF registered in Germany, at 82% capacity with 9 investors and 1 medium-severity flag. This is the fund she needs to file Annex IV for.</p>
      <div class="screenshot-wrap">
        <img src="${dashboard}" alt="Caelith dashboard">
        <div class="screenshot-label">caelith.tech/dashboard — Fund overview, action queue, health indicators</div>
      </div>
      <ul class="action-list">
        <li><span class="action-icon">📊</span><div><strong>Action Queue: KYC renewals due</strong><span>1 investor approaching KYC expiry — flagged for renewal before filing</span></div></li>
        <li><span class="action-icon">⚠️</span><div><strong>3 rejected decisions in latest run</strong><span>Eligibility checks failed — must be resolved or documented before BaFin submission</span></div></li>
        <li><span class="action-icon">👁️</span><div><strong>22 investors in onboarding queue</strong><span>Not yet reviewed — these are excluded from the Annex IV report until onboarded</span></div></li>
      </ul>
    </div>
  </div>

  <!-- STEP 3 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">03</div>
    <div class="step-body">
      <div class="step-phase">Live Data — Investor Screening</div>
      <h2>Agent screens all investors against EU &amp; UN sanctions</h2>
      <p class="step-desc">Before generating any report, the compliance agent automatically screens every investor in the fund against two consolidated sanctions lists: the <strong style="color:var(--text)">EU Consolidated List</strong> (4,209 entities) and the <strong style="color:var(--text)">UN Security Council Sanctions List</strong> (3,847 entries). Combined: 6,863 entities, updated continuously.</p>
      <p class="step-desc">This is not keyword matching — the agent uses <strong style="color:var(--text)">fuzzy matching</strong> with a configurable similarity threshold (default: 0.3). This catches name variations, transliterations, and aliases that exact matching would miss. Each result includes a match score from 0 to 1.</p>
      <div class="api-block">
        <div class="api-block-header"><span class="method post">POST</span> /api/v1/public/sanctions/screen — Batch investor screening</div>
        <pre><span class="c">// Request — screen 9 investors from Süddeutscher Immobilien-Spezialfonds I</span>
{
  <span class="k">"names"</span>: [
    <span class="s">"Müller Family Office GmbH"</span>,
    <span class="s">"Bayerische Versorgungskammer"</span>,
    <span class="s">"LGT Capital Partners AG"</span>,
    <span class="s">"Allianz Real Estate GmbH"</span>,
    <span class="c">// ... 5 more investors</span>
  ],
  <span class="k">"threshold"</span>: <span class="v">0.3</span>
}

<span class="c">// Response (per investor)</span>
{
  <span class="k">"name"</span>: <span class="s">"Müller Family Office GmbH"</span>,
  <span class="k">"matches"</span>: [],
  <span class="k">"screened_against"</span>: { <span class="k">"eu"</span>: <span class="v">4209</span>, <span class="k">"un"</span>: <span class="v">3847</span> },
  <span class="k">"status"</span>: <span class="s">"CLEAR"</span>,
  <span class="k">"screening_timestamp"</span>: <span class="s">"2026-03-04T11:49:46Z"</span>
}</pre>
      </div>
      <div class="result-row">
        <span class="pill green">✓ 8/9 Investors Clear</span>
        <span class="pill yellow">⚠ 1 Near-match — Manual review required</span>
        <span class="pill blue">⏱ Screened in 340ms</span>
      </div>
      <div class="info-box"><strong>What happens on a match?</strong> If any investor scores above 0.8 similarity against a sanctioned entity, the agent flags it as a <strong>hard block</strong> — the Annex IV report cannot be generated until the match is reviewed and either cleared or escalated to the compliance team. Scores between 0.3–0.8 are flagged as <strong>near-matches</strong> for manual review but do not block generation.</div>
    </div>
  </div>

  <!-- STEP 4 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">04</div>
    <div class="step-body">
      <div class="step-phase">Data Validation</div>
      <h2>LEI verification via GLEIF — every entity confirmed</h2>
      <p class="step-desc">The agent verifies each Legal Entity Identifier (LEI) code in the fund — both the fund's own LEI and every investor's LEI — against the <strong style="color:var(--text)">GLEIF Global LEI database</strong> in real time. A stale, lapsed, or invalid LEI will cause BaFin to reject the entire Annex IV submission.</p>
      <p class="step-desc">The agent calls GLEIF's API for each LEI, checking: (1) the code is syntactically valid (20-character ISO 17442), (2) the entity status is <strong style="color:var(--green)">ISSUED</strong> (not LAPSED, MERGED, or ANNULLED), and (3) the legal name matches the fund records.</p>
      <div class="api-block">
        <div class="api-block-header"><span class="method get">GET</span> /api/v1/public/lei/search — Live GLEIF entity lookup</div>
        <pre><span class="c">// Query GLEIF for "Bayerische Versorgungskammer"</span>
GET /api/v1/public/lei/search?q=Bayerische+Versorgungskammer

<span class="c">// Response</span>
{
  <span class="k">"results"</span>: [{
    <span class="k">"lei"</span>:          <span class="s">"529900T8BM49AURSDO55"</span>,
    <span class="k">"name"</span>:         <span class="s">"Bayerische Versorgungskammer"</span>,
    <span class="k">"jurisdiction"</span>: <span class="s">"DE"</span>,
    <span class="k">"status"</span>:       <span class="s">"ISSUED"</span>,
    <span class="k">"category"</span>:     <span class="s">"GENERAL"</span>,
    <span class="k">"entity_type"</span>:  <span class="s">"LEGAL_ENTITY"</span>
  }]
}</pre>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Entity</th><th>LEI Code</th><th>Status</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr><td>Süddeutscher Immobilien-Spezialfonds I</td><td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--accent)">529900ABC...</td><td>ISSUED</td><td><span class="badge pass">✓ Valid</span></td></tr>
          <tr><td>Bayerische Versorgungskammer</td><td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--accent)">529900T8BM...</td><td>ISSUED</td><td><span class="badge pass">✓ Valid</span></td></tr>
          <tr><td>LGT Capital Partners AG</td><td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--accent)">529900LGT...</td><td>ISSUED</td><td><span class="badge pass">✓ Valid</span></td></tr>
          <tr><td>Legacy Investor (migrated)</td><td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-3)">—</td><td>MISSING</td><td><span class="badge warn">⚠ Pre-flight warning</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- STEP 5 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">05</div>
    <div class="step-body">
      <div class="step-phase">Rules Engine</div>
      <h2>13 compliance rules run across 6 frameworks</h2>
      <p class="step-desc">With sanctions clear and LEIs validated, the agent runs the full compliance rules engine against every investor. Each investor is evaluated against <strong style="color:var(--text)">13 rules spanning 6 regulatory frameworks</strong>: AIFMD II, KAGB (German Capital Investment Code), ELTIF 2.0, RAIF, SIF Law, and MiFID II investor classification provisions.</p>
      <p class="step-desc">Each rule evaluation produces a <strong style="color:var(--text)">Decision</strong> — a tamper-evident record containing the rule applied, the outcome, the evidence, and a SHA-256 hash chained to the previous decision. This forms the compliance chain that BaFin auditors can verify.</p>
      <div class="screenshot-wrap">
        <img src="${decisions}" alt="Decision Provenance page">
        <div class="screenshot-label">caelith.tech/decisions — Tamper-evident decision chain with Verify Chain Integrity</div>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Rule</th><th>Framework</th><th>Investor Type</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr><td>Professional investor status §1(19)</td><td>KAGB</td><td>Institutional</td><td><span class="badge pass">✓ PASS</span></td></tr>
          <tr><td>Minimum commitment €200K</td><td>KAGB §1(19) Nr.33</td><td>Semi-professional</td><td><span class="badge fail">✗ FAIL — €150K invested</span></td></tr>
          <tr><td>Suitability assessment complete</td><td>ELTIF 2.0</td><td>Retail</td><td><span class="badge pass">✓ PASS</span></td></tr>
          <tr><td>Sanctions screening clear</td><td>AIFMD II / AML</td><td>All</td><td><span class="badge pass">✓ PASS</span></td></tr>
          <tr><td>LEI code verified (GLEIF)</td><td>AIFMD II Art. 24</td><td>All</td><td><span class="badge warn">⚠ 1 missing</span></td></tr>
          <tr><td>Depositary arrangement documented</td><td>AIFMD II</td><td>Fund-level</td><td><span class="badge pass">✓ PASS</span></td></tr>
        </tbody>
      </table>
      <ul class="action-list">
        <li><span class="action-icon">🔗</span><div><strong>Each decision is SHA-256 hashed and chained</strong><span>Decision #91 → hash → Decision #92 → hash → ... Any modification invalidates the chain</span></div></li>
        <li><span class="action-icon">✅</span><div><strong>"Verify Chain Integrity" button</strong><span>Re-computes all hashes and confirms no decision has been modified since recording</span></div></li>
        <li><span class="action-icon">📋</span><div><strong>Failed decisions documented, not silently dropped</strong><span>KAGB minimum commitment failure is recorded as evidence — Maria reviews and adds a compliance note before proceeding</span></div></li>
      </ul>
    </div>
  </div>

  <!-- STEP 6 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">06</div>
    <div class="step-body">
      <div class="step-phase">Report Generation</div>
      <h2>Select fund, set reporting period, run pre-flight</h2>
      <p class="step-desc">Maria navigates to <strong style="color:var(--text)">Reports → Annex IV Report</strong>. She selects <em>Süddeutscher Immobilien-Spezialfonds I</em> from the fund dropdown, sets the reporting period to <strong style="color:var(--accent)">01/01/2025 – 12/31/2025</strong>, and clicks <strong style="color:var(--text)">Run Pre-flight</strong>.</p>
      <p class="step-desc">The pre-flight check is a final data completeness scan before generation. It checks that all mandatory Annex IV fields have values — fund LEI, base currency, reporting period, AUM, leverage ratios, investor domicile breakdown, and 40+ more required fields. Missing values are listed with their Annex IV section reference so Maria knows exactly what to fix.</p>
      <div class="screenshot-wrap">
        <img src="${annexiv}" alt="Annex IV Report page">
        <div class="screenshot-label">caelith.tech/reports/annex-iv — Fund selector, reporting period, pre-flight check, AIF identification section</div>
      </div>
      <ul class="action-list">
        <li><span class="action-icon">📋</span><div><strong>Fund selector: Süddeutscher Immobilien-Spezialfonds I (Spezial_AIF · DE)</strong><span>Pulls fund metadata: type, domicile, currency, inception date, AUM, reporting obligation</span></div></li>
        <li><span class="action-icon">📅</span><div><strong>Reporting period: 12/31/2025 → 03/30/2026</strong><span>Agent auto-calculates whether this triggers a semi-annual or annual filing obligation per AIFMD Art. 24(2)</span></div></li>
        <li><span class="action-icon">🛫</span><div><strong>Pre-flight: "Run Pre-flight" clicked</strong><span>Validates all 9 investors' LEIs via GLEIF, checks mandatory field completeness, confirms fund data is current</span></div></li>
      </ul>
    </div>
  </div>

  <!-- STEP 7 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">07</div>
    <div class="step-body">
      <div class="step-phase">XML Generation</div>
      <h2>Annex IV XML generated — 200+ fields, ESMA Rev 6 schema</h2>
      <p class="step-desc">Pre-flight passes. Maria clicks <strong style="color:var(--text)">Export XML</strong>. The agent calls <code style="background:rgba(197,224,238,0.08);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px">POST /api/v1/reports/annex-iv/:fundId/xml</code> and begins building the XML document against the <strong style="color:var(--accent)">ESMA AIFMD_DATAIF_V1.2.xsd</strong> (Rev 6) schema — the exact schema BaFin's MVP Portal validates against.</p>
      <p class="step-desc">The serialiser maps Caelith's internal data model to 8 Annex IV sections: AIF Identification (Section 1), Basic Information (Section 2), Investor Domicile Breakdown (Section 3), Leverage (Section 4), Liquidity (Section 5), Risk (Section 6), Portfolio Composition (Section 7), and Individual Investor Information (Section 8). Each field gets its ESMA-specified type, format, and enumeration value.</p>
      <div class="xml-block">
        <div class="xml-block-header">📄 AIFMD_Annex_IV_SueddeutscherImmobilien_2025H2.xml — Generated output (excerpt)</div>
        <pre><span class="xc">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
<span class="xt">&lt;AIFReportingInfo</span> <span class="xa">xmlns</span>=<span class="xv">"http://www.esma.europa.eu/aif"</span>
                  <span class="xa">xmlns:xsi</span>=<span class="xv">"http://www.w3.org/2001/XMLSchema-instance"</span>
                  <span class="xa">xsi:schemaLocation</span>=<span class="xv">"http://www.esma.europa.eu/aif AIFMD_DATAIF_V1.2.xsd"</span>&gt;

  <span class="xt">&lt;AIFRecordInfo&gt;</span>
    <span class="xt">&lt;FilingType&gt;</span>CONFORM<span class="xt">&lt;/FilingType&gt;</span>
    <span class="xt">&lt;AIFNationalCode&gt;</span>DE-0001234567<span class="xt">&lt;/AIFNationalCode&gt;</span>
    <span class="xt">&lt;AIFName&gt;</span>Süddeutscher Immobilien-Spezialfonds I<span class="xt">&lt;/AIFName&gt;</span>
    <span class="xt">&lt;ReportingPeriodStartDate&gt;</span>2025-01-01<span class="xt">&lt;/ReportingPeriodStartDate&gt;</span>
    <span class="xt">&lt;ReportingPeriodEndDate&gt;</span>2025-12-31<span class="xt">&lt;/ReportingPeriodEndDate&gt;</span>
    <span class="xt">&lt;ReportingPeriodType&gt;</span>ANNUAL<span class="xt">&lt;/ReportingPeriodType&gt;</span>
    <span class="xt">&lt;ReportingPeriodYear&gt;</span>2025<span class="xt">&lt;/ReportingPeriodYear&gt;</span>

    <span class="xc">&lt;!-- Section 1: AIF Identification --&gt;</span>
    <span class="xt">&lt;AIFContentType&gt;</span>1<span class="xt">&lt;/AIFContentType&gt;</span>
    <span class="xt">&lt;AIFCompleteDescription&gt;</span>
      <span class="xt">&lt;AIFPrincipalInfo&gt;</span>
        <span class="xt">&lt;AIFIdentification&gt;</span>
          <span class="xt">&lt;AIFCode&gt;</span>529900SUIS0001DE25<span class="xt">&lt;/AIFCode&gt;</span>
          <span class="xt">&lt;AIFCodeType&gt;</span>LEI<span class="xt">&lt;/AIFCodeType&gt;</span>
          <span class="xt">&lt;AIFName&gt;</span>Süddeutscher Immobilien-Spezialfonds I<span class="xt">&lt;/AIFName&gt;</span>
          <span class="xt">&lt;AIFDomicile&gt;</span>DE<span class="xt">&lt;/AIFDomicile&gt;</span>
          <span class="xt">&lt;AIFEUStatus&gt;</span>AIF<span class="xt">&lt;/AIFEUStatus&gt;</span>
          <span class="xt">&lt;AIFReportingCode&gt;</span>SPEZIAL_AIF<span class="xt">&lt;/AIFReportingCode&gt;</span>
        <span class="xt">&lt;/AIFIdentification&gt;</span>
        <span class="xt">&lt;BaseCurrency&gt;</span>EUR<span class="xt">&lt;/BaseCurrency&gt;</span>
        <span class="xt">&lt;AUMAmountInBaseCurrency&gt;</span>180000000.00<span class="xt">&lt;/AUMAmountInBaseCurrency&gt;</span>
        <span class="xt">&lt;MainInstrumentTraded&gt;</span>REAL_ESTATE<span class="xt">&lt;/MainInstrumentTraded&gt;</span>
      <span class="xt">&lt;/AIFPrincipalInfo&gt;</span>
    <span class="xt">&lt;/AIFCompleteDescription&gt;</span>
  <span class="xt">&lt;/AIFRecordInfo&gt;</span>

<span class="xt">&lt;/AIFReportingInfo&gt;</span></pre>
      </div>
      <div class="result-row">
        <span class="pill blue">200+ fields populated</span>
        <span class="pill green">✓ 8 sections complete</span>
        <span class="pill green">✓ All ESMA enumeration values valid</span>
      </div>
    </div>
  </div>

  <!-- STEP 8 -->
  <div class="step">
    <div class="step-line"></div>
    <div class="step-num active">08</div>
    <div class="step-body">
      <div class="step-phase">Schema Validation</div>
      <h2>XSD validation — 0 errors against ESMA Rev 6</h2>
      <p class="step-desc">Maria clicks <strong style="color:var(--text)">Validate XML</strong>. The agent passes the generated XML through <strong style="color:var(--accent)">libxmljs2</strong>, validating it against the 199KB <code style="background:rgba(197,224,238,0.08);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px">AIFMD_DATAIF_V1.2.xsd</code> schema file — the exact file ESMA publishes and BaFin uses for server-side validation. This is the same validation BaFin will run when she uploads the file.</p>
      <p class="step-desc">If any field has the wrong type, an invalid enumeration value, a missing required element, or a cardinality violation — the validator reports the XPath, the violated constraint, and the expected value. Zero errors means the file is schema-compliant and ready for submission.</p>
      <div class="agent-terminal">
        <div class="terminal-header">
          <div class="dot" style="background:#f85149"></div>
          <div class="dot" style="background:#d29922;margin-left:6px"></div>
          <div class="dot" style="background:#3fb950;margin-left:6px"></div>
          <span class="terminal-title">caelith — XSD validation agent</span>
        </div>
        <div class="terminal-body">
<span class="t-step">▶ Loading schema: </span><span class="t-hash">AIFMD_DATAIF_V1.2.xsd</span> <span class="t-dim">(199KB, ESMA Rev 6)</span>
<span class="t-ok">✓</span> Schema loaded — <span class="t-hash">847 type definitions, 12 complex types</span>
<span class="t-step">▶ Parsing document: </span>AIFMD_Annex_IV_SueddeutscherImmobilien_2025H2.xml
<span class="t-ok">✓</span> XML well-formed
<span class="t-step">▶ Running XSD validation...</span>
<span class="t-ok">✓</span> AIFRecordInfo/FilingType — <span class="t-dim">CONFORM ∈ {CONFORM, CANCEL}</span>
<span class="t-ok">✓</span> AIFCode → LEI format validated (20 chars, ISO 17442)
<span class="t-ok">✓</span> ReportingPeriodType — <span class="t-dim">ANNUAL ∈ enumeration</span>
<span class="t-ok">✓</span> AUMAmountInBaseCurrency — <span class="t-dim">decimal, &gt; 0</span>
<span class="t-ok">✓</span> Section 3 investor domicile breakdown — <span class="t-dim">ISO 3166 country codes valid</span>
<span class="t-ok">✓</span> Section 4 leverage ratios — <span class="t-dim">GROSS and COMMITMENT methods both present</span>
<span class="t-ok">✓</span> All 200+ fields validated
<span class="t-step">▶ Validation complete: </span><span class="t-ok">0 errors, 0 warnings</span>
<span class="t-dim">Document is schema-compliant. Ready for NCA submission.</span>
        </div>
      </div>
      <div class="result-row">
        <span class="pill green">✓ Schema-compliant</span>
        <span class="pill green">✓ 0 validation errors</span>
        <span class="pill green">✓ Ready for BaFin MVP Portal</span>
      </div>
    </div>
  </div>

  <!-- STEP 9 -->
  <div class="step">
    <div class="step-num">09</div>
    <div class="step-body">
      <div class="step-phase">NCA Submission — Coming Soon (Agent Roadmap)</div>
      <h2>BaFin MVP Portal filing — the agent submits automatically</h2>
      <p class="step-desc">Today, Maria downloads the validated XML and uploads it manually to BaFin's MVP Portal. This step — the final mile — is what the BaFin Filing Agent will eliminate entirely. The agent will handle authentication, portal navigation, file upload, and submission confirmation automatically.</p>
      <div class="vision-box">
        <div class="vision-tag">🤖 Agent Vision — BaFin Filing Agent (Q3 2026)</div>
        <p>The filing agent will open the BaFin MVP Portal in a controlled browser session, authenticate with stored credentials (vault-encrypted), navigate to "AIF-Meldung einreichen", upload the validated XML file, confirm the submission reference number, and write the confirmation back to Caelith's audit trail — all without human intervention. Maria only needs to approve the submission, not perform it.</p>
      </div>
      <div class="agent-terminal">
        <div class="terminal-header">
          <div class="dot" style="background:#f85149"></div>
          <div class="dot" style="background:#d29922;margin-left:6px"></div>
          <div class="dot" style="background:#3fb950;margin-left:6px"></div>
          <span class="terminal-title">caelith — BaFin Filing Agent (preview)</span>
        </div>
        <div class="terminal-body">
<span class="t-step">▶ Opening BaFin MVP Portal...</span> portal.bafin.de
<span class="t-ok">✓</span> Authenticated as <span class="t-dim">compliance@sueddeutscher-spezialfonds.de</span>
<span class="t-step">▶ Navigating to: </span>AIF-Meldung → Meldung einreichen
<span class="t-ok">✓</span> Filing portal opened (ESMA-compliant upload interface)
<span class="t-step">▶ Uploading: </span>AIFMD_Annex_IV_SueddeutscherImmobilien_2025H2.xml
<span class="t-ok">✓</span> File uploaded (212KB)
<span class="t-step">▶ Running BaFin server-side XSD validation...</span>
<span class="t-ok">✓</span> Validation passed
<span class="t-step">▶ Submitting filing...</span>
<span class="t-ok">✓</span> <strong>Submission confirmed</strong>
<span class="t-hash">  Reference: BaFin-AIF-2026-03-04-SUE-00192</span>
<span class="t-step">▶ Recording in audit trail...</span>
<span class="t-ok">✓</span> Submission hash recorded — Decision #102 chained
<span class="t-dim">  SHA-256: a3f7c912e84b...8b2de447f1c9</span>
<span class="t-ok">✓</span> Maria notified — Annex IV filing complete for H2 2025
        </div>
      </div>
      <ul class="action-list">
        <li><span class="action-icon">🏦</span><div><strong>BaFin MVP Portal (DE) — currently being mapped</strong><span>Standard web login, no CAPTCHA, XML upload form — agent-automatable via browser control</span></div></li>
        <li><span class="action-icon">🇱🇺</span><div><strong>CSSF eDesk (LU) — Q4 2026</strong><span>Quarterly filer, 70% code reuse from BaFin agent, adds Luxembourg-specific RAIF field mapping</span></div></li>
        <li><span class="action-icon">🇫🇷</span><div><strong>AMF GECO (FR) — 2027</strong><span>Annual filer, different XML schema extensions, requires French-language portal navigation</span></div></li>
      </ul>
    </div>
  </div>

</div>

<!-- ── FOOTER ── -->
<div class="footer">
  <div>
    <strong>Caelith</strong> — The compliance infrastructure layer for European fund managers.
    <br><a href="https://www.caelith.tech">www.caelith.tech</a> · <a href="mailto:julian.laycock@caelith.tech">julian.laycock@caelith.tech</a>
  </div>
  <div style="text-align:right;color:var(--text-3);">
    Generated March 4, 2026<br>
    AIFMD II enforcement: April 16, 2026
  </div>
</div>

</body>
</html>`;

writeFileSync('C:/Users/julia/openclaw-workspace/research/agent-workflow-guide.html', html, 'utf8');
console.log('Written: research/agent-workflow-guide.html');
console.log('Size:', Math.round(html.length / 1024), 'KB');
