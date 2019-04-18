let express=require("express");
let router=express.Router();
const fs=require('fs');
const path=require('path');
let TaskModel=require("../model/model_task.js");
let UserModel=require("../model/model_user.js");
let multer=require("multer")

router.use((req,res,next)=>{
	next();
})



//添加任务
router.post('/addtask',(req,res)=>{
	var data=req.body;
	let obj={group:data.group,incharge:data.incharge,description:data.des,join:data.join,start:data.start,end:data.end,note:data.note,address:data.address};
	TaskModel.find({incharge:data.incharge})
	.then((doc)=>{
		let have=false;
		let datas = new Date(data.start).getTime();
		let datae = new Date(data.end).getTime();
		for(let i=0;i<doc.length;i++){
			let docs = new Date(doc[i].start).getTime();
			let doce = new Date(doc[i].end).getTime();
			if(docs<datas<doce||docs<datae<doce){
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
    TaskModel.find({group:data.group}).sort({_id: -1}).skip((data.page-1)*5).limit(5)
    .then((doc)=>{
        res.send({err:0,msg:'查询成功',data:doc});
    })
    .catch((err)=>{
      console.log(err);
    })
})


//删除任务组
router.post('/deleteTask',(req,res)=>{
	var data=req.body;
    TaskModel.deleteMany({name:{$in:data.names}})
    .then((doc)=>{
        res.send({err:0,msg:'删除成功',data:doc});
    })
    .catch((err)=>{
      console.log(err);
    })
})


//修改任务组
router.post('/modifyTask',(req,res)=>{
	var data=req.body;
    TaskModel.update({name:data.name},{leader:data.leader,member:data.members,leadername:data.leadername,membersname:data.membersname})
    .then((doc)=>{
        res.send({err:0,msg:'修改成功',data:doc});
    })
    .catch((err)=>{
      console.log(err);
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