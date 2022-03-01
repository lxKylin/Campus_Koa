// 读取文件信息
const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');

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

  async avatarInfo(ctx, next) {
    // 1.用户的头像是哪个文件
    const { userId } = ctx.params;

    const avatarInfo = await fileService.getAvatarByUserId(userId);

    // ctx.body = avatarInfo; // 不能直接返回这个

    // 2.提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype); // 需要查看图片就这样设置，如要下载可注释
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const { result, count} = await userService.getUserList(offset, size);
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async detail(ctx, next) {
    // 1.获取某一条动态详情
    const { userId } = ctx.params;

    // 根据id查询数据
    const result = await userService.getUserById(userId);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { userId } = ctx.params;
    const { name, password } = ctx.request.body;

    const result = await userService.update(name, password, userId);
    ctx.body = result;
  }
}

module.exports = new UserController();