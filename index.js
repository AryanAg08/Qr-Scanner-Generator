require('dotenv').config()

const { Client, GatewayIntentBits, Events } = require("discord.js");
//const { token } = require("../config.json");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.MessageContent,
] });

const { MSG } = require("./routes/qrCode/try");
const { Buttons } = require("./routes/qrCode/discord-buttons");
const { NEWReq } = require('./routes/qrCode/try');
const { mongo } = require("./config/db")

MSG(client);
Buttons(client);

client.on("ready", async () => {
    console.log("Bot is alive");
   await mongo();

    const schedule = require("node-schedule");

    var j = schedule.scheduleJob("*/1 * * * *", async function () {
        NEWReq(client);
    })
});


client.login(process.env.token);

const express = require('express')
const {connection} = require('./config/db')
const {userRouter} = require('./routes/user.router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT;
const path = require("path");
const { DATAFRONTEND } = require('./paths');
const FORM = require("./model/1.user");
const app = express();

app.use(express.static(path.join(__dirname, 'routes')));

app.use(cors({
    origin : "*"
}))
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("hello")
})

app.get(DATAFRONTEND, async (req, res) => {
    console.log(req.body)
    const Name = req.body.Name
    const Email = req.body.Email
    const year = req.body.year
    const Mobile = req.body.Mobile
    const MailID = req.body.MaildID
    const Branch = req.body.Branch
    const Paid = req.body.Paid // IMG string
    const setNew = "YES"
    const Verified = "NO"
   
    const REgisterForm = new FORM ({
        Name,
        Email,
        year,
        Mobile,
        MailID,
        Branch,
        Paid,
        setNew,
        Verified
    });
   
    try {
       const SAVEFORM = await REgisterForm.save();
       res.json(SAVEFORM);
     } catch (err) {
       res.json({ message: err });
     }
})

app.use("/user",userRouter)


app.listen(PORT,async ()=>{
    // try{
    //    // await connection
    //     console.log("connected to DB")
    // }catch(err){
    //     console.log("Error connecting to DB")
    //     console.log(err)
    // }
   console.log(`Listening on PORT ${PORT}`)
})

