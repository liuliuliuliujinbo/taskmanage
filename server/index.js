const express = require('express');
const bodyParser = require('body-parser');
const user = require('./router/user.js');
const group = require('./router/group.js');
const task = require('./router/task.js');
const db = require('./db/connect.js');
var app = express();
//解码方式
app.use(bodyParser.urlencoded({extended:false}));
//添加静态目录
app.use('/static',express.static("./static"));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//用作测试
app.get('/',(req,res)=>{
	res.send('hello world');
})
//添加路由
app.use('/user',user);
app.use('/group',group);
app.use('/task',task);
//监听端口
const server=app.listen(2080,function(){
	const host=server.address().address;
	const port=server.address().port;
	console.log("开启服务器成功，端口号为",host,port)
})



