const mongo = require("mongoose");
const req = {
    type: String,
    required: false,
}
const us = new mongo.Schema({
    Name: req,
    Enroll: req,
    year: req,
    Mobile: req,
    MailID: req,
    Branch: req,
    Paid: req,
    PaidRS: req,
    QRUsed: req,
    ScannedBY: req,
    setNew: {
      type: String,
        required: false,
    },
    Verified: req,
    EMbedID: {
        type: String,
        required: false,
    },
});

module.exports = mongo.model("Jscop", us);
