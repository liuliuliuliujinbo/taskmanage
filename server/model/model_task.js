const mongoose = require('mongoose');
const schema = mongoose.Schema;
let task_schema = new schema({
	incharge:String,//负责人id
	description:String,//任务描述
	join:String,//参与人id
	start:String, //开始时间
	end:String, //结束时间
	note:Number, //修改记录
	address:String//成果提交地址
});
module.exports = mongoose.model('task',task_schema);