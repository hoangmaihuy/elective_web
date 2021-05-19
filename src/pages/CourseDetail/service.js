import {postTuikeApi} from "@/services/requests";
import { TuikeCourseApi, TuikeReviewApi } from "@/services/api";

export async function getCourseInfo(courseId) {
  return postTuikeApi(TuikeCourseApi.GET_COURSE_INFO, {
    course_id: courseId,
  })
}

export async function getCourseReviews(courseId, pagination, params) {
  let data = {
    course_id: courseId,
    current_page: pagination.current,
    page_size: pagination.pageSize,
  }
  if (params.teacherId)
    data.teacher_id = params.teacherId;
  return postTuikeApi(TuikeReviewApi.GET_COURSE_REVIEWS, data);
}

export async function interactReview(reviewId, action) {
  return postTuikeApi(TuikeReviewApi.INTERACT_REVIEW, {
    review_id: reviewId,
    action,
  })
}
