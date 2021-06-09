import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CourseRank from "../CourseRank";

test('test render CourseRank', async () => {
  const courses = [{
    rank: 1,
    name: 'Course 1',
    recommend_score: 5,
  }, {
    rank: 2,
    name: 'Course 2',
    recommend_score: 3,
  }];
  render(<CourseRank title={"CourseRank title"} dataSource={courses} loading={false}/>)
  screen.getByText('CourseRank title');
})
