import styles from "@/pages/CourseDetail/style.less";
import {Col, Descriptions, Divider, Row} from "antd";
import {roundToHalf} from "@/utils/utils";
import {BookOutlined, HomeOutlined, NumberOutlined, ScheduleOutlined} from "@ant-design/icons";
import React from "react";
import {ContentRate, RecommendRate, WorkRate, ExamRate} from "@/pages/components/ScoreRate";


const CourseInfo = (props) => {
  const rateLabelStyle = {
    marginTop: "8px",
    width: "25%",
  }
  const {data} = props;

  return (
    <div>
      <div className={styles.avatarHolder}>
        <div className={styles.name}>{data.name}</div>
      </div>
      <div>
        <Descriptions colon={false} labelStyle={rateLabelStyle} column={1}>
          <Descriptions.Item label={"推荐分"}>
            <RecommendRate disabled defaultValue={roundToHalf(data.recommendScore)}/>
            <span style={{marginLeft: "8px"}}>
                {data.recommendScore}
              </span>
          </Descriptions.Item>

          <Descriptions.Item label={"课程内容"}>
            <ContentRate disabled defaultValue={roundToHalf(data.contentScore)}/>
            <span style={{marginLeft: "8px"}}>
              {data.contentScore}
              </span>
          </Descriptions.Item>

          <Descriptions.Item label={"工作量"}>
            <WorkRate disabled defaultValue={roundToHalf(data.workScore)}/>
            <span style={{marginLeft: "8px"}}>
              {data.workScore}
              </span>
          </Descriptions.Item>

          <Descriptions.Item label={"考核"}>
            <ExamRate disabled defaultValue={roundToHalf(data.examScore)}/>
            <span style={{marginLeft: "8px"}}>
              {data.examScore}
              </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Divider dashed/>
      <Row>
        <Col span={12}>
          <NumberOutlined className={styles.infoIcon}/>
          {data.courseNo}
        </Col>
        <Col span={12}>
          <HomeOutlined className={styles.infoIcon}/>
          {data.schoolName}
        </Col>
        <Col span={12}>
          <BookOutlined className={styles.infoIcon}/>
          {data.typeName}
        </Col>
        <Col span={12}>
          <ScheduleOutlined className={styles.infoIcon}/>
          {`${data.credit} 学分`}
        </Col>
      </Row>
    </div>
  )
}

export default CourseInfo;
