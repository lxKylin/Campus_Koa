const corporationService = require('../service/corporation.service')

class CorporationController {

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
    } = await corporationService.getCorporationList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
    // const result = await roleService.getRoleList(offset, size);
    // ctx.body = {
    //   code: 200,
    //   data: result
    // };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const corporation = ctx.request.body;

    // 查询数据库 -> 抽离到service
    const result = await corporationService.create(corporation);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      corporationId
    } = ctx.params;
    const {
      corporationName,
      principal,
      adviser,
      corporationTotal
    } = ctx.request.body;
    // console.log(roleId, roleName, userName);

    const result = await corporationService.update(corporationName, principal, adviser, corporationTotal, corporationId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      corporationId
    } = ctx.params;

    // 2.删除内容
    const result = await corporationService.remove(corporationId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new CorporationController();