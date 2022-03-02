const connection = require('../app/database');

class TeacherService {
  async getTeacherList(offset, size) {
    const statement = `
      SELECT 
      t.id id, t.title title, t.education edu, t.male male, t.female female, t.sum sum, t.createAt createAt, t.updateAt updateAt
      FROM teacher t
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM teacher;`;
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

  async create(teacher) {
    const {
      title,
      education,
      male,
      female,
      sum
    } = teacher;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO teacher (title, education, male, female, sum) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [title, education, male, female, sum]);
    // console.log(result, '222');
    return result[0];
  }

  async update(title, education, male, female, sum, teacherId) {
    const statement = `UPDATE teacher SET title = ?, education = ?, male = ?, female = ?, sum = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [title, education, male, female, sum, teacherId]);
    return result;
  }

  async remove(teacherId) {
    const statement = `DELETE FROM teacher WHERE id = ?;`;
    const [result] = await connection.execute(statement, [teacherId]);
    return result;
  }
}

module.exports = new TeacherService();