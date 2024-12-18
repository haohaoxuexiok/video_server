const {
  HotSearchNum,
  KeepSearchNum,
} = require("../../service/uniapp/search_ser");

const hotSearch = async (ctx, next) => {
  const isHas = await HotSearchNum(ctx.request.query.name);
  if (isHas.length) {
    const num = isHas[0].searchNum;
    KeepSearchNum(num + 1, ctx.request.query.name);
    console.log(111);
    await next();
  } else {
    await next();
  }
};

module.exports = {
  hotSearch,
};
 