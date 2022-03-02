const connection = require('../app/database');

class NewsService {
  async getNewsList(offset, size) {
    const statement = `
      SELECT 
      n.id id, n.news_title newsTitle, n.img_url imgUrl, n.time time, n.content content
      FROM news n
      LIMIT ?, ?;
    `;
    
    const state = `SELECT COUNT(*) total FROM news;`;
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

  async create(news) {
    const {
      newsTitle,
      imgUrl,
      time,
      content
    } = news;
    // console.log(jian, '66');

    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO news (news_title, img_url, time, content) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [newsTitle, imgUrl, time, content]);
    // console.log(result, '222');
    return result[0];
  }

  async update(newsTitle, imgUrl, time, content, newsId) {
    const statement = `UPDATE news SET news_title = ?, img_url = ?, time = ?, content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [newsTitle, imgUrl, time, content, newsId]);
    return result;
  }

  async remove(newsId) {
    const statement = `DELETE FROM news WHERE id = ?;`;
    const [result] = await connection.execute(statement, [newsId]);
    return result;
  }
}

module.exports = new NewsService();