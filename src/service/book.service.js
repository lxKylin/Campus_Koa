const connection = require('../app/database');

class BookService {
  async getBookList(offset, size) {
    const statement = `
      SELECT 
      bb.id id, bb.book book, bb.classify classify, bb.number number, bb.createAt createAt, bb.updateAt updateAt
      FROM book_borrow bb
      LIMIT ?, ?;
    `;

    const state = `SELECT COUNT(*) total FROM book_borrow;`;
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

  async create(book_borrow) {
    const {
      book,
      classify,
      number
    } = book_borrow;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO book_borrow (book, classify, number) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [book, classify, number]);
    // console.log(result, '222');
    return result[0];
  }

  async update(book, classify, number, bookId) {
    const statement = `UPDATE book_borrow SET book = ?, classify = ?, number = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [book, classify, number, bookId]);
    return result;
  }

  async remove(bookId) {
    const statement = `DELETE FROM book_borrow WHERE id = ?;`;
    const [result] = await connection.execute(statement, [bookId]);
    return result;
  }
}

module.exports = new BookService();