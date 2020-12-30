module.exports = {
	name: 'skip',
	description: 'Skips the song that is currently playing.',
	guildOnly: true,
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if(!message.member.voice.channel) return message.channel.send('You have to be in a VC to use this command');
		if(!serverQueue) return message.channel.send('There are no songs to skip.');
		serverQueue.connection.dispatcher.end();
	},
};