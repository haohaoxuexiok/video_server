const fs = require('fs');

const {
  keepHistory,
  getHistory,
  getVideoImg,
  keepUserSuggest,
  modifyName_ser,
  testPassword_ser, 
  modifyPassword_ser,
  testUser_ser, 
  createAvatar,
  getAvatarByUserId,
  updateAvatarUrlById,
  clearHistoryByName
} = require("../../service/uniapp/user_ser");

const { cryptoDeal } = require("../../../utils/passwordDeal");
const keepHistoryRecord = async (ctx, next) => {
  const { video, time, name, user } = ctx.request.body;
  const imgUrl = await getVideoImg(name);
  const result = await keepHistory(video, imgUrl[0].imgUrl, time, name, user);
};
const getHistoryRecord = async (ctx, next) => {
  const { user } = ctx.request.query;
  const result = await getHistory(user);

  ctx.body = result;
};

const keepSuggest = async (ctx, next) => {
  const { suggest, user } = ctx.request.body;
  // console.log(suggest,user);
  keepUserSuggest(suggest, user);
  ctx.body = "提交成功";
};
const modifyName = async (ctx, next) => {
  const { id, userName } = ctx.request.body;
  const result = await modifyName_ser(id, userName);
  ctx.body = result[0];
};
const testPassword = async (ctx, next) => {
  const result = await testPassword_ser(
    ctx.params.id,
    cryptoDeal(ctx.request.body.password)
  );
  if (result.length == 0) {
    ctx.body = "密码错误";
  } else {
    ctx.body = "密码正确";
  }
};
const modifyPassword = async (ctx, next) => {
  modifyPassword_ser(ctx.params.id, cryptoDeal(ctx.request.body.password));
  ctx.body = "密码修改成功";
};
const testUser = async (ctx, next) => {
  const { account, name } = ctx.request.body;
  const result = await testUser_ser(account, name);
  ctx.body = result[0];
};
const saveAvatarInfo = async (ctx, next) => {
  const { filename, mimetype, size } = ctx.req.file;
  const { id } = ctx.user;
  // 2.将图像信息数据保存到数据库中
  const result = await createAvatar(filename, mimetype, size, id);
  const avatarUrl = `http://localhost:8888/userAvatar/${id}`;
  await updateAvatarUrlById(avatarUrl, id);

  // 4.返回结果 
  ctx.body = avatarUrl
};
const avatarInfo = async (ctx,next) => {
   // 1.用户的头像是哪一个文件呢?
   const { id } = ctx.params; 
   const avatarInfo = await getAvatarByUserId(id);
    
   // 2.提供图像信息
   ctx.response.set('content-type', avatarInfo.mimetype);
   ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`);
}
const clearHistory = async (ctx,next) => {
    clearHistoryByName(ctx.request.params.name)
}
module.exports = {
  keepHistoryRecord,
  getHistoryRecord,
  keepSuggest,
  modifyName, 
  modifyPassword,
  testPassword,
  testUser,
  saveAvatarInfo,
  avatarInfo,
  clearHistory
};
