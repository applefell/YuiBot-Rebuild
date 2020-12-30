const Keyv = require('keyv');
const prefixes = new Keyv('sqlite://./database.sqlite');

module.exports = {
	name: 'prefix',
	description: 'changes the bots prefix on your server!',
	args: true,
	guildOnly: true,
	async execute(message, args) {
		const ownerID = message.guild.ownerID;
		if(message.author.id == ownerID) {
			await prefixes.set(message.guild.id, args[0]);
			message.channel.send(`Successfully ser prefix to \`${args[0]}\``);
		// eslint-disable-next-line brace-style
		} else {
			message.channel.send('Only the server owner can change the prefix!');
		}
	},
};