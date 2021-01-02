const { moners } = require('../index');

module.exports = {
	name: 'balance',
	description: 'Tells you your balance or someone elses balance!',
	cooldown: 2,
	aliases: ['bal'],
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		const money = moners.getBalance(target.id);
		message.channel.send(`${target.tag} has ${money}$`);
	},
};