const jwt = require('jsonwebtoken');
const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');

// function send email
async function sendMailRegister(payload) {
  const configMail = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'purkonud12119617',
      pass: 'AmikBsi12119617'
    }
  };

  const transporter = await nodemailer.createTransport(configMail);
  const mail = {
    to: payload.email,
    from: 'node-email@gmail.com',
    subject: '[Node Email] - Lost Passwod',
    html: `<h4>Your Account @react-node app!</h4><br><p>Your Passwod : `+payload.password+`</p>`
  };
  transporter.sendMail(mail);

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
  send :(req, res, err)=>{
    const payload = {...req.query}
    let User = emailModel.getUser(payload);
    User.then(async (result)=>{
       if (result.length == 0) {
         return res.send({
          'success': false,
          'code': 500,
          'message': 'An error has occured or email ot found!',
          'data': ''
        })

       }
         // kirim email
         payload.password = result[0].password;

         await sendMailRegister(payload);
         // console.log('kirim email', payload);
         res.send({
          'success': true,
          'code': 200,
          'message': 'password has been sent to '+ payload.email +', please check your email!',
          'data': result[0],
        })

    })
    User.catch(err=>new Error(err));
  }
}
