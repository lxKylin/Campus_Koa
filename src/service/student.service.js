const connection = require('../app/database');

class StudentService {
  async getStudentList(offset, size) {
    const statement = `
      SELECT 
      stu.id id, stu.grade grade, stu.male male, stu.female female, stu.sum sum, stu.createAt createAt, stu.updateAt updateAt
      FROM student stu
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM student;`;
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

  async create(student) {
    const {
      grade,
      male,
      female,
      sum
    } = student;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO student (grade, male, female, sum) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [grade, male, female, sum]);
    // console.log(result, '222');
    return result[0];
  }

  async update(grade, male, female, sum, studentId) {
    const statement = `UPDATE student SET grade = ?, male = ?, female = ?, sum = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [grade, male, female, sum, studentId]);
    return result;
  }

  async remove(studentId) {
    const statement = `DELETE FROM student WHERE id = ?;`;
    const [result] = await connection.execute(statement, [studentId]);
    return result;
  }
}

module.exports = new StudentService();