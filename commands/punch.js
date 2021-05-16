const Discord = require('discord.js');
const punch = require('./special_functions/switches');

module.exports = {
	name: 'punch',
	description: 'Lets you punch a user!',
	cooldown: 2,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const ran = Math.floor(Math.random() * (8 - 1) + 1);
		const target1 = message.mentions.members.first();
		const author = message.author;

		if(target1) {
			const img = punch.findPunch(ran);
			const target2 = message.mentions.members.first().user;
			const embed = new Discord.MessageEmbed()
				.setColor('#dc143c')
				.setTitle(`${author.username} punched ${target2.username}!`)
				.setTimestamp()
				.setImage(`${img}`);
			message.channel.send(embed);
		// eslint-disable-next-line brace-style
		} else if(!target1) {
			message.channel.send('You have to tag a user!');
		}
	},
};