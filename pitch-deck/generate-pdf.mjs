import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = resolve(__dirname, 'index.html');
const outputPath = resolve(__dirname, 'caelith-pitch-deck.pdf');

const WIDTH = 1920;
const HEIGHT = 1080;

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

  const fileUrl = `file:///${inputPath.replace(/\\/g, '/')}`;
  console.log(`Loading ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Found ${slideCount} slides`);

  const screenshots = [];

  for (let i = 0; i < slideCount; i++) {
    console.log(`Capturing slide ${i + 1}/${slideCount}...`);
    await page.evaluate((idx, total) => {
      document.querySelectorAll('.slide').forEach((s, j) => {
        s.style.transition = 'none';
        s.style.opacity = j === idx ? '1' : '0';
        s.style.pointerEvents = j === idx ? 'auto' : 'none';
        s.style.transform = 'none';
        s.classList.toggle('active', j === idx);
      });
      // Hide nav chrome except slide counter
      document.querySelectorAll('.nav-dots, #progress-bar, #pdf-btn, #nav-hint').forEach(el => {
        if (el) el.style.display = 'none';
      });
      // Update and show slide counter
      const counter = document.querySelector('.slide-counter');
      if (counter) {
        counter.style.display = 'block';
        counter.style.opacity = '0.4';
        counter.textContent = `${idx + 1} / ${total}`;
        // Match theme
        const isDark = document.querySelectorAll('.slide')[idx].classList.contains('dark');
        counter.style.color = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(45,51,51,0.4)';
      }
      document.body.classList.remove('show-notes');
    }, i, slideCount);

    await new Promise(r => setTimeout(r, 500));
    const shot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    screenshots.push(shot);
  }

  console.log('Assembling PDF...');
  const pdfPage = await browser.newPage();
  await pdfPage.setViewport({ width: WIDTH, height: HEIGHT });

  const imgTags = screenshots.map(buf =>
    `<div class="pg"><img src="data:image/png;base64,${buf.toString('base64')}" /></div>`
  ).join('\n');

  await pdfPage.setContent(`<!DOCTYPE html><html><head><style>
    *{margin:0;padding:0}
    @page{size:1920px 1080px;margin:0}
    .pg{width:1920px;height:1080px;page-break-after:always;overflow:hidden}
    .pg:last-child{page-break-after:auto}
    .pg img{width:100%;height:100%;object-fit:cover;display:block}
  </style></head><body>${imgTags}</body></html>`, { waitUntil: 'load' });

  await pdfPage.pdf({
    path: outputPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log(`PDF saved: ${outputPath}`);
  await browser.close();
}

generatePDF().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
