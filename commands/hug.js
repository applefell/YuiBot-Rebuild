const Discord = require('discord.js');
const hug = require('./special_functions/switches');

module.exports = {
	name: 'hug',
	description: 'Lets you hug a user, or the bot!',
	cooldown: 2,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const ran = Math.floor(Math.random() * (9 - 1) + 1);
		const target1 = message.mentions.members.first();
		const bot = message.client.user;
		const author = message.author;

		if(target1) {
			const img = hug.findHug(ran);
			const target2 = message.mentions.members.first().user;
			const embed = new Discord.MessageEmbed()
				.setColor('#ffc0cb')
				.setTitle(`${author.username} hugged ${target2.username}!`)
				.setTimestamp()
				.setImage(`${img}`);
			message.channel.send(embed);
		} else if(!target1) {
			const img = hug.findHug(ran);
			const embed = new Discord.MessageEmbed()
				.setColor('#ffc0cb')
				.setTitle(`${author.username} hugged ${bot.username}!`)
				.setTimestamp()
				.setImage(`${img}`);
			message.channel.send(embed);
		}
	},
};