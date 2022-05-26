const mongoose= require('mongoose');

const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pincode:{type:String,required:true,minlength:6,maxLength:6},
        phone:{type:Number,required:true,minlength:10,maxlength:10}
    },
    orderitems:[{
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        stock:{type:Number,required:true},
        product:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    }],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    paymentinfo:{type:String,required:true},
    paidat:{type:String,required:true},
    itemsprice:{type:Number,required:true,default:0},
    taxprice:{type:Number,required:true,default:0},
    shippingprice:{type:Number,required:true,default:0},
    totalprice:{type:Number,required:true,default:0},
    orderstatus:{type:String,required:true,default:"processing"},
    deleveredat:Date,


},{
    versionKey:false,
    timestamps:true
})
const Order=mongoose.model("order",orderSchema);

module.exports=Order;