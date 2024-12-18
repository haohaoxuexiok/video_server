const Router = require("koa-router")
const router = new Router()

const {getSuggest} = require("../../controller/uniapp/management_con")

router.get('/userSuggest',getSuggest)

module.exports = router