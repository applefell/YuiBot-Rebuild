const mongoose = require('mongoose');
const userSchem = mongoose.Schema({
	user_id: String,
	balance: Number,
	xp: Number,
	level: Number,
	xp_cooldown: Number,
	hugs: Number,
	punches: Number,
	cries: Number,
});

module.exports = mongoose.model('Users', userSchem);