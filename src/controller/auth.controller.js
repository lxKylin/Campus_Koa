class AuthController {
  async login(ctx, next) {
    const { username } = ctx.request.body;
    ctx.body = `Hi~${username}，登录成功！`;
  }
}

module.exports = new AuthController();
