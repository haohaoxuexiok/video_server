const connection = require("../database");

class Recommend_ser {
  async keepHotRecommend(id,name,imgUrl,state) {
    console.log(id,name,imgUrl,state);
    const statement = `INSERT INTO hotrecommend (id,name,imgUrl,state) VALUES (?,?, ?, ?)`;
    const [result] = await connection.execute(statement, [id,name,imgUrl,state]);
    return result;
  }
  async keepHotRecommendDetail(id,name,imgUrl,state,update_time,update_state,type,
    language,area,time,role,voice_actor,alias,main_story,num) {
      console.log(id,name,imgUrl,state,update_time,update_state,type,
      language,area,time,role,voice_actor,alias,main_story,num);
    const statement = `INSERT INTO hotrecommend_detail (id,name,imgUrl,state,update_time,update_state,type,
      language,area,time,role,voice_actor,alias,main_story,num) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const [result] = await connection.execute(statement, [id,name,imgUrl,state,update_time,update_state,type,
      language,area,time,role,voice_actor,alias,main_story,num]);
    return result;
  }
  async keepHot_relate(relate_name,relate_imgUrl,relate_state,detail_name) {
    console.log(relate_name,relate_imgUrl,relate_state,detail_name);
    const statement = `INSERT INTO hot_relate (relate_name,relate_imgUrl,relate_state,detail_name) VALUES (?, ?, ?,?)`;
    const [result] = await connection.execute(statement, [relate_name,relate_imgUrl,relate_state,detail_name]);
    return result;
  }
  async keepStoryContent(id,storyContent,detail_name) {
    console.log(id,storyContent,detail_name);
    const statement = `INSERT INTO hot_storycontent (id,storyContent,detail_name) VALUES (?,?,?)`;
    const [result] = await connection.execute(statement, [id,storyContent,detail_name]);
    return result;
  }
  async keepVideoUrl(video_num,video_url,detail_name) {
    console.log(video_num,video_url,detail_name);
    const statement = `INSERT INTO video_play (video_num,video_url,detail_name) VALUES (?,?,?)`;
    const [result] = await connection.execute(statement, [video_num,video_url,detail_name]);
    return result;
  }
}

module.exports = new Recommend_ser();
