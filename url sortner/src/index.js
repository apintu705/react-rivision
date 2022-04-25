const express = require("express");
const connect=require("./config/db");

const app= express();
app.use(express.json());

const urlcontroller = require("./controller/urlcontroller");
app.use("/",urlcontroller);


app.listen(2345,async()=>{
    try{
        await connect();
        console.log("listenting to port 2345")
    }
    catch(e){
        console.log(e.message);
    }
    
})