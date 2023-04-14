async function Generate (name, Enroll, Mail) {

  const qrcode = require('qrcode');
  const nodemailer = require('nodemailer');

//const token = "2210309345"; // replace with your token
//const email = "namangupta990@gmail.com"; // replace with your email address
const filename = "qr.png";
const path = require("path");
// const rehn = require("")
const RR = path.join(__dirname, "../../brochure.jpeg")


// generate QR code using predefined token
// qrcode.toDataURL(token, (err, url) => {
 qrcode.toFile(filename, Enroll, function (err) {
  // if (err) throw err;
 // console.log("File saved to" + filename);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "jiitopticachapter@gmail.com",
      pass: "tjiupieqdjlloudj"
    }
  });

  // send email with QR code as attachment
  transporter.sendMail({
    from: 'jiitopticachapter@gmail.com', // replace with your Gmail account email
    to: Mail,
    subject: 'Ticket to JSCOP 5.O 🚀',
    text: `Greetings ${name}🌟\nThanks for registering for JSCOP 5.0🚀💫 \nEnrollment No.: ${Enroll} \nFor any query either contact on desk or any JIIT Optica coordinator available. \nYour QR code is attached below for food. This will serve as your unique entry pass. 🎫\nThis will be used for for the refreshments and will be verified at the counter.\nPFA brochure below.\nExcited to see you there\n\nJIIT OPTICA TEAM 2023\nInfo: https://jscop.jiitopticachapter.in`,
    attachments: [{
      filename: "Brochure.jpeg",
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