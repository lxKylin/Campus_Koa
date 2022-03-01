const connection = require('../app/database');

class CorporationService {
  async getCorporationList(offset, size) {
    const statement = `
      SELECT 
        c.id id, c.corporation_name corporationName, c.principal principal, c.adviser adviser, c.corporation_total corporationTotal,  c.createAt createAt, c.updateAt updateAt
      FROM corporation c
      LIMIT ?, ?;
    `;
    // const state = `SELECT FOUND_ROWS() as total FROM role;`;
    const state = `SELECT COUNT(*) total FROM corporation;`;
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

  async create(corporation) {
    const {
      corporationName,
      principal,
      adviser,
      corporationTotal
    } = corporation;
    // console.log(deportment);
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO corporation (corporation_name, principal, adviser, corporation_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [corporationName, principal, adviser, corporationTotal]);
    // console.log(result);
    return result[0];
  }

  async update(corporationName, principal, adviser, corporationTotal, corporationId) {
    const statement = `UPDATE corporation SET corporation_name = ?, principal = ?, adviser = ?, corporation_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [corporationName, principal, adviser, corporationTotal, corporationId]);
    return result;
  }

  async remove(corporationId) {
    const statement = `DELETE FROM corporation WHERE id = ?;`;
    const [result] = await connection.execute(statement, [corporationId]);
    return result;
  }
}

module.exports = new CorporationService();