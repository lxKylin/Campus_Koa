const connection = require('../app/database');

class ForeshowService {
  async getForeshowList(offset, size) {
    const statement = `
      SELECT 
      f.id id, f.foreshow_title foreshowTitle, f.img_url imgUrl, f.time time, f.content content
      FROM foreshow f
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM foreshow;`;
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

  async create(foreshow) {
    const {
      foreshowTitle,
      imgUrl,
      time,
      content
    } = foreshow;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO foreshow (foreshow_title, img_url, time, content) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [foreshowTitle, imgUrl, time, content]);
    // console.log(result, '222');
    return result[0];
  }

  async update(foreshowTitle, imgUrl, time, content, foreshowId) {
    const statement = `UPDATE foreshow SET foreshow_title = ?, img_url = ?, time = ?, content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [foreshowTitle, imgUrl, time, content, foreshowId]);
    return result;
  }

  async remove(foreshowId) {
    const statement = `DELETE FROM foreshow WHERE id = ?;`;
    const [result] = await connection.execute(statement, [foreshowId]);
    return result;
  }
}

module.exports = new ForeshowService();