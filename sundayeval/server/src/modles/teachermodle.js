const mongoose = require('mongoose');

const teacherSchema=new mongoose.Schema({
    name:{type: 'string', required: true},
    genders:{type: 'string',default: 'Male'},
    age:{type: 'Number', required: true},
    image: {type: 'string', required: true},
    class:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class"
    }]
}
,{
    versionKey:false,
    timestamps:true,
})

module.exports =mongoose.model("teacher",teacherSchema);