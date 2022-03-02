const jianService = require('../service/jian.service')

class JianController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const {
      offset,
      size
    } = ctx.query;

    // 2.查询列表
    const {
      result,
      count
    } = await jianService.getJianList(offset, size);
    console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const jian = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await jianService.create(jian);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      jianId
    } = ctx.params;
    const {
      majorName,
      male,
      female,
      majorTotal
    } = ctx.request.body;
    console.log(majorName, male, female, majorTotal);

    const result = await jianService.update(majorName, male, female, majorTotal, jianId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      jianId
    } = ctx.params;

    // 2.删除内容
    const result = await jianService.remove(jianId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new JianController();