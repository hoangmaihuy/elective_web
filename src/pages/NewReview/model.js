import { fakeSubmitForm, getCoursesBySchool } from './service';
import {Result} from '@/services/consts';

const Model = {
  namespace: 'newReviewForm',
  state: {
    current: 'courseInfo',
    hasCourseList: false,
    courseList: [],
    hasTeacherList: false,
    teacherList: [],
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },
  effects: {
    *fetchCourseList({payload}, {call, put}) {
      const {result, reply} = yield call(getCoursesBySchool)
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveCourseList',
          payload: reply,
        })
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    saveCourseList(state, { payload }) {
      return {...state, courseList: payload, hasCourseList: true}
    }
  },
};
export default Model;
