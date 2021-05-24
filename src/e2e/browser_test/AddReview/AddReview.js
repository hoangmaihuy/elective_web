"use strict";

const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/review/new");
    await page.waitForTimeout(500);
    await page.click("#courseName");
    await page.waitForTimeout(500);
    await page.click(".ant-select-tree-list-holder-inner > :nth-child(1) [focusable='false']");
    await page.waitForTimeout(500);
    await page.click("[title*='学分']");
    await page.waitForTimeout(500);
    await page.click("#teacherName");
    await page.waitForTimeout(500);
    await page.click(".ant-select-item-option-content");
    await page.waitForTimeout(500);
    await page.click("#semester");
    await page.waitForTimeout(500);
    await page.click("[title='20-21 春期'] .ant-select-item-option-content");
    await page.waitForTimeout(500);
    await page.click("[data-inspector-line='192'] span");
    await page.waitForTimeout(500);
    await page.click("#title");
    await page.waitForTimeout(500);
    await page.type("#title", '标题');
    await page.waitForTimeout(500);
    await page.type("#content", '内容');
    await page.waitForTimeout(500);
    await page.click(".ant-btn-primary span");
    await page.waitForTimeout(100000);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();

