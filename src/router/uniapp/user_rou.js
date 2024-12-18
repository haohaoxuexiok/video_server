const Router = require("koa-router")
const router = new Router() 

const { authorize } = require("../../middleware/uniapp/authorize_mid")
const { keepHistoryRecord,  getHistoryRecord,
        keepSuggest,modifyName,testPassword,
        modifyPassword,testUser,saveAvatarInfo,
        avatarInfo,clearHistory } = require("../../controller/uniapp/user_con")
const { historyRecordDeal,avatarHandler } = require("../../middleware/uniapp/user_mid")
 
router.post('/keepHistory',authorize,historyRecordDeal,keepHistoryRecord)
router.get('/getHistory',authorize,getHistoryRecord)
router.post('/modifyName',authorize,modifyName)
router.post('/testPassword/:id',authorize,testPassword)
router.post('/testUser',testUser) 
router.post('/modifyPassword/:id',modifyPassword)
router.post('/keepSuggest',authorize,keepSuggest)
router.post('/uploadAvatar',authorize,avatarHandler,saveAvatarInfo)
router.get('/userAvatar/:id', avatarInfo);
router.delete('/clearHistory/:name',clearHistory)

module.exports = router        