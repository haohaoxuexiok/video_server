const {
  getAppSwiper_ser,
  editAppSwiper_ser,
  deleteAppSwiper_ser,
  addAppSwiper_ser
} = require("../../service/system/appManage_ser");

const getAppSwiper = async (ctx, next) => { 
  //  console.log(1010);
  const result = await getAppSwiper_ser();
  ctx.body = result;
};  
const editAppSwiper = async (ctx, next) => {
  editAppSwiper_ser(ctx.request.body.swiperImg, ctx.request.params.id);
};
const deleteAppSwiper = async (ctx, next) => {
   // console.log();
   deleteAppSwiper_ser(ctx.request.params.id)
}
const addAppSwiper = async (ctx, next) => {
  
  addAppSwiper_ser(ctx.request.body.swiperImg);
} 
module.exports = {
  getAppSwiper,
  editAppSwiper,
  deleteAppSwiper,
  addAppSwiper
};
