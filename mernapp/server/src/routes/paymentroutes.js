const express=require("express");
const { processpayment, sendstripekey } = require("../controller/paymentcontroller");
const router=express.Router();
const {isauthinciteduser,authorizerole}=require("../middleware/auth")

router.route("/payment/process").post(isauthinciteduser,processpayment)
router.route("/stripekey").get(isauthinciteduser,sendstripekey)

module.exports = router;