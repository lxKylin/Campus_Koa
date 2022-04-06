const connection = require('../app/database');

class TeacherService {
  async getTeacherList(offset, size, title) {
    const statement = `
      SELECT 
      t.id id, t.title title, t.education education, t.male male, t.female female, t.sum sum, t.createAt createAt, t.updateAt updateAt
      FROM teacher t
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM teacher;`;

    const state2 = "SELECT * FROM teacher WHERE title LIKE ?"

    if (!title) {
      const [result] = await connection.execute(statement, [offset, size]);
      const [count] = await connection.execute(state);
      // console.log(result, '3333')
      return { result, count };
    } else {
      const [result] = await connection.execute(state2, [title])
      const [count] = await connection.execute(state);
      // console.log(result, '3333')
      return { result, count };
    }
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