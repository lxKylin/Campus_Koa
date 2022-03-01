const connection = require('../app/database');

class JixinService {
  async getJixinList(offset, size) {
    const statement = `
      SELECT 
        j.id id, j.major_name majorName, j.male male, j.female female, j.major_total majorTotal,  j.createAt createAt, j.updateAt updateAt
      FROM jixin j
      LIMIT ?, ?;
    `;
    // const state = `SELECT FOUND_ROWS() as total FROM role;`;
    const state = `SELECT COUNT(*) total FROM jixin;`;
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

  async create(jixin) {
    const {
      majorName,
      male,
      female,
      majorTotal
    } = jixin;
    // console.log(jixin, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO jixin (major_name, male, female, major_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [majorName, male, female, majorTotal]);
    // console.log(result, '222');
    return result[0];
  }

  async update(majorName, male, female, majorTotal, jixinId) {
    const statement = `UPDATE jixin SET major_name = ?, male = ?, female = ?, major_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [majorName, male, female, majorTotal, jixinId]);
    return result;
  }

  async remove(jixinId) {
    const statement = `DELETE FROM jixin WHERE id = ?;`;
    const [result] = await connection.execute(statement, [jixinId]);
    return result;
  }
}

module.exports = new JixinService();