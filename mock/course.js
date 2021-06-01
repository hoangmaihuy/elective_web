import {Random} from 'mockjs';
import CourseType from "../src/consts/CourseType";
import {Result} from "../src/services/result";

const TestCourseId = 1;
const typeIds = Object.keys(CourseType).map((x) => parseInt(x, 10));

const randomTimestamp = () => new Date(Random.datetime()).getTime();

const genCourseList = (size, type, schoolId) => {
  let courses = [];
  while (size--) {
    courses.push({
      id: Random.integer(1, 2000),
      name: Random.ctitle(),
      credit: Random.integer(0, 9),
      course_no: Random.string('number', 8),
      school_id: schoolId || Random.integer(1, 50),
      type: type || typeIds[Random.integer(0, typeIds.length-1)],
      review_count: Random.integer(0, 10),
      recommend_score: Random.float(0, 4),
      content_score: Random.float(0, 4),
      work_score: Random.float(0, 4),
      exam_score: Random.float(0, 4),
      last_review: randomTimestamp(),
      create_time: randomTimestamp(),
    })
  }
  return courses;
}

const genBasicCourseList = (size, schoolId) => {
  let courses = [];
  while (size--) {
    courses.push({
      id: Random.integer(1, 2000),
      name: Random.ctitle(),
      credit: Random.integer(0, 9),
      course_no: Random.string('number', 8),
      school_id: schoolId,
      type: typeIds[Random.integer(0, typeIds.length-1)],
      review_count: Random.integer(0, 10),
    })
  }
  return courses;
}

const genCoursesBySchool = () => {
  let courses = {};
  for (let schoolId = 1; schoolId <= 50; schoolId++) {
    courses[schoolId] = genBasicCourseList(Random.integer(5, 20), schoolId);
  }
  return courses;
}

const genCourseRank = (size) => {
  let courses = [];
  while (size--) {
    courses.push({
      id: Random.integer(1, 2000),
      name: Random.ctitle(),
      recommend_score: Random.float(0, 4)
    })
  }
  return courses;
}

export default {
  'POST /api/course/get_course_list': (req, res) => {
    const { page_size, course_type, school_id } = req.body;
    res.send({
      result: Result.SUCCESS,
      reply: {
        total: Random.integer(1000, 2000),
        courses: genCourseList(page_size, course_type, school_id),
      }
    })
  },

  'GET /api/course/get_courses_by_school': (req, res) => {
    res.send({
      result: Result.SUCCESS,
      reply: genCoursesBySchool(),
    })
  },

  'POST /api/course/get_course_info': (req, res) => {
    const { course_id } = req.body;
    res.send({
      result: Result.SUCCESS,
      reply: {
        id: course_id,
        name: Random.ctitle(),
        credit: Random.integer(0, 9),
        course_no: Random.string('number', 8),
        school_id:  Random.integer(1, 50),
        type: typeIds[Random.integer(0, typeIds.length-1)],
        review_count: Random.integer(0, 10),
        recommend_score: Random.float(0, 4),
        content_score: Random.float(0, 4),
        work_score: Random.float(0, 4),
        exam_score: Random.float(0, 4),
        last_review: randomTimestamp(),
        create_time: randomTimestamp(),
      }
    })
  },

  'POST /api/course/get_course_rank': (req, res) => {
    let {rank_size} = req.body;
    if (!rank_size) rank_size = 10;
    res.send({
      result: Result.SUCCESS,
      reply: {
        courses: genCourseRank(rank_size),
      }
    })
  }
}
