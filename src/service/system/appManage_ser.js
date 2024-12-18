const connection = require("../../app/database");

class AppManage_ser {
  async getAppSwiper_ser() {
    const statement = "SELECT * FROM swiper";
    const result = await connection.execute(statement);
    return result[0];  
  }    
  async editAppSwiper_ser(swiper, id) { 
    //console.log(swiper,id);
    const statement = `UPDATE swiper SET swiperImg = ? WHERE id = ?`;
    const result = await connection.execute(statement, [swiper, id]);
    return result;      
  }  
  async deleteAppSwiper_ser(id) {
    const statement = `DELETE FROM swiper WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result;
  }
  async addAppSwiper_ser(swiper) {
    const statement = `INSERT INTO swiper (swiperImg) VALUES (?)`;
    const result = await connection.execute(statement, [swiper]);
    return result;
  }
}

module.exports = new AppManage_ser();
