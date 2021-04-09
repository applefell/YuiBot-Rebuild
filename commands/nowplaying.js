module.exports = {
	name: 'nowplaying',
	description: 'Tells you what song is currently playing!',
	cooldown: 3,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if(!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: ${serverQueue[0].title}`);
	},
};