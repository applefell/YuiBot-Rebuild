module.exports = {
	name: 'loop',
	aliases: ['repeat'],
	description: 'Changes repeat mode',
	cooldown: 5,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('You have to be in a voice channel to use this command!');

		let mode = client.distube.setRepeatMode(message, parseInt(args[0]));

		mode = mode ? mode == 2 ? 'Repeat queue' : 'Repeat song' : 'Off';

		message.channel.send(`Set repeat mode to \`${mode}\``);
	},
};