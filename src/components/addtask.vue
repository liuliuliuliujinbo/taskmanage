<template>
	<div id="all">
		<Modal v-model="addtask" :mask-closable="false" class-name="vertical-center-modal">
			<p slot="header" style="text-align:center">添加任务</p>
			<div style="font-size: 16px; text-align:center">
				任务描述<span class="xing">&nbsp;*</span>：
				<Input type="textarea" v-model="des" placeholder="请输入任务描述" style="width: 200px" />
				<br /><br /><br />
				负责人<span class="xing">&nbsp;*</span>：
				<Select v-model="incharge" style="width:200px" clearable ref="mem">
					<Option v-for="item in members"  :value="item.email" :key="item.email">{{ item.name }} - {{item.email}}</Option>
				</Select>
				<br /><br /><br />
				参与人 ：
				<Select v-model="join" style="width:200px" clearable ref="join">
					<Option v-for="item in joins" :value="item.email" :key="item.email">{{ item.name }} - {{item.email}}</Option>
				</Select>
				<br /><br /><br />
				起止时间<span class="xing">&nbsp;*</span>：
				<DatePicker v-model="time0" type="daterange" :options="options3" placeholder="选择任务起止时间" style="width: 200px"></DatePicker>
				<br /><br /><br />
				成果提交地址：
				<Input type="text" v-model="address" placeholder="成果提交地址" style="width: 200px" />
				<br /><br />
			</div>
			<div slot="footer">
				<Button @click="tcancel">取消</Button>
				<Button type="primary" @click="tok">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				des:"",
				members:[],
				joins:[],
				incharge:"",
				join:"",
				options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
				time0:[],
				address:""
			};
		},
		methods: {
			tok(){
				if(this.des&&this.incharge&&this.time0){
					let theincharge=[];
					let thejoin=[];
					for(let i=0;i<this.members.length;i++){
						if(this.members[i].email==this.incharge){
							theincharge.push(this.members[i].email)
							theincharge.push(this.members[i].name)
						}
					}
					for(let i=0;i<this.joins.length;i++){
						if(this.joins[i].email==this.join){
							thejoin.push(this.joins[i].email)
							thejoin.push(this.joins[i].name)
						}
					}
					let data=Qs.stringify({
							des: this.des,
							incharge:theincharge,
							join:thejoin,
							start:this.time0[0],
							end:this.time0[1],
							note:0,
							address:this.address,
							group:this.nowgroup
						}, {
							arrayFormat: 'repeat'
						});
					let that=this;
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/task/addtask', data)
						.then(function(res) {
							if(res.data.err == 0) {
								alert("添加成功")
								that.$store.commit('newAddtask',false);
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
			tcancel(){
				this.$store.commit('newAddtask',false);
			}
		},
		mounted: function() {
			
		},
		computed:{
			addtask:{
				get:function(){
					return this.$store.state.addtask;
				},
				set: function (newValue) {
			      	this.$store.state.addtask = newValue
			    }
			},
			nowgroup(){
				return this.$store.state.nowgroup;
			}
		},
		watch:{
			incharge(val,oldval){
				for(let i = 0; i < this.joins.length; i++) {
					if(this.joins[i].email == val) {
						this.joins.splice(i, 1);
						if(oldval != "") {
							for(let j=0;j<this.joins.length;j++){
								if(this.members[j].email==oldval){
									this.joins.push(this.members[j])
								}
							}
						}
					}
				}
			},
			join(val,oldval){
				for(let i = 0; i < this.members.length; i++) {
					if(this.members[i].email == val) {
						this.members.splice(i, 1);
						if(oldval != "") {
							for(let j=0;j<this.members.length;j++){
								if(this.joins[j].email==oldval){
									this.members.push(this.joins[j])
								}
							}
						}
					}
				}
			},
			addtask(val, oldval){
				this.$refs.mem.clearSingleSelect()
				this.$refs.join.clearSingleSelect()
				if(val){
					this.joins=[]
					this.members=[]
					let that=this;
					let groupmember=[]
					let data=Qs.stringify({
							group: this.nowgroup
						});
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/group/getmembers', data)
						.then(function(res) {
							if(res.data.err == 0) {
								for(let i=0;i<res.data.data[0].member.length;i++){
									that.members.push({email:res.data.data[0].member[i],name:res.data.data[0].membersname[i]})
									that.joins.push({email:res.data.data[0].member[i],name:res.data.data[0].membersname[i]})
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