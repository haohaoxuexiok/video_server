const { registerUser } = require("../../service/uniapp/register_ser")

const registerResult = async (ctx, next) => {
  let { name, account, password } = ctx.request.body;
  //用户不存在进行账号的注册
  const result =await registerUser(name, account, password);

  ctx.body = result;
};

module.exports = {
  registerResult,
};
