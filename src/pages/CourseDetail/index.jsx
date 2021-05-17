import React, { useState, useEffect } from 'react';
import {PageHeader, Result} from "antd";
import {connect, useParams} from "umi";
import SchoolList from '@/consts/school';
import {Result as ApiResult} from '@/services/consts';


const CourseDetail = (props) => {
  const { dispatch } = props;
  const { status, courseInfo, courseReviews } = props;
  const { fetchingCourseInfo, fetchingCourseReviews } = props;
  const params = useParams();
  const courseId = parseInt(params.courseId, 10);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "courseDetail/fetchCourseInfo",
        payload: courseId,
      })
    }
  }, [courseId])

  if (status === ApiResult.ERROR_COURSE_NOT_FOUND) {
    return (
      <Result
        status={"404"}
        title={"课程不存在"}
      />
    )
  }

  return (
    <PageHeader
      title={courseInfo.name}
      subTitle={`${courseInfo.schoolName} · ${courseInfo.credit}`}
    />
  )
}

export default connect(({ loading, courseDetail }) => ({
  status: courseDetail.status,
  courseInfo: courseDetail.courseInfo,
  fetchingCourseInfo: loading.effects["courseDetail/fetchCourseInfo"],
  courseReviews: courseDetail.courseReviews,
  fetchingCourseReviews: loading.effects[""]
}))(CourseDetail);
