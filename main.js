const express = require("express");
const session = require("express-session");
const mongo = require("mongoose");
require("dotenv").config();
const routes = require("./src/routes/main");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5002;


// mongo.connect(`${process.env.mongo}`, {
//    keepAlive: true,
// });
// console.log(`Connected to mongo!!`);


app.use(session({
    secret: 'OPTICAA',
    cookie: {
        maxAge: 60000 * 60 * 24 * 1
    },
    resave: false,
    saveUninitialized: false,
    // store: Store.create({
    // //     mongoUrl: process.env.mongo
    // // })
  }));
  

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-origin", "*")
    res.setHeader('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

app.post("/formData", async (req, res) => {
    console.log(req.body)
// const Name = req.body.Name
// const Email = req.body.Email
// const Intention = req.body.Intention
// const Links = req.body.Links
// const New = req.body.New

// const HiringForm = new FormReq ({
//  Name,
//  Email,
//  Intention,
//  Links,
//  New,
// });

// try {
// // const savedThought = await HiringForm.save();
// //res.json(savedThought);
// console.log(HiringForm);
// } catch (err) {
// res.json({ message: err });
// }

})

app.get("/ping", (req, res) => {
    res.json({
        message: "Ping from the server!!"
    });
});

// app.get("/*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, './Frontend/opticaaa/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});