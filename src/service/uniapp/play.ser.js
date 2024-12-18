const connection = require('../../app/database')

class Play_ser {
    async getRelate(type1,type2){
        const statement = `SELECT name,imgUrl,state FROM movie_detail WHERE type LIKE ? || type LIKE ? LIMIT 6`;
        const result = await connection.execute(statement, [
            `%${type1}%`,
            `%${type2}%`,
        ]);
        return result[0];
    } 
}
 
module.exports = new Play_ser