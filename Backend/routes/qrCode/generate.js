async function Generate (dataa) {
//   const qrcode = require('qrcode');
// const nodemailer = require('nodemailer');

// const token = "myToken123"; // replace with your token
// const email = "aryangoyal90@outlook.com"; // replace with your email address

// // generate QR code using predefined token
// qrcode.toDataURL(token, (err, url) => {
//   if (err) throw err;

//   // create nodemailer transport object
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'mehul14bansal@gmail.com', // replace with your Gmail account email
//       pass: '12345@Mehul' // replace with your Gmail account password
//     }
//   });

//   // send email with QR code as attachment
//   transporter.sendMail({
//     from: 'mehul14bansal@gmail.com', // replace with your Gmail account email
//     to: email,
//     subject: 'QR code',
//     attachments: [{
//       filename: 'qr.png',
//       content: url.split(',')[1],
//       encoding: 'base64'
//     }]
//   }, (err, info) => {
//     if (err) throw err;
//     console.log(`QR code sent to ${email}: ${info.response}`);
//   });
// });

const qr = require('qrcode');
const fs = require('fs');

const token = dataa;
const filename = 'qr.png';

qr.toFile(filename, token, function (err) {
  if (err) throw err;
  console.log(`QR code saved to ${filename}`);
});

}

module.exports = {
  Generate
}