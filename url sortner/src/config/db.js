const mongoose = require('mongoose');

const connect=()=>{
    return mongoose.connect("mongodb+srv://abhi:abhi1234@cluster0.g9slr.mongodb.net/urlsortner")
}


module.exports =connect;