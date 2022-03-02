const shangService = require('../service/shang.service')

class ShangController {

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
    } = await shangService.getShangList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const shang = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await shangService.create(shang);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      shangId
    } = ctx.params;
    const {
      majorName,
      male,
      female,
      majorTotal
    } = ctx.request.body;
    console.log(majorName, male, female, majorTotal);

    const result = await shangService.update(majorName, male, female, majorTotal, shangId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      shangId
    } = ctx.params;

    // 2.删除内容
    const result = await shangService.remove(shangId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new ShangController();