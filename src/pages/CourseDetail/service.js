import {postTuikeApi} from "@/services/requests";
import {TuikeCourseApi} from "@/services/consts";

export async function getCourseInfo(courseId) {
  return postTuikeApi(TuikeCourseApi.GET_COURSE_INFO, {
    course_id: courseId,
  })
}
