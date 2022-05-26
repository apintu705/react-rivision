require("dotenv").config();
const stripe=require("stripe")(process.env.STRIPE_PASSWORD)

exports.processpayment=async(req,res,next) => {
    try{
        const payment=await stripe.paymentintents.create({
            amount:req.body.amount,
            currency:"inr"
        })

        return res.status(200).json({success:true,client_secret:payment.client_secret})
    }
    catch(err){
        return res.status(404).send(err.message);
    }
}

exports.sendstripekey = async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_USER });
  }