const fs = require("fs");
const jwt = require("jsonwebtoken");

const PUBLIC_KEY = fs.readFileSync("./src/static/keys/public.key");

const authorize = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    if (token) {
      try {
        const result = jwt.verify(token, PUBLIC_KEY, {
          algorithms: ["RS256"],
        });
        ctx.user = result;
        ctx.body = "权限认证成功"
        await next();
      } catch (err) {
        ctx.body = "权限认证失败";
      }
    }
  }
};

module.exports = {
  authorize,
};
