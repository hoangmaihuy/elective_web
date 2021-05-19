import {TuikeAccountApi} from './api'
import request from 'umi-request';
import {postTuikeApi} from './requests';

export async function requestVerificationCode(email) {
  return postTuikeApi(TuikeAccountApi.REQUEST_VERIFICATION_CODE, {
    email: email
  });
}

export async function login(email, verification_code) {
  return postTuikeApi(TuikeAccountApi.LOGIN, {
    email,
    verification_code,
  })
}
