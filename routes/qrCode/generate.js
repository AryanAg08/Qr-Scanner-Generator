async function Generate (name, Enroll, Mail) {

  const qrcode = require('qrcode');
  const nodemailer = require('nodemailer');

//const token = "2210309345"; // replace with your token
//const email = "namangupta990@gmail.com"; // replace with your email address
const filename = "qr.png";
const path = require("path");
// const rehn = require("")
const RR = path.join(__dirname, "../../try.pdf")


// generate QR code using predefined token
// qrcode.toDataURL(token, (err, url) => {
 qrcode.toFile(filename, Enroll, function (err) {
  // if (err) throw err;
 // console.log("File saved to" + filename);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "aryangoyal625@gmail.com",
      pass: "rmdpiaalwedabwth"
    }
  });

  // send email with QR code as attachment
  transporter.sendMail({
    from: 'aryangoyal625@gmail.com', // replace with your Gmail account email
    to: Mail,
    subject: 'QR code',
    text: `Hello ${name} \n Your Enrollment: ${Enroll} \n Email: ${Mail} Your QR for JSCOP is below as attachment.`,
    attachments: [{
      filename: "Try.pdf",
      path: RR, // filename
      // content: url.split(',')[1],
      encoding: 'base64'
    }, {
      filename: "QR.png",
      path: path.join(__dirname, "../../qr.png"),
      encoding: 'base64'
    }]
  }, (err, info) => {
    if (err) throw err;
    console.log(`QR code sent to ${Mail}: ${info.response}`);
  });
})



}

module.exports = {
  Generate
}