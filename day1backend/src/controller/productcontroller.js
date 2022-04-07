
const express=require('express');
const route=express.Router();
const Product =require("../models/productmodel")

route.post("/",async(req, res, next) => {
    try{
        const main=await Product.create(req.body);
        return res.send(main)
    }
    catch(err){
        return res.send(err.message)
    }
})

route.get('/', async(req, res)=>{
    try{
       
        
        let  data;
        if(!req.query.rating&&!req.query.payment){
            data=await Product.find();
        }
        else if(req.query.rating&&!req.query.payment) {
            data=await Product.find({rating:{$gt:req.query.rating}})
            
        }
        else if(req.query.payment&&req.query.rating==="null"){
            
            let a=[];
            let k=req.query.payment
            
            data=await Product.find()
            for(let i=0;i<data.length;i++){
                if(data[i].payment_methods[k]===true){
                    a.push(data[i])
                }
                
                
                
                 
            }
            return res.send(a)
        }
        else if(req.query.payment&&req.query.rating){
            let a=[]
            let k=req.query.payment
            
            data=await Product.find({rating:{$gt:req.query.rating}})
            for(let i=0;i<data.length;i++){
                if(data[i].payment_methods[k]===true){
                    a.push(data[i])
                }
                
                
                
                 
            }
            return res.send(a)
           
            
        }
        
        
        return res.send(data)
    }
    catch(err){
        return res.send(err.message)
    }
})

module.exports = route;