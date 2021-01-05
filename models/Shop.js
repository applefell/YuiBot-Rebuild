module.exports = (sequelize, DataTypes) => {
	return sequelize.define('shop', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		shop_id: {
			type: DataTypes.STRING,
			unique: true,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		usable: DataTypes.BOOLEAN,
	}, {
		timestamps: false,
	});
};