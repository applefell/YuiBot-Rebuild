const Discord = require('discord.js');
const img_kon = require('./special_functions/image_switch');
const img_bocchi = require('./special_functions/bocchi_switch');
const img_imas = require('./special_functions/imas_switch');
const img_ran = require('./special_functions/randomswitch');

module.exports = {
	name: 'image',
	description: 'The new and improved image command!',
	cooldown: 5,
	aliases: ['pics', 'picture'],
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const reaction_numbers = ['\u0030\u20E3', '\u0031\u20E3', '\u0032\u20E3', '\u0033\u20E3', '\u0034\u20E3', '\u0035\u20E3', '\u0036\u20E3', '\u0037\u20E3', '\u0038\u20E3', '\u0039\u20E3'];

		const firstEmbed = new Discord.MessageEmbed()
			.setColor('#1dde47')
			.setTimestamp()
			.setTitle('Choose where you want to see a screenshot from!')
			.setDescription('Respond with the number correlating to your option!')
			.addField(`${reaction_numbers[1]}`, '[K-On!](https://myanimelist.net/anime/5680/K-On)', true)
			.addField(`${reaction_numbers[2]}`, '[Hitoribocchi no\nMarumaru Seikatsu](https://myanimelist.net/anime/37614/hitoribocchi_no_marumaru_seikatsu)', true)
			.addField(`${reaction_numbers[3]}`, '[The iDOLM@STER\nCinderella Girls](https://myanimelist.net/anime/23587/The_iDOLMSTER_Cinderella_Girls)', true)
			.addField(`${reaction_numbers[4]}`, 'Random', true);

		if(message.channel.type == 'dm') {
			message.author.send(firstEmbed);

			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });

			// eslint-disable-next-line no-shadow
			collector.on('collect', message => {
				if(message.content == '1') {
					collector.stop();

					const ran = Math.floor(Math.random() * (989 - 1) + 1);

					const pic = img_kon.findImage(ran);

					const imageEmbed = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.author.send(imageEmbed);
				// eslint-disable-next-line brace-style
				} else if(message.content == '2') {
					collector.stop();

					const ran = Math.floor(Math.random() * (60 - 1) + 1);

					const pic = img_bocchi.findBocchi(ran);

					const imageEmbed2 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.author.send(imageEmbed2);
				// eslint-disable-next-line brace-style
				} else if(message.content == '3') {
					collector.stop();

					const ran = Math.floor(Math.random() * (353 - 1) + 1);

					const pic = img_imas.findImas(ran);

					const imageEmbed3 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.author.send(imageEmbed3);
				// eslint-disable-next-line brace-style
				} else if(message.content == '4') {
					collector.stop();

					const ran = Math.floor(Math.random() * (3 - 1) + 1);

					const pic = img_ran.randomSwitchHub(ran);

					const imageEmbed4 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.author.send(imageEmbed4);
				// eslint-disable-next-line brace-style
				} else {
					collector.stop();
					message.channel.bulkDelete(2);
					message.author.send('You have to respond with an error 1-4.');
				}
			});
		// eslint-disable-next-line brace-style
		} else if(message.channel.type == 'text') {
			message.channel.send(firstEmbed);

			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });

			// eslint-disable-next-line no-shadow
			collector.on('collect', message => {
				if(message.content == '1') {
					collector.stop();
					message.channel.bulkDelete(3);

					const ran = Math.floor(Math.random() * (989 - 1) + 1);

					const pic = img_kon.findImage(ran);

					const imageEmbed = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.channel.send(imageEmbed);
				// eslint-disable-next-line brace-style
				} else if(message.content == '2') {
					collector.stop();
					message.channel.bulkDelete(3);

					const ran = Math.floor(Math.random() * (60 - 1) + 1);

					const pic = img_bocchi.findBocchi(ran);

					const imageEmbed2 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.channel.send(imageEmbed2);
				// eslint-disable-next-line brace-style
				} else if(message.content == '3') {
					collector.stop();
					message.channel.bulkDelete(3);

					const ran = Math.floor(Math.random() * (353 - 1) + 1);

					const pic = img_imas.findImas(ran);

					const imageEmbed3 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.channel.send(imageEmbed3);
				// eslint-disable-next-line brace-style
				} else if(message.content == '4') {
					collector.stop();
					message.channel.bulkDelete(3);

					const ran = Math.floor(Math.random() * (4 - 1) + 1);

					const pic = img_ran.randomSwitchHub(ran);

					const imageEmbed4 = new Discord.MessageEmbed()
						.setColor('#1dde47')
						.setTimestamp()
						.setImage(`${pic}`);

					message.channel.send(imageEmbed4);
				// eslint-disable-next-line brace-style
				} else {
					collector.stop();
					message.channel.bulkDelete(2);
					message.channel.send('You have to respond with a number 1-4.');
				}
			});
		// eslint-disable-next-line brace-style
		} else {
			message.reply('There was an error determining the channel type.');
		}
	},
};