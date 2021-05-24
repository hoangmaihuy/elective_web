import React, {useEffect, useState} from 'react';
import { Form, Button, Divider, Input} from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import {RecommendRate, ExamRate, WorkRate, ContentRate} from "@/pages/components/ScoreRate";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const ReviewForm = (props) => {
  const { dispatch, data, submitting } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'addReviewForm/submitForm',
        payload: {
          ...data,
          ...values
        },
      });

    }
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'addReviewForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'addReviewForm/switchStep',
        payload: 'courseInfo',
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
          label="标题"
          name="title"
        >
          <Input type="text" placeholder="例如：老师人非常好，推荐！"/>
        </Form.Item>

        <Form.Item
          label="测评内容"
          name="content"
        >
          <Input.TextArea showCount allowClear autoSize={{minRows: 8}}/>
        </Form.Item>

        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />

        <Form.Item
          label="推荐分"
          name="recommendScore"
          initialValue={3}
        >
          <RecommendRate/>
        </Form.Item>

        <Form.Item
          label="课程内容"
          name="contentScore"
          initialValue={3}
        >
          <ContentRate/>
        </Form.Item>
        <Form.Item
          label="工作量"
          name="workScore"
          initialValue={3}
        >
          <WorkRate/>
        </Form.Item>

        <Form.Item
          label="考核/给分"
          name="examScore"
          initialValue={3}
        >
          <ExamRate/>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 8,
          }}
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
          <Button
            onClick={onPrev}
            style={{
              marginRight: 8,
            }}
          >
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Form.Item>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      </Form>
    </>
  );
};

export default connect(({ addReviewForm, loading }) => ({
  submitting: loading.effects['addReviewForm/submitForm'],
  data: addReviewForm.formData,
}))(ReviewForm);
