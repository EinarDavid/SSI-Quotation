var nodemailer = require('nodemailer');

module.exports = (email,bd,id)=>
{
  var transporter = nodemailer.createTransport({
    host: 'einar.villarroel@salamancasolutions.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: 'roxana.machaca@salamancasolutions.com',
      pass: 'password'
    }
  });
  // import generateHash from 'random-hash';
  // const hash =  generateHash({ length: 6 });
  
  var mailOptions = {
    from: auth.user,
    to: email,
    subject: 'Confirma tu cuenta en Parqueos Cochalos',
    text: 'Gracias por elegirnos. \nSolo estás a un paso para finalizar la creación de tu cuenta en Parqueos Cochalos.\n Ingresa el siguiente código en el sitio para confirmar tu cuenta: '
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);


    }
  });

}