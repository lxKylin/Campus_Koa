const activeService = require('../service/active.service')

class ActiveController {

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
    } = await activeService.getActiveList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const active = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await activeService.create(active);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      activeId
    } = ctx.params;
    const {
      title,
      time,
      address,
      content
    } = ctx.request.body;

    const result = await activeService.update(title, time, address, content, activeId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      activeId
    } = ctx.params;

    // 2.删除内容
    const result = await activeService.remove(activeId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new ActiveController();