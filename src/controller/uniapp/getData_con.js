const { getData } = require("../../../getMovieData/getSingle_movie");
const { getUpdateData } = require("../../../getMovieData/service/movie_ser");

const getMovieData = async (ctx, next) => {
  const { address, videoUrl, time } = ctx.request.query;

  const result = await getData(address, videoUrl.split(","), time);
  ctx.body = result;
};

const getUpdateList = async (ctx, next) => {
  //  console.log(ctx.request.query.data);
  const result = await getUpdateData(ctx.request.query.data);
  ctx.body = result;
};

module.exports = {
  getMovieData,
  getUpdateList,
};
