module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success':req.flash('success'),
        'error':req.flash('error'),
    }
    next();
}
// set up the otp and email from flash to res locals to compare the entered otp and generated otp
module.exports.Info = function(req,res,next){
    res.locals.Info = {
        'email':req.flash('email'),
        'otp':req.flash('otp')
    }
    next();
}