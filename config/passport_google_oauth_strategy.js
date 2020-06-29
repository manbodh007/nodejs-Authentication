const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use google oauth
passport.use(new googleStrategy({
    clientID:"567489393183-krdcp4bd6i1pu0eg1pc58ld5voqfil37.apps.googleusercontent.com",
    clientSecret:"8-RcGaoj8j6IxhjrWeI1Uttx",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){

    // if user google user is also a user of codeial to check that
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google oauth',err);
            return;
        }

        console.log(profile);
       // if user google user is also a user of codeial then return user else create a user using google profile.  
        if(user){
          return  done(null,user);
        }else{
            
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(error,user){
                if(error){
                    console.log('error in creating user using  google oauth',error);
                    return;
                }
                return done(null,user);
            })
        }
    })
}
))