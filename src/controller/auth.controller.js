// 导入jwt
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    // console.log(ctx.user)
    const { id, name } = ctx.user;
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 24 hours
      algorithm: 'RS256', // 签名算法
    });

    // const { name } = ctx.request.body;
    // ctx.body = `Hi~${name}，登录成功！`;
    ctx.body = {
      id,
      name,
      token
    }
  }

  async success(ctx, next) {
    ctx.body = '授权成功！'
  }
}

module.exports = new AuthController();
