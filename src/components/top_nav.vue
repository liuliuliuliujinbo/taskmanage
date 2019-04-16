<!--
	顶部导航栏组件
    作   者：柳金帛 liujb@neuqsoft.com;
    修改日期：2018年12月26日;
-->
<template>
	<div>
		<div id="top">
			<div class="r rr">
				<img src="../assets/image/man.png" style="height: 45px;"/>
			</div>
			<div class="r rm">
				<Icon type="ios-notifications-outline" size="26"></Icon>
				<div v-if="wdxx>0" class="wdxx"></div>
			</div>
			<div class="r rl">
				<Input search enter-button placeholder="任务名称" width="220px" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				wdxx:2
			};
		}
	}
</script>

<style scoped lang="less">
	#top{
		width: 100%;
		height: 45px;
		background: #515a6e;
		position: fixed;
		z-index: 9;
	}
	.r{
		float: right;
		height: 45px;
		font-size: 16px;
		line-height: 45px;
		border-right: 1px solid #ccc;
	}
	.rl{
		padding-top: 6px;
		padding-right: 10px;
		width: 220px;
	}
	.rm{
		width: 50px;
		color: #FFFFFF;
		font-height:700;
	}
	.rr{
		width: 60px;
	}
	.rr:hover{
		cursor: pointer;
	}
	.rm:hover{
		cursor: pointer;
	}
	.wdxx{
		width: 8px;
		height: 8px;
		border-radius: 100%;
		border: 1px solid white;
		background: red;
		position:relative;
		top: -40px;
		left: 30px;
	}
</style>
