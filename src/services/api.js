export const TuikeApiHost = TUIKE_API_HOST;

const TEST_API_HOST = TUIKE_API_HOST + "/test";
export const TuikeTestApi = {
	TEST_ECHO : TEST_API_HOST + "/echo",
}

const ACCOUNT_API_HOST = TUIKE_API_HOST + "/account";
export const TuikeAccountApi = {
	REQUEST_VERIFICATION_CODE : ACCOUNT_API_HOST + "/request_verification_code",
	LOGIN : ACCOUNT_API_HOST + "/login",
	GET_USER_INFO : ACCOUNT_API_HOST + "/get_user_info",
}

const COURSE_API_HOST = TUIKE_API_HOST + "/course";
export const TuikeCourseApi = {
  GET_COURSE_LIST : COURSE_API_HOST + "/get_course_list",
  GET_COURSES_BY_SCHOOL : COURSE_API_HOST + "/get_courses_by_school",
  GET_COURSE_INFO : COURSE_API_HOST + "/get_course_info",
}

const TEACHER_API_HOST = TUIKE_API_HOST + "/teacher";
export const TuikeTeacherApi = {
  GET_TEACHER_LIST : TEACHER_API_HOST + "/get_teacher_list",
  GET_TEACHERS_BY_COURSE : TEACHER_API_HOST + "/get_teachers_by_course",
}

const REVIEW_API_HOST = TUIKE_API_HOST + "/review";
export const TuikeReviewApi = {
	ADD_REVIEW : REVIEW_API_HOST + "/add_review",
  GET_COURSE_REVIEWS : REVIEW_API_HOST + "/get_course_reviews",
  INTERACT_REVIEW : REVIEW_API_HOST + "/interact_review",
}

