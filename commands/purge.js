module.exports = {
	name: 'purge',
	description: 'deletes up to 99 messages from up to two weeks ago.',
	guildOnly: true,
	args: true,
	usage: 'number 1-99',
	execute(message, args) {
		if(message.member.hasPermission('MANAGE_MESSAGES')) {
			const amount = parseInt(args[0]) + 1;

			if(isNaN(amount)) {
				return message.channel.send('That is not a valid number, remember to choose a number between 1 and 99!');
				// eslint-disable-next-line brace-style
			} else if(amount <= 1 || amount > 100) {
				return message.channel.send('you need to input a number between 1 and 99!');
			}

			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send('An error has occured while trying to delete messages.');
			});
		// eslint-disable-next-line brace-style
		} else {
			message.channel.send('You do not have permission to use this command.');
		}
	},
};