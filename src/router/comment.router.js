const Router = require('koa-router');

const commentRouter = new Router({prefix: '/comment'});

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

const {
  create,
  reply,
  update,
  remove
} = require('../controller/comment.controller');

// 评论
commentRouter.post('/', verifyAuth, create);
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
// 修改
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
// commentRouter.patch('/:commentId', verifyAuth, verifyPermission("comment"), update);
// 删除
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);

module.exports = commentRouter;
