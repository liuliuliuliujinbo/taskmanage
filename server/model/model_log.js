const mongoose = require('mongoose');
const schema = mongoose.Schema;
let log_schema = new schema({
	group:String,//所属组别
	incharge:Array,//负责人
	oldtask:String,//修改前任务id
	olddes:String,//修改前任务描述
	newtask:String,//修改后任务id
	newdes:String,//修改后任务描述
	time:String//修改时间
});
module.exports = mongoose.model('log',log_schema);