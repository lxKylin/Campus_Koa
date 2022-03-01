const Multer = require('koa-multer');

const { 
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path');

// 存储图片
const avatarUpload = Multer({
  dest: AVATAR_PATH
});

const avatarHandler = avatarUpload.single('avatar');

// 存储图片
const pictureUpload = Multer({
  dest: PICTURE_PATH
});

const pictureHandler = pictureUpload.array('picture', 9); // 最大可上传9张

module.exports = {
  avatarHandler,
  pictureHandler
}
