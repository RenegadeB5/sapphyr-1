var { Command } = require("discord.js-commando");
var Discord = require('discord.js');

module.exports = class AvatarCommand extends global.utils.baseCommand {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "gets user avatar",
            group: "fun",
            memberName: "avatar",
            args: [
                {
                    key: 'user',
                    prompt: 'The user in which avatar is displayed.',
                    type: 'user',
                    default: 'self'
                }
            ]
        });
    }

    async task(ctx) {
        let aUser = ctx.args.user === "self" ? ctx.message.author : ctx.args.user;
            let embed = new Discord.RichEmbed()
            .setDescription(`Avatar of ${aUser}.`)
            .setImage(aUser.displayAvatarURL);
        return await ctx.message.channel.send(embed);
    }
}