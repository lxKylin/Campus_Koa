const Koa = require('koa');

// 请求路径 中间件处理的 映射
const Router = require('koa-router');

const app = new Koa();

// 前缀：/users
const userRouter = new Router({prefix: '/users'});

// 创建用户使用post
userRouter.post('/', (ctx, next) => {
  // 返回结果
  ctx.body = "创建用户成功！";
});

app.use(userRouter.routes());

// 判断某个请求方式有没有，如果没有，会返回不允许，或者返回当前这个，服务器是不支持的
app.use(userRouter.allowedMethods());

module.exports = app;
