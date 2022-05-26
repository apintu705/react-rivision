const Errorhandler=require("../utils/errorhaldler");
var jwt = require('jsonwebtoken');
const User=require("../modles/usermodel")
require("dotenv").config()

exports.isauthinciteduser= async(req, res, next)=>{
    try{
        const {token}=req.cookies;
       
        if(!token){
            return next(new Errorhandler("please login first to access the resources",401));
        }
        const decodejwt=jwt.decode(token,process.env.JWT_SECRET);
        
        req.user=await User.findById(decodejwt.id);
        next();

    }
    catch(err){
        return res.status(404).send(err.message);
    }
}

exports.authorizerole= (...roles) => {
    try{
        
        return (req, res, next) => {
            
            if(!roles.includes(req.user.role)){
                return next(new Errorhandler(`role:${req.user.role} is not allowed to access this resource`,403));
            }
            next();
        }
    }
    catch(err){return res.status(404).send(err.message);}
}