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
}

export const Result = {
	SUCCESS: "success",
	ERROR_PARAMS: "error_params",
	ERROR_REQUEST: "error_request",
	ERROR_INVALID_EMAIL: "error_invalid_email",
	ERROR_AUTHORIZATION: "error_authorization",
}

