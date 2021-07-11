module.exports = {
	name: 'prefix',
	description: 'changes the bots prefix on your server!',
	args: true,
	guildOnly: true,
	async execute(client, message, args) {
		const ownerID = message.guild.ownerID;
		const prefix = args[0];
		if (message.author.id == ownerID) {
			client.Servers.findOne({
				server_id: message.guild.id,
			}, (err, data) => {
				if (err) client.logger.log('error', client.chalk.redBright(err));
				if (!data) {
					// Shouldn't be possible but just in case
					const newData = new client.Servers({
						server_id: message.guild.id,
						prefix: prefix,
						allowInvites: 1,
					});
					newData.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
				} else if (data) {
					if (data.prefix === prefix) {
						message.channel.send('That is already the server prefix!');
					} else if (data.prefix != prefix) {
						data.prefix = prefix;
						data.save().catch(err => client.logger.log('error', client.chalk.redBright(err)));
						message.channel.send(`Server prefix set to ${prefix}`);
					}
				}
			});
		} else {
			message.channel.send('Only the server owner can change the prefix!');
		}
	},
};