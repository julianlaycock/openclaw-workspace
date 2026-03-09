import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'caelith-finch-2pager.html');
const pdfPath  = path.join(__dirname, 'caelith-finch-2pager.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();

// Wide viewport so nothing collapses
await page.setViewportSize({ width: 1600, height: 5000 });
await page.emulateMedia({ media: 'screen' });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// Get exact full-page height after render
const pageHeight = await page.evaluate(() => document.body.scrollHeight);

await page.pdf({
  path: pdfPath,
  printBackground: true,
  width: '1600px',
  height: `${pageHeight}px`,
  pageRanges: '1',
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`✓ PDF saved to ${pdfPath} (1600 x ${pageHeight}px)`);
