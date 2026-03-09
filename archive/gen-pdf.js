const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/julia/openclaw-workspace/caelith-one-pager-de.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'C:/Users/julia/openclaw-workspace/caelith-one-pager-de.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await browser.close();
  console.log('PDF generated');
})();
