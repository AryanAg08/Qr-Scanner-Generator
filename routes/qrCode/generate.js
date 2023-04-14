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
    subject: 'QR code',
    text: `Greetings ${name}!\n Thanks for registering for JSCOP 5.0 💫 \n Enrollment No.: ${Enroll} \n  For any query either contact on desk or any JIIT Optica coordinator available. \n Your QR code is attached below for food.\n This will be used for for the refreshments and will be verified at the counter. \nPFA brochure below.\n\n Regards \nJIITOPTICA TEAM`,
    attachments: [{
      filename: "JSCOP Brochure",
      path: RR, // filename
      // content: url.split(',')[1],
      encoding: 'base64'
    }, {
      filename: "QR",
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