const connection = require("../../app/database");

class videoCenter_ser {
  async getVideoList(limit = "10", offset = "0") {
    const statement = `SELECT * FROM movie LIMIT ? OFFSET ?`;
    const result = await connection.execute(statement, [limit, offset]);
    const statement2 = `SELECT COUNT(*) total FROM movie`;
    const result2 = await connection.execute(statement2);
    const total = result2[0][0].total;
    const userMessage = {
      total: total,
      videoList: result[0],
    };
    return userMessage;
  }
  async searchVideos(message, limit = "10", offset = "0") {
    let statement = `SELECT * FROM movie Where `;
    let statement2 = `SELECT COUNT(*) FROM movie Where `;
    for (let item in message) {
      statement = statement + `${item} LIKE '%${message[item]}%'&&`;
      statement2 = statement2 + `${item} LIKE '%${message[item]}%'&&`;
    }

    if (statement.slice(statement.length - 2) == "&&") {
      statement2 = statement2.slice(0, statement2.length - 2);
      statement = statement.slice(0, statement.length - 2) + "LIMIT ? OFFSET ?";
    } else {
      statement2 = statement2;
      statement = statement + "LIMIT ? OFFSET ?";
    }
    const result2 = await connection.execute(statement2);
    const result1 = await connection.execute(statement, [limit, offset]);

    const videoList = {
      total: result2[0][0]["COUNT(*)"],
      list: result1[0],
    };
    return videoList;
  }
  async deleteVideoById(id) {
   
    const statement = `DELETE FROM movie WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  async editVideo(message, id) {
    console.log(message);
    const statement = `UPDATE movie SET name = ?, imgUrl = ?,
    state = ?, createTime = ?, tapNum = ? ,searchNum = ? WHERE id = ?`;
    const result = await connection.execute(statement, [
      message.name,
      message.imgUrl,
      message.state,  
      message.createTime,  
      message.tapNum,
      message.searchNum,
      id,
    ]);
    return result[0];
  } 
}

module.exports = new videoCenter_ser();
