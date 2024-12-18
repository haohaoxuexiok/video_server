const connection = require("../database");

class Search_ser {
  async getUpdateData(time) {
    const statement = `SELECT * FROM movie WHERE createTime Like ?`;
    const [result] = await connection.execute(statement, [
      `%${time}%` 
    ]);
    console.log(result);
    return result;
  }
  async getMovieName(name) {
    const statement = `SELECT * FROM movie WHERE name = ?`;
    const [result] = await connection.execute(statement, [
      name,
    ]);
    return result;
  }
  async keepData(name,imgUrl,state,createTime) {
    const statement = `INSERT INTO movie (name,imgUrl,state,createTime) VALUES (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      name,
      imgUrl,
      state,
      createTime
    ]);
   
  }
  async keepDetail(
    name,
    imgUrl,
    state,
    update_time,
    update_state,
    type,
    language,
    area,
    time,
    role,
    voice_actor,
    alias,
    main_story
  ) {
    const statement = `INSERT INTO movie_detail (name,imgUrl,state,update_time,update_state,type,
            language,area,time,role,voice_actor,alias,main_story) VALUES (?,?,?,?,
            ?,?,?,?,?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      name,
      imgUrl,
      state,
      update_time,
      update_state,
      type,
      language,
      area,
      time,
      role,
      voice_actor,
      alias,
      main_story,
    ]);
    const statement1 = `SELECT name,type FROM movie_detail 
    WHERE name = ?`
    const result1 = await connection.execute(statement1, [name])
    return result1[0];
  }
  async keepVideoUrl(video_num,video_url,detail_name) {
    console.log(video_num, detail_name);
    const statement = `INSERT INTO movie_videoplay (video_num,video_url,detail_name) VALUES (?,?,?)`;
    const [result] = await connection.execute(statement, [
      video_num,
      video_url,
      detail_name,
    ]);
   
  }
}


module.exports = new Search_ser