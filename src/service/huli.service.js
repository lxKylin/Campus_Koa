const connection = require('../app/database');

class HuliService {
  async getHuliList(offset, size) {
    const statement = `
      SELECT 
        h.id id, h.major_name majorName, h.male male, h.female female, h.major_total majorTotal, h.createAt createAt, h.updateAt updateAt
      FROM huli h
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM huli;`;
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

  async create(huli) {
    const {
      majorName,
      male,
      female,
      majorTotal
    } = huli;
    // console.log(shang, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO huli (major_name, male, female, major_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [majorName, male, female, majorTotal]);
    // console.log(result, '222');
    return result[0];
  }

  async update(majorName, male, female, majorTotal, huliId) {
    const statement = `UPDATE huli SET major_name = ?, male = ?, female = ?, major_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [majorName, male, female, majorTotal, huliId]);
    return result;
  }

  async remove(huliId) {
    const statement = `DELETE FROM huli WHERE id = ?;`;
    const [result] = await connection.execute(statement, [huliId]);
    return result;
  }
}

module.exports = new HuliService();