import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caelith — Cap Table</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  :root{
    --bg:#2D3333;
    --bg2:#1a1f1f;
    --accent:#8EC5E0;
    --warm:#E8A87C;
    --text:#F8F9FA;
    --text2:rgba(248,249,250,0.65);
    --border:rgba(255,255,255,0.08);
    --grad:linear-gradient(135deg,#8EC5E0,#E8A87C);
  }
  @page { margin: 0; size: A4; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg2);
    color: var(--text);
    width: 210mm;
    min-height: 297mm;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ─── HEADER ─── */
  .header {
    background: var(--bg);
    padding: 40px 52px 32px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .logo {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: var(--text);
    letter-spacing: -0.03em;
  }
  .logo span {
    background: linear-gradient(135deg, #8EC5E0, #E8A87C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .doc-meta {
    text-align: right;
  }
  .doc-meta .doc-title {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text2);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .doc-meta .doc-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.35);
  }

  /* ─── BODY ─── */
  .body { padding: 40px 52px; }

  /* ─── SECTION TITLE ─── */
  .section-title {
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }

  /* ─── SUMMARY CARDS ─── */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 40px;
  }
  .card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
  }
  .card-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .card-value {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
  }
  .card-value.accent { color: var(--accent); }
  .card-sub {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    margin-top: 3px;
    font-family: 'Inter', sans-serif;
  }

  /* ─── TABLE ─── */
  .table-wrap { margin-bottom: 40px; }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead tr {
    background: rgba(255,255,255,0.04);
  }
  thead th {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  thead th.right { text-align: right; }
  tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background .15s;
  }
  tbody tr.highlight {
    background: rgba(142,197,224,0.06);
  }
  tbody td {
    padding: 14px;
    font-size: 13px;
    color: var(--text);
    vertical-align: middle;
  }
  tbody td.right { text-align: right; }
  tbody td.mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
  }
  tbody td .badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 999px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .badge-founder { background: rgba(142,197,224,0.15); color: var(--accent); border: 1px solid rgba(142,197,224,0.25); }
  .badge-pool    { background: rgba(232,168,124,0.12); color: var(--warm);   border: 1px solid rgba(232,168,124,0.2); }
  .badge-investor{ background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 1px solid var(--border); }

  /* Bar */
  .bar-cell { min-width: 100px; }
  .bar-bg {
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    height: 6px;
    width: 100%;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #8EC5E0, #E8A87C);
  }
  .bar-fill.pool { background: rgba(232,168,124,0.5); }
  .bar-fill.empty { background: rgba(255,255,255,0.1); }

  /* Total row */
  tfoot tr { border-top: 1px solid rgba(255,255,255,0.12); }
  tfoot td {
    padding: 12px 14px;
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--text);
  }
  tfoot td.right { text-align: right; }

  /* ─── NOTES ─── */
  .notes {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 24px;
    margin-bottom: 32px;
  }
  .notes-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 12px;
  }
  .notes ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .notes li {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
    padding-left: 16px;
    position: relative;
  }
  .notes li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: rgba(255,255,255,0.2);
  }

  /* ─── FOOTER ─── */
  .footer {
    margin-top: auto;
    border-top: 1px solid var(--border);
    padding: 20px 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg);
  }
  .footer-left {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.5px;
  }
  .footer-right {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.2);
  }
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div class="logo">Cae<span>lith</span></div>
  <div class="doc-meta">
    <div class="doc-title">Capitalization Table</div>
    <div class="doc-date">As of March 2026 · Pre-Money · Pre-Incorporation</div>
  </div>
</div>

<!-- BODY -->
<div class="body">

  <!-- SUMMARY CARDS -->
  <div class="section-title">Summary</div>
  <div class="summary-grid">
    <div class="card">
      <div class="card-label">Total Shares</div>
      <div class="card-value accent">10,000,000</div>
      <div class="card-sub">Common shares authorized</div>
    </div>
    <div class="card">
      <div class="card-label">Issued Shares</div>
      <div class="card-value">8,500,000</div>
      <div class="card-sub">Founder allocation</div>
    </div>
    <div class="card">
      <div class="card-label">Option Pool</div>
      <div class="card-value">1,500,000</div>
      <div class="card-sub">15% reserved (unissued)</div>
    </div>
    <div class="card">
      <div class="card-label">Outside Investment</div>
      <div class="card-value">—</div>
      <div class="card-sub">Pre-seed / seed round open</div>
    </div>
  </div>

  <!-- CAP TABLE -->
  <div class="section-title">Ownership Breakdown</div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Shareholder</th>
          <th>Role</th>
          <th class="right">Shares</th>
          <th class="right">Ownership %</th>
          <th class="right">Fully Diluted %</th>
          <th>Allocation</th>
        </tr>
      </thead>
      <tbody>
        <tr class="highlight">
          <td>
            <div style="font-weight:600;font-size:13px;">Julian Laycock</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">julian.laycock@caelith.tech</div>
          </td>
          <td><span class="badge badge-founder">Founder &amp; CEO</span></td>
          <td class="right mono">8,500,000</td>
          <td class="right mono">100.0%</td>
          <td class="right mono">85.0%</td>
          <td class="bar-cell">
            <div class="bar-bg"><div class="bar-fill" style="width:85%"></div></div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-weight:500;font-size:13px;color:rgba(255,255,255,0.55);">Employee Option Pool</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px;">Future hires &amp; advisors</div>
          </td>
          <td><span class="badge badge-pool">ESOP Reserved</span></td>
          <td class="right mono" style="color:rgba(255,255,255,0.45);">1,500,000</td>
          <td class="right mono" style="color:rgba(255,255,255,0.45);">—</td>
          <td class="right mono" style="color:rgba(255,255,255,0.45);">15.0%</td>
          <td class="bar-cell">
            <div class="bar-bg"><div class="bar-fill pool" style="width:15%"></div></div>
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-weight:500;font-size:13px;color:rgba(255,255,255,0.35);">Investor Round</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.25);margin-top:2px;">Pre-seed — not yet closed</div>
          </td>
          <td><span class="badge badge-investor">Open</span></td>
          <td class="right mono" style="color:rgba(255,255,255,0.25);">—</td>
          <td class="right mono" style="color:rgba(255,255,255,0.25);">—</td>
          <td class="right mono" style="color:rgba(255,255,255,0.25);">TBD</td>
          <td class="bar-cell">
            <div class="bar-bg"><div class="bar-fill empty" style="width:5%"></div></div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.35);">Total (fully diluted)</td>
          <td class="right" style="font-family:'JetBrains Mono',monospace;">10,000,000</td>
          <td class="right">100.0%</td>
          <td class="right">100.0%</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>

  <!-- NOTES -->
  <div class="notes">
    <div class="notes-title">Notes &amp; Assumptions</div>
    <ul>
      <li>Company is pre-incorporation as of this date. Legal entity (UG or GmbH) to be registered in Germany in Q2 2026.</li>
      <li>Share structure is indicative. Final share count and par value will be set at incorporation per German GmbH/UG requirements.</li>
      <li>15% option pool is reserved for future key hires, advisors, and early employees. No options have been granted to date.</li>
      <li>No external capital has been raised. No SAFEs, convertible notes, or warrants are outstanding.</li>
      <li>Fully diluted calculation assumes full conversion of the ESOP pool. No other dilutive instruments exist.</li>
      <li>Contact: julian.laycock@caelith.tech · www.caelith.tech</li>
    </ul>
  </div>

</div>

<!-- FOOTER -->
<div class="footer">
  <div class="footer-left">CAELITH TECHNOLOGIES · CONFIDENTIAL · NOT FOR DISTRIBUTION</div>
  <div class="footer-right">Cap Table v1.0 · March 2026</div>
</div>

</body>
</html>`;

writeFileSync('C:/Users/julia/openclaw-workspace/cap-table.html', html, 'utf8');
console.log('HTML written');

// Generate PDF via Puppeteer
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.pdf({
  path: 'C:/Users/julia/openclaw-workspace/caelith-cap-table.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('PDF written: caelith-cap-table.pdf');
