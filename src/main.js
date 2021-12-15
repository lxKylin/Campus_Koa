// 程序入口，越简单越好
const app = require('./app');
const config = require('./app/config');

// 监听端口不写死
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功!`);
});
