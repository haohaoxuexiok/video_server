const { getUserByName } = require("../../service/uniapp/register_ser");

const {cryptoDeal} = require("../../../utils/passwordDeal");

const registerDeal = async (ctx, next) => {
  //1.判断数据库中是否已经存在相同的用户名
  let result = [];
  let { name, account, password } = ctx.request.body;

  if (name != "") {

    result = await getUserByName(name);
   
  }
  if (name == "") {
    ctx.body = "请输入用户名";
  } else if (result.length != 0) {
    //2.用户存在抛出错误
   
    ctx.body = "用户名已存在";
  } else {
    console.log(11);
    if (password != undefined && account != undefined) {
      ctx.request.body.password = cryptoDeal(password);
      await next();
    }
  }
};

module.exports = {
  registerDeal,
};
