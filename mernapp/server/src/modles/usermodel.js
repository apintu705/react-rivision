const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const userSchema=new mongoose.Schema({
    name:{type:String, required:[true,"please enter your name"], 
        minLength:[4,"name should have more than 4 characters"], 
        maxLength:[15,"name should have less than 15 characters"]},
    email:{type:String, required:[true,"please enter your email"], 
        unique:true,validate:[validator.isEmail,"please enter a valid email"]},
    password:{type:String, required:[true,"please enter your password"],
        minLength:[6,"password should have more than 6 characters"], 
        select:false,},
    avatar:{public_id:{type:String,required:true},url:{type:String,required:true},},
    role:{type:String, default:"user"},
    resetpasswordtoken:{type:String, },
    resetpasswordexpire:Date,
},{
    versionKey:false,
    timestamps:true,
})


// hash password using becrypt js
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcryptjs.hash(this.password,10)
})

// compare password using becrypt js

userSchema.methods.comparepassword=async function(enteredpassword){
    
     const a=await bcryptjs.compare(enteredpassword,this.password)
     
     return a;
}


// jwttoken
userSchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE})
}

// generate reset password tokens
// using crypto first time 
userSchema.methods.generateresetpassword=function(){
    const resettoken= crypto.randomBytes(20).toString("hex");
    this.resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest().toString("hex");
    this.resetpasswordexpire=Date.now()+5*60*1000;
    return resettoken;
}

const User=mongoose.model("user",userSchema);

module.exports = User;