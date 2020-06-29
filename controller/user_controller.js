
const User = require('../models/user');
const mailer = require('../controller/mailer');


module.exports.create = function(req,res){
    req.flash('success','Sign-up successfully');
     User.create(req.body);
     return res.redirect('/sign_in');
}
module.exports.profile = function(req,res){
   return res.render('profile');
}

module.exports.createSession = function(req,res){

    req.flash('success','you are logged in Successfully');
    return res.redirect('/users/profile');
}

module.exports.logout = function(req,res){
    req.logout();
    req.flash('success','log out Successfully');
    return res.redirect('/');
}

module.exports.resetPage = function(req,res){
    return res.render('changePassword');
}
// update password using req.params.id
module.exports.updatePassword = function(req,res){
    if(req.body.password!=req.body.conform_password)
    return res.redirect('back');
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log('error in finding user while update password',err);
            return;
        }
        if(user){
            req.flash('success','password update Successfully');
            user.password = req.body.password;
            user.save();
            return res.redirect('/');
        }
    })

}

// sending mail which is given by user if email is present in database then send otp
module.exports.resetPassword = async function(req,res){
    User.findOne({email:req.body.email},async function(err,user){
        if(err){
            req.flash('error','error');
            console.log('error',err);
            return;
        }
        if(user){
            req.flash('success','OTP has send to your email');
            let otp = Math.random();
            otp = parseInt(otp*1000000);
            req.flash('email',req.body.email);
            req.flash('otp',otp);
            
            mailer.resetPass(user,otp);
            return res.redirect('/submitYourOtp');
        }else{
            req.flash('error','your email is not registered');
            return res.redirect('back');
        }
    })
}


// check the otp which is correct if correct then update password else return invalid otp using noty
module.exports.submittedOTP = function(req,res){
  if(req.body.otp == req.query.otp){
      User.findOne({email:req.query.email},function(err,user){
          if(err){
            req.flash('error','error');
            console.log('error',err);
            return;
          }
          if(user){
              user.password = req.body.password;
              user.save()
             req.flash('success','change password successfully');  
             return res.redirect('/');
          }
      })
  }else{
      req.flash('error',"invalid otp");
      return res.redirect('/forget-password');
  }
}