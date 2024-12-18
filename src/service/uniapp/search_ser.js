const connection = require("../../app/database");

class Search_ser {
  async getSearchData(name) {
    const statement = `SELECT JSON_ARRAYAGG(JSON_OBJECT
    ('name',name,'state',state,'imgUrl',imgUrl)) a FROM movie WHERE name LIKE ?`;
    const result = await connection.execute(statement, [`${name}%`]);
    return result[0];
  }
  async getSearchDatas(name) {
    const statement = `SELECT name FROM movie WHERE name LIKE ?`;
    const result = await connection.execute(statement, [`${name}%`]);
    return result[0];
  }
  async getMovieByName(name) {
    const statement = `SELECT name FROM movie WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async getSearchNum(name) {
    const statement = `SELECT searchNum FROM movie WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async KeepSearchNum(num, name) {
    console.log(num, name);
    const statement = `UPDATE movie SET searchNum = ? WHERE name = ?`;
    const result = await connection.execute(statement, [num, name]);
    return result[0];
  }
  async getSearchWords() {
    const statement = `SELECT name FROM movie WHERE searchNum IS NOT NULL
    order by searchNum desc `;
    const result = await connection.execute(statement);
    return result[0]; 
  }
  async keepSearchRecord(searchRecord, user) {
    const statement = `INSERT INTO search_record(searchRecord,user) VALUES (?,?)`;
    const result = await connection.execute(statement, [searchRecord, user]);
    return result[0];
  }
}

module.exports = new Search_ser();
