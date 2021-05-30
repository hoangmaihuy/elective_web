import React from 'react';
import {Table} from 'antd';
import {Link} from 'umi';

const columns = [
  {
    title: '#',
    dataIndex: 'rank',
  },
  {
    title: '课程名',
    dataIndex: 'name',
    key: 'id',
    render: (text, record) => <Link to={`/course/${record.id}`}>{text}</Link>
  },
  {
    title: '推荐分',
    dataIndex: 'recommend_score',
    render: (score) => score.toFixed(2),
  }
];

export default function CourseRank(props) {
  const {dataSource, loading} = props;
  return (
    <Table
      size={'small'}
      pagination={false}
      dataSource={dataSource.map((record, index) => ({...record, rank: index+1}))}
      loading={loading}
      columns={columns}
      style={{marginBottom: '24px'}}
    />
  )
}
