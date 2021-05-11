import { fakeSubmitForm, getCoursesBySchool, getTeacherList } from './service';
import {Result} from '@/services/consts';

const Model = {
  namespace: 'addReviewForm',
  state: {
    current: 'courseInfo',
    hasCourseList: false,
    courseList: [],
    hasTeacherList: false,
    teacherList: [],
    formData: {},
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

    *fetchTeacherList({payload}, {call, put}) {
      const {result, reply} = yield call(getTeacherList);
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveTeacherList',
          payload: reply,
        })
      }
    },

    *submitForm({ payload }, { call, put }) {
      console.log("submitForm", payload);
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'switchStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    switchStep(state, { payload }) {
      console.log(payload);
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, formData: { ...state.formData, ...payload } };
    },

    saveCourseList(state, { payload }) {
      return {...state, courseList: payload, hasCourseList: true}
    },

    saveTeacherList(state, {payload}) {
      return {...state, teacherList: payload, hasTeacherList: true}
    }
  },
};
export default Model;
