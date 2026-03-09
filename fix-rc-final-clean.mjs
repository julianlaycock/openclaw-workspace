/**
 * Clean reapplication of ALL readiness check fixes using Node.js only.
 * Never use PowerShell Set-Content or Get-Content for this file.
 * Always use [System.IO.File]::WriteAllText or Node.js fs with utf8.
 */
import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let c = readFileSync(p, 'utf8');

// Pre-flight: verify no mojibake
const hasMojibake = c.includes('\u00e2\u20ac') || c.includes('Ã');
console.log('Pre-flight mojibake check:', hasMojibake ? '❌ CORRUPTED - abort' : '✅ clean');
if (hasMojibake) {
  console.error('File is corrupted. Run: git checkout a0cbf83b -- src/frontend/src/app/api/readiness-check/route.ts first');
  process.exit(1);
}

let changes = [];

// ── 1. Lang toggle CSS — match landing page minimal style ──
const oldToggleLine = '.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;background:rgba(26,31,31,0.65);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;overflow:hidden}';
const newToggleLine = '.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;align-items:center;gap:2px;background:rgba(26,31,31,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;padding:4px}';

if (c.includes(oldToggleLine)) {
  c = c.replace(oldToggleLine, newToggleLine);
  changes.push('1a. lang-toggle CSS updated');
} else {
  console.log('⚠️  lang-toggle CSS not found (may already be applied)');
}

const oldBtnCss = ".lang-btn{padding:8px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;border:none;background:transparent;color:var(--text3);cursor:pointer;transition:all .2s;min-height:44px;min-width:44px;display:flex;align-items:center;justify-content:center}";
const newBtnCss = ".lang-btn{padding:5px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;border:none;background:transparent;color:rgba(255,255,255,0.4);cursor:pointer;transition:all .2s;border-radius:999px;line-height:1}";

if (c.includes(oldBtnCss)) {
  c = c.replace(oldBtnCss, newBtnCss);
  changes.push('1b. lang-btn CSS updated');
} else {
  console.log('⚠️  lang-btn CSS not found (may already be applied)');
}

const oldActiveCss = '.lang-btn.active{background:var(--grad);color:var(--bg);-webkit-text-fill-color:var(--bg)}';
const newActiveCss = '.lang-btn.active{background:rgba(255,255,255,0.12);color:#fff}';

if (c.includes(oldActiveCss)) {
  c = c.replace(oldActiveCss, newActiveCss);
  changes.push('1c. lang-btn.active CSS updated');
} else {
  console.log('\u26a0\ufe0f  lang-btn.active CSS not found');
}

// ── 2. Replace Final CTA with email gate ──
// Find the CTA block boundaries
const ctaMarker = '// Final CTA \u2014 recommended next steps + remediation plan';
const ctaEnd = '  // Disclaimer';
const ctaStart = c.indexOf(ctaMarker);
const ctaEndIdx = c.indexOf(ctaEnd, ctaStart);

if (ctaStart === -1) {
  console.log('\u274c CTA marker not found');
  process.exit(1);
}

const emailGate = `  // Email gate CTA — user submits email to receive free personalised assessment
  html += '<div class="final-cta" style="margin-top:48px;border-top:1px solid var(--border);padding-top:48px;text-align:center">';
  html += '<div style="display:inline-block;width:100%;max-width:540px;text-align:left;background:linear-gradient(135deg,rgba(142,197,224,0.08),rgba(232,168,124,0.06));border:1px solid rgba(142,197,224,0.2);border-radius:16px;padding:32px">';
  // Badge
  html += '<div id="gate-badge" style="font-family:JetBrains Mono,monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#8EC5E0;margin-bottom:12px;display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#8EC5E0;animation:pulse 2s infinite"></span>' + (lang === 'de' ? 'Ihr pers\u00f6nliches Assessment bereit' : 'Your personalised assessment is ready') + '</div>';
  // Headline
  html += '<h3 id="gate-headline" style="font-family:Sora,sans-serif;font-weight:700;font-size:22px;color:#fff;margin-bottom:10px;line-height:1.3">' + (lang === 'de' ? 'Erhalten Sie Ihren kostenlosen Sanierungsplan' : 'Get your free personalised remediation plan') + '</h3>';
  // Sub-copy
  html += '<p id="gate-copy" style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:24px;line-height:1.7">' + (lang === 'de' ? 'Wir erstellen einen ma\u00dfgeschneiderten Plan f\u00fcr jede Ihrer L\u00fccken \u2014 mit konkreten BaFin-Anforderungen und Fristen.' : 'We\\'ll create a tailored step-by-step plan for each of your gaps \u2014 with exact BaFin requirements, deadlines, and how Caelith automates each one.') + '</p>';
  // Email form
  html += '<form id="gate-form" onsubmit="submitGate(event)" style="display:flex;flex-direction:column;gap:10px">';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  html += '<input id="gate-email" type="email" required placeholder="' + (lang === 'de' ? 'ihre@email.de' : 'your@email.com') + '" style="flex:1;min-width:180px;padding:12px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-family:JetBrains Mono,monospace;font-size:13px;outline:none;transition:border .2s" onfocus="this.style.borderColor=\\'rgba(142,197,224,0.5)\\'" onblur="this.style.borderColor=\\'rgba(255,255,255,0.15)\\'" />';
  html += '<button type="submit" id="gate-submit" style="padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:13px;border:none;cursor:pointer;white-space:nowrap;transition:opacity .2s" onmouseover="this.style.opacity=\\'0.85\\'" onmouseout="this.style.opacity=\\'1\\'">' + (lang === 'de' ? 'Kostenlosen Plan anfordern \u2192' : 'Get my free plan \u2192') + '</button>';
  html += '</div>';
  html += '<p style="font-size:11px;color:rgba(255,255,255,0.3);margin:0">' + (lang === 'de' ? 'Kein Spam. Nur Ihr pers\u00f6nlicher AIFMD-II-Bericht.' : 'No spam. Just your personalised AIFMD II report.') + '</p>';
  html += '</form>';
  // Success state
  html += '<div id="gate-success" style="display:none;padding-top:4px">';
  html += '<div style="font-size:24px;margin-bottom:10px">\u2705</div>';
  html += '<p style="font-size:15px;font-weight:600;color:#fff;margin-bottom:6px">' + (lang === 'de' ? 'Ihr Plan wird vorbereitet!' : 'Your plan is on its way!') + '</p>';
  html += '<p style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px">' + (lang === 'de' ? 'Wir melden uns in K\u00fcrze. Buchen Sie jetzt Ihren Call:' : 'We\\'ll be in touch shortly. Book a call now for immediate support:') + '</p>';
  html += '<div style="display:flex;gap:10px;flex-wrap:wrap">';
  html += '<a href="https://calendly.com/julian-laycock-caelith/30min" target="_blank" rel="noopener" style="font-family:Sora,sans-serif;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:opacity .2s" onmouseover="this.style.opacity=\\'0.85\\'" onmouseout="this.style.opacity=\\'1\\'">' + (lang === 'de' ? '15-Min. Demo buchen \u2192' : 'Book a 15-Min Demo \u2192') + '</a>';
  html += '<a href="/demo-dashboard" style="font-family:Sora,sans-serif;font-weight:600;font-size:13px;padding:12px 24px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:all .2s" onmouseover="this.style.borderColor=\\'rgba(255,255,255,0.35)\\';this.style.color=\\'#fff\\'" onmouseout="this.style.borderColor=\\'rgba(255,255,255,0.15)\\';this.style.color=\\'rgba(255,255,255,0.8)\\'">' + (lang === 'de' ? 'Demo ausprobieren' : 'Try Demo') + '</a>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

`;

c = c.substring(0, ctaStart) + emailGate + c.substring(ctaEndIdx);
changes.push('2. Email gate CTA replaced');

// ── 3. Add submitGate() JS function before </script> ──
const gateJS = `
// Email gate submission
function submitGate(e) {
  e.preventDefault();
  var email = document.getElementById('gate-email').value.trim();
  if (!email) return;
  var btn = document.getElementById('gate-submit');
  btn.disabled = true;
  btn.textContent = '...';
  localStorage.setItem('rc_email', email);
  localStorage.setItem('rc_score', window.__readinessScore || 0);
  fetch('/api/leads', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, source: 'readiness_check', score: window.__readinessScore || null, lang: lang})
  }).catch(function(){});
  setTimeout(function() {
    document.getElementById('gate-form').style.display = 'none';
    document.getElementById('gate-badge').style.display = 'none';
    document.getElementById('gate-headline').style.display = 'none';
    document.getElementById('gate-copy').style.display = 'none';
    document.getElementById('gate-success').style.display = 'block';
  }, 400);
}`;

const scriptCloseIdx = c.lastIndexOf('</script>');
if (scriptCloseIdx > -1) {
  c = c.substring(0, scriptCloseIdx) + gateJS + '\n' + c.substring(scriptCloseIdx);
  changes.push('3. submitGate() JS function added');
}

// ── Write with explicit UTF-8 no-BOM ──
writeFileSync(p, c, { encoding: 'utf8' });
console.log('\nChanges applied:');
changes.forEach(ch => console.log(' \u2705', ch));

// ── Post-flight checks ──
console.log('\n=== POST-FLIGHT ===');
const v = readFileSync(p, 'utf8');
console.log('Mojibake check:', v.includes('\u00e2\u20ac') ? '\u274c CORRUPTED' : '\u2705 clean');
console.log('Em dash char OK:', v.includes('\u2014'));
console.log('Umlaut \u00e4 OK:', v.includes('\u00e4'));
console.log('Email gate form:', v.includes('gate-form'));
console.log('submitGate():', v.includes('function submitGate'));
console.log('Lang toggle compact:', v.includes('padding:4px}'));
console.log('Old lang-btn.active removed:', !v.includes('text-fill-color:var(--bg)'));
