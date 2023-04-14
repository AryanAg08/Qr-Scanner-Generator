// write a function which runs every 1 minute and fetch data from mongodb
const M1 = require("../../model/1.user");
const { Generate } = require("./generate");

async function NEWReq (client) {
    const schedule = require("node-schedule");
    const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
    const channel = client.channels.cache.get("1089078303102599258");
   // var j = schedule.scheduleJob("*/1 * * * *", async function () {
        const M2 = await M1.find({
            setNew: "YES",
            Verified: "NO",
        })
        if (M2) {
            for (tt of M2) {
                const Enrollment = tt.Enroll;
                const Mail = tt.MailID;
                const Name = tt.Name;
                const Year = tt.year;
                const MobileNo = tt.Mobile;
                const PaidImg = tt.Paid;

                const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`AP${Enrollment}`)
					.setLabel('Approve')
					.setStyle(ButtonStyle.Success),
			
                    new ButtonBuilder()
                    .setCustomId(`DY${Enrollment}`)
                    .setLabel("Deny")
                    .setStyle(ButtonStyle.Danger),

                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(PaidImg)
                    .setLabel("Payment")
                    );
                    

                const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Payment request 📨')
	.setDescription(`**Name:** ${Name} \nMailID: ${Mail} \nEnrollnment Number: ${Enrollment} \nYear: ${Year} \nMobile Number: ${MobileNo}`)
	    //    .setImage('https://i.imgur.com/AfFp7pu.png')
	       .setTimestamp()
	     .setFooter({ text: 'Vivy Bot'});

      const IID = await channel.send({ embeds: [exampleEmbed], components: [row] });


          const M34 = await M1.findOneAndUpdate({
        Enroll: Enrollment,
    },{
        setNew: "PENDING",
        EMbedID: `AP${Enrollment}`,
    },{
        upsert: true,
        new: true,
    });
    console.log(M34);


            }
        }
   // })
}

async function MSG (client) {
    client.on("messageCreate", async message => {
        const { guild, user } = message;
        const Z1 = require("../../model/1.user");
    
            if (message.content === "!test") {
                console.log("TRYYY!!");
               // tryyy();
               Generate("3e4r5t6");
                message.channel.send("HELLO WORKLD");
            }

            if (message.content === "!Change") {
                console.log("Changing Qrs");
                
                const Z2 = await Z1.updateMany({
                    Verified: "YES",
                }, {
                    QRUsed: "NO",
                },{
                    upsert: true,
                    new: false,
                });
                console.log(Z2);
            }

            if (message.content === "!SendReq") {
                NEWReq(client);
            }
     });
  	}

async function tryyy () {
    const M34 = await M1.findOneAndUpdate({
        Enroll: "22103092",
    },{
        Name: "ARYAN",
        year: "1st",
        Mobile: "99XXXXXXXX",
        Branch: "B4",
        Paid: "IMG",
        ScannedBY: "ARYAN",
        setNew: "YES",
        Verified: "NO",
        MailID: "arya23456@example.com",
        PaidRS: "150",
    },{
        upsert: true,
        new: true,
    });
    console.log(M34);
    console.log("HELLO");
}

async function SCANRESULT (enroll) {
    const Roll = enroll.Email
    // {Email: "http://364387645"}
    const eroll = Roll.split("://");
    console.log(eroll);

    const Y1 = 'Success';
  //  try {
  await M1.find({
        Enroll: eroll[1],
        QRUsed: "NO",
        Verified: "YES"
    })
    .then (data => {
        console.log(data);
        if (true) {
            return Y1;
        }
        else {
            return null;
        }
    }).catch(error => {
        console.log(error);
        })
// }
// catch (err) {
//         console.log(err)
//     }
    // promise{<pending>}
    // .then (async data => {
    //     if (data) {
    //         const M3 = await M1.findOneAndUpdate({
    //             Enroll: eroll[1],
    //         },{
    //             QRUsed: "YES",
    //         },{
    //             upsert: true,
    //             new: false,
    //         })
    //       return "Success!!";
    //     }
    //     else return null;
    // }
    // )
}

module.exports = {
    NEWReq,
    tryyy,
    MSG,
    SCANRESULT,
}