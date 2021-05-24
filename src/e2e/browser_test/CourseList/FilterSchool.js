const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/courses')
    await page.waitForSelector('.ant-pro-form-collapse-button');
    await page.click(".ant-pro-form-collapse-button");
    await page.click("#school_id");
    await page.waitForTimeout(1000);
    await page.click("[label='化学与分子工程学院']");
    await page.click(".ant-btn-primary");
    await page.waitForTimeout(100000);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
