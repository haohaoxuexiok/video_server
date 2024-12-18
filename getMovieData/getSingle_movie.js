const axios = require("axios");
const cheerio = require("cheerio");

const {
  getMovieName,
  keepData,
  keepDetail,
  keepVideoUrl,
} = require("./service/movie_ser.js");

const url = "https://www.mandao.tv/man/99916.html";
const videoList = [
  "https://jianghu.live2008.com/jiexi/?url=https://wolongzywcdn.com:65/JhisqYmE/index.m3u8",
];

async function getData(url, videoList, createTime,ctx) {
 // console.log(url, videoList, createTime);
  let imgUrl = "";
  let name = [];
  let state = [];
  let update_time = [];
  let update_state = [];
  let type = [];
  let language = [];
  let area = [];
  let time = [];
  let role = [];
  let voice_actor = [];
  let alias = [];
  let main_story = [];
  const res = await axios.get(url);
  let $ = cheerio.load(res.data);
  //获取动漫图片
  $(".pic img ").each((i, element) => {
    imgUrl = $(element).attr("src");
    //console.log($(element).attr('src'));
  });  
  //获取当前的状态
  $(".info dl .name span").each((i, element) => {
    state = $(element).text();
    // console.log($(element).text());
  });
  //最近的更新时间
  $(".info dl dd")
    .eq(0)
    .each((i, element) => {
      update_time = $(element).contents().eq(0).text();
    //   console.log($(element).contents().eq(0).text());
    });
  //当前的更新状态
  $(".info dl dd")
    .eq(0)
    .each((i, element) => {
      update_state = $(element).contents().eq(2).text();
    //   console.log($(element).contents().eq(2).text());
    });
  //获取动漫名称
  /*name.push($('.name').children()[0].prev.data)
      console.log($('.name').children()[0].prev.data);*/
  $(".info dl .name").each((i, element) => {
    name = $(element).contents().eq(0).text();
    // console.log($(element).contents().eq(0).text());
  });
  //类型
  $(".info dl dd")
    .eq(1)
    .each((i, element) => {
      const typeDeal = $(element).text();
      type = typeDeal.replace("类型：", "");
     // console.log(typeDeal.replace('类型：',''));
    });
  //语言
  $(".info dl dd")
    .eq(2)
    .each((i, element) => {
      language = $(element).contents().eq(1).text();
      //  console.log($(element).contents().eq(1).text());
    });
  //地区
  $(".info dl dd")
    .eq(2)
    .each((i, element) => {
      area = $(element).contents().eq(3).text();
      // console.log($(element).contents().eq(3).text()); 
    });
  //年代
  $(".info dl dd")
    .eq(2)
    .each((i, element) => {
      time = $(element).contents().eq(5).text();
      //  console.log($(element).contents().eq(5).text());
    });
  //角色
  $(".info dl dd")
    .eq(3)
    .each((i, element) => {
      /*role_deal = $(element).contents().text();*/
      voice_actor =  $(element).contents().eq(1).text()
     // console.log($(element).contents().eq(1).text());
    });
  //声优
  $(".info dl dd")
    .eq(4)
    .each((i, element) => {
     /* const voice_actor_deal = $(element).text();*/
      role = $(element).text().replace('声优：', '')
    //  console.log($(element).text().replace('声优：', ''));
    }); 
  //别名
  $(".info dl dd")
    .eq(5)
    .each((i, element) => {
      alias = $(element).contents().last().text();
    //   console.log($(element).contents().last().text());
    });
  //剧情;
  $(".desd .des2").each((i, element) => {
    main_story = $(element).contents().eq(1).text()
  });
  const storyNum = []; 
  $("#stab_1_71 ul li a").each((i, element) => {
    storyNum.push($(element).text());
  });
  //console.log(storyNum);
  let storyName = "";
  $(".info dl .name").each((i, element) => {
    //获取当前的片名
  //  detail_name.push($(element).contents().eq(0).text());
    storyName = $(element).contents().eq(0).text();
  });
  keepData(name, imgUrl, state, createTime);
 // console.log(name, imgUrl, state, createTime);
  const result =await keepDetail(
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
  
 /* console.log(
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
  );*/

  storyNum.forEach((item, index) => {
    keepVideoUrl(item, videoList[index], storyName);
  });
  return result;
}
module.exports = {
  getData,
};
 