const Router = require("koa-router");
const router = new Router();

const {
  getAppSwiper,
  editAppSwiper,
  deleteAppSwiper,
  addAppSwiper
} = require("../../controller/system/appManage_con");

router.get("/getAppSwiper", getAppSwiper);
router.post("/editAppSwiper/:id", editAppSwiper);
router.delete("/deleteAppSwiper/:id", deleteAppSwiper);
router.post("/addAppSwiper", addAppSwiper);
module.exports = router;
 