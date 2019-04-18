<!--
	左侧和顶部导航栏组件
    作   者：柳金帛 liujb@neuqsoft.com;
    修改日期：2018年12月日;
-->
<template>
	<div>
		<Top></Top>
		<div id="left">
			<div title="工作台" :class="active==1?'l la':'l'" data-value="1" @click="lactive($event)">
				<Icon type="md-paper" size="30" data-value="1" @click="lactive($event)" />
			</div>
			<div title="任务管理" :class="active==2?'l la':'l'" data-value="2" @click="lactive($event)">
				<Icon type="md-ionic" size="30" data-value="2" @click="lactive($event)" />
			</div>
			<div title="任务修改记录" :class="active==3?'l la':'l'" data-value="3" @click="lactive($event)">
				<Icon type="md-bookmarks" size="30" data-value="3" @click="lactive($event)" />
			</div>
			<div title="项目组管理" :class="active==4?'l la':'l'" data-value="4" @click="lactive($event)">
				<Icon type="ios-people" size="30" data-value="4" @click="lactive($event)" />
			</div>
		</div>
	</div>
</template>

<script>
	import Top from "../components/top_nav.vue"
	export default {
		components:{Top},
		data() {
			return {
				active:1,
			};
		},
		methods:{
			lactive:function(ev){
				this.active=ev.target.dataset.value;
				this.$store.commit('newActive',this.active);
			}
		}
	}
</script>

<style>
#left{
	position: fixed;
	top: 45px;
	bottom: 0px;
	width: 62px;
	background: #393d49;
	text-align: center;
	z-index: 9;
}
.l{
	width: 62px;
	height: 55px;
	color: #b9bcc2;
	font-size: 16px;
	line-height: 55px;
}
.l:hover{
	cursor: pointer;
}
.la{
	color: #e36751;
}
</style>
