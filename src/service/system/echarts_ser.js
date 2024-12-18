const connection = require("../../app/database");

class EchartsData {
  async getOrder() {
    const statement = `select * from movie  WHERE tapNum IS NOT NULL AND tapNum !="" 
    order by tapNum desc `; 
    const result = await connection.execute(statement);
    return result[0];
  } 
  async getCategory(name) { 
    const statement = `select type from movie_detail WHERE name = ?`;
    const result = await connection.execute(statement,[name]);
    return result[0];
  }
  async getCategoryNum(type) { 
    const statement = `select num from category WHERE type = ?`;
    const result = await connection.execute(statement,[type]);
    return result[0];
  }
  async addCategoryNum(type,num) { 
    const statement = `UPDATE category SET num = ? WHERE type = ?`;
    const result = await connection.execute(statement,[num,type]);
    return result[0];
  } 
  async getCategoryList() { 
    const statement = `select type,num from category WHERE
    num IS NOT NULL order by num desc`;
    const result = await connection.execute(statement);
    return result[0];
  } 
  async getHotSearchList() { 
    const statement = `select name,searchNum from movie WHERE
    searchNum IS NOT NULL order by searchNum desc LIMIT 10 OFFSET 0`;
    const result = await connection.execute(statement);
    return result[0];
  } 
  async getCategoryTotal() { 
    const statement = `select type from movie_detail`;
    const result = await connection.execute(statement);
    return result[0];
  }
  async getCategoryVideoTotal(type) { 
    const statement = `select videoNum from category WHERE type = ?`;
    const result = await connection.execute(statement,[type]);
    return result[0];
  }
  async addCategoryVideoTotal(type,videoNum){ 
    const statement = `UPDATE category SET videoNum = ? WHERE type = ?`;
    const result = await connection.execute(statement,[videoNum,type]);
    return result[0];
  }
  async getCategoryVideoNum(){ 
    const statement = `select type,videoNum from category`;
    const result = await connection.execute(statement);
    return result[0];
  }
  async keepUserVisitRecord_ser(time,user,userId){ 
    const statement = `INSERT INTO visit_record
    (visitTime,user,userId) VALUES (?,?,?)`;
    const result = await connection.execute(statement,[time,user,userId]);
    return result[0];
  }
  async getUserVisitRecord_ser(time){ 
    const statement = `select COUNT(*) total from visit_record WHERE visitTime LIKE ? `;
    const result = await connection.execute(statement,[
      `%${time}%`,
    ]);
    return result[0];
  }
  async getUserVisitRecordMonth_ser(time){ 
    const statement = `select COUNT(*) total from visit_record WHERE visitTime LIKE ? `;
    const result = await connection.execute(statement,[
      `%${time}%`,
    ]);
    console.log(result[0]);
    return result[0];
  }
  async getUserVisitRecordWeek_ser(time){ 
    const statement = `select COUNT(*) total from visit_record WHERE visitTime LIKE ? `;
    const result = await connection.execute(statement,[
      `%${time}%`,
    ]);
    return result[0];
  }
  async getUserTotal_ser(){ 
    const statement = `select COUNT(*) total from user`;
    const result = await connection.execute(statement)
    return result[0][0].total;
  }
  async changeUserAction_ser(user,action){ 
    const statement = `UPDATE user SET action = ? WHERE name = ?`;
    const result = await connection.execute(statement,[action,user])
    return result  
  }           
} 
 
module.exports = new EchartsData();
 