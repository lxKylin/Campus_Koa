const connection = require('../app/database');
class UserService {
  async create(user) {
    const { name, password } = user;
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    // [username, password] 对应 (?, ?)
    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }
}

module.exports = new UserService();
