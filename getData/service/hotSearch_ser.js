const connection = require("../database");

class Search_ser {
  async keepSearchData(tableName, id, name, state) {
    console.log(id, name,state);
    const statement = `INSERT INTO ${tableName} (id,name,state) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      id,
      name,
      state,
    ]);
    return result;
  }
  async keepSearchDetail(
    tableName,
    id,
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
    console.log(
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
    );

    const statement = `INSERT INTO ${tableName} (id,name,imgUrl,state,update_time,update_state,type,
            language,area,time,role,voice_actor,alias,main_story) VALUES (?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      id,
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
    return result;
  }
  async keepVideoUrl(tableName,video_num,detail_name) {
    console.log(video_num, detail_name);
    const statement = `INSERT INTO ${tableName} (video_num,detail_name) VALUES (?,?)`;
    const [result] = await connection.execute(statement, [
      video_num,
      detail_name,
    ]);
    return result;
  }
}


module.exports = new Search_ser