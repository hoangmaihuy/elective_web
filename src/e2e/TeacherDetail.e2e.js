import { waitForText } from "./utils";

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

const WaitTime = 500;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`)
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', 'user');
    localStorage.setItem('tuike-access-token', 'test_token');
  })
  await page.goto(`${BASE_URL}/teacher/1234`);
})

describe('Test TeacherDetail page', () => {
  it('should render teacher info panel', async () => {
    await page.waitForSelector('#teacher-info-panel');
  })

  it('shoud render teacher reviews', async () => {
    await page.waitForTimeout(WaitTime);
    await page.waitForSelector('#teacher-reviews-panel');
    const reviews = await page.$$('.teacher-reviews');
    expect(reviews.length).toBeGreaterThan(0);
  })
})
