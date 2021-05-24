import {Random} from 'mockjs';
import {Result} from "../src/services/result";

export default {
  'POST /api/teacher/get_teachers_by_course' : (req, res) => {
    let teachers = [];
    let size = Random.integer(2, 5);
    while (size--)
      teachers.push({
        id: Random.integer(1, 1000),
        name: Random.cname(),
      })
    res.send({
      result: Result.SUCCESS,
      reply: {
        teachers,
      }
    })
  },

  'POST /api/teacher/get_teacher_info' : (req, res) => {
    const {teacher_id} = req.body;
    res.send({
      result: Result.SUCCESS,
      reply: {
        id: teacher_id,
        name: Random.cname(),
        review_count: Random.integer(1, 50),
        recommend_score: Random.float(0, 4),
        content_score: Random.float(0, 4),
        work_score: Random.float(0, 4),
        exam_score: Random.float(0, 4),
      }
    })
  },
}
