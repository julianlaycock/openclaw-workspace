import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDF(inputFile, outputFile, options = {}) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const filePath = path.join(__dirname, inputFile);
  console.log(`Generating ${outputFile}...`);
  
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  
  await page.pdf({
    path: path.join(__dirname, outputFile),
    format: options.format || 'A4',
    printBackground: true,
    margin: options.margin || { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
    ...(options.width ? { width: options.width, height: options.height } : {}),
  });
  
  console.log(`  ✅ ${outputFile}`);
  await browser.close();
}

async function main() {
  // One-pager (A4, 2 pages)
  await generatePDF('one-pager.html', 'caelith-one-pager.pdf', { format: 'A4' });
  
  // Financial model (A4 landscape)
  await generatePDF('financial-model.html', 'caelith-financial-model.pdf', { 
    format: 'A4',
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });
  
  console.log('\nAll PDFs generated.');
}

main().catch(err => { console.error(err); process.exit(1); });
