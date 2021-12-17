// 程序入口，越简单越好
const app = require('./app');
// 查看数据库是否连接成功
require('./app/database');
const config = require('./app/config');

// 监听端口不写死
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功!`);
});
