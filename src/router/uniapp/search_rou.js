const Router = require("koa-router");
const router = new Router();

const { authorize } = require("../../middleware/uniapp/authorize_mid");
const {
  searchResult,
  searchResults,
  hotSearchWords,
  addSearchNum,
} = require("../../controller/uniapp/search_con");
const { hotSearch } = require("../../middleware/uniapp/search_mid");

router.get("/search", searchResult);
router.get("/searchKeys", searchResults);
router.get("/getHotSearchWords", hotSearchWords);

router.post("/addSearchNum", addSearchNum);

module.exports = router;
