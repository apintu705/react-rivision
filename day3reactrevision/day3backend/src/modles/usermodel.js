const bcrypt=require('bcryptjs');
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    first_name:{type: 'string', required: true},
    last_name:{type: 'string', required: true},
    email:{type: 'string', required: true},
    password:{type: 'string', required: true},
    confpassword:{type: 'string', required: true},
    mobile_no:{type: 'Number', required: true},
})


userSchema.pre("save",function(next){
    if(!this.isModified("password")){return next()};
    if(!this.isModified("confpassword")){return next()}
    var hash = bcrypt.hashSync(this.password, 8);
    this.confpassword =hash;
    this.password = hash;
    return next();


})

userSchema.methods.check=function(password){
    return bcrypt.compareSync(password,this.password)
}


module.exports = mongoose.model('users',userSchema)