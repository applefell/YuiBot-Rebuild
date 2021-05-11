module.exports = {
	name: 'play',
	description: 'Lets you play music in a vc!',
	cooldown: 5,
	args: true,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('You have to be in a voice channel to use this command!');

		client.distube.play(message, args.join(' '));
	},
};