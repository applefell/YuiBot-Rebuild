module.exports = {
	name: 'say',
	description: 'Makes the bot say something.',
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const messageResend = args.join(' ');
		message.channel.send(messageResend);
	},
};