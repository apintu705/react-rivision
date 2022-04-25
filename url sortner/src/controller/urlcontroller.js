const express = require("express");
const router=express.Router();
const Url = require("../modles/urlsortnermodel")
const validurl = require("valid-url");
const shortid=require("shortid");



router.post("/",async(req, res, next)=>{
    try{
        const {longurl}=req.body;
        const baseurl="http://localhost:2345"

        if(!validurl.isUri(baseurl)){
            return res.status(404).send("invalid base url");
        }

        
        const {name}=req.body
        if(!name){
           var urlcode=shortid.generate(); 
        }else{
            var urlcode=name; 
        }

        if(validurl.isUri(longurl)){
            let url=await Url.findOne({ longurl: longurl });

            if(url){
                return res.send(url)
            }
            else{
                const shorturl=baseurl+"/"+urlcode;
                
                
                url=await Url.create({
                    longurl,
                    shorturl,
                    urlcode,
                    date:new Date()
                })
                return res.status(200).send(url);
            }
            

        }
        else{
            return res.send("invalid long url")
        }
        
    }
    catch(err){
        return res.status(404).send(err.message);
    }
    
})


router.get("/:code",async(req, res, next)=>{
    try{
        const url=await Url.findOne({urlcode:req.params.code});
        if(url){
            return res.redirect(url.longurl)
        }else{
            return res.status(404).send("url not found")
        }
    }
    catch(err){
        return res.status(404).send(err.message)
    }
})

module.exports = router;