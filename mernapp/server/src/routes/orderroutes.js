const express = require("express");
const { neworder, getsingleorder, userorders, 
    getallordersadmin, 
    updateorder,deleteorder} = require("../controller/ordercontroller");
const router=express.Router();
const {isauthinciteduser,authorizerole} =require('../middleware/auth');

router.route("/order/new").post(isauthinciteduser,neworder)
router.route("/order/mine").get(isauthinciteduser,userorders)
router.route("/order/:id").get(isauthinciteduser,getsingleorder)
router.route("/admin/orders").get(isauthinciteduser,authorizerole("admin"),getallordersadmin)
router.route("/admin/order/:id").put(isauthinciteduser,authorizerole("admin"),updateorder)
.delete(isauthinciteduser,authorizerole("admin"),deleteorder)

module.exports=router;