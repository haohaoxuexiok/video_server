const { getMovie,addTapNum } = require("../../service/uniapp/order.ser");

const orderDeal = async (ctx, next) => {
    const result = await getMovie(ctx.request.body.name);
    const num = result[0].tapNum+1
    //把电影的点击次数加入数据库
    addTapNum(ctx.request.body.name,num)

    await next()
};

module.exports = {
    orderDeal
}