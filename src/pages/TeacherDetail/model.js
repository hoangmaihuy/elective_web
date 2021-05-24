import {getTeacherInfo, getTeacherReviews} from './service';
import {getTeachersByCourse} from "@/pages/AddReview/service";
import {interactReview} from "@/services/review";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {Result} from "@/services/result";

const Model = {
  namespace: 'teacherDetail',
  state: {
    status: undefined,
    teacherInfo: {},
    teacherReviews: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    }
  },
  effects: {
    *fetchTeacherInfo({payload}, { call, put }) {
      const {result, reply} = yield call(getTeacherInfo, payload);
      yield put({
        type: 'saveTeacherInfo',
        payload: {
          status: result,
          teacherInfo: reply,
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
    *fetchTeacherReviews({payload}, { call, put }) {
      const { teacherId, pagination } = payload;
      const { result, reply } = yield call(getTeacherReviews, teacherId, pagination)
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveTeacherReviews',
          payload: reply,
        })
      }
    },
    *interactReview({payload}, { call, put }) {
      const {reviewId, action} = payload;
      yield put({
        type: 'changeReviewInteract',
        payload,
      })
      yield call(interactReview, reviewId, action);
    }
  },
  reducers: {
    resetState(state) {
      return {
        status: undefined,
        teacherInfo: {},
        teacherReviews: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
        }
      }
    },

    saveTeacherInfo(state, {payload}) {
      const {status, teacherInfo} = payload;
      if (status !== Result.SUCCESS)
        return {
          ...state,
          status,
          teacherInfo: {},
        }

      return {
        ...state,
        status,
        teacherInfo: {
          id: teacherInfo.id,
          name: teacherInfo.name,
          reviewCount: teacherInfo.review_count,
          recommendScore: teacherInfo.recommend_score.toFixed(2),
          contentScore: teacherInfo.content_score.toFixed(2),
          workScore: teacherInfo.work_score.toFixed(2),
          examScore: teacherInfo.exam_score.toFixed(2),
        },
      }
    },

    saveTeacherReviews(state, {payload}) {
      return {
        ...state,
        teacherReviews: payload.reviews,
        pagination: {
          ...state.pagination,
          total: payload.total,
        }
      }
    },

    savePagination(state, {payload}) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      }
    },

    changeReviewInteract(state, {payload}) {
      const { reviewId, action} = payload;
      const newCourseReviews =  state.teacherReviews.map((review) => {
        if (review.id !== reviewId || review.interaction === action)
          return review;
        let newReview = {
          ...review
        }
        if (review.interaction === ReviewInteraction.LIKE)
          newReview.likes -= 1;
        else if (review.interaction === ReviewInteraction.DISLIKE)
          newReview.dislikes -= 1;
        newReview.interaction = action;

        if (action === ReviewInteraction.LIKE)
          newReview.likes += 1;
        else if (action === ReviewInteraction.DISLIKE)
          newReview.dislikes += 1;
        return newReview;
      })
      return {
        ...state,
        teacherReviews: newCourseReviews,
      }
    },
  },
};
export default Model;
