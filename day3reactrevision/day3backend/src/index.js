const express=require('express');
var cors = require('cors')
const app = express()
 
app.use(cors())
 

app.use(express.json())
const connect= require("./config/db")


const usercontrols=require("./controller/usercontroller");
app.use("/",usercontrols);

app.listen(8080,async()=>{
    await connect();
    console.log('listening on port 8080');
})