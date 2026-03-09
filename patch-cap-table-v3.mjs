import { readFileSync, writeFileSync } from 'fs';
import puppeteer from 'puppeteer';

let html = readFileSync('C:/Users/julia/openclaw-workspace/cap-table-v2.html', 'utf8');

// 1. Update pro-forma header
html = html.replace(
  'Illustrative dilution — Pre-money valuation range: EUR 3,000,000 – EUR 5,000,000',
  'Illustrative dilution — Pre-money valuation range: EUR 3,000,000 – EUR 5,000,000 · Arcanys typical deal: USD 400K–800K (team + cash)'
);

// 2. Add €600K column to headers
html = html.replace(
  `          <th>Pre-Investment</th>
          <th>+ €200K</th>
          <th>+ €500K</th>
          <th>+ €750K</th>
          <th>+ €1M</th>`,
  `          <th>Pre-Investment</th>
          <th>+ €200K</th>
          <th>+ €500K</th>
          <th>+ €600K ★</th>
          <th>+ €1M</th>`
);

// 3. Update @3M pre-money rows — replace €750K column with €600K
html = html.replace(
  `          <td>72.3% <span style="font-size:9px;color:var(--text3)">(+€750K)</span></td>`,
  `          <td>73.9% <span style="font-size:9px;color:var(--text3)">(+€600K)</span></td>`
);
html = html.replace(
  `          <td style="color:var(--text3)">12.8%</td>
          <td style="color:var(--text3)">11.3%</td>`,
  `          <td style="color:var(--text3)">13.0%</td>
          <td style="color:var(--text3)">11.3%</td>`
);
html = html.replace(
  `          <td>20.0%</td>
          <td>25.0%</td>`,
  `          <td style="color:var(--accent);font-weight:600">16.7%</td>
          <td>25.0%</td>`
);

// 4. Update @5M pre-money rows — replace €750K with €600K
html = html.replace(
  `          <td>78.5%</td>`,
  `          <td>80.5%</td>`
);
html = html.replace(
  `          <td style="color:var(--text3)">13.9%</td>`,
  `          <td style="color:var(--text3)">14.2%</td>`
);
html = html.replace(
  `          <td style="color:var(--warm)">13.0%</td>`,
  `          <td style="color:var(--warm);font-weight:600">10.7%</td>`
);

// 5. Update tfoot investment row
html = html.replace(
  `          <td>€750,000</td>`,
  `          <td>€600,000 ★</td>`
);

// 6. Add ★ legend below table
html = html.replace(
  'Pre-money valuation range EUR 3–5M is indicative and subject to negotiation. Dilution percentages calculated on a fully diluted basis including ESOP pool. New shares issued from authorized but unissued pool at closing.',
  'Pre-money valuation range EUR 3–5M is indicative and subject to negotiation. ★ EUR 600K column represents the midpoint of Arcanys Ventures\' typical investment range (USD 400K–800K, team + cash combined). Dilution on a fully diluted basis including ESOP. New shares issued from authorized but unissued pool at closing.'
);

// 7. Add note about work-for-equity model to the notes section
html = html.replace(
  '<li><strong>Governing law:</strong> German Law (GmbH-Gesetz). This document is for informational purposes and does not constitute a binding legal instrument.</li>',
  `<li><strong>Governing law:</strong> German Law (GmbH-Gesetz). This document is for informational purposes and does not constitute a binding legal instrument.</li>
      <li><strong>In-kind investment:</strong> Company is open to work-for-equity structures whereby a portion of the investment is fulfilled via dedicated engineering resources (valued at market rate), with the remainder in cash. Total consideration to be agreed and reflected in a formal subscription agreement at closing.</li>
      <li><strong>Valuation basis:</strong> Pre-money valuation of EUR 3–5M reflects first-mover position in automated AIFMD II filing (April 16, 2026 regulatory deadline), proprietary XSD validation pipeline, and absence of direct automated competitors in the EU fund compliance market.</li>`
);

writeFileSync('C:/Users/julia/openclaw-workspace/cap-table-v2.html', html, 'utf8');
console.log('HTML patched');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto('file:///C:/Users/julia/openclaw-workspace/cap-table-v2.html', { waitUntil: 'networkidle0' });
await page.pdf({
  path: 'C:/Users/julia/openclaw-workspace/caelith-cap-table-final.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('PDF: caelith-cap-table-final.pdf');
