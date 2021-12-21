const Router = require('koa-router');

const codeRouter = new Router();

const {
  verifyCaptcha
} = require('../middleware/captcha.middleware');

codeRouter.get('/code', verifyCaptcha);

module.exports = codeRouter;
