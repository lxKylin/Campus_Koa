const connection = require('../app/database');

class ShangService {
  async getShangList(offset, size) {
    const statement = `
      SELECT 
        s.id id, s.major_name majorName, s.male male, s.female female, s.major_total majorTotal,  s.createAt createAt, s.updateAt updateAt
      FROM shang s
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM shang;`;
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

  async create(shang) {
    const {
      majorName,
      male,
      female,
      majorTotal
    } = shang;
    // console.log(shang, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO shang (major_name, male, female, major_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [majorName, male, female, majorTotal]);
    // console.log(result, '222');
    return result[0];
  }

  async update(majorName, male, female, majorTotal, shangId) {
    const statement = `UPDATE jixin SET major_name = ?, male = ?, female = ?, major_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [majorName, male, female, majorTotal, shangId]);
    return result;
  }

  async remove(shangId) {
    const statement = `DELETE FROM shang WHERE id = ?;`;
    const [result] = await connection.execute(statement, [shangId]);
    return result;
  }
}

module.exports = new ShangService();