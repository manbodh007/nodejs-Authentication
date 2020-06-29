const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const mongoose = require('./config/mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const flashMiddleware = require('./controller/middleware');
const passportLocal = require('./config/passport_local_strategy');
const passportGoogleAuth = require('./config/passport_google_oauth_strategy');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
// to render the assets file
app.use(express.static('assets'));

// setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'new',
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));


app.use(passport.initialize());
app.use(passport.session());
// to store the user into res.locals
app.use(passport.setAuthenticatedUser);
//set up flash to show notification
app.use(flash());
app.use(flashMiddleware.setFlash);
app.use(flashMiddleware.Info);

// extract the external stylesheet ans script
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./router/index'));



app.listen(port,function(error){
    if(error){
        console.log('error in server',error);
        return;
    }else{
        console.log('server is running on port:',port);
        return;
    }
})