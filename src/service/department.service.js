const connection = require('../app/database');

class DeportmentService {
  async getDepartmentList(offset, size) {
    const statement = `
      SELECT 
        d.id id, d.department_name departmentName, d.principal principal, d.adviser adviser, d.department_total departmentTotal,  d.createAt createAt, d.updateAt updateAt
      FROM department d
      LIMIT ?, ?;
    `;
    // const state = `SELECT FOUND_ROWS() as total FROM role;`;
    const state = `SELECT COUNT(*) total FROM department`;
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

  async create(deportment) {
    const {
      departmentName,
      principal,
      adviser,
      departmentTotal
    } = deportment;
    // console.log(deportment);
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO department (department_name, principal, adviser, department_total) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [departmentName, principal, adviser, departmentTotal]);
    // console.log(result);
    return result[0];
  }

  async update(departmentName, principal, adviser, departmentTotal, deportmentId) {
    const statement = `UPDATE department SET department_name = ?, principal = ?, adviser = ?, department_total = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [departmentName, principal, adviser, departmentTotal, deportmentId]);
    return result;
  }

  async remove(deportmentId) {
    const statement = `DELETE FROM department WHERE id = ?;`;
    const [result] = await connection.execute(statement, [deportmentId]);
    return result;
  }
}

module.exports = new DeportmentService();