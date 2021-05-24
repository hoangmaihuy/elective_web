import {Descriptions, List, Tooltip} from "antd";
import moment from "moment";
import {Link} from 'umi';
import LikeButton from "@/pages/components/LikeButton";
import DislikeButton from "@/pages/components/DislikeButton";
import styles from "@/pages/CourseDetail/style.less";
import React from "react";
import ReviewInteraction from "@/consts/ReviewInteraction";
import {RecommendRate, ExamRate, ContentRate, WorkRate} from "@/pages/components/ScoreRate";


const CourseReviews = (props) => {
  const { data, pagination, onPaginationChange, onLikeReview, onDislikeReview } = props;

  const renderReview = (review) => {
    const reviewTime = (new Date(review.create_time * 1000)).toLocaleString();
    const reviewMoment = (
      <Tooltip title={moment(reviewTime).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(reviewTime).fromNow()}</span>
      </Tooltip>
    )

    const actions = [
      <LikeButton
        filled={review.interaction === ReviewInteraction.LIKE}
        count={review.likes}
        onClick={() => {onLikeReview(review.id, review.interaction)}}
      />,
      <DislikeButton
        filled={review.interaction === ReviewInteraction.DISLIKE}
        count={review.dislikes}
        onClick={() => onDislikeReview(review.id, review.interaction)}
      />
    ]

    return (
      <List.Item actions={actions}>
        <List.Item.Meta title={<b>{review.title}</b>} description={reviewMoment}/>
        <Descriptions column={{xs: 1, sm: 2}} labelStyle={{fontWeight: "bold"}}>
          <Descriptions.Item label={"任课老师"}>
            <Link to={`/teacher/${review.teacher_id}`}>
              {review.teacher_name}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={"学期"}>{review.semester}</Descriptions.Item>
        </Descriptions>

        {review.content.split('\n').map((paragraph) => (<p>{paragraph}</p>))}

        <Descriptions column={{md: 4, sm: 2, xs: 1}} colon={false}
                      labelStyle={{fontWeight: "bold", width: "40%", marginTop: "2px"}}>
          <Descriptions.Item label={"推荐分"}>
            <RecommendRate className={styles.rateStar} disabled defaultValue={review.recommend_score}/>
          </Descriptions.Item>
          <Descriptions.Item label={"课程内容"}>
            <ContentRate className={styles.rateStar} allowHalf disabled defaultValue={review.content_score}/>
          </Descriptions.Item>
          <Descriptions.Item label={"任务量"}>
            <WorkRate className={styles.rateStar} allowHalf disabled defaultValue={review.work_score}/>
          </Descriptions.Item>
          <Descriptions.Item label={"考核/给分"}>
            <ExamRate className={styles.rateStar} allowHalf disabled defaultValue={review.exam_score}/>
          </Descriptions.Item>
        </Descriptions>
      </List.Item>
    )
  }
  return (
    <List
      dataSource={data}
      rowKey={"id"}
      pagination={{
        size: "small",
        showSizeChanger: true,
        onChange: onPaginationChange,
        ...pagination
      }}
      itemLayout={"vertical"}
      renderItem={renderReview}
    />
  )
}

export default CourseReviews;
