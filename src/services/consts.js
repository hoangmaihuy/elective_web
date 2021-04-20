const Environment = {
	DEV: "development",
	TEST: "test",
	LIVE: "production"
};

const ENVIRONMENT = process.env.REACT_APP_ENV || Environment.DEV;

console.log("Environment=" + ENVIRONMENT);

let TUIKE_API_HOST = "";
let TUIKE_WEB_HOST = "";

switch (ENVIRONMENT) {
	case Environment.DEV:
		//TUIKE_API_HOST = "http://localhost:8000"
		TUIKE_API_HOST = "https://tuike-api-test.herokuapp.com"
		TUIKE_WEB_HOST = "http://localhost:3000"
		break;
	case Environment.TEST:
		TUIKE_API_HOST = "https://tuike-api-test.herokuapp.com"
		TUIKE_WEB_HOST = "https://tuike-test.herokuapp.com"
		break;
	case Environment.LIVE:
		TUIKE_API_HOST = "https://tuike-api.herokuapp.com"
		TUIKE_WEB_HOST = "https://tuike.herokuapp.com"
		break;
}

export const TuikeApiHost = TUIKE_API_HOST;

const TEST_API_HOST = TUIKE_API_HOST + "/test";
export const TuikeTestApi = {
	TEST_ECHO : TEST_API_HOST + "/echo",
}

const ACCOUNT_API_HOST = TUIKE_API_HOST + "/account";
export const TuikeAccountApi = {
	REQUEST_VERIFICATION_CODE : ACCOUNT_API_HOST + "/request_verification_code",
	LOGIN : ACCOUNT_API_HOST + "/login",
}

export const Result = {
	SUCCESS: "success",
	ERROR_REQUEST: "error_request",
	ERROR_INVALID_EMAIL: "error_invalid_email",
	ERROR_AUTHORIZATION: "error_authorization",
}

export const ErrorMessage = {
	success: "操作成功",
	error_request: "请求失败",
	error_invalid_email: "邮箱不合法",
	error_authorization: "没有权限",
	error_verification_code: "验证码不正确",
}