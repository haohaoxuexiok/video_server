const connection = require("../database");

class Module_ser {
  async keepData(name, imgUrl, state) {
    console.log(name, imgUrl, state);
    const statement = `INSERT INTO cartoon (name,imgUrl,state) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      name,
      imgUrl,
      state,
    ]);
    return result;
  }
  async keepModuleDetail(
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
        11,
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

module.exports = new Module_ser();
