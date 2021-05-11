const { moners } = require('../index');

module.exports = {
	name:'transfer',
	description: 'Lets you send money to someone else.',
	cooldown: 2,
	args: true,
	guildOnly: true,
	execute(client, message, args) {
		// eslint-disable-next-line no-undef
		const currentAmount = moners.getBalance(message.author.id);
		const transferAmount = args.find(arg => !/<@!?\d+>/.test(arg));
		const transferTarget = message.mentions.users.first();

		if(!transferAmount || isNaN(transferAmount)) message.channel.send('You can\'t transfer that much money');
		if(transferAmount > currentAmount) message.channel.send('You do not have that much money');
		if(transferAmount <= 0) message.channel.send('You have to send an amount greater than 0');

		moners.add(message.author.id, -transferAmount);
		moners.add(transferTarget.id, transferAmount);

		message.channel.send(`Sent ${transferAmount}$ to ${transferTarget.tag}.`);
	},
};