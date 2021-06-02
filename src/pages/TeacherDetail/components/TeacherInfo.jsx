import {Col, Descriptions, Divider, Row} from "antd";
import {roundToHalf} from "@/utils/utils";
import React from "react";
import {ContentRate, RecommendRate, WorkRate, ExamRate} from "@/pages/components/ScoreRate";
import styles from "@/pages/TeacherDetail/style.less";

const TeacherInfo = (props) => {
  const rateLabelStyle = {
    marginTop: "8px",
    width: "25%",
  }
  const {data} = props;

  return (
    <div id={'teacher-info-panel'}>
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
    </div>
  )
}

export default TeacherInfo;
