const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users')(sequelize, Sequelize.DataTypes);
const Shop = require('./models/Shop')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems')(sequelize, Sequelize.DataTypes);

UserItems.belongsTo(Shop, { foreignKey: 'item_id', as: 'item' });

/* eslint-disable-next-line func-names */
Users.prototype.addItem = async function(item) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		userItem.amount += 1;
		return userItem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

Users.prototype.addItems = async function(item, itemAmount) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		userItem.amount += itemAmount;
		return userItem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: itemAmount });
};

Users.prototype.removeItems = async function(item, itemAmount) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	userItem.amount -= itemAmount;
	return userItem.save();
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = function() {
	return UserItems.findAll({
		where: { user_id: this.user_id },
		include: ['item'],
	});
};

/* eslint-disable-next-line func-names */
Users.prototype.checkItem = async function(item) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		return true;
	// eslint-disable-next-line brace-style
	} else {
		return false;
	}
};

Users.prototype.removeItem = async function(item) {
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	userItem.amount -= 1;
	return userItem.save();
};

module.exports = { Users, Shop, UserItems };
