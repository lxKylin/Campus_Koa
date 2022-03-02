const connection = require('../app/database');

class JianService {
  async getJianList(offset, size) {
    const statement = `
      SELECT 
        z.id id, z.major_name majorName, z.male male, z.female female, z.major_total majorTotal, z.createAt createAt, z.updateAt updateAt
      FROM jianzhu z
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM jianzhu;`;
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

  async create(jian) {
    const {
      majorName,
      male,
      female,
      majorTotal
    } = jian;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO jianzhu (major_name, male, female, major_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [majorName, male, female, majorTotal]);
    // console.log(result, '222');
    return result[0];
  }

  async update(majorName, male, female, majorTotal, jianId) {
    const statement = `UPDATE jianzhu SET major_name = ?, male = ?, female = ?, major_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [majorName, male, female, majorTotal, jianId]);
    return result;
  }

  async remove(jianId) {
    const statement = `DELETE FROM jianzhu WHERE id = ?;`;
    const [result] = await connection.execute(statement, [jianId]);
    return result;
  }
}

module.exports = new JianService();