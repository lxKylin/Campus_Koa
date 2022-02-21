// 授权
const Router = require('koa-router');

const authRouter = new Router();

// 根据authRouter.post('/login', verifyLogin, login) 中需要的写
const {
  login,
  success
} = require('../controller/auth.controller');

const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

authRouter.post('/api/login', verifyLogin, login);
authRouter.get('/api/test', verifyAuth, success)

module.exports = authRouter;
