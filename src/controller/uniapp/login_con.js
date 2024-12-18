const jwt = require("jsonwebtoken")
const fs = require("fs")

const PRIVATE_KEY = fs.readFileSync("./src/static/keys/private.key");
const loginAuthorize = async (ctx, next) => {
  const {id,name,account,password,avatar,state,createAt,updateAt} = ctx.user
  const token = jwt.sign({id,account},PRIVATE_KEY, {
      expiresIn:60*60*60*24,
      algorithm: "RS256"
    });
      
  ctx.body = {id,name,account,password,avatar,state,createAt,updateAt,token}

};
 
module.exports = {
  loginAuthorize
};
