import {Tooltip} from "antd";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import React from "react";

const LikeButton = (props) => {
  const { onClick, filled, count } = props;
  return (
    <Tooltip title={"点赞"}>
      <span onClick={onClick} style={{cursor: "pointer"}}>
        {filled ? <LikeFilled/> : <LikeOutlined />}
        <span style={{marginLeft: "5px"}}>{count}</span>
      </span>
    </Tooltip>
  )
}

export default LikeButton;
