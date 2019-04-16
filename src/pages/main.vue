<template>
	<div>
		<Nav></Nav>
		<Gzt v-if="active==1"></Gzt>
		<Rw v-if="active==2"></Rw>
		<Rwz v-if="active==3"></Rwz>
	</div>
</template>

<script>
	import Nav from "../components/nav.vue"
	import Gzt from "../components/gzt.vue"
	import Rwz from "../components/rwz.vue"
	import Rw from "../components/rw.vue"
	export default {
		name:'Main',
		components:{Nav,Gzt,Rwz,Rw},
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		computed:{
			active(){
				return this.$store.state.active;
			}
		}
	}
</script>

<style lang="less">
Gzt{
	margin-left: 62px;
}
</style>