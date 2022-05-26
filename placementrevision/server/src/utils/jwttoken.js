

const sendtoken=(user,statuscode,res)=>{
    const token=user.getjwttoken();


    // options for cookie uses first time through

    const options={ 
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES *24 * 60 * 60 * 1000),
        httponly:true,
    }

    return res.status(200).cookie("token",token,options).json({success:true,token,user})
}

module.exports=sendtoken;