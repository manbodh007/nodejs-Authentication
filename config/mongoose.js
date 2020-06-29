const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authentication');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error in db connection'));
db.once('open',function(){
    console.log('database in connected successfully');
});

