
const express=require('express');
const connect= require("./config/db")
const app = express();
var cors = require('cors')

 
app.use(cors())
app.use(express.json());

const classcontroller=require("./controllers/classcontroller")
app.use("/class",classcontroller);

const teachercontroller=require("./controllers/teachercontroller")
app.use("/teacher",teachercontroller);

const schoolcontroller=require("./controllers/schoolcontroller")
app.use("/school",schoolcontroller);


app.listen(2345,async()=>{
    try{
        await connect();
        console.log("listening on port")
    }
    catch(e){
        console.log(e.message);
    }
})