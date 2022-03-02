const newsService = require('../service/news.service')

class NewsController {

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
    } = await newsService.getNewsList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const news = ctx.request.body;
    // console.log(shang);

    // 查询数据库 -> 抽离到service
    const result = await newsService.create(news);

    // 返回结果
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async update(ctx, next) {
    const {
      newsId
    } = ctx.params;
    const {
      newsTitle,
      imgUrl,
      time,
      content
    } = ctx.request.body;

    const result = await newsService.update(newsTitle, imgUrl, time, content, newsId);
    ctx.body = {
      code: 200,
      data: result
    };
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      newsId
    } = ctx.params;

    // 2.删除内容
    const result = await newsService.remove(newsId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new NewsController();