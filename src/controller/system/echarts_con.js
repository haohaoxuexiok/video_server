const {
  getCategory,
  getCategoryNum,
  addCategoryNum,
  getCategoryList,
  getHotSearchList,
  getCategoryVideoTotal,
  addCategoryVideoTotal,
  getCategoryVideoNum,
  keepUserVisitRecord_ser,
  getUserVisitRecord_ser,
  getUserVisitRecordMonth_ser,
  getUserVisitRecordWeek_ser,
  getUserTotal_ser,
  changeUserAction_ser
} = require("../../service/system/echarts_ser");

const {getTime,getWeekDay } = require("../../../utils/time");

const addCategoryRank = async (ctx, next) => {
  let type = await getCategory(ctx.request.body.name);
  let typeDeal = type[0].type
    .replace("剧场电影", "")
    .replace("日本动漫", "")
    .replace("次元影视", "")
    .replace("国产动漫", "")
    .replace("欧美动漫", "")
    .trim()
    .split(/\s+/);

  for (let i = 0; i < typeDeal.length; i++) {
    const result = await getCategoryNum(typeDeal[i]);
    let num = result[0].num;
    num = num + 1;
    addCategoryNum(typeDeal[i], num);
  }
};

const getCategoryRank = async (ctx, next) => {
  const categoryRank = await getCategoryList();
  const categoryRankDeal = categoryRank.map((item) => {
    return {
      name: item.type,
      value: item.num,
    };
  });
  ctx.body = categoryRankDeal;
}; 
const getHotSearchRank = async (ctx, next) => {
  const result = await getHotSearchList();
  // console.log(result);
  ctx.body = result;
};
 
const addCategoryVideoNum = async (ctx, next) => {
  const { name, type } = ctx.request.body;
  const typeDeal = type
    .replace("剧场电影", "")
    .replace("日本动漫", "")
    .replace("次元影视", "")
    .replace("欧美动漫", "")
    .trim()
    .split(/\s+/);
  for (let i = 0; i < typeDeal.length; i++) {
    const result = await getCategoryVideoTotal(typeDeal[i]);
    let num = result[0].videoNum + 1;
    console.log(typeDeal[i], num);
    addCategoryVideoTotal(typeDeal[i], num);
  }
};
const getCategoryVideoNumList = async (ctx, next) => {
  const result = await getCategoryVideoNum();
  ctx.body = result;  
};
const keepUserVisitRecord = async (ctx, next) => {
  const { time, user, userId } = ctx.request.body;
  keepUserVisitRecord_ser(time, user, userId);
};
const getUserVisitRecord = async (ctx, next) => {
  const list = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? "0" + i : i;
    const time = ctx.request.query.time + hour;
    const result = await getUserVisitRecord_ser(time);
    const timeTotal = {
      [`${hour}:00`]: result[0].total,
    };
    list.push(timeTotal);
  }
  ctx.body = list;
};
const getUserVisitRecordMonth = async (ctx, next) => {
  const list = [];
  for (let i = 1; i <= 12; i++) {
    const time = `${ctx.request.query.time}-${i}`;
    const result = await getUserVisitRecordMonth_ser(time);
    const timeTotal = {
      [i]: result[0].total,
    };
    list.push(timeTotal);
  }
  ctx.body = list;
};
const getUserVisitRecordWeek = async (ctx, next) => {

  const currentData = ctx.request.query.time
  const week = getWeekDay(ctx.request.query.time)
  const list = []
  if(week == '周一'){
     for(let i = 0; i <= 6; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
     }  
  }else if(week== '周二'){
    for(let i = -1; i <= 5; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }else if(week == '周三'){
    for(let i = -2; i <= 4; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }else if(week== '周四'){
    for(let i = -3; i <= 3; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }else if(week== '周五'){
    for(let i = -4; i <= 2; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }else if(week== '周六'){
    for(let i = -5; i <= 1; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }else if(week== '周日'){
    for(let i = -6; i <= 0; i++){
      const time = getTime(currentData,i);
      const result =await getUserVisitRecordWeek_ser(time)
      const weekTotal = {
        [`${getTime(currentData,i).slice(5)+getWeekDay(getTime(currentData,i))}`]: result[0].total,
      }
      list.push(weekTotal)
    }
  }
  ctx.body = list
};
const getUserTotal =async (ctx, next) => {
  const result =await getUserTotal_ser();
  ctx.body = result
}
const changeUserAction =async (ctx, next) => {
  
  const {user,action} = ctx.request.body;
  changeUserAction_ser(user,action);
} 
module.exports = {
  addCategoryRank,
  getCategoryRank,
  getHotSearchRank,
  addCategoryVideoNum,
  getCategoryVideoNumList,
  keepUserVisitRecord,
  getUserVisitRecord,
  getUserVisitRecordMonth,
  getUserVisitRecordWeek,
  getUserTotal,
  changeUserAction
};
