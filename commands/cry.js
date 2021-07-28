const Discord = require('discord.js');
const cry = require('./special_functions/switches');

module.exports = {
	name: 'cry',
	description: 'Lets you cry!',
	cooldown: 2,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const ran = Math.floor(Math.random() * (8 - 1) + 1);
		const target1 = message.mentions.members.first();
		const bot = message.client.user;
		const author = message.author;

		if(target1) {
			const img = cry.findCry(ran);
			const target2 = message.mentions.members.first().user;
			const embed = new Discord.MessageEmbed()
				.setColor('#0000ff')
				.setTimestamp()
				.setTitle(`${target2.username} made ${author.username} cry!`)
				.setImage(`${img}`);
			message.channel.send(embed);
			client.Users.findOne({
				user_id: message.author.id,
			}, (err, data) => {
				if (err) client.logger.log('error', client.chalk.redBright(err));
				if (!data) {
					const newData = new client.Users({
						user_id: message.author.id,
						balance: 0,
						xp: 0,
						level: 0,
						xp_cooldown: 900000000,
						hugs: 0,
						punches: 0,
						cries: 1,
					});
					newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				} else if (data) {
					data.cries += 1;
					data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				}
			});
		} else if(!target1) {
			const img = cry.findCry(ran);
			const embed = new Discord.MessageEmbed()
				.setColor('#0000ff')
				.setTimestamp()
				.setTitle(`${author.username} made ${bot.username} cry!`)
				.setImage(`${img}`);
			message.channel.send(embed);
		}
	},
};