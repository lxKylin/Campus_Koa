// 请求路径 中间件处理的 映射
const Router = require('koa-router');

// 具体的处理逻辑
const {
  list,
  create,
  update,
  remove
} = require('../controller/news.controller');

// 中间件

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

// 前缀：
const newsRouter = new Router({
  prefix: '/api/news'
});
// 注册接口： 创建用户使用post请求
// verifyUsers -> 拦截中间件 -> 效验
// handlePassword -> 拦截中间件 -> 将密码加密存储
newsRouter.post('/', create);

newsRouter.get('/list', list);
newsRouter.patch('/:newsId', update);
newsRouter.delete('/:newsId', remove);

// 导出
module.exports = newsRouter;