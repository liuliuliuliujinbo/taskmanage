const mongoose = require('mongoose');
const schema = mongoose.Schema;
let group_schema = new schema({
	name:String,
	leader:String,
	member:Array,
	leadername:String,
	membersname:Array
})
module.exports = mongoose.model('group',group_schema);
