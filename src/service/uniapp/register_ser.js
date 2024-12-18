const connection = require('../../app/database')
 
class userOperate_ser {
    async getUserByName(name){
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    } 
    async registerUser(name,account,password,state="启用",action="false") {
        const statement = `INSERT INTO user(name,account,password,state,action) VALUES (?,?,?,?,?)`
        const result = await connection.execute(statement, [name,account,password,state,action]);

        const statement2 = `SELECT COUNT(*) total FROM user`
        const result2 = await connection.execute(statement2);
        
        const message = {
            total: result2[0][0].total,
            message: "注册成功"
        }
        return message
    }
} 

module.exports = new userOperate_ser