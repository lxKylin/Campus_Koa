const fileService = require('../service/file.service');
const userService = require('../service/user.service');

const {
  APP_HOST,
  APP_PORT
} = require('../app/config');

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { id } = ctx.user;
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    console.log(ctx.req.file)

    // 2.将图像信息保存到数据库
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 3.将图片地址保存在user表中 http://localhost:9999/api/users/6/avatar
    const avatarUrl = `${APP_HOST}:${APP_PORT}/api/user/${id}/avatar`;
    await userService.updateAvatarById(avatarUrl, id);

    // 4.返回数据
    ctx.body = {
      statusCode: 200,
      message: '上传头像成功！'
    };
  }

  async savePictureInfo(ctx, next) {
    // 1.获取图像相关信息
    const files = ctx.req.files;
    console.log(files);

    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 2.将图像信息保存到数据库
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    
    // 3.将图片地址保存在user表中 http://localhost:9999/api/users/6/avatar
    // const avatarUrl = `${APP_HOST}:${APP_PORT}/api/user/${id}/avatar`;
    // await userService.updateAvatarById(avatarUrl, id);

    // 4.返回数据
    ctx.body = {
      statusCode: 200,
      message: '上传动态图片成功！'
    };
  }
}

module.exports = new FileController();
