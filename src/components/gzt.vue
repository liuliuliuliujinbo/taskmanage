<template>
	<div id="all">
		<div id="g_top">&emsp;&emsp;&emsp;工作台</div>
		<div id="g_main">
			<Row type="flex" justify="space-around">
				<Col :xs="23" :sm="23" :md="23" :lg="11" class-name="m_contant">
					
				</Col>
				<Col :xs="23" :sm="23" :md="23" :lg="11" class-name="m_contant">
					
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '../assets/style/maxin.less';
	#all{
		position: absolute;
		top: 45px;
		left: 62px;
		right: 0px;
		background-color: #e3e3e3;
	}
	#g_top{
		width: 100%;
		height: 46px;
		line-height: 46px;
		background-color: white;
		font-size: 18px;
		text-align: left;
	}
	#g_main{
		.m-h(656);
		width: 100%;
	}
	.m_contant{
		background: white;
		margin-top: 20px;
		margin-bottom: 20px;
		height: 540px;
	}
</style>