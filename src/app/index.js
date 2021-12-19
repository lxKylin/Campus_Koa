const Koa = require('koa');
// 导入bodyParser中间件，解析json
const bodyParser = require('koa-bodyparser')
// 导入错误信息处置方法
const errorHandler = require('./error-handle');
// 导入路由 升级版 动态加载路由
const useRoutes = require('../router');

// 导入router
// const userRouter = require('../router/user.router');
// const authRouter = require('../router/auth.router');

const app = new Koa();

app.use(bodyParser());

useRoutes(app);
// app.use(userRouter.routes());
// // 判断某个请求方式有没有，如果没有，会返回不允许，或者返回当前这个，服务器是不支持的
// app.use(userRouter.allowedMethods());

// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

app.on('error', errorHandler);

module.exports = app;
