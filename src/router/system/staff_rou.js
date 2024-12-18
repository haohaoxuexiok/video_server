const Router = require("koa-router");
const router = new Router();

const {
  getStaffList,
  changeStaffState,
  editStaff, 
  deleteStaff,
  addStaff,  
  searchStaff, 
  getStaffAuthority
} = require("../../controller/system/staff_con");

router.get("/getStaffList", getStaffList);
router.post("/changeStaffState", changeStaffState);
router.post("/editStaff/:id", editStaff);
router.delete("/deleteStaff/:id", deleteStaff);
router.post("/addStaff", addStaff);
router.get("/searchStaff", searchStaff);
router.get("/getStaffAuthority",getStaffAuthority);

module.exports = router;
