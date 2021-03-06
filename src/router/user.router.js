// 请求路径 中间件处理的 映射
const Router = require('koa-router');

// 具体的处理逻辑
const {
  create,
  remove,
  avatarInfo,
  list,
  update,
  detail
} = require('../controller/user.controller');

// 中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware');

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

// 前缀：/users
const userRouter = new Router({
  prefix: '/api/users'
});
// 注册接口： 创建用户使用post请求
// verifyUsers -> 拦截中间件 -> 效验
// handlePassword -> 拦截中间件 -> 将密码加密存储
userRouter.post('/', verifyUser, handlePassword, create);
// userRouter.delete('/:userId', verifyAuth, verifyPermission, remove)
userRouter.delete('/:userId', remove);

userRouter.get('/list', list);
userRouter.get('/:userId', detail);
userRouter.patch('/:userId', update);

userRouter.get('/:userId/avatar', avatarInfo);

// 具体的处理逻辑抽离到controller
// userRouter.post('/', (ctx, next) => {
//   // 返回结果
//   ctx.body = "创建用户成功！";
// });


// 导出
module.exports = userRouter;