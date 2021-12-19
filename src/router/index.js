const fs = require('fs');

const useRoutes = (app) => {
  // 读取当前文件所在目录
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRoutes;
