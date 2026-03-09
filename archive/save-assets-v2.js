const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(process.env.APPDATA || '', 'npm/node_modules/openclaw/node_modules/puppeteer-core'));

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:18800' });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('linkedin-assets'));
  
  if (!page) {
    console.log('Page not found!');
    process.exit(1);
  }

  const downloadsDir = path.join('C:', 'Users', 'julia', 'Downloads');

  // Screenshot individual elements
  const pairs = [
    ['#logo-v2', 'caelith-logo-300.png'],
    ['#banner-v2', 'caelith-banner-1128x191.png']
  ];

  for (const [selector, filename] of pairs) {
    const el = await page.$(selector);
    if (el) {
      await el.screenshot({ path: path.join(downloadsDir, filename), type: 'png' });
      console.log('Saved:', filename);
    }
  }

  browser.disconnect();
})();
