const Discord = require('discord.js');
const img = require('./special_functions/cheese_switch');
module.exports = {
	name: 'cheese',
	description: 'Sends a random picture of cheese!',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const ran = Math.floor(Math.random() * (14 - 1) + 1);

		const pic = img.findCheese(ran);

		const imageEmbed = new Discord.MessageEmbed()
			.setColor('#1dde47')
			.setTimestamp()
			.setImage(`${pic}`);

		message.channel.send(imageEmbed).catch(error => {
			console.error(error);
			message.reply('There was an error, This command might not be working properly.');
		});
	},
};