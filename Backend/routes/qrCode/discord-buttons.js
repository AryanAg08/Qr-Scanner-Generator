const M1 = require("../../model/1.user");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Generate } = require("./generate");

async function Buttons(client) {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;
      
        const BID = interaction.customId;
      
              const M2 = await M1.find({
               setNew: "PENDING",
              })
              if (M2) {

                for (qq of M2) {
                    if (BID === `AP${qq.Enroll}`) {

                        Generate(qq.Enroll);
                        
                        const K4 = await M1.findOneAndUpdate({
                            Enroll: qq.Enroll,
                            setNew: "PENDING",
                        },{
                            Verified: "YES",
                        },{
                            upsert: true,
                            new: false,
                        });
                        console.log(K4);

                            
                        const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId('APPROVE')
                            .setLabel('Approve')
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(true),
                    
                            new ButtonBuilder()
                            .setCustomId('DENY')
                            .setLabel("Deny")
                            .setStyle(ButtonStyle.Danger)
                            .setDisabled(true)
                            )


                         interaction.message.edit({
                            components: [row],
                        })

                      
                        return interaction.reply("Verification Done!!");
                        
                    }

                    if (BID === `DY${qq.Enroll}`) {
                        const K4 = await M1.findOneAndUpdate({
                            Enroll: qq.Enroll,
                            setNew: "PENDING",
                        },{
                            Verified: "REJECTED",
                        },{
                            upsert: true,
                            new: false,
                        });
                        console.log(K4);

                            
                        const row = new MessageActionRow()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId('APPROVE')
                            .setLabel('Approve')
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(true),
                    
                            new ButtonBuilder()
                            .setCustomId('DENY')
                            .setLabel("Deny")
                            .setStyle(ButtonStyle.Danger)
                            .setDisabled(true)
                            )
                  

                        interaction.message.edit({
                            components: [row],
                        })

                        return interaction.reply(
                            "Verification Rejected!!"
                        )
                       
                    }
                }

            }
        });
}

module.exports = {
    Buttons
}