const {getRelate} = require("../../service/uniapp/play.ser");

const getMovieRelate = async (ctx, next) => {
    const {type1,type2} = ctx.request.query;
    const result =await getRelate(type1,type2)
    ctx.body = result
};

module.exports = {
    getMovieRelate
};
  