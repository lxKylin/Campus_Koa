const connection = require('../app/database');
class UserService {
  async create(user) {
    const { username, password } = user;
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO users (username, password) VALUES (?, ?);`;
    // [username, password] 对应 (?, ?)
    const result = await connection.execute(statement, [username, password]);

    return result;
  }
}

module.exports = new UserService();
