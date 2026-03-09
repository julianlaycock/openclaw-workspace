import { chromium } from "@playwright/test";

const MOBILE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: MOBILE_UA, viewport: { width: 375, height: 812 } });
const page = await ctx.newPage();
await page.goto("https://www.caelith.tech/");
const offenders = await page.evaluate(() =>
  [...document.querySelectorAll("*")]
    .filter(el => el.scrollWidth > 375)
    .map(el => ({ tag: el.tagName, cls: el.className?.toString().substring(0,50), w: el.scrollWidth, id: el.id }))
    .slice(0, 20)
);
console.log(JSON.stringify(offenders, null, 2));
await browser.close();
