const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

const WaitTime = 500;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`)
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', 'user');
    localStorage.setItem('tuike-access-token', 'test_token');
  })
  await page.goto(`${BASE_URL}/review/new`);
})

describe('Test AddReview page', () => {
  it('should add review successfully', async () => {
    await page.waitForTimeout(WaitTime);
    await page.click("#courseName"); // click to select school
    await page.waitForTimeout(WaitTime);
    await page.click(".ant-select-tree-list-holder-inner > :nth-child(1) [focusable='false']"); // select first school
    await page.waitForTimeout(WaitTime);
    await page.click("[title*='学分']"); // select first course
    await page.waitForTimeout(WaitTime);
    await page.click("#teacherName"); // click to select teacher
    await page.waitForTimeout(WaitTime);
    await page.click(".ant-select-item-option-content"); // select first teacher
    await page.waitForTimeout(WaitTime);
    await page.click("#semester"); // select semester
    await page.waitForTimeout(WaitTime);
    await page.click("[title='20-21 春期'] .ant-select-item-option-content"); // click semester
    await page.waitForTimeout(WaitTime);
    await page.click("[data-inspector-line='192'] span"); // click next step
    await page.waitForTimeout(WaitTime);
    await page.type("#title", '标题');
    await page.type("#content", '内容');
    await page.click(".ant-btn-primary span"); // click submit
    await page.waitForTimeout(WaitTime);
    await page.waitForSelector('.ant-result-title'); // wait for result
    const result = await page.$('.ant-result-title');
    expect(await result.evaluate((node) => node.innerText)).toEqual('操作成功');
  })
})
