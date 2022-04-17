const express = require('express');
const route=express.Router();
const Teacher=require('../modles/teachermodle')

route.post("/",async(req, res, next)=>{
    try{
        const data = await Teacher.create(req.body);
        return res.status(201).send(data)
    }
    catch(err){
        return res.status(404).send(err.message)
    }
});

route.get("/:id",async(req, res, next)=>{
    console.log(req.params.id)
    try{
        console.log("h")
        const data=await Teacher.find({_id:req.params.id}).populate("class").lean().exec();
        return res.status(201).send(data)
    }
    catch(err){
        return res.status(404).send(err.message)
    }
});


module.exports =route;