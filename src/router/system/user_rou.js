const Router = require("koa-router")
const router = new Router()

const { userList,userState,searchUser } = require("../../controller/system/user_con")
const {loginAuthorize} = require("../../controller/uniapp/login_con")

router.get('/userMessage',userList)

router.post('/changeUserState',userState)

router.get('/searchUserMessage',searchUser)

module.exports = router      