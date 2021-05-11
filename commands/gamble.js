/* eslint-disable brace-style */
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
		// get users balance and make sure that they aint spending more than they got, that means you IronicallyUncreative
		const { moners } = require('../index');
		const userAmount = moners.getBalance(message.author.id);
		const gambleAmount = Number(args);
		// make sure people gamble money instead of strings
		if(typeof gambleAmount === 'number') {
			if(gambleAmount === 0) {
				return message.channel.send('You have to gamble at least $1.')
			} else if(gambleAmount <= 1) {
				// actually check how much they got to what they gamblin
				if(gambleAmount > userAmount) {
					message.channel.send('You can\'t gamble more money than you have!');
				} else if(gambleAmount < userAmount) {
					// generate random numbers to gamble with
					const ran1 = Math.floor(Math.random() * (15 - 1) + 1);
					const ran2 = Math.floor(Math.random() * (15 - 1) + 1);
					const ran3 = Math.floor(Math.random() * (15 - 1) + 1);

					// 1-5 = apple, 6-9 = cherry, 10-12 = melon, 13-14 = cheese, 15 = burger
					// get rid of money spent
					moners.add(message.author.id, -gambleAmount);

					// convert number to fruit
					const ran1Fruit = gamble.gambleRoll(ran1);
					const ran2Fruit = gamble.gambleRoll(ran2);
					const ran3Fruit = gamble.gambleRoll(ran3);

					// convert number into value
					const ran1Value = gamble.gambleValue(ran1);
					const ran2Value = gamble.gambleValue(ran2);
					const ran3Value = gamble.gambleValue(ran3);

					// get number for math from value
					const mult = gamble.payout(ran1Value, ran2Value, ran3Value);

					// calculate winnings
					let winnings = gambleAmount * mult;

					// round winnings up to two decimal places
					let winnings = winnings.toFixed(2);

					// give user winnings
					moners.add(message.author.id, winnings);

					// choose color for embed
					const color = gamble.color(mult);

					// choose title for embed
					const titleRan = Math.floor(Math.random() * (3 - 1) + 1);
					const title = gamble.title(titleRan);

					// send message showing results
					const embed = new Discord.MessageEmbed()
						.setColor(`${color}`)
						.setTimestamp()
						.setTitle(`${title}`)
						.setDescription(`${ran1Fruit}${ran2Fruit}${ran3Fruit}`);

					message.channel.send(embed);

					// send message showing winnings
					if(mult == 0) {
						message.channel.send('You did not win any money, maybe next time!');
					// eslint-disable-next-line brace-style
					} else {
						message.channel.send(`You won ${winnings}!`);
					}
				} else {
					message.channel.send('An error has occured.');
				}
			}
		} else {
			message.channel.send('You have to gamble money!');
		}
	},
};