const Router = require("koa-router");
const router = new Router();

const { authorityList,roleList,deleteRole,editRole,addRole} = require("../../controller/system/authority_con");

router.get("/getAuthorityList",authorityList);
router.get("/getRoleList",roleList);
router.delete("/deleteRole",deleteRole);
router.post("/editRole",editRole);
router.post("/addRole",addRole);

 
module.exports = router;
       