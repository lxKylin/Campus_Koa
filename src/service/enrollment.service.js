const connection = require('../app/database');

class EnrollmentService {
  async getEnrollmentList(offset, size) {
    const statement = `
      SELECT 
      e.id id, e.province province, e.physics physics, e.history history, e.number number
      FROM enrollment e
      LIMIT ?, ?;
    `;

    const state = `SELECT COUNT(*) total FROM enrollment;`;
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

  async create(enrollment) {
    const {
      province,
      physics,
      history,
      number
    } = enrollment;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO enrollment (province, physics, history, number) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [province, physics, history, number]);
    // console.log(result, '222');
    return result[0];
  }

  async update(province, physics, history, number, enrollmentId) {
    const statement = `UPDATE enrollment SET province = ?, physics = ?, history = ?, number = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [province, physics, history, number, enrollmentId]);
    return result;
  }

  async remove(enrollmentId) {
    const statement = `DELETE FROM enrollment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [enrollmentId]);
    return result;
  }
}

module.exports = new EnrollmentService();