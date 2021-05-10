module.exports = {
	name: 'ban',
	description: 'bans a member.',
	cooldown: 1,
	guildOnly: true,
	args: true,
	usage: 'user to be banned',
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		if(message.member.hasPermission('BAN_MEMBERS')) {
			const toBeBannedUser = message.mentions.users.first();
			if(toBeBannedUser) {
				const toBeBannedMember = message.guild.member(toBeBannedUser);
				if(toBeBannedMember) {
					toBeBannedMember.ban('Banned by YuiBot').then(() => {
						message.channel.send(`Successfully kicked ${toBeBannedUser.tag}`);
					}).catch(err => {
						message.channel.send('I am unable to ban that member.');
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
			message.channel.send('You don\'t have permission to ban members!');
		}
	},
};