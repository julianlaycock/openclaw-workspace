import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Caelith — Capitalization Table v2</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#2D3333;--bg2:#1a1f1f;--bg3:#232929;
  --accent:#8EC5E0;--warm:#E8A87C;
  --text:#F8F9FA;--text2:rgba(248,249,250,0.65);--text3:rgba(248,249,250,0.35);
  --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.04);
}
@page{margin:0;size:A4}
html,body{width:210mm;background:var(--bg2);color:var(--text);font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}

/* HEADER */
.header{background:var(--bg);padding:36px 48px 28px;display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid var(--border)}
.logo{font-family:'Sora',sans-serif;font-weight:800;font-size:24px;letter-spacing:-0.03em}
.logo span{background:linear-gradient(135deg,#8EC5E0,#E8A87C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.doc-meta{text-align:right}
.doc-title{font-family:'Sora',sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text2);margin-bottom:3px}
.doc-sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);line-height:1.6}

/* BODY */
.body{padding:32px 48px 28px}

/* SECTION */
.sec{margin-bottom:28px}
.sec-title{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--text3);padding-bottom:10px;border-bottom:1px solid var(--border);margin-bottom:14px}

/* SUMMARY GRID */
.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.card{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px 16px}
.card-lbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:6px}
.card-val{font-family:'Sora',sans-serif;font-size:17px;font-weight:700;color:var(--text);line-height:1}
.card-val.blue{color:var(--accent)}
.card-val.warm{color:var(--warm)}
.card-note{font-size:10px;color:var(--text3);margin-top:3px;font-family:'Inter',sans-serif}

/* MAIN TABLE */
table{width:100%;border-collapse:collapse}
th{font-family:'JetBrains Mono',monospace;font-size:8.5px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;color:var(--text3);padding:9px 12px;text-align:left;background:rgba(255,255,255,0.03);border-bottom:1px solid var(--border)}
th.r{text-align:right}
td{padding:12px 12px;font-size:12px;color:var(--text);border-bottom:1px solid var(--border2);vertical-align:middle}
td.r{text-align:right;font-family:'JetBrains Mono',monospace;font-size:11px}
td.dim{color:var(--text3)}
td.dim.r{color:var(--text3)}
tr.hl td{background:rgba(142,197,224,0.05)}
tr.pool td{background:rgba(232,168,124,0.03)}
tfoot td{padding:11px 12px;font-family:'Sora',sans-serif;font-size:11px;font-weight:700;border-top:1px solid rgba(255,255,255,0.12);border-bottom:none}
tfoot td.r{text-align:right;font-family:'JetBrains Mono',monospace}

/* BADGE */
.badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:8px;padding:2px 7px;border-radius:999px;letter-spacing:0.3px;text-transform:uppercase}
.b-founder{background:rgba(142,197,224,0.12);color:var(--accent);border:1px solid rgba(142,197,224,0.2)}
.b-pool{background:rgba(232,168,124,0.10);color:var(--warm);border:1px solid rgba(232,168,124,0.18)}
.b-open{background:rgba(255,255,255,0.05);color:var(--text3);border:1px solid var(--border)}

/* BAR */
.bar-bg{background:rgba(255,255,255,0.06);border-radius:999px;height:5px;width:80px;overflow:hidden;display:inline-block;vertical-align:middle;margin-left:8px}
.bar-fill{height:100%;border-radius:999px}
.fill-main{background:linear-gradient(90deg,#8EC5E0,#A8D4E8)}
.fill-pool{background:rgba(232,168,124,0.45)}
.fill-empty{background:rgba(255,255,255,0.08)}

/* VESTING TABLE */
.vest-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vest-card{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px 18px}
.vest-title{font-family:'Sora',sans-serif;font-size:11px;font-weight:600;color:var(--text);margin-bottom:10px}
.vest-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border2)}
.vest-row:last-child{border-bottom:none}
.vest-lbl{font-size:11px;color:var(--text2)}
.vest-val{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--accent)}

/* PRO FORMA */
.proforma{background:var(--bg);border:1px solid rgba(142,197,224,0.15);border-radius:8px;overflow:hidden}
.pf-header{background:rgba(142,197,224,0.08);padding:10px 16px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent)}
.pf-table{width:100%;border-collapse:collapse}
.pf-table th{font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);padding:8px 14px;text-align:right;background:rgba(255,255,255,0.02);border-bottom:1px solid var(--border)}
.pf-table th:first-child{text-align:left}
.pf-table td{font-size:11px;padding:9px 14px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text);border-bottom:1px solid var(--border2)}
.pf-table td:first-child{text-align:left;font-family:'Inter',sans-serif;font-size:12px;color:var(--text)}
.pf-table tr.pf-vc td{color:var(--accent)}
.pf-table tfoot td{font-weight:700;border-top:1px solid rgba(255,255,255,0.1);border-bottom:none;color:var(--text)}

/* NOTES */
.notes{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px 20px}
.notes-lbl{font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:10px}
.notes ul{list-style:none;display:flex;flex-direction:column;gap:5px}
.notes li{font-size:11px;color:var(--text3);line-height:1.5;padding-left:14px;position:relative}
.notes li::before{content:'—';position:absolute;left:0;color:rgba(255,255,255,0.15)}
.notes li strong{color:var(--text2)}

/* FOOTER */
.footer{border-top:1px solid var(--border);padding:16px 48px;display:flex;justify-content:space-between;align-items:center;background:var(--bg)}
.footer span{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:rgba(255,255,255,0.2);letter-spacing:0.5px}
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div>
    <div class="logo">Cae<span>lith</span></div>
    <div style="font-size:11px;color:var(--text3);margin-top:4px;font-family:'Inter',sans-serif;">Caelith Technologies · Berlin, Germany (DE)</div>
  </div>
  <div class="doc-meta">
    <div class="doc-title">Capitalization Table</div>
    <div class="doc-sub">
      As of: 2 March 2026 · Version 1.1<br>
      Stage: Pre-Seed · Pre-Incorporation<br>
      Governing Law: German Law (GmbHG / UGG)<br>
      Currency: EUR
    </div>
  </div>
</div>

<div class="body">

<!-- SUMMARY CARDS -->
<div class="sec">
  <div class="sec-title">Summary — Share Capital</div>
  <div class="cards">
    <div class="card">
      <div class="card-lbl">Authorized Shares</div>
      <div class="card-val blue">10,000,000</div>
      <div class="card-note">Ordinary class · EUR 0.001 par</div>
    </div>
    <div class="card">
      <div class="card-lbl">Issued &amp; Outstanding</div>
      <div class="card-val">8,500,000</div>
      <div class="card-note">100% founder · unvested portion noted</div>
    </div>
    <div class="card">
      <div class="card-lbl">Option Pool (ESOP)</div>
      <div class="card-val warm">1,500,000</div>
      <div class="card-note">15% reserved · 0 granted to date</div>
    </div>
    <div class="card">
      <div class="card-lbl">Total Share Capital</div>
      <div class="card-val">€ 8,500</div>
      <div class="card-note">At EUR 0.001 par value per share</div>
    </div>
    <div class="card">
      <div class="card-lbl">External Investment</div>
      <div class="card-val" style="font-size:14px;color:var(--text3);">None</div>
      <div class="card-note">Pre-seed round open</div>
    </div>
  </div>
</div>

<!-- OWNERSHIP TABLE -->
<div class="sec">
  <div class="sec-title">Ownership Breakdown</div>
  <table>
    <thead>
      <tr>
        <th style="width:22%">Shareholder</th>
        <th>Type</th>
        <th style="width:10%">Share Class</th>
        <th class="r">Shares Issued</th>
        <th class="r">% Issued</th>
        <th class="r">% Fully Diluted</th>
        <th class="r" style="width:18%">Visual</th>
      </tr>
    </thead>
    <tbody>
      <tr class="hl">
        <td>
          <div style="font-weight:600;font-size:12px;">Julian Laycock</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px;">julian.laycock@caelith.tech</div>
        </td>
        <td><span class="badge b-founder">Founder &amp; CEO</span></td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text2);">Ordinary</td>
        <td class="r">8,500,000</td>
        <td class="r">100.0%</td>
        <td class="r">85.0%</td>
        <td class="r">
          <div class="bar-bg" style="width:90px"><div class="bar-fill fill-main" style="width:85%"></div></div>
        </td>
      </tr>
      <tr class="pool">
        <td>
          <div style="font-weight:500;font-size:12px;color:var(--text2);">ESOP Pool</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px;">0 options granted · reserved only</div>
        </td>
        <td><span class="badge b-pool">Option Pool</span></td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);">Options</td>
        <td class="r dim">1,500,000</td>
        <td class="r dim">—</td>
        <td class="r dim">15.0%</td>
        <td class="r">
          <div class="bar-bg" style="width:90px"><div class="bar-fill fill-pool" style="width:15%"></div></div>
        </td>
      </tr>
      <tr>
        <td>
          <div style="font-weight:500;font-size:12px;color:var(--text3);">Pre-Seed Investors</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px;">Round not yet closed</div>
        </td>
        <td><span class="badge b-open">Open Round</span></td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text3);">Preferred*</td>
        <td class="r dim">—</td>
        <td class="r dim">—</td>
        <td class="r dim">TBD</td>
        <td class="r">
          <div class="bar-bg" style="width:90px"><div class="bar-fill fill-empty" style="width:4%"></div></div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);">Total (fully diluted basis)</td>
        <td class="r">10,000,000</td>
        <td class="r">100.0%</td>
        <td class="r">100.0%</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  <div style="font-size:10px;color:var(--text3);margin-top:7px;font-family:'Inter',sans-serif;">* Preferred shares subject to negotiation at closing. No liquidation preference, anti-dilution, or drag-along rights are currently in place.</div>
</div>

<!-- VESTING + ESOP SIDE BY SIDE -->
<div class="sec">
  <div class="sec-title">Founder Vesting &amp; ESOP Terms</div>
  <div class="vest-grid">
    <div class="vest-card">
      <div class="vest-title">Founder Vesting Schedule — Julian Laycock</div>
      <div class="vest-row"><span class="vest-lbl">Total Shares</span><span class="vest-val">8,500,000</span></div>
      <div class="vest-row"><span class="vest-lbl">Vesting Period</span><span class="vest-val">48 months (4 years)</span></div>
      <div class="vest-row"><span class="vest-lbl">Cliff</span><span class="vest-val">12 months (1 year)</span></div>
      <div class="vest-row"><span class="vest-lbl">Shares at Cliff (25%)</span><span class="vest-val">2,125,000</span></div>
      <div class="vest-row"><span class="vest-lbl">Monthly thereafter</span><span class="vest-val">177,083 / month</span></div>
      <div class="vest-row"><span class="vest-lbl">Acceleration</span><span class="vest-val">Single-trigger on change of control</span></div>
      <div class="vest-row"><span class="vest-lbl">Commencement Date</span><span class="vest-val">1 February 2026</span></div>
    </div>
    <div class="vest-card">
      <div class="vest-title">Employee Option Pool (ESOP)</div>
      <div class="vest-row"><span class="vest-lbl">Pool Size</span><span class="vest-val" style="color:var(--warm);">1,500,000 (15%)</span></div>
      <div class="vest-row"><span class="vest-lbl">Granted to Date</span><span class="vest-val">0</span></div>
      <div class="vest-row"><span class="vest-lbl">Available</span><span class="vest-val" style="color:var(--warm);">1,500,000</span></div>
      <div class="vest-row"><span class="vest-lbl">Standard Vesting</span><span class="vest-val">4yr / 1yr cliff</span></div>
      <div class="vest-row"><span class="vest-lbl">Exercise Price</span><span class="vest-val">TBD at grant date</span></div>
      <div class="vest-row"><span class="vest-lbl">Plan Type</span><span class="vest-val">Virtual ESOP (pre-incorp.)</span></div>
      <div class="vest-row"><span class="vest-lbl">Convertible Notes / SAFEs</span><span class="vest-val">None outstanding</span></div>
    </div>
  </div>
</div>

<!-- PRO-FORMA POST INVESTMENT -->
<div class="sec">
  <div class="sec-title">Pro-Forma Post-Investment Scenarios</div>
  <div class="proforma">
    <div class="pf-header">Illustrative dilution at various investment sizes — pre-money valuation: EUR 3,000,000</div>
    <table class="pf-table">
      <thead>
        <tr>
          <th>Shareholder</th>
          <th>Pre-Investment</th>
          <th>Post · €200K (6.25%)</th>
          <th>Post · €500K (14.3%)</th>
          <th>Post · €1M (25.0%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Julian Laycock (Founder)</td>
          <td>85.0%</td>
          <td>79.7%</td>
          <td>72.9%</td>
          <td>63.8%</td>
        </tr>
        <tr>
          <td style="color:var(--text3)">ESOP Pool</td>
          <td style="color:var(--text3)">15.0%</td>
          <td style="color:var(--text3)">14.1%</td>
          <td style="color:var(--text3)">12.9%</td>
          <td style="color:var(--text3)">11.3%</td>
        </tr>
        <tr class="pf-vc">
          <td style="color:var(--accent)">New Investor(s)</td>
          <td style="color:var(--text3)">—</td>
          <td>6.3%</td>
          <td>14.3%</td>
          <td>25.0%</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>100.0%</td>
          <td>100.0%</td>
          <td>100.0%</td>
          <td>100.0%</td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div style="font-size:10px;color:var(--text3);margin-top:7px;">Pre-money valuation is indicative. Final terms subject to negotiation. New shares issued from authorized but unissued pool.</div>
</div>

<!-- NOTES -->
<div class="sec">
  <div class="notes">
    <div class="notes-lbl">Representations &amp; Key Notes</div>
    <ul>
      <li><strong>Incorporation status:</strong> Company is pre-incorporation as of this date. German UG (haftungsbeschränkt) to be registered Q2 2026, with planned conversion to GmbH upon first institutional raise.</li>
      <li><strong>No dilutive instruments:</strong> No SAFEs, convertible notes, warrants, or outstanding options exist as of the date of this document.</li>
      <li><strong>Share class:</strong> All issued shares are Ordinary shares. Preferred share class (with standard VC protective provisions) to be created at closing of first institutional round.</li>
      <li><strong>Founder vesting:</strong> Subject to a 48-month vesting schedule with a 12-month cliff, commencing 1 February 2026, to be formalized at incorporation.</li>
      <li><strong>IP assignment:</strong> All intellectual property developed to date is solely owned by Julian Laycock and will be assigned to the company at incorporation.</li>
      <li><strong>Governing law:</strong> German Law (GmbH-Gesetz). This document is for informational purposes and does not constitute a binding legal instrument.</li>
    </ul>
  </div>
</div>

</div><!-- /body -->

<!-- FOOTER -->
<div class="footer">
  <span>CAELITH TECHNOLOGIES · CONFIDENTIAL — FOR AUTHORIZED RECIPIENTS ONLY</span>
  <span>Cap Table v1.1 · 2 March 2026 · julian.laycock@caelith.tech</span>
</div>

</body>
</html>`;

writeFileSync('C:/Users/julia/openclaw-workspace/cap-table-v2.html', html, 'utf8');
console.log('HTML written');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto('file:///C:/Users/julia/openclaw-workspace/cap-table-v2.html', { waitUntil: 'networkidle0' });
await page.pdf({
  path: 'C:/Users/julia/openclaw-workspace/caelith-cap-table-v2.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('PDF written: caelith-cap-table-v2.pdf');
