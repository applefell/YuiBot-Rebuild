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

Users.prototype.addItem = async function(item) {
	const useritem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if(useritem) {
		useritem.amount += 1;
		return useritem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

Users.prototype.getItems = function() {
	return UserItems.findAll({
		where: { user_id: this.user_id },
		include: ['item'],
	});
};

Users.prototype.removeItem = async function(item) {
	const useritem = await UserItems.findOne({
		where: { huser_id: this.user_id, item_id: item.id },
	});

	if(useritem) {
		useritem.amount -= 1;
		return useritem.save();
	}
};

module.exports = { Users, Shop, UserItems };