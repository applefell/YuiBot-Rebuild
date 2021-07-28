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
						punches: 1,
						cries: 0,
					});
					newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				} else if (data) {
					data.punches += 1;
					data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				}
			});
		} else if(!target1) {
			message.channel.send('You have to tag a user!');
		}
	},
};