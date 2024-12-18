const {
  getVideoList,
  searchVideos,
  deleteVideoById,
  editVideo
} = require("../../service/system/videoCenter_ser");

const { getData } = require("../../../getMovieData/getSingle_movie");

const videoList = async (ctx, next) => {
  const { limit, offset } = ctx.request.query;
  const result = await getVideoList(limit, offset);

  ctx.body = result; 
};

const searchVideo = async (ctx, next) => {
  let isNotEmpty = {};
  for (let item in ctx.request.query) {
    if (ctx.request.query[item] != "" && ctx.request.query[item] != undefined) {
      isNotEmpty[item] = ctx.request.query[item];
    }
  }
  if (Object.keys(isNotEmpty).length !== 0) {
    const result = await searchVideos(isNotEmpty);
    ctx.body = result;
  }
};

const deleteVideo = async (ctx, next) => {
   const id = ctx.request.query.id
   deleteVideoById(id)
};
const editVideoMessage = async (ctx, next) => {
  // console.log(ctx.request.body,ctx.request.params.id);
   editVideo(ctx.request.body,ctx.request.params.id)
};

const uploadVideoData = async (ctx, next) => {
  const {address,videoUrl,time} = ctx.request.body
 // console.log(address,videoUrl,time);
  const result =await getData(address, videoUrl, time);
  ctx.body = result
}; 
module.exports = {
  videoList,
  searchVideo,
  deleteVideo,
  editVideoMessage,
  uploadVideoData
};
