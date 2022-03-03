const connection = require('../app/database');

class StudyService {
  async getStudyList(offset, size) {
    const statement = `
      SELECT 
      study.id id, study.year year, study.number number, study.createAt createAt, study.updateAt updateAt
      FROM study
      LIMIT ?, ?;
    `;

    const state = `SELECT COUNT(*) total FROM study;`;
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

  async create(study) {
    const {
      year,
      number
    } = study;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO study (year, number) VALUES (?, ?);`;
    const result = await connection.execute(statement, [year, number]);
    // console.log(result, '222');
    return result[0];
  }

  async update(year, number, studyId) {
    const statement = `UPDATE study SET year = ?, number = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [year, number, studyId]);
    return result;
  }

  async remove(studyId) {
    const statement = `DELETE FROM study WHERE id = ?;`;
    const [result] = await connection.execute(statement, [studyId]);
    return result;
  }
}

module.exports = new StudyService();