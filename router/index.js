const express = require('express');

const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./user'));
router.get('/sign_up',homeController.sign_up);
router.get('/sign_in',homeController.sign_in);
router.get('/forget-password',function(req,res){
    return res.render('forgetPassword');
})
router.get('/submitYourOtp',function(req,res){
    return res.render('otp');
});

module.exports = router;