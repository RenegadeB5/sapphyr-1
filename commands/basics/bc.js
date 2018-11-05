var { Command } = require('discord.js-commando');
var { RichEmbed } = require('discord.js');

module.exports = class BotClearCommand extends global.utils.baseCommand {
  constructor(client) {
    super(client, {
      name: 'bc',
      memberName: 'bc',
      group: 'basics',
      description: 'Clear bot messages. Optional amount of messages to scan.',
      args: [
        {
          key: 'scan',
          prompt: 'Number of messages to scan.',
          type: 'integer',
          default: '25',
        }
      ]
    })
  }
  async task(ctx) {
    let embedd = new RichEmbed()
    .setTitle("No Integer")
    .setDescription("Please specify an integer of numbers to scan.");
    if(isNaN(ctx.args.scan)) return ctx.message.channel.send(embedd);
    ctx.message.channel.fetchMessages({limit: ctx.args.scan}).then(messages => {
      const botMessages = messages.filter(message => message.author.bot);
      ctx.message.channel.bulkDelete(botMessages);
      let messagesDeleted = botMessages.array().length;
    let embed = new RichEmbed()
    .setTitle("Success.")
    .setDescription(`Successfully deleted ${messagesDeleted} bot messages from ${ctx.message.channel.name}.`);
  return ctx.message.channel.send(embed);
   });
  }
}