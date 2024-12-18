const Router = require("koa-router");
const router = new Router();

const {
  videoList,
  searchVideo,
  deleteVideo,
  editVideoMessage,
  uploadVideoData
} = require("../../controller/system/videoCenter_con");
const { loginAuthorize } = require("../../controller/uniapp/login_con");

router.get("/videoMessage", videoList);
router.get("/searchVideoMessage", searchVideo);
router.delete("/deleteVideo", deleteVideo);
router.post("/editVideo/:id", editVideoMessage);
router.post("/uploadVideo", uploadVideoData);

module.exports = router;
