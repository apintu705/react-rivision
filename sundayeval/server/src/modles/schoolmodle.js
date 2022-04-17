
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');


const schoolSchema=new mongoose.Schema({
    schoolname:{type: 'string', required: true},
    password:{type: 'string', required: true},
    teacher:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    }]
},{
    versionKey:false,
    timestamps:true
})

schoolSchema.pre("save",function(next){
    if(!this.isModified("password")){return next()};
    
    var hash = bcrypt.hashSync(this.password, 8);
    
    this.password = hash;
    return next();


})

schoolSchema.methods.check=function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports=mongoose.model('school',schoolSchema);