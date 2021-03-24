import {TuikeApi, TuikeApiHost} from "./consts"
import axios from "axios";

const TIMEOUT = 10000;

export async function requestTuikeApi(url, data) {
	//console.log("Request TuikeAPI|url=" + url + ",data=", data);
	return await axios({
		url: url,
		method: 'post',
		data: data,
		timeout: TIMEOUT,
		withCredentials: false,
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
			return {
				"result": "request_failed"
			}
		})
}