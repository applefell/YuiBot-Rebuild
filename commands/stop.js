module.exports = {
	name: 'stop',
	description: 'Stops playing music.',
	guildOnly: true,
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if(!message.member.voice.channel) return message.channel.send('You have to be in a VC to use this command.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};