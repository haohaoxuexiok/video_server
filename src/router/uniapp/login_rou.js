const Router = require("koa-router")
const router = new Router()

const { loginDeal } = require("../../middleware/uniapp/login_mid")
const {loginAuthorize} = require("../../controller/uniapp/login_con")

router.post('/login',loginDeal,loginAuthorize)

module.exports = router