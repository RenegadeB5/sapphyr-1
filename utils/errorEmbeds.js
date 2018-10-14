const Discord = require('discord.js');

module.exports.nullUser = (usage) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Missing Arguments")
    .addField("Missing `user` Argument", usage);
    msg.channel.send(embed).then(msg => msg.delete(4000));
}

module.exports.higherRole = (usage) => {
    let embed = new Discord.RichEmbed()
    .setTitle("User has higher permission.")
    .setDescription("Mentioned user has higher or same permissions.");
    msg.channel.send(embed).then(m => m.delete(4000));
}

module.exports.botUser = (usage, action) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Cannot perform action on bot user.`)
    .setDescription(`Cannot perform action: ${action} on bot user.`);
    msg.channel.send(embed).then(m => m.delete(4000));
}

module.exports.techIssue = (contact) => {
    let embed = new Discord.RichEmbed()
    .setTitle("There was an issue on our side.")
    .setDescription("We had an issue on our side, feel free to contact the developers.");
    msg.channel.send(embed).then(m => m.delete(4000));
}

module.exports.missingPerms = (perms) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Missing user permissions.")
    .setDescription(`You are missing permission: ${perms}.`);
    msg.channel.send(embed).then(m => m.delete(4000));
}