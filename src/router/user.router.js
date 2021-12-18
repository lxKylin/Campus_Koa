// 请求路径 中间件处理的 映射
const Router = require('koa-router');

// 具体的处理逻辑
const {
  create
} = require('../controller/user.controller');

// 中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');

// 前缀：/users
const userRouter = new Router({
  prefix: '/users'
});
// 注册接口： 创建用户使用post请求
// verifyUsers -> 拦截中间件 -> 效验
// handlePassword -> 拦截中间件 -> 将密码加密存储
userRouter.post('/', verifyUser, handlePassword, create);

// 具体的处理逻辑抽离到controller
// userRouter.post('/', (ctx, next) => {
//   // 返回结果
//   ctx.body = "创建用户成功！";
// });


// 导出
module.exports = userRouter;