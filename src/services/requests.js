import {TuikeApi, TuikeApiHost, Result} from "./consts"
import request from 'umi-request';

const TIMEOUT = 5000;

export async function requestTuikeApi(url, data) {
	console.log("Request TuikeAPI|url=" + url + ",data=", data);
	return request.post(url, {
		timeout: TIMEOUT,
		credentials: 'omit',
		data,
	})
	.then((response) => {
		console.log(response);
		return response;
	})
	.catch((error) => {
		console.log(error);
		return {
			"result": Result.ERROR_REQUEST,
		}
	})
}
