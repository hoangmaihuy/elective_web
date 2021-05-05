import React, { useState, useRef } from 'react';
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
      filter: true,
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
        request={(params, sorter, filter) => getCourseList({ ...params, sorter, filter })}
        columns={columns}
      />

    </PageContainer>
  );
};

export default CourseList;
