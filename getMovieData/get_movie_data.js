const axios = require("axios");
const cheerio = require("cheerio");

const { getMovieName,keepData,keepDetail,keepVideoUrl } = require("./service/movie_ser.js")

const mainUrl =
 // "https://www.mandao.tv/search.php?page=4&searchtype=5&order=time&tid=4&area=&year=&letter=&yuyan=&state=&money=&ver=&jq=";
 "https://www.mandao.tv/search.php?searchtype=5&order=time&tid=4&year=&letter=&yuyan=&state=&money=&ver=&jq=&area=%E5%A4%A7%E9%99%86"
let url = [];
async function getData(mainUrl) {
  const res =await axios.get(mainUrl)
  let $ = cheerio.load(res.data);
  const imgUrl = []
  const name = []
  const state = []
  $(".index-tj ul li a .lazy").each((i, element) => {
    //获取图片的url
    //imgUrl.push($(element).attr('data-original'))
    imgUrl.push($(element).attr('data-original'))
    // console.log(imgUrl);
  });
  $(".index-tj ul li a .lazy").each((i, element) => {
    //获取当前的片名
   // name.push($(element).attr('alt'))
   name.push($(element).attr('alt'))
   //console.log($(element).attr('alt'));
  });
  $(".index-tj ul li a .bz").each((i, element) => {
    //获取当前的状态
    //state.push($(element).text())
    //console.log($(element).text());
    state.push($(element).text())
  });
  for(let i =0;i<name.length;i++){
    const result =await getMovieName(name)
    if(result.length == 0){
      keepData(name[i],imgUrl[i],state[i])
     }
    }
  $(".index-tj ul li a").each((i, element) => {
    //https://www.mandao.tv/man/913017.html
    const movieUrl = $(element).attr("href");
    const detailUrl = `https://www.mandao.tv${movieUrl}`;
    url.push(detailUrl)
  });
  //getDetail(url)
 // getVideoUrl(url)
}
getData(mainUrl);

async function getDetail(url) {
  const imgUrl = []
  const name = []
  const state = []
  const update_time = []
  const update_state = []
  const type = []
  const language = []
  const area = []
  const time = []
  const role = []
  const voice_actor = []
  const alias = []
  const main_story = []
  for(let i = 0; i < url.length; i++){
  //  console.log(url[i]);
  const res = await axios.get(url[i])
  let $ = cheerio.load(res.data);
     //获取动漫图片
      $(".pic img ").each((i, element) => {
        imgUrl.push($(element).attr('src'))
       // console.log($(element).attr('src'));
      })
      //获取当前的状态
     $(".info dl .name span").each((i, element) => {
        state.push($(element).text())
       // console.log($(element).text());
      })
      //最近的更新时间
      $(".info dl dd").eq(0).each((i, element) => {
        update_time.push($(element).contents().eq(0).text())
       // console.log($(element).contents().eq(0).text());
      })
      //当前的更新状态
      $(".info dl dd").eq(0).each((i, element) => {
        update_state.push($(element).contents().eq(2).text())
       // console.log($(element).contents().eq(2).text());
      })
      //获取动漫名称
      /*name.push($('.name').children()[0].prev.data)
      console.log($('.name').children()[0].prev.data);*/
      $(".info dl .name").each((i, element) => {
        name.push($(element).contents().eq(0).text())
       // console.log($(element).contents().eq(0).text());
      })
      //类型
      $(".info dl dd").eq(1).each((i, element) => {
      const typeDeal = $(element).text()
      type.push(typeDeal.replace('类型：',''))
      //console.log(typeDeal.replace('类型：',''));
      })
      //语言
      $(".info dl dd").eq(2).each((i, element) => {
        language.push($(element).contents().eq(1).text())
      //  console.log($(element).contents().eq(1).text());
      })
      //地区
       $(".info dl dd").eq(2).each((i, element) => {
         area.push($(element).contents().eq(3).text())
       // console.log($(element).contents().eq(3).text());
      })
      //年代
      $(".info dl dd").eq(2).each((i, element) => {
         time.push($(element).contents().eq(5).text())
        console.log($(element).contents().eq(5).text());
      })
      //角色
     $(".info dl dd").eq(3).each((i, element) => {
          role.push($(element).contents().last().text())
      //  console.log($(element).contents().last().text());
      })
      //声优
      $(".info dl dd").eq(4).each((i, element) => {
          const voice_actor_deal = $(element).text()
          voice_actor.push(voice_actor_deal.replace('声优：',''))
        //  console.log(voice_actor_deal.replace('声优：',''));
      })
      //别名
      $(".info dl dd").eq(5).each((i, element) => {
          alias.push($(element).contents().last().text())
       // console.log($(element).contents().last().text());
      })
      //剧情;
      $(".info dl .desd .des2").each((i, element) => {
        main_story.push($(element).contents().eq(1).text())
       // console.log($(element).contents().eq(1).text());
      })

     
    }
    if(name.length == 30){
      name.forEach((item,index) =>{
        keepDetail(item,imgUrl[index],state[index],
        update_time[index],update_state[index],type[index],
        language[index],area[index],time[index],role[index],
        voice_actor[index],alias[index],main_story[index])
     })
    }
   
}


async function getVideoUrl(){
  const storyNum = []
  const detail_name =[]
  for(let i = 0; i < url.length; i++){
    const res =await axios.get(url[i])
    let $ = cheerio.load(res.data);
  
    const storyNum = []
    $("#stab_1_71 ul li a").each((i, element) => {
      storyNum.push($(element).text())
    })
    //console.log(storyNum);
    let storyName = ""
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
     // detail_name.push($(element).contents().eq(0).text());
      storyName = $(element).contents().eq(0).text();
    });
    storyNum.forEach((item,index) => {
    keepVideoUrl(index+1,item,storyName)
    })
  }
}