import React, {useEffect} from 'react';
import {GridContent, PageContainer} from '@ant-design/pro-layout';
import styles from './style.less';
import {Card, Col, Row, Select, Button } from "antd";
import LatestReviews from "@/pages/Welcome/components/LatestReviews";
import CourseRank from "@/pages/Welcome/components/CourseRank";
import ReviewInteraction from "@/consts/ReviewInteraction";
import SchoolList from "@/consts/SchoolList";
import {connect, Link} from "umi";
import {PlusOutlined} from '@ant-design/icons';

const RankSize = 5;
const {Option} = Select;

const parseSelectValue = (selectString) => {
  const s = selectString.split("_");
  const id = parseInt(s[0], 10);
  const name = s[1];
  return [id, name]
}

const Welcome = (props) => {
  const { dispatch, userId, pagination, latestReviews, fetchingLatestReviews } = props;
  const { specialityRank, fetchingSpecialityRank } = props;
  const { publicChoiceRank, fetchingPublicChoiceRank } = props;
  const { generalElectiveRank, fetchingGeneralElectiveRank } = props;
  const { gymRank, fetchingGymRank } = props;

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
      const payload = {
        course_type: 100,
        rank_size: RankSize,
      }
      if (specialityRank.schoolId)
        payload.school_id = specialityRank.schoolId
      dispatch({
        type: "welcome/fetchSpecialityRank",
        payload,
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
        type: "welcome/fetchGymRank",
        payload: {
          course_type: 400,
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

  const schoolSelector = (
    <Select
      defaultValue={'所有'}
      showSearch={true}
      size={'small'}
      style={{width: '150px'}}
      onSelect={(value) => {
        if (dispatch) {
          dispatch({
            type: 'welcome/changeSpecialitySchoolId',
            payload: parseSelectValue(value)[0],
          })
        }
      }}
    >
      {Object.entries(SchoolList).map(([key, value]) => <Option key={key} value={`${key}_${value}`}>{value}</Option>)}
    </Select>
  )

  const generalElectiveSelector = (
    <Select
      defaultValue={'所有'}
      size={'small'}
      style={{width: '80px'}}
      onSelect={(value) => {
        if (dispatch) {
          dispatch({
            type: 'welcome/changeGeneralElectiveType',
            payload: value,
          })
        }
      }}
    >
      <Option value={500}>所有</Option>
      <Option value={501}>A 类</Option>
      <Option value={502}>B 类</Option>
      <Option value={503}>C 类</Option>
      <Option value={504}>D 类</Option>
      <Option value={505}>E 类</Option>
      <Option value={506}>F 类</Option>
    </Select>
  )

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CourseRank
              title={"专业课排行"}
              extra={schoolSelector}
              dataSource={specialityRank.courses}
              loading={fetchingSpecialityRank}
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CourseRank
              title={"公选课排行"}
              dataSource={publicChoiceRank.courses}
              loading={fetchingPublicChoiceRank}
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CourseRank
              title={"通选课排行"}
              extra={generalElectiveSelector}
              dataSource={generalElectiveRank.courses}
              loading={fetchingGeneralElectiveRank}
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CourseRank
              title={"体育排行"}
              dataSource={gymRank.courses}
              loading={fetchingGymRank}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered
              title={"最新评测"}
              loading={fetchingLatestReviews}
              extra={<Link to={'/review/new'}><Button type={'primary'} icon={<PlusOutlined/>}/></Link>}
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
  gymRank: welcome.gymRank,
  fetchingGymRank: loading.effects["welcome/fetchGymRank"],
}))(Welcome);
