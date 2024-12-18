const connection = require('../../app/database')

class Login_ser {
    async getUser(account,password){
        
        const statement = `SELECT * FROM user WHERE account = ? AND password = ?`;
        const result = await connection.execute(statement, [account,password]);
        return result[0];
    } 
}   

module.exports = new Login_ser 