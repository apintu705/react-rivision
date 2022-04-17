const express = require('express');
const route=express.Router();
const Class=require('../modles/classmodel')

route.post("/",async(req, res, next)=>{
    try{
        const data = await Class.create(req.body);
        return res.status(201).send(data)
    }
    catch(err){
        return res.status(404).send(err.message)
    }
});

route.get("/",async(req, res, next)=>{
    try{
        const data=await Class.find().lean().exec();
        return res.status(201).send(data)
    }
    catch(err){
        return res.status(404).send(err.message)
    }
});


module.exports =route;