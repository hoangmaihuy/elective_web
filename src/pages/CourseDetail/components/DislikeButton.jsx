import {Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined} from "@ant-design/icons";
import React from "react";

const DislikeButton = (props) => {
  const { onClick, filled, count } = props;
  return (
    <Tooltip title={"反对"}>
      <span onClick={onClick} style={{cursor: "pointer"}}>
        {filled ? <DislikeFilled/> : <DislikeOutlined />}
        <span style={{marginLeft: "5px"}}>{count}</span>
      </span>
    </Tooltip>
  )
}

export default DislikeButton;
