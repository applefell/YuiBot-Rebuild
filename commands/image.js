const Discord = require('discord.js');
const img = require('./special_functions/image_switch');
module.exports = {
	name: 'image',
	description: 'Sends a random screenshot from the popular anime K-On!',
	cooldown: 2,
	aliases: ['pics', 'picture'],
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const ran = Math.floor(Math.random() * (989 - 1) + 1);

		const pic = img.findImage(ran);

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