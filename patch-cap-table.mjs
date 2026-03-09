import { readFileSync, writeFileSync } from 'fs';
import puppeteer from 'puppeteer';

let html = readFileSync('C:/Users/julia/openclaw-workspace/cap-table-v2.html', 'utf8');

// Update pro-forma header
html = html.replace(
  'Illustrative dilution at various investment sizes — pre-money valuation: EUR 3,000,000',
  'Illustrative dilution — Pre-money valuation range: EUR 3,000,000 – EUR 5,000,000'
);

// Replace the pro-forma table body with a dual pre-money view
const OLD_TABLE = `      <tbody>
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
      </tfoot>`;

const NEW_TABLE = `      <tbody>
        <tr>
          <td colspan="7" style="font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);background:rgba(142,197,224,0.04);padding:6px 14px;">@ EUR 3,000,000 Pre-Money</td>
        </tr>
        <tr>
          <td>Julian Laycock (Founder)</td>
          <td>85.0%</td>
          <td>82.5% <span style="font-size:9px;color:var(--text3)">(+€200K)</span></td>
          <td>78.6% <span style="font-size:9px;color:var(--text3)">(+€500K)</span></td>
          <td>72.3% <span style="font-size:9px;color:var(--text3)">(+€750K)</span></td>
          <td>63.8% <span style="font-size:9px;color:var(--text3)">(+€1M)</span></td>
        </tr>
        <tr>
          <td style="color:var(--text3)">ESOP Pool</td>
          <td style="color:var(--text3)">15.0%</td>
          <td style="color:var(--text3)">14.6%</td>
          <td style="color:var(--text3)">13.9%</td>
          <td style="color:var(--text3)">12.8%</td>
          <td style="color:var(--text3)">11.3%</td>
        </tr>
        <tr class="pf-vc">
          <td style="color:var(--accent)">New Investor(s)</td>
          <td style="color:var(--text3)">—</td>
          <td>6.3%</td>
          <td>14.3%</td>
          <td>20.0%</td>
          <td>25.0%</td>
        </tr>
        <tr>
          <td colspan="7" style="font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--warm);background:rgba(232,168,124,0.04);padding:6px 14px;border-top:1px solid var(--border);">@ EUR 5,000,000 Pre-Money</td>
        </tr>
        <tr>
          <td>Julian Laycock (Founder)</td>
          <td>85.0%</td>
          <td>83.5%</td>
          <td>81.1%</td>
          <td>78.5%</td>
          <td>74.4%</td>
        </tr>
        <tr>
          <td style="color:var(--text3)">ESOP Pool</td>
          <td style="color:var(--text3)">15.0%</td>
          <td style="color:var(--text3)">14.7%</td>
          <td style="color:var(--text3)">14.3%</td>
          <td style="color:var(--text3)">13.9%</td>
          <td style="color:var(--text3)">13.1%</td>
        </tr>
        <tr class="pf-vc" style="border-bottom:1px solid var(--border)">
          <td style="color:var(--warm)">New Investor(s)</td>
          <td style="color:var(--text3)">—</td>
          <td style="color:var(--warm)">3.8%</td>
          <td style="color:var(--warm)">9.1%</td>
          <td style="color:var(--warm)">13.0%</td>
          <td style="color:var(--warm)">16.7%</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Investment Amount</td>
          <td style="color:var(--text3)">Pre</td>
          <td>€200,000</td>
          <td>€500,000</td>
          <td>€750,000</td>
          <td>€1,000,000</td>
        </tr>
      </tfoot>`;

html = html.replace(OLD_TABLE, NEW_TABLE);

// Fix table headers to add 5th column
html = html.replace(
  `          <th>Pre-Investment</th>
          <th>Post · €200K (6.25%)</th>
          <th>Post · €500K (14.3%)</th>
          <th>Post · €1M (25.0%)</th>`,
  `          <th>Pre-Investment</th>
          <th>+ €200K</th>
          <th>+ €500K</th>
          <th>+ €750K</th>
          <th>+ €1M</th>`
);

// Update the disclaimer below the table
html = html.replace(
  'Pre-money valuation is indicative. Final terms subject to negotiation. New shares issued from authorized but unissued pool.',
  'Pre-money valuation range EUR 3–5M is indicative and subject to negotiation. Dilution percentages calculated on a fully diluted basis including ESOP pool. New shares issued from authorized but unissued pool at closing.'
);

writeFileSync('C:/Users/julia/openclaw-workspace/cap-table-v2.html', html, 'utf8');
console.log('HTML patched');

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
console.log('PDF updated');
