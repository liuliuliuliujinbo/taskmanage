<!--
	注册组件
    作   者：柳金帛 liujb@neuqsoft.com;
    修改日期：2018年12月日;
-->
<template>
	<div class="all">
		<div class="title">任 务 管 理 系 统</div>
		<div class="loginb"></div>
		<div class="logini">
			<br /><br />
			邮箱地址：<Input prefix="ios-mail" placeholder="邮箱地址" v-model="username" style="width: 160px" /><Button v-bind:disabled="isok" v-if="time" style="width: 100px;height: 30px;font-size: 16px;" @click="send" type="primary">发送验证码</Button><Button v-else disabled style="width: 120px;height: 30px;font-size: 16px;" type="primary">{{num}}秒后重新发送</Button>
			<br /><br />
			验&nbsp;证&nbsp;码&nbsp;&nbsp;：<Input prefix="ios-checkbox" placeholder="邮箱验证码" v-model="code" style="width: 160px" /><Button v-bind:disabled="isok" style="width: 100px;height: 30px;font-size: 16px;" @click="test" type="primary">验证邮箱</Button>
			<br /><br />
			<div v-if="state==1">
				真实姓名：<Input prefix="ios-contact" placeholder="姓名" v-model="name" style="width: 200px" />
				<br /><br />
				密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码&nbsp;&nbsp;：<Input prefix="ios-lock" type="password" v-model="password" placeholder="密码" style="width: 200px" />
				<br /><br />
				重复密码：<Input prefix="ios-lock" type="password" v-model="repassword" placeholder="密码" style="width: 200px" />
				<br /><br /><br />
				&emsp;&emsp;&emsp;<Button style="width: 270px;height: 30px;font-size: 16px;" type="primary" @click="go">注册并登录</Button>
			</div>
			<div v-else>
				真实姓名：<Input disabled prefix="ios-contact" placeholder="姓名" v-model="name" style="width: 200px" />
				<br /><br />
				密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码&nbsp;&nbsp;：<Input disabled prefix="ios-lock" type="password" v-model="password" placeholder="密码" style="width: 200px" />
				<br /><br />
				重复密码：<Input disabled prefix="ios-lock" type="password" v-model="repassword" placeholder="密码" style="width: 200px" />
				<br /><br /><br />
				&emsp;&emsp;&emsp;<Button disabled style="width: 270px;height: 30px;font-size: 16px;" type="primary" @click="golog">注册并登录</Button>
			</div>
			<br />
			&emsp;&emsp;&emsp;<Button style="width: 270px;height: 30px;font-size: 16px;" type="primary" @click="golog">返回登录</Button>
		</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				isok:false,
				state:0,
				username:"",
				password:"",
				repassword:"",
				name:"",
				code:"",
				time:true,
				num:'',
				timer:null,
				testcode:''
			};
		},
		methods:{
			golog:function(){
				this.$router.push({name:"login",params:{}});
			},
			go:function(){
				var that=this;
				if(this.password==this.repassword){
					var data = Qs.stringify({
						email:this.username,
						password:this.password,
						name:this.name
					});
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/user/regist',data)
					.then(function(res){
						if(res.data.err==0){
							window.localStorage.setItem("email",that.email);
							window.localStorage.setItem("user",that.name);
							window.localStorage.setItem("role",2);
							that.$router.push({name:"main",params:{}})
						}else{
							alert("注册失败！");
						}
					})
					.catch(function(err){
					  console.log(err);
					});
				}else{
					alert("两次输入密码不一致，请检查后重新输入！");
					this.password="";
					this.repassword="";
				}
				
			},
			send:function(){
				var that=this;
				var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
				if(reg.test(this.username)){
					
					var data = Qs.stringify({
					    email:this.username
					});
					this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
					this.$axios.post('http://127.0.0.1:2080/user/test',data)
					.then(function(res){
						if(res.data.err==0){
							console.log(res.data)
							alert("发送成功！");
							that.testcode=res.data.data;
							that.time=false;
							that.num=60;
							that.timer=setInterval(()=>{
								if(that.num==0){
									that.time=true;
									clearInterval(that.timer);
								}else{
									that.num--;
								}
							},1000)
						}else{
							alert("该邮箱帐号已存在！");
							
						}
					})
					.catch(function(err){
					  console.log(err);
					});
				}else{
					alert('您输入的邮箱格式错误，请重新输入！')
				}
			},
			test:function(){
				if(this.code==this.testcode){
					alert("验证成功！")
					this.state=1;
					this.isok=true;
					this.num=0;
				}else{
					alert("验证码错误，请重新输入！")
				}
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
@import '../assets/style/maxin.less';
*{
	margin: 0px;
	padding: 0px;
}
.all{
	width: 100%;
	height: 100%;
	background-image: url(../assets/image/002.jpg);
	background-size: 100% 100%;
	.title{
		width: 500px;
		font-size: 40px;
		color: white;
		position: absolute;
		top: 50%;
		margin-top: -320px;
		left: 50%;
		margin-left: -250px;
	}
	.loginb{
		width: 500px;
		height: 500px;
		background: #eee;
		opacity: 0.6;
		position: absolute;
		left: 50%;
		margin-left: -250px;
		top: 50%;
		margin-top: -250px;
	}
	.logini{
		width: 500px;
		height: 500px;
		position: absolute;
		left: 50%;
		margin-left: -250px;
		top: 50%;
		margin-top: -250px;
		font-size: 18px;
		text-align: left;
		padding-left: 50px;
	}
}
</style>
