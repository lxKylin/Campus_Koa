const studyService = require('../service/study.service')

class StudyController {

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
    } = await studyService.getStudyList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const study = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await studyService.create(study);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      studyId
    } = ctx.params;
    const {
      year,
      number
    } = ctx.request.body;

    const result = await studyService.update(year, number, studyId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      studyId
    } = ctx.params;

    // 2.删除内容
    const result = await studyService.remove(studyId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new StudyController();