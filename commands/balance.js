module.exports = {
	name: 'balance',
	description: 'Tells you your balance!',
	cooldown: 2,
	aliases: ['bal'],
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
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
				message.channel.send('You do not have any money!');
			}
			if (data) {
				message.channel.send(`You have $${data.balance}!`);
			}
		});
	},
};