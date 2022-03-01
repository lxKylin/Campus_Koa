// 动态
const Router = require('koa-router');

const momentRouter = new Router({prefix: '/api/moment'});

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

// 验证是否存在该标签
const {
  verifyLabelExists
} = require('../middleware/label.middleware');

const { 
  create, 
  detail, 
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller');

// 发布 增
momentRouter.post('/', verifyAuth, create);
// 获取多条 查
momentRouter.get('/list', list);
// 获取单条
momentRouter.get('/:momentId', detail);

// 修改
// 用户必须登录  用户必须具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
// 删除
// 用户必须登录  用户必须具备权限
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图的服务
momentRouter.get('/image/:filename', fileInfo)

module.exports = momentRouter;
