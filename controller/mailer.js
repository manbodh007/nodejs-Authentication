const nodeMailer = require('../config/nodemailer');


exports.resetPass = (user,otp)=>{
    console.log('inside nodeMailer');
    console.log(user);
    nodeMailer.transport.sendMail({
        from:'codeial.com',
        to:user.email,
        subject:'reset password',
        html:'your OTP is ' + otp
    },(error,info)=>{
        if(error){
            console.log('error in sending mail',error);
            return;
        }

        console.log("mail is send",info);
        return;
    })
}