const Discord = require("discord.js");

module.exports.enforcement = (user, reason, author, type) => {
    let guild = msg.guild.name;
    if(!reason) {
        reason = "N/A"
    };
    let dmEnforced = new Discord.RichEmbed()
    .setTitle(`You've been ${type} from ${guild}.`)
    .setDescription(`You have been ${type} from ${guild} with reason ${reason}.`);
    let startType = type.charAt(0).toUpperCase() + type.slice(1);
    let embed = new Discord.RichEmbed()
    .setTitle(`${user} has been ${type}.`)
    .setDescription(`${user} has been successfully ${type}.`);
    let logBan = new Discord.RichEmbed()
    .setTitle(`${user} has been ${type}.`)
    .addField(`${startType} User:`, user)
    .addField("Action by:", author, true)
    .addField("Reason:", reason, true)
    .setTimestamp();
    msg.channel.send(embed);
    msg.guild.channels.find("name", "sapphyr-modlogs").send(logBan);
    user.send(dmEnforced);
}