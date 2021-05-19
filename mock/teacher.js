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
  }
}
