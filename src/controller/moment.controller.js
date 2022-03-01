const fs = require('fs');

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');

const { PICTURE_PATH } = require('../constants/file-path');

class MomentConstructor {
  async create(ctx, next) {
    // 1.获取数据（user_id, content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);

    // 2.将数据插入数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
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

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);

    // ctx.body = '修改成功~' + momentId + content + id;
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params;

    // 2.删除内容
    const result = await momentService.remove(momentId);

    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    console.log(labels);
    const { momentId } = ctx.params;
    console.log(momentId);

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabels(momentId, label.id);
      }
    }
    ctx.body = '添加动态标签成功！';
  }

  async fileInfo(ctx, next) {
    const { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentConstructor();
