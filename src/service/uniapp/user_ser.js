const connection = require("../../app/database");

class User_ser {
  async getVideo(detail_name, user) {
    const statement = `SELECT * FROM history_record WHERE detail_name = ? && user = ?`;
    const result = await connection.execute(statement, [detail_name, user]);
    return result[0];
  }
  async getVideoImg(name) {
    const statement = `SELECT imgUrl FROM movie_detail WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async keepHistory(video, imgUrl, time, detail_name, user) {
    const statement = `INSERT INTO history_record(video,imgUrl,time,detail_name,user)
    VALUES (?,?,?,?,?)`;
    const result = await connection.execute(statement, [
      video,
      imgUrl,
      time,
      detail_name,
      user,
    ]);
    return result[0];
  }
  async deleteHistory(detail_name, user) {
    // console.log(video, detail_name, user);
    const statement = `DELETE FROM history_record WHERE
    detail_name = ? && user = ?;`;
    const result = await connection.execute(statement, [detail_name, user]);
    return result[0];
  }
  async getHistory(user) {
   
    const statement = `SELECT video,imgUrl,time,detail_name FROM history_record
    WHERE user = ? ORDER BY id DESC;`;
    const result = await connection.execute(statement, [user]);
    return result[0];
  }
  async keepUserSuggest(suggest, user) {
    const statement = `INSERT INTO user_suggest(suggest,user)
    VALUES (?,?) `;
    const result = await connection.execute(statement, [suggest, user]);
    return result[0];
  }
  async modifyName_ser(id, name) {
    const statement = `UPDATE user SET name = ? WHERE id = ?`;
    const result = await connection.execute(statement, [name, id]);

    const statement1 = `SELECT * FROM user WHERE id = ?`;
    const result1 = await connection.execute(statement1, [id]);
    return result1[0];
  }
  async testPassword_ser(id, password) {
    const statement = `SELECT * FROM user WHERE id = ? AND password = ?`;
    const result = await connection.execute(statement, [id, password]);
    return result[0];
  }
  async modifyPassword_ser(id, password) {
    const statement = `UPDATE user SET password = ? WHERE id = ?`;
    const result = await connection.execute(statement, [password, id]);
    return result[0];
  }
  async testUser_ser(account,name) {
    const statement = `SELECT * FROM user WHERE account = ? AND name = ?`;
    const result = await connection.execute(statement, [account,name]);
    return result[0];
  }
  async createAvatar(filename, mimetype, size, userId) {
    const statement1 = `SELECT * FROM avatar WHERE user_id = ?;`
    const result1 = await connection.execute(statement1, [userId]);
    if(result1[0].length>0){
      const statement = `UPDATE avatar SET filename = ?, mimetype = ?,
      size = ? WHERE user_id = ?`
      const result = await connection.execute(statement, [filename, mimetype, size, userId]);
      return result[0];
    }else{
     const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
     const result = await connection.execute(statement, [filename, mimetype, size, userId]);
     return result[0];
    }
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
  async clearHistoryByName(name){
    const statement = `DELETE FROM history_record WHERE user = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
}
 
module.exports = new User_ser();
