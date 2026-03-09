import { writeFileSync } from 'fs';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caelith \u2014 Strategic Masterplan Q2\u2013Q4 2026</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --bg:#0d1117;--card:#161b22;--card2:#1c2128;
    --border:rgba(197,224,238,0.1);--border2:rgba(197,224,238,0.06);
    --accent:#C5E0EE;--warm:#E8A87C;
    --text:#F8F9FA;--t2:rgba(248,249,250,0.65);--t3:rgba(248,249,250,0.35);
    --green:#3fb950;--red:#f85149;--yellow:#d29922;--blue:#58a6ff;--purple:#bc8cff;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;line-height:1.65;-webkit-font-smoothing:antialiased}
  a{color:var(--accent);text-decoration:none}

  .wrap{max-width:1000px;margin:0 auto;padding:0 48px}
  @media(max-width:768px){.wrap{padding:0 20px}}

  /* HERO */
  .hero{padding:72px 48px 48px;border-bottom:1px solid var(--border);position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:-200px;left:-200px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(197,224,238,0.04) 0%,transparent 70%)}
  .hero-inner{max-width:1000px;margin:0 auto;position:relative;z-index:1}
  .tag{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;margin-bottom:20px}
  .tag.red{background:rgba(248,81,73,0.1);border:1px solid rgba(248,81,73,0.25);color:var(--red)}
  .tag.green{background:rgba(63,185,80,0.1);border:1px solid rgba(63,185,80,0.25);color:var(--green)}
  .tag.blue{background:rgba(88,166,255,0.1);border:1px solid rgba(88,166,255,0.25);color:var(--blue)}
  .tag.orange{background:rgba(232,168,124,0.1);border:1px solid rgba(232,168,124,0.25);color:var(--warm)}
  .tag.purple{background:rgba(188,140,255,0.1);border:1px solid rgba(188,140,255,0.25);color:var(--purple)}
  .hero h1{font-family:'Sora',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:800;line-height:1.15;margin-bottom:14px}
  .hero h1 em{color:var(--accent);font-style:normal}
  .hero-sub{font-size:15px;color:var(--t2);max-width:700px;line-height:1.75}

  section{padding:48px 0;border-bottom:1px solid var(--border)}
  .sec-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);margin-bottom:8px}
  .sec-title{font-family:'Sora',sans-serif;font-size:24px;font-weight:700;margin-bottom:8px}
  .sec-sub{color:var(--t2);font-size:14px;max-width:700px;margin-bottom:32px;line-height:1.75}

  /* ASSUMPTION CARDS */
  .assumption-grid{display:flex;flex-direction:column;gap:16px}
  .assumption{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px;position:relative;overflow:hidden}
  .assumption.wrong{border-left:4px solid var(--red)}
  .assumption.risky{border-left:4px solid var(--yellow)}
  .assumption.valid{border-left:4px solid var(--green)}
  .assumption.untested{border-left:4px solid var(--purple)}
  .assumption h4{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:10px}
  .assumption .verdict{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:2px 8px;border-radius:4px}
  .verdict.wrong{background:rgba(248,81,73,0.1);color:var(--red)}
  .verdict.risky{background:rgba(210,153,34,0.1);color:var(--yellow)}
  .verdict.valid{background:rgba(63,185,80,0.1);color:var(--green)}
  .verdict.untested{background:rgba(188,140,255,0.1);color:var(--purple)}
  .assumption p{font-size:13px;color:var(--t2);line-height:1.7}
  .assumption .evidence{margin-top:10px;padding-top:10px;border-top:1px solid var(--border2);font-size:12px;color:var(--t3);line-height:1.65}
  .assumption .evidence strong{color:var(--t2)}
  .assumption .test{margin-top:10px;padding:10px 14px;background:rgba(197,224,238,0.04);border:1px solid rgba(197,224,238,0.1);border-radius:8px;font-size:12px;color:var(--accent);line-height:1.6}
  .assumption .test strong{color:var(--text);display:block;margin-bottom:3px;font-size:11px;text-transform:uppercase;letter-spacing:.05em}

  /* PHASE TIMELINE */
  .phase{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;margin-bottom:16px}
  .phase-header{padding:20px 24px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border2)}
  .phase-num{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;flex-shrink:0}
  .p1 .phase-num{background:rgba(248,81,73,0.1);color:var(--red);border:1px solid rgba(248,81,73,0.25)}
  .p2 .phase-num{background:rgba(210,153,34,0.1);color:var(--yellow);border:1px solid rgba(210,153,34,0.25)}
  .p3 .phase-num{background:rgba(88,166,255,0.1);color:var(--blue);border:1px solid rgba(88,166,255,0.25)}
  .p4 .phase-num{background:rgba(63,185,80,0.1);color:var(--green);border:1px solid rgba(63,185,80,0.25)}
  .p5 .phase-num{background:rgba(188,140,255,0.1);color:var(--purple);border:1px solid rgba(188,140,255,0.25)}
  .phase-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700}
  .phase-dates{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--t3);margin-left:auto}
  .phase-body{padding:20px 24px}
  .phase-goal{font-size:13px;color:var(--warm);font-weight:600;margin-bottom:16px;font-family:'Sora',sans-serif}
  .task-list{display:flex;flex-direction:column;gap:10px}
  .task{display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:var(--card2);border:1px solid var(--border2);border-radius:10px}
  .task-week{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--t3);min-width:50px;flex-shrink:0;padding-top:2px}
  .task-content{flex:1}
  .task-content h5{font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px}
  .task-content p{font-size:12px;color:var(--t2);line-height:1.6}
  .task-cron{margin-top:6px;display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:6px;background:rgba(63,185,80,0.08);border:1px solid rgba(63,185,80,0.15);font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green)}
  .task-owner{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;margin-left:6px}
  .task-owner.julian{background:rgba(232,168,124,0.1);color:var(--warm)}
  .task-owner.mate{background:rgba(197,224,238,0.1);color:var(--accent)}
  .task-owner.both{background:rgba(188,140,255,0.1);color:var(--purple)}

  /* KILL CRITERIA */
  .kill-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:768px){.kill-grid{grid-template-columns:1fr}}
  .kill-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px}
  .kill-card.red{border-color:rgba(248,81,73,0.25);background:rgba(248,81,73,0.03)}
  .kill-card.yellow{border-color:rgba(210,153,34,0.25);background:rgba(210,153,34,0.03)}
  .kill-card h4{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;margin-bottom:8px}
  .kill-card p{font-size:13px;color:var(--t2);line-height:1.65}

  /* METRICS */
  .metric-row{display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap}
  .metric{flex:1;min-width:140px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center}
  .metric .val{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:700;color:var(--accent)}
  .metric .lbl{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--t3);margin-top:2px}

  /* TARGET LIST */
  .target-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}
  .target-table th{text-align:left;padding:10px 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--t3);border-bottom:1px solid var(--border)}
  .target-table td{padding:10px 14px;border-bottom:1px solid var(--border2);color:var(--t2);vertical-align:top;line-height:1.5}
  .target-table td:first-child{color:var(--text);font-weight:600}
  .tier-badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
  .tier-badge.t1{background:rgba(232,168,124,0.12);color:var(--warm)}
  .tier-badge.t2{background:rgba(88,166,255,0.12);color:var(--blue)}
  .tier-badge.t3{background:rgba(197,224,238,0.08);color:var(--t3)}

  /* CRON SECTION */
  .cron-grid{display:flex;flex-direction:column;gap:10px}
  .cron-item{display:flex;gap:16px;align-items:center;padding:14px 18px;background:var(--card);border:1px solid var(--border);border-radius:10px;flex-wrap:wrap}
  .cron-schedule{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--green);min-width:180px;flex-shrink:0}
  .cron-desc{font-size:13px;color:var(--t2);flex:1}
  .cron-desc strong{color:var(--text)}
  .cron-channel{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t3);padding:2px 8px;border-radius:4px;background:rgba(197,224,238,0.05);border:1px solid var(--border2)}

  /* INSIGHT BOX */
  .insight{background:rgba(197,224,238,0.04);border:1px solid rgba(197,224,238,0.15);border-left:3px solid var(--accent);border-radius:8px;padding:16px 20px;margin:20px 0;font-size:13px;color:var(--t2);line-height:1.7}
  .insight strong{color:var(--accent)}
  .insight.warn{border-left-color:var(--yellow);background:rgba(210,153,34,0.04);border-color:rgba(210,153,34,0.15)}
  .insight.warn strong{color:var(--yellow)}
  .insight.red{border-left-color:var(--red);background:rgba(248,81,73,0.04);border-color:rgba(248,81,73,0.15)}
  .insight.red strong{color:var(--red)}

  /* EMAIL TEMPLATE */
  .email-tmpl{background:var(--card2);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-top:16px}
  .email-bar{padding:10px 16px;border-bottom:1px solid var(--border2);font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--t3);background:rgba(0,0,0,0.2)}
  .email-body{padding:20px;font-size:13px;color:var(--t2);line-height:1.8;white-space:pre-wrap}
  .email-body .placeholder{color:var(--warm);font-weight:600}

  .footer{border-top:1px solid var(--border);padding:40px 48px;max-width:1000px;margin:0 auto;font-size:12px;color:var(--t3);text-align:center}

  /* TOC */
  .toc{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px 28px;margin:32px 0}
  .toc h3{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;margin-bottom:12px;color:var(--t2)}
  .toc ol{list-style:none;counter-reset:toc;display:flex;flex-direction:column;gap:6px}
  .toc li{counter-increment:toc;font-size:13px;color:var(--t2)}
  .toc li::before{content:counter(toc) ".";color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;margin-right:10px}
  .toc li a{color:var(--t2);transition:color .2s}
  .toc li a:hover{color:var(--accent)}
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-inner">
    <div class="tag red">\u26A0 Strategic pivot \u2014 March 6, 2026</div>
    <h1>Caelith Masterplan:<br><em>Fund admins, not fund managers.</em></h1>
    <p class="hero-sub">Everything we assumed about our buyer was wrong. This document revises every assumption, outlines the new strategy, defines kill criteria, and schedules automated execution. Read it once. Refer back often. Every cron job and next step is explained.</p>
  </div>
</div>

<div class="wrap">

<!-- TOC -->
<div class="toc">
  <h3>Contents</h3>
  <ol>
    <li><a href="#assumptions">Assumption Audit \u2014 What we got wrong, what\u2019s unproven, what holds</a></li>
    <li><a href="#target">New Target \u2014 Fund admins & Service-KVGs (the people who actually file)</a></li>
    <li><a href="#credibility">Credibility Gap \u2014 Why no one takes us seriously and how to fix it</a></li>
    <li><a href="#masterplan">5-Phase Masterplan \u2014 Week-by-week execution with owners</a></li>
    <li><a href="#outreach">New Outreach \u2014 Rewritten pitch, email templates, LinkedIn strategy</a></li>
    <li><a href="#cron">Automated Execution \u2014 Every cron job, what it does, when it fires</a></li>
    <li><a href="#metrics">Success Metrics \u2014 What we measure weekly</a></li>
    <li><a href="#kill">Kill Criteria \u2014 When to pivot or stop</a></li>
    <li><a href="#moat">Competitive Moat \u2014 What we own vs. what\u2019s crowded</a></li>
  </ol>
</div>

<!-- ================================================ -->
<!-- 1. ASSUMPTION AUDIT -->
<!-- ================================================ -->
<section id="assumptions">
  <div class="sec-label">Part 1</div>
  <div class="sec-title">Assumption audit</div>
  <p class="sec-sub">Every strategic decision we\u2019ve made was based on assumptions. Some were validated. Some were wrong. Some were never tested. This is the honest accounting.</p>

  <div class="assumption-grid">

    <div class="assumption wrong">
      <h4><span class="verdict wrong">Wrong</span> Fund managers (KVGs) are our primary buyer</h4>
      <p>We assumed KVG Gesch\u00E4ftsf\u00FChrer and compliance officers would buy a compliance tool directly. They don\u2019t. They outsource compliance operations to fund administrators and Service-KVGs. The decision-maker for compliance tooling is the fund admin, not the fund manager.</p>
      <div class="evidence"><strong>Evidence:</strong> Cold outreach to 10+ KVGs produced 1 response: "We outsource these services." Zero demos booked from fund manager outreach. Egor Tarakanov (Montold) responded positively but is a fund admin/service provider, not a fund manager.</div>
      <div class="test"><strong>Revised hypothesis</strong> Fund administrators and Service-KVGs are the primary buyer. They manage compliance for 10\u201350+ funds each. One deal replaces 50 individual KVG outreach attempts.</div>
    </div>

    <div class="assumption risky">
      <h4><span class="verdict risky">Risky</span> The April 16 AIFMD II deadline creates urgency to buy</h4>
      <p>We assumed the deadline would drive purchases. In practice, most AIFMs have been aware of this deadline for 2+ years and have either already prepared (via existing providers) or decided to wait and see. The deadline creates awareness, not conversion.</p>
      <div class="evidence"><strong>Evidence:</strong> Zero purchases driven by deadline urgency. Fund managers who care already have solutions. Those who don\u2019t care won\u2019t be scared into buying from an unknown startup 6 weeks before enforcement.</div>
      <div class="test"><strong>Revised hypothesis</strong> Post-deadline enforcement actions (fines, audit findings) will create more urgency than the deadline itself. The real buying window is Q3\u2013Q4 2026, not Q1. But we need pipeline NOW to convert then.</div>
    </div>

    <div class="assumption risky">
      <h4><span class="verdict risky">Risky</span> Our product is good enough to sell itself via demo</h4>
      <p>The product is technically impressive: XSD validation, GLEIF integration, sanctions screening, audit trail. But "technically impressive" doesn\u2019t matter if the buyer doesn\u2019t trust the vendor. A compliance officer won\u2019t evaluate the product if they don\u2019t believe the company will exist in 12 months.</p>
      <div class="evidence"><strong>Evidence:</strong> Demo login works. Product features are live. Zero demo conversions. The blocker isn\u2019t the product \u2014 it\u2019s the trust gap (see credibility section).</div>
      <div class="test"><strong>Revised hypothesis</strong> The product needs to be experienced in context (pilot with real fund data) by someone who evaluates tools professionally (fund admin ops team), not pitched via cold email to someone who doesn\u2019t evaluate tools (KVG GF).</div>
    </div>

    <div class="assumption wrong">
      <h4><span class="verdict wrong">Wrong</span> Cold email outreach to compliance officers will generate demos</h4>
      <p>We sent emails to KVG compliance officers and Gesch\u00E4ftsf\u00FChrer. Response rate: effectively 0%. Compliance officers at small KVGs don\u2019t open emails from unknown startups. They\u2019re risk-averse by profession. Our email subject line competes with regulatory circulars, not SaaS pitches.</p>
      <div class="evidence"><strong>Evidence:</strong> 10+ cold emails to Tier 1 Immobilien-KVGs. 1 response ("we outsource"). 0 demos. LinkedIn outreach: minimal engagement.</div>
      <div class="test"><strong>Revised hypothesis</strong> Fund admin operations teams evaluate tools as part of their job. Cold email to "Head of Fund Operations" or "Head of Regulatory Reporting" at a fund admin will get a higher response rate than "Compliance Officer" at a KVG. Target: 10\u201315% response rate (vs. ~2% current).</div>
    </div>

    <div class="assumption valid">
      <h4><span class="verdict valid">Valid</span> AIFMD II compliance is painful and manual</h4>
      <p>This is confirmed. Annex IV filing is genuinely manual, error-prone, and time-consuming. The BaFin MVP Portal is clunky. XSD validation is done by hand or not at all. Fund admins hate this process.</p>
      <div class="evidence"><strong>Evidence:</strong> Every industry source confirms this. anevis exists because the problem is real. Montold\u2019s positive response confirms pain. The readiness check engagement (people take it) confirms awareness.</div>
    </div>

    <div class="assumption valid">
      <h4><span class="verdict valid">Valid</span> XSD validation and Annex IV automation have real technical value</h4>
      <p>Our XML generation passes ESMA Rev 6 validation. open-annex-iv is the only open-source Annex IV library. GLEIF integration works in real-time. Sanctions screening runs against 6,863 entities with fuzzy matching. This is real, not vaporware.</p>
      <div class="evidence"><strong>Evidence:</strong> Live demo works. 231 tests passing. XSD validation confirmed against ESMA schema. GLEIF API returns live data. Finch Capital was impressed by the technical demo.</div>
    </div>

    <div class="assumption untested">
      <h4><span class="verdict untested">Untested</span> Fund admins will pay \u20AC200\u2013500/fund/year for filing automation</h4>
      <p>We\u2019ve assumed per-fund pricing works. We haven\u2019t validated this with a single fund admin. They may want flat pricing, seat-based pricing, or volume discounts. The pricing model is entirely theoretical.</p>
      <div class="test"><strong>How to test</strong> In the first 3 fund admin conversations, ask: "If this saved your team 60% of filing time per fund, what would that be worth to you per fund per year?" Don\u2019t pitch a price \u2014 let them anchor first.</div>
    </div>

    <div class="assumption untested">
      <h4><span class="verdict untested">Untested</span> Fund admins will pilot with an unknown startup</h4>
      <p>Fund admins are more pragmatic than fund managers about evaluating tools. But they still need to trust you with sensitive fund data. A 90-day free pilot de-risks this, but we haven\u2019t confirmed anyone will accept even a free pilot.</p>
      <div class="test"><strong>How to test</strong> Offer free pilot to 5 mid-tier fund admins. Success = 1 accepts within 4 weeks. If 0/5 accept, the trust gap exists at the fund admin level too, and we need a different entry point (e.g., open-source adoption first).</div>
    </div>

    <div class="assumption untested">
      <h4><span class="verdict untested">Untested</span> The open-source library creates inbound pipeline</h4>
      <p>open-annex-iv is on npm. But npm downloads \u2260 fund admin leads. The assumption that developers at fund admins will find it, use it, and escalate to their compliance team is unproven. Most fund admin IT teams may not use npm at all.</p>
      <div class="test"><strong>How to test</strong> Track npm downloads weekly. Write 2 technical blog posts targeting fund admin dev teams. If downloads stay &lt;50/week after 4 weeks of promotion, the developer-led growth thesis doesn\u2019t work for this market.</div>
    </div>

    <div class="assumption risky">
      <h4><span class="verdict risky">Risky</span> AML/AMLR is a growth engine for Caelith</h4>
      <p>The AML screening space is dominated by well-funded competitors (Sphinx $7.1M, ComplyAdvantage $100M+, Sumsub $80M). Caelith entering AML as a primary value prop is not viable. However, fund-specific AML screening as a FEATURE inside the compliance platform (not the product) is defensible.</p>
      <div class="evidence"><strong>Evidence:</strong> 5+ AML-focused companies with $200M+ combined funding. AMLR July 2027 creates new AMLA reporting requirements (not yet built by anyone), but the screening layer is commoditized.</div>
      <div class="test"><strong>Revised position</strong> AML screening = table stakes feature. AMLR reporting to AMLA = future opportunity (monitor, don\u2019t build yet). Primary moat = AIFMD II filing pipeline + cross-NCA knowledge.</div>
    </div>

  </div>
</section>

<!-- ================================================ -->
<!-- 2. NEW TARGET -->
<!-- ================================================ -->
<section id="target">
  <div class="sec-label">Part 2</div>
  <div class="sec-title">New target: fund administrators & Service-KVGs</div>
  <p class="sec-sub">The people who actually sit in BaFin\u2019s portal, upload Annex IV XML, and run sanctions screening for 20\u201350 funds at once. One deal here = 50 individual KVG outreach attempts.</p>

  <div class="insight"><strong>The pivot in one sentence:</strong> Stop selling to the person who outsources the problem. Start selling to the person who IS the outsource.</div>

  <table class="target-table">
    <thead>
      <tr><th>Company</th><th>Type</th><th>Tier</th><th>Est. Funds</th><th>Why target</th></tr>
    </thead>
    <tbody>
      <tr><td>Universal Investment</td><td>Fund Admin</td><td><span class="tier-badge t1">Tier 1</span></td><td>~800+ AIFs</td><td>Largest German fund admin. If they adopt, it\u2019s market validation. Hard to crack \u2014 start with a lower-tier contact.</td></tr>
      <tr><td>HANSAINVEST</td><td>Service-KVG</td><td><span class="tier-badge t1">Tier 1</span></td><td>~450+ AIFs</td><td>Signal Iduna group. Large but known to evaluate new tools. Strong regulatory reporting team.</td></tr>
      <tr><td>INTREAL</td><td>Service-KVG</td><td><span class="tier-badge t1">Tier 1</span></td><td>~350+ AIFs</td><td>Independent Service-KVG, focused on third-party fund services. More likely to pilot with startups.</td></tr>
      <tr><td>Hauck Aufh\u00E4user Lampe</td><td>Fund Admin</td><td><span class="tier-badge t1">Tier 1</span></td><td>~200+ AIFs</td><td>Private bank with fund admin arm. Digitalization-focused.</td></tr>
      <tr><td>AXXION</td><td>Service-KVG</td><td><span class="tier-badge t2">Tier 2</span></td><td>~150+ AIFs</td><td>Luxembourg-based, German clients. Mid-size, more agile. Good pilot candidate.</td></tr>
      <tr><td>Caceis (BNP Paribas)</td><td>Fund Admin</td><td><span class="tier-badge t2">Tier 2</span></td><td>~300+ AIFs</td><td>Large but has dedicated German operations. Enterprise sales cycle.</td></tr>
      <tr><td>Ampega</td><td>Service-KVG</td><td><span class="tier-badge t2">Tier 2</span></td><td>~100+ AIFs</td><td>Talanx group. Insurance-adjacent. Regulatory compliance is core to their pitch.</td></tr>
      <tr><td>BayernInvest</td><td>Fund Admin</td><td><span class="tier-badge t2">Tier 2</span></td><td>~80+ AIFs</td><td>BayernLB subsidiary. Regional strength, may value German-built tools.</td></tr>
      <tr><td>Deka</td><td>Service-KVG</td><td><span class="tier-badge t2">Tier 2</span></td><td>~200+ AIFs</td><td>Sparkassen group. Huge but bureaucratic. Long-term target.</td></tr>
      <tr><td>UI Enlyte</td><td>Service-KVG</td><td><span class="tier-badge t2">Tier 2</span></td><td>~50+ AIFs</td><td>Universal Investment spin-off for digital fund services. Innovation-oriented.</td></tr>
      <tr><td>Montold</td><td>Fund Services</td><td><span class="tier-badge t1">Tier 1 \u2014 Warm</span></td><td>~20+ funds</td><td>Egor Tarakanov already responded positively. Warm lead. Pursue immediately.</td></tr>
      <tr><td>IQAM Invest</td><td>Fund Admin</td><td><span class="tier-badge t3">Tier 3</span></td><td>~40+ AIFs</td><td>Austrian, DACH-focused. Smaller = faster decision. Good for early pilot.</td></tr>
      <tr><td>IP Concept</td><td>Service-KVG</td><td><span class="tier-badge t3">Tier 3</span></td><td>~60+ AIFs</td><td>Luxembourg Service-KVG with German clients. Multi-NCA filing is their pain point.</td></tr>
      <tr><td>DONNER & REUSCHEL</td><td>Fund Admin</td><td><span class="tier-badge t3">Tier 3</span></td><td>~30+ AIFs</td><td>Private bank, Hamburg. Small fund admin arm. Approachable.</td></tr>
      <tr><td>Metzler</td><td>Fund Admin</td><td><span class="tier-badge t3">Tier 3</span></td><td>~50+ AIFs</td><td>Oldest German private bank. Conservative but compliance-serious.</td></tr>
    </tbody>
  </table>

  <div class="insight warn"><strong>Priority order:</strong> (1) Montold \u2014 warm lead, pursue THIS WEEK. (2) INTREAL / AXXION \u2014 mid-tier, agile, likely to pilot. (3) HANSAINVEST / UI Enlyte \u2014 larger but innovation-oriented. Don\u2019t start with Universal Investment or Deka \u2014 they\u2019re 6-month enterprise sales cycles.</div>

  <h4 style="font-family:'Sora',sans-serif;font-size:15px;margin:28px 0 12px">Who to contact at each company</h4>
  <p style="font-size:13px;color:var(--t2);line-height:1.7;margin-bottom:20px">Don\u2019t email the CEO. Don\u2019t email "compliance." Find the person whose job is regulatory reporting operations:</p>
  <div class="assumption-grid" style="gap:10px">
    <div class="assumption valid" style="padding:16px 20px">
      <h4 style="font-size:13px">\u2705 Best titles to target</h4>
      <p>Head of Regulatory Reporting \u2022 Head of Fund Operations \u2022 Leiter Meldewesen \u2022 Team Lead AIFMD Reporting \u2022 VP Fund Administration \u2022 Head of Client Reporting \u2022 Director Regulatory Affairs</p>
    </div>
    <div class="assumption wrong" style="padding:16px 20px">
      <h4 style="font-size:13px">\u274C Don\u2019t target</h4>
      <p>CEO / Gesch\u00E4ftsf\u00FChrer (too senior, won\u2019t evaluate tools) \u2022 "Compliance Officer" at KVGs (outsources) \u2022 IT Director (doesn\u2019t feel the pain) \u2022 Sales / BD (wrong department)</p>
    </div>
  </div>
</section>

<!-- ================================================ -->
<!-- 3. CREDIBILITY GAP -->
<!-- ================================================ -->
<section id="credibility">
  <div class="sec-label">Part 3</div>
  <div class="sec-title">The credibility gap \u2014 and how to close it</div>
  <p class="sec-sub">You\u2019re asking compliance professionals to trust their regulatory filings to a company with 11 LinkedIn followers. Here\u2019s exactly what\u2019s missing and how to fix each gap.</p>

  <div class="assumption-grid">
    <div class="assumption risky">
      <h4><span class="verdict risky">Gap 1</span> No legal entity</h4>
      <p>Caelith has no UG or GmbH. Fund admins can\u2019t sign a contract with a Freiberufler for regulatory software. This is a hard blocker for any pilot agreement.</p>
      <div class="test"><strong>Fix (Week 1)</strong> Incorporate UG (haftungsbeschr\u00E4nkt). Cost: ~\u20AC300\u2013500 + notary. Timeline: 2\u20133 weeks to Handelsregister. Do NOT wait for Gr\u00FCndungszuschuss \u2014 BAfA meeting is March 5, ask explicitly if UG registration is compatible.</div>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Gap 2</span> No social proof</h4>
      <p>11 LinkedIn followers. No customer logos. No testimonials. No case studies. No press. A fund admin Googling "Caelith" finds a nice website and nothing else.</p>
      <div class="test"><strong>Fix (Weeks 1\u20134)</strong> (a) Post 3x/week on LinkedIn \u2014 not "AIFMD II deadline" fear content but "fund admin efficiency" value content. (b) Get Montold\u2019s permission to use their name after pilot. (c) Write 2 guest posts on fund admin industry blogs. (d) Aim for 100 LinkedIn followers by Week 4 (currently 11).</div>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Gap 3</span> No advisory board</h4>
      <p>No recognizable names associated with Caelith. A retired BaFin examiner or ex-compliance head on the advisory board gives instant permission to take the meeting.</p>
      <div class="test"><strong>Fix (Weeks 2\u20136)</strong> Identify 3 candidates: (a) retired BaFin/CSSF official, (b) ex-Head of Compliance at a German KVG, (c) fund admin industry veteran. Offer: title + small equity/advisory fee + input on product direction. Ask Finch Capital for introductions.</div>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Gap 4</span> No accelerator / VC backing</h4>
      <p>Campus Founders Batch 4 application is pending. Finch Capital conversation is active. Neither has converted yet. Until one does, you have no institutional signal.</p>
      <div class="test"><strong>Fix (ongoing)</strong> Follow up on Campus Founders. Push Finch Capital conversation toward a term sheet or explicit "no." If both fall through, apply to: EXIST (HTW Berlin contact exists), IBB Berlin, Prototype Fund (April round). One "yes" changes everything.</div>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Gap 5</span> Content doesn\u2019t target the new buyer</h4>
      <p>Current content (landing page, blog, readiness check) targets fund managers. The readiness check asks "is YOUR fund ready?" \u2014 but our buyer is the person who MAKES funds ready. The messaging needs to flip.</p>
      <div class="test"><strong>Fix (Week 2)</strong> Create a "Fund Admin Efficiency Calculator" landing page. Input: number of funds, hours per filing cycle. Output: hours saved with Caelith. This captures fund admin leads and speaks their language.</div>
    </div>
  </div>
</section>

<!-- ================================================ -->
<!-- 4. MASTERPLAN -->
<!-- ================================================ -->
<section id="masterplan">
  <div class="sec-label">Part 4</div>
  <div class="sec-title">5-phase masterplan \u2014 week by week</div>
  <p class="sec-sub">Every phase has a goal, a timeline, specific tasks, and an owner. Julian = human action required. Mate = automated or AI-assisted. Both = collaborative.</p>

  <!-- PHASE 1 -->
  <div class="phase p1">
    <div class="phase-header">
      <div class="phase-num">1</div>
      <div>
        <div class="phase-title">Foundation Reset</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">Stop doing what doesn\u2019t work. Set up what does.</div>
      </div>
      <div class="phase-dates">Mar 7 \u2013 Mar 21</div>
    </div>
    <div class="phase-body">
      <div class="phase-goal">Goal: Legal entity incorporated. Fund admin target list validated. Montold re-engaged. New outreach emails drafted.</div>
      <div class="task-list">
        <div class="task">
          <div class="task-week">Week 1</div>
          <div class="task-content">
            <h5>Incorporate Caelith UG (haftungsbeschr\u00E4nkt)</h5>
            <p>Book notary appointment. Stammkapital: \u20AC1. Register with Handelsregister. Get tax number. Open business bank account. This unblocks every B2B conversation.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 1</div>
          <div class="task-content">
            <h5>Re-engage Montold (Egor Tarakanov)</h5>
            <p>He responded positively. Send follow-up: "We\u2019re building Annex IV filing automation for fund admins. Would you be open to a 15-min call to see if it fits your workflow?" This is your warmest lead.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 1</div>
          <div class="task-content">
            <h5>Build fund admin target list with contacts</h5>
            <p>LinkedIn Sales Navigator: search "Head of Regulatory Reporting" + "Leiter Meldewesen" + "Fund Operations" at the 15 companies listed above. Get 30 names with email addresses.</p>
            <span class="task-owner both">Both</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Mon Mar 10, 09:00 \u2014 Remind Julian to start LinkedIn outreach</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 1</div>
          <div class="task-content">
            <h5>Draft new cold email for fund admins</h5>
            <p>Complete rewrite. Not "AIFMD II compliance platform" but "cut your Annex IV filing time by 60%." See outreach section below for templates.</p>
            <span class="task-owner mate">Mate</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 2</div>
          <div class="task-content">
            <h5>Stop all KVG cold outreach</h5>
            <p>Pause LinkedIn cron for KVG compliance officers. Redirect all outreach energy to fund admin targets. Every email to a KVG GF is a wasted email.</p>
            <span class="task-owner mate">Mate</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Mon Mar 10 \u2014 Disable KVG LinkedIn outreach cron</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 2</div>
          <div class="task-content">
            <h5>LinkedIn content pivot</h5>
            <p>3x/week posts. Topics: "How fund admins can automate Annex IV", "ESMA XSD validation \u2014 common errors", "The real cost of manual regulatory reporting." Tag fund admin companies. Goal: 100 followers by end of Month 1.</p>
            <span class="task-owner both">Both</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Mon/Wed/Fri 08:30 \u2014 LinkedIn post drafts</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 2 -->
  <div class="phase p2">
    <div class="phase-header">
      <div class="phase-num">2</div>
      <div>
        <div class="phase-title">Outreach Blitz</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">30 targeted emails to fund admin operations teams in 2 weeks.</div>
      </div>
      <div class="phase-dates">Mar 21 \u2013 Apr 4</div>
    </div>
    <div class="phase-body">
      <div class="phase-goal">Goal: 30 emails sent. 4\u20135 responses. 2\u20133 demo calls booked. 1 pilot conversation started.</div>
      <div class="task-list">
        <div class="task">
          <div class="task-week">Week 3</div>
          <div class="task-content">
            <h5>Send first batch: 15 emails to Tier 1 + Tier 2 fund admins</h5>
            <p>Personalized emails to Head of Regulatory Reporting / Fund Operations at INTREAL, AXXION, HANSAINVEST, Ampega, BayernInvest, Hauck Aufh\u00E4user Lampe, and others. See email template below.</p>
            <span class="task-owner julian">Julian</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Mon Mar 24, 09:00 \u2014 Outreach batch 1 reminder</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 3</div>
          <div class="task-content">
            <h5>Follow up on Finch Capital</h5>
            <p>The Finch call went well. Push for next step: "Would it be helpful to schedule a follow-up with your fund services partner to validate the fund admin thesis?" Use them as a door opener, not just a funding source.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 4</div>
          <div class="task-content">
            <h5>Send second batch: 15 emails to Tier 2 + Tier 3</h5>
            <p>Broader reach. Include Luxembourg Service-KVGs (IP Concept, AXXION LU office) to test multi-NCA interest.</p>
            <span class="task-owner julian">Julian</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Mon Mar 31, 09:00 \u2014 Outreach batch 2 reminder</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 4</div>
          <div class="task-content">
            <h5>Follow-up emails on non-responses from batch 1</h5>
            <p>One follow-up per non-response. Short: "Just checking if this landed \u2014 happy to share a 2-min demo video instead of a call if that\u2019s easier."</p>
            <span class="task-owner mate">Mate</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Thu Apr 3, 09:00 \u2014 Follow-up reminder</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 4</div>
          <div class="task-content">
            <h5>Build Fund Admin Efficiency Calculator</h5>
            <p>New landing page: "How much time does your team spend on Annex IV?" Input: number of funds, avg hours per filing. Output: hours saved, cost saved, ROI. Captures email for lead gen.</p>
            <span class="task-owner mate">Mate</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 3 -->
  <div class="phase p3">
    <div class="phase-header">
      <div class="phase-num">3</div>
      <div>
        <div class="phase-title">Pilot & Prove</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">Convert 1 demo into a pilot. Prove the product works with real fund data.</div>
      </div>
      <div class="phase-dates">Apr 4 \u2013 May 16</div>
    </div>
    <div class="phase-body">
      <div class="phase-goal">Goal: 1 fund admin running a pilot with 3\u20135 real funds. Filing time reduction measured. Case study in progress.</div>
      <div class="task-list">
        <div class="task">
          <div class="task-week">Week 5\u20136</div>
          <div class="task-content">
            <h5>Run demo calls (target: 2\u20133 calls)</h5>
            <p>Live demo of Annex IV generation, XSD validation, and pre-flight checks. Use real fund structures (with anonymized data if needed). Show the BaFin filing agent concept.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 6\u20137</div>
          <div class="task-content">
            <h5>Offer free 90-day pilot</h5>
            <p>Scope: 3\u20135 funds, full Annex IV cycle, XSD validation, pre-flight checks, sanctions screening. Success metric: "Filing time reduced by 60%+." Zero cost, zero risk for the fund admin.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 7\u201310</div>
          <div class="task-content">
            <h5>Support pilot customer hands-on</h5>
            <p>Weekly check-in calls. Fix any data import issues. Customize Annex IV field mappings for their specific fund structures. This is where the product gets battle-tested.</p>
            <span class="task-owner both">Both</span>
            <span class="task-cron">\uD83D\uDD52 Cron: Every Mon 10:00 during pilot \u2014 Pilot check-in reminder</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 10</div>
          <div class="task-content">
            <h5>Measure and document results</h5>
            <p>Hours saved per filing cycle. Error reduction. XSD validation pass rate. Build into a 1-page case study with the fund admin\u2019s permission.</p>
            <span class="task-owner mate">Mate</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 4 -->
  <div class="phase p4">
    <div class="phase-header">
      <div class="phase-num">4</div>
      <div>
        <div class="phase-title">Convert & Expand</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">Turn the pilot into a paying customer. Use the case study to close 2 more.</div>
      </div>
      <div class="phase-dates">May 16 \u2013 Jul 31</div>
    </div>
    <div class="phase-body">
      <div class="phase-goal">Goal: 1 paying customer. 2 more pilots started. Case study published. \u20AC3\u20136K MRR.</div>
      <div class="task-list">
        <div class="task">
          <div class="task-week">Week 11</div>
          <div class="task-content">
            <h5>Convert pilot to paid contract</h5>
            <p>Pricing: per-fund model (\u20AC200\u2013500/fund/year) or flat monthly (\u20AC990\u20131,990/mo depending on fund count). Let the pilot customer\u2019s feedback inform pricing. Don\u2019t pitch \u2014 ask what they\u2019d pay.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 11\u201312</div>
          <div class="task-content">
            <h5>Publish case study + logo on website</h5>
            <p>"[Fund Admin Name] reduced Annex IV filing time by X% using Caelith." One logo on the website = permission for others to buy.</p>
            <span class="task-owner both">Both</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 12\u201316</div>
          <div class="task-content">
            <h5>Second wave outreach with case study</h5>
            <p>Re-contact all non-responders from Phase 2 with: "Since we last reached out, [Fund Admin] has reduced filing time by X%. Would a 15-min demo be useful?" Social proof changes everything.</p>
            <span class="task-owner both">Both</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Week 16\u201320</div>
          <div class="task-content">
            <h5>Start 2 more pilots</h5>
            <p>Target: Tier 1 fund admins now willing to pilot because a peer is using it. This is the flywheel starting.</p>
            <span class="task-owner julian">Julian</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 5 -->
  <div class="phase p5">
    <div class="phase-header">
      <div class="phase-num">5</div>
      <div>
        <div class="phase-title">Platform Lock-in</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">Become infrastructure that\u2019s hard to replace.</div>
      </div>
      <div class="phase-dates">Aug \u2013 Dec 2026</div>
    </div>
    <div class="phase-body">
      <div class="phase-goal">Goal: 3 paying customers. Multi-NCA support (BaFin + CSSF). API integrations. \u20AC10\u201315K MRR.</div>
      <div class="task-list">
        <div class="task">
          <div class="task-week">Month 6\u20137</div>
          <div class="task-content">
            <h5>CSSF eDesk filing agent</h5>
            <p>70% reusable from BaFin agent. Luxembourg is the #2 fund domicile in EU. Every pan-European fund admin needs both. This is the multi-NCA moat.</p>
            <span class="task-owner both">Both</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Month 7\u20138</div>
          <div class="task-content">
            <h5>API integration with fund admin systems</h5>
            <p>Connect to their portfolio management system for automatic data pull. Once integrated, switching cost is very high. This is the lock-in.</p>
            <span class="task-owner both">Both</span>
          </div>
        </div>
        <div class="task">
          <div class="task-week">Month 8\u201310</div>
          <div class="task-content">
            <h5>White-label option</h5>
            <p>"Powered by Caelith" or fully unbranded. Fund admin offers automated Annex IV filing to their KVG clients as part of their service. The KVG never knows you exist \u2014 and doesn\u2019t need to.</p>
            <span class="task-owner both">Both</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ================================================ -->
<!-- 5. OUTREACH -->
<!-- ================================================ -->
<section id="outreach">
  <div class="sec-label">Part 5</div>
  <div class="sec-title">New outreach \u2014 rewritten for fund admins</div>
  <p class="sec-sub">The old email was: "We automate AIFMD II compliance for fund managers." The new email is: "Your team files Annex IV for 20+ funds. We cut that from 2 weeks to 2 hours per fund."</p>

  <h4 style="font-family:'Sora',sans-serif;font-size:15px;margin-bottom:12px">Email Template A \u2014 Cold outreach (English)</h4>
  <div class="email-tmpl">
    <div class="email-bar">To: <span class="placeholder">[Name]</span> &lt;<span class="placeholder">[email]</span>&gt; \u2014 Subject: Annex IV filing for <span class="placeholder">[X]</span> funds \u2014 automation question</div>
    <div class="email-body">Hi <span class="placeholder">[First Name]</span>,

I\u2019m building a tool that automates Annex IV XML generation with full ESMA XSD validation. Curious if this is relevant for your team at <span class="placeholder">[Company]</span>.

Quick context: we generate XSD-validated Annex IV XML (ESMA Rev 6 v1.2), run pre-flight checks (LEI verification via GLEIF, sanctions screening, field completeness), and produce an audit trail for every filing.

For a team managing <span class="placeholder">[X]</span>+ funds, this typically cuts filing prep from days to hours per fund.

Would a 15-minute demo be useful? Happy to show it on a real fund structure.

Best,
Julian Laycock
Caelith \u2014 caelith.tech</div>
  </div>

  <h4 style="font-family:'Sora',sans-serif;font-size:15px;margin:24px 0 12px">Email Template B \u2014 Cold outreach (German)</h4>
  <div class="email-tmpl">
    <div class="email-bar">An: <span class="placeholder">[Name]</span> &lt;<span class="placeholder">[email]</span>&gt; \u2014 Betreff: Annex IV-Meldungen f\u00FCr <span class="placeholder">[X]</span> Fonds \u2014 Automatisierung</div>
    <div class="email-body">Hallo <span class="placeholder">[Vorname]</span>,

ich entwickle ein Tool, das die Annex IV XML-Erstellung inkl. vollst\u00E4ndiger ESMA-XSD-Validierung automatisiert. Ist das f\u00FCr Ihr Team bei <span class="placeholder">[Firma]</span> relevant?

Kurz zum Hintergrund: Wir generieren XSD-validierte Annex IV XML (ESMA Rev 6 v1.2), f\u00FChren Pre-Flight-Checks durch (LEI-Verifizierung via GLEIF, Sanktionspr\u00FCfung, Feldvollst\u00E4ndigkeit) und erstellen einen l\u00FCckenlosen Audit Trail pro Meldung.

F\u00FCr ein Team, das <span class="placeholder">[X]</span>+ Fonds betreut, reduziert das den Meldeaufwand typischerweise von Tagen auf Stunden pro Fonds.

H\u00E4tten Sie Interesse an einer 15-min\u00FCtigen Demo? Gerne zeige ich das an einer realen Fondsstruktur.

Beste Gr\u00FC\u00DFe,
Julian Laycock
Caelith \u2014 caelith.tech</div>
  </div>

  <h4 style="font-family:'Sora',sans-serif;font-size:15px;margin:24px 0 12px">Follow-up Template (Day 5)</h4>
  <div class="email-tmpl">
    <div class="email-bar">Re: Annex IV filing for <span class="placeholder">[X]</span> funds \u2014 automation question</div>
    <div class="email-body">Hi <span class="placeholder">[First Name]</span>,

Just checking if this landed. Happy to share a 2-min video walkthrough instead of a call if that\u2019s easier \u2014 just say the word.

Julian</div>
  </div>

  <div class="insight"><strong>Key differences from old outreach:</strong> (1) No "AIFMD II compliance platform" \u2014 too vague. (2) Specific technical value: "XSD validation," "GLEIF LEI verification." (3) Speaks the fund admin\u2019s language: "funds you manage," "filing prep," "per fund." (4) Low commitment ask: 15 minutes, not "book a demo." (5) Offers video alternative for people who don\u2019t want a call.</div>
</section>

<!-- ================================================ -->
<!-- 6. CRON JOBS -->
<!-- ================================================ -->
<section id="cron">
  <div class="sec-label">Part 6</div>
  <div class="sec-title">Automated execution \u2014 every scheduled cron job</div>
  <p class="sec-sub">These cron jobs are set up in OpenClaw and fire at the specified times. Each one either reminds Julian to act, generates content, or checks progress. All times are CET.</p>

  <div class="cron-grid">
    <div class="cron-item">
      <div class="cron-schedule">Mon Mar 10, 09:00</div>
      <div class="cron-desc"><strong>Fund admin outreach kickoff</strong> \u2014 Remind Julian to start LinkedIn research for fund admin contacts. Include link to this masterplan and the target list.</div>
      <div class="cron-channel">#dev</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Mon Mar 10, 09:00</div>
      <div class="cron-desc"><strong>Disable KVG outreach cron</strong> \u2014 Turn off the existing LinkedIn outreach cron that targets KVG compliance officers. Redirect energy to fund admins.</div>
      <div class="cron-channel">system</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Mon/Wed/Fri 08:30</div>
      <div class="cron-desc"><strong>LinkedIn content drafts</strong> \u2014 Draft a LinkedIn post for Julian on fund admin efficiency topics. Mon: industry insight. Wed: product feature highlight. Fri: regulatory update.</div>
      <div class="cron-channel">#outreach</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Mon Mar 24, 09:00</div>
      <div class="cron-desc"><strong>Outreach batch 1 reminder</strong> \u2014 Remind Julian to send first 15 emails to Tier 1+2 fund admins. Include email templates and contact list.</div>
      <div class="cron-channel">#dev</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Mon Mar 31, 09:00</div>
      <div class="cron-desc"><strong>Outreach batch 2 reminder</strong> \u2014 Send second batch of 15 emails to Tier 2+3 fund admins + Luxembourg targets.</div>
      <div class="cron-channel">#dev</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Thu Apr 3, 09:00</div>
      <div class="cron-desc"><strong>Follow-up on batch 1 non-responses</strong> \u2014 Draft follow-up emails for anyone who didn\u2019t respond to batch 1. Use the short follow-up template.</div>
      <div class="cron-channel">#outreach</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Every Mon 10:00</div>
      <div class="cron-desc"><strong>Weekly pipeline review</strong> \u2014 Check outreach tracker, count responses, demos booked, pilot conversations. Post summary to #dev. Compare against targets.</div>
      <div class="cron-channel">#dev</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Every Fri 17:00</div>
      <div class="cron-desc"><strong>Weekly strategy check</strong> \u2014 Review this masterplan\u2019s current phase. Are we on track? Any assumptions invalidated this week? Flag if kill criteria approaching.</div>
      <div class="cron-channel">#dev</div>
    </div>
    <div class="cron-item">
      <div class="cron-schedule">Sat Mar 15, 10:00</div>
      <div class="cron-desc"><strong>Plausible analytics reminder</strong> \u2014 Check if Plausible is installed and tracking correctly on caelith.tech. Review traffic sources.</div>
      <div class="cron-channel">#dev</div>
    </div>
  </div>

  <div class="insight"><strong>How the crons work:</strong> Each cron fires at the scheduled time and posts to the specified Discord channel. Some are reminders for Julian to act (he sees them in Discord). Others are automated tasks Mate executes independently (content drafts, pipeline reviews). Julian can reply to any cron post to adjust or skip.</div>
</section>

<!-- ================================================ -->
<!-- 7. METRICS -->
<!-- ================================================ -->
<section id="metrics">
  <div class="sec-label">Part 7</div>
  <div class="sec-title">Success metrics \u2014 what we track weekly</div>
  <p class="sec-sub">If you can\u2019t measure it, you can\u2019t manage it. These are the 8 numbers that matter, tracked every Monday morning.</p>

  <div class="metric-row">
    <div class="metric"><div class="val">30</div><div class="lbl">Emails sent (cumulative)</div></div>
    <div class="metric"><div class="val">4\u20135</div><div class="lbl">Responses (target)</div></div>
    <div class="metric"><div class="val">2\u20133</div><div class="lbl">Demos booked (target)</div></div>
    <div class="metric"><div class="val">1</div><div class="lbl">Pilot started (target)</div></div>
  </div>
  <div class="metric-row">
    <div class="metric"><div class="val">100</div><div class="lbl">LinkedIn followers (Month 1)</div></div>
    <div class="metric"><div class="val">12</div><div class="lbl">LinkedIn posts (Month 1)</div></div>
    <div class="metric"><div class="val">50+</div><div class="lbl">npm downloads/week</div></div>
    <div class="metric"><div class="val">1</div><div class="lbl">Advisory board member</div></div>
  </div>

  <div class="insight warn"><strong>Red flags to watch for:</strong> If after 30 emails you have &lt;2 responses, the email isn\u2019t working \u2014 rewrite it. If after 3 demos you have 0 pilot interest, the product doesn\u2019t solve the problem they have \u2014 pivot the value prop. If after 100 days you have 0 paying customers, read the kill criteria below.</div>
</section>

<!-- ================================================ -->
<!-- 8. KILL CRITERIA -->
<!-- ================================================ -->
<section id="kill">
  <div class="sec-label">Part 8</div>
  <div class="sec-title">Kill criteria \u2014 when to pivot or stop</div>
  <p class="sec-sub">Every startup needs pre-defined exit conditions. These aren\u2019t pessimism \u2014 they\u2019re discipline. If we hit these thresholds, we stop, reassess, and decide whether to pivot the approach or pivot the company.</p>

  <div class="kill-grid">
    <div class="kill-card red">
      <h4>\u274C Hard kill: 0 pilots by June 30</h4>
      <p>If after 4 months of fund admin outreach (30+ emails, content marketing, LinkedIn effort), zero fund admins have agreed to even a free pilot, the market is not ready for this product from this company. Options: (a) pivot to pure open-source + consulting, (b) find a co-founder with fund admin industry connections, (c) wind down and preserve remaining runway.</p>
    </div>
    <div class="kill-card red">
      <h4>\u274C Hard kill: 0 revenue by September 30</h4>
      <p>If a pilot converts but can\u2019t convert to paid, or if all pilots stall, the product has usage but not purchase intent. Options: (a) change pricing model dramatically (freemium?), (b) pivot to infrastructure-only (API licensing), (c) open-source everything and monetize via services.</p>
    </div>
    <div class="kill-card yellow">
      <h4>\u26A0 Soft pivot: &lt;5% email response rate after 30 emails</h4>
      <p>If fund admins don\u2019t respond either, the problem isn\u2019t the buyer segment \u2014 it\u2019s the channel or the message. Actions: (a) try LinkedIn DMs instead of email, (b) try industry events/conferences, (c) try channel partners (compliance consultants who serve fund admins).</p>
    </div>
    <div class="kill-card yellow">
      <h4>\u26A0 Soft pivot: Pilot customer doesn\u2019t see value</h4>
      <p>If the pilot runs and the fund admin says "nice but we\u2019ll stick with Excel" \u2014 the product doesn\u2019t solve a painful enough problem. Actions: (a) double down on the pain point they DO have (maybe it\u2019s not Annex IV but sanctions screening?), (b) add BaFin portal submission to make it end-to-end, (c) rebuild for a different workflow.</p>
    </div>
  </div>
</section>

<!-- ================================================ -->
<!-- 9. COMPETITIVE MOAT -->
<!-- ================================================ -->
<section id="moat">
  <div class="sec-label">Part 9</div>
  <div class="sec-title">Competitive moat \u2014 what we own vs. what\u2019s crowded</div>
  <p class="sec-sub">Not everything is defensible. Here\u2019s an honest map of where Caelith has a moat, where it\u2019s competing on commodity ground, and where it shouldn\u2019t compete at all.</p>

  <div class="assumption-grid">
    <div class="assumption valid">
      <h4><span class="verdict valid">Moat</span> AIFMD II Annex IV filing pipeline</h4>
      <p>XSD-validated XML generation against ESMA Rev 6. open-annex-iv on npm. Nobody else has an open-source Annex IV library. The filing pipeline (data \u2192 validation \u2192 XML \u2192 portal submission) is technically complex and domain-specific. anevis is the only real competitor, and they\u2019re enterprise/managed service, not self-service/mid-market.</p>
    </div>
    <div class="assumption valid">
      <h4><span class="verdict valid">Moat</span> Cross-NCA knowledge</h4>
      <p>BaFin MVP Portal, CSSF eDesk, AMF GECO \u2014 different portals, different requirements, different deadlines. This knowledge takes months to build and requires deep regulatory expertise to maintain. Every new NCA we support widens the moat.</p>
    </div>
    <div class="assumption valid">
      <h4><span class="verdict valid">Moat</span> Open-source community positioning</h4>
      <p>open-annex-iv is the ONLY open-source Annex IV toolkit. NGI Zero grant application submitted. If adopted by developers at fund admins, it creates gravity toward the commercial product. This is unique \u2014 no competitor has an open-source strategy.</p>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Commodity</span> Sanctions screening</h4>
      <p>Fuzzy matching against EU/UN sanctions lists is a feature, not a product. ComplyAdvantage, Refinitiv, LexisNexis all do this better. Our screening is good enough as a bundled feature but cannot be a standalone selling point.</p>
    </div>
    <div class="assumption risky">
      <h4><span class="verdict risky">Commodity</span> LEI verification</h4>
      <p>GLEIF API is public. Anyone can query it. Our value is integrating it into the filing workflow (auto-verify before XML generation), not the lookup itself.</p>
    </div>
    <div class="assumption wrong">
      <h4><span class="verdict wrong">Don\u2019t compete</span> AML/KYC as primary product</h4>
      <p>Sphinx ($7.1M), ComplyAdvantage ($100M+), Sumsub ($80M), Onfido (acquired). Entering this space as a primary value prop is suicide. Keep AML as a feature. Don\u2019t build an AML product.</p>
    </div>
    <div class="assumption wrong">
      <h4><span class="verdict wrong">Don\u2019t compete</span> General compliance dashboard</h4>
      <p>AI commoditizes dashboards. We built ours in 10 days. Anyone can build a compliance dashboard with Claude/GPT. The dashboard is a delivery mechanism, not the moat. Infrastructure (filing pipelines, XSD validation, NCA portal agents) is the moat.</p>
    </div>
  </div>

  <div class="insight"><strong>The one-sentence moat:</strong> Caelith is the only company that can take fund data in, validate it against ESMA XSD, and submit it directly to BaFin/CSSF/AMF \u2014 with an open-source schema library creating developer gravity. Everything else is a feature that supports this pipeline.</div>
</section>

</div><!-- /wrap -->

<div class="footer">
  <strong>Caelith Strategic Masterplan</strong> \u2014 Created March 6, 2026<br>
  <span style="margin-top:8px;display:block">Review weekly. Update monthly. Kill if criteria met. Execute relentlessly until then.</span>
</div>

</body>
</html>`;

writeFileSync('C:/Users/julia/openclaw-workspace/research/caelith-masterplan-q2-2026.html', html, 'utf8');
console.log('Written: research/caelith-masterplan-q2-2026.html');
console.log('Size:', Math.round(html.length / 1024), 'KB');
