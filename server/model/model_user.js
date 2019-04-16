const mongoose = require('mongoose');
const schema = mongoose.Schema;
let user_schema = new schema({
	email:String,
	password: String,
	name:String,
	role: Number
});
module.exports = mongoose.model('user',user_schema);