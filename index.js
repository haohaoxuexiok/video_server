const app = require("./src/app/index.js");

require("./src/app/database.js");

//,'192.168.0.194'
app.listen(8888, () => {
  console.log("服务器启动成功"); 
});
       