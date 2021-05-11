module.exports = {
	name: 'queue',
	description: 'Shows the queue of songs!',
	cooldown: 3,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const queue = client.distube.getQueue(message);

		if(!queue) return message.channel.send('There is nothing in the queue!');

		message.channel.send('Current queue:\n' + queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\``).slice(0, 10).join('\n'));
	},
};