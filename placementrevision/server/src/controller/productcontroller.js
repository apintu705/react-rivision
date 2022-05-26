const Product= require("../modles/productmodel");
const Errorhandler=require("../utils/errorhaldler");
const Apifeatures=require("../utils/apifeatures")

// create products

exports.createproduct=async(req, res, next) => {
    try{
        req.body.user=req.user.id;
        const data=await Product.create(req.body)
        return res.status(200).json({success:true,data});
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}


// get all products
exports.getallproducts=async(req, res, next)=> {
    try{
        
        const resultperpage=4;
        const productcount=await Product.countDocuments();
       
        const apifeatures=new Apifeatures(Product.find(),req.query)
        .search().filter();
        apifeatures.pagination(resultperpage);
        const data=await apifeatures.query;
        return res.status(200).json({success:true,data,productcount,resultperpage,});
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// update product

exports.updateproduct=async(req, res, next)=>{
    try{
        
        let data=await Product.findById(req.params.id);
        if(!data){
            return next(new Errorhandler("product no found in database",404));
        }
        data=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true})
        return res.status(200).json({success:true,data});
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}


// delete products
exports.deleteproduct=async(req, res, next)=>{
    try{
        
        let data=await Product.findById(req.params.id);
        if(!data){
            return next(new Errorhandler("product no found in database",404));
            
        }
        data=await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({success:true,data});
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// get product AssetDetails

exports.productdetails=async(req, res, next) => {
    try{
        
        let data=await Product.findById(req.params.id);
        if(!data){
            return next(new Errorhandler("product no found in database",404));
            
        }
        
        return res.status(200).json({success:true,data});
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}


// create or update the review item

exports.createproductreview=async(req, res, next) => {
    try{
        
        const  {rating,comment,product_id}=req.body;
        const review={
            user:req.user.id,
            name:req.user.name,
            rating:Number(rating),
            comment
        }
        
        const product=await Product.findById(product_id);

        const isreviewed=product.review.find(rev=>rev.user.toString()===req.user.id.toString());

        if(isreviewed){
            product.review.forEach(rev=>{
                if(rev.user.toString()===req.user.id.toString()){
                    rev.rating=rating;
                    rev.comment=comment;
                }
            })

        }else{
            product.review.push(review);
            product.no_of_reviews=product.review.length;

        }
        let avg=0;
        product.review.forEach(rev=>{avg+=rev.rating})
        product.ratings=avg/product.review.length;

        await product.save();

        return res.status(200).json({success:true,message:"reviewed successfully"})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// get all reviews of a single product
exports.getallreview=async(req, res, next) => {
    try{
        const product = await Product.findById(req.query.productid);
        
        if(!product){
            return next(new Errorhandler("product not found",404))
        }
        
        return res.status(200).json({success:true,reviews:product.review})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}

// delete reviews of a single product

exports.deletereviewofsingleproduct=async(req, res, next) => {
    try{
        const product = await Product.findById(req.query.productid);
        if(!product){
            return next(new Errorhandler("product not found",404))
        }
        
        const review = product.review.filter((rev)=>
        rev._id.toString()!==req.query.id);
        
        let avg=0;
        review.forEach(rev=>{avg+=rev.rating})
        const ratings=avg/review.length;
        const no_of_reviews=review.length;

        await Product.findByIdAndUpdate({
            review: review,
            ratings: ratings,
            no_of_reviews: no_of_reviews
        },{new:true})
    }
    catch(err){
        
        return res.status(404).send(err.message);
    }
}
