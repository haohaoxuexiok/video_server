const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const mainUrl = "https://www.mandao.tv/";

const { keepHotRecommend,keepHotRecommendDetail,
        keepHot_relate,keepStoryContent,
        keepVideoUrl} = require("./service/hotRecommend_ser.js")
  
let url = []
async function getData(){
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
  //console.log(imgUrl,name,state);
  //keepHotRecommend(imgUrl,name,state)
  name.forEach((item,index) =>{
 // keepHotRecommend(index+1,item,imgUrl[index],state[index])
 })
// keepHotRecommend()
  $(".index-tj ul li a").each((i, element) => {
    //https://www.mandao.tv/man/913017.html
    const hotUrl = $(element).attr("href");
    const hotDetailUrl = `https://www.mandao.tv${hotUrl}`;
    url.push(hotDetailUrl)
  });
 // getHotDetail(url)
  //getRelate_video(url)
  //getStoryContent(url)
 // getVideoUrl(url)
}
getData()
async function getHotDetail(url) {
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
  const num = []
  const storyContent = []
  for(let i = 0; i < url.length; i++){
  //  console.log(url[i]);
  const res = await axios.get(url[i])
  let $ = cheerio.load(res.data);
     //获取动漫图片
      $(".pic img ").each((i, element) => {
        imgUrl.push($(element).attr('src'))
      //  console.log($(element).attr('src'));
      })
      //获取当前的状态
     $(".info dl .name span").each((i, element) => {
        state.push($(element).text())
        //console.log($(element).text());
      })
      //最近的更新时间
      $(".info dl dd").eq(0).each((i, element) => {
        update_time.push($(element).contents().eq(0).text())
        //console.log($(element).contents().eq(0).text());
      })
      //当前的更新状态
      $(".info dl dd").eq(0).each((i, element) => {
        update_state.push($(element).contents().eq(2).text())
        //console.log($(element).contents().eq(2).text());
      })
      //获取动漫名称
      /*name.push($('.name').children()[0].prev.data)
      console.log($('.name').children()[0].prev.data);*/
      $(".info dl .name").each((i, element) => {
        name.push($(element).contents().eq(0).text())
      //  console.log($(element).contents().eq(0).text());
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
        //console.log($(element).contents().eq(1).text());
      })
      //地区
       $(".info dl dd").eq(2).each((i, element) => {
         area.push($(element).contents().eq(3).text())
      //  console.log($(element).contents().eq(3).text());
      })
      //年代
      $(".info dl dd").eq(2).each((i, element) => {
         time.push($(element).contents().eq(5).text())
      //  console.log($(element).contents().eq(5).text());
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
          //console.log(voice_actor_deal.replace('声优：',''));
      })
      //别名
      $(".info dl dd").eq(5).each((i, element) => {
          alias.push($(element).contents().last().text())
      //  console.log($(element).contents().last().text());
      })
      //剧情;
      $(".info dl .desd .des2").each((i, element) => {
          main_story.push($(element).contents().eq(1).text())
      //  console.log($(element).contents().eq(1).text());
      })
      //获取当前的集数
      $("#stab_1_71 ul").each((i, element) => {
          num.push($(element).text())
      //  console.log($(element).text());
      })
      //获取主要剧情

      name.forEach((item,index) =>{
          /*console.log(index+1,item,imgUrl[index],state[index],
          update_time[index],update_state[index],type[index],
          language[index],area[index],time[index],role[index],
          voice_actor[index],alias[index],main_story[index],num[index]);*/
       /*   keepHotRecommendDetail(index+1,item,imgUrl[index],state[index],
          update_time[index],update_state[index],type[index],
          language[index],area[index],time[index],role[index],
          voice_actor[index],alias[index],main_story[index],num[index])*/
       })
     /* console.log(name,imgUrl,state,update_time,update_state,type,
        language,area,time,role,voice_actor,alias,main_story,num);*/
    }
  //
} 

//相关推荐
async function getRelate_video(url){
  for(let i = 0; i < url.length; i++){
  const res =await axios.get(url[i])
  let $ = cheerio.load(res.data);

  const relate_imgUrl = []
  const relate_name = []
  const relate_state = []
  const detail_name = []
 // console.log(url);
  $(".index-tj ul li a .lazy").each((i, element) => {
    //获取图片的url
    relate_imgUrl.push($(element).attr('data-original'))
  //  console.log($(element).attr('data-original'));
  });
  $(".index-tj ul li a .lazy").each((i, element) => {
    //获取当前的片名
   relate_name.push($(element).attr('alt'))
  // console.log($(element).attr('alt'));
  });
  $(".index-tj ul li a .bz").each((i, element) => {
    //获取当前的状态
    relate_state.push($(element).text())
  //  console.log($(element).text());
  });
  relate_name.forEach((item,index) =>{
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      detail_name.push($(element).contents().eq(0).text());
    });
    keepHot_relate(item,relate_imgUrl[index],relate_state[index],detail_name[index])
    })
  }
}

async function getStoryContent(url){
  const storyContent = []
  const detail_name = []
  for(let i = 0; i < url.length; i++){
    const res =await axios.get(url[i])
    let $ = cheerio.load(res.data);
    $("#tabcont").each((i, element) => {
      const dealStoryContent = $(element).text()
      storyContent.push(dealStoryContent.replace('<<<观看本作视频>>>',''));
    });
    console.log(storyContent);
    $(".info dl .name").each((i, element) => {
      //获取当前的片名
      detail_name.push($(element).contents().eq(0).text());
    //  console.log(detail_name);
    });
    //console.log(detail_name);
    storyContent.forEach((item,index) =>{
    // console.log(detail_name[index]);
      keepStoryContent(index+1,item,detail_name[index])

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
    
    //console.log(storyName);
  /*  const BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
    const params1 = `OtomeGameSekai$01`
    const params2 = `ShokeiShoujonoVirginRoad01`
    const params3 = `DATEALIVE401`
    const params4 = `TatenoYuushanoNariagari201`
    const params5 = `YuushaYamemasu01`
    const params6 = `KyoukaiSenki14`
    
    const params8 = 'StriketheBlood501'
    const params9 ='MangakasantoAssistantsan01,MangakasantoAssistantsanOVA1'
    const params10 ='Another00'*/
    storyNum.forEach((item,index) => {
      let params = ""
      let BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
      const params7 = [
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://tx-ad.a.yximgs.com/bs2/ad-creative-center-temp/c3ba917344724173820d2fda5379ea5c.mp4',
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://ali-ad.a.yximgs.com/bs2/ad-creative-center-temp/f2c1ddd6b35b469bb311112350fce1a9.mp4',
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://ali-ad.a.yximgs.com/bs2/ad-creative-center-temp/1792030177174b6890835eaeeb8a00c9.mp4',
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://tx-ad.a.yximgs.com/bs2/ad-creative-center-temp/70230c102830474aa3a7b78a1e5ed447.mp4',
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://ali-ad.a.yximgs.com/bs2/ad-creative-center-temp/62dece2778a942d0a7f8efaed2b739a5.mp4',
        'https://mmcss.mandao.tv/boo/mppm.php?url=https://tx-ad.a.yximgs.com/bs2/ad-creative-center-temp/e1ebc42e896a45e0b1663097bd7482a5.mp4',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu07.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu08.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu09.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu10.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu11.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu12.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu13.m3u8',
        'https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/BaraounoSouretsu14.m3u8',
        ]
      const params9 = [
         'MangakasantoAssistantsan01',
         'MangakasantoAssistantsan02',
         'MangakasantoAssistantsan03',
         'MangakasantoAssistantsan04',
         'MangakasantoAssistantsan05',
         'MangakasantoAssistantsan06',
         'MangakasantoAssistantsan07',
         'MangakasantoAssistantsan08',
         'MangakasantoAssistantsan09',
         'MangakasantoAssistantsan10',
         'MangakasantoAssistantsan11',
         'MangakasantoAssistantsan12',
         'MangakasantoAssistantsanOVA1',
         'MangakasantoAssistantsanOVA2',
         'MangakasantoAssistantsanOVA3',
         'MangakasantoAssistantsanOVA4',
         'MangakasantoAssistantsanOVA5',
         'MangakasantoAssistantsanOVA6',
        ]
      switch (storyName) {
        case '女性向游戏世界对路人角色很不友好':
          if(index>=10){
          params = `OtomeGameSekai${index+1}`
          }
          params = `OtomeGameSekai0${index+1}` 
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '处刑少女的生存之道':
          if(index>=10){
          params = `ShokeiShoujonoVirginRoad${index+1}`
          }
          params = `ShokeiShoujonoVirginRoad0${index+1}`
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '约会大作战第四季':
          if(index>=10){
          params = `DATEALIVE4${index+1}`
          }
          params = `DATEALIVE40${index+1}`
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '盾之勇者成名录第二季':
          if(index>=10){
          params = `TatenoYuushanoNariagari2${index+1}`
          }
          params = `TatenoYuushanoNariagari20${index+1}`
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '勇者辞职不干了':
          if(index>=10){
          params = `YuushaYamemasu${index+1}`
            }
          params = `YuushaYamemasu0${index+1}`
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '境界战机第二季':
          if(index==0){
            params = 'KyoukaiSenki14'
          }else{
            params = 'KyoukaiSenki15'
          }
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '玫瑰之王的葬礼':
          BASEURL = params7[index]
        break;
        case '噬血狂袭FINAL':
          if(index>=10){
            params = `StriketheBlood5${index+1}`
              }
            params = `StriketheBlood50${index+1}`
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case '漫画家与助手们':
          params = params9[index]
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        case 'Another替身':
          if(index>=10){
          params =`Another${index}`
            }else{
          params =`Another0${index}`
            }
          BASEURL = `https://mmcss.mandao.tv/boo/m3u8.php?url=https://yun.66dm.net/SBDM/${params}.m3u8`
        break;
        default:
        break;
      }
      // console.log(BASEURL,storyName);
    // console.log(index+1,storyName);
      keepVideoUrl('j_video',item,BASEURL,storyName)
    })
  }
}