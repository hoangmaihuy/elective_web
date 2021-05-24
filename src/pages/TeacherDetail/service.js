import {postTuikeApi} from "@/services/requests";
import {TuikeReviewApi, TuikeTeacherApi} from "@/services/api";

export function getTeacherInfo(teacherId) {
  return postTuikeApi(TuikeTeacherApi.GET_TEACHER_INFO, {
    teacher_id: teacherId,
  })
}

export function getTeacherReviews(teacherId, pagination) {
  return postTuikeApi(TuikeReviewApi.GET_TEACHER_REVIEWS, {
    teacher_id: teacherId,
    current_page: pagination.current,
    page_size: pagination.pageSize,
  })
}
