const Router = require("koa-router")
const router = new Router()

const { authorize } = require("../../middleware/uniapp/authorize_mid");
const {getMovieRelate} = require("../../controller/uniapp/play_con")
router.get('/play/movieRelate',getMovieRelate)

module.exports = router 