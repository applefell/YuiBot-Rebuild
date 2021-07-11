module.exports = {
	name: 'say',
	description: 'Makes the bot say something.',
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		if(args) {
			const messageResend = args.join(' ');
			message.channel.send(messageResend);
		} else if(!args) {
			message.channel.send('_ _');
		}
	},
};