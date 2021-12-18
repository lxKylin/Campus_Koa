// node自带的加密库
const crypto = require('crypto');

const md5password = (password) => {
  // 返回的md5是个对象,   使用md5的方式加密
  const md5 = crypto.createHash('md5');
  // 将加密后的二进制数据转为16进制
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = md5password;
