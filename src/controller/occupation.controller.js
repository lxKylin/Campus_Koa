const occupationService = require('../service/occupation.service')

class OccupationController {

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
    } = await occupationService.getOccupationList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const occupation = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await occupationService.create(occupation);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      occupationId
    } = ctx.params;
    const {
      occupation,
      trade,
      number
    } = ctx.request.body;

    const result = await occupationService.update(occupation, trade, number, occupationId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      occupationId
    } = ctx.params;

    // 2.删除内容
    const result = await occupationService.remove(occupationId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new OccupationController();