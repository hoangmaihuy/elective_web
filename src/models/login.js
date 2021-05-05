import { stringify } from 'querystring';
import { history } from 'umi';
import { login } from '@/services/login';
import { setToken, setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import {Result as ApiResult} from '@/services/consts'
import getErrorMessage from '@/services/error'

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const {result, reply} = yield call(login, payload.email, payload.captcha);
      console.log(result, reply);
      if (result !== ApiResult.SUCCESS) {
        message.error(getErrorMessage(result));
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: reply,
      }); // Login successfully

      if (result === ApiResult.SUCCESS) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery()
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log("changeLoginStatus, payload=", payload);
      setAuthority(payload.authority);
      setToken(payload.access_token);
      return { ...state, status: 'ok' };
    },
  },
};
export default Model;
