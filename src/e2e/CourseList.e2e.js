const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`)
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', 'user');
    localStorage.setItem('tuike-access-token', 'test_token');
  })
  await page.goto(`${BASE_URL}/courses`);
})

describe('Test CourseList page',  () => {
  it('should display 20 courses', async () => {
    await page.waitForSelector('.ant-table-row'); // wait for first row loaded
    const courseRows = await page.$$('tr.ant-table-row');
    expect(courseRows.length).toEqual(20);
  });

  it('should display 50 courses', async () => {
    await page.waitForSelector('.ant-pagination-options-size-changer');
    await page.click('.ant-pagination-options-size-changer'); // click on size changer
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[title^="50"]');
    await page.click('div[title^="50"]') // select 50 courses/page
    await page.waitForTimeout(1000);
    const courseRows = await page.$$('tr.ant-table-row');
    expect(courseRows.length).toBeGreaterThanOrEqual(50);
  })

  it('should filter courses by type', async () => {
    await page.waitForSelector('.ant-pro-form-collapse-button');
    await page.click(".ant-pro-form-collapse-button");
    await page.click("#type");
    await page.waitForTimeout(1000);
    await page.click("div[label='专业课'] div");
    await page.click(".ant-btn-primary");
    await page.waitForTimeout(1000);
    const html = await page.content();
    expect((html.match(/专业课/g) || []).length).toBeGreaterThanOrEqual(20);
  })


  it('should filter courses by school', async () => {
    await page.waitForSelector('.ant-pro-form-collapse-button');
    await page.click(".ant-pro-form-collapse-button");
    await page.click("#school_id");
    await page.waitForTimeout(1000);
    await page.click("[label='化学与分子工程学院']");
    await page.click(".ant-btn-primary");
    await page.waitForTimeout(1000);
    const html = await page.content();
    expect((html.match(/化学与分子工程学院/g) || []).length).toBeGreaterThanOrEqual(20);
  })
});
