const {
  getMovieData,
  getMovieDetail,
  getMovieUrl,
  getMovieDetailSingle,
} = require("../../service/uniapp/movie_ser");

/*const movieList = async (ctx, next) => {
  if (
    ctx.request.query.limit == undefined &&
    ctx.request.query.offset == undefined
  ) {
    const result = await getMovieData();
    ctx.body = result;
    await next();
  } else {
    const { limit, offset } = ctx.request.query;
    const result = await getMovieData(limit, offset);
    ctx.body = result;
    await next();
  }
};*/
const movieDetail = async (ctx, next) => {
  if (
    ctx.request.query.limit == undefined &&
    ctx.request.query.offset == undefined
  ) {
    const result = await getMovieDetail();
    ctx.body = result;
    await next();
  } else {
    const { limit, offset } = ctx.request.query;
    const result = await getMovieDetail(limit, offset);
    ctx.body = result;
    await next();
  }
};
const movieDetailSingle = async (ctx, next) => {
  // console.log(ctx.request.query);

  const result = await getMovieDetailSingle(ctx.request.query.name);
  ctx.body = result;
};
const movieUrl = async (ctx, next) => {
  const result = await getMovieUrl(ctx.request.query.name);
  console.log(result[0].constant);
  ctx.body = result[0].constant;
};
const movieList = async (ctx, next) => {
  // console.log(ctx.request.query);
  const { story, area, language, limit, offset } = ctx.request.query;
  // console.log(story,area,language);
  if (
    ctx.request.query.story == "" &&
    ctx.request.query.area == "" &&
    ctx.request.query.language == ""
  ) {
    const result = await getMovieData({ limit, offset });
    ctx.body = result;
  } else {
    const noEmpty = {};
    for (let item in ctx.request.query) {
      if (ctx.request.query[item] !== "") {
        if (item == "story") {
          noEmpty['type'] = ctx.request.query[item];
        } else {
          noEmpty[item] = ctx.request.query[item];
        }
      } 
    }
    const result = await getMovieData(noEmpty);
     console.log(result);
    ctx.body = result;
  }
  /*if (
    ctx.request.query.story == undefined &&
    ctx.request.query.area == undefined &&
    ctx.request.query.language == undefined
  ) {
    if (
      ctx.request.query.limit == undefined &&
      ctx.request.query.offset == undefined
    ) {
      const result = await getMovieData();
      ctx.body = result;
      await next();
    } else {
      const { limit, offset } = ctx.request.query;
      const result = await getMovieData("", "", "", limit, offset);
      // console.log(result);
      ctx.body = result;
      await next();
    }
  } else {
    if (
      ctx.request.query.limit == undefined &&
      ctx.request.query.offset == undefined
    ) {
      const { story, area, language } = ctx.request.query;
      const result = await getMovieData(story, area, language);
      ctx.body = result;
      await next();
    } else {
      const { story, area, language, limit, offset } = ctx.request.query;
      const result = await getMovieData(story, area, language, limit, offset);
      ctx.body = result;
      await next();
    }
  }*/
};

module.exports = {
  movieList,
  movieDetail,
  movieUrl,
  movieDetailSingle,
};
