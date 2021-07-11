module.exports = {
	name: 'shop',
	description: 'Shows you what is currently in the shop.',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args) {
		message.channel.send('cake: $5\ntea: $1\ncoffee: $2', { code: true });
	},
};