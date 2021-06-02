const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

const WaitTime = 500;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`)
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', 'user');
    localStorage.setItem('tuike-access-token', 'test_token');
  })
  await page.goto(`${BASE_URL}/welcome`);
})

describe('Test Welcome page',  () => {
  it('should render course ranks', async () => {
    // wait for page to load course rank
    await page.waitForSelector('#speciality-rank .ant-table-row');
    const specialityRank = await page.$$('#speciality-rank .ant-table-row');
    expect(specialityRank.length).toBeGreaterThan(0)

    await page.waitForSelector('#gym-rank .ant-table-row');
    const gymRank = await page.$$('#gym-rank .ant-table-row');
    expect(gymRank.length).toBeGreaterThan(0)

    await page.waitForSelector('#public-choice-rank .ant-table-row');
    const publicChoiceRank = await page.$$('#public-choice-rank .ant-table-row');
    expect(publicChoiceRank.length).toBeGreaterThan(0)

    await page.waitForSelector('#general-elective-rank .ant-table-row');
    const generalElectiveRank = await page.$$('#general-elective-rank .ant-table-row');
    expect(generalElectiveRank.length).toBeGreaterThan(0)
  })

  it('should render latest reviews', async () => {
    await page.waitForSelector('#latest-reviews-panel');
    await page.waitForTimeout(WaitTime);
    const reviews = await page.$$('.latest-reviews');
    expect(reviews.length).toBeGreaterThan(0);
  })
})
