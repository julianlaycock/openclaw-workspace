import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'caelith-kpi-metrics.html');
const pdfPath  = path.join(__dirname, 'caelith-kpi-metrics.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 5000 });
await page.emulateMedia({ media: 'screen' });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
await page.pdf({
  path: pdfPath,
  printBackground: true,
  width: '1200px',
  height: `${pageHeight + 80}px`,
  pageRanges: '1',
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`✓ PDF saved to ${pdfPath}`);
