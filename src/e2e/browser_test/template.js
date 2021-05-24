const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/')

    await page.waitForTimeout(100000);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
