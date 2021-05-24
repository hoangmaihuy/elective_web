import {Random} from 'mockjs';
import {Result} from "../src/services/result";

const randomTimestamp = () => new Date(Random.datetime()).getTime();

const genReviews = (size, courseId, teacherId, semester) => {
  let reviews = [];
  while (size--) {
    reviews.push({
      id: Random.integer(1, 1000000),
      title: Random.ctitle(),
      content: Random.cparagraph(),
      course_id: courseId || Random.integer(1, 2000),
      class_id: Random.integer(1, 2000),
      teacher_id: teacherId || Random.integer(1, 2000),
      recommend_score: Random.float(0, 4),
      content_score: Random.float(0, 4),
      work_score: Random.float(0, 4),
      exam_score: Random.float(0, 4),
      create_time: randomTimestamp(),
      teacher_name: Random.cname(),
      course_name: Random.ctitle(),
      semester: semester || "20-21-2",
      likes: Random.integer(1, 100),
      dislikes: Random.integer(1, 100),
      interaction: Random.integer(-1, 1),
    })
  }
  return reviews;
}

export default {
  'POST /api/review/add_review': {
    result: Result.SUCCESS,
  },

  'POST /api/review/get_course_reviews': (req, res) => {
    const { course_id, teacher_id, semester, page_size } = req.body;
    let reviews = genReviews(page_size, course_id, teacher_id, semester);
    res.send({
      result: Result.SUCCESS,
      reply: {
        total: Random.integer(10, 50),
        reviews: reviews,
      }
    })
  },

  'POST /api/review/get_teacher_reviews': (req, res) => {
    const { teacher_id, page_size } = req.body;
    let reviews = genReviews(page_size, null, teacher_id, null);
    res.send({
      result: Result.SUCCESS,
      reply: {
        total: Random.integer(page_size, 50),
        reviews: reviews,
      }
    })
  },

  'POST /api/review/interact_review': {
    result: Result.SUCCESS,
  }
}
