import {postTuikeApi} from "@/services/requests";
import {TuikeReviewApi} from "@/services/api";

export function getLatestReviews(pagination) {
  const offset = (pagination.current-1) * pagination.pageSize;
  return postTuikeApi(TuikeReviewApi.GET_LATEST_REVIEWS, {
    offset,
    size: pagination.pageSize,
  })
}
