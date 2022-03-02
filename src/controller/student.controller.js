const studentService = require('../service/student.service')

class StudentController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const {
      offset,
      size
    } = ctx.query;

    // console.log(offset, size)

    // 2.查询列表
    const {
      result,
      count
    } = await studentService.getStudentList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const student = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await studentService.create(student);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      studentId
    } = ctx.params;
    const {
      grade,
      male,
      female,
      sum
    } = ctx.request.body;

    const result = await studentService.update(grade, male, female, sum, studentId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      studentId
    } = ctx.params;

    // 2.删除内容
    const result = await studentService.remove(studentId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new StudentController();