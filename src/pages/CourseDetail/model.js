import {getCourseInfo} from './service';
import {Result} from '@/services/consts';
import SchoolList from "@/consts/school";
import CourseType from "@/consts/courseType";
import {getTeachersByCourse} from "@/pages/AddReview/service";

const Model = {
  namespace: 'courseDetail',
  state: {
    status: undefined,
    courseInfo: {},
    teacherList: [],
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

    *fetchTeacherList({payload}, {call, put}) {
      const {result, reply} = yield call(getTeachersByCourse, payload);
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveTeacherList',
          payload: reply.teachers,
        })
      }
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
          courseNo: courseInfo.course_no,
          type: courseInfo.type,
          typeName: CourseType[courseInfo.type],
          schoolName: SchoolList[courseInfo.school_id],
          credit: courseInfo.credit,
          reviewCount: courseInfo.review_count,
          recommendScore: courseInfo.recommend_score.toFixed(2),
          contentScore: courseInfo.content_score.toFixed(2),
          workScore: courseInfo.work_score.toFixed(2),
          examScore: courseInfo.exam_score.toFixed(2),
        },
      }
    },

    saveTeacherList(state, {payload}) {
      return {...state, teacherList: payload}
    }

  },
};
export default Model;
