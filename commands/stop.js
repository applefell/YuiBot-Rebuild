module.exports = {
	name: 'stop',
	description: 'Makes the bot stop playing music!',
	cooldown: 3,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args) {
		if(!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to use this command!');

		const queue = await client.distube.getQueue(message);

		if(queue) {
			client.distube.stop(message);
			message.channel.send('Stopped playing music!');
		// eslint-disable-next-line brace-style
		} else if(!queue) {
			return;
		}
	},
};