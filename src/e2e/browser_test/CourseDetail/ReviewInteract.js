const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/course/1234')
    await page.waitForSelector(".ant-card-bordered", {visibility: "visible"});
    await page.waitForTimeout(2000);
    await page.click(".anticon-like");
    await page.waitForTimeout(2000);
    await page.click(".anticon-dislike");
    await page.waitForTimeout(100000);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
