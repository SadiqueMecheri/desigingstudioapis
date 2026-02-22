const router = require("express").Router();
const {
  updatebatchsttaus,editbatch,
  login,deleteclass,addbatch,
  addadmission,getallbatches,
  addclass,
  editclass,getalladmissions,
  updateadmissionstatus,
  getallclassesadmin,
  getavenue,addcourse,
  updatecoursesttaus,deletecourse,
  editcourse,updateclasssttaus,
  register, getmycourse,getunits,onwerlogin,getallcourseadmin,editadmission,loginchecknew,loginidd,cleardeviceid,getAllAdmissionsPaginated,getAllAdmissionsSearch,
} = require("./user.controller");


router.post("/loginidd", loginidd);
router.post("/login", login);
router.post("/register", register);
router.get("/getcourse", getavenue);
router.post("/getmycourse", getmycourse);
router.post("/getunit", getunits);
router.post("/ownerlogin", onwerlogin);
router.post("/cleardeviceid", cleardeviceid);
router.post("/loginchecknew", loginchecknew);

router.get("/getallcourseadmin", getallcourseadmin);
router.post("/updatecoursesttaus", updatecoursesttaus);
router.post("/deletecourse", deletecourse);
router.post("/addcourse", addcourse);
router.post("/editcourse", editcourse);


router.post("/getallclassesadmin", getallclassesadmin);
router.post("/updateclasssttaus", updateclasssttaus);
router.post("/deleteclass", deleteclass);
router.post("/addclass", addclass);
router.post("/editclass", editclass);

router.get("/getalladmissions", getalladmissions);
router.post("/updateadmissionstatus", updateadmissionstatus);
router.post("/addadmission", addadmission);
router.post("/editadmission", editadmission);
router.get("/getalladmissions-paginated", getAllAdmissionsPaginated);
router.get("/getalladmissions-search", getAllAdmissionsSearch);


router.post("/addbatch", addbatch);
router.post("/updatebatchsttaus", updatebatchsttaus);
router.get("/getallbatches", getallbatches);
router.post("/editbatch", editbatch);


module.exports = router;