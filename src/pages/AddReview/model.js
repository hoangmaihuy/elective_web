import { addReview, getCoursesBySchool, getTeachersByCourse, searchCoursesByName } from './service';
import {Result} from "@/services/result";

const Model = {
  namespace: 'addReviewForm',
  state: {
    current: 'courseInfo',
    searchCourseName: undefined,
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

    *fetchCourseListByName({payload}, {call, put, select}) {
      const currentSearchName = yield select(state => state.addReviewForm.searchCourseName);
      console.log("fetchCourseListByname", currentSearchName, payload);
      if (payload !== currentSearchName)
        return;
      if (!payload) {
        yield put({
          type: 'saveCourseList',
          payload: [],
        })
        return;
      }
      const { result, reply } = yield call(searchCoursesByName, payload)
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveCourseList',
          payload: reply,
        })
      }
    },

    *fetchTeacherList({payload}, {call, put}) {
      console.log("fetchTeacherList", payload);
      const {result, reply} = yield call(getTeachersByCourse, payload);
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveTeacherList',
          payload: reply.teachers,
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
      return {...state, courseList: payload}
    },

    saveTeacherList(state, {payload}) {
      return {...state, teacherList: payload, hasTeacherList: true}
    },

    saveSearchCourseName(state, {payload}) {
      return {...state, searchCourseName: payload}
    }
  },
};
export default Model;
