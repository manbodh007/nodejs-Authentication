const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/user_controller');



router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),userController.createSession);
router.get('/log-out',userController.logout);
router.get('/reset',userController.resetPage);
router.get('/profile',userController.profile);
router.post('/update-password/:id',userController.updatePassword);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

router.post('/forget-password',userController.resetPassword);
router.post('/submitted-otp',userController.submittedOTP,);



module.exports = router;
