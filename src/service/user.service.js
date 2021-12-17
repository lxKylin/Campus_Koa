class UserService {
  async create(user) {
    // 将user存储到数据库中
    console.log("将用户数据保存在数据库中：", user);
    return "创建用户成功";
  }
}

module.exports = new UserService();
