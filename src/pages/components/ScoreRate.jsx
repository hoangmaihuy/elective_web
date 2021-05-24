import React from 'react';
import {Rate} from 'antd';
import {LikeFilled, HeartFilled, ExperimentFilled, RocketFilled } from "@ant-design/icons";


export const RecommendRate = (props) => {
  return (
    <Rate
      style={{color: "#69c0ff"}}
      character={<LikeFilled/>}
      allowHalf
      {...props}
    />
  )
}

export const ContentRate = (props) => {
  return (
    <Rate
      character={<HeartFilled/>}
      style={{color: "#ff85c0"}}
      allowHalf
      {...props}
    />
  )
}

export const WorkRate = (props) => {
  return (
    <Rate
      character={<ExperimentFilled/>}
      style={{color: "#b37feb"}}
      allowHalf
      {...props}
    />
  )
}

export const ExamRate = (props) => {
  return (
    <Rate
      character={<RocketFilled/>}
      style={{color: "#ffd666"}}
      allowHalf
      {...props}
    />
  )
}
