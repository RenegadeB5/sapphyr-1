var { Command } = require('discord.js-commando');
var { RichEmbed } = require('discord.js');

module.exports = class SayCommand extends global.utils.baseCommand {
    constructor(client){
        super(client, {
            name: 'say',
            memberName: 'say',
            group: 'fun',
            description: 'Make the bot say something.',
            args: [
                {
                    key: 'context',
                    prompt: 'Text the bot replies with.',
                    type: 'string',
                    default: 'You did not specify what to say, so I said this.'
                }
            ]
        })
    }
    async task(ctx) {
        let embed = new RichEmbed()
        .setDescription(ctx.args.context);
        ctx.message.delete();
    return await ctx.message.channel.send(embed);
    }
}