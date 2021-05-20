import { waitForText } from "./utils";
import {isReactElementAlike} from "enzyme/build/Utils";

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
    await page.waitForSelector("[data-inspector-line='16']", {visibility: "visible"});
    // render TeacherList
    await page.waitForSelector("[class^='tags'], [class*=' tags']", {visibility: "visible"});
    await waitForText(page, "[class^='tagsTitle'], [class*=' tagsTitle']", '任课老师');
  })

  it('should render reviews panel', async () => {
    // wait for review panel
    await page.waitForSelector(".ant-card-bordered", {visibility: "visible"});
    // review number should greater than 0
    const reviewList = await page.$$('.ant-list-item')
    expect(reviewList.length).toBeGreaterThan(0);
  })

  it('should click on like/dislike', async () => {
    // wait for review panel
    await page.waitForSelector(".ant-card-bordered", {visibility: "visible"});
    await page.click('.anticon-like');
    await page.click('.anticon-dislike');
  })
});
