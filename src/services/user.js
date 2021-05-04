import request from 'umi-request';
import {getTuikeApi} from './requests';
import {TuikeAccountApi} from './consts'

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function getUserInfo() {
  return getTuikeApi(TuikeAccountApi.GET_USER_INFO, {});
}
