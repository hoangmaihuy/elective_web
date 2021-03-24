const Environment = {
	DEV: "development",
	TEST: "testing",
	LIVE: "production"
};

const ENVIRONMENT = process.env.NODE_ENV;
console.log("Environment=" + ENVIRONMENT);

let TUIKE_API_HOST = "";
let TUIKE_WEB_HOST = "";

switch (ENVIRONMENT) {
	case Environment.DEV:
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

export const TuikeApi = {
	TEST_ECHO : TUIKE_API_HOST + "/test/echo",
}

