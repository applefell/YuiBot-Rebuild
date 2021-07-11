const mongoose = require('mongoose');
const serverSchem = mongoose.Schema({
	server_id: String,
	prefix: String,
	allowInvites: Number,
});

module.exports = mongoose.model('Servers', serverSchem);