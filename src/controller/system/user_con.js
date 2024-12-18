const {
  getUserList,
  changeUserList,
  searchUsers
} = require("../../service/system/user_ser");

const userList = async (ctx, next) => {
  const { limit, offset } = ctx.request.query;
  const result = await getUserList(limit, offset);

  ctx.body = result;
};

const userState = async (ctx, next) => {
  //console.log(ctx.request.body);
  const { name, state } = ctx.request.body;
  changeUserList(name, state);
}; 

const searchUser = async (ctx, next) => {
  
  let isNotEmpty = {} 
  for (let item in ctx.request.query) {
    if (ctx.request.query[item] != "" && ctx.request.query[item] != undefined) {
      isNotEmpty[item] = ctx.request.query[item];
    }
  }
  if(Object.keys(isNotEmpty).length !== 0){
        const result =await searchUsers(isNotEmpty)
       // console.log(result);
        ctx.body = result
  }
};
module.exports = {
  userList,
  userState,
  searchUser,
};
