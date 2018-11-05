var { Command } = require('discord.js-commando');
var { RichEmbed } = require('discord.js');

module.exports = class FakeBanCommand extends global.utils.baseCommand {
    constructor(client){
        super(client, {
            name: 'fakeban',
            memberName: 'fakeban',
            group: 'fun',
            description: 'Fake ban a guild member.',
            args: [
                {
                    key: 'user',
                    prompt: 'The user to fakeban.',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'The reason for the fakeban.',
                    type: 'string',
                    default: 'N/A'
                }
            ]
        })
    }
    async task(ctx) {
        if (!ctx.args.user) return await ctx.message.channel.send("No user was specified for the fakeban.");
        let embed = new Discord.RichEmbed()
        .setTitle("User Banned.")
        .setDescription(`${ctx.args.user} has been ~~fake~~ banned from ${ctx.message.guild.name}.`)
        .addField("Banned user", ctx.args.user)
        .addField("Action by:", ctx.message.author)
        .addField("Reason", ctx.args.reason);
    return await ctx.message.channel.send(embed);
    }
}