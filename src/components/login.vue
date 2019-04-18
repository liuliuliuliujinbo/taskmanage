<!-- 登录组件 -->
<!--
    作   者：柳金帛 liujb@neuqsoft.com;
    修改日期：2018年12月26日;
-->
<template>
	<div class="all">
		<div class="title">任 务 管 理 系 统</div>
		<div class="loginb"></div>
		<div class="logini">
			<br /><br />
			用户名：<Input prefix="ios-contact" placeholder="用户名/手机号" v-model="username" style="width: 200px" />
			<br /><br /><br />
			密&nbsp;&nbsp;码&nbsp;：<Input prefix="ios-lock" type="password" v-model="password" placeholder="密码" style="width: 200px" />
			<br /><br />
			<br />
			<ButtonGroup>
				<Button style="width: 135px;height: 30px;font-size: 16px;" type="primary" @click="goreg">注&emsp;册</Button>
				<Button style="width: 135px;height: 30px;font-size: 16px;" type="primary" @click="go">登&emsp;录</Button>
			</ButtonGroup>
		</div>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				username:"",
				password:""
			};
		},
		methods:{
			goreg:function(){
				this.$router.push({name:"register",params:{}})
			},
			go:function(){
				var that=this;
				var data = Qs.stringify({
				    email:this.username,
				    password:this.password
				});
				this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				this.$axios.post('http://127.0.0.1:2080/user/login',data)
				.then(function(res){
					if(res.data.err==0){
						sessionStorage.setItem("email",res.data.data[0].email);
						sessionStorage.setItem("user",res.data.data[0].name);
						sessionStorage.setItem("role",res.data.data[0].role);
						that.$router.push({name:"main",params:{}})
					}else{
						alert("用户名或密码错误，请重新输入")
					}
				})
				.catch(function(err){
				  console.log(err);
				});
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
		margin-top: -220px;
		left: 50%;
		margin-left: -250px;
	}
	.loginb{
		width: 500px;
		height: 300px;
		background: #eee;
		opacity: 0.6;
		position: absolute;
		left: 50%;
		margin-left: -250px;
		top: 50%;
		margin-top: -150px;
	}
	.logini{
		width: 500px;
		height: 300px;
		position: absolute;
		left: 50%;
		margin-left: -250px;
		top: 50%;
		margin-top: -150px;
		font-size: 18px;
	}
}
</style>
