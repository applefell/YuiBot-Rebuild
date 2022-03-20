const Discord = require('discord.js');

module.exports = {
	name: 'vote',
	description: 'Lets you vote for the bot!',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const voteEmbed = new Discord.MessageEmbed()
			.setColor('#1dde47')
			.setTitle('Vote for the bot!')
			.setDescription('Help support the bot and its creator by voting for the bot on any of these sites!')
			.addField('', '[Top.gg](https://top.gg/bot/599102063636381717)', true)
			.addField('', '[Discord Bot List](https://discordbotlist.com/bots/yuibot)', true)
			.setTimestamp();

		message.channel.send(voteEmbed);
	},
};