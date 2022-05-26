const express=require('express');
const app = express();
const cookieparser=require("cookie-parser")
app.use(express.json());
app.use(cookieparser())
require('dotenv').config();

process.on('uncaughtException', (err)=>{
    console.log(`uncaught:${err.message}`);
    console.log("shutdown");
    process.exit(1);
})
const errormiddleware=require("./middleware/error")
// connected to database
const connect=require("./config/db");


//Import routes
const product=require('./routes/productroutes');
app.use("/api",product);
const user=require("./routes/userroutes")
app.use("/api",user);
const order=require("./routes/orderroutes");
app.use("/api",order)
const payment=require("./routes/paymentroutes")
app.use("/api",payment)

// middleware for error messages
app.use(errormiddleware)

const main=app.listen(process.env.PORT,async()=>{
    try{
        await connect()
        console.log(`listening on port ${process.env.PORT}`);
    }
    catch(e){console.log(e.message);}
})


// unhandled .env promise rejection handler

process.on("unhandledRejection",err=>{
    console.log(`unhandled: ${err.message}`);
    console.log("shutdown");
    main.close(()=>process.exit(1));
})