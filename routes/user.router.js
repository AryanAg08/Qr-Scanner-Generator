const {Router} = require("express")
const userRouter = Router()
const path = require("path");
const express = require("express");
const { LoginPath } = require("./../paths");
const phaser = require("body-parser");


userRouter.get("/",async (req,res)=>{
  res.sendFile(path.resolve(__dirname, 'qrCode', "login.html"))
});
userRouter.use(express.static(path.join(__dirname, 'qrCode')));
userRouter.use(express.static(path.join(__dirname, '../Backend')));

userRouter.get("/Volunteer", async (req, res) => {
  res.sendFile(path.resolve(__dirname, 'qrCode', "volunteer.html"));
})

userRouter.get("/admin", async (req, res) => {
  // res.send("This is admin page");
  res.sendFile(path.resolve(__dirname, 'qrCode', "admin.html"));
});

userRouter.get('/admin-data', async (req, res) => {
  
 const collection = require("../model/1.user")

 const A1 = await collection.find()
    res.send(A1);

});
userRouter.get("/gen", async (req, res) => {
  const tfty = require("./qrCode/generate");
      tfty.send();
      console.log("sending mail!!");
})

//userRouter
userRouter.use(phaser.json());

userRouter.post('/submit-data', async (req, res) => {
    const data = req.body;
    
   //   const { SCANRESULT } = require("./qrCode/try")
      
    //    const h1 = SCANRESULT(data);
    //      console.log(h1);
    //    if (h1 === 'Success') {
    //  res.json("exists");
    //    }    

    const Roll = data.Email
    // {Email: "http://364387645"}
    const eroll = Roll
     
    const M1 = require("../model/1.user");
      const K1 = await M1.find({
        Enroll: eroll,
        QRUsed: "NO",
        Verified: "YES"
      })
      if (K1) {
        console.log(K1);
        for (ii of K1) {
            res.json({ user: ii.Enroll });
        }
      }
      else res.json({ user: null})
      .then (async () => {
        const M2 = await M1.findOneAndUpdate({
          Enroll: eroll,
          Verified: "YES",
        },{
          QRUsed: "YES",
        },{
          upsert: true
        });
        console.log(M2);
    });
    
      })
      
     

// userRouter.get("/api/data",async  (req, res) => {
      
      
      
  
//   // res.json(result);
// });



// userRouter.post("/logout",(req,res)=>{
//     res.status(200).send({"msg" : "User Logged out Sucessfully"})
//     return res.redirect(LoginPath)
// })




module.exports = {userRouter};