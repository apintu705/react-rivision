const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    urlcode:{type: 'string',required: true},
    longurl:{type: 'string',required: true},
    shorturl:{type: 'string',required: true},
    date:{type: 'string',default: new Date}

})

module.exports=mongoose.model('urlsortner',urlSchema);