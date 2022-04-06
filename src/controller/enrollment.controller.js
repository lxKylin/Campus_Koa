const enrollmentService = require('../service/enrollment.service')

class EnrollmentController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const {
      offset,
      size,
      id,
      province
    } = ctx.query;

    // console.log(ctx.query)

    // 2.查询列表
    const {
      result,
      count
    } = await enrollmentService.getEnrollmentList(offset, size, id, province);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const enrollment = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await enrollmentService.create(enrollment);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      enrollmentId
    } = ctx.params;
    const {
      province,
      physics,
      history,
      number
    } = ctx.request.body;

    const result = await enrollmentService.update(province, physics, history, number, enrollmentId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      enrollmentId
    } = ctx.params;

    // 2.删除内容
    const result = await enrollmentService.remove(enrollmentId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new EnrollmentController();