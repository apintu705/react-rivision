
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://abhi:abhi12@cluster0.g9slr.mongodb.net/rivision")
}