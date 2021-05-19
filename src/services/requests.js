import {TuikeApi, TuikeApiHost} from "./api"
import {getToken} from '@/utils/authority';
import request from 'umi-request';
import {Result} from "@/services/result";

const TIMEOUT = 30000;

export async function postTuikeApi(url, data) {
  const token = getToken();
  let headers = {}
  if (token)
    headers.Authorization = `Bearer ${token}`;
	console.log("postTuikeApi|url=", url, ",headers=", headers, ",data=", data);
	return request.post(url, {
		credentials: 'omit',
    headers,
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

export async function getTuikeApi(url, params) {
  const token = getToken();
  let headers = {}
  if (token)
    headers.Authorization = `Bearer ${token}`;
  console.log(`getTuikeApi|url=${url}, headers=${headers}, params=${params}`);
  return request.get(url, {
    credentials: 'omit',
    headers,
    params,
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      return {
        "result": Result.ERROR_REQUEST,
      }
    })
}
