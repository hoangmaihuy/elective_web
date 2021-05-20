const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/courses')
    await page.waitForSelector('.ant-pro-form-collapse-button');
    await page.click(".ant-pro-form-collapse-button");
    await page.click("#type");
    await page.waitForTimeout(1000);
    await page.click("div[label='专业课'] div");
    await page.click(".ant-btn-primary");
    await page.waitForTimeout(1000);
    await page.waitForTimeout(100000);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
