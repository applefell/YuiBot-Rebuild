const mongoose = require('mongoose');
const shopSchem = mongoose.Schema({
	name: String,
	cost: Number,
	usable: Number,
});

module.exports = mongoose.model('Shop', shopSchem);