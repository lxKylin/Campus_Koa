const connection = require('../app/database');

class BorrowService {
  async getBorrowList(offset, size) {
    const statement = `
      SELECT 
      b.id id, b.book book, b.name name, b.status status, b.updateAt updateAt
      FROM borrow b
      LIMIT ?, ?;
    `;

    const state = `SELECT COUNT(*) total FROM borrow;`;
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

  async create(borrow) {
    const {
      book,
      name,
      status
    } = borrow;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO borrow (book, name, status) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [book, name, status]);
    // console.log(result, '222');
    return result[0];
  }

  async update(book, name, status, borrowId) {
    const statement = `UPDATE borrow SET book = ?, name = ?, status = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [book, name, status, borrowId]);
    return result;
  }

  async remove(borrowId) {
    const statement = `DELETE FROM borrow WHERE id = ?;`;
    const [result] = await connection.execute(statement, [borrowId]);
    return result;
  }
}

module.exports = new BorrowService();