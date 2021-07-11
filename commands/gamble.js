const gamble = require('./special_functions/switches');
const Discord = require('discord.js');

module.exports = {
	name: 'gamble',
	description: 'Try your luck and maybe earn some money!',
	cooldown: 5,
	args: true,
	usage: '(amount to gamble)',
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		// Gather user data
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
					xp_cooldown: Date.now(),
					hugs: 0,
					punches: 0,
					cries: 0,
				});
				newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				return message.channel.send('You can\'t gamble more money than you have!');
			} else if (data) {
				// Get amount to be gambled
				const gambleAmount = Number(args[0]);

				// Make sure gambleAmount is a number
				if (typeof gambleAmount === 'number') {
					// Make sure people do not gamble 0
					if (gambleAmount === 0) {
						message.channel.send('You have to gamble at least $1');
					} else if (gambleAmount >= 1) {
						// Check to see if the user can afford to gamble that much
						if (gambleAmount > data.balance) {
							message.channel.send('You can\'t gamble more money than you have!');
						} else if (gambleAmount < data.balance) {
							// Generate random numbers to gamble with
							const ran1 = Math.floor(Math.random() * (15 - 1) + 1);
							const ran2 = Math.floor(Math.random() * (15 - 1) + 1);
							const ran3 = Math.floor(Math.random() * (15 - 1) + 1);

							// Get rid of money spent
							data.balance -= gambleAmount;

							// Convert random numbers into fruit
							const ran1Fruit = gamble.gambleRoll(ran1);
							const ran2Fruit = gamble.gambleRoll(ran2);
							const ran3Fruit = gamble.gambleRoll(ran3);

							// Convert random numbers into value
							const ran1Value = gamble.gambleValue(ran1);
							const ran2Value = gamble.gambleValue(ran2);
							const ran3Value = gamble.gambleValue(ran3);

							// Get number for math from value
							const mult = gamble.payout(ran1Value, ran2Value, ran3Value);

							// Calculate winnings
							const winnings = gambleAmount * mult;

							// Give user winnings
							data.balance += winnings;

							// Choose color for embed
							const color = gamble.color(mult);

							// Choose title for embed
							const titleRan = Math.floor(Math.random() * (3 - 1) + 1);
							const title = gamble.title(titleRan);

							// Send message showing results
							const embed = new Discord.MessageEmbed()
								.setColor(`${color}`)
								.setTimestamp()
								.setTitle(`${title}`)
								.setDescription(`${ran1Fruit}${ran2Fruit}${ran3Fruit}`);

							message.channel.send(embed);

							// Send message showing winnings
							if(mult == 0) {
								message.channel.send('You did not win any money, maybe next time!');
							} else {
								message.channel.send(`You won ${winnings}`);
							}
							data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
						}
					}
				} else {
					message.channel.send('You have to gamble money!');
				}
			}
		});
	},
};