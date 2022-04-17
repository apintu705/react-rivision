const mongoose = require('mongoose');
const connect=()=>{
    return mongoose.connect("mongodb+srv://abhi:abhi12@cluster0.g9slr.mongodb.net/sunday")
}
module.exports = connect;