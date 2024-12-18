const Router = require("koa-router");
const router = new Router();

const {
  addCategoryRank,
  getCategoryRank,
  getHotSearchRank,
  addCategoryVideoNum,
  getCategoryVideoNumList,
  keepUserVisitRecord,
  getUserVisitRecord,
  getUserVisitRecordMonth,
  getUserVisitRecordWeek,
  getUserTotal,
  changeUserAction
} = require("../../controller/system/echarts_con");
router.post("/addCategoryNum", addCategoryRank);
router.get("/getCategoryRank", getCategoryRank);
router.get("/getHotSearchRank", getHotSearchRank);
router.post("/addCategoryVideoNum", addCategoryVideoNum);
router.get("/getCategoryVideoNumList", getCategoryVideoNumList);
router.post("/keepUserVisitRecord", keepUserVisitRecord);
router.get("/getUserVisitRecord", getUserVisitRecord);
router.get("/getUserVisitRecordMonth", getUserVisitRecordMonth);
router.get("/getUserVisitRecordWeek", getUserVisitRecordWeek);
router.get("/getUserTotal", getUserTotal);
router.post("/changeUserAction", changeUserAction);

module.exports = router;
   