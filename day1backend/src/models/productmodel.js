
const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    title:{type:"String",required:"true"},
    type:[{type:"String",required:"true"}],
    cost :{type:"Number",required:"true"},
    rating:{type:"Number",required:"true"},
    payment_methods:{
        card:{type:"Boolean",required:"true"},
        cash:{type:"Boolean",required:"true"},
        upi:{type:"Boolean",required:"true"}
    },
    cost_of_two:{type:"Number",required:"true"},
    image:{type:"String",required:"true"}

})

module.exports=mongoose.model("products",productSchema);