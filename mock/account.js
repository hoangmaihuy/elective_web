import {Result} from "../src/services/result";

const TestUID = 3;
const TestEmail = 'test_example@pku.edu.cn';
const TestVerificationCode = '123456';
const TestToken = 'test_token';

export default {
  'POST /api/account/request_verification_code': (req, res) => {
    const { email } = req.body;
    if (email.endsWith('@pku.edu.cn'))
      res.send({result: Result.SUCCESS});
    else
      res.send({result: Result.ERROR_INVALID_EMAIL});
  },

  'POST /api/account/login': (req, res) => {
    const { email, verification_code } = req.body;
    if (email === TestEmail && verification_code === TestVerificationCode)
      res.send({
        result: Result.SUCCESS,
        reply: {
          access_token: TestToken,
        }
      })
    else
      res.send({
        result: Result.ERROR_VERIFICATION_CODE,
      })
  },

  'GET /api/account/get_user_info': (req, res) => {
    res.send({
      result: Result.SUCCESS,
      reply: {
        user_id: TestUID,
        email: TestEmail,
        authority: 'user',
        expiry: 0,
      }
    })
  },
}
