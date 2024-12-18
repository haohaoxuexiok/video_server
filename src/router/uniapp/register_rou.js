const Router = require("koa-router")
const router = new Router()

const { registerDeal } = require("../../middleware/uniapp/register_mid")
const { registerResult } = require("../../controller/uniapp/register_con")

router.post('/register',registerDeal,registerResult)

module.exports = router