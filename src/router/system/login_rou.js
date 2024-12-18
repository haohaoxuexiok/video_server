const Router = require("koa-router")
const router = new Router()

const { loginDeal } = require("../../middleware/system/login_mid")
const {loginAuthorize} = require("../../controller/system/login_con")

router.post('/login_backStage',loginDeal,loginAuthorize)
 
module.exports = router   