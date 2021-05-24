import {postTuikeApi} from "@/services/requests";
import {TuikeReviewApi} from "@/services/api";

export async function interactReview(reviewId, action) {
  return postTuikeApi(TuikeReviewApi.INTERACT_REVIEW, {
    review_id: reviewId,
    action,
  })
}
