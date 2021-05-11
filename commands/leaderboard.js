module.exports = {
	name: 'leaderboard',
	description: 'Shows who has the most money!',
	cooldown: 2,
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute(client, message, args) {
		const { moners } = require('../index');
		message.channel.send(
			moners.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}$`)
				.join('\n'),
			{ code: true },
		);
	},
};