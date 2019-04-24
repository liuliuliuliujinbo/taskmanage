<template>
	<div id="all">
		<Modal v-model="modifytask" :mask-closable="false" class-name="vertical-center-modal">
			<p slot="header" style="text-align:center">修改任务信息</p>
			<div style="font-size: 16px; text-align:center">
				任务描述<span class="xing">&nbsp;*</span>：
				<Input type="textarea" v-model="des" placeholder="请输入任务描述" style="width: 250px" />
				<br /><br /><br />
				&emsp;&emsp;负责人：
				<Input type="text" v-model="tincharge" disabled style="width: 250px" />
				<br /><br /><br />
				&emsp;&emsp;参与人 ：
				<Select v-model="tjoin" style="width:250px" clearable ref="join">
					<Option v-for="item in joins" :value="item.email" :key="item.email">{{ item.name }} - {{item.email}}</Option>
				</Select>
				<br /><br /><br />
				&emsp;起止时间 ：
				<Input type="text" v-model="ttime" disabled style="width: 250px" />
				<br /><br /><br />
				成果提交地址：
				<Input type="text" v-model="taddress" placeholder="成果提交地址" style="width: 250px" />
				<br /><br />
			</div>
			<div slot="footer">
				<Button @click="mtcancel">取消</Button>
				<Button type="primary" @click="mtok">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				options3: {
				    disabledDate (date) {
				        return date && date.valueOf() < Date.now() - 86400000;
				    }
				},
				des:'',
				ttime:'',
				tincharge:'',
				tjoin:'',
				joins:[],
				taddress:''
			};
		},
		methods: {
			mtok() {
				if(this.des){
					let thejoin=[];
					for(let i=0;i<this.joins.length;i++){
						if(this.joins[i].email==this.tjoin){
							thejoin.push(this.joins[i].email)
							thejoin.push(this.joins[i].name)
						}
					}
					let data=Qs.stringify({
							newdes: this.des,
							olddes:this.task.description,
							incharge:this.task.incharge,
							join:thejoin,
							start:this.task.start,
							end:this.task.end,
							address:this.taddress,
							group:this.task.group,
							old:this.task._id
						}, {
							arrayFormat: 'repeat'
						});
					let that=this;
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/task/modifytask', data)
						.then(function(res) {
							if(res.data.err == 0) {
								alert("修改成功")
								that.$store.commit('newModifytask',false);
							} else {
								alert(res.data.msg)
							}
						})
						.catch(function(err) {
							console.log(err);
						});
				}else{
					alert("请输入必填信息")
				}
			},
			mtcancel(){
				this.$store.commit('newModifytask',false);
			}
		},
		created: function() {
			
		},
		watch:{
			modifytask(val,oldval){
				this.joins.length=0;
				if(val){
					let that=this;
					this.tincharge=this.task.incharge[1]+" - "+this.task.incharge[0]
					this.tjoin=this.task.join[0]
					this.ttime=new Date(this.task.start).toLocaleDateString()+" - "+new Date(this.task.end).toLocaleDateString()
					this.des=this.task.description
					this.taddress=this.task.address
					let data=Qs.stringify({
							group: this.nowgroup
						});
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/group/getmembers', data)
						.then(function(res) {
							if(res.data.err == 0) {
								for(let i=0;i<res.data.data[0].member.length;i++){
									if(res.data.data[0].member[i]!=that.task.incharge[0]){
										that.joins.push({email:res.data.data[0].member[i],name:res.data.data[0].membersname[i]})
									}
								}
							} else {
								alert(res.data.msg)
							}
						})
						.catch(function(err) {
							console.log(err);
						});
				}
			}
		},
		computed:{
			modifytask:{
				get:function(){
					return this.$store.state.modifytask;
				},
				set: function (newValue) {
			      	this.$store.state.modifytask = newValue
			    }
			},
			task:{
				get:function(){
					return this.$store.state.task;
				},
				set: function (newValue) {
			      	this.$store.state.task = newValue
			    }
			},
			nowgroup:{
				get:function(){
					return this.$store.state.nowgroup;
				},
				set: function (newValue) {
			      	this.$store.state.nowgroup = newValue
			    }
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '../assets/style/maxin.less';
	.xing{
		font-size: 16px;
		color: red;
		line-height: 20px;
	}
</style>