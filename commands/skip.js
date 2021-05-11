module.exports = {
	name: 'skip',
	description: 'Lets you skip 1 or more songs',
	cooldown: 5,
	guildOnly: true,
	execute(client, message, args) {
		const voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('You have to be in a voice channel to use this command!');

		if(args) {
			const num = parseInt(args[0]);
			let i = 0;
			do {
				i += 1;
				client.distube.skip(message);
			} while (i < num);
			message.channel.send(`Skipped \`${num}\` songs!`);
		// eslint-disable-next-line brace-style
		} else if (!args) {
			client.distube.skip(message);
			message.channel.send('Skipped 1 song!');
		}
	},
};