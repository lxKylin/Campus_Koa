const connection = require('../app/database');

class JiaokeService {
  async getJiaokeList(offset, size) {
    const statement = `
      SELECT 
      jk.id id, jk.jiaoke_name jiaokeName, jk.level level, jk.createAt createAt
      FROM jiaoke jk
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM jiaoke;`;
    const [result] = await connection.execute(statement, [offset, size]);
    // console.log(await connection.execute(statement, [offset, size]), '345')
    const [count] = await connection.execute(state);
    // console.log(await connection.execute(state), '999')
    return {
      result,
      count
    };
    // return result;
  }

  async create(jiaoke) {
    const {
      jiaokeName,
      level
    } = jiaoke;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO jiaoke (jiaoke_name, level) VALUES (?, ?);`;
    const result = await connection.execute(statement, [jiaokeName, level]);
    // console.log(result, '222');
    return result[0];
  }

  async update(jiaokeName, level, jiaokeId) {
    const statement = `UPDATE jiaoke SET jiaoke_name = ?, level = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [jiaokeName, level, jiaokeId]);
    return result;
  }

  async remove(jiaokeId) {
    const statement = `DELETE FROM jiaoke WHERE id = ?;`;
    const [result] = await connection.execute(statement, [jiaokeId]);
    return result;
  }
}

module.exports = new JiaokeService();