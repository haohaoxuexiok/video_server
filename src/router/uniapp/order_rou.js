const Router = require("koa-router")
const router = new Router()


const { getOrderList } = require("../../controller/uniapp/order_con")
const { orderDeal } = require("../../middleware/uniapp/order_mid")
const { authorize } = require("../../middleware/uniapp/authorize_mid");

router.post('/orderDeal',orderDeal)
router.get('/order',getOrderList)

module.exports = router 