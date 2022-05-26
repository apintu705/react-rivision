const mongoose = require('mongoose');
require('dotenv').config();
const connect=()=>{
    console.log("connected to database");
    return mongoose.connect(process.env.DB_URI)
}

module.exports =connect;