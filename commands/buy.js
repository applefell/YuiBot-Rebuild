module.exports = {
	name: 'buy',
	description: 'lets you spend your moners for some things',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	async execute(message, args) {
		const { Op, Shop, Users, moners } = require('../index');
		const item = await Shop.findOne({ where: { name: { [Op.like]: args } } });
		if(!item) message.channel.send('that item does not exist.');
		if(item.cost > moners.getBalance(message.author.id)) {
			message.channel.send('You do not have enough money');
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		moners.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You have bought ${item.name}`);
	},
};