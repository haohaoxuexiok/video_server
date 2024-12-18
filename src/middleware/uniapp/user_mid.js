const {
  getVideo,
  deleteHistory,
  getVideoImg,
} = require("../../service/uniapp/user_ser");

const historyRecordDeal = async (ctx, next) => {
  const { video, time, name, user } = ctx.request.body;
  const imgUrl = await getVideoImg(name);
  const result = await getVideo(name, user);
  if (result.length == 0) {
    await next();
  } else {
    //DELETE FROM `user` WHERE id = 110;
    deleteHistory(name, user);
    await next();
  }
};
const Multer = require("koa-multer");
const avatarUpload = Multer({
  dest: "./uploads/avatar",
});

const avatarHandler = avatarUpload.single("avatar");
module.exports = {
  historyRecordDeal, 
  avatarHandler,
};
 