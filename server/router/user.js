let express=require("express");
let router=express.Router();
const fs=require('fs');
const path=require('path');
let UserModel=require("../model/model_user.js");
let multer=require("multer")
var nodemailer = require('nodemailer');
const crypto = require("crypto");

router.use((req,res,next)=>{
	next();
})

//邮箱验证
router.post('/test',(req,res)=>{
	UserModel.find({email:req.body.email},(err,result)=>{
	    if (!result.length) {
	        // 开启一个 SMTP 连接池
			var transporter = nodemailer.createTransport({
			    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
			    host: 'smtp.163.com',
			    port: 465, // SMTP 端口
			    secureConnection: true, // 使用 SSL
			    auth: {
			        user: '15032396253@163.com',
			        pass: 'ljb000123'
			    }
			});
			// 邮件信息
			let testNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
			var mailOptions = {
			    from: '15032396253@163.com', // 发件地址
			    to: req.body.email, // 收件列表
			    subject: '接受凭证', // 标题
			    //text和html两者只支持一种
			    text: '您的凭证为'+testNum // 标题
			};
			// 发送邮件
			transporter.sendMail(mailOptions, function (err, info) {  
			  if (err) {  
			    console.log(err);  
			    res.send({err:-1,msg:'send failed',data:err});
			  }  
			  // console.log('发送成功');  
			  res.send({err:0,msg:'send success',data:testNum});  
			});
	    }else{
	        res.send({err:-3,msg:'用户名已存在'})
	    }
	})
	
})



//用户注册
router.post('/regist',(req,res)=>{
	var data=req.body;
	let md5 = crypto.createHash("md5");
    let pwd = md5.update(data.password).digest("hex");
	let obj={email:data.email,password:pwd,name:data.name,role:2};
    UserModel.insertMany(obj)
    .then((doc)=>{
      if (doc.length==1) {
        res.send({err:0,msg:'注册成功'});
      }else{
        res.send({err:-1,msg:'注册失败'});
      }
    })
    .catch((err)=>{
      console.log(err);
    })
})


//用户登录
router.post('/login',(req,res)=>{
	var data=req.body;
	let md5 = crypto.createHash("md5");
    let pwd = md5.update(data.password).digest("hex");
	let obj={email:data.email,password:pwd};
	UserModel.find(obj)
	.then((doc)=>{
	    if (doc.length==1) {
	      res.send({err:0,msg:'登陆成功',data:doc});
	    }else{
	      res.send({err:-3,msg:'用户名或密码错误'});
	    }
	})
	.catch((err)=>{
	    console.log(err);
	    res.send({err:-3,msg:'内部错误'});
	})
})


//模糊查询任务组组长
router.post('/searchleader',(req,res)=>{
	UserModel.find()
	.then((resolve)=>{
		res.send({err:0,msg:'queryDesc success',data:resolve});
	})
	.catch((reject)=>{
		res.send({err:-1,msg:'queryDesc failed',data:reject});
	})
})


//模糊查询任务组成员
router.post('/searchmember',(req,res)=>{
	var data=req.body;
	var rega = new RegExp(data.name);
	UserModel.find({role:2})
	.then((resolve)=>{
		res.send({err:0,msg:'queryDesc success',data:resolve});
	})
	.catch((reject)=>{
		res.send({err:-1,msg:'queryDesc failed',data:reject});
	})
})



module.exports = router;