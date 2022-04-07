const express = require("express");
const cors= require("cors")
const app = express();
app.use(express.json())
app.use(cors())

const connect = require("./config/db");
const productcontrol=require("./controller/productcontroller");
app.use("/get-restaurants",productcontrol)


app.listen(8080,async()=>{
    await connect();
    console.log("listen on port 8080")
})