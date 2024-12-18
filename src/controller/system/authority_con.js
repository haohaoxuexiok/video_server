const {
  getAuthorityList,
  getAuthorityByType,
  getRoleList,
  deleteRoleById,
  editRole_ser,
  addRole_ser,
} = require("../../service/system/authority_ser.js");
  
const authorityList = async (ctx, next) => {
  // const message = ["系统总览", "系统管理", "权限管理", "视频中心", "日志信息"];

  const message = await getAuthorityByType("1");
  const authorityList = [];
  for (let i = 0; i < message.length; i++) {
    const result = await getAuthorityList(message[i].name);
    authorityList.push(result);
  }
  ctx.body = authorityList;
};

const roleList = async (ctx, next) => {
 
    const result = await getRoleList();
    ctx.body = result;
}; 
const deleteRole = async (ctx, next) => { 
  const id = ctx.request.query.id;
  const result = await deleteRoleById(id);
};
const editRole = async (ctx, next) => {
    const {id,formValue,authorityList} = ctx.request.body;
    const {roleName,roleDesc} = formValue
    const authority = authorityList.sort(function(a, b){return a - b}).toString()
    editRole_ser(id,roleName,roleDesc,authority)
} 
const addRole = async (ctx, next) => {
     const {roleName,roleDesc,authorityList} = ctx.request.body
     const authority = authorityList.sort(function(a, b){return a - b}).toString()
     addRole_ser(roleName,roleDesc,authority)
} 
module.exports = {
  authorityList,
  roleList,
  deleteRole,
  editRole,
  addRole
};
 