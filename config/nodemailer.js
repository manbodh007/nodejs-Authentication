const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transport = nodemailer.createTransport({
    service:'gmail',
    host:'smpt.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'manbodhratre1@gmail.com',
        pass:'Manbodh@4193'
    }
});

let renderTemplate = (data,relativePath)=>{
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(error,template){
      if(error){
        console.log('error in rendering mail',error);
        return;
      }
      mailHTML = template;
    }
  )
  return mailHTML;
}

module.exports = {
  transport:transport,
  renderTemplate:renderTemplate,
}