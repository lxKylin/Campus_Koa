const connection = require('../app/database');
class UserService {
  async create(user) {
    const { name, password } = user;
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    // [username, password] 对应 (?, ?)
    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }

  async remove(userId) {
    const statement = `DELETE FROM user WHERE id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }

  async updateAvatarById(avatar_url, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatar_url, userId]);
    return result;
  }

  async getUserList(offset, size) {
    // const statement = `
    //     SELECT 
    //       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //       JSON_OBJECT('id', u.id, 'name', u.name) author,
    //       (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    //       (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
    //       (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/api/moment/images/', file.filename)) 
    //       FROM file WHERE m.id = file.moment_id) images
    //   FROM user m
    //   LEFT JOIN user u ON m.user_id = u.id
    //   LIMIT ?, ?;
    // `;

    // sql_calc_found_rows
    const statement = `
      SELECT 
        u.id id, u.name name, u.password password, u.avatar_url avatar_url, u.createAt createAt, u.updateAt updateAt
      FROM user u
      LIMIT ?, ?;
    `;
    const state = `SELECT COUNT(*) total FROM user`;
    const [result] = await connection.execute(statement, [offset, size]);
    const [count] = await connection.execute(state);
    return { result, count };
  }

  async getUserById(id) {
    const statement = `SELECT * FROM user WHERE id = ?;`;
    // const statement = `
    //   SELECT 
    //     u.id id, u.name name, u.password password, u.avatar_url avatar_url, u.createAt createTime, u.updateAt updateTime,
    //     JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author
    //   FROM user u
    //   LEFT JOIN user u ON m.user_id = u.id
    //   WHERE m.id = ?
    //   GROUP BY m.id;
    // `;
    // const statement = `
    //     SELECT 
    //       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //       JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
    //       IF(COUNT(l.id),JSON_ARRAYAGG(
    //         JSON_OBJECT('id', l.id, 'name', l.name)
    //       ), NULL) labels,
    //       (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
    //         JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
    //                     'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', u.avatar_url))
    //       ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE c.moment_id = m.id) comments,
    //       (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/api/moment/images/', filename)) 
    //               FROM file WHERE m.id = file.moment_id) images
    //   FROM moment m
    //   LEFT JOIN user u ON m.user_id = u.id
    //   LEFT JOIN moment_label ml ON m.id = ml.moment_id
    //   LEFT JOIN label l ON ml.label_id = l.id
    //   WHERE m.id = ?
    //   GROUP BY m.id;
    // `
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }

  async update(name, password, userId) {
    const statement = `UPDATE user SET name = ?, password = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [name, password, userId]);
    return result;
  }
}

module.exports = new UserService();
