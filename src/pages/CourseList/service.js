import request from '@/utils/request';
import {postTuikeApi} from "@/services/requests";
import {TuikeCourseApi, Result} from "@/services/consts";

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function getCourseList(params) {
  console.log("getCourseList|params=", params);
  const {result, reply} = await postTuikeApi(TuikeCourseApi.GET_COURSE_LIST, {
    current_page: params.current,
    page_size: params.pageSize,
  });
  return {
    success: (result === Result.SUCCESS),
    data: reply.courses,
    total: reply.total,
  }
}
