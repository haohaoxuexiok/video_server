const {
  getSearchData,
  getSearchDatas,
  getSearchWords,
  getSearchNum,
  KeepSearchNum
} = require("../../service/uniapp/search_ser");

const searchResult = async (ctx, next) => {
  const result = await getSearchData(ctx.request.query.name);
  console.log(result,4444);
  ctx.body = result[0].a;
};
const searchResults = async (ctx, next) => {
  if (ctx.request.query.name == "") {
    return;
  } else {
    const result = await getSearchDatas(ctx.request.query.name);
    console.log(result,555);
    ctx.body = result;
  }
};
const hotSearchWords = async (ctx, next) => {
  const result = await getSearchWords();
  console.log(result,666);
  ctx.body = result;
}; 

const addSearchNum = async (ctx, next) => {
  const result = await getSearchNum(ctx.request.body.name);
  const num = result[0].searchNum;
  KeepSearchNum(num + 1, ctx.request.body.name);
};
module.exports = {
  searchResult,
  searchResults,
  hotSearchWords,
  addSearchNum
};
