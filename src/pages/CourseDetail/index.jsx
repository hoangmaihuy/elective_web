import React, { useState, useEffect, createElement } from 'react';
import {Button, Result, Rate, Descriptions, Tooltip} from "antd";
import {connect, history, useParams} from "umi";
import SchoolList from '@/consts/school';
import {Result as ApiResult} from '@/services/consts';
import { GridContent } from '@ant-design/pro-layout';
import {HomeOutlined, BookOutlined, ScheduleOutlined, NumberOutlined, LikeOutlined, DislikeOutlined} from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag, List } from 'antd';
import { roundToHalf } from "@/utils/utils";
import styles from './style.less';


const CourseDetail = (props) => {
  const { dispatch, pagination } = props;
  const { status, courseInfo, teacherList, courseReviews } = props;
  const { fetchingCourseInfo, fetchingTeacherList, fetchingCourseReviews } = props;
  const params = useParams();
  const courseId = parseInt(params.courseId, 10);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "courseDetail/fetchCourseInfo",
        payload: courseId,
      })

      dispatch({
        type: "courseDetail/fetchTeacherList",
        payload: courseId
      })

      dispatch({
        type: "courseDetail/fetchCourseReviews",
        payload: {
          courseId,
          pagination,
        }
      })
    }
  }, [courseId])

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

  const renderCourseInfo = () => {
    const rateLabelStyle = {
      marginTop: "8px",
      width: "25%",
    }

    return (
      <div>
        <div className={styles.avatarHolder}>
          <div className={styles.name}>{courseInfo.name}</div>
        </div>
        <div>
          <Descriptions colon={false} labelStyle={rateLabelStyle} column={1}>
            <Descriptions.Item label={"推荐分"}>
              <Rate allowHalf disabled defaultValue={roundToHalf(courseInfo.recommendScore)}/>
              <span style={{marginLeft: "8px"}}>
                {courseInfo.recommendScore}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label={"课程内容"}>
              <Rate allowHalf disabled defaultValue={roundToHalf(courseInfo.contentScore)}/>
              <span style={{marginLeft: "8px"}}>
              {courseInfo.contentScore}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label={"工作量"}>
              <Rate allowHalf disabled defaultValue={roundToHalf(courseInfo.workScore)}/>
              <span style={{marginLeft: "8px"}}>
              {courseInfo.workScore}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label={"考核"}>
              <Rate allowHalf disabled defaultValue={roundToHalf(courseInfo.examScore)}/>
              <span style={{marginLeft: "8px"}}>
              {courseInfo.examScore}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Divider dashed/>
        <div className={styles.detail}>
          <p>
            <NumberOutlined className={styles.infoIcon}/>
            {courseInfo.courseNo}
          </p>
          <p>
            <HomeOutlined className={styles.infoIcon}/>
            {courseInfo.schoolName}
          </p>
          <p>
            <BookOutlined className={styles.infoIcon}/>
            {courseInfo.typeName}
          </p>
          <p>
            <ScheduleOutlined className={styles.infoIcon}/>
            {`${courseInfo.credit} 学分`}
          </p>
        </div>
      </div>
    )
  }

  const renderTeacherList = () => {
    return (
      <div className={styles.tags}>
        <div className={styles.tagsTitle}>任课老师</div>
        {teacherList.map((teacher) => (
          <Tag key={teacher.id}>{teacher.name}</Tag>
        ))}
      </div>
    )
  }

  const renderCourseReviews = () => {
    const header = "课程评测";

    const renderReview = (review) => {
      const reviewTime = (new Date(review.create_time * 1000)).toLocaleString();
      const description = `${review.teacher_name}，${review.semester}，${reviewTime}`
      const likeReview = () => {

      }

      const dislikeReview = () => {

      }
      const actions = [
        <Tooltip title={"点赞"}>
          <span onClick={likeReview} style={{cursor: "pointer"}}>
            <LikeOutlined />
            <span style={{marginLeft: "5px"}}>{review.like_count || 0}</span>
          </span>
        </Tooltip>,
        <Tooltip title={"反对"}>
          <span onClick={dislikeReview} style={{cursor: "pointer"}}>
            <DislikeOutlined />
            <span style={{marginLeft: "5px"}}>{review.dislike_count || 0}</span>
          </span>
        </Tooltip>
      ]

      return (
        <List.Item actions={actions}>
          <List.Item.Meta title={review.title} description={reviewTime}/>
          <Descriptions column={2} labelStyle={{fontWeight: "bold"}}>
            <Descriptions.Item label={"任课老师"}> {review.teacher_name} </Descriptions.Item>
            <Descriptions.Item label={"学期"}>{review.semester}</Descriptions.Item>
          </Descriptions>

          {review.content.split('\n').map((paragraph) => (<p>{paragraph}</p>))}

          <Descriptions column={{md: 4, sm: 2, xs: 1}} colon={false} labelStyle={{fontWeight: "bold", width: "40%"}} >
            <Descriptions.Item label={"推荐分"}>
              <Rate className={styles.rateStar} allowHalf disabled defaultValue={review.recommend_score}/>
            </Descriptions.Item>
            <Descriptions.Item label={"课程内容"}>
              <Rate className={styles.rateStar} allowHalf disabled defaultValue={review.content_score}/>
            </Descriptions.Item>
            <Descriptions.Item label={"任务量"}>
              <Rate className={styles.rateStar} allowHalf disabled defaultValue={review.work_score}/>
            </Descriptions.Item>
            <Descriptions.Item label={"考核/给分"}>
              <Rate className={styles.rateStar} allowHalf disabled defaultValue={review.exam_score}/>
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )
    }

    return (
      <List
        loading={fetchingCourseReviews}
        dataSource={courseReviews}
        rowKey={"id"}
        pagination={{
          size: "small",
          ...pagination
        }}
        itemLayout={"vertical"}
        renderItem={renderReview}
      />
    )
  }

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
            loading={fetchingCourseInfo || fetchingTeacherList}
          >
            {renderCourseInfo()}
            <Divider dashed/>
            {renderTeacherList()}
          </Card>
        </Col>

        <Col lg={17} md={24}>
          <Card
            bordered
            title={"课程评测"}
            loading={fetchingCourseReviews}
          >
            {renderCourseReviews()}
          </Card>
        </Col>
      </Row>
    </GridContent>
  )
}

export default connect(({ loading, courseDetail }) => ({
  status: courseDetail.status,
  pagination: courseDetail.pagination,
  courseInfo: courseDetail.courseInfo,
  fetchingCourseInfo: loading.effects["courseDetail/fetchCourseInfo"],
  teacherList: courseDetail.teacherList,
  fetchingTeacherList: loading.effects["courseDetail/fetchTeacherList"],
  courseReviews: courseDetail.courseReviews,
  fetchingCourseReviews: loading.effects["courseDetail/fetchCourseReviews"]
}))(CourseDetail);
