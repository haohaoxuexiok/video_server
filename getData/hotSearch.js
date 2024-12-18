const axios = require("axios");
const cheerio = require("cheerio");

const mainUrl = "https://www.mandao.tv/";

const {
  keepSearchData,
  keepSearchDetail,
  keepVideoUrl
} = require("./service/hotSearch_ser.js");

function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

let url = [];
async function getData(mainUrl) {
  const name = [];
  const state = [];
  const res = await axios.get(mainUrl);
  let $ = cheerio.load(res.data);
  $(".index-list-r ul li a").each((i, element) => {
    name.push($(element).attr("title"));
  });
  $(".index-list-r ul li a .qt").each((i, element) => {
    state.push($(element).text());
});


  j_name.forEach((item, index) => {
    //  keepSearchData('j_search',index+1,item,j_state[index])
  });
  c_name.forEach((item, index) => {
    // keepSearchData('c_search',index+1,item,c_state[index])
  });
  EA_name.forEach((item, index) => {
    // keepSearchData('e_a_search',index+1,item,EA_state[index])
  });
  dimension_name.forEach((item, index) => {
    //  keepSearchData('dimension_search',index+1,item,dimension_state[index])
  });

  $(".index-list-r ul li a").each((i, element) => {
    //https://www.mandao.tv/man/913017.html
    const searchUrl = $(element).attr("href");
    const searchDetailUrl = `https://www.mandao.tv${searchUrl}`;
    url.push(searchDetailUrl);
  });
  const j_url = group(url, 15)[0];
  const c_url = group(url, 15)[1];
  const EA_url = group(url, 15)[2];
  const dimension_url = group(url, 15)[3];
 // getSearchDetail(url);

  get_j_videoUrl(j_url);
  if (c_url) {
    get_c_videoUrl(c_url);
  }
  if (EA_url) {
    get_EA_videoUrl(EA_url);
  }
  if (dimension_url) {
    get_dimension_videoUrl(dimension_url);
  }
}
getData(mainUrl);

async function getSearchDetail(url) {
  const imgUrl = [];
  const name = [];
  const state = [];
  const update_time = [];
  const update_state = [];
  const type = [];
  const language = [];
  const area = [];
  const time = [];
  const role = [];
  const voice_actor = [];
  const alias = [];
  const main_story = [];
  for (let i = 0; i < url.length; i++) {
    //  console.log(url[i]);
    const res = await axios.get(url[i]);
    let $ = cheerio.load(res.data);
    //获取动漫图片
    $(".pic img ").each((i, element) => {
      imgUrl.push($(element).attr("src"));
      //  console.log($(element).attr('src'));
    });
    //获取当前的状态
    $(".info dl .name span").each((i, element) => {
      state.push($(element).text());
      //console.log($(element).text());
    });
    //最近的更新时间
    $(".info dl dd")
      .eq(0)
      .each((i, element) => {
        update_time.push($(element).contents().eq(0).text());
        //console.log($(element).contents().eq(0).text());
      });
    //当前的更新状态
    $(".info dl dd")
      .eq(0)
      .each((i, element) => {
        update_state.push($(element).contents().eq(2).text());
        //console.log($(element).contents().eq(2).text());
      });
    //获取动漫名称
    /*name.push($('.name').children()[0].prev.data)
      console.log($('.name').children()[0].prev.data);*/
    $(".info dl .name").each((i, element) => {
      name.push($(element).contents().eq(0).text());
      //  console.log($(element).contents().eq(0).text());
    });
    //类型
    $(".info dl dd")
      .eq(1)
      .each((i, element) => {
        const typeDeal = $(element).text();
        type.push(typeDeal.replace("类型：", ""));
        //console.log(typeDeal.replace('类型：',''));
      });
    //语言
    $(".info dl dd")
      .eq(2)
      .each((i, element) => {
        language.push($(element).contents().eq(1).text());
        //console.log($(element).contents().eq(1).text());
      });
    //地区
    $(".info dl dd")
      .eq(2)
      .each((i, element) => {
        area.push($(element).contents().eq(3).text());
        //  console.log($(element).contents().eq(3).text());
      });
    //年代
    $(".info dl dd")
      .eq(2)
      .each((i, element) => {
        time.push($(element).contents().eq(5).text());
        //  console.log($(element).contents().eq(5).text());
      });
    //角色
    $(".info dl dd")
      .eq(3)
      .each((i, element) => {
        role.push($(element).contents().last().text());
        //  console.log($(element).contents().last().text());
      });
    //声优
    $(".info dl dd")
      .eq(4)
      .each((i, element) => {
        const voice_actor_deal = $(element).text();
        voice_actor.push(voice_actor_deal.replace("声优：", ""));
        //console.log(voice_actor_deal.replace('声优：',''));
      });
    //别名
    $(".info dl dd")
      .eq(5)
      .each((i, element) => {
        alias.push($(element).contents().last().text());
        //  console.log($(element).contents().last().text());
      });
    //剧情;
    $(".info dl .desd .des2").each((i, element) => {
      main_story.push($(element).contents().eq(1).text());
      //  console.log($(element).contents().eq(1).text());
    });

    const j_imgUrl = group(imgUrl, 15)[0];
    const j_name = group(name, 15)[0];
    const j_state = group(state, 15)[0];
    const j_update_time = group(update_time, 15)[0];
    const j_update_state = group(update_state, 15)[0];
    const j_type = group(type, 15)[0];
    const j_language = group(language, 15)[0];
    const j_area = group(area, 15)[0];
    const j_time = group(time, 15)[0];
    const j_role = group(role, 15)[0];
    const j_voice_actor = group(voice_actor, 15)[0];
    const j_alias = group(alias, 15)[0];
    const j_main_story = group(main_story, 15)[0];
    if (group(imgUrl, 15)[0] != undefined) {
      j_name.forEach((item, index) => {
        keepSearchDetail(
          "j_search_detail",
          index + 1,
          item,
          j_imgUrl[index],
          j_state[index],
          j_update_time[index],
          j_update_state[index],
          j_type[index],
          j_language[index],
          j_area[index],
          j_time[index],
          j_role[index],
          j_voice_actor[index],
          j_alias[index],
          j_main_story[index]
        );
      });
    }
    if (group(imgUrl, 15)[1] != undefined) {
      const c_imgUrl = group(imgUrl, 15)[1];
      const c_name = group(name, 15)[1];
      const c_state = group(state, 15)[1];
      const c_update_time = group(update_time, 15)[1];
      const c_update_state = group(update_state, 15)[1];
      const c_type = group(type, 15)[1];
      const c_language = group(language, 15)[1];
      const c_area = group(area, 15)[1];
      const c_time = group(time, 15)[1];
      const c_role = group(role, 15)[1];
      const c_voice_actor = group(voice_actor, 15)[1];
      const c_alias = group(alias, 15)[1];
      const c_main_story = group(main_story, 15)[1];

      c_name.forEach((item, index) => {
        keepSearchDetail(
          "c_search_detail",
          index + 1,
          item,
          c_imgUrl[index],
          c_state[index],
          c_update_time[index],
          c_update_state[index],
          c_type[index],
          c_language[index],
          c_area[index],
          c_time[index],
          c_role[index],
          c_voice_actor[index],
          c_alias[index],
          c_main_story[index]
        );
      });
    }
    if (group(main_story, 15)[2] != undefined) {
      const EA_imgUrl = group(imgUrl, 15)[2];
      const EA_name = group(name, 15)[2];
      const EA_state = group(state, 15)[2];
      const EA_update_time = group(update_time, 15)[2];
      const EA_update_state = group(update_state, 15)[2];
      const EA_type = group(type, 15)[2];
      const EA_language = group(language, 10)[2];
      const EA_area = group(area, 15)[2];
      const EA_time = group(time, 15)[2];
      const EA_role = group(role, 15)[2];
      const EA_voice_actor = group(voice_actor, 15)[2];
      const EA_alias = group(alias, 15)[2];
      const EA_main_story = group(main_story, 15)[2];

      EA_name.forEach((item, index) => {
        let language = EA_language[index];
        if (language == undefined) {
          keepSearchDetail(
            "e_a_search_detail",
            index + 1,
            item,
            EA_imgUrl[index],
            EA_state[index],
            EA_update_time[index],
            EA_update_state[index],
            EA_type[index],
            "未知",
            EA_area[index],
            EA_time[index],
            EA_role[index],
            EA_voice_actor[index],
            EA_alias[index],
            EA_main_story[index]
          );
        } else {
          keepSearchDetail(
            "e_a_search_detail",
            index + 1,
            item,
            EA_imgUrl[index],
            EA_state[index],
            EA_update_time[index],
            EA_update_state[index],
            EA_type[index],
            EA_language[index],
            EA_area[index],
            EA_time[index],
            EA_role[index],
            EA_voice_actor[index],
            EA_alias[index],
            EA_main_story[index]
          );
        }
      });
    }
    if (group(imgUrl, 15)[3] != undefined) {
      // console.log(group(name,15)[3]);
      const dimension_imgUrl = group(imgUrl, 15)[3];
      const dimension_name = group(name, 15)[3];
      const dimension_state = group(state, 15)[3];
      const dimension_update_time = group(update_time, 15)[3];
      const dimension_update_state = group(update_state, 15)[3];
      const dimension_type = group(type, 10)[3];
      const dimension_language = group(language, 15)[3];
      const dimension_area = group(area, 15)[3];
      const dimension_time = group(time, 15)[3];
      const dimension_role = group(role, 15)[3];
      const dimension_voice_actor = group(voice_actor, 15)[3];
      const dimension_alias = group(alias, 15)[3];
      const dimension_main_story = group(main_story, 15)[3];

      dimension_name.forEach((item, index) => {
        const type = dimension_type[index];
        if (type == undefined) {
          keepSearchDetail(
            "dimension_search_detail",
            index + 1,
            item,
            dimension_imgUrl[index],
            dimension_state[index],
            dimension_update_time[index],
            dimension_update_state[index],
            "次元影视 日本动漫 科幻 战斗 ",
            dimension_language[index],
            dimension_area[index],
            dimension_time[index],
            dimension_role[index],
            dimension_voice_actor[index],
            dimension_alias[index],
            dimension_main_story[index]
          );
        } else {
          keepSearchDetail(
            "dimension_search_detail",
            index + 1,
            item,
            dimension_imgUrl[index],
            dimension_state[index],
            dimension_update_time[index],
            dimension_update_state[index],
            dimension_type[index],
            dimension_language[index],
            dimension_area[index],
            dimension_time[index],
            dimension_role[index],
            dimension_voice_actor[index],
            dimension_alias[index],
            dimension_main_story[index]
          );
        }
      });
    }
  }
}


async function get_j_videoUrl(url) {
  for (let i = 0; i < url.length; i++) {
    const res = await axios.get(url[i]);
    let $ = cheerio.load(res.data);
    let storyNum = [];
    let storyName = "";
    $("#stab_1_71 ul li a").each((i, element) => {
      storyNum.push($(element).text());
    });
    //console.log(storyNum);
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      // detail_name.push($(element).contents().eq(0).text());
      storyName = $(element).contents().eq(0).text();
    });

    storyNum.forEach((item, index) => {
    
      keepVideoUrl('j_search_videoplay',item,storyName)
    });
  }
}

async function get_c_videoUrl(url){
  for (let i = 0; i < url.length; i++) {
    const res = await axios.get(url[i]);
    let $ = cheerio.load(res.data);
    let storyNum = [];
    let storyName = "";
    $("#stab_1_71 ul li a").each((i, element) => {
      storyNum.push($(element).text());
    });
    //console.log(storyNum);
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      // detail_name.push($(element).contents().eq(0).text());
      storyName = $(element).contents().eq(0).text();
    });

    storyNum.forEach((item, index) => {
      keepVideoUrl('c_search_videoplay',item,storyName);
    });
  }
}

async function get_EA_videoUrl(url){

  for (let i = 0; i < url.length; i++) {
    const res = await axios.get(url[i]);
    let $ = cheerio.load(res.data);
    let storyNum = [];
    let storyName = "";
    $("#stab_1_71 ul li a").each((i, element) => {
      storyNum.push($(element).text());
    });
    //console.log(storyNum);
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      // detail_name.push($(element).contents().eq(0).text());
      storyName = $(element).contents().eq(0).text();
    });

    storyNum.forEach((item, index) => {
     keepVideoUrl('e_a_search_videoplay',item,storyName)
    })
  }
}

async function get_dimension_videoUrl(url){

  for (let i = 0; i < url.length; i++) {
    const res = await axios.get(url[i]);
    let $ = cheerio.load(res.data);
    let storyNum = [];
    let storyName = "";
    $("#stab_1_71 ul li a").each((i, element) => {
      storyNum.push($(element).text());
    });
    //console.log(storyNum);
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      // detail_name.push($(element).contents().eq(0).text());
      storyName = $(element).contents().eq(0).text();
    });

    storyNum.forEach((item, index) => {
     keepVideoUrl('dimension_search_videoplay',item,storyName)
    })
  }
}