module.exports = {
	name: 'kick',
	description: 'kicks a member.',
	cooldown: 1,
	guildOnly: true,
	args: true,
	usage: 'user to be kicked',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		if(message.member.hasPermission('KICK_MEMBERS')) {
			const toBeKickedUser = message.mentions.users.first();
			if(toBeKickedUser) {
				const toBeKickedMember = message.guild.member(toBeKickedUser);
				if(toBeKickedMember) {
					toBeKickedMember.kick('Banned by YuiBot').then(() => {
						message.channel.send(`Successfully kicked ${toBeKickedUser.tag}`);
					}).catch(err => {
						message.channel.send('I am unable to kick that member.');
						console.error(err);
					});
				// eslint-disable-next-line brace-style
				} else {
					message.channel.send('That member is not in this server.');
				}
			// eslint-disable-next-line brace-style
			} else {
				message.channel.send('You need to mention a user!');
			}
		// eslint-disable-next-line brace-style
		} else {
			message.channel.send('You don\'t have permission to kick members!');
		}
	},
};