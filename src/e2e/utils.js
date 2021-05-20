export async function waitForText(page, selector, expectedText) {
  await page.waitForFunction((selector, expectedText) => {
    const element = document.querySelector(selector);
    return element && element.textContent.replace(/[\r\n]+/g, "").trim() === expectedText.trim();
  }, {polling: "raf"}, selector, expectedText);
}
