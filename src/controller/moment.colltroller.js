const momentService = require('../service/moment.service');

class MomentConstructor {
  async create(ctx, next) {
    // 1.获取数据（user_id, content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);

    // 2.将数据插入数据库
    const result = await momentService.create(userId, content)
    ctx.body = result
    // ctx.body = '发表动态成功'
  }

  async detail(ctx, next) {
    // 1.获取某一条动态详情
    const momentId = ctx.params.momentId;

    // 根据id查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }
}

module.exports = new MomentConstructor();