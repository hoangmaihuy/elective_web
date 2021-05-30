import React from 'react';
import {Table, Card} from 'antd';
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
  const { title, dataSource, loading, extra } = props;
  return (
    <Card
      title={title}
      size={'small'}
      style={{marginBottom: '24px'}}
      headStyle={{fontWeight: 'bold'}}
      extra={extra}
    >
      <Table
        showHeader={false}
        size={'small'}
        pagination={false}
        dataSource={dataSource.map((record, index) => ({...record, rank: index+1}))}
        loading={loading}
        columns={columns}
      />
    </Card>
  )
}
