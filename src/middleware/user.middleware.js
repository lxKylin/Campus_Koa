const errorType = require('../constants/error-types');
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { username, password } = ctx.request.body;

  // 2.判断用户名或者密码不能为空
  if (!username || !password || username === '' || password === '') {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    // 发出事件类型为error 传出两个参数为error, ctx
    return ctx.app.emit('error', error, ctx);
  }

  // 3.判断本次注册的用户名是没有被注册过的
  

  await next();
}

module.exports = {
  verifyUser
};
