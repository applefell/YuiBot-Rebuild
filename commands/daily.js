module.exports = {
	name: 'daily',
	description: 'Gives you some cash every 24 hours!',
	cooldown: 86400,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const add = Math.floor(Math.random() * (100 - 1) + 1);

		client.Users.findOne({
			user_id: message.author.id,
		}, (err, data) => {
			if (err) client.logger.log('error', client.chalk.redBright(err));
			if (!data) {
				// Should not be possible but just in case
				const newData = new client.Users({
					user_id: message.author.id,
					balance: add,
					xp: 0,
					level: 0,
					xp_cooldown: 900000000,
					hugs: 0,
					punches: 0,
					cries: 0,
				});
				newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
			} else if (data) {
				data.balance += add;
				data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
			}
		});
		message.channel.send(`You found $${add}!`);
	},
};