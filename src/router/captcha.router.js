const Router = require('koa-router');

const codeRouter = new Router();

const {
  verifyCaptcha
} = require('../middleware/captcha.middleware');

codeRouter.get('/api/code', verifyCaptcha);

module.exports = codeRouter;
