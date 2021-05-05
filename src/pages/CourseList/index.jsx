import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getCourseList } from './service';

const CourseList = () => {
  const actionRef = useRef();
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
      title: '学分',
      dataIndex: 'credit',
      valueType: 'number',
    },
    {
      title: '开课单位',
      dataIndex: 'school_id',
    },
    {
      title: '测评次数',
      dataIndex: 'review_count',
      valueType: 'digit',
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
