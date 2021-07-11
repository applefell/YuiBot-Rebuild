const mongoose = require('mongoose');
const itemSchem = mongoose.Schema({
	user_id: String,
	coffee: Number,
	tea: Number,
	cake: Number,
});

module.exports = mongoose.model('UserItems', itemSchem);