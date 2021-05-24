const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

const TestEmail = 'test_example@pku.edu.cn';
const TestVerificationCode = '123456';
const TestToken = 'test_token';

beforeEach(async () => {
  await page.goto(`${BASE_URL}/user/login`)
})

describe('Test Login page', () => {
  it('should display invalid email', async () => {
    await page.type("#email", 'test_user');
    await page.waitForSelector('[role=alert]');
    const errorMessage = await page.$("[role=alert]");
    expect(await errorMessage.evaluate((node) => node.innerText)).toEqual('邮箱格式错误')
  })

  it('should display sent verification code', async () => {
    await page.type('#email', 'test_example@pku.edu.cn');
    await page.click('.ant-btn-lg'); // send verification code button
    await page.waitForSelector('.ant-message-success');
  })

  it('should display wrong verification code', async () => {
    await page.type('#email', TestEmail);
    await page.type('#captcha', '111111');
    await page.click('.ant-btn-primary'); // login button
    await page.waitForSelector('.ant-message-error');
  })

  it('should login successfully', async () => {
    await page.type('#email', TestEmail);
    await page.type('#captcha', TestVerificationCode);
    await page.click('.ant-btn-primary'); // login button
    await page.waitForSelector('.ant-message-success');
    expect(await page.evaluate(() => localStorage.getItem('tuike-access-token'))).toEqual(TestToken);
  })
})
