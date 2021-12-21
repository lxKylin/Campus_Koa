// 导入实现验证码的包
const svgCaptcha = require('svg-captcha');

const verifyCaptcha = async (ctx, next) => {
  const newCaptcha = svgCaptcha.create({
    size: 4, //验证码长度
    fontSize: 45, //验证码字号
    noise: 0, //干扰线条数目2条
    width: 120, //宽度
    height: 40, //高度
    ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
    color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
    background: '#ccc' //背景色
  })
  let img = newCaptcha.data; // 验证码
  let text = newCaptcha.text.toLowerCase(); // 验证码字符，忽略大小写

  // 设置响应头
  ctx.response.type = 'image/svg+xml';

  ctx.body = img;

  await next();
}

module.exports = {
  verifyCaptcha
};
