const Discord = require('discord.js');
const img = require('./special_functions/gif_switch.js');
module.exports = {
	name: 'gif',
	description: 'Sends a random gif from the popular anime K-On!',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const ran = Math.floor(Math.random() * (32 - 1) + 1);

		const gif = img.findImage(ran);

		const imageEmbed = new Discord.MessageEmbed()
			.setColor('#1dde47')
			.setTimestamp()
			.setImage(`${gif}`);

		message.channel.send(imageEmbed).catch(error => {
			console.error(error);
			message.reply('There was an error, This command might not be working properly.');
		});
	},
};