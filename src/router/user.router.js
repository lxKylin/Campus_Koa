// 请求路径 中间件处理的 映射
const Router = require('koa-router');

const {
  create
} = require('../controller/user.controller');

// 前缀：/users
const userRouter = new Router({
  prefix: '/users'
});
// 注册接口： 创建用户使用post请求
userRouter.post('/', create);

// 具体的处理逻辑抽离到controller
// userRouter.post('/', (ctx, next) => {
//   // 返回结果
//   ctx.body = "创建用户成功！";
// });


// 导出
module.exports = userRouter;