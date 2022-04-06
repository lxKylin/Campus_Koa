const connection = require('../app/database');

class OccupationService {
  async getOccupationList(offset, size, occupation, trade) {
    const statement = `
      SELECT 
      ot.id id, ot.occupation occupation, ot.trade trade, ot.number number
      FROM occupation_trade ot
      LIMIT ?, ?;
    `;

    const state = `SELECT COUNT(*) total FROM occupation_trade;`;

    const state2 = "SELECT * FROM occupation_trade WHERE occupation LIKE ? OR trade LIKE ?"

    if (!occupation && !trade) {
      const [result] = await connection.execute(statement, [offset, size]);
      const [count] = await connection.execute(state);
      // console.log(result, '3333')
      return { result, count };
    } else {
      const [result] = await connection.execute(state2, [occupation, trade])
      const [count] = await connection.execute(state);
      // console.log(result, '3333')
      return { result, count };
    }
  }

  async create(occ) {
    const {
      occupation,
      trade,
      number
    } = occ;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO occupation_trade (occupation, trade, number) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [occupation, trade, number]);
    // console.log(result, '222');
    return result[0];
  }

  async update(occupation, trade, number, occupationId) {
    const statement = `UPDATE occupation_trade SET occupation = ?, trade = ?, number = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [occupation, trade, number, occupationId]);
    return result;
  }

  async remove(occupationId) {
    const statement = `DELETE FROM occupation_trade WHERE id = ?;`;
    const [result] = await connection.execute(statement, [occupationId]);
    return result;
  }
}

module.exports = new OccupationService();