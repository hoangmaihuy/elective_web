import React, {useEffect} from 'react';
import {GridContent, PageContainer} from '@ant-design/pro-layout';
import styles from './style.less';
import {Card, Col, Row} from "antd";
import LatestReviews from "@/pages/Welcome/components/LatestReviews";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {connect} from "umi";

const Welcome = (props) => {
  const { dispatch, userId, pagination, latestReviews, fetchingLatestReviews } = props;
  console.log("pagination", pagination);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "welcome/fetchLatestReviews",
        payload: {
          current: pagination.current,
          pageSize: pagination.pageSize,
        }
      })
    }
  }, [pagination.current, pagination.pageSize])

  const onPaginationChange = (page, pageSize) => {
    dispatch({
      type: "welcome/savePagination",
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
      type: "welcome/interactReview",
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
      type: "welcome/interactReview",
      payload: {
        userId,
        reviewId,
        action,
      }
    })
  }

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={17} md={24}>
            <Card
              bordered
              title={"最新评测"}
              loading={fetchingLatestReviews}
            >
              <LatestReviews
                data={latestReviews}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                onLikeReview={onLikeReview}
                onDislikeReview={onDislikeReview}
              />
            </Card>
          </Col>

          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
            >
              课程排行
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  )
}


export default connect(({ loading, welcome, user }) => ({
  userId: user.currentUser.user_id,
  pagination: welcome.pagination,
  latestReviews: welcome.latestReviews,
  fetchingLatestReviews: loading.effects['welcome/fetchLatestReviews'],
}))(Welcome);
