// 可加载根目录下的.env文件，将里面的直接加载到环境变量里面
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  APP_PORT
} = process.env;
