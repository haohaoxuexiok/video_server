const { listenerCount } = require("../../app/database");
const connection = require("../../app/database");

class Authority_ser {
  async getAuthorityByType(type) {
    const statement = `select name from authority WHERE type = ?`;
    const result = await connection.execute(statement, [type]);
    return result[0];
  }
  async getAuthorityList(name) {
    const statement = `select * from authority WHERE name = ?`;
    const result = await connection.execute(statement, [name]);

    const statement1 = `select * from authority WHERE dad = ?`;
    const result1 = await connection.execute(statement1, [name]);

    let result2 = [];
    for (let i = 0; i < result1[0].length; i++) {
      const statement2 = `select * from authority WHERE dad = ?`;
      const result = await connection.execute(statement2, [result1[0][i].name]);
      result2.push(result[0]);
    }

    let result5 = [];
    for (let i = 0; i < result1[0].length; i++) {
      result5.push({
        id: result1[0][i].id,
        name: result1[0][i].name,
        type: result1[0][i].type,
        menuUrl: result1[0][i].menuUrl,
        children: result2[i],
      }); 
    } 
    const result4 = {
      id: result[0][0].id,
      name: result[0][0].name,
      type: result[0][0].type,
      menuUrl: result[0][0].menuUrl,
      children: result5,
    };
    return result4;
  } 
  async getRoleList() {
    const statement = `select * from role`;
    const result = await connection.execute(statement);
    
    const list = []
    for (let i = 0; i < result[0].length; i++) {
      const resultDeal = result[0][i].authority.split(",");
     
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
            //  console.log(result2[j].children[k].name,result1[i].dad);
              result2[j].children[k].children.push(result3);
            }
          } 
        }
      }
      
      const message = {
        id: result[0][i].id,
        roleName: result[0][i].roleName,
        roleDesc: result[0][i].roleDesc,
        authorityList: result2,
      }
       
      list.push(message)
      }else{
        const message = {
          id: result[0][i].id,
          roleName: result[0][i].roleName,
          roleDesc: result[0][i].roleDesc,
          authorityList:[],
        }
        
        list.push(message)
      }
    }
    
    return list;  
  }
  async deleteRoleById(id) {
    const statement = `delete from role where id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0]
  }
  async editRole_ser(id,roleName,roleDesc,authority) {
    console.log(id,roleName,roleDesc,authority);
    const statement = `update role set roleName = ?,roleDesc = ?,authority = ? where id = ?`;
    const result = await connection.execute(statement, [roleName,roleDesc,authority,id]);
    return result[0]
  }
  async addRole_ser(roleName,roleDesc,authority) {
    const statement = `INSERT INTO role (roleName,roleDesc,authority) VALUES (?,?,?)`;
    const result = await connection.execute(statement, [roleName,roleDesc,authority]);
    return result[0]
  }       
} 

module.exports = new Authority_ser();
  