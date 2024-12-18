const jwt = require("jsonwebtoken");

const { getUser } = require("../../service/system/login_ser");

const {cryptoDeal} = require("../../../utils/passwordDeal");

const loginDeal = async (ctx, next) => {
  //console.log(1);
  //1.判断数据库中是否已经存在相同的用户名
  
  const { account, password } = ctx.request.body;
  
  const result = await getUser(account, cryptoDeal(password));
  
  if (result.length == 0) { 
    ctx.body = "用户名或者密码错误";
    return
  } else {  
    if (  
      account == result[0].account &&
      cryptoDeal(password) == result[0].password
    ) {
     
      ctx.user = result[0];
      await next();
    }/* else {
      ctx.body = "用户名或者密码错误";
    }*/
  }
};

module.exports = {
  loginDeal,
};
