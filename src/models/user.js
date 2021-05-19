import { getUserInfo } from '@/services/user';
import {message} from "antd";
import getErrorMessage from "@/services/error";
import {Result as ApiResult} from "@/services/result";
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const {result, reply} = yield call(getUserInfo);
      if (result !== ApiResult.SUCCESS) {
        message.error(getErrorMessage(result));
        return;
      }
      yield put({
        type: 'saveCurrentUser',
        payload: reply,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
