const Koa = require("koa");
const cors = require("koa2-cors");
const body = require("koa-body");
const router = require("../router/uniapp");
const router_system = require("../router/system");
const app = new Koa();

const {useWebsocket} = require("./websocket")

useWebsocket()
app.use(body());
app.use(cors());
app.use(router.routes());
app.use(router_system.routes());
app.use(router.allowedMethods());
// app.use(register.routes());
// app.use(login.routes());
// app.use(movie.routes());
// app.use(search.routes());
//5555555555556666

module.exports = app;
