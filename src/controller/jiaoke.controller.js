const jiaokeService = require('../service/jiaoke.service')

class JiaokeController {

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
    } = await jiaokeService.getJiaokeList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const jiaoke = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await jiaokeService.create(jiaoke);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      jiaokeId
    } = ctx.params;
    const {
      jiaokeName,
      level
    } = ctx.request.body;

    const result = await jiaokeService.update(jiaokeName, level, jiaokeId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      jiaokeId
    } = ctx.params;

    // 2.删除内容
    const result = await jiaokeService.remove(jiaokeId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new JiaokeController();