const connection = require("../../app/database");

class Order_ser {
  async getMovie(name) {
    const statement = `SELECT tapNum FROM movie WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async addTapNum(name, tapNum) {
    const statement = `UPDATE movie SET tapNum = ? WHERE name = ?`;
    const result = await connection.execute(statement, [tapNum, name]);
    return result[0];
  }
  async getOrder(limit = "20", offset = "0") {
    const statement = `select * from movie  WHERE tapNum IS NOT NULL AND tapNum !="" 
    order by tapNum desc LIMIT ? OFFSET ?`;
    const result = await connection.execute(statement, [limit, offset]);
    return result[0];
  }
}

module.exports = new Order_ser();
