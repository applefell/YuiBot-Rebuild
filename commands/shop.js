module.exports = {
	name: 'shop',
	description: 'Shows you what is currently in the shop.',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	async execute(message, args) {
		const { Shop } = require('../index');
		const items = await Shop.findAll();
		message.channel.send(items.map(i => `${i.name}: ${i.cost} to buy: ${i.item_id}`).join('\n'), { code: true });
	},
};