import React, {useEffect, useState} from 'react';
import { Form, Button, Divider, Input, Select, TreeSelect } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import SchoolList from "@/consts/SchoolList";

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const parseSelectValue = (selectString) => {
  if (!selectString)
    return undefined, undefined
  const s = selectString.split("_");
  const id = parseInt(s[0], 10);
  const name = s[1];
  return [id, name]
}

const CourseInfoForm = (props) => {
  const { dispatch, data, courseList, teacherList, fetchingCourses, fetchingTeachers, searchCourseName } = props;
  const [form] = Form.useForm();
  const { validateFields, getFieldValue, resetFields } = form;

  // useEffect(() => {
  //   if (props.hasCourseList)
  //     return;
  //   if (dispatch) {
  //     dispatch({
  //       type: 'addReviewForm/fetchCourseList'
  //     });
  //   }
  // }, [props.hasCourseList])

  useEffect(async () => {
    await setTimeout(() => {
      if (dispatch) {
        dispatch({
          type: 'addReviewForm/fetchCourseListByName',
          payload: searchCourseName,
        });
      }
    }, 500)
  }, [searchCourseName])

  useEffect(() => {
    const {courseId} = props.data;
    if (!courseId)
      return

    if (dispatch) {
      dispatch({
        type: 'addReviewForm/fetchTeacherList',
        payload: courseId,
      })
    }
  }, [props.data.courseId])

  const onCourseSelect = () => {
    const selectedCourseName = getFieldValue("courseName");
    const [courseId, courseName] = parseSelectValue(selectedCourseName);
    resetFields(["teacherName"]);
    if (dispatch) {
      dispatch({
        type: 'addReviewForm/saveStepFormData',
        payload: {
          teacherId: undefined,
          teacherName: undefined,
          courseId,
          courseName,
        }
      })
    }
  }

  const onCourseSearch = (input) => {
    if (dispatch) {
      dispatch({
        type: 'addReviewForm/saveSearchCourseName',
        payload: input
      })
    }
  }

  const renderCourseSelect = () => {
    const treeNodes = [];
    for (const schoolId in courseList) {
      const schoolName = SchoolList[schoolId];
      const courses = courseList[schoolId];
      treeNodes.push(
        <TreeNode key={`school_${schoolId}`} selectable={false} title={schoolName}>
          {courses.map((course) => {
            return(
              <TreeNode
                value={`${course.id}_${course.name}`}
                isLeaf={true}
                title={`${course.name} （${course.credit} 学分）`}
              >
              </TreeNode>
            )
          })}
        </TreeNode>
      )
    }
    return (
      <TreeSelect
        showSearch
        placeholder="请选择课程"
        onSelect={onCourseSelect}
        onSearch={onCourseSearch}
        loading={fetchingCourses}
        filterTreeNode={false}
        treeDefaultExpandAll
      >
        {treeNodes}
      </TreeSelect>
    );
  };

  const renderTeacherSelect = () => {
    return (
      <Select
        showSearch
        allowClear
        placeholder="请选择教师"
        loading={fetchingTeachers}
      >
        {teacherList.map((teacher) => (
          <Option key={teacher.id} value={`${teacher.id}_${teacher.name}`}>
            {teacher.name}
          </Option>
        ))}
      </Select>
    )
  }


  const onValidateForm = async () => {
    const values = await validateFields();
    const [courseId, courseName] = parseSelectValue(values.courseName);
    const [teacherId, teacherName] = parseSelectValue(values.teacherName);

    if (dispatch) {
      dispatch({
        type: 'addReviewForm/saveStepFormData',
        payload: {
          courseId,
          courseName,
          teacherId,
          teacherName,
          semester: values.semester,
        },
      });
      dispatch({
        type: 'addReviewForm/switchStep',
        payload: 'review',
      });
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="课程名称"
          name="courseName"
          rules={[
            {
              required: true,
              message: '请选择课程',
            },
          ]}
        >
          {renderCourseSelect()}
        </Form.Item>
        <Form.Item
          label="授课老师"
          name="teacherName"
          rules={[
            {
              required: true,
              message: '请选择老师'
            }
          ]}
        >
          {renderTeacherSelect()}
        </Form.Item>
        <Form.Item
          label="学期"
          name="semester"
          rules={[
            {
              required: true,
              message: '请选择学期',
            },
          ]}
        >
          <Select placeholder={"请选择学期"}>
            <OptGroup label="2020-2021年">
              <Option value={"20-21-1"}>20-21 秋期</Option>
              <Option value={"20-21-2"}>20-21 春期</Option>
            </OptGroup>
            <OptGroup label="2019-2020年">
              <Option value={"19-20-1"}>19-20 秋期</Option>
              <Option value={"19-20-2"}>21-21 春期</Option>
              <Option value={"19-20-3"}>19-20 暑期</Option>
            </OptGroup>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
    </>
  );
};

export default connect(({ addReviewForm, loading }) => ({
  data: addReviewForm.formData,
  hasCourseList: addReviewForm.hasCourseList,
  courseList: addReviewForm.courseList,
  searchCourseName: addReviewForm.searchCourseName,
  fetchingCourses: loading.effects['addReviewForm/fetchCourseListByName'],
  hasTeacherList: addReviewForm.hasTeacherList,
  teacherList: addReviewForm.teacherList,
  fetchingTeachers: loading.effects['addReviewForm/fetchTeacherList'],
}))(CourseInfoForm);
