const borrowService = require('../service/borrow.service')

class BorrowController {

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
    } = await borrowService.getBorrowList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const borrow = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await borrowService.create(borrow);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      borrowId
    } = ctx.params;
    const {
      book,
      name,
      status
    } = ctx.request.body;

    const result = await borrowService.update(book, name, status, borrowId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      borrowId
    } = ctx.params;

    // 2.删除内容
    const result = await borrowService.remove(borrowId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new BorrowController();