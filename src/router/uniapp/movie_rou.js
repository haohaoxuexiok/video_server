const Router = require("koa-router");
const router = new Router();

const {
  movieList,
  movieDetail, 
  movieUrl,
  movieDetailSingle,
} = require("../../controller/uniapp/movie_con");
const { authorize } = require("../../middleware/uniapp/authorize_mid");

router.get("/movie",  movieList);
router.get("/movie/detail",  movieDetail);
router.get("/movie/detailSingle",  movieDetailSingle);
router.get("/movie/url",  movieUrl);

module.exports = router;
