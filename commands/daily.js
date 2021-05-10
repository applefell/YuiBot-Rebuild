module.exports = {
	name: 'daily',
	description: 'Gives you some cash every 24 hours!',
	cooldown: 86400,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const add = Math.floor(Math.random() * (100 - 1) + 1);
		const { moners } = require('../index');

		moners.add(message.author.id, add);
		message.channel.send(`You found $${add}!`);
	},
};