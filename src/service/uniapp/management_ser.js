const connection = require('../../app/database')

class Management_ser {
    async getUserSuggest(){
        const statement = `SELECT user, JSON_ARRAYAGG(JSON_OBJECT('suggest',suggest))
        suggest FROM user_suggest LEFT JOIN user ON user_suggest.user=user.name  GROUP BY user;`;
        const result = await connection.execute(statement);
        return result[0];
    } 
}

module.exports = new Management_ser