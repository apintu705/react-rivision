const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String,required:[true,"please enter product name"],trim:true},
    description:{type:String,required:[true,"please enter description"]},
    price:{type:Number,required:[true,"please enter price"],maxLength:[6,"Price cannot exceed more than 6 char"]},
    ratings:{type:Number,default:0},
    images:[{public_id:{type:String,required:true},url:{type:String,required:true},}],
    category:{type:String,required:[true,"please enter category"]},
    stock:{type:Number,required:[true,"please enter stock"],maxLength:[3,"Stock cannot exceed 3 char"],default:1},
    no_of_reviews:{type:Number,default:0},
    review:[{user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        comment:{type:String,required:true},}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
},{
    versionKey:false,
    timestamps:true
});



const Product=mongoose.model("product",productSchema);

module.exports = Product;

