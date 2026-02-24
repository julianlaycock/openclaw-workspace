import PptxGenJS from 'pptxgenjs';

const pptx = new PptxGenJS();
pptx.author = 'Caelith';
pptx.company = 'Caelith';
pptx.title = 'Caelith — Pre-Seed Pitch Deck';
pptx.layout = 'LAYOUT_WIDE';

const DARK = '2D3333';
const LIGHT = 'F8F9FA';
const WHITE = 'FFFFFF';
const ACCENT = 'C5E0EE';
const WARM = 'E8A87C';
const TEXT_DARK = '2D2D2D';
const TEXT_MUTED = '888888';
const TEXT_LIGHT = 'E0E0E0';

const HEADING = { fontFace:'Arial Black', fontSize:28, color:WHITE, bold:true };
const HEADING_DARK_ON_LIGHT = { fontFace:'Arial Black', fontSize:28, color:TEXT_DARK, bold:true };
const BODY = { fontFace:'Arial', fontSize:13, color:TEXT_LIGHT };
const BODY_DARK = { fontFace:'Arial', fontSize:13, color:TEXT_MUTED };
const MONO = { fontFace:'Courier New', fontSize:12, color:TEXT_MUTED };

// ─── Slide 1: Cover ───
let s1 = pptx.addSlide();
s1.background = { color: DARK };
s1.addText('Caelith', { x:0.8, y:1.5, w:10, h:2, fontFace:'Arial Black', fontSize:72, color:WHITE, bold:true });
s1.addText('The compliance engine for EU fund managers.', { x:0.8, y:3.4, w:10, h:0.6, fontFace:'Arial', fontSize:22, color:'9EAEB8' });
s1.addText('Pre-Seed · February 2026', { x:0.8, y:4.2, w:10, h:0.4, fontFace:'Courier New', fontSize:12, color:'6B7B7B' });
s1.addText('www.caelith.tech/landing', { x:0.8, y:6.8, w:10, h:0.3, fontFace:'Courier New', fontSize:10, color:'4A5555' });

// ─── Slide 2: Deadline ───
let s2 = pptx.addSlide();
s2.background = { color: DARK };
s2.addText('57 days', { x:0.8, y:0.8, w:10, h:2.5, fontFace:'Arial Black', fontSize:96, color:WARM, bold:true });
s2.addText('until AIFMD II enforcement', { x:0.8, y:3.0, w:10, h:0.6, fontFace:'Arial', fontSize:24, color:'9EAEB8' });
s2.addText('On April 16, 2026, every EU alternative investment fund manager must comply with AIFMD II — the most significant regulatory overhaul in a decade.', { x:0.8, y:4.0, w:9, h:0.8, fontFace:'Arial', fontSize:14, color:TEXT_LIGHT, lineSpacingMultiple:1.5 });
s2.addText('Non-compliance isn\'t a risk. It\'s a fine.', { x:0.8, y:5.0, w:9, h:0.5, fontFace:'Arial', fontSize:14, color:WARM, bold:true });
s2.addText('Directive (EU) 2024/927', { x:0.8, y:6.8, w:10, h:0.3, fontFace:'Courier New', fontSize:10, color:'4A5555' });

// ─── Slide 3: Pain ───
let s3 = pptx.addSlide();
s3.background = { color: LIGHT };
s3.addText('Compliance today is manual,\nexpensive, and broken.', { x:0.8, y:0.6, w:10, h:1.2, ...HEADING_DARK_ON_LIGHT });
const painData = [
  ['€180,000/year', 'Average annual cost of manual\ncompliance for a single AIFM'],
  ['2–4 weeks', 'Time to complete one\naudit cycle manually'],
  ['47%', 'Of EU fund managers\nunprepared for AIFMD II']
];
painData.forEach((p, i) => {
  const x = 0.8 + i * 3.6;
  s3.addText(p[0], { x, y:2.4, w:3.2, h:0.8, fontFace:'Courier New', fontSize:28, color:TEXT_DARK, bold:true });
  s3.addText(p[1], { x, y:3.2, w:3.2, h:0.8, fontFace:'Arial', fontSize:12, color:TEXT_MUTED, lineSpacingMultiple:1.4 });
});
s3.addText('Fund managers juggle spreadsheets, email chains, and consultants charging €1,500/day — for processes that should take minutes, not months.', { x:0.8, y:5.0, w:9, h:0.8, fontFace:'Arial', fontSize:12, color:TEXT_MUTED, italic:true, lineSpacingMultiple:1.5 });

// ─── Slide 4: Market ───
let s4 = pptx.addSlide();
s4.background = { color: LIGHT };
s4.addText('A €2.3B market with a hard deadline.', { x:0.8, y:0.6, w:10, h:0.8, ...HEADING_DARK_ON_LIGHT });
const bars = [
  { label:'TAM · €2.3B — EU regulatory technology market', w:9.5, color:'D0D5D5' },
  { label:'SAM · €680M — AIF compliance & reporting', w:6.8, color:ACCENT },
  { label:'SOM · €45M — German AIFMs (Year 1)', w:3.8, color:DARK },
];
bars.forEach((b, i) => {
  s4.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x:0.8, y:2.0+i*1.2, w:b.w, h:0.7, fill:{color:b.color}, rectRadius:0.05 });
  s4.addText(b.label, { x:1.0, y:2.0+i*1.2, w:b.w-0.4, h:0.7, fontFace:'Courier New', fontSize:11, color: b.color===DARK?WHITE:TEXT_DARK, valign:'middle' });
});
s4.addText('3,500+ licensed AIFMs in the EU. 890+ in Germany alone.', { x:0.8, y:5.8, w:9, h:0.4, fontFace:'Courier New', fontSize:12, color:TEXT_MUTED });
s4.addText('ESMA AIFMD Statistical Report 2024, Deloitte RegTech Market Analysis', { x:0.8, y:6.3, w:9, h:0.3, fontFace:'Courier New', fontSize:9, color:'AAAAAA' });

// ─── Slide 5: Solution ───
let s5 = pptx.addSlide();
s5.background = { color: DARK };
s5.addText('Caelith automates AIFMD II\ncompliance end-to-end.', { x:0.8, y:0.6, w:10, h:1.2, ...HEADING });
const solData = [
  ['247 rules', 'Pre-built compliance rules across 6 regulatory frameworks'],
  ['<23ms', 'Average rule evaluation time. Real-time, not batch.'],
  ['Hash-chained proof', 'Every decision cryptographically linked. Tamper-evident audit trail.'],
  ['One-click reporting', 'Annex IV, AIFMD II disclosures, cross-border filings. PDF, XML, XBRL.']
];
solData.forEach((s, i) => {
  const x = 0.8 + (i%2)*4.8;
  const y = 2.4 + Math.floor(i/2)*1.8;
  s5.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y, w:4.4, h:1.5, fill:{color:'3A4444'}, rectRadius:0.1, line:{color:'4A5555', width:0.5} });
  s5.addText(s[0], { x:x+0.3, y, w:3.8, h:0.6, fontFace:'Courier New', fontSize:18, color:ACCENT, bold:true, valign:'bottom' });
  s5.addText(s[1], { x:x+0.3, y:y+0.6, w:3.8, h:0.7, fontFace:'Arial', fontSize:11, color:TEXT_LIGHT, lineSpacingMultiple:1.4 });
});
s5.addText('See the live product → www.caelith.tech/landing', { x:0.8, y:6.4, w:10, h:0.4, fontFace:'Courier New', fontSize:11, color:WARM });

// ─── Slide 6: How it works ───
let s6 = pptx.addSlide();
s6.background = { color: LIGHT };
s6.addText('Four steps to audit-ready.', { x:0.8, y:0.6, w:10, h:0.8, ...HEADING_DARK_ON_LIGHT });
const steps = [
  ['01', 'Map', 'Upload fund structure. Auto-detect applicable frameworks across 6 jurisdictions.'],
  ['02', 'Evaluate', 'Classify every investor against 247 rules. Real-time. Under 23ms.'],
  ['03', 'Prove', 'Hash-chain every decision. Tamper-proof. Regulator-ready.'],
  ['04', 'Report', 'Generate Annex IV, AIFMD II disclosures. One click. Export PDF/XML/XBRL.']
];
steps.forEach((st, i) => {
  const x = 0.8 + i*2.8;
  s6.addText(st[0], { x, y:2.0, w:2.4, h:0.8, fontFace:'Courier New', fontSize:36, color:'E0E0E0' });
  s6.addText(st[1], { x, y:2.8, w:2.4, h:0.5, fontFace:'Arial Black', fontSize:16, color:TEXT_DARK, bold:true });
  s6.addText(st[2], { x, y:3.3, w:2.4, h:1.2, fontFace:'Arial', fontSize:11, color:TEXT_MUTED, lineSpacingMultiple:1.4 });
});

// ─── Slide 7: Why now ───
let s7 = pptx.addSlide();
s7.background = { color: DARK };
s7.addText('The window is open —\nand closing fast.', { x:0.8, y:0.6, w:10, h:1.2, ...HEADING });
// Timeline line
s7.addShape(pptx.shapes.LINE, { x:0.8, y:3.0, w:10.5, h:0, line:{color:'4A5555', width:1.5} });
const tlItems = [
  { year:'2024', desc:'AIFMD II directive published', highlight:false },
  { year:'2025', desc:'Member states begin transposition', highlight:false },
  { year:'Q1 2026', desc:'Caelith launches', highlight:false },
  { year:'Apr 16, 2026', desc:'ENFORCEMENT DEADLINE', highlight:true },
  { year:'2026-2027', desc:'Caelith scales across EU', highlight:false },
];
tlItems.forEach((t, i) => {
  const x = 0.8 + i*2.2;
  s7.addShape(pptx.shapes.OVAL, { x:x+0.2, y:2.8, w:0.25, h:0.25, fill:{color:t.highlight?WARM:'4A5555'} });
  s7.addText(t.year, { x, y:3.4, w:2, h:0.4, fontFace:'Courier New', fontSize:11, color:t.highlight?WARM:ACCENT, bold:t.highlight });
  s7.addText(t.desc, { x, y:3.8, w:2, h:0.8, fontFace:'Arial', fontSize:10, color:TEXT_LIGHT, lineSpacingMultiple:1.3 });
});
s7.addText('Every day closer to April 16 increases urgency — and willingness to pay.', { x:0.8, y:5.8, w:10, h:0.5, fontFace:'Arial', fontSize:12, color:'9EAEB8', italic:true });

// ─── Slide 8: Competition ───
let s8 = pptx.addSlide();
s8.background = { color: LIGHT };
s8.addText('Purpose-built, not bolted on.', { x:0.8, y:0.4, w:10, h:0.8, ...HEADING_DARK_ON_LIGHT });
// 2x2 matrix
const mx=2.5, my=1.6, mw=4, mh=2;
// Labels
s8.addText('Automated / SaaS ↑', { x:mx, y:my-0.4, w:8, h:0.3, fontFace:'Courier New', fontSize:9, color:'AAAAAA' });
s8.addText('Manual / Consulting ↓', { x:mx, y:my+mh*2+0.1, w:4, h:0.3, fontFace:'Courier New', fontSize:9, color:'AAAAAA' });
s8.addText('Generic ←', { x:mx, y:my+mh*2+0.4, w:2, h:0.3, fontFace:'Courier New', fontSize:9, color:'AAAAAA' });
s8.addText('→ AIF-Specific', { x:mx+mw+2, y:my+mh*2+0.4, w:2, h:0.3, fontFace:'Courier New', fontSize:9, color:'AAAAAA' });
// Quadrants
s8.addShape(pptx.shapes.RECTANGLE, { x:mx, y:my, w:mw, h:mh, fill:{color:'EEEEEE'}, line:{color:'DDDDDD',width:0.5} });
s8.addShape(pptx.shapes.RECTANGLE, { x:mx+mw, y:my, w:mw, h:mh, fill:{color:DARK}, line:{color:'4A5555',width:0.5} });
s8.addShape(pptx.shapes.RECTANGLE, { x:mx, y:my+mh, w:mw, h:mh, fill:{color:'F5F5F5'}, line:{color:'DDDDDD',width:0.5} });
s8.addShape(pptx.shapes.RECTANGLE, { x:mx+mw, y:my+mh, w:mw, h:mh, fill:{color:'F5F5F5'}, line:{color:'DDDDDD',width:0.5} });
// Labels in quadrants
s8.addText('Suade Labs, Regnology, Apiax\nAutomated but generic', { x:mx+0.3, y:my+0.3, w:3.4, h:1.4, fontFace:'Arial', fontSize:11, color:TEXT_MUTED, lineSpacingMultiple:1.4 });
s8.addText('Caelith ●\nOnly player: AIF specialization +\nfull automation + crypto proof', { x:mx+mw+0.3, y:my+0.3, w:3.4, h:1.4, fontFace:'Arial Black', fontSize:12, color:WARM, lineSpacingMultiple:1.3 });
s8.addText('Big 4 Consulting\n€150-200K/yr, manual, generic', { x:mx+0.3, y:my+mh+0.3, w:3.4, h:1.4, fontFace:'Arial', fontSize:11, color:TEXT_MUTED, lineSpacingMultiple:1.4 });
s8.addText('Boutique compliance firms\nAIF-aware but slow, unscalable', { x:mx+mw+0.3, y:my+mh+0.3, w:3.4, h:1.4, fontFace:'Arial', fontSize:11, color:TEXT_MUTED, lineSpacingMultiple:1.4 });
s8.addText('No competitor combines AIF specialization with full automation and cryptographic proof.', { x:0.8, y:6.4, w:10, h:0.4, fontFace:'Arial', fontSize:12, color:TEXT_MUTED, align:'center' });

// ─── Slide 9: Business Model ───
let s9 = pptx.addSlide();
s9.background = { color: LIGHT };
s9.addText('SaaS with built-in expansion.', { x:0.8, y:0.4, w:10, h:0.8, ...HEADING_DARK_ON_LIGHT });
const tierData = [
  { name:'STARTER', price:'€299/mo', detail:'1 fund, 100 investors', feat:false },
  { name:'PROFESSIONAL', price:'€799/mo', detail:'10 funds, unlimited investors\nTarget ACV: €9,588', feat:true },
  { name:'ENTERPRISE', price:'Custom', detail:'Unlimited, on-premise, API', feat:false }
];
tierData.forEach((t, i) => {
  const x = 0.8 + i*3.6;
  const bg = t.feat ? DARK : WHITE;
  const tc = t.feat ? WHITE : TEXT_DARK;
  s9.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y:1.6, w:3.2, h:2.2, fill:{color:bg}, rectRadius:0.1, line:{color:t.feat?DARK:'DDDDDD',width:0.5} });
  s9.addText(t.name, { x, y:1.8, w:3.2, h:0.3, fontFace:'Courier New', fontSize:10, color:t.feat?'9EAEB8':TEXT_MUTED, align:'center' });
  s9.addText(t.price, { x, y:2.1, w:3.2, h:0.6, fontFace:'Arial Black', fontSize:24, color:tc, align:'center', bold:true });
  s9.addText(t.detail, { x:x+0.3, y:2.7, w:2.6, h:0.8, fontFace:'Arial', fontSize:11, color:t.feat?TEXT_LIGHT:TEXT_MUTED, align:'center', lineSpacingMultiple:1.3 });
});
const ueData = [
  ['50x cost advantage', '€3,588 entry ACV vs €180,000 manual'],
  ['Land & expand', 'Start with one fund → grow with AUM'],
  ['130%+ NRR target', 'Regulatory scope only increases']
];
ueData.forEach((u, i) => {
  const x = 0.8 + i*3.6;
  s9.addText(u[0], { x, y:4.4, w:3.2, h:0.4, fontFace:'Arial', fontSize:12, color:TEXT_DARK, bold:true });
  s9.addText(u[1], { x, y:4.8, w:3.2, h:0.5, fontFace:'Arial', fontSize:11, color:TEXT_MUTED, lineSpacingMultiple:1.3 });
});

// ─── Slide 10: Traction ───
let s10 = pptx.addSlide();
s10.background = { color: LIGHT };
s10.addText('Product built. Pilots launching.', { x:0.8, y:0.4, w:10, h:0.8, ...HEADING_DARK_ON_LIGHT });
s10.addText('DONE', { x:0.8, y:1.6, w:4, h:0.4, fontFace:'Courier New', fontSize:11, color:TEXT_MUTED });
const done = [
  '✓  Working product (247 rules, 6 frameworks, hash-chained audit trail)',
  '✓  Live at www.caelith.tech',
  '✓  119+ commits, 51 passing tests',
  '✓  EU-hosted infrastructure (Frankfurt)'
];
done.forEach((d, i) => {
  s10.addText(d, { x:0.8, y:2.1+i*0.5, w:5, h:0.45, fontFace:'Arial', fontSize:12, color:TEXT_DARK });
});
s10.addText('NEXT 18 MONTHS', { x:6.5, y:1.6, w:5, h:0.4, fontFace:'Courier New', fontSize:11, color:TEXT_MUTED });
const next = [
  'Q1 2026 — Launch pilot (3-5 German AIFMs)',
  'Q2 2026 — First paying customers, hire CTO',
  'Q3 2026 — Expand to Benelux + Luxembourg',
  'Q4 2026 — SOC 2 Type II + ISO 27001',
  '2027 — Series A readiness, 50+ customers'
];
next.forEach((n, i) => {
  s10.addText(n, { x:6.5, y:2.1+i*0.5, w:5.5, h:0.45, fontFace:'Arial', fontSize:12, color:TEXT_DARK });
});

// ─── Slide 11: Team ───
let s11 = pptx.addSlide();
s11.background = { color: DARK };
s11.addText('Domain expert. Builder. Operator.', { x:0.8, y:0.5, w:10, h:0.8, ...HEADING });
s11.addText('Julian Laycock', { x:0.8, y:1.8, w:10, h:0.6, fontFace:'Arial Black', fontSize:24, color:WHITE, bold:true });
s11.addText('Founder & CEO', { x:0.8, y:2.4, w:10, h:0.4, fontFace:'Courier New', fontSize:12, color:'6B7B7B' });
const creds = [
  'B. of Laws · B.Sc. Economics · MBA',
  '5 years consulting: Capgemini & init AG (Berlin) — enterprise compliance & digital transformation',
  '2 years Wissenschaftlicher Mitarbeiter, HWR Berlin — regulatory research',
  'Self-taught engineer: Python, data analytics, full-stack development',
  'Built Caelith end-to-end: product, engineering, compliance logic, go-to-market'
];
creds.forEach((c, i) => {
  s11.addText('•  ' + c, { x:0.8, y:3.2+i*0.5, w:10, h:0.45, fontFace:'Arial', fontSize:12, color:TEXT_LIGHT, lineSpacingMultiple:1.3 });
});
s11.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x:0.8, y:5.8, w:8, h:0.6, fill:{color:'3A4444'}, rectRadius:0.05, line:{color:'4A5555',width:0.5} });
s11.addText('Seeking: Technical co-founder / CTO as first hire.', { x:1.0, y:5.8, w:7.6, h:0.6, fontFace:'Arial', fontSize:12, color:ACCENT, valign:'middle' });
s11.addText('Rare combination of legal domain expertise, business acumen, and technical ability. Built a working product solo — now ready to scale the team.', { x:0.8, y:6.6, w:10, h:0.5, fontFace:'Arial', fontSize:11, color:'9EAEB8', italic:true, lineSpacingMultiple:1.3 });

// ─── Slide 12: The Ask ───
let s12 = pptx.addSlide();
s12.background = { color: DARK };
s12.addText('€400K', { x:0.8, y:0.4, w:10, h:1.2, fontFace:'Arial Black', fontSize:52, color:WARM, bold:true });
s12.addText('Pre-seed to prove product-market fit.', { x:0.8, y:1.5, w:10, h:0.5, fontFace:'Arial', fontSize:16, color:'9EAEB8' });
const funds = [
  { label:'CTO / Technical Co-founder', amt:'€140K (35%)', pct:35 },
  { label:'Founder salary (18 mo)', amt:'€100K (25%)', pct:25 },
  { label:'Pilot program ops', amt:'€60K (15%)', pct:15 },
  { label:'SOC 2 + ISO 27001', amt:'€50K (12.5%)', pct:12.5 },
  { label:'Infra, legal & buffer', amt:'€50K (12.5%)', pct:12.5 },
];
funds.forEach((f, i) => {
  const y = 2.4 + i*0.55;
  s12.addText(f.label, { x:0.8, y, w:3, h:0.45, fontFace:'Arial', fontSize:11, color:TEXT_LIGHT, valign:'middle' });
  s12.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x:4, y:y+0.05, w:6*(f.pct/35), h:0.35, fill:{color:ACCENT}, rectRadius:0.03 });
  s12.addText(f.amt, { x:4.1, y, w:3, h:0.45, fontFace:'Courier New', fontSize:10, color:DARK, valign:'middle' });
});
const milestones = [
  { mo:'Month 3', desc:'3 pilot customers live' },
  { mo:'Month 6', desc:'First paying customers,\nCTO onboarded' },
  { mo:'Month 12', desc:'15+ customers,\nSOC 2 + ISO 27001' },
  { mo:'Month 18', desc:'Series A ready, 30+ customers,\n€300K+ ARR' }
];
milestones.forEach((m, i) => {
  const x = 0.8 + i*2.8;
  s12.addText(m.mo, { x, y:5.4, w:2.4, h:0.3, fontFace:'Courier New', fontSize:11, color:WARM });
  s12.addText(m.desc, { x, y:5.7, w:2.4, h:0.8, fontFace:'Arial', fontSize:11, color:TEXT_LIGHT, lineSpacingMultiple:1.3 });
});
s12.addText('hello@caelith.tech · www.caelith.tech/landing', { x:0.8, y:6.8, w:10, h:0.3, fontFace:'Courier New', fontSize:11, color:'4A5555' });

// ─── Generate ───
const outFile = 'caelith-pitch-deck.pptx';
pptx.writeFile({ fileName: outFile }).then(() => {
  console.log(`✓ Generated ${outFile}`);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
