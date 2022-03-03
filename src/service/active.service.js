const connection = require('../app/database');

class ActiveService {
  async getActiveList(offset, size) {
    const statement = `
      SELECT 
      a.id id, a.title title, a.time time, a.address address, a.content content, a.createAt createAt, a.updateAt updateAt
      FROM active a
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM active;`;
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

  async create(active) {
    const {
      title,
      time,
      address,
      content
    } = active;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO active (title, time, address, content) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [title, time, address, content]);
    // console.log(result, '222');
    return result[0];
  }

  async update(title, time, address, content, activeId) {
    const statement = `UPDATE active SET title = ?, time = ?, address = ?, content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [title, time, address, content, activeId]);
    return result;
  }

  async remove(activeId) {
    const statement = `DELETE FROM active WHERE id = ?;`;
    const [result] = await connection.execute(statement, [activeId]);
    return result;
  }
}

module.exports = new ActiveService();