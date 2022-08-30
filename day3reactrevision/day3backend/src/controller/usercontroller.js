const express=require('express');
const route=express.Router();
const User = require('../modles/usermodel')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

const newToken=(user)=>{
    return jwt.sign({ user}, "abhishek kumar");
}



route.post('/register',[
check('email').isEmail(),
check('password').isLength({ min: 8 })
.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
check('confpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }return true;
  }),
  check("mobile_no").isLength({ min: 10, max: 10 }),],


async(req, res, next)=>{
    try{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            console.log("h")
            return res.status(200).send(errors)
        }
        const user = await User.findOne({ email:req.body.email });
        if(!user){
            const data= await User.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:req.body.password,
                confpassword:req.body.confpassword,
                mobile_no:req.body.mobile_no
            });

            const token=newToken(user)
        return res.status(200).send({data,token})
        
        }
        else{
            return res.status(200).send(errors[{msg:"user already exist"}]);
        }
        
    }
    catch(err){
        return res.status(400).send(err.message);
    }
})


route.post ("/login",async(req,res,nest)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send("user not found please register first");
        }
        else{
            const match=user.check(req.body.password);
            if(!match){ return res.send("password not matched")}
            const token=newToken(user)

            return res.status(200).send({user,token})
        }
    }
    catch(err){
        return res.status(400).send(err.message);
    }
    
})

module.exports =route;