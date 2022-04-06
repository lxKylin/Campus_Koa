const bookService = require('../service/book.service')

class BookController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const {
      offset,
      size,
      book,
      classify
    } = ctx.query;

    // console.log(ctx.query)

    // 2.查询列表
    const {
      result,
      count
    } = await bookService.getBookList(offset, size, book, classify);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const book = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await bookService.create(book);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      bookId
    } = ctx.params;
    const {
      book,
      classify,
      number
    } = ctx.request.body;

    const result = await bookService.update(book, classify, number, bookId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      bookId
    } = ctx.params;

    // 2.删除内容
    const result = await bookService.remove(bookId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new BookController();