import {getLatestReviews, getCourseRank} from "@/pages/Welcome/service";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {Result} from "@/services/result";

const Model = {
  namespace: 'welcome',
  state: {
    latestReviews: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    specialityRank: { // 专业课
      schoolId: 0,
      courses: []
    },
    publicChoiceRank: { // 公选课
      courses: []
    },
    generalElectiveRank: { // 通选课
      courseType: 500,
      courses: [],
    },
    politicsRank: { // 政治课
      courses: []
    }
  },

  effects: {
    *fetchLatestReviews({payload}, {call, put}) {
      const {result, reply} = yield call(getLatestReviews, payload);
      if (result === Result.SUCCESS)
        yield put({
          type: 'saveLatestReviews',
          payload: reply,
        })
    },

    *fetchSpecialityRank({payload}, {call, put}) {
      const {result, reply} = yield call(getCourseRank, payload);
      if (result === Result.SUCCESS)
        yield put({
          type: 'saveSpecialityRank',
          payload: reply,
        })
    },

    *fetchPoliticsRank({payload}, {call, put}) {
      const {result, reply} = yield call(getCourseRank, payload);
      if (result === Result.SUCCESS)
        yield put({
          type: 'savePoliticsRank',
          payload: reply,
        })
    },

    *fetchPublicChoiceRank({payload}, {call, put}) {
      const {result, reply} = yield call(getCourseRank, payload);
      if (result === Result.SUCCESS)
        yield put({
          type: 'savePublicChoiceRank',
          payload: reply,
        })
    },

    *fetchGeneralElectiveRank({payload}, {call, put}) {
      const {result, reply} = yield call(getCourseRank, payload);
      if (result === Result.SUCCESS)
        yield put({
          type: 'saveGeneralElectiveRank',
          payload: reply,
        })
    },
  },

  reducers: {
    saveLatestReviews(state, {payload}) {
      return {
        ...state,
        latestReviews: payload.reviews,
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
        latestReviews: newCourseReviews,
      }
    },

    saveSpecialityRank(state, {payload}) {
      return {
        ...state,
        specialityRank: {
          ...state.specialityRank,
          courses: payload.courses,
        }
      }
    },

    savePoliticsRank(state, {payload}) {
      return {
        ...state,
        politicsRank: {
          ...state.politicsRank,
          courses: payload.courses,
        }
      }
    },

    savePublicChoiceRank(state, {payload}) {
      return {
        ...state,
        publicChoiceRank: {
          ...state.publicChoiceRank,
          courses: payload.courses,
        }
      }
    },

    saveGeneralElectiveRank(state, {payload}) {
      return {
        ...state,
        generalElectiveRank: {
          ...state.generalElectiveRank,
          courses: payload.courses,
        }
      }
    },
  },
}

export default Model;
