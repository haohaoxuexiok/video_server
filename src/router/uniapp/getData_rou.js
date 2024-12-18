const Router = require("koa-router");
const router = new Router();

const { getMovieData,getUpdateList } = require("../../controller/uniapp/getData_con");

router.get("/getData", getMovieData);

router.get("/getUpdateList",getUpdateList);

module.exports = router;
 