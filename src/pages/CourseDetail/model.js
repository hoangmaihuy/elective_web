import {getCourseInfo} from './service';
import {Result} from '@/services/consts';
import SchoolList from "@/consts/school";

const Model = {
  namespace: 'courseDetail',
  state: {
    status: undefined,
    courseInfo: {},
    courseReviews: [],
  },
  effects: {
    *fetchCourseInfo({payload}, { call, put }) {
      const {result, reply} = yield call(getCourseInfo, payload);
      yield put({
        type: 'saveCourseInfo',
        payload: {
          status: result,
          courseInfo: reply,
        },
      });

    },
  },
  reducers: {
    saveCourseInfo(state, {payload}) {
      const {status, courseInfo} = payload;
      if (status !== Result.SUCCESS)
        return {
          ...state,
          status,
          courseInfo: {},
        }

      return {
        ...state,
        status,
        courseInfo: {
          id: courseInfo.course_id,
          name: courseInfo.name,
          schoolName: SchoolList[courseInfo.school_id],
          credit: courseInfo.credit,
          reviewCount: courseInfo.review_count,
        },
      }
    },

  },
};
export default Model;
