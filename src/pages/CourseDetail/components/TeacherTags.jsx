import styles from "@/pages/CourseDetail/style.less";
import {Tag} from "antd";
import React from "react";

const TeacherTags = (props) => {
  const { data, onChange, checkedId } = props;
  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>任课老师</div>
      {[{id: 0, name: '所有'}].concat(data).map((teacher) => (
        <Tag.CheckableTag
          key={teacher.id}
          checked={checkedId === teacher.id}
          onChange={(checked) => onChange(checked, teacher.id)}
        >
          {teacher.name}
        </Tag.CheckableTag>
      ))}
    </div>
  )
}

export default TeacherTags;
