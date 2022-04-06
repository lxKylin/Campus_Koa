const teacherService = require('../service/teacher.service')

class TeacherController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const {
      offset,
      size,
      title
    } = ctx.query;

    // console.log(offset, size)

    // 2.查询列表
    const {
      result,
      count
    } = await teacherService.getTeacherList(offset, size, title);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const teacher = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await teacherService.create(teacher);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      teacherId
    } = ctx.params;
    const {
      title,
      education,
      male,
      female,
      sum
    } = ctx.request.body;

    const result = await teacherService.update(title, education, male, female, sum, teacherId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      teacherId
    } = ctx.params;

    // 2.删除内容
    const result = await teacherService.remove(teacherId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new TeacherController();