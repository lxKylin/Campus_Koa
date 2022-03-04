// 请求路径 中间件处理的 映射
const Router = require('koa-router');

// 具体的处理逻辑
const {
  list,
  create,
  update,
  remove
} = require('../controller/book.controller');

// 中间件

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

// 前缀：
const bookRouter = new Router({
  prefix: '/api/book'
});
// 注册接口： 创建用户使用post请求
// verifyUsers -> 拦截中间件 -> 效验
// handlePassword -> 拦截中间件 -> 将密码加密存储
bookRouter.post('/', create);

bookRouter.get('/list', list);
bookRouter.patch('/:bookId', update);
bookRouter.delete('/:bookId', remove);

// 导出
module.exports = bookRouter;