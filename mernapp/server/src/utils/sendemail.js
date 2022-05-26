const nodemailer=require('nodemailer');
require('dotenv').config()

const sendemail=async(data)=>{
    console.log(data)
    const transporter=nodemailer.createTransport({
        host:"smpt.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"apintu705@gmail.com",
            pass:"kinley12",
        }
    })

    const mailoptions={
        from:"apintu705@gmail.com",
        to:data.email,
        subject:data.subject,
        text:data.message,
    }


    await transporter.sendMail(mailoptions)
}


module.exports =sendemail;