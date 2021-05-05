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
  let data = {
    current_page: params.current,
    page_size: params.pageSize,
  }

  if (params.course_no)
    data.course_no = params.course_no
  if (params.name)
    data.course_name = params.name
  if (params.type)
    data.course_type = parseInt(params.type, 10);
  if (params.school_id)
    data.school_id = parseInt(params.school_id, 10);

  if (params.sorter) {
    Object.entries(params.sorter).forEach(([key, value]) => {
      if (value === 'ascend')
        data.order_by = key;
      else
        data.order_by = `-${key}`;
    })
  }

  const {result, reply} = await postTuikeApi(TuikeCourseApi.GET_COURSE_LIST, data);
  return {
    success: (result === Result.SUCCESS),
    data: reply.courses,
    total: reply.total,
  }
}
