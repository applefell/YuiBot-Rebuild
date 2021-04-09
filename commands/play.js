const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'plays a song in your vc',
	args: true,
	guildOnly: true,
	cooldown: 5,
	usage: 'link',
	async execute(message) {
		try {
			const args = message.content.split(' ');
			const queue = message.client.queue;
			const serverQueue = message.client.queue.get(message.guild.id);

			const voiceChannel = message.member.voice.channel;
			if(!voiceChannel) return message.channel.send('You need to be in a VC to play music.');

			const permissions = voiceChannel.permissionsFor(message.client.user);
			if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send('I don\'t have permission to join or speak in your VC.');

			const songInfo = await ytdl.getInfo(args[1]);
			const song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
			};

			// should hopefully catch songs that return as null before adding it to the queue
			if(song.url === null) {
				message.channel.send('There was a problem while trying to play that song, make sure the url is correct.');
				return;
			}

			if(!serverQueue) {
				const queueConstruct = {
					textChannel: message.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true,
				};

				queue.set(message.guild.id, queueConstruct);

				queueConstruct.songs.push(song);

				try {
					const connection = await voiceChannel.join();
					queueConstruct.connection = connection;
					this.play(message, queueConstruct.songs[0]);
				// eslint-disable-next-line brace-style
				} catch(err) {
					console.log(err);
					queue.delete(message.guild.id);
					return message.channel.send('An error occured.');
				}
			// eslint-disable-next-line brace-style
			} else {
				serverQueue.songs.push(song);
				return message.channel.send(`${song.title} was added to the queue!`);
			}
		// eslint-disable-next-line brace-style
		} catch(error) {
			console.log(error);
			message.channel.send('An error occured.');
		}
	},

	play(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);

		if(!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection
			.play(ytdl(song.url))
			.on('finish', () => {
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
			}).on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		serverQueue.textChannel.send(`Started playing: **${song.title}**`);
	},
};