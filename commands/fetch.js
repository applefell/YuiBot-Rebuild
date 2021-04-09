const Booru = require('booru');
const Discord = require('discord.js');

module.exports = {
	name: 'fetch',
	description: 'Fetches an image from safebooru based on the tag you choose!',
	cooldown: 10,
	usage: '(tag)',
	aliases: ['booru'],
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		// try to make sure that the tag is in the right format, no guarantees
		const tag = String(args[0]).toLowerCase();

		// check if there are more than 1 args being passed
		if(args[1]) {
			message.channel.send('For now you can only use one tag at a time.\nFor help on how tags work go here: https://safebooru.donmai.us/wiki_pages/help:posts');
		} else {
			const url = Booru.search('safebooru', [`${tag}`], { limit: 1, random: true })
				.then(posts => {
					for (let post of posts)
						return post.fileUrl;
				});

			const imageEmbed = new Discord.MessageEmbed()
				.setColor('#1dde47')
				.setTimestamp()
				.setImage(`${url}`);
			
			message.channel.send(imageEmbed);
		}
	},
};