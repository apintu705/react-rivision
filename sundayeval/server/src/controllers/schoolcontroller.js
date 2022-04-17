const express = require('express');
const route=express.Router();
const School=require('../modles/schoolmodle')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

const newToken=(data)=>{
    return jwt.sign({ data}, "abhishek kumar");
}
check('schoolname',"must be greater tha 5 words").isLength({ min: 5 }),
check('password',"must be a strong password").isLength({ min: 8 })
.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),

route.post("/",async(req, res, next)=>{
    try{

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            
            return res.status(404).send(errors.msg)
        };
        const user = await School.findOne({ schoolname:req.body.schoolname });
        if(!user){
            const data = await School.create(req.body);
        const token=newToken(data)
        return res.status(201).send({data,token})
        }
        return res.send("user already exist")
        
    }
    catch(err){
        return res.status(404).send(err.message)
    }
});

route.post ("/admin",async(req,res,nest)=>{
    try{
        console.log(req.body)
        const user = await School.findOne({schoolname: req.body.schoolname})
        .populate({ 
            path: 'teacher',
            populate: {
              path: 'class',
              
            } 
         });
        if(!user){
            return res.status(200).send("user not found please register first");
        }
        else{
            const match=user.check(req.body.password);
            if(!match){ return res.send("password not matched")}
            const token=newToken(user)
            
            return res.status(200).send({user,token})
        }
    }
    catch(err){
        return res.status(401).send(err.message);
    }
    
})


module.exports =route;