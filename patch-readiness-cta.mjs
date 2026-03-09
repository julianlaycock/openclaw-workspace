import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let content = readFileSync(p, 'utf8');

const startMarker = '// Final CTA\n';
const endMarker = '  // Disclaimer\n';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found', { startIdx, endIdx });
  process.exit(1);
}

const newBlock = `// Final CTA — recommended next steps + remediation plan
  html += '<div style="margin-top:48px;border-top:1px solid var(--border);padding-top:48px;text-align:center">';
  html += '<div style="display:inline-block;width:100%;max-width:540px;text-align:left;background:linear-gradient(135deg,rgba(142,197,224,0.08),rgba(232,168,124,0.06));border:1px solid rgba(142,197,224,0.2);border-radius:14px;padding:28px">';
  html += '<div style="font-family:\\'JetBrains Mono\\',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#8EC5E0;margin-bottom:10px;display:flex;align-items:center;gap:6px"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#8EC5E0"></span>' + (lang === 'de' ? 'Empfohlene nächste Schritte bereit' : 'Recommended next steps ready') + '</div>';
  html += '<h3 style="font-family:\\'Sora\\',sans-serif;font-weight:700;font-size:20px;color:#fff;margin-bottom:10px;line-height:1.3">' + (lang === 'de' ? 'Schließen Sie Ihre Lücken vor dem 16. April' : 'See how to close your gaps before April 16') + '</h3>';
  html += '<p style="font-size:14px;color:rgba(255,255,255,0.65);margin-bottom:22px;line-height:1.7">' + (lang === 'de' ? 'Erhalten Sie einen <strong style=\\"color:rgba(255,255,255,0.9)\\">Schritt-für-Schritt-Sanierungsplan</strong> für jede Lücke — mit BaFin-Anforderungen, genauen Fristen und wie Caelith jeden Schritt in unter 2 Wochen automatisiert.' : 'Get a <strong style=\\"color:rgba(255,255,255,0.9)\\">step-by-step remediation plan</strong> for each gap — with BaFin requirements, exact deadlines, and how Caelith automates each one in under 2 weeks.') + '</p>';
  html += '<div style="display:flex;gap:10px;flex-wrap:wrap">';
  html += '<a href="https://calendly.com/julian-laycock-caelith/30min" target="_blank" rel="noopener" style="font-family:\\'Sora\\',sans-serif;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;background:linear-gradient(135deg,#8EC5E0,#E8A87C);color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px">' + (lang === 'de' ? '15-Min. Demo buchen →' : 'Book a 15-Min Demo →') + '</a>';
  html += '<a href="/demo-dashboard" style="font-family:\\'Sora\\',sans-serif;font-weight:600;font-size:13px;padding:12px 20px;border-radius:10px;background:transparent;border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.75);text-decoration:none;display:inline-flex;align-items:center">' + (lang === 'de' ? 'Jetzt testen' : 'Try It Now') + '</a>';
  html += '</div></div></div>';
\n`;

const newContent = content.slice(0, startIdx) + newBlock + content.slice(endIdx);

writeFileSync(p, newContent, 'utf8');

const verify = readFileSync(p, 'utf8');
console.log('New CTA present:', verify.includes('Recommended next steps ready'));
console.log('Old CTA removed:', !verify.includes("t('ctaTitle')"));
