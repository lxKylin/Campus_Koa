const connection = require('../app/database');

class RoleService {
  async getRoleList(offset, size) {
    // const statement = `
    //     SELECT 
    //       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    //       JSON_OBJECT('id', u.id, 'name', u.name) author,
    //       (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    //       (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
    //       (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9999/api/moment/images/', file.filename)) 
    //       FROM file WHERE m.id = file.moment_id) images
    //   FROM moment m
    //   LEFT JOIN user u ON m.user_id = u.id
    //   LIMIT ?, ?;
    // `;
    const statement = `
      SELECT 
        r.id id, r.role_name roleName, r.user_name userName, r.createAt createAt, r.updateAt updateAt
      FROM role r
      LIMIT ?, ?;
    `;
    // const state = `SELECT FOUND_ROWS() as total FROM role;`;
    const state = `SELECT COUNT(*) total FROM role`;
    const [result] = await connection.execute(statement, [offset, size]);
    // console.log(await connection.execute(statement, [offset, size]), '345')
    const [count] = await connection.execute(state);
    // console.log(await connection.execute(state), '999')
    return { result, count };
    // return result;
  }

  async create(role) {
    const { roleName, userName } = role;
    // 使用sql语句将user存储到数据库中
    const statement = `INSERT INTO role (role_name, user_name) VALUES (?, ?);`;
    // [username, password] 对应 (?, ?)
    const result = await connection.execute(statement, [roleName, userName]);

    return result[0];
  }

  async update(roleName, userName, roleId) {
    const statement = `UPDATE role SET role_name = ?, user_name = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [roleName, userName, roleId]);
    return result;
  }

  async remove(roleId) {
    const statement = `DELETE FROM role WHERE id = ?;`;
    const [result] = await connection.execute(statement, [roleId]);
    return result;
  }
}

module.exports = new RoleService();
