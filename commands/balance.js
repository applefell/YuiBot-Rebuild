module.exports = {
	name: 'balance',
	description: 'Tells you your balance!',
	cooldown: 2,
	aliases: ['bal'],
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const { moners } = require('../index');
		const money = moners.getBalance(message.author.id);
		message.channel.send(`${message.author.tag} has ${money}$`);
	},
};