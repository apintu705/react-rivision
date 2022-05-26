const express=require('express');
const router=express.Router();
const {createproduct,getallproducts,
    updateproduct,deleteproduct,productdetails, 
    createproductreview,
    getallreview,
    deletereviewofsingleproduct}=require('../controller/productcontroller')
const {isauthinciteduser,authorizerole} =require('../middleware/auth');


router.route("/products").get(getallproducts);
router.route("/admin/product/new").post(isauthinciteduser,authorizerole("admin"),createproduct);
router.route("/admin/product/:id").put(isauthinciteduser,authorizerole("admin"),updateproduct)
.delete(isauthinciteduser,authorizerole("admin"),deleteproduct);
router.route("/product/:id").get(productdetails);
router.route("/review").put(isauthinciteduser,createproductreview);
router.route("/reviews").get(getallreview).delete(isauthinciteduser,deletereviewofsingleproduct);


module.exports = router;