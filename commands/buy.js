const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: '../database.sqlite',
});

const { Op } = require('sequelize');

const Shop = require('../models/Shop')(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'buy',
	description: 'Buy stuff with your moners',
	cooldown: 2,
	// eslint-disable-next-line no-unused-vars
	async execute(message, args, Users, moners) {
		message.channel.send(`${Shop}`);
		const item = await Shop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > moners.getBalance(message.author.id)) {
			return message.channel.send(`You currently have ${moners.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		moners.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought: ${item.name}.`);
	},
};