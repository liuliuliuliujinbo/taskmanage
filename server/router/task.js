let express=require("express");
let router=express.Router();
const fs=require('fs');
const path=require('path');
let TaskModel=require("../model/model_task.js");
let LogModel=require("../model/model_log.js");
let UserModel=require("../model/model_user.js");
let multer=require("multer")
const mongoose= require('mongoose');

router.use((req,res,next)=>{
	next();
})



//添加任务
router.post('/addtask',(req,res)=>{
	var data=req.body;
	let obj={group:data.group,incharge:data.incharge,description:data.des,join:data.join,start:data.start,end:data.end,note:data.note,address:data.address,state:0};
	TaskModel.find({incharge:data.incharge})
	.then((doc)=>{
		let have=false;
		let datas = parseInt(new Date(data.start).getTime());
		let datae = parseInt(new Date(data.end).getTime());
		for(let i=0;i<doc.length;i++){
			let docs = parseInt(new Date(doc[i].start).getTime());
			let doce = parseInt(new Date(doc[i].end).getTime());
			if((docs<datas&&datas<doce)||(docs<datae&&datae<doce)){
				have=true;
				break;
			}
		}
		if(have){
			res.send({err:-1,msg:"在选中时间段内该负责人已有任务，请重新选择时间"})
		}else{
			TaskModel.insertMany(obj)
			.then((doc1)=>{
			  if (doc1.length==1) {
			    res.send({err:0,msg:'添加成功'});
			  }else{
			    res.send({err:-1,msg:'添加失败'});
			  }
			})
			.catch((err)=>{
			  console.log(err);
			})
		}
	})
	.catch((err)=>{
	  console.log(err);
	})
})


//获取任务组总数
router.post('/getallcount',(req,res)=>{
	var data=req.body;
    TaskModel.find()
    .then((doc)=>{
        res.send({err:0,msg:'查询成功',data:doc.length});
    })
    .catch((err)=>{
      console.log(err);
    })
})


//获取某任务组所有任务
router.post('/alltask',(req,res)=>{
	var data=req.body;
	var query= new RegExp(data.info, 'i');
	TaskModel.count({$and:[{group:data.group},{description: {'$regex': query}}]})
	.then((doc1)=>{
		TaskModel.find({$and:[{group:data.group},{description: {'$regex': query}}]}).sort({_id: -1}).skip((data.page-1)*5).limit(5)
		.then((doc)=>{
		    res.send({err:0,msg:'查询成功',data:doc,count:doc1});
		})
		.catch((err)=>{
		  res.send({err:-1,msg:'查询失败',data:err});
		})
	})
    .catch((err)=>{
      console.log(err);
    })
})



//修改任务
router.post('/modifytask',(req,res)=>{
	var data=req.body;
	let obj={group:data.group,incharge:data.incharge,description:data.newdes,join:data.join,start:data.start,end:data.end,note:0,address:data.address,state:0};
    TaskModel.update({_id:data.old},{note:1})
    .then((doc)=>{
		TaskModel.insertMany(obj)
		.then((doc1)=>{
		  if (doc1.length==1) {
			  console.log(doc1[0]._id)
			  let t=new Date();
			  LogModel.insertMany({group:data.group,incharge:data.incharge,oldtask:data.old,olddes:data.olddes,newtask:doc1[0]._id,newdes:data.newdes,time:t})
			  .then((doc2)=>{
				  if (doc2.length==1) {
					res.send({err:0,msg:'修改成功'});
				  }else{
					  res.send({err:-1,msg:'修改失败'});
				  }
			  })
			  .catch((err)=>{
			    console.log(err);
			  })
		    
		  }else{
		    res.send({err:-1,msg:'添加失败'});
		  }
		})
		.catch((err)=>{
		  console.log(err);
		})
    })
    .catch((err)=>{
      console.log(err);
    })
})


//修改任务完成状态
router.post('/modifystate',(req,res)=>{
	var data=req.body;
    TaskModel.update({_id:data.id},{state:data.state})
    .then((doc)=>{
        res.send({err:0,msg:'修改成功',data:doc});
    })
    .catch((err)=>{
      console.log(err);
    })
})


//获取某任务组所有任务
router.post('/alllog',(req,res)=>{
	var data=req.body;
	var query= new RegExp(data.info, 'i');
	LogModel.count({$and:[{group:data.group},{$or:[{olddes:{'$regex': query}},{newdes:{'$regex': query}}]}]})
	.then((doc1)=>{
		LogModel.find({$and:[{group:data.group},{$or:[{olddes:{'$regex': query}},{newdes:{'$regex': query}}]}]}).sort({_id: -1}).skip((data.page-1)*5).limit(5)
		.then((doc)=>{
		    res.send({err:0,msg:'查询成功',data:doc,count:doc1});
		})
		.catch((err)=>{
		  res.send({err:-1,msg:'查询失败',data:err});
		})
	})
    .catch((err)=>{
      console.log(err);
    })
})


//通过id查找某一任务
router.post('/findtask',(req,res)=>{
	var data=req.body;
    TaskModel.findById({'_id':data.id})
    .then((doc)=>{
        res.send({err:0,msg:'查询成功',data:doc});
    })
    .catch((err)=>{
      console.log(err);
    })
})


module.exports = router;