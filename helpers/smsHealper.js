const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.mail = async(to,password)=>{
    try{
const msg = {
  to: to,
  from: process.env.EMAIL, 
  subject: 'New Login Password',
  text: `Pleas find new password for login ${password}`,
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
    }catch(err){
        console.error(err.message) 
    }
}