<template>
	<div id="all">
		<div id="r_top">&emsp;&emsp;&emsp;任务组管理</div>
		<div id="r_main">
			<div id="r_work">
				<div id="r_head">
					<span>&emsp;当前任务组列表</span>
					<span id="r_add">
						<Button type="primary" @click="grd">添加任务组</Button>
					</span>
				</div>
				<div id="r_body">
					<Modify></Modify>
					<Modal v-model="modal1" :mask-closable="false" class-name="vertical-center-modal" @on-ok="ok">
						<p slot="header" style="text-align:center">创建新的任务组</p>
						<div style="font-size: 16px; text-align:center">
							任务组名称：
							<Input v-model="gname" placeholder="请输入任务组名称" clearable style="width: 200px" />
							<br />
							<br />
							<br /> 任务组组长：
							<Select style="width: 200px;" clearable placeholder="输入人员姓名搜索(单选)" v-model="model11" filterable>
								<Option v-for="item in leaders" :value="item.email" :key="item.email">{{ item.name }} - {{item.email}}</Option>
							</Select>
							<br />
							<br />
							<br /> 任务组成员：
							<Select style="width: 200px;" placeholder="输入人员姓名搜索(多选)" v-model="model12" filterable multiple>
								<Option v-for="(option, index) in members" :value="option.email" :key="index">{{option.name}} - {{option.email}}</Option>
							</Select>
						</div>
					</Modal>
					<Table border ref="selection" @on-selection-change="selected" :columns="columns4" :data="data1"></Table>
					<Page :total="pagec" @on-change="update" show-elevator transfer />
					<span id="delete">
						<Button type="error" @click="deletegroup">删除所选</Button>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	import Modify from "../components/modifygroup.vue"
	export default {
		components:{Modify},
		data() {
			return {
				modal1: false,
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '任务组名称',
						key: 'name'
					},
					{
						title: '任务组组长',
						key: 'leadername'
					},
					{
						title: '任务组成员',
						key: 'membersname'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.row)
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.row.name)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				data1: [],
				gname: '',
				leaders: [],
				members: [],
				model11: '',
				model12: [],
				loading1: false,
				loading2: false,
				sc: {},
				sc2: [],
				page: 1,
				all: 0,
				selecteds: [],
				pagec: 0
			};
		},
		methods: {
			ok() {
				let self = this;
				let leadername = "";
				let membersname = [];
				for(let i = 0; i < this.leaders.length; i++) {
					if(this.model11 == this.leaders[i].email) {
						leadername = this.leaders[i].name
					}
				}
				for(let j = 0; j < this.members.length; j++) {
					for(let k = 0; k < this.model12.length; k++) {
						if(this.model12[k] == this.members[j].email) {
							membersname.push(this.members[j].name)
						}
					}
				}
				var data = Qs.stringify({
					leadername: leadername,
					membersname: membersname,
					name: this.gname,
					leader: this.model11,
					members: this.model12
				}, {
					indices: false
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/group/addgroup', data)
					.then(function(res) {
						if(res.data.err == 0) {
							alert('添加成功')
							self.all++;
							self.updatelist(1)
						} else {
							alert(res.data.msg)
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			handleSelectAll(status) {
				this.$refs.selection.selectAll(status);
			},
			show(name) {
				this.$store.commit('newGroup',name);
				this.$store.commit('newLeaders',this.leaders);
				this.$store.commit('newMembers',this.members);
				this.$store.commit('newModel2',true);
				document.getElementsByClassName("ivu-modal-content")[0].style.fontSize = "20px";
				document.getElementsByClassName("ivu-modal-content")[1].style.fontSize = "20px";
			},
			remove(groupname) {
				let self = this;
				var data = Qs.stringify({
					names: groupname
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/group/deletegroup', data)
					.then(function(res) {
						if(res.data.err == 0) {
							alert("删除成功")
							self.updatelist(1)
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			selected(data) {
				this.selecteds = data;
			},
			grd() {
				this.modal1 = true;
				document.getElementsByClassName("ivu-modal-content")[0].style.fontSize = "20px";
				document.getElementsByClassName("ivu-modal-content")[1].style.fontSize = "20px";
			},
			updatelist: function(page) {
				let self = this;
				var data = Qs.stringify({
					page: page
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/group/grouplist', data)
					.then(function(res) {
						if(res.data.err == 0) {
							self.data1 = res.data.data
							for(let i = 0; i < self.data1.length; i++) {
								self.data1[i].membersname = self.data1[i].membersname.join(",")
							}
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			update(p) {
				this.updatelist(p)
			},
			deletegroup() {
				let deletes = [];
				let self = this;
				for(let i = 0; i < this.selecteds.length; i++) {
					deletes[i] = this.selecteds[i].name
				}
				var data = Qs.stringify({
					names: deletes
				}, {
					indices: false
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/group/deletegroup', data)
					.then(function(res) {
						if(res.data.err == 0) {
							alert("删除成功")
							self.all=self.all-self.selecteds.length
							self.updatelist(1)
						} else {
							alert("服务错误")
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		},
		beforeCreate: function() {
			let self = this;
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/group/getallcount')
				.then(function(res) {
					if(res.data.err == 0) {
						self.all = res.data.data;
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/user/searchleader')
				.then(function(res) {
					if(res.data.err == 0) {
						self.leaders = res.data.data
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/user/searchmember')
				.then(function(res) {
					if(res.data.err == 0) {
						self.members = res.data.data
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			this.$axios.post('http://127.0.0.1:2080/group/grouplist')
				.then(function(res) {
					if(res.data.err == 0) {
						self.data1 = res.data.data
						for(let i = 0; i < self.data1.length; i++) {
							self.data1[i].membersname = self.data1[i].membersname.join(",")
						}
					} else {
						alert("服务错误")
					}
				})
				.catch(function(err) {
					console.log(err);
				});

		},
		watch: {
			model11(val, oldval) {
				for(let i = 0; i < this.members.length; i++) {
					if(this.members[i].email == val) {
						if(oldval != "") {
							this.members.push(this.sc)
						}
						this.sc = this.members[i]
						this.members.splice(i, 1);
					}
				}
			},
			all(val, oldval) {
				this.pagec = Math.ceil(val / 5) * 10
			},
			model2(val, oldval){
				if(val==false){
					this.updatelist(1)
				}
			}
		},
		computed:{
			model2:{
				get:function(){
					return this.$store.state.model2;
				},
				set: function (newValue) {
			      	this.$store.state.model2 = newValue
			    },
			}
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
	
	#r_top {
		width: 100%;
		height: 46px;
		line-height: 46px;
		background-color: white;
		font-size: 18px;
		text-align: left;
	}
	
	#r_main {
		.m-h(656);
		width: 100%;
		border: 1px solid #e3e3e3;
	}
	
	#r_work {
		background: white;
		width: 94%;
		height: 580px;
		margin-left: 3%;
		margin-top: 20px;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
	}
	
	#r_head {
		height: 60px;
		line-height: 60px;
		text-align: left;
		font-size: 18px;
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
	}
	
	#r_add {
		position: absolute;
		right: 75px;
	}
	
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
	}
	
	#r_body {
		font-size: 16px;
	}
	
	.ivu-page {
		padding-top: 30px;
		padding-right: 80px;
		text-align: right;
	}
	
	#delete {
		text-align: left;
		padding-left: 20px;
		position: relative;
		top: -32px;
		left: -44%;
	}
</style>