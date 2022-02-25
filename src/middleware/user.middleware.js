const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');

// 效验用户名及密码
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    // 发出事件类型为error 传出两个参数为error, ctx
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断本次注册的用户名是没有被注册过的
  const result = await service.getUserByName(name);
  // result是个数组
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}

// 加密存储密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 加密
  ctx.request.body.password = md5password(password);
  
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
};
