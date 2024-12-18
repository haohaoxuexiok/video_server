const {
  getStaffList_ser,
  changeStaffState_ser,
  editStaff_ser,
  deleteStaff_ser,
  addStaff_ser,
  searchStaff_ser,
  getStaffAuthority_ser
} = require("../../service/system/staff_ser");

const getStaffList = async (ctx, next) => {
  const { limit, offset } = ctx.request.query;
  const result = await getStaffList_ser(limit, offset);
  ctx.body = result;
};
const changeStaffState = async (ctx, next) => {
  //console.log(ctx.request.body);
  const { name, state } = ctx.request.body;
  changeStaffState_ser(name, state);
};
const editStaff = async (ctx, next) => {
   // console.log(ctx.request.body);
    editStaff_ser(ctx.request.body,ctx.request.params.id)
} 
const deleteStaff = async (ctx, next) => {
    deleteStaff_ser(ctx.request.params.id)
}
const addStaff = async (ctx, next) => {
    const { name, account, password, role } = ctx.request.body;
    addStaff_ser(name, account, password, role);
} 
const searchStaff = async (ctx, next) => {
  let isNotEmpty = {} 
  for (let item in ctx.request.query) {
    if (ctx.request.query[item] != "" && ctx.request.query[item] != undefined) {
      isNotEmpty[item] = ctx.request.query[item];
    }
  }
  if(Object.keys(isNotEmpty).length !== 0){
        const result =await searchStaff_ser(isNotEmpty)
      //  console.log(result);
        ctx.body = result
  }
}
const getStaffAuthority = async (ctx, next) => {
  const result =await getStaffAuthority_ser(ctx.request.query.role)
  ctx.body = result[0]
}
module.exports = { 
  getStaffList,
  changeStaffState,
  editStaff,
  deleteStaff,
  addStaff,
  searchStaff,
  getStaffAuthority
};
 