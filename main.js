var Discord = require('discord.js');
var path = require("path");
var config = require("./localdata/config.json");
var commando = require("discord.js-commando");
var { initializeServices, removeServices, services } = require("./services");
var utils = require("./utils");
var fs = require('file-system');
let msg;
let msgArray;
let args;
let cmd;
let commandfile;
var client = new commando.Client({
	owner: config.owners,
	commandEditableDuration: 0,
	nonCommandEditable: false,
	unknownCommandResponse: false,
	commandPrefix: "_",
});
let prefix = "_";

client.commands = new Discord.Collection();

fs.readdir("./commands/nonCommando", (err, files) => {

	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	  console.log("Couldn't find commands.");
	  return;
	}
  
  jsfile.forEach((f, i) =>{
	let props = require(`./commands/nonCommando/${f}`);
	console.log(`${f} loaded!`);
	if (props.help && props.help.name) {
	  client.commands.set(props.help.name, props);
	} else {
	  console.error(`File: ${f} does not have module.exports.help or exports.help.name property!`);
		   }
	  });
  });

client.on("message", msg => {
		 msgArray = msg.content.split(" ");
		 cmd = msgArray[0];
		 args = msgArray.slice(1);
	  
		 commandfile = client.commands.get(cmd.slice(prefix.length));
                 if(commandfile) commandfile.run(client,msg,args)
	});

client
	.on("ready", () => {
		console.log(`Logged in as ${client.user.tag} - (${client.user.id})`);
		client.user.setActivity("with sapphires!");
	})
	.on("commandError", (cmd, err) => {
		if (err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on("commandBlocked", (msg, reason) => {
		console.log(`Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""} blocked. ${reason}`);
	})
	.on("commandPrefixChange", (guild, prefix) => {
		console.log(`Prefix ${prefix === "" ? "removed" : `changed to ${prefix || "the default"}`} ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
	})
	.on("commandStatusChange", (guild, command, enabled) => {
		console.log(`Command ${command.groupID}:${command.memberName} ${enabled ? "enabled" : "disabled"} ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
	})
	.on("groupStatusChange", (guild, group, enabled) => {
		console.log(`Group ${group.id} ${enabled ? "enabled" : "disabled"} ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.`);
	});

client.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerGroups([
		["basics", "basic commands"],
		["fun", "fun commands"],
		["moderation", "moderation commands"],
		["utils", "utility commands"]
	])
	.registerCommandsIn(path.join(__dirname, "commands"));

client.login(config.bot.token);

initializeServices(client);
global.services = services;
global.utils = utils;
global.client = client;
