const express=require('express');
const router=express.Router();
const {registeruser,loginuser,logoutuser,
     forgotpassword, resetpassword, userdetails,
      changepassword, updateuserprofile,
       getallusers, singleadminroles, 
       updateuserrole, deleteuser}=require('../controller/usercontroller')
const {isauthinciteduser,authorizerole} =require('../middleware/auth');

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logoutuser);
router.route("/forgot/password").post(forgotpassword);
router.route("/password/reset/:token").put(resetpassword);
router.route("/me").get(isauthinciteduser, userdetails);
router.route("/changepassword").put(isauthinciteduser, changepassword);
router.route("/me/updateprofile").put(isauthinciteduser, updateuserprofile);
router.route("/admin/user").get(isauthinciteduser,authorizerole("admin"),getallusers);
router.route("/admin/user/:id").get(isauthinciteduser,authorizerole("admin"),singleadminroles)
    .put(isauthinciteduser,authorizerole("admin"),updateuserrole)
    .delete(isauthinciteduser,authorizerole("admin"),deleteuser);

module.exports = router;