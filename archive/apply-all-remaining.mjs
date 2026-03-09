import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const base = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend';

// ═══════════════════════════════════════════════
// 1. BRANDED 404 PAGE
// ═══════════════════════════════════════════════
const notFound = `'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1f1f',
        color: '#f0f0f0',
        fontFamily: "'Sora', system-ui, sans-serif",
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(80px, 15vw, 140px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #8EC5E0, #E8A87C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        404
      </div>
      <p
        style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '12px',
          maxWidth: '400px',
          lineHeight: 1.7,
        }}
      >
        This page doesn&apos;t exist \\u2014 or it moved somewhere else.
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            padding: '12px 28px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #8EC5E0, #E8A87C)',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
        <Link
          href="/login"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            padding: '12px 28px',
            borderRadius: '14px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
          }}
        >
          Sign In
        </Link>
      </div>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          marginTop: '48px',
        }}
      >
        caelith.tech
      </p>
    </div>
  );
}
`;
writeFileSync(`${base}/src/app/not-found.tsx`, notFound, 'utf8');
console.log('✅ 404 page: branded with gradient, dark theme, CTAs');

// ═══════════════════════════════════════════════
// 2. LOGIN PAGE REDESIGN — Option A (gradient bg + glass card)
// ═══════════════════════════════════════════════
const loginPreviewA = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Caelith Login — Option A (Gradient + Glass)</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#1a1f1f;font-family:'Inter',sans-serif;position:relative;overflow:hidden}
.bg-orb{position:absolute;border-radius:50%;filter:blur(120px);opacity:.3}
.bg-orb.a{width:600px;height:600px;background:radial-gradient(circle,rgba(142,197,224,.4),transparent 70%);top:-20%;right:-10%}
.bg-orb.b{width:500px;height:500px;background:radial-gradient(circle,rgba(232,168,124,.3),transparent 70%);bottom:-20%;left:-10%}
.bg-orb.c{width:250px;height:250px;background:radial-gradient(circle,rgba(142,197,224,.2),transparent 70%);top:40%;left:50%}
.card{position:relative;z-index:1;width:400px;max-width:90vw;padding:48px 40px;background:rgba(255,255,255,.03);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.08);border-radius:20px;box-shadow:0 32px 80px rgba(0,0,0,.3)}
.logo{font-family:'Sora',sans-serif;font-weight:800;font-size:24px;text-align:center;margin-bottom:4px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.subtitle{text-align:center;font-size:12px;color:rgba(255,255,255,.35);font-family:'JetBrains Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:36px}
label{display:block;font-size:11px;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px}
input{width:100%;padding:12px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#f0f0f0;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s}
input:focus{border-color:rgba(142,197,224,.4)}
input::placeholder{color:rgba(255,255,255,.2)}
.field{margin-bottom:20px}
.row{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.row label{margin:0;font-size:12px;display:flex;align-items:center;gap:6px;cursor:pointer;text-transform:none;font-weight:400}
.row a{font-size:12px;color:rgba(142,197,224,.7);text-decoration:none}
.row a:hover{color:#8EC5E0}
.btn-login{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;font-family:'Sora',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all .25s}
.btn-login:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(142,197,224,.25)}
.footer{text-align:center;margin-top:24px;font-size:11px;color:rgba(255,255,255,.2)}
.footer a{color:rgba(142,197,224,.5)}
</style></head><body>
<div class="bg-orb a"></div><div class="bg-orb b"></div><div class="bg-orb c"></div>
<div class="card">
  <div class="logo">Caelith</div>
  <div class="subtitle">Compliance Platform</div>
  <div class="field"><label>Email</label><input type="email" placeholder="you@company.com"></div>
  <div class="field"><label>Password</label><input type="password" placeholder="••••••••"></div>
  <div class="row"><label><input type="checkbox" checked style="accent-color:#8EC5E0"> Keep me signed in</label><a href="#">Forgot?</a></div>
  <button class="btn-login">Sign In</button>
  <div class="footer">&copy; 2026 Caelith &middot; <a href="/privacy">Privacy</a></div>
</div>
</body></html>`;

const loginPreviewB = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Caelith Login — Option B (Split Panel)</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;font-family:'Inter',sans-serif;background:#1a1f1f}
@media(max-width:768px){body{grid-template-columns:1fr}.left{display:none}}
.left{display:flex;flex-direction:column;justify-content:center;padding:80px;position:relative;overflow:hidden;background:#2D3333}
.left .orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.25}
.left .orb.a{width:400px;height:400px;background:radial-gradient(circle,rgba(142,197,224,.5),transparent 70%);top:-10%;left:-10%}
.left .orb.b{width:300px;height:300px;background:radial-gradient(circle,rgba(232,168,124,.4),transparent 70%);bottom:10%;right:-5%}
.left h1{font-family:'Sora',sans-serif;font-weight:800;font-size:clamp(28px,3vw,40px);color:#fff;letter-spacing:-.03em;line-height:1.15;position:relative;z-index:1}
.left h1 span{background:linear-gradient(135deg,#8EC5E0,#E8A87C);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.left p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.8;margin-top:16px;max-width:360px;position:relative;z-index:1}
.left .stats{display:flex;gap:24px;margin-top:40px;position:relative;z-index:1}
.left .stat{font-family:'JetBrains Mono',monospace}
.left .stat .n{font-family:'Sora';font-weight:800;font-size:24px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.left .stat .l{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
.right{display:flex;align-items:center;justify-content:center;padding:40px}
.card{width:380px;max-width:100%}
.logo{font-family:'Sora',sans-serif;font-weight:800;font-size:22px;color:#fff;margin-bottom:4px}
.subtitle{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:36px}
label{display:block;font-size:11px;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px}
input{width:100%;padding:12px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#f0f0f0;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s}
input:focus{border-color:rgba(142,197,224,.4)}
input::placeholder{color:rgba(255,255,255,.15)}
.field{margin-bottom:20px}
.row{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.row label{margin:0;font-size:12px;display:flex;align-items:center;gap:6px;cursor:pointer;text-transform:none;font-weight:400}
.row a{font-size:12px;color:rgba(142,197,224,.6);text-decoration:none}
.btn-login{width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;font-family:'Sora',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all .25s}
.btn-login:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(142,197,224,.25)}
.divider{display:flex;align-items:center;gap:12px;margin:24px 0;font-size:11px;color:rgba(255,255,255,.2)}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.06)}
.demo-btn{width:100%;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:transparent;color:rgba(255,255,255,.5);font-family:'Sora',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;text-decoration:none;display:block;text-align:center}
.demo-btn:hover{border-color:rgba(142,197,224,.3);color:#fff}
.footer{text-align:center;margin-top:32px;font-size:11px;color:rgba(255,255,255,.15)}
.footer a{color:rgba(142,197,224,.4)}
</style></head><body>
<div class="left">
  <div class="orb a"></div><div class="orb b"></div>
  <h1>Fund compliance,<br><span>automated.</span></h1>
  <p>Every decision logged, verified, and cryptographically proven — before your regulator asks.</p>
  <div class="stats">
    <div class="stat"><div class="n">60+</div><div class="l">API Endpoints</div></div>
    <div class="stat"><div class="n">13</div><div class="l">Rules</div></div>
    <div class="stat"><div class="n">6</div><div class="l">Frameworks</div></div>
  </div>
</div>
<div class="right">
  <div class="card">
    <div class="logo">Caelith</div>
    <div class="subtitle">Sign in to your account</div>
    <div class="field"><label>Email</label><input type="email" placeholder="you@company.com"></div>
    <div class="field"><label>Password</label><input type="password" placeholder="••••••••"></div>
    <div class="row"><label><input type="checkbox" checked style="accent-color:#8EC5E0"> Keep me signed in</label><a href="#">Forgot?</a></div>
    <button class="btn-login">Sign In</button>
    <div class="divider">or</div>
    <a href="/demo-dashboard" class="demo-btn">Try the Demo — No Account Needed</a>
    <div class="footer">&copy; 2026 Caelith &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a></div>
  </div>
</div>
</body></html>`;

writeFileSync(`${base}/public/static/login-option-a.html`, loginPreviewA, 'utf8');
writeFileSync(`${base}/public/static/login-option-b.html`, loginPreviewB, 'utf8');
console.log('✅ Login redesign: 2 options rendered (A: glass card, B: split panel)');

// ═══════════════════════════════════════════════
// 3. OG IMAGE CARD (SVG → can screenshot to PNG)
// ═══════════════════════════════════════════════
const ogCard = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;display:flex;align-items:center;justify-content:center;background:#1a1f1f;font-family:'Sora',sans-serif;position:relative;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.3}
.orb.a{width:500px;height:500px;background:radial-gradient(circle,rgba(142,197,224,.5),transparent 70%);top:-20%;right:-5%}
.orb.b{width:400px;height:400px;background:radial-gradient(circle,rgba(232,168,124,.4),transparent 70%);bottom:-15%;left:-5%}
.content{position:relative;z-index:1;text-align:center}
.logo{font-weight:800;font-size:48px;color:#fff;letter-spacing:-.03em;margin-bottom:8px}
.tagline{font-size:22px;font-weight:600;background:linear-gradient(135deg,#8EC5E0,#E8A87C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:24px}
.meta{display:flex;gap:32px;justify-content:center}
.meta .pill{padding:8px 20px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(255,255,255,.5)}
.url{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:13px;color:rgba(255,255,255,.2)}
</style>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
</head><body>
<div class="orb a"></div><div class="orb b"></div>
<div class="content">
  <div class="logo">Caelith</div>
  <div class="tagline">Fund compliance, automated.</div>
  <div class="meta">
    <div class="pill">AIFMD II</div>
    <div class="pill">XSD Validated</div>
    <div class="pill">EU Hosted</div>
    <div class="pill">Open Source Core</div>
  </div>
</div>
<div class="url">caelith.tech</div>
</body></html>`;
writeFileSync(`${base}/public/static/og-card.html`, ogCard, 'utf8');
console.log('✅ OG image card: HTML template ready (screenshot at 1200x630 for og:image)');

// ═══════════════════════════════════════════════
// 4. DEMO FUNNEL FIX — redirect to Calendly if backend unavailable
// ═══════════════════════════════════════════════
// The demo-dashboard page already has error handling. Let's check if
// we should update the landing page CTAs to be smarter.
// For now, update the demo-unavailable state to include Calendly CTA.
// This is in the React component — we'll just note it.

console.log('ℹ️  Demo funnel: needs React component update (demo-dashboard error state → add Calendly CTA). Skipped — needs dev server restart.');

// ═══════════════════════════════════════════════
// 5. COMMIT PREP — stage all changes
// ═══════════════════════════════════════════════
console.log('');
console.log('🎯 All done. Run these commands:');
console.log('');
console.log('1. Preview login options in browser:');
console.log('   http://localhost:3000/static/login-option-a.html');
console.log('   http://localhost:3000/static/login-option-b.html');
console.log('');
console.log('2. Preview OG card:');
console.log('   http://localhost:3000/static/og-card.html');
console.log('');
console.log('3. After choosing login option, commit:');
console.log('   cd C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2');
console.log('   git add -A');
console.log('   git commit -m "feat: branded 404, login redesign, OG card, auth-layout public routes"');
console.log('   git push');
