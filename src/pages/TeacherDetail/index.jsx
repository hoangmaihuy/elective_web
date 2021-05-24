import React, {useEffect} from 'react';
import {connect, useParams} from "umi";
import {GridContent, PageContainer} from "@ant-design/pro-layout";
import Skeleton from "@ant-design/pro-skeleton";
import {Card, Col, Divider, Row} from "antd";
import ReviewInteraction from "@/consts/ReviewInteraction";
import TeacherInfo from "@/pages/TeacherDetail/components/TeacherInfo";
import TeacherReviews from "@/pages/TeacherDetail/components/TeacherReviews";

const TeacherDetail = (props) => {
  const { dispatch, userId, teacherInfo, teacherReviews, pagination, fetchingTeacherInfo, fetchingTeacherReviews } = props;
  const params = useParams();
  const teacherId = parseInt(params.teacherId, 10);
  const dataLoading = fetchingTeacherInfo || fetchingTeacherReviews;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "teacherDetail/resetState"
      })

      dispatch({
        type: "teacherDetail/fetchTeacherInfo",
        payload: teacherId,
      })
    }
  }, [teacherId])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "teacherDetail/fetchTeacherReviews",
        payload: {
          teacherId,
          pagination: {
            current: pagination.current,
            pageSize: pagination.pageSize,
          },
        }
      })
    }
  }, [teacherId, pagination.current, pagination.pageSize])

  const onPaginationChange = (page, pageSize) => {
    dispatch({
      type: "teacherDetail/savePagination",
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
      type: "teacherDetail/interactReview",
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
      type: "teacherDetail/interactReview",
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
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
            >
              <TeacherInfo data={teacherInfo}/>
            </Card>
          </Col>

          <Col lg={17} md={24}>
            <Card
              bordered
              title={"教师评测"}
            >
              <TeacherReviews
                data={teacherReviews}
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

export default connect(({ loading, teacherDetail, user }) => ({
  userId: user.currentUser.user_id,
  teacherInfo: teacherDetail.teacherInfo,
  fetchingTeacherInfo: loading.effects['teacherDetail/fetchTeacherInfo'],
  pagination: teacherDetail.pagination,
  teacherReviews: teacherDetail.teacherReviews,
  fetchingTeacherReviews: loading.effects['teacherDetail/fetchTeacherReviews'],
}))(TeacherDetail);
