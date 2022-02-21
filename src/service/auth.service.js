// 权限相关的
const connection = require('../app/database');

class AuthService {
  async checkMoment(momentId, userId) {
    try {
      const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
      const [result] = await connection.execute(statement, [momentId, userId]);
      // console.log(result);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error)
    }
    
  }
}

module.exports = new AuthService();
