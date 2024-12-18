const connection = require("../../app/database");

const dayjs = require("dayjs");

class user_ser {
  async getUserList(limit = "10", offset = "0") {
    const statement = `SELECT * FROM user LIMIT ? OFFSET ?`;
    const result = await connection.execute(statement, [limit, offset]);
    const statement2 = `SELECT COUNT(*) total FROM user`;
    const result2 = await connection.execute(statement2);
    const total = result2[0][0].total;
    const userMessage = {
      total: total,
      userList: result[0], 
    };
    return userMessage;
  }
  async changeUserList(name, state) {
    const statement = `UPDATE user SET state = ? WHERE name = ?`;
    const result = await connection.execute(statement, [state, name]);
    return result[0];
  }
  async searchUsers(message, limit = "10", offset = "0") {
    let statement = `SELECT * FROM user Where `;
    let statement2 = `SELECT COUNT(*) FROM user Where `;
    for (let item in message) {
      if (item == "createAt[]") {
        let createAt = [];
        for (let time in message[item]) {
          createAt.push(
            dayjs(message[item][time]).format("YYYY-MM-DD HH:mm:ss")
          );
        }
        statement =
          statement + `createAt BETWEEN '${createAt[0]}' AND '${createAt[1]}'`;
        statement2 =
          statement2 + `createAt BETWEEN '${createAt[0]}' AND '${createAt[1]}'`;
      } else {
        statement = statement + `${item} LIKE '%${message[item]}%'&&`;
        statement2 = statement2 + `${item} LIKE '%${message[item]}%'&&`;
      }
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

    const userList = {
      total: result2[0][0]["COUNT(*)"],
      list: result1[0],
    };
    return userList;
  }
}

module.exports = new user_ser();
