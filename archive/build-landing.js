const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\julia\\openclaw-workspace\\redesign-concepts\\v3-option-b.html', 'utf8');

// Fix links
html = html.replaceAll('href="https://www.caelith.tech/api/docs"', 'href="/api/docs"');
html = html.replaceAll('href="https://www.caelith.tech/blog"', 'href="/blog"');
html = html.replaceAll('href="https://www.caelith.tech"', 'href="/login"');

// Add mobile CSS fixes before </style>
const mobileFixes = `
/* ===== MOBILE ENHANCEMENTS ===== */
@media(max-width:768px){
  .hero-ctas .btn{width:100%;justify-content:center;min-height:44px}
  .btn-readiness{width:100%;justify-content:center;min-height:44px}
  .term-body{overflow-x:auto}
  .api-code-body{overflow-x:auto;white-space:pre;font-size:11px}
  .urgency-badge{bottom:12px;right:12px;left:12px;justify-content:center;font-size:12px}
  .urgency-badge .badge-grad{padding:5px 14px}
  .cta-section .btn{width:100%;justify-content:center;min-height:44px}
  .copilot-inner .btn{width:100%;justify-content:center}
  .api-content .btn{width:100%;justify-content:center}
  .chat-input-field{width:100%}
  .footer-bottom{flex-direction:column;gap:8px;text-align:center}
}
@media(max-width:480px){
  .btn,.btn-demo,.btn-readiness,.btn-ghost{min-height:44px}
  body{font-size:14px}
  .term-body{font-size:11px;overflow-x:auto}
  .mono{font-size:11px}
  .hero h1{font-size:32px}
  .circular-cd{width:140px;height:140px}
  .circular-cd .days-num{font-size:36px}
}
`;
html = html.replace('</style>', mobileFixes + '</style>');

// Escape for JS template literal
html = html.replace(/\\/g, '\\\\');
html = html.replace(/`/g, '\\`');
html = html.replace(/\$\{/g, '\\${');

// Write TS file
const ts = 'export const htmlEn = `' + html + '`;\n';
const outPath = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-en.ts';
fs.writeFileSync(outPath, ts, 'utf8');

console.log('Written:', ts.length, 'bytes');

// Verify
const check = require(outPath);
// Can't require .ts, just do string checks
const content = fs.readFileSync(outPath, 'utf8');
const hrefCheck = content.match(/href="[^"]*caelith\.tech[^"]*"/g) || [];
const nonMailto = hrefCheck.filter(m => !m.includes('mailto:'));
console.log('caelith.tech hrefs (non-mailto):', nonMailto.length);
if (nonMailto.length > 0) nonMailto.forEach(m => console.log('  PROBLEM:', m));
console.log('Contains /login:', content.includes('href="/login"'));
console.log('Contains /api/docs:', content.includes('href="/api/docs"'));
console.log('Contains /blog:', content.includes('href="/blog"'));
