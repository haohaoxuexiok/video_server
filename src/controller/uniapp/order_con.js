const {getOrder} = require("../../service/uniapp/order.ser");

/*const orderResult = async (ctx, next) => {
  //console.log(ctx.request.query.name);
  const result = await getMovie(ctx.request.query.name);
  const num = result[0].tapNum+1
  //把电影的点击次数加入数据库
  addTapNum(ctx.request.query.name,num)
};*/

const getOrderList = async (ctx, next) => {
   const result =await getOrder()
   ctx.body = result
};

module.exports = {
  //  orderResult,
    getOrderList
};
 