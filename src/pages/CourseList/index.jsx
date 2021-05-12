import React, { useState, useRef } from 'react';
import {Link} from "umi";
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getCourseList } from './service';
import SchoolList from '@/consts/school';
import CourseType from "@/consts/courseType";

const CourseList = () => {
  const actionRef = useRef();
  let schoolEnum = {}
  // eslint-disable-next-line guard-for-in,camelcase
  for (const school_id in SchoolList) {
    schoolEnum[school_id] = {
      text: SchoolList[school_id],
    }
  }
  const columns = [
    {
      title: '课程号',
      dataIndex: 'course_no',
    },
    {
      title: '课程名',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <Link to={`/course/${record.id}`}>{text}</Link>
        )
      },
    },
    {
      title: '课程类型',
      dataIndex: 'type',
      valueEnum: CourseType,
    },
    {
      title: '学分',
      dataIndex: 'credit',
      valueType: 'number',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '开课单位',
      dataIndex: 'school_id',
      valueEnum: SchoolList,
    },
    {
      title: '推荐分',
      valueType: 'number',
      dataIndex: 'recommend_score',
      sorter: true,
      hideInSearch: true,
      renderText: (text) => (parseFloat(text).toFixed(2)),
    },
    {
      title: '课程内容',
      valueType: 'number',
      dataIndex: 'content_score',
      sorter: true,
      hideInSearch: true,
      renderText: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: '任务量',
      valueType: 'number',
      dataIndex: 'work_score',
      sorter: true,
      hideInSearch: true,
      renderText: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: '考核',
      valueType: 'number',
      dataIndex: 'exam_score',
      sorter: true,
      hideInSearch: true,
      renderText: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: '测评次数',
      dataIndex: 'review_count',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle='查询课程'
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => getCourseList({ ...params, sorter})}
        columns={columns}
      />

    </PageContainer>
  );
};

export default CourseList;
