const jixinService = require('../service/jixin.service')

class JixinController {

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
    } = await jixinService.getJixinList(offset, size);
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
    const jixin = ctx.request.body;
    // console.log(jixin);

    // 查询数据库 -> 抽离到service
    const result = await jixinService.create(jixin);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      jixinId
    } = ctx.params;
    const {
      majorName,
      male,
      female,
      majorTotal
    } = ctx.request.body;
    console.log(majorName, male, female, majorTotal);

    const result = await jixinService.update(majorName, male, female, majorTotal, jixinId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      jixinId
    } = ctx.params;

    // 2.删除内容
    const result = await jixinService.remove(jixinId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new JixinController();