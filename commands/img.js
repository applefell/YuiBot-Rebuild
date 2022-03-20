const Discord = require('discord.js');
const img = require('./special_functions/switches');

module.exports = {
	name: 'image',
	description: 'The new and improved image command!',
	cooldown: 5,
	aliases: ['pics', 'picture', 'img'],
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args) {
		const firstEmbed = new Discord.MessageEmbed()
			.setColor('#1dde47')
			.setTimestamp()
			.setTitle('Choose where you want to see a screenshot from!')
			.setDescription('Respond with the number correlating to your option!')
			.addField('<:Yui1:870466403910701062>', '[K-On!](https://myanimelist.net/anime/5680/K-On)', true)
			.addField('<:NakoGlasses:870466404112031804>', '[Hitoribocchi](https://myanimelist.net/anime/37614/hitoribocchi_no_marumaru_seikatsu)', true)
			.addField('<:Weh:870466404011347990>', '[Cinderella Girls](https://myanimelist.net/anime/23587/The_iDOLMSTER_Cinderella_Girls)', true)
			.addField('<:Random:870466403831013417>', 'Random', true);

		if(message.channel.type == 'dm') {
			const m = await message.channel.send(firstEmbed);
			await m.react('870466403910701062');
			await m.react('870466404112031804');
			await m.react('870466404011347990');
			await m.react('870466403831013417');

			const filter = (reaction, user) => {
				return (
					['Yui1', 'NakoGlasses', 'Weh', 'Random'].includes(reaction.emoji.name) && user.id === message.author.id
				);
			};

			m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === 'Yui1') {
						m.delete();

						const ran = Math.floor(Math.random() * (989 - 1) + 1);

						const pic = img.findImage(ran);

						const imageEmbed = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.author.send(imageEmbed);
					} else if (reaction.emoji.name === 'NakoGlasses') {
						m.delete();

						const ran = Math.floor(Math.random() * (60 - 1) + 1);

						const pic = img.findBocchi(ran);

						const imageEmbed2 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.author.send(imageEmbed2);
					} else if (reaction.emoji.name === 'Weh') {
						m.delete();

						const ran = Math.floor(Math.random() * (353 - 1) + 1);

						const pic = img.findImas(ran);

						const imageEmbed3 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.author.send(imageEmbed3);
					} else if (reaction.emoji.name === 'Random') {
						m.delete();

						const ran = Math.floor(Math.random() * (3 - 1) + 1);

						const pic = img.randomSwitchHub(ran);

						const imageEmbed4 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.author.send(imageEmbed4);
					}
				});
		} else if(message.channel.type == 'text') {
			const m = await message.channel.send(firstEmbed);
			await m.react('870466403910701062');
			await m.react('870466404112031804');
			await m.react('870466404011347990');
			await m.react('870466403831013417');

			const filter = (reaction, user) => {
				return (
					['Yui1', 'NakoGlasses', 'Weh', 'Random'].includes(reaction.emoji.name) && user.id === message.author.id
				);
			};

			m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === 'Yui1') {
						m.delete();

						const ran = Math.floor(Math.random() * (989 - 1) + 1);

						const pic = img.findImage(ran);

						const imageEmbed = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.channel.send(imageEmbed);
					} else if (reaction.emoji.name === 'NakoGlasses') {
						m.delete();

						const ran = Math.floor(Math.random() * (60 - 1) + 1);

						const pic = img.findBocchi(ran);

						const imageEmbed2 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.channel.send(imageEmbed2);
					} else if (reaction.emoji.name === 'Weh') {
						m.delete();

						const ran = Math.floor(Math.random() * (353 - 1) + 1);

						const pic = img.findImas(ran);

						const imageEmbed3 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.channel.send(imageEmbed3);
					} else if (reaction.emoji.name === 'Random') {
						m.delete();

						const ran = Math.floor(Math.random() * (3 - 1) + 1);

						const pic = img.randomSwitchHub(ran);

						const imageEmbed4 = new Discord.MessageEmbed()
							.setColor('#1dde47')
							.setTimestamp()
							.setImage(`${pic}`);

						return message.channel.send(imageEmbed4);
					}
				});
		} else {
			message.reply('There was an error determining the channel type.');
		}
	},
};