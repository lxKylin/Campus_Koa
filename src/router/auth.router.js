// 授权
const Router = require('koa-router');

const authRouter = new Router();

// 根据authRouter.post('/login', login) 中需要的写
const {
  login
} = require('../controller/auth.controller.js');

authRouter.post('/login', login)

module.exports = authRouter;
