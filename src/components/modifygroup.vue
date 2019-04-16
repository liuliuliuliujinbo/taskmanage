<template>
	<div id="all">
		<Modal v-model="model2" :mask-closable="false" class-name="vertical-center-modal" @on-ok="mok" @on-cancel="mcancel">
			<p slot="header" style="text-align:center">修改任务组信息</p>
			<div style="font-size: 16px; text-align:center">
				任务组名称：
				<Input disabled v-model="modifygroup.name" placeholder="请输入任务组名称" style="width: 200px" />
				<br />
				<br />
				<br /> 任务组组长：
				<Select style="width: 200px;" clearable placeholder="输入人员姓名搜索(单选)" v-model="modifygroup.leader" filterable>
					<Option v-for="item in leaders" :value="item.email" :key="item.email">{{ item.name }} - {{item.email}}</Option>
				</Select>
				<br />
				<br />
				<br /> 任务组成员：
				<Select style="width: 200px;" placeholder="输入人员姓名搜索(多选)" v-model="modifygroup.member" filterable multiple>
					<Option v-for="(option, index) in members" :value="option.email" :key="index">{{option.name}} - {{option.email}}</Option>
				</Select>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				loading1: false,
				loading2: false,
				sc: {},
				sc2: []
			};
		},
		methods: {
			mok() {
				let self = this;
				let leadername = "";
				let membersname = [];
				for(let i = 0; i < this.leaders.length; i++) {
					if(this.modifygroup.leader == this.leaders[i].email) {
						leadername = this.leaders[i].name
					}
				}
				for(let j = 0; j < this.members.length; j++) {
					for(let k = 0; k < this.modifygroup.member.length; k++) {
						if(this.modifygroup.member[k] == this.members[j].email) {
							membersname.push(this.members[j].name)
						}
					}
				}
				var data = Qs.stringify({
					leadername: leadername,
					membersname: membersname,
					name: this.modifygroup.name,
					leader: this.modifygroup.leader,
					members: this.modifygroup.member
				}, {
					indices: false
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/group/modifygroup', data)
					.then(function(res) {
						if(res.data.err == 0) {
							alert('修改成功')
							self.updatelist(1)
						} else {
							alert(res.data.msg)
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			mcancel(){
				this.$store.commit('newModel2',false);
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
			}
		},
		created: function() {
			
		},
		computed:{
			modifygroup:{
				get:function(){
					return this.$store.state.modifygroup;
				},
				set: function (newValue) {
			      	this.$store.state.modifygroup = newValue
			    }
				
			},
			leaders(){
				return this.$store.state.leaders;
			},
			members(){
				return this.$store.state.members;
			},
			model2:{
				get:function(){
					return this.$store.state.model2;
				},
				set: function (newValue) {
			      	this.$store.state.model2 = newValue
			    }
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '../assets/style/maxin.less';
</style>