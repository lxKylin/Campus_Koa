const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据库 -> 抽离到service
    const result = await userService.create(user);

    // 返回结果
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { userId } = ctx.params;

    // 2.删除内容
    const result = await userService.remove(userId);

    ctx.body = result;
  }
}

module.exports = new UserController();