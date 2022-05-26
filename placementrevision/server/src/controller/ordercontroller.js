const Order=require("../modles/ordermodel");
const Product= require("../modles/productmodel");
const Errorhandler=require("../utils/errorhaldler");


// create new order 

exports.neworder=async(req, res, next) => {
    try{
        
        const {shippingInfo,orderitems,paymentinfo,shippingprice,itemsprice,taxprice,totalprice,}=req.body;
        const order=await Order.create(
            {shippingInfo,
                orderitems,
                paymentinfo,
                shippingprice,
                itemsprice,
                taxprice,
                totalprice,
                paidat:Date.now(), 
                user:req.user._id,
                deleveredat:Date.now()
            }
        )
        return res.status(200).json({success:true,order})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}


// get single order order
exports.getsingleorder=async(req, res, next) => {
    try{
        const order=await Order.findById(req.params.id).populate("user","name email")
        
        if(!order){
            return next(new Errorhandler("order not found",404))
        }
        return res.status(200).json({success:true,order})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// get logged in user order
exports.userorders=async(req, res, next) => {
    try{
        
        const orders=await Order.find({user:req.user.id})
        
        if(!orders){
            return next(new Errorhandler("order not found",404))
        }
        return res.status(200).json({success:true,orders})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// get all orders admin
exports.getallordersadmin = async(req, res, next) => {
    try{
        
        const orders=await Order.find()
        
        if(!orders){
            return next(new Errorhandler("order not found",404))
        }
        

        let totalamount=0;
        orders.forEach(order =>totalamount+=order.totalprice);
        
        return res.status(200).json({success:true,totalamount:totalamount,orders})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// update order status
exports.updateorder = async(req, res, next) => {
    try{
        
        const orders=await Order.findById(req.params.id);
        
        
        if(!orders){
            return next(new Errorhandler("order not found",404))
        }

        if(orders.orderstatus==="delevered"){
            return next(new Errorhandler("you have already delevered this product order",404))
            
        }
        
        orders.orderitems.forEach(async(order)=>{
            await updatestock(order.product,order.quantity)
        })

        orders.orderstatus=req.body.status;
        if(req.body.status==="delevered"){
            orders.deleveredat=Date.now()
        }
        console.log(orders.orderstatus)
        await orders.save();
        
        return res.status(200).json({success:true,orders})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}


async function updatestock(id,quantity){
    const product = await Product.findById(id);
    product.stock-=quantity;
    await product.save();
}


// delete order order: ;

exports.deleteorder=async(req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return next(new Errorhandler("order of id not found",404))
        }
        order.remove();
        return res.status(200).json({success:true,order,message:"delete order successfully"})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}