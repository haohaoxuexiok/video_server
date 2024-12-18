const connection = require("../../app/database");

const dayjs = require("dayjs");

const {cryptoDeal,cryptoDeal2} = require("../../../utils/passwordDeal");
class Staff_ser {
  async getStaffList_ser(limit = "10", offset = "0") {
    const statement = `SELECT * FROM staff LIMIT ? OFFSET ?`;
    const result = await connection.execute(statement, [limit, offset]);
    const statement2 = `SELECT COUNT(*) total FROM staff`;
    const result2 = await connection.execute(statement2);
    const total = result2[0][0].total;

    const staffMessage = {
      total: total,
      staffList: result[0],
    };
    
    return staffMessage;
  }
  async changeStaffState_ser(name, state) {
    const statement = `UPDATE staff SET state = ? WHERE name = ?`;
    const result = await connection.execute(statement, [state, name]);
    return result[0];
  }
  async editStaff_ser(message, id) {
    const password = cryptoDeal(message.password)
    const statement = `UPDATE staff SET name = ?, account = ?,
    password = ?, role = ? WHERE id = ?`;
    const result = await connection.execute(statement, [
      message.name,
      message.account,
      password,
      message.role,
      id,
    ]);
    return result[0];
  }
  async deleteStaff_ser(id) {
    const statement = `DELETE FROM staff WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  async addStaff_ser(name, account, password,role,state="启用") {
    const passwordDeal =  cryptoDeal(password)
    const statement = `INSERT INTO staff (name, account, password,state, role) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.execute(statement, [
      name,
      account,
      passwordDeal,
      state,
      role, 
    ]);
    return result[0];
  }
  async searchStaff_ser(message, limit = "10", offset = "0") {
    let statement = `SELECT * FROM staff Where `;
    let statement2 = `SELECT COUNT(*) FROM staff Where `;
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
  async getStaffAuthority_ser(role) {
   
    const statement = `SELECT * FROM role WHERE roleName = ?`;
    const result = await connection.execute(statement, [role]);
    const list = []
    
    
    const resultDeal = result[0][0].authority.split(",");
     
      if(resultDeal.length > 1){
        
      let result1 = [];
      for (let i = 0; i < resultDeal.length; i++) {
        const statement1 = `select * from
      authority WHERE id = ?`;
        const result = await connection.execute(statement1, [resultDeal[i]]);
        result1.push(result[0][0]);
      }

      let result2 = [];
      for (let i = 0; i < result1.length; i++) {
        let result3 = {
          id: "",
          name: "",
          type: "",
          dad:"",
          menuUrl: "", 
          children: [],
        };
        if (result1[i].type == 1) {
          result2.push(result3);
          result3.id = result1[i].id;
          result3.name = result1[i].name;
          result3.type = result1[i].type;
          result3.dad = result1[i].dad;
          result3.menuUrl = result1[i].menuUrl;
          result3.children = [];
        } else {
          if (result1[i].type == 2) {
            result3.id = result1[i].id;
            result3.name = result1[i].name;
            result3.type = result1[i].type;
            result3.dad = result1[i].dad;
            result3.menuUrl = result1[i].menuUrl;
            result2[result2.length - 1].children.push(result3);
          }else{
            result3.id = result1[i].id;
            result3.name = result1[i].name;
            result3.type = result1[i].type;
            result3.dad = result1[i].dad;
            result3.menuUrl = result1[i].menuUrl;
          }
        }
      
        for (let j = 0; j < result2.length; j++) {
          for (let k = 0; k < result2[j].children.length; k++) {
            if (result2[j].children[k].name == result1[i].dad) {
              result2[j].children[k].children.push(result3);
            }
          }
        }
      } 
      
      const message = {
        id: result[0][0].id,
        roleName: result[0][0].roleName,
        roleDesc: result[0][0].roleDesc,
        authorityList: result2,
      }
       
      list.push(message)
      }else{
        const message = {
          id: result[0][0].id,
          roleName: result[0][0].roleName,
          roleDesc: result[0][0].roleDesc,
          authorityList:[],
        }
        
        list.push(message)
      }
      
   
    return list;  
  
  }
}

module.exports = new Staff_ser();
