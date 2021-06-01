import React, { useState, useEffect, createElement } from 'react';
import {Button, Result, Rate, Descriptions, Tooltip } from "antd";
import Skeleton from '@ant-design/pro-skeleton';
import {connect, history, useParams} from "umi";
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Divider, Row, Grid} from 'antd';
import CourseInfo from "@/pages/CourseDetail/components/CourseInfo";
import TeacherTags from "@/pages/CourseDetail/components/TeacherTags";
import CourseReviews from "@/pages/CourseDetail/components/CourseReviews";
import CourseRank from "@/pages/components/CourseRank";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {Result as ApiResult} from "@/services/result";

const { useBreakpoint } = Grid;

const CourseDetail = (props) => {
  const { dispatch, pagination } = props;
  const { status, courseInfo, teacherList, courseReviews, reviewParams, userId } = props;
  const { fetchingCourseInfo, fetchingCourseReviews } = props;
  const { courseRank, fetchingCourseRank } = props;
  const params = useParams();
  const courseId = parseInt(params.courseId, 10);
  const dataLoading = fetchingCourseReviews || fetchingCourseInfo;

  const screens = useBreakpoint();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "courseDetail/resetState"
      })

      dispatch({
        type: "courseDetail/fetchCourseInfo",
        payload: courseId,
      })

      dispatch({
        type: "courseDetail/fetchTeacherList",
        payload: courseId
      })
    }
  }, [courseId])

  useEffect(() => {
    if (!courseInfo) return;
    const payload = {
      course_type: courseInfo.type,
      rank_size: 10
    }
    if (courseInfo.type === 100) // 专业课
      payload.school_id = courseInfo.schoolId;
    if (dispatch) {
      dispatch({
        type: 'courseDetail/fetchCourseRank',
        payload,
      })
    }
  }, [courseInfo])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "courseDetail/fetchCourseReviews",
        payload: {
          courseId,
          pagination: {
            current: pagination.current,
            pageSize: pagination.pageSize,
          },
          params: reviewParams,
        }
      })
    }
  }, [courseId, pagination.current, pagination.pageSize, reviewParams])


  if (!fetchingCourseInfo && status === ApiResult.ERROR_COURSE_NOT_FOUND) {
    return (
      <Result
        status={"404"}
        title={"404"}
        subTitle={"课程不存在"}
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            返回首页
          </Button>
        }
      />
    )
  }


  const onTeacherChange = (checked, teacherId) => {
    dispatch({
      type: 'courseDetail/changeReviewParams',
      payload: {
        teacherId: checked ? teacherId : 0
      }
    })
  }

  const onPaginationChange = (page, pageSize) => {
    dispatch({
      type: "courseDetail/savePagination",
      payload: {
        current: page,
        pageSize,
      }
    })
  }

  const onLikeReview = (reviewId, interaction) => {
    let action = ReviewInteraction.LIKE;
    if (action === interaction)
      action = ReviewInteraction.NO_INTERACTION;
    dispatch({
      type: "courseDetail/interactReview",
      payload: {
        userId,
        reviewId,
        action,
      }
    })
  }

  const onDislikeReview = (reviewId, interaction) => {
    let action = ReviewInteraction.DISLIKE;
    if (action === interaction)
      action = ReviewInteraction.NO_INTERACTION;
    dispatch({
      type: "courseDetail/interactReview",
      payload: {
        userId,
        reviewId,
        action,
      }
    })
  }

  return (
    <PageContainer>
      {dataLoading && <Skeleton active type={"descriptions"}/>}
      {!dataLoading &&
        <GridContent>
          <Row gutter={24}>
            <Col lg={7} md={24}>
              <Row span={24}>
                <Card
                  bordered={false}
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <CourseInfo data={courseInfo}/>
                  <Divider dashed/>
                  <TeacherTags data={teacherList} checkedId={reviewParams.teacherId} onChange={onTeacherChange}/>
                </Card>
              </Row>
              { screens["lg"] &&
                <Row lg={24}>
                <CourseRank
                  title={'类似课程'}
                  dataSource={courseRank}
                  loading={fetchingCourseRank}
                />
              </Row>
              }
            </Col>

            <Col lg={17} md={24}>
              <Card
                bordered
                title={"课程评测"}
              >
                <CourseReviews
                  data={courseReviews}
                  pagination={pagination}
                  onPaginationChange={onPaginationChange}
                  onLikeReview={onLikeReview}
                  onDislikeReview={onDislikeReview}
                />
              </Card>
            </Col>
          </Row>
        </GridContent>
      }
    </PageContainer>
  )
}

export default connect(({ loading, courseDetail, user }) => ({
  userId: user.currentUser.user_id,
  status: courseDetail.status,
  pagination: courseDetail.pagination,
  courseInfo: courseDetail.courseInfo,
  fetchingCourseInfo: loading.effects["courseDetail/fetchCourseInfo"],
  teacherList: courseDetail.teacherList,
  fetchingTeacherList: loading.effects["courseDetail/fetchTeacherList"],
  courseReviews: courseDetail.courseReviews,
  fetchingCourseReviews: loading.effects["courseDetail/fetchCourseReviews"],
  reviewParams: courseDetail.reviewParams,
  courseRank: courseDetail.courseRank,
  fetchingCourseRank: loading.effects["courseDetail/fetchCourseRank"],
}))(CourseDetail);
