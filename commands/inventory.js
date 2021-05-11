module.exports = {
	name: 'inventory',
	description: 'Shows the inventory of you or another user!',
	cooldown: 2,
	aliases: ['inv'],
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args) {
		const { Users } = require('../index');
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if(!items.length) {
			message.channel.send(`${target.tag} has nothing!`);
		// eslint-disable-next-line brace-style
		} else {
			message.channel.send(`${target.tag} currently has:\n \`\`${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}\`\``);
		}
	},
};