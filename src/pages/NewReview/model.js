import { addReview, getCoursesBySchool, getTeacherList } from './service';
import {Result} from '@/services/consts';

const Model = {
  namespace: 'addReviewForm',
  state: {
    current: 'courseInfo',
    hasCourseList: false,
    courseList: [],
    hasTeacherList: false,
    teacherList: [],
    submitStatus: undefined,
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
      const data = {
        course_id: payload.courseId,
        teacher_id: payload.teacherId,
        semester: payload.semester,
        title: payload.title,
        content: payload.content,
        recommend_score: payload.recommendScore,
        work_score: payload.workScore,
        exam_score: payload.examScore,
        content_score: payload.contentScore,
      }

      yield put({
        type: 'saveStepFormData',
        payload,
      });

      const {result} = yield call(addReview, data);
      yield put({
        type: 'saveSubmitStatus',
        payload: result,
      })

      yield put({
        type: 'switchStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    switchStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveSubmitStatus(state, { payload }) {
      return { ...state, submitStatus: payload }
    },

    resetFormData(state) {
      return { ...state, formData: {}}
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
