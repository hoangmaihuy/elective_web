import React, {useEffect} from 'react';
import {GridContent, PageContainer} from '@ant-design/pro-layout';
import styles from './style.less';
import {Card, Col, Row} from "antd";
import LatestReviews from "@/pages/Welcome/components/LatestReviews";
import CourseRank from "@/pages/Welcome/components/CourseRank";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {connect} from "umi";

const RankSize = 5;

const Welcome = (props) => {
  const { dispatch, userId, pagination, latestReviews, fetchingLatestReviews } = props;
  const { specialityRank, fetchingSpecialityRank } = props;
  const { publicChoiceRank, fetchingPublicChoiceRank } = props;
  const { generalElectiveRank, fetchingGeneralElectiveRank } = props;
  const { politicsRank, fetchingPoliticsRank } = props;

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

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "welcome/fetchSpecialityRank",
        payload: {
          course_type: 100,
          school_id: specialityRank.schoolId,
          rank_size: RankSize,
        }
      })
    }
  }, [specialityRank.schoolId])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "welcome/fetchPublicChoiceRank",
        payload: {
          course_type: 600,
          rank_size: RankSize,
        }
      })
    }
  }, [])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "welcome/fetchGeneralElectiveRank",
        payload: {
          course_type: generalElectiveRank.courseType,
          rank_size: RankSize,
        }
      })
    }
  }, [generalElectiveRank.courseType])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "welcome/fetchPoliticsRank",
        payload: {
          course_type: 200,
          rank_size: RankSize,
        }
      })
    }
  }, [])

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
          <Col lg={6} md={12}>
            <CourseRank
              dataSource={specialityRank.courses}
              loading={fetchingSpecialityRank}
            />
          </Col>
          <Col lg={6} md={12}>
            <CourseRank
              dataSource={publicChoiceRank.courses}
              loading={fetchingPublicChoiceRank}
            />
          </Col>
          <Col lg={6} md={12}>
            <CourseRank
              dataSource={generalElectiveRank.courses}
              loading={fetchingGeneralElectiveRank}
            />
          </Col>
          <Col lg={6} md={12}>
            <CourseRank
              dataSource={politicsRank.courses}
              loading={fetchingPoliticsRank}
            />
          </Col>
        </Row>
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
              数据
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
  specialityRank: welcome.specialityRank,
  fetchingSpecialityRank: loading.effects["welcome/fetchSpecialityRank"],
  publicChoiceRank: welcome.publicChoiceRank,
  fetchingPublicChoiceRank: loading.effects["welcome/fetchPublicChoiceRank"],
  generalElectiveRank: welcome.generalElectiveRank,
  fetchingGeneralElectiveRank: loading.effects["welcome/fetchGeneralElectiveRank"],
  politicsRank: welcome.politicsRank,
  fetchingPoliticsRank: loading.effects["welcome/fetchPoliticsRank"],
}))(Welcome);
