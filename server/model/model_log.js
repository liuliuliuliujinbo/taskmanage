const mongoose = require('mongoose');
const schema = mongoose.Schema;
let log_schema = new schema({
	group:String,//所属组别
	incharge:Array,//负责人
	oldtask:String,//修改前任务id
	newtask:Array//修改后任务id
});
module.exports = mongoose.model('log',log_schema);