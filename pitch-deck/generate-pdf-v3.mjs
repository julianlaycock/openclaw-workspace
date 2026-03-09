import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, 'index-v3.html');

async function generatePDF() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Get total slides
  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Found ${totalSlides} slides`);
  
  // Generate PDF using print CSS
  await page.pdf({
    path: join(__dirname, 'caelith-pitch-deck-v3.pdf'),
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });
  
  console.log('PDF generated: caelith-pitch-deck-v3.pdf');
  await browser.close();
}

generatePDF().catch(console.error);
