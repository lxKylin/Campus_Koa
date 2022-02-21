// 动态
const Router = require('koa-router');

const momentRouter = new Router({prefix: '/api/moment'});

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

const { 
  create, 
  detail, 
  list,
  update,
  remove
} = require('../controller/moment.colltroller');

// 发布 增
momentRouter.post('/', verifyAuth, create);
// 获取多条 查
momentRouter.get('/', list);
// 获取单条
momentRouter.get('/:momentId', detail);

// 修改
// 用户必须登录  用户必须具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
// 删除
// 用户必须登录  用户必须具备权限
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
