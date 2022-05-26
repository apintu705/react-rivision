
const User=require("../modles/usermodel")
const Errorhandler=require("../utils/errorhaldler");
const sendtoken=require("../utils/jwttoken");
const sendemail=require("../utils/sendemail.js");
const crypto=require("crypto");

// register user;

exports.registeruser=async(req, res, next) => {
    try{
        const {name,email,password}=req.body;
        let  user =await User.findOne({email:req.body.email});
        if(user){
            return next(new Errorhandler("user already registered",404));
        }
        user= await User.create({
            name,email,password,
            avatar:{
                public_id:"sample id",
                url:"sample user avatar"
            }
        })

        sendtoken(user,200,res);
    }
    catch(err){return res.status(404).send(err.message);}
}


// login user

exports.loginuser=async(req, res, next) => {
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return next(new Errorhandler("pleas enter valid email or password",404));
        }
        const user = await User.findOne({email:email}).select("+password");
        
        if(!user){
            return next(new Errorhandler("pleas enter valid email or password",404));
        }
        const ispasswordmatch=await user.comparepassword(password);
        
        if(!ispasswordmatch){
            return next(new Errorhandler("email and password do not match",404));
        }

        sendtoken(user,200,res);
    }
    catch(err){
        return res.status(404).send(err.message);
    }
}


// logout the usermodel

exports.logoutuser=async(req, res, next) => {
    try{
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httponly: true,
        });
        return res.status(200).json({success:true,message:"logout successfully"});
    }
    catch(err){return res.status(404).send(err.message);}
}


// forgot password

exports.forgotpassword=async(req, res, next) => {
    try{
        const {email}=req.body;
        
        const user = await User.findOne({email:email});
        if(!user){
            return next(new Errorhandler("pleas enter valid email",404));
        }
        const resettoken= user.generateresetpassword();
        
        await user.save();

        const resetpasswordurl= `${req.protocol}://${req.get("host")}/api/password/reset/${resettoken}`;

        const emailmessage=`your password reset token is:-- \n\n  ${resetpasswordurl} \n\n if you want to reset your password ignore this`;


        try{


            await sendemail({
                email:user.email,
                subject:"password reset",
                message:emailmessage,
            });
            res.status(200).json({success:true,message:"email send successfully"});
        }
        catch(err){}
        // catch(err){
        //     user.resetpasswordtoken=undefined;
        //     user.resetpasswordexpire=undefined;

        //     await user.save();
            

        //     return next(new Errorhandler(err.message,500));
        // }
    }
    catch(err){return res.status(404).send(err.message);}
}

// reset password

exports.resetpassword=async(req, res, next) => {
    try{
        
        const resetpasswordtoken=crypto.createHash("sha256").update(req.params.token).digest().toString("hex");
        console.log(resetpasswordtoken,Date.now());
        const user= await User.findOne({resetpasswordtoken:resetpasswordtoken,
            resetpasswordexpire:{$gt:Date.now()}})

        if(!user){
            return next(new Errorhandler(`reset password token has been expired${new Date(Date.now())}`,404));
        }

        if(req.body.password!==req.body.confpassword){
            return next(new Errorhandler("password doesnot match",404));
        }

        user.password=req.body.password;
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;

        await user.save();

        sendtoken(user,200,res);

    }
    catch(err){return res.status(404).send(err.message);}
}


// get user userDetails
exports.userdetails=async (req, res, next)=>{
    try{
        const user = await User.findById(req.user.id);
        return res.status(200).json({success:true,user})

    }
    catch(err){return res.status(404).send(err.message)}
}

// change password

exports.changepassword=async (req, res, next)=>{
    try{
        const user = await User.findById(req.user.id).select("+password");
        const password=req.body.oldpassword;
        
        const ispasswordmatch=await user.comparepassword(password);
        
        if(!ispasswordmatch){
            return next(new Errorhandler("oldpassword do not match",404));
        }
        if(req.body.newpassword!==req.body.confpassword){
            return next(new Errorhandler("newpassword and confpassword doesnot match",404));
        }
        user.password=req.body.newpassword;
        await user.save();
        sendtoken(user,200,res)
        

    }
    catch(err){return res.status(404).send(err.message)}
}

// update user profiler

exports.updateuserprofile=async(req, res, next) => {
    try{
        console.log(req.body)
        const newuserdata={
            name:req.body.name,
            email:req.body.email,
        }
        const user = await User.findByIdAndUpdate(req.user.id,newuserdata,{new:true});
        return res.status(200).json({success:true,user})
    }
    catch(err){return res.status(404).send(err.message)}
}


// get allusers
exports.getallusers = async(req, res, next) => {
    try{
        const user = await User.find().lean().exec();
        return res.status(200).json({success:true,user})
    }
    catch(err){return res.status(404).send(err.message)}
}

// get single user admin roles
exports.singleadminroles=async(req, res, next) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return next(new Errorhandler("admin not found ",404))
        }
        return res.status(200).json({success:true,user})
    }
    catch(err){return res.status(404).send(err.message)}
}

// update admin profiler user role
exports.updateuserrole=async(req, res, next) => {
    try{
        console.log(req.body)
        const newuserdata={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
        }
        const user = await User.findByIdAndUpdate(req.params.id,newuserdata,{new:true});
        return res.status(200).json({success:true,user})
    }
    catch(err){return res.status(404).send(err.message)}
}

// delete user
exports.deleteuser=async(req, res, next) => {
    try{
        
        const user = await User.findByIdAndDelete(req.params.id);
        // remove cloudnary
        if(!user){
            return next(new Errorhandler("user doesnot exist with this id",404))
        }
        return res.status(200).json({success:true,user})
    }
    catch(err){return res.status(404).send(err.message)}
}