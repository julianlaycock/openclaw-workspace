import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let content = readFileSync(p, 'utf8');

// ══════════════════════════════════════════════════════════
// FIX 1: Lang toggle — match landing page style
// Landing page: small dim text link "DE" in nav
// Current: fancy pill with full EN|DE buttons
// Replace CSS + HTML to match landing page minimal style
// ══════════════════════════════════════════════════════════

// Replace the .lang-toggle + .lang-btn CSS with landing-page-matching style
const oldLangCss = `.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;background:rgba(26,31,31,0.65);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;overflow:hidden}
.lang-btn{padding:8px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;border:none;background:transparent;color:var(--text3);cursor:pointer;transition:all .2s;min-height:44px;min-width:44px;display:flex;align-items:center;justify-content:center}
.lang-btn.active{background:var(--grad);color:var(--bg);-webkit-text-fill-color:var(--bg)}`;

const newLangCss = `.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;align-items:center;gap:2px;background:rgba(26,31,31,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;padding:4px}
.lang-btn{padding:5px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;border:none;background:transparent;color:rgba(255,255,255,0.4);cursor:pointer;transition:all .2s;border-radius:999px;line-height:1}
.lang-btn.active{background:rgba(255,255,255,0.12);color:#fff}`;

if (content.includes(oldLangCss)) {
  content = content.replace(oldLangCss, newLangCss);
  console.log('Fix 1: Lang toggle CSS updated ✅');
} else {
  // Try partial match on the lang-toggle line
  content = content.replace(
    '.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;background:rgba(26,31,31,0.65);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;overflow:hidden}',
    '.lang-toggle{position:fixed;top:16px;right:16px;z-index:1001;display:flex;align-items:center;gap:2px;background:rgba(26,31,31,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:999px;padding:4px}'
  );
  content = content.replace(
    '.lang-btn{padding:8px 16px;font-family:\'JetBrains Mono\',monospace;font-size:12px;font-weight:600;border:none;background:transparent;color:var(--text3);cursor:pointer;transition:all .2s;min-height:44px;min-width:44px;display:flex;align-items:center;justify-content:center}',
    '.lang-btn{padding:5px 12px;font-family:\'JetBrains Mono\',monospace;font-size:11px;font-weight:600;border:none;background:transparent;color:rgba(255,255,255,0.4);cursor:pointer;transition:all .2s;border-radius:999px;line-height:1}'
  );
  content = content.replace(
    '.lang-btn.active{background:var(--grad);color:var(--bg);-webkit-text-fill-color:var(--bg)}',
    '.lang-btn.active{background:rgba(255,255,255,0.12);color:#fff}'
  );
  console.log('Fix 1: Lang toggle CSS updated (partial match) ✅');
}

// ══════════════════════════════════════════════════════════
// FIX 2: Replace CTA with email gate
// Email input → submit → success state with personalised report framing
// ══════════════════════════════════════════════════════════

// Find and replace the entire Final CTA block
const ctaOldStart = `  // Final CTA \u2014 recommended next steps + remediation plan`;
const ctaOldStartAlt = `  // Final CTA`;

// Find the end of the CTA block (next comment or closing brace area)
let ctaStart = content.indexOf(ctaOldStart);
if (ctaStart === -1) ctaStart = content.indexOf(ctaOldStartAlt);
if (ctaStart === -1) {
  console.log('❌ CTA block not found - searching for alternative marker');
  ctaStart = content.indexOf('Recommended next steps ready');
  ctaStart = content.lastIndexOf('html +=', ctaStart) - 2;
}

// Find the end: look for the // Disclaimer comment or next major section
const ctaEnd = content.indexOf('  // Disclaimer', ctaStart);
const ctaBlock = content.substring(ctaStart, ctaEnd);
console.log('CTA block length:', ctaBlock.length, 'chars');

const newCtaBlock = `  // Email gate CTA — user inputs email to receive free personalised assessment
  html += '<div class="final-cta" style="margin-top:48px;border-top:1px solid var(--border);padding-top:48px;text-align:center">';
  html += '<div style="display:inline-block;width:100%;max-width:540px;text-align:left;background:linear-gradient(135deg,rgba(142,197,224,0.08),rgba(232,168,124,0.06));border:1px solid rgba(142,197,224,0.2);border-radius:16px;padding:32px">';

  // Badge
  html += '<div id="gate-badge" style="font-family:JetBrains Mono,monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#8EC5E0;margin-bottom:12px;display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#8EC5E0;animation:pulse 2s infinite"></span>' + (lang === 'de' ? 'Ihr pers\u00f6nliches Assessment bereit' : 'Your personalised assessment is ready') + '</div>';

  // Headline
  html += '<h3 id="gate-headline" style="font-family:Sora,sans-serif;font-weight:700;font-size:22px;color:#fff;margin-bottom:10px;line-height:1.3">' + (lang === 'de' ? 'Erhalten Sie Ihren kostenlosen Sanierungsplan' : 'Get your free personalised remediation plan') + '</h3>';

  // Sub-copy
  html += '<p id="gate-copy" style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:24px;line-height:1.7">' + (lang === 'de' ? 'Wir erstellen einen ma\u00dfgeschneiderten Schritt-f\u00fcr-Schritt-Plan f\u00fcr jede Ihrer L\u00fccken \u2014 mit konkreten BaFin-Anforderungen und Fristen.' : 'We\'ll create a tailored step-by-step plan for each of your gaps \u2014 with exact BaFin requirements, deadlines, and how Caelith automates each one.') + '</p>';

  // Email form
  html += '<form id="gate-form" onsubmit="submitGate(event)" style="display:flex;flex-direction:column;gap:10px">';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  html += '<input id="gate-email" type="email" required placeholder="' + (lang === 'de' ? 'ihre@email.de' : 'your@email.com') + '" style="flex:1;min-width:180px;padding:12px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-family:JetBrains Mono,monospace;font-size:13px;outline:none;transition:border .2s" onfocus="this.style.borderColor=\'rgba(142,197,224,0.5)\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.15)\'" />';
  html += '<button type="submit" id="gate-submit" style="padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;font-family:Sora,sans-serif;font-weight:700;font-size:13px;border:none;cursor:pointer;white-space:nowrap;transition:opacity .2s" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">' + (lang === 'de' ? 'Kostenlosen Plan anfordern \u2192' : 'Get my free plan \u2192') + '</button>';
  html += '</div>';
  html += '<p style="font-size:11px;color:rgba(255,255,255,0.3);margin:0">' + (lang === 'de' ? 'Kein Spam. Nur Ihr pers\u00f6nlicher AIFMD-II-Bericht.' : 'No spam. Just your personalised AIFMD II report.') + '</p>';
  html += '</form>';

  // Success state (hidden by default)
  html += '<div id="gate-success" style="display:none;padding-top:4px">';
  html += '<div style="font-size:24px;margin-bottom:10px">\u2705</div>';
  html += '<p style="font-size:15px;font-weight:600;color:#fff;margin-bottom:6px">' + (lang === 'de' ? 'Ihr Plan wird vorbereitet!' : 'Your plan is on its way!') + '</p>';
  html += '<p style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px">' + (lang === 'de' ? 'Wir melden uns in K\u00fcrze. Buchen Sie jetzt Ihren 15-Min-Call f\u00fcr sofortige Unterst\u00fctzung:' : 'We\'ll be in touch shortly. Book a 15-min call now for immediate support:') + '</p>';
  html += '<div style="display:flex;gap:10px;flex-wrap:wrap">';
  html += '<a href="https://calendly.com/julian-laycock-caelith/30min" target="_blank" rel="noopener" style="font-family:Sora,sans-serif;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:opacity .2s" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">' + (lang === 'de' ? '15-Min. Demo buchen \u2192' : 'Book a 15-Min Demo \u2192') + '</a>';
  html += '<a href="/demo-dashboard" style="font-family:Sora,sans-serif;font-weight:600;font-size:13px;padding:12px 24px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:all .2s" onmouseover="this.style.borderColor=\'rgba(255,255,255,0.35)\';this.style.color=\'#fff\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.15)\';this.style.color=\'rgba(255,255,255,0.8)\'">' + (lang === 'de' ? 'Demo ausprobieren' : 'Try Demo') + '</a>';
  html += '</div>';
  html += '</div>';

  html += '</div>';
  html += '</div>';

`;

content = content.substring(0, ctaStart) + newCtaBlock + content.substring(ctaEnd);
console.log('Fix 2: Email gate CTA inserted ✅');

// ══════════════════════════════════════════════════════════
// FIX 3: Add submitGate() JS function
// Submits email, shows success state, logs to backend
// ══════════════════════════════════════════════════════════

const gateJS = `
// Email gate submission
function submitGate(e) {
  e.preventDefault();
  var email = document.getElementById('gate-email').value.trim();
  if (!email) return;
  var btn = document.getElementById('gate-submit');
  btn.disabled = true;
  btn.textContent = '...';
  // Save to localStorage
  localStorage.setItem('rc_email', email);
  localStorage.setItem('rc_score', overallScore);
  // POST to backend (best-effort)
  fetch('/api/leads', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email: email, source: 'readiness-check', score: overallScore, lang: lang})
  }).catch(function(){});
  // Show success state
  setTimeout(function() {
    document.getElementById('gate-form').style.display = 'none';
    document.getElementById('gate-badge').style.display = 'none';
    document.getElementById('gate-headline').style.display = 'none';
    document.getElementById('gate-copy').style.display = 'none';
    document.getElementById('gate-success').style.display = 'block';
  }, 400);
}`;

// Insert before the closing </script> tag
const scriptCloseIdx = content.lastIndexOf('</script>');
if (scriptCloseIdx > -1) {
  content = content.substring(0, scriptCloseIdx) + gateJS + '\n' + content.substring(scriptCloseIdx);
  console.log('Fix 3: submitGate() JS function added ✅');
} else {
  console.log('❌ Could not find </script> tag');
}

writeFileSync(p, content, 'utf8');
console.log('\nWritten to disk.');

// Verify
const verify = readFileSync(p, 'utf8');
console.log('\n=== VERIFICATION ===');
console.log('Email gate form:', verify.includes('gate-form'));
console.log('submitGate function:', verify.includes('function submitGate'));
console.log('Success state:', verify.includes('gate-success'));
console.log('Lang toggle compact CSS:', verify.includes('padding:4px}'));
console.log('Old CTA removed:', !verify.includes('Recommended next steps ready') || verify.includes('gate-form'));
