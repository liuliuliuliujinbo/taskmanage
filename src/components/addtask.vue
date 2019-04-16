<template>
	<div id="all">
		<Modal v-model="addtask" :mask-closable="false" class-name="vertical-center-modal" @on-ok="tok" @on-cancel="tcancel">
			<p slot="header" style="text-align:center">添加任务</p>
			<div style="font-size: 16px; text-align:center">
				任务描述：
				<Input disabled v-model="des" placeholder="请输入任务组名称" style="width: 200px" />
				
			</div>
		</Modal>
	</div>
</template>

<script>
	import Qs from 'qs'
	export default {
		data() {
			return {
				des:""
			};
		},
		methods: {
			tok(){
				
			},
			tcancel(){
				this.$store.commit('newAddtask',false);
			}
		},
		created: function() {
			
		},
		computed:{
			addtask:{
				get:function(){
					return this.$store.state.addtask;
				},
				set: function (newValue) {
			      	this.$store.state.addtask = newValue
			    }
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '../assets/style/maxin.less';
</style>