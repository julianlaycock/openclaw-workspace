const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const htmlPath = path.resolve(__dirname, 'index-v4.html');
  const outputPath = path.resolve(__dirname, 'caelith-pitch-deck-v4.pdf');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const totalSlides = 12;
  const width = 1920;
  const height = 1080;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });

  console.log('Loading pitch deck...');
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Capture each slide as a PNG buffer
  const slideBuffers = [];
  for (let i = 0; i < totalSlides; i++) {
    console.log(`Capturing slide ${i + 1}/${totalSlides}...`);
    await page.evaluate((idx) => window.goTo(idx), i);
    await new Promise(r => setTimeout(r, 500));
    const buffer = await page.screenshot({ type: 'png', fullPage: false });
    slideBuffers.push(buffer);
  }

  console.log('Assembling PDF...');

  // Create a new page with all slide images for pixel-perfect PDF
  const assemblyPage = await browser.newPage();
  await assemblyPage.setViewport({ width, height, deviceScaleFactor: 2 });

  // Build HTML with all slide images embedded as base64
  const imgTags = slideBuffers.map((buf, i) => {
    const b64 = buf.toString('base64');
    const pageBreak = i < totalSlides - 1 ? 'page-break-after: always;' : '';
    return `<div style="width:${width}px; height:${height}px; ${pageBreak} overflow:hidden;">
      <img src="data:image/png;base64,${b64}" style="width:${width}px; height:${height}px; display:block;" />
    </div>`;
  }).join('\n');

  const assemblyHtml = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; }
  body { width: ${width}px; }
  @page { size: ${width}px ${height}px; margin: 0; }
</style></head>
<body>${imgTags}</body></html>`;

  await assemblyPage.setContent(assemblyHtml, { waitUntil: 'networkidle0' });

  // Generate the PDF
  await assemblyPage.pdf({
    path: outputPath,
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log(`PDF saved to: ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
})();
