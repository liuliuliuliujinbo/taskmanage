<template>
	<div id="all">
		<div id="rw_top">&emsp;&emsp;&emsp;任务管理</div>
		<div id="rw_main">
			<div id="rw_work">
				<div id="rw_head">
					
					<span id="rw_select">
						&emsp;&emsp;
						<Select v-model="nowgroup" style="width:150px">
							<Option v-for="item in grouplist" :value="item.name" :key="item.name">{{ item.name }}</Option>
						</Select>
					</span>
					<span>该组任务列表</span>
					<span id="rw_search">
						<Input style="width: 250px" v-model="info" @on-search="search" search enter-button placeholder="输入任务描述进行查询" />
					</span>
					<span id="rw_add">
						<Button type="primary" @click="faddtask">新建任务</Button>
					</span>
				</div>
				<div id="rw_body" style="font-size: 16px;">
					<Addtask></Addtask>
					<Modifytask></Modifytask>
					<Table border ref="selection" :columns="columns4" :data="data1"></Table>
					<Page :total="pagec" @on-change="updatelist" show-elevator transfer />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	import Addtask from "../components/addtask.vue"
	import Modifytask from "../components/modifytask.vue"
	export default {
		components:{Addtask,Modifytask},
		data() {
			return {
				columns4: [{
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '任务描述',
						key: 'description'
					},
					{
						title: '任务负责人',
						width: 150,
						key: 'incharge'
					},
					{
						title: '任务参与人',
						width: 150,
						key: 'join'
					},
					{
						title: '起止时间',
						width: 100,
						key: 'time'
					},
					{
						title: '修改记录',
						width: 100,
						key: 'note'
					},
					{
						title: '成果提交地址',
						width: 150,
						key: 'address'
					},
					{
						title: '完成状态',
						width: 100,
						key: 'state'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							let that=this;
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small',
										disabled: params.row.state=="未完成" ? true : false
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.modifystate(params.row)
										}
									}
								}, '未完成'),
								h('Button', {
									props: {
										type: 'primary',
										size: 'small',
										disabled: (params.row.note=="已修改")||(params.row.state=="已完成") ? true : false
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, '修改')
							]);
						}
					}
				],
				data1: [],
				data2: [],
				all:0,
				pagec:0,
				page:1,
				group:"",
				grouplist:[],
				info:""
			};
		},
		methods: {
			updatelist(p){
				this.page=p;
				this.update()
			},
			search(){
				this.page=1;
				this.update()
			},
			modifystate(info){
				let that=this;
				var data = Qs.stringify({
					id:info._id,
					state:0,
					incharge:info.incharge
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/task/modifystate',data)
					.then(function(res) {
						if(res.data.err == 0) {
							alert("修改成功，已通知该任务负责人")
							that.update()
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			show(index){
				this.$store.commit('newModifytask',true);
				this.$store.commit('newTask',this.data2[index]);
				document.getElementsByClassName("ivu-modal-content")[0].style.fontSize = "20px";
				document.getElementsByClassName("ivu-modal-content")[1].style.fontSize = "20px";
			},
			update(){
				let that=this;
				var data = Qs.stringify({
					group: this.nowgroup,
					page:this.page,
					info:this.info
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/task/alltask',data)
					.then(function(res) {
						if(res.data.err == 0) {
							that.all=res.data.count
							let da=res.data.data
							that.data1=res.data.data
							that.data2=JSON.parse(JSON.stringify(da))
							for(let i=0;i<da.length;i++){
								that.data1[i].incharge=da[i].incharge[1]+" - "+da[i].incharge[0];
								if(da[i].join[0]){
									that.data1[i].join=da[i].join[1]+" - "+da[i].join[0];
								}else{
									that.data1[i].join="无"
								}
								let s=new Date(da[i].start).toLocaleDateString()
								let e=new Date(da[i].end).toLocaleDateString()
								that.data1[i].time=s+" - "+e;
								if(da[i].note==0){
									that.data1[i].note="未经修改";
								}else{
									that.data1[i].note="已修改";
								}
								if(da[i].address){
									that.data1[i].address=da[i].address
								}else{
									that.data1[i].address="无"
								}
								if(da[i].state==1){
									that.data1[i].state="已完成"
								}else{
									that.data1[i].state="未完成"
								}
							}
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			faddtask(){
				this.$store.commit('newAddtask',true);
				document.getElementsByClassName("ivu-modal-content")[0].style.fontSize = "20px";
			}
		},
		mounted: function() {
			let that = this;
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/task/getallcount')
				.then(function(res) {
					if(res.data.err == 0) {
						that.all = res.data.data;
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			var data = Qs.stringify({
				user: sessionStorage.getItem("email")
			});
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/group/mygroup',data)
				.then(function(res) {
					if(res.data.err == 0) {
						if(res.data.data.length==0){
							that.grouplist=[]
						}else{
							that.grouplist=res.data.data;
							that.nowgroup=that.grouplist[0].name
							that.$store.commit('newNowgroup',that.nowgroup);
						}
						
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			this.update()
		},
		watch: {
			all(val, oldval) {
				this.pagec = Math.ceil(val / 5) * 10
			},
			nowgroup(val, oldval){
				let that=this;
				var data = Qs.stringify({
					group: val,
					page:this.page
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/task/alltask',data)
					.then(function(res) {
						if(res.data.err == 0) {
							that.all=res.data.count
							let da=res.data.data
							that.data1=res.data.data
							that.data2=JSON.parse(JSON.stringify(da))
							for(let i=0;i<da.length;i++){
								that.data1[i].incharge=da[i].incharge[1]+" - "+da[i].incharge[0];
								if(da[i].join[0]){
									that.data1[i].join=da[i].join[1]+" - "+da[i].join[0];
								}else{
									that.data1[i].join="无"
								}
								let s=new Date(da[i].start).toLocaleDateString()
								let e=new Date(da[i].end).toLocaleDateString()
								that.data1[i].time=s+" - "+e;
								if(da[i].note==0){
									that.data1[i].note="未经修改";
								}else{
									that.data1[i].note="已修改";
								}
								if(da[i].address){
									that.data1[i].address=da[i].address
								}else{
									that.data1[i].address="无"
								}
								if(da[i].state==1){
									that.data1[i].state="已完成"
								}else{
									that.data1[i].state="未完成"
								}
							}
							
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			addtask(val,oldval){
				if(!val){
					this.update();
				}
			},
			modifytask(val,oldval){
				if(!val){
					this.update();
				}
			}
		},
		computed:{
			addtask:{
				get:function(){
					return this.$store.state.addtask;
				},
				set: function (newValue) {
			      	this.$store.state.addtask = newValue
			    },
			},
			modifytask:{
				get:function(){
					return this.$store.state.modifytask;
				},
				set: function (newValue) {
			      	this.$store.state.modifytask = newValue
			    },
			},
			nowgroup:{
				get:function(){
					return this.$store.state.nowgroup;
				},
				set: function (newValue) {
			      	this.$store.state.nowgroup = newValue
			    },
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '../assets/style/maxin.less';
	#all {
		position: absolute;
		top: 45px;
		left: 62px;
		right: 0px;
		background-color: #e3e3e3;
		min-width: 1200px;
	}
	
	#rw_top {
		width: 100%;
		height: 46px;
		line-height: 46px;
		background-color: white;
		font-size: 18px;
		text-align: left;
	}
	
	#rw_main {
		.m-h(656);
		width: 100%;
		border: 1px solid #e3e3e3;
	}
	
	#rw_work {
		background: white;
		width: 94%;
		height: 580px;
		margin-left: 3%;
		margin-top: 20px;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
	}
	
	#rw_head {
		height: 60px;
		line-height: 60px;
		text-align: left;
		font-size: 18px;
		border-bottom: 1px solid #ddd;
	}
	
	#rw_search{
		padding-top: 13px;
		display: inline-block;
		position: absolute;
		right: 255px;
	}
	
	#rw_add {
		position: absolute;
		right: 75px;
	}
	
	.ivu-page {
		padding-top: 30px;
		padding-right: 80px;
		text-align: right;
	}
	
</style>