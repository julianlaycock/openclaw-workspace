const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 810, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'index-v3.html');
  console.log('Loading deck:', filePath);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts + any remaining animations
  await new Promise(r => setTimeout(r, 3000));

  const outputPath = path.resolve(__dirname, 'caelith-pitch-deck-v3.pdf');

  await page.pdf({
    path: outputPath,
    width: '1440px',
    height: '810px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('✅ PDF saved to:', outputPath);
})();
