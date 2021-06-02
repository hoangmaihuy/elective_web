import { waitForText } from "./utils";

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

const WaitTime = 500;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`)
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', 'user');
    localStorage.setItem('tuike-access-token', 'test_token');
  })
  await page.goto(`${BASE_URL}/course/1234`);
})

describe('Test CourseDetail page', function () {
  it('should render info panel', async () => {
    // render CourseInfo
    await page.waitForSelector("#course-info-panel", {visibility: "visible"});
    // render TeacherList
    await page.waitForSelector("[class^='tags'], [class*=' tags']", {visibility: "visible"});
    await waitForText(page, "[class^='tagsTitle'], [class*=' tagsTitle']", '任课老师');
  })

  it('should render reviews panel', async () => {
    // wait for review panel
    await page.waitForSelector("#course-reviews-panel", {visibility: "visible"});
    // review number should greater than 0
    await page.waitForTimeout(500);
    const reviewList = await page.$$('.course-reviews')
    expect(reviewList.length).toBeGreaterThan(0);
  })

  it('should click on like/dislike', async () => {
    // wait for review panel
    await page.waitForSelector(".ant-card-bordered", {visibility: "visible"});
    await page.waitForSelector(".anticon-like");
    await page.click('.anticon-like');
    await page.waitForSelector(".anticon-dislike");
    await page.click('.anticon-dislike');
  })

  it('should render similar courses', async () => {
    // only render similar courses in large screen
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.waitForSelector('#similar-courses-panel');
    const coursesList = await page.$$('.ant-table-row');
    expect(coursesList.length).toBeGreaterThan(0);
  })
});
