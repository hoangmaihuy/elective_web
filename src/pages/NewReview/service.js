import request from 'umi-request';
import {getTuikeApi, postTuikeApi} from "@/services/requests";
import {TuikeCourseApi, TuikeTeacherApi, TuikeReviewApi} from "@/services/consts";
import {getAllSchoolIds} from "@/consts/school";

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function getCoursesBySchool() {
  return postTuikeApi(TuikeCourseApi.GET_COURSES_BY_SCHOOL, {
    school_ids: getAllSchoolIds()
  })
}

export async function getTeacherList() {
  return getTuikeApi(TuikeTeacherApi.GET_TEACHER_LIST);
}

export async function addReview(data) {
  return postTuikeApi(TuikeReviewApi.ADD_REVIEW, data)
}
