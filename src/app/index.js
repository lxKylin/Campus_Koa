const Koa = require('koa');
// 导入bodyParser中间件，解析json
const bodyParser = require('koa-bodyparser')
// 导入router
const userRouter = require('../router/user.router');

const app = new Koa();

app.use(bodyParser());

app.use(userRouter.routes());
// 判断某个请求方式有没有，如果没有，会返回不允许，或者返回当前这个，服务器是不支持的
app.use(userRouter.allowedMethods());

module.exports = app;
