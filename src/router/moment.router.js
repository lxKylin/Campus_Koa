// 动态
const Router = require('koa-router');

const momentRouter = new Router({prefix: '/api/moment'});

const { verifyAuth } = require('../middleware/auth.middleware');

const { create, detail, list } = require('../controller/moment.colltroller');

// 发布
momentRouter.post('/', verifyAuth, create);
// 获取多条
momentRouter.get('/', list);
// 获取单条
momentRouter.get('/:momentId', detail);

module.exports = momentRouter;
