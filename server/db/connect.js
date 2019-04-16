const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/manage',{useNewUrlParser:true});
const db=mongoose.connection;
db.on('error',(err)=>{
	console.log('数据库连接失败');
})
db.on('open',function(){
	console.log('数据库连接成功');
})
db.on('disconnected',function(){
	console.log('数据库连接断开');
})
module.exports=db;