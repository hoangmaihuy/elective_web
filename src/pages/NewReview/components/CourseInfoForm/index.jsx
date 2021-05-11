import React, {useEffect, useState} from 'react';
import { Form, Button, Divider, Input, Select, TreeSelect } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import SchoolList from "@/consts/school";

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

const CourseInfoForm = (props) => {
  const { dispatch, data, courseList, teacherList } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'newReviewForm/fetchCourseList'
      });
    }
  }, [props.hasCourseList])

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'newReviewForm/fetchTeacherList'
      })
    }
  }, [props.hasTeacherList])

  const renderCourseSelect = () => {
    let treeNodes = [];
    for (const schoolId in courseList) {
      const schoolName = SchoolList[schoolId];
      const courses = courseList[schoolId];
      treeNodes.push(
        <TreeNode key={`school_${schoolId}`} selectable={false} title={schoolName} >
          {courses.map((course) => (
            <TreeNode
              value={`${course.id}_${course.name}`}
              isLeaf={true}
              title={`${course.name} （${course.credit} 学分）`}
            >
            </TreeNode>
          ))}
        </TreeNode>
      )
    }
    return (
      <TreeSelect showSearch allowClear placeholder="请选择课程">
        {treeNodes}
      </TreeSelect>
    );
  }

  const renderTeacherSelect = () => {
    return (
      <Select
        showSearch
        allowClear
        placeholder="请选择教师"
      >
        {teacherList.map((teacher) => (
          <Option key={teacher.id} value={`${teacher.id}_${teacher.name}`}>
            {teacher.name}
          </Option>
        ))}
      </Select>
    )
  }

  if (!data) {
    return null;
  }

  const { validateFields } = form;

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'newReviewForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'newReviewForm/saveCurrentStep',
        payload: 'confirm',
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
              message: '请选择老师'            }
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
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
        <h4>转账到银行卡</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </>
  );
};

export default connect(({ newReviewForm }) => ({
  data: newReviewForm.step,
  hasCourseList: newReviewForm.hasCourseList,
  courseList: newReviewForm.courseList,
  hasTeacherList: newReviewForm.hasTeacherList,
  teacherList: newReviewForm.teacherList,
}))(CourseInfoForm);
