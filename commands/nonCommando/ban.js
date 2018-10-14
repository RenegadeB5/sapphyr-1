const Discord = require('discord.js');
const errors = require('../../localdata/errorEmbeds.js');
const enforce = require('../../localdata/punishments.js');

exports.run = async (client,msg,args) => {
    if(msg.member.hasPermission("BAN_MEMBERS")) return errors.missingPerms("BAN_MEMBERS");
    let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    try {
    if(!bUser) return errors.nullUser("_ban @mention <reason>");
    if(bUser.hasPermission("BAN_MEMBERS")) return errors.higherRole("null");
    let reason = args.join(" ").slice(1);
    if(!reason) {
        reason = "N/A"
    };
    let enforcer = msg.author.tag;
    if(bUser, reason){
      await msg.guild.member(bUser).ban(reason);
      return enforce.enforcement(bUser, reason, enforcer, "banned.");
    }
  }catch(e) {
      console.error(e.stack);
  }
}
exports.help = {
    name: "ban"
}
